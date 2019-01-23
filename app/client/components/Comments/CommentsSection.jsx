import React, { Component } from 'react';
import _ from 'lodash'
import Comments from './Comments'
import CommentForm from './CommentForm'
import css from './comments.scss'
import i18n from './locale'

export default class CommentsSection extends Component {
  constructor(props) {
    super(props);
    const acceptedPrivacyPolicy = this._parseJsonData(document.body.dataset.userAcceptedPrivacyPolicy);
    this.state = { page: 0, limit: 5, comments: [], acceptedPrivacyPolicy };
    this.currentUserId = document.body.dataset.userId;
    this.fetchComments = () => this._fetchComments();
    this.saveComment = (b,id) => this._saveComment(b,id);
    this.deleteComment = (c) => this._deleteComment(c);
    this.editComment = (c,b) => this._editComment(c,b);
    this.handleSave = (b,id) => this._handleSave(b,id);
    this.handleDeleteRootComment = (c) => this._handleDeleteRootComment(c);
    this.handleEditRootComment = (c,b) => this._handleEditRootComment(c,b);
    this.openModal = () => this._openModal();
    this.hasMoreComments = () => this._hasMoreComments();
    this.appendMoreComments = () => this._appendMoreComments();
    this.vote = (c,d) => this._vote(c,d);
    this.createVote = (a,b,c,d) => this._createVote(a,b,c,d);
    this.destroyVote = (a,b,c,d) => this._destroyVote(a,b,c,d);
    this.handleVoteRootComment = (c,d) => this._handleVoteRootComment(c,d);
    this.handleChangePrivacyPolicy = (e) => this._handleChangePrivacyPolicy(e);
    this.checkForUnsavedComment = () => this._checkForUnsavedComment();

    this.fetchComments();
  }

