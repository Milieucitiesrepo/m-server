require 'spec_helper'

module DevSites
  describe CommentsController do
    let(:user1) { FactoryGirl.create :user }
    let(:user2) { FactoryGirl.create :user }
    let(:dev_site) { FactoryGirl.create :dev_site }
    let(:comment_user1) { FactoryGirl.build :comment, user_id: user1.id }
    let(:comment_user2) { FactoryGirl.build :comment, user_id: user2.id }

    before do
      dev_site.comments << comment_user1
      dev_site.comments << comment_user2
    end

    describe '#index' do
      it 'should set all comments and total comments' do
        get :index, dev_site_id: dev_site.id, limit: 20, format: :json

        expect(response.status).to eq(200)
        expect(assigns(:comments)).to eq(dev_site.comments.all)
        expect(assigns(:total)).to eq(2)
      end
    end

    describe '#create' do
      before :each do
        sign_in user1
      end

      context 'valid params' do
        it 'should create new comment and render show template' do
          valid_attributes = attributes_for(:comment)
          valid_attributes[:user_id] = user1.id

          post :create, dev_site_id: dev_site.id, comment: valid_attributes, format: :json

          expect(assigns(:comment).body).to eq(valid_attributes[:body])
          expect(response).to render_template(:show)
        end
      end

      context 'invalid params' do
        it 'should return error status' do
          invalid_attributes = FactoryGirl.attributes_for(:comment).except(:body)

          post :create, dev_site_id: dev_site.id, comment: invalid_attributes, format: :json

          expect(response.status).to eq(406)
        end
      end
    end

    describe '#destroy' do
      context 'user is authorized to delete comment' do
        before do
          sign_in user1
        end

        it 'should delete the comment and return no_content' do
          delete :destroy, dev_site_id: dev_site.id, id: comment_user1.id, format: :json

          expect { comment_user1.reload }.to raise_error(ActiveRecord::RecordNotFound)
          expect(response.message).to eq('No Content')
        end
      end

      context 'user not authorized to delete comment' do
        it 'should not delete the comment and return not authorized message' do
          delete :destroy, dev_site_id: dev_site.id, id: comment_user2.id, format: :json

          expect(comment_user2.reload).to eq(comment_user2)
          expect(response.status).to eq(403)
        end
      end

      context 'valid authentication token is present in params' do
        before do
          sign_out
          @token = user2.generate_auth_token.token
        end

        it 'should authenticate with token, find comment from comment_id, and delete comment' do
          delete :destroy, dev_site_id: dev_site.id,
                           comment_id: comment_user2.id,
                           token: @token,
                           email: user2.email

          expect(assigns(:comment)).to eq(comment_user2)
          expect { comment_user2.reload }.to raise_error(ActiveRecord::RecordNotFound)
          assert_redirected_to dev_site_path(dev_site)
        end
      end

      context 'authentication token is not valid' do
        before :each do
          sign_out
        end

        context 'user is not found' do
          it 'should not delete comment and redirect to home page' do
            delete :destroy, dev_site_id: dev_site.id,
                             comment_id: comment_user2.id,
                             token: user2.generate_auth_token.token,
                             email: FFaker::Internet.email

            expect(comment_user2.reload).to eq(comment_user2)
            assert_redirected_to root_path
          end
        end

        context 'authentication token is expired' do
          it 'should not delete comment redirect to home page' do
            token = user2.generate_auth_token
            token.update(expires_at: DateTime.current - 1.day)

            delete :destroy, dev_site_id: dev_site.id,
                             comment_id: comment_user2.id,
                             token: token.token,
                             email: user2.email

            expect(comment_user2.reload).to eq(comment_user2)
            assert_redirected_to root_path
          end
        end
      end
    end

    describe '#update' do
      context 'user is authorized to update the comment' do
        before do
          sign_in user2
        end

        it 'should update the comment if params are valid' do
          valid_attributes = FactoryGirl.attributes_for(:comment)

          patch :update, dev_site_id: dev_site.id,
                         id: comment_user2.id,
                         comment: valid_attributes,
                         format: :json

          expect(comment_user2.reload.body).to eq(valid_attributes[:body])
          expect(response.status).to eq(200)
        end

        it 'should return error messages if params are not valid' do
          invalid_attributes = attributes_for(:comment, body: '')

          patch :update, dev_site_id: dev_site.id,
                         id: comment_user2.id,
                         comment: invalid_attributes,
                         format: :json

          expect(response.status).to eq(500)
        end
      end

      context 'valid authentication token is present in params' do
        before do
          sign_out
          @token = user2.generate_auth_token.token
        end

        it 'should authenticate with token, find comment from comment_id, and update comment' do
          patch :update, dev_site_id: dev_site.id,
                         comment_id: comment_user2.id,
                         comment: { flagged_as_offensive: Comment::APPROVED_STATUS },
                         token: @token,
                         email: user2.email

          expect(assigns(:comment)).to eq(comment_user2)
          expect(comment_user2.reload.flagged_as_offensive).to eq(Comment::APPROVED_STATUS)
          assert_redirected_to dev_site_path(dev_site)
        end
      end

      context 'authentication token is not valid' do
        before :each do
          sign_out
        end

        context 'user is not found' do
          it 'should not authenticate user and redirect to home page' do
            patch :update, dev_site_id: dev_site.id,
                           comment_id: comment_user2.id,
                           comment: { flagged_as_offensive: Comment::APPROVED_STATUS },
                           token: user2.generate_auth_token.token,
                           email: FFaker::Internet.email

            expect(comment_user2.reload.flagged_as_offensive).to eq(Comment::UNFLAGGED_STATUS)
            assert_redirected_to root_path
          end
        end

        context 'authentication token is expired' do
          it 'should not authenticate user and redirect to home page' do
            token = user2.generate_auth_token
            token.update(expires_at: DateTime.current - 1.day)

            patch :update, dev_site_id: dev_site.id,
                           comment_id: comment_user2.id,
                           comment: { flagged_as_offensive: Comment::APPROVED_STATUS },
                           token: token.token,
                           email: user2.email

            expect(comment_user2.reload.flagged_as_offensive).to eq(Comment::UNFLAGGED_STATUS)
            assert_redirected_to root_path
          end
        end
      end
    end
  end
end
