import React, { Component } from 'react'
import { List } from 'immutable'
import { RIETextArea } from 'riek'
import css from './comments.scss'
import i18n from './locale'

export default class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = { comments: List(), page: 0, limit: 5 }
    this.currentUserId = document.body.dataset.userId;
    this.loadComments = () => this._loadComments();
    this.hasMoreComments = () => this._hasMoreComments();
    this.appendMoreComments = () => this._appendMoreComments();
    this.loadComments();
    this.openModal = () => this._openModal();
  }

  componentDidMount() {
    $('.modal-trigger').leanModal();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.devSiteId !== this.props.devSiteId) {
      this.setState({ page: 0, comments: List()},
        () => this.loadComments()
      )
    }
  }

  _openModal() {
    document.querySelector('#sign-in-modal .modal-content').focus();
  }

  _loadComments() {
    $.getJSON(`/dev_sites/${this.props.devSiteId}/comments`,
      { page: this.state.page, limit: this.state.limit },
      comments => this.setState({ comments: List(comments), total: (comments.length > 0 ? comments[0].total : 0) })
    );
  }

  _hasMoreComments() {
    const { page, total, limit } = this.state;
    return ( (page + 1) * limit < total );
  }

  _appendMoreComments() {
    this.setState({ page: this.state.page + 1 },
      () => {
        $.getJSON(`/dev_sites/${this.props.devSiteId}/comments`,
          { page: this.state.page, limit: this.state.limit },
          comments => this.setState({ comments: this.state.comments.push(...comments), total: comments[0].total })
        );
      }
    );
  }

  render() {
    const { comments, total } = this.state;
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    return <div className={css.container}>
      <div className={!this.currentUserId && css.nouser}>
        {
          this.currentUserId
          ? <CommentForm {...this.props} parent={this} />
        : <a href='#sign-in-modal' className='modal-trigger btn' onClick={this.openModal}>{i18n.signInToComment}</a>
        }
      </div>
      {
        total > 0 &&
        <div className={css.number}> {total} responses</div>
      }
      {comments.map(comment => <Comment comment={comment} key={comment.id} parent={this} />)}
      {
        this.hasMoreComments() &&
        <a onClick={this.appendMoreComments} className={css.loadmore}>{i18n.loadMore}</a>
      }
    </div>;
  }
}

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.parent = this.props.parent;
    this.currentUserId = document.body.dataset.userId;
    this.handleChange = (e) => this.setState({ body: e.target.value });
    this.submitForm = (e) => this._submitForm(e);
  }

  _submitForm(e) {
    e.preventDefault();
    const { body, limit } = this.state;
    const data = {
                    comment: {
                      body,
                      commentable_id: this.props.devSiteId,
                      commentable_type: 'DevSite',
                      user_id: this.currentUserId
                    },
                    limit
                  }
    $.ajax({
      url: `/dev_sites/${this.props.devSiteId}/comments`,
      dataType: 'JSON',
      type: 'POST',
      data: data,
      success: (comment) => {
        this.parent.setState({
          comments: this.parent.state.comments.unshift(comment),
          total: this.parent.state.total + 1
        })
        this.setState({ body: '' });
      }
    });
  }

  render() {
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    return <form id='new_comment' onSubmit={this.submitForm}>
      <input name='utf8' type='hidden' value='✓' />
      <div className={css.wrapper}>
        <textarea className={css.textarea}
                  value={this.state.body}
                  onChange={this.handleChange}
                  placeholder={i18n.whatDoYouThink}>
        </textarea>
        <input type='submit' value={i18n.comment} className={css.submit}/>
      </div>
    </form>
  }
}

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = { showReadMore: false };
    this.currentUserId = document.body.dataset.userId;
    this.viewWholeBody = (e) => this._viewWholeBody(e);
    this.voteUp = () => this._voteUp();
    this.voteDown = () => this._voteDown();
    this.deleteComment = (e) => this._deleteComment(e);
    this.editComment = (e) => this._editComment(e);
  }

  componentDidMount() {
    if(this.refs.body.scrollHeight > 150) {
      this.setState({ showReadMore: true, readMoreClicked: false });
    }
  }

  _viewWholeBody(e) {
    e.preventDefault();
    this.setState({ readMoreClicked: true });
  }

  _voteUp() {
    const { comment, parent } = this.props;
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const { failedToVote } = i18n;
    if(comment.voted_up) {
      $.ajax({
        url: `/users/${this.currentUserId}/votes/${comment.voted_up}`,
        dataType: 'JSON',
        type: 'DELETE',
        data: { vote: { comment_id: this.props.comment.id } },
        success: () => {
          parent.loadComments();
        },
        error: error => {
          window.flash('alert', failedToVote)
        }
      });
    } else if(comment.voted_down) {
        $.ajax({
          url: `/users/${this.currentUserId}/votes/${comment.voted_down}`,
          dataType: 'JSON',
          type: 'DELETE',
          data: { vote: { comment_id: this.props.comment.id } },
          success: () => {
            parent.loadComments();
          },
          error: error => {
            window.flash('alert', failedToVote)
          }
        });
      } else {
        $.ajax({
          url: `/users/${this.currentUserId}/votes`,
          dataType: 'JSON',
          type: 'POST',
          data: { vote: { up: true, comment_id: this.props.comment.id } },
          success: () => {
            parent.loadComments();
          },
          error: error => {
            window.flash('alert', failedToVote)
          }
        });
      }
  }

  _voteDown() {
    const { comment, parent } = this.props;
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const { failedToVote } = i18n;
    if(comment.voted_down) {
      $.ajax({
        url: `/users/${this.currentUserId}/votes/${comment.voted_down}`,
        dataType: 'JSON',
        type: 'DELETE',
        data: { vote: { comment_id: this.props.comment.id } },
        success: () => {
          parent.loadComments();
        },
        error: error => {
          window.flash('alert', failedToVote)
        }
      });
    } else if(comment.voted_up) {
      $.ajax({
        url: `/users/${this.currentUserId}/votes/${comment.voted_up}`,
        dataType: 'JSON',
        type: 'DELETE',
        data: { vote: { comment_id: this.props.comment.id } },
        success: () => {
          parent.loadComments();
        },
        error: error => {
          window.flash('alert', failedToVote)
        }
      });
    } else {
      $.ajax({
        url: `/users/${this.currentUserId}/votes`,
        dataType: 'JSON',
        type: 'POST',
        data: { vote: { up: false, comment_id: this.props.comment.id } },
        success: () => {
          parent.loadComments();
        },
        error: error => {
          window.flash('alert', failedToVote)
        }
      });
    }
  }

  _deleteComment(e) {
    e.preventDefault();
    const { comment, parent } = this.props;
    const devSiteId = this.props.parent.props.devSiteId
    $.ajax({
      url: `/dev_sites/${devSiteId}/comments/${comment.id}`,
      dataType: 'JSON',
      type: 'DELETE',
      success: (comment) => {
        parent.loadComments();
      },
      error: error => {
        window.flash('alert', error.responseText)
      }
    });
  }

  _editComment(e) {
    const { comment, parent } = this.props;
    const devSiteId = this.props.parent.props.devSiteId
    $.ajax({
      url: `/dev_sites/${devSiteId}/comments/${comment.id}`,
      dataType: 'JSON',
      data: { comment: { body: e.commentBody }},
      type: 'PATCH',
      success: () => {
        parent.loadComments();
      },
      error: error => {
        window.flash('alert', error.responseText)
      }
    });
  }

  render() {
    const { comment } = this.props;
    const { readMoreClicked, showReadMore } = this.state;
    const { locale } = document.body.dataset;
    const userOwnsComment = (comment.user && comment.user.id == this.currentUserId);
    i18n.setLanguage(locale);
    return(
      <div className={css.comment}>
        <div className={css.info}>
          <span className={css.name}>
            {comment.user ? (!comment.user.anonymous_comments && comment.user.name || i18n.anoymous) : i18n.anoymous}
          </span>
          <span className={css.date}>
            {moment(comment.created_at).format('MMMM DD, YYYY ')}
          </span>
          {
            userOwnsComment &&
            <span className={css.user_actions}>
              <a href='#' onClick={this.deleteComment}><i className='fa fa-trash' /></a>
            </span>
          }
        </div>
        <div className={css.bodyContainer}>
          <div className={readMoreClicked ? css.wholebody : css.body} ref='body'>
            {
              userOwnsComment &&
              <RIETextArea
                value={comment.body}
                change={this.editComment}
                propName='commentBody'
              />
            }
            {
              !userOwnsComment &&
              <p dangerouslySetInnerHTML={{__html: comment.body.replace(/\n\r?/g, '<br>') }}></p>
            }
          </div>
          <div className={css.votesContainer}>
            <i className='fa fa-angle-up fa-2x' onClick={this.voteUp} tabIndex='0'></i>
            <i className='fa fa-angle-down fa-2x' onClick={this.voteDown} tabIndex='0'></i>
            { comment.vote_count }
          </div>
        </div>
        {
          showReadMore && !readMoreClicked &&
          <a href='#' onClick={this.viewWholeBody} className={css.readmore} tabIndex='-1'>{i18n.readMore}</a>
        }
      </div>
    )
  }
}
