import React, { Component } from 'react'
import { render } from 'react-dom'
import { TextInputWithLabel, SelectWithLabel, MilieuDatePicker } from '../../Common/FormFields/Form'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../../DevSites/Form/locale.js'
import moment from 'moment'

export default class Edit extends Component {
  constructor(props) {
    super(props);
    const startDate = this.props.status ? this.props.status.start_date : null;
    const endDate = this.props.status ? this.props.status.end_date : null;


    this.state = { startDate, endDate };

    this.handleStartDate = (d) => this._handleStartDate(d)
    this.handleEndDate = (d) => this._handleEndDate(d)
    this.handleSaveMeeting = (d,m) => this._handleSaveMeeting(d,m)
    this.handleDeleteMeeting = (m) => this._handleDeleteMeeting(m)
    this.handleChangeStatusType = (data) => this._handleChangeStatusType(data);
    this.handleStatusUpdate = (v) => this._handleStatusUpdate(v);
    this.onDelete = (d) => this._onDelete(d)
    this.onSave = (d) => this._onSave(d)
  }

  _handleStartDate(date) {
    this.setState({ startDate: date });
  }

  _handleEndDate(date) {
    this.setState({ endDate: date });
  }

  _handleScheduledOn(date) {
    this.setState({ scheduledOn: date });
  }

  _handleStatusUpdate(value) {
    this.setState({ selectedState: value })
  }

  _handleChangeStatusType(value) {
    if (this.props.handleUpdateStatus) {
      this.props.handleUpdateStatus(value);
    } else {
      this.handleStatusUpdate(value);
    }
  }

  _onDelete(e) {
    e.preventDefault();
    this.props.handleDeleteStatus(this.props.status.id);
  }

  _onSave(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    this.props.handleSaveStatus(data, this.props.status.id);
  }

  render() {
    return(
      <div className={css.meta}>
        <div className={css.label}>
          {i18n.status}
        </div>
        <div className={css.data}>
          <form encType='multipart/form-data' onSubmit={this.onSave} acceptCharset='UTF-8'>
            <div className='row'>
              <SelectWithLabel
                classes='col s12'
                id='status_name'
                name='status[status]'
                label={i18n.status}
                defaultValue={this.props.status.status}
                options={this.props.statusOptions.map(s => [s,s])}
                onChange={this.handleChangeStatusType}
                />

              <div className='input-field col s12 m12 l6'>
                <label htmlFor='start_date'>{i18n.startDate}</label>
                <MilieuDatePicker
                  selected={this.state.startDate}
                  dateFormat='MMMM DD, YYYY'
                  name='status[start_date]'
                  onChange={this.handleStartDate} />
                {
                  this.props.error &&
                  <div className='error-message'>{this.props.error['status.start_date']}</div>
                }
              </div>

              <div className='input-field col s12 m12 l6'>
                <label htmlFor='end_date'>{i18n.endDate}</label>
                <MilieuDatePicker
                  selected={this.state.endDate}
                  dateFormat='MMMM DD, YYYY'
                  name='status[end_date]'
                  onChange={this.handleEndDate} />
                {
                  this.props.error &&
                  <div className='error-message'>{this.props.error['status.start_date']}</div>
                }
              </div>

              <div className="col">
                <input type='submit' value={i18n.save} className='btn submit' />
              </div>
              {
                !this.props.status.id &&
                <div className="col">
                  <button className='btn cancel' onClick={this.props.toggleStatusForm}>Cancel</button>
                </div>
              }
              {
                this.props.status.id &&
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

