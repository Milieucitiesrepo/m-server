import React, { Component } from 'react'
import i18n from './locale'
import css from './profileMenu.scss'

export default class ProfileMenu extends Component {
  _generateLinks() {
    const sections = [
      { title: 'dashboard', path: '' },
      { title: 'settings', path: '/edit' },
      { title: 'notification', path: '/notification/edit' }
    ]
    const locale = document.body.dataset.locale
    const userSlug = document.body.dataset.userSlug

    return sections.map((section) => {
      const url = `/${locale}/users/${userSlug}${section.path}`
      const anchorText = i18n[section.title]
      const styles = this.props.active === section.title ? {fontWeight: 'bold'} : {}

      return(
        <li style={styles} key={section.title}>
          <a href={url}>{anchorText}</a>
        </li>
      )
    })
  }

  render() {
    const children = this._generateLinks()
    return(
      <div className={css.menu}>
        <ul>
          {children}
        </ul>
      </div>
    )
  }
}