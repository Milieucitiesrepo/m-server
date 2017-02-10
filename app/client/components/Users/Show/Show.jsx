import React, { Component } from 'react'
import { render } from 'react-dom'
import Dashboard from '../../Layout/Dashboard/Dashboard'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from './locale'

export default class Show extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.loadUser();
  }

  loadUser() {
    $.getJSON(`/users/${document.body.dataset.userSlug}`,
      user => this.setState({ user, loading: false })
    );
  }

  render() {
    const { user, loading } = this.state;
    i18n.setLanguage(document.body.dataset.locale);
    return(
      <Dashboard loading={loading} activeComponent='dashboard'>
        {
          !loading &&
          <div className={css.content}>
            <h2>{i18n.dashboard}</h2>

            <div className={css.meta}>
              <div className={css.label}>{i18n.recentComments}</div>
              <div className={css.data}>
                {
                  user && user.comments.slice(0, 5).map((comment, i) => {
                    return(
                      <div className={css.entry} key={i}>
                        <div className={css.date}>{comment.last_posted}</div>
                        {comment.body}
                      </div>
                    )
                  })
                }
                {
                  user && user.comments.length == 0 &&
                  <i>{i18n.noComment}</i>
                }
              </div>
            </div>
          </div>
        }
      </Dashboard>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const show = document.querySelector('#users-show');
  show && render(<Show/>, show);
})
