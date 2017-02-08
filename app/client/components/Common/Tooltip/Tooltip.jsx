import React, { Component } from 'react'
import css from './tooltip.scss'

export default class Tooltip extends Component {
  render() {
    return(
      <span className={css.tooltip} data-tip={this.props.text}>
        <i className='fa fa-question-circle' aria-hidden="true"></i>
      </span>
    )
  }
}