require 'spec_helper'

describe Status do
  let(:status) { build(:status) }

  describe 'model validations' do
    it 'should have a valid factory' do
      expect(status).to be_valid
    end

    context 'when status is not present' do
      before { status.status = '' }
      it { should_not be_valid }
    end

    context 'when status_date is not present' do
      before { status.status_date = '' }
      it { should_not be_valid }
    end
  end

  describe 'scopes' do
    it 'should return the current status' do
      old_status = create(:status, status_date: (DateTime.current - 1.day))
      current_status = create(:status, status_date: DateTime.current)
      expect(current_status).to eq Status.current
    end
  end

  describe 'instance methods' do
    let(:active_status) { create(:status, status: 'Application File Pending') }
    let(:comment_open_status) { create(:status, status: 'Comment Period in Progress') }
    let(:comment_closed_status) { create(:status, status: 'Comment Period has Ended/Issue Resolution') }

    context '#general_status' do
      it 'should return Active Development' do
        expect(active_status.general_status).to eq 'Active Development'
      end

      it 'should return Comment Period' do
        expect(comment_open_status.general_status).to eq 'Comment Period'
      end

      it 'should return Comment Period Closed' do
        expect(comment_closed_status.general_status).to eq 'Comment Period Closed'
      end
    end
  end

end