  componentDidMount() {
    $('.modal-trigger').leanModal();
    this.checkForUnsavedComment();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.devSiteId !== this.props.devSiteId) {
      this.checkForUnsavedComment();
      this.setState({ page: 0, limit: 5, comments: []},
        () => this.fetchComments()
      )
    }
  }

  _parseJsonData(data) {
    return data ? JSON.parse(data) : null;
  }

  _appendMoreComments() {
    this.setState({ page: this.state.page + 1 }, this.fetchComments());
  }

  _openModal() {
    document.querySelector('#sign-in-modal .modal-content').focus();
  }

  _fetchComments() {
    $.getJSON(`/dev_sites/${this.props.devSiteId}/comments`,
      { page: this.state.page, limit: this.state.limit },
      comments => {
        this.setState({ comments: comments })
      }
    );
  }

  _checkForUnsavedComment() {
    const unsavedComment = JSON.parse(localStorage.getItem('unsavedComment'));
    if (unsavedComment && unsavedComment['devSiteId'] === this.props.devSiteId) {
      this.setState({ unsavedComment })
    }
  }

  _deleteComment(comment) {
    return new Promise((resolve, reject) => {
      const newComments = _.without(this.state.comments, comment);
      const devSiteId = this.props.devSiteId;

      $.ajax({
        url: `/dev_sites/${devSiteId}/comments/${comment.id}`,
        dataType: 'JSON',
        type: 'DELETE',
        success: res => {
          resolve(res)
        },
        error: error => {
          reject(error)
        },
      })
    })
  }

  _handleDeleteRootComment(comment) {
    this.deleteComment(comment).then(res => {
      const newComments = _.without(this.state.comments, comment);
      this.setState({ comments: newComments});
      window.flash('notice', i18n.commentDeletedSuccess);
    }).catch(err => {
      console.log(err);
      window.flash('alert', i18n.commentDeletedFailed);
    })
  }

  _saveComment(body, parentId) {
    return new Promise((resolve, reject) => {
      const limit = this.state.limit;
      const data = {
        comment: {
          body,
          commentable_id: this.props.devSiteId,
          commentable_type: 'DevSite',
          user_id: this.currentUserId,
          parent_id: parentId
        },
        limit,
        user: {
          accepted_privacy_policy: this.state.acceptedPrivacyPolicy
        }
      };

      $.ajax({
        url: `/dev_sites/${this.props.devSiteId}/comments`,
        dataType: 'JSON',
        type: 'POST',
        data: data,
        success: (comment) => {
          resolve(comment)
        },
        error: (error) => {
          reject(error)
        }
      })
    })
  }

  _handleSave(body, parentId) {
    if (!this.currentUserId) {
      const unsavedCommentJson = { body, parentId, devSiteId: this.props.devSiteId }
      localStorage.setItem('unsavedComment', JSON.stringify(unsavedCommentJson))
      $('#sign-in-modal').openModal();
      return false
    }

    this.saveComment(body, parentId).then((comment) => {
      if (comment.flagged_as_offensive === 'FLAGGED') {
        window.flash('alert', i18n.flaggedNotification);
      } else {
        window.flash('notice', i18n.commentSavedSuccess)
        this.state.comments.unshift(comment);
        this.setState({ comments: this.state.comments, unsavedComment: null });
        localStorage.removeItem('unsavedComment');
      }
    }).catch((error) => {
      window.flash('alert', i18n.commentSavedFailed)
    })
  }

  _editComment(comment, body) {
    return new Promise((resolve, reject) => {
      const devSiteId = this.props.devSiteId;

      $.ajax({
        url: `/dev_sites/${devSiteId}/comments/${comment.id}`,
        dataType: 'JSON',
        data: { comment: { body }},
        type: 'PATCH',
        success: (comment) => {
          resolve(comment);
        },
        error: error => {
          reject(error);
        }
      });
    })
  }

  _handleEditRootComment(comment, body) {
    this.editComment(comment, body).then((comment) => {
      window.flash('notice', i18n.commentSavedSuccess);
      this.fetchComments();
    }).catch((error) => {
      window.flash('alert', i18n.commentSavedFailed)
      console.log(error);
    })
  }

  _createVote(commentId, up, resolve, reject) {
    $.ajax({
      url: `/users/${this.currentUserId}/votes`,
      dataType: 'JSON',
      type: 'POST',
      data: { vote: { up: up, comment_id: commentId } },
      success: () => {
        resolve();
      },
      error: error => {
        reject({ message: error });
      }
    });
  }

  _destroyVote(commentId, voteId, resolve, reject) {
    $.ajax({
      url: `/users/${this.currentUserId}/votes/${voteId}`,
      dataType: 'JSON',
      type: 'DELETE',
      data: { vote: { comment_id: commentId } },
      success: () => {
        resolve();
      },
      error: error => {
        reject({ message: error });
      }
    });
  }

  _vote(comment, direction) {
    return new Promise((resolve, reject) => {
      const up = direction === 'up';

      if (up && comment.voted_up) {
        reject({ message: i18n.alreadyVotedUp })
      } else if (!up && comment.voted_down) {
        reject({ message: i18n.alreadyVotedDown })
      } else if (up && comment.voted_down) {
        this.destroyVote(comment.id, comment.voted_down, resolve, reject);
      } else if (!up && comment.voted_up) {
        this.destroyVote(comment.id, comment.voted_up, resolve, reject);
      } else  {
        this.createVote(comment.id, up, resolve, reject);
      };
    })
  }

  _handleVoteRootComment(comment, direction) {
    this.vote(comment, direction).then(() => {
      this.fetchComments();
    }).catch((err) => {
      window.flash('alert', err.message);
    })
  }

  _handleChangePrivacyPolicy(e) {
    this.setState({ acceptedPrivacyPolicy: e.currentTarget.checked })
  }

  render() {
    const totalComments = this.state.comments ? this.state.comments.length : 0;
    const comments = this.state.comments;
    const { locale } = document.body.dataset;
    const showSitePlanText = this.props.checkForSitePlanApplicationType();

    i18n.setLanguage(locale);

    if (showSitePlanText) {

      return(
        <div className={css.container}>
          <p>{i18n.sitePlanText}</p>
        </div>
      )

    } else {

      return(
        <div className={css.container}>
          <div>
            <h3>{i18n.makePublicComment}</h3>
            <CommentForm
              { ...this.props }
              handleSave={this.handleSave}
              acceptedPrivacyPolicy={this.state.acceptedPrivacyPolicy}
              handleChangePrivacyPolicy={this.handleChangePrivacyPolicy}
              currentUser={this.currentUserId}
              unsavedComment={this.state.unsavedComment}
            />
          </div>

          <div className={css.commentCount}>
            <p>{totalComments} responses</p>
          </div>

          { comments &&
            <Comments
              { ...this.props }
              children={comments}
              saveComment={this.saveComment}
              deleteComment={this.deleteComment}
              editComment={this.editComment}
              vote={this.vote}
              handleEditRootComment={this.handleEditRootComment}
              handleDeleteRootComment={this.handleDeleteRootComment}
              handleVoteRootComment={this.handleVoteRootComment}
              acceptedPrivacyPolicy={this.state.acceptedPrivacyPolicy}
              handleChangePrivacyPolicy={this.handleChangePrivacyPolicy}
              currentUser={this.currentUserId}
              unsavedComment={this.state.unsavedComment}
            />
          }
        </div>
      )
    }

  }
}