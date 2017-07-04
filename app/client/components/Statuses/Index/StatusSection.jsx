import React, { Component } from 'react'
import { render } from 'react-dom'
import Index from '../Index/Index'
import Edit from '../Edit/Edit'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../../DevSites/Form/locale.js'

export default class StatusSection extends Component {
  constructor(props) {
    super(props);
    this.state = { openStatusForm: false };
    this.handleSaveStatus = (d,m) => this._handleSaveStatus(d,m);
    this.handleDeleteStatus = (m) => this._handleDeleteStatus(m);
    this.handleSaveMeeting = (d,m) => this._handleSaveMeeting(d,m);
    this.handleDeleteMeeting = (m) => this._handleDeleteMeeting(m);
    this.toggleStatusForm = () => this._toggleStatusForm();
  }

  _handleSaveStatus(data, statusId) {
    const { locale } = document.body.dataset;
    let [url, type] = [`/dev_sites/${this.props.devSite.id}/statuses`, 'POST'];

    if(statusId) {
      [url, type] = [`/dev_sites/${this.props.devSite.id}/statuses/${statusId}`, 'PATCH']
    }

    $.ajax({
      url,
      type,
      data,
      dataType: 'JSON',
      contentType: false,
      processData: false,
      success: meeting => {
        window.flash('notice', 'Successfully saved!')
        Turbolinks.visit(`/${locale}/dev_sites/${this.props.devSite.id}`);
      },
      error: error => {
        window.flash('alert', 'Failed to save!')
        console.log(error.responseJSON)
        this.setState({ error: error.responseJSON })
      }
    });
  }

  _handleDeleteStatus(statusId) {
    const { locale } = document.body.dataset;
    let [url, type] = [`/dev_sites/${this.props.devSite.id}/statuses/${statusId}`, 'DELETE'];

    $.ajax({
      url,
      type,
      dataType: 'JSON',
      success: status => {
        window.flash('notice', 'Successfully deleted!')
        Turbolinks.visit(`/${locale}/dev_sites/${this.props.devSite.id}`);
      },
      error: error => {
        window.flash('alert', 'Failed to delete!')
        this.setState({ error: error.responseJSON })
      }
    });
  }


  _handleSaveMeeting(data, statusId, meetingId) {

    const { locale } = document.body.dataset;
    let [url, type] = [`/dev_sites/${this.props.devSite.id}/statuses/${statusId}/meetings`, 'POST'];

    if(meetingId) {
      [url, type] = [`/dev_sites/${this.props.devSite.id}/statuses/${statusId}/meetings/${meetingId}`, 'PATCH']
    }

    $.ajax({
      url,
      type,
      data,
      dataType: 'JSON',
      contentType: false,
      processData: false,
      success: meeting => {
        window.flash('notice', 'Successfully saved!')
        Turbolinks.visit(`/${locale}/dev_sites/${this.props.devSite.id}`);
      },
      error: error => {
        window.flash('alert', 'Failed to save!')
        console.log(error.responseJSON)
        this.setState({ error: error.responseJSON })
      }
    });
  }

  _handleDeleteMeeting(statusId, meetingId) {
    const { locale } = document.body.dataset;
    let [url, type] = [`/dev_sites/${this.props.devSite.id}/statuses/${statusId}/meetings/${meetingId}`, 'DELETE'];

    $.ajax({
      url,
      type,
      dataType: 'JSON',
      success: meeting => {
        window.flash('notice', 'Successfully deleted!')
        Turbolinks.visit(`/${locale}/dev_sites/${this.props.devSite.id}`);
      },
      error: error => {
        window.flash('alert', 'Failed to delete!')
        this.setState({ error: error.responseJSON })
      }
    });
  }

  _toggleStatusForm() {
    this.setState({ openStatusForm: !this.state.openStatusForm });
  }

  render() {
    console.log('this.props.devSite', this.props.devSite)
    const statuses = this.props.devSite.statuses || [];

    return(
      <div>
        <Index
          { ...this.props }
          statuses={ statuses }
          handleSaveStatus={ this.handleSaveStatus }
          handleDeleteStatus={ this.handleDeleteStatus }
          handleSaveMeeting={ this.handleSaveMeeting }
          handleDeleteMeeting={ this.handleDeleteMeeting }
        />
        {
          !this.state.openStatusForm &&
          <div className="col">
            <button onClick={this.toggleStatusForm} className='btn'>Add Status</button>
          </div>
        }
        {
          this.state.openStatusForm &&
          <Edit
            { ...this.props }
            status={ {} }
            handleSaveStatus={ this.handleSaveStatus }
            handleDeleteStatus={ this.handleDeleteStatus }
            toggleStatusForm={ this.toggleStatusForm }
            error={ this.state.error }
          />
        }
      </div>
    )
  }
}