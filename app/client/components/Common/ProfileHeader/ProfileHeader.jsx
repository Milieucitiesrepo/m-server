import React, { Component } from 'react'
import Verification from './Verification'
import i18n from './locale'
import css from './profileHeader.scss'

export default class ProfileHeader extends Component {
  constructor() {
    super()
    this.verifiedStatus = () => this._verifiedStatus();
  }

  _userRoleandOrganization() {
    if (this.props.user && this.props.user.organization && this.props.user.community_role) {
      return `${this.props.user.community_role}, ${this.props.user.organization}`
    } else if (this.props.user) {
      return this.props.user.organization || this.props.user.community_role || i18n.communityMember
    }
  }

  _verifiedStatus() {
    if (this.props.user && (this.props.user.profile.community_role || this.props.user.profile.organization)) {
      return <Verification {...this.props} />
    }
  }

  render() {
    const userRole = this._userRoleandOrganization()
    return(
      <div className={css.info}>
        <div className='container'>
          <div className={css.imgContainer}>
            <img alt='Profile Avatar' src={this.props.userAvatar || require('../images/default-avatar.png')} />
          </div>
          <div className={css.content}>
            <h1 className={css.name}>{this.props.userName}</h1>
            <h3 className={css.role}>{userRole}</h3>
            {this._verifiedStatus()}
          </div>
        </div>
      </div>
    )
  }
}
