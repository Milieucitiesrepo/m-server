import React, { Component } from 'react'
import i18n from './locale'
import css from './profileMenu.scss'

export default class ProfileMenu extends Component {
  _generateLinks() {
    const { userName, userSlug, userRoles, userPrimaryOrganizationId, locale } = document.body.dataset;
    i18n.setLanguage(locale);

    const sections = [
      { title: 'dashboard', path: `/${locale}/users/${userSlug}` },
      { title: 'settings', path: `/${locale}/users/${userSlug}/edit` },
      { title: 'notification', path: `/${locale}/users/${userSlug}/notification/edit` },
      {
        title: 'manage_dev_site',
        path: `/${locale}/organizations/${userPrimaryOrganizationId}/dev_sites`,
        restricted: (userPrimaryOrganizationId.length === 0)
      },
      {
        title: 'organizations',
        path: `/${locale}/organizations`,
        restricted: (userRoles.indexOf('admin') === -1)
      },
    ]

    return sections.map((section) => {
      const styles = this.props.active === section.title ? { fontWeight: 700 } : {}
      if (section.restricted) return false;

      return(
        <li style={styles} key={section.title}>
          <a href={section.path}>{i18n[section.title]}</a>
        </li>
      )
    })
  }

  render() {
    return(
      <div className={css.menu}>
        <ul>
          {this._generateLinks()}
        </ul>
      </div>
    )
  }
}
