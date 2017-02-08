import React, { Component } from 'react'
import { render } from 'react-dom'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import ProfileHeader from '../../Common/ProfileHeader/ProfileHeader'
import ProfileMenu from '../../Common/ProfileMenu/ProfileMenu'
import i18n from './locale'
import css from './edit.scss'

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.locale = document.body.dataset.locale;

    this.loadNotification = () => this._loadNotification();
    this.loadUser = () => this._loadUser();
    this.submitForm = (e) => this._submitForm(e);
    this.loadNotification();
    this.loadUser();
  }

  _loadNotification() {
    $.getJSON(`/users/${document.body.dataset.userSlug}/notification`,
      notification => this.setState({ notification, loading: false })
    );
  }

  _loadUser() {
    $.getJSON(`/users/${document.body.dataset.userSlug}`,
      user => this.setState({ user })
    );
  }

  _submitForm(e) {
    const form = new FormData(document.querySelector('#notification-form'));
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const { notiUpdateF, notiUpdateS } = i18n;

    $.ajax({
      url: `/users/${document.body.dataset.userSlug}/notification`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: notification => {
        this.setState({ notification });
        window.flash('notice', notiUpdateS);
      },
      error: error => {
        window.flash('alert', notiUpdateF)
        this.setState({ error: error.responseJSON });
      }
    });
  }

  render() {
    const { user, notification, loading, error } = this.state;
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
            <ProfileMenu active='notification' />
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
                <h2>{i18n.notifications}</h2>

                <div className={css.meta}>
                  <div className={css.label}>
                    Email
                  </div>
                  <div className={css.data}>
                    <div className='row'>
                      <div className='input-field col s12'>
                        {i18n.emailQ1}
                      </div>
                      <form id='notification-form'>
                        <div className='input-field col s12'>
                          <input type='hidden' name='notification[updated_dev_site_near_me]' value={false} />
                          <input type='checkbox' defaultChecked={notification.updated_dev_site_near_me} id='notification_updated_dev_site_near_me' name='notification[updated_dev_site_near_me]'/>
                          <label htmlFor='notification_updated_dev_site_near_me'>{i18n.emailQ1S1}</label>
                        </div>
                        <div className='input-field col s12'>
                          <input type='hidden' name='notification[newletter]' value={false} />
                          <input type='checkbox' defaultChecked={notification.newletter} id='notification_newsletter' name='notification[newletter]'/>
                          <label htmlFor='notification_newsletter'>{i18n.emailQ1S2}</label>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <button name='commit' type='submit' className='btn' onClick={this.submitForm}>{i18n.save}</button>
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
  const edit = document.querySelector('#notification-edit')
  edit && render(<Edit/>, edit)
})
