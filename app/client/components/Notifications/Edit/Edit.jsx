import React, { Component } from 'react'
import { render } from 'react-dom'
import { TextInputWithLabel, SelectWithLabel, RadioButtonsWithLabel, MilieuDatePicker } from '../../Common/FormFields/Form'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../../DevSites/Form/locale.js'
import moment from 'moment'

export default class Edit extends Component {
  constructor(props) {
    super(props);
    const scheduledOn = this.props.notification ? this.props.notification.send_at : null;

    this.state = { scheduledOn };

    this.handleScheduledOn = (d) => this._handleScheduledOn(d)
    this.handleChangeNotificationType = (data) => this._handleChangeNotificationType(data);
    this.onDelete = (d) => this._onDelete(d)
    this.onSave = (d) => this._onSave(d)
    this.generateUploadComponent = () => this._generateUploadComponent();
  }

  _handleScheduledOn(date) {
    this.setState({ scheduledOn: date });
  }

  _handleChangeNotificationType(value) {
    this.setState({ selectedNotificationType: value })
  }

  _onDelete(e) {
    e.preventDefault();
    this.props.handleDeleteNotification(this.props.status.id, this.props.notification.id);
  }

  _onSave(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    this.props.handleSaveNotification(data, this.props.status.id);
  }

  _generateUploadComponent() {
    if (this.props.notification && this.props.notification.filesuploader) {
      return(
        <div className='col s12 m12 l6'>
          <label htmlFor='status_notice'>{i18n.notice}</label>
          <p><a href={this.props.notification.filesuploader.url}>{i18n.uploadedDocument}</a></p>
        </div>
      )
    } else {
      return(
        <div className='file-field input-field col s12 m12 l6'>
          <label htmlFor='notification_notice'>{i18n.notice}</label>
          <input type='file' name='notification[notice]' id='notification_notice' />
        </div>
      )
    }
  }

  render() {
    const options = this.props.notificationOptions[this.props.selectedStatus];
    if (options.length < 1) { return <div></div> };

    return(
      <div className={css.meta}>
        <div className={css.label}>
          {i18n.notification}
        </div>
        <div className={css.data}>
          <form encType='multipart/form-data' onSubmit={this.onSave} acceptCharset='UTF-8'>
            <div className='row'>
              <div className='row'>
                {this.generateUploadComponent()}

                <div className='input-field col s12 m12 l6'>
                  <label htmlFor='send_notification_at'>{i18n.scheduledOn}</label>
                  <MilieuDatePicker
                    selected={this.state.scheduledOn}
                    dateFormat='MMMM DD, YYYY'
                    name='notification[send_at]'
                    onChange={this.handleScheduledOn}
                  />
                  {
                    this.props.error &&
                    <div className='error-message'>{this.props.error['notification.send_at']}</div>
                  }
                </div>
              </div>

              <div className='row'>
                <RadioButtonsWithLabel
                  classes='col s12'
                  id='notification_type'
                  name='notification[notification_type]'
                  label={i18n.notificationType}
                  defaultValue={this.props.status.notification ? this.props.status.notification.notification_type : null}
                  options={options}
                  onChange={this.handleChangeNotificationType}
                />
              </div>

              <div className="col">
                <input type='submit' value={i18n.save} className='btn submit' />
              </div>

              {
                this.props.notification &&
                <div className="col">
                  <button className='btn cancel' onClick={this.onDelete}>Delete</button>
                </div>
              }

            </div>
          </form>
        </div>
      </div>
    )
  }
}

