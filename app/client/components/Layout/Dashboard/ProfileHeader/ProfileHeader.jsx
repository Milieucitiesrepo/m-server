import React, { Component } from 'react'
import Verification from './Verification'
import i18n from './locale'
import css from './profileHeader.scss'

export default class ProfileHeader extends Component {
  render() {
    const { userAvatar, userName, userOrganization, userCommunityRole, locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const userRole = userOrganization && userCommunityRole
      ? `${userCommunityRole}, ${userOrganization}`
      : (userOrganization || userCommunityRole || i18n.communityMember)

    return(
      <div className={css.info}>
        <div className='container'>
          <div className={css.imgContainer}>
            <img alt='Profile Avatar' src={userAvatar || require('../../../Common/images/default-avatar.png')} />
          </div>
          <div className={css.content}>
            <h1 className={css.name}>{userName}</h1>
            <h3 className={css.role}>{userRole}</h3>
            {
              (userOrganization || userCommunityRole) &&
              <Verification {...this.props} />
            }
          </div>
        </div>
      </div>
    )
  }
}
