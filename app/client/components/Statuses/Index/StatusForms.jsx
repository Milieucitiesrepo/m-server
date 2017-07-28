import React, { Component } from 'react'
import { render } from 'react-dom'
import moment from 'moment'

import EditStatus from '../Edit/Edit'
import EditMeeting from '../../Meetings/Edit/Edit'
import EditNotification from '../../Notifications/Edit/Edit'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../../DevSites/Form/locale.js'
import { DEFAULT_STATUS } from '../../Common/constants'

export default class StatusForms extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedStatus: this.props.status.status || DEFAULT_STATUS };
    this.handleUpdateStatus = (v) => this._handleUpdateStatus(v);
  }

  _handleUpdateStatus(value) {
    this.setState({ selectedStatus: value })
  }

  render() {
    return(
      <div>
        <EditStatus
          { ...this.props }
          handleUpdateStatus={this.handleUpdateStatus}
          selectedStatus={this.state.selectedStatus}
        />
        <EditMeeting
          { ...this.props }
          meeting={ this.props.status.meeting }
        />
        <EditNotification
          { ...this.props }
          notification={ this.props.status.notification }
          selectedStatus={this.state.selectedStatus}
        />
      </div>
    )
  }
}



