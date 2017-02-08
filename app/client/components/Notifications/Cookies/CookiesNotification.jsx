import React, { Component } from 'react';
import i18n from './locale'
import css from './cookies-notification.scss'

export default class CookiesNotification extends Component {
  render() {
    const {locale} = document.body.dataset;
    i18n.setLanguage(locale);
    const privacyUrl = `/${locale}/legal/privacy`

    const acceptCookies = () => {
      localStorage.setItem('acceptedMilieuCookies', 'true')
      document.querySelector(`.${css.cookiesNotification}`).style.display = 'none'
    }

    return(
      <div className={css.cookiesNotification}>
        <div className={css.notificationText}>
          <p>
            {i18n.text1}
            <a href={privacyUrl}>{i18n.privacy}</a>
            {i18n.text2}
            <a className={`${css.okButton} btn`} onClick={acceptCookies}>Ok </a>
          </p>
        </div>
      </div>
    )
  }
}
