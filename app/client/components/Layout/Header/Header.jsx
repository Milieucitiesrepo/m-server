import React, { Component } from 'react'
import css from './header.scss'
import { debounce } from 'lodash'
import i18n from './locale'
import CookiesNotification from '../../NotificationSettings/Cookies/CookiesNotification'

export default class Header extends Component {
  constructor() {
    super()
    this.state = { isMobile: (window.innerWidth < 600) };

    this.openModal = () => this._openModal();
    this.openMenu = (e) => this._openMenu(e);
    this.closeMenu = (e) => this._closeMenu(e);

    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
  }
  componentDidMount() {
    $('.modal-trigger').leanModal();
  }
  _openModal() {
    document.querySelector('#sign-in-modal .modal-content').focus();
  }
  _openMenu(e) {
    e.preventDefault();
    this.setState({ showMenu: true }, () => {
      $(this.refs.menu).velocity('transition.expandIn', { duration: 250 });
    });
  }
  _closeMenu(e) {
    e.preventDefault();
    $(this.refs.menu).velocity('transition.expandOut',
    { duration: 250, complete: () => this.setState({ showMenu: false }) });
  }
  handleChangeLocalization(locale) {
    const regex = /^\/en\/|\/en$|\/fr\/|\/fr$/;
    if(location.pathname.match(regex)) {
      return location.pathname.replace(regex, `/${locale}/`)
    } else {
      return `/${locale}/${location.pathname.length > 1 ? location.pathname : ''}`
    }
  }
  render() {
    const { profile, isMobile, showMenu } = this.state;
    const { userId, userSlug, userAvatar, userName, locale } = document.body.dataset;
    i18n.setLanguage(locale);

    return (
      <div className={css.container}>
        {
          isMobile &&
          <div className={css.mobile}>
            <a href='#' title='Menu' onClick={this.openMenu}>
              <svg width='40' height='36'>
                <line x1='5' y1='10' x2='35' y2='10' strokeWidth='2' stroke='#777' strokeLinecap='round' />
                <line x1='5' y1='18' x2='35' y2='18' strokeWidth='2' stroke='#777' strokeLinecap='round' />
                <line x1='5' y1='26' x2='35' y2='26' strokeWidth='2' stroke='#777' strokeLinecap='round' />
              </svg>
            </a>

            {
              showMenu &&
              <div ref='menu' className={css.mobileMenu}>
                <a href='#' onClick={this.closeMenu}>
                  <svg className={css.closeMenu} width='25' height='25'>
                    <line x1='5' y1='5' x2='20' y2='20' strokeWidth='2' stroke='#fff' strokeLinecap='round' />
                    <line x1='5' y1='20' x2='20' y2='5' strokeWidth='2' stroke='#fff' strokeLinecap='round' />
                  </svg>
                </a>
                <a href={`/${locale}`}>
                  <img src={require('./images/dark-logo.svg')} title={'Milieu\'s Logo'} />
                </a>
                <a href={`/${locale}/dev_sites`} title={i18n.map}>{i18n.map}</a>
                <a href={`/${locale}/users/${userSlug}`} title='Go to your Dashboard'>Dashboard</a>
                <a href='http://www.milieu.io/' title={i18n.about}>{i18n.about}</a>
                <a title={i18n.logOut} rel='nofollow' data-method='delete' href={`/${locale}/sessions/${userId}`}>{i18n.logOut}</a>
                <div className={css.mobileLocale}>
                  <a title='Change language to English' href={this.handleChangeLocalization('en')}>EN</a> | <a title='Change language to French' href={this.handleChangeLocalization('fr')}>FR</a>
                </div>
              </div>
            }
          </div>
        }
        {
          !isMobile &&
          <div className={css.fullPage}>
            <a href={`/${locale}`} className={css.logo}>
              <img src={require('./images/logo.png')} title={'Milieu\'s Logo'} />
            </a>
            <div className={css.linksAndLocale}>
              <div className={css.links}>
                {
                  !userId &&
                  <div>
                    <a href={`/${locale}/dev_sites`} title={i18n.map}>{i18n.map}</a>
                    <a href='http://www.milieu.io/' title={i18n.about}>{i18n.about}</a>
                    <a href='#sign-in-modal' className='modal-trigger' onClick={this.openModal} title={i18n.logIn}>{i18n.logIn}</a>
                  </div>
                }
                {
                  userId &&
                  <div>
                    <a href={`/${locale}/dev_sites`} title={i18n.map}>{i18n.map}</a>
                    <a href='http://www.milieu.io/' title={i18n.about}>{i18n.about}</a>
                    <a href={`/${locale}/users/${userSlug}`} title='Go to your Dashboard'>
                      <img className={css.profileImage} src={ userAvatar || require('./images/default-avatar.png')} />
                    </a>
                    <a title={i18n.logOut} rel='nofollow' data-method='delete' href={`/${locale}/sessions/${userId}`}>{i18n.logOut}</a>
                  </div>
                }
              </div>
              <div className={css.locale}>
                <a title='Change language to English' href={this.handleChangeLocalization('en')}>EN</a> | <a title='Change language to French' href={this.handleChangeLocalization('fr')}>FR</a>
              </div>
            </div>
          </div>
        }
        {
          localStorage.getItem('acceptedMilieuCookies') !== 'true' &&
          <CookiesNotification />
        }
      </div>
    );
  }
}
