import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/footer.scss'

export default class MobileFooter extends Component {

  render() {
    return (
      <div className={css.footer}>
        <ul>
          <li><a href='/' title='info'>à propos</a></li>
          <li><a href='/utilisation' title='d’utilisation'>guide</a></li>
          <li><a href='/participez' title='participez'>participez</a></li>
        </ul>
      </div>
    )
  }
}
