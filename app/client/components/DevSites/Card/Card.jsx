import React, { Component } from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import css from './card.scss'
import i18n from './locale.js'

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.handleClick = () => this._handleClick();
    this.formatDate = (date) => this._formatDate(date);
  }

  _handleClick() {
    this.props.handleClick(this.props.devSite.id);
  }

  _formatDate() {
    const date = this.props.devSite.updated_at;
    const momentDate = moment.utc(date, 'YYYY-MM-DD').local().format('MMMM D, YYYY');
    return momentDate;
  }

  render() {
    const lastEdited = this.formatDate(this.props.devSite.updated_at);

    return(
      <div className={css.cardContainer} onClick={this.handleClick}>
        <div className={css.cardContent}>
          <div className="col s8">
            <div className={css.header}>
              <p className={css.appType}>{this.props.devSite.application_type_name}</p>
              <p className={css.address}>{this.props.devSite.address}</p>
            </div>
            <p>{`${i18n.fileNumber} ${this.props.devSite.devID}`}</p>
            <p>{`${i18n.lastEdited} ${lastEdited}`}</p>
          </div>
          <div className={`col s4 ${css.image}`}>
            <img src={this.props.devSite.image_url} />
          </div>
        </div>
      </div>
    )
  }
}