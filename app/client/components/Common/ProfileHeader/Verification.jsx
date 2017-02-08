import React, { Component } from 'react'
import i18n from './locale'
import css from './profileHeader.scss'
import Tooltip from '../Tooltip/Tooltip'

export default class Verification extends Component {
  constructor() {
    super()
    this.requestVerification = () => this._requestVerification()
    this.sendVerificationRequest = () => this._sendVerificationRequest()
  }

  _requestVerification() {
    this.props.flagVerificationRequested()
    this.sendVerificationRequest()
  }

  _sendVerificationRequest() {
    const data = {
      user: {
        profile_attributes: {
          id: this.props.user.profile.id,
          verification_status: 'pendingVerification'
        }
      }
    }
    $.ajax({
      url: `/users/${document.body.dataset.userSlug}`,
      dataType: 'JSON',
      data: data,
      type: 'PATCH',
      success: (res, status) => {
        if (status === 'success') {
          this.props.verificationCallback();
          window.flash('notice', 'Requested verification');
        } else {
          window.flash('alert', `We weren\'t able to make your request: ${res}`);
        }
      },
      error: error => {
        window.flash('alert', `All required fields must be saved.`);
        this.props.parent.setState({ error: error.responseJSON });
      }
    });
  }

  render() {
    const status = `${i18n.status}${i18n[this.props.user.profile.verification_status]}`
    return(
      <div className={css.verified}>
        {status}
        {this.props.showVerificationButton && this.props.user.profile.verification_status === 'notVerified' &&
          <button
            className={`btn ${css.verifyBtn}`}
            onClick={this.requestVerification}
          >{i18n.requestVerification}
          </button>
        }
        <Tooltip
          text={i18n.verificationTooltip}
        />
    </div>
    )
  }
}
