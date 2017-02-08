import React, { Component } from 'react'
import { render } from 'react-dom'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import ProfileHeader from '../../Common/ProfileHeader/ProfileHeader'
import ProfileMenu from '../../Common/ProfileMenu/ProfileMenu'
import i18n from './locale'
import css from './show.scss'
import { debounce } from 'lodash'

export default class Show extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.loadUser = () => this._loadUser();
    this.loadUser();
  }
  _loadUser() {
    $.getJSON(`/users/${document.body.dataset.userSlug}`,
      user => this.setState({ user, loading: false })
    );
  }
  render() {
    const { user, loading } = this.state;
    const { userSlug, userAvatar, userName, locale } = document.body.dataset;
    i18n.setLanguage(locale);
    return(
      <div>
        <Header/>
        <ProfileHeader
          userName={userName}
          userAvatar={userAvatar}
          user={user}
        />
        <div className={css.container}>
          <div className='container'>
            <ProfileMenu active='dashboard' />
            {
              loading &&
              <div className='loading-screen'>
                <div className='spinner'>
                  <div className='bounce1'></div>
                  <div className='bounce2'></div>
                  <div className='bounce3'></div>
                </div>
              </div>
            }
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
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const show = document.querySelector('#users-show');
  show && render(<Show/>, show);
})
