import React, { Component } from 'react'
import css from './footer.scss'
import i18n from './locale'
import { debounce } from 'lodash'

export default class Footer extends Component {
  constructor() {
    super()
    this.state = { isMobile: (window.innerWidth < 600) }
    this.handleSubmit = (e) => this._handleSubmit(e);
    this.goTop = (e) => this._goTop(e)

    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
  }
  _goTop(e) {
    e.preventDefault();
    window.scrollTo(0,0);
  }
  _handleSubmit(e) {
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const { subscribeS, subscribeF } = i18n;
    if(e.which !== 13 && e.type !== 'click') {
      return false;
    }

    e.preventDefault();

    $.ajax({
      url: '/newsletter_subscriptions',
      dataType: 'JSON',
      type: 'POST',
      data: { newsletter_subscription: { email: this.refs.email.value } },
      success: () => {
        window.flash('notice', subscribeS);
        this.refs.email.value = ''
      },
      error: error => {
        if(error.status == 422) {
          window.flash('alert', error.responseJSON.email.join('. '));
        } else {
          window.flash('alert', subscribeF);
        }
        this.refs.email.value = ''
      }
    })
  }
  render() {
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    return (
      <div className={css.container}>
        <div className='row'>
          <div className='col s12 m3'>
            <h3 className={css.title}>
              {i18n.about}
            </h3>
            <ul>
              <li><a title='Go to Our Vision' href='http://about.milieu.io'>{i18n.ourVision}</a></li>
              <li><a title='Go to Our Team' href='http://about.milieu.io#large-image-1'>{i18n.ourTeam}</a></li>
              <li><a title='Go to Our Services' href='http://about.milieu.io#summary'>{i18n.ourServices}</a></li>
            </ul>
          </div>
          <div className='col s12 m3'>
            <h3 className={css.title}>
              {i18n.explore}
            </h3>
            <ul>
              <li><a title='Go to the Map' href={`/${locale}/dev_sites`}>{i18n.map}</a></li>
              <li><a title='Go to the Blog' href='https://medium.com/@milieucities'>{i18n.blog}</a></li>
              <li><a title='Go to the Privacy Policy' href={`/${locale}/legal/privacy`}>{i18n.privacy}</a></li>
            </ul>
          </div>
          <div className='col s12 m6'>
            <h3 className={css.title}>
              {i18n.followUs}
            </h3>
            <div className={css.socialMediaLinks}>
              <a title={i18n.twitter} href='https://twitter.com/milieucities'><i className='fa fa-twitter'></i></a>
              <a title={i18n.instagram} href='https://www.instagram.com/milieucities/'><i className='fa fa-instagram'></i></a>
               <a title={i18n.facebook} href='https://www.facebook.com/Milieucities/'><i className='fa fa-facebook'></i></a>
               <a title={i18n.linkedin} href='https://www.linkedin.com/company/milieu.io'><i className='fa fa-linkedin'></i></a>
              <a title={i18n.medium} href='https://medium.com/@milieucities'><i className='fa fa-medium'></i></a>
            </div>
            <h3 className={css.title}>
              {i18n.subscribe}
            </h3>
            <div className={css.newsletterEmailContainer}>
              <input type='email' ref='email' placeholder='E-mail' onKeyPress={this.handleSubmit} />
              <button onClick={this.handleSubmit} className='btn' title='Subscribe your email'><i className='fa fa-envelope-o'></i></button>
            </div>
          </div>
        </div>
        <div>
          <a href='#' onClick={this.goTop} className={css.skip} title='To the top'><i className='fa fa-arrow-up'></i></a>
        </div>
      </div>
    );
  }
}
