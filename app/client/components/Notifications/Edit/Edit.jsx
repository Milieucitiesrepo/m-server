import React, { Component } from 'react'
import { render } from 'react-dom'
import Dashboard from '../../Layout/Dashboard/Dashboard'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from './locale'

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: {} };

    this.loadNotification = () => this._loadNotification();
    this.submitForm = (e) => this._submitForm(e);
    this.loadNotification();
  }

  _loadNotification() {
    $.getJSON(`/users/${document.body.dataset.userSlug}/notification`,
      notification => this.setState({ notification, loading: false })
    );
  }

  _submitForm(e) {
    const form = new FormData(document.querySelector('#notification-form'));
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);

    $.ajax({
      url: `/users/${document.body.dataset.userSlug}/notification`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: notification => {
        this.setState({ notification, error: {}});
        window.flash('notice', i18n.notiUpdateS);
      },
      error: error => {
        window.flash('alert', i18n.notiUpdateF)
        this.setState({ error: error.responseJSON });
      }
    });
  }

  render() {
    const { notification, loading, error } = this.state;
    i18n.setLanguage(document.body.dataset.locale);

    return(
      <Dashboard loading={loading} activeComponent='notification'>
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
      </Dashboard>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const edit = document.querySelector('#notification-edit')
  edit && render(<Edit/>, edit)
})
