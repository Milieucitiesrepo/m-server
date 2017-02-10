import React, { Component } from 'react'
import i18n from './locale'
import css from './profileHeader.scss'
import Tooltip from '../../../Common/Tooltip/Tooltip'

export default class Verification extends Component {
  constructor() {
    super()
    this.state = { verificationStatus: document.body.dataset.userVerificationStatus }
    this.sendVerificationRequest = () => this._sendVerificationRequest()
  }

  _sendVerificationRequest() {
    const data = {
      user: {
        profile_attributes: {
          id: document.body.dataset.userProfileId,
          verification_status: 'pendingVerification'
        }
      }
    }
    $.ajax({
      url: `/users/${document.body.dataset.userSlug}`,
      dataType: 'JSON',
      data: data,
      type: 'PATCH',
      success: user => {
        this.setState({ verificationStatus: 'pendingVerification' })
        EventSystem.publish('reloadUser');
      },
      error: error => {
        window.flash('alert', 'A few missing pieces of information are missing');
        EventSystem.publish('setError', { error: error.responseJSON });
      }
    });
  }

  render() {
    const { locale } = document.body.dataset;
    const { verificationStatus } = this.state;
    i18n.setLanguage(locale);

    return(
      <div className={css.verified}>
        {`${i18n.status}${i18n[verificationStatus]}`}
        {
          this.props.active === 'settings' && verificationStatus === 'notVerified' &&
          <button className={`btn ${css.verifyBtn}`} onClick={this.sendVerificationRequest}>
            {i18n.requestVerification}
          </button>
        }
        <Tooltip text={i18n.verificationTooltip} />
    </div>
    )
  }
}
