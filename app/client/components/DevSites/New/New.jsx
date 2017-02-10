import React, { Component } from 'react'
import { render } from 'react-dom'
import Dashboard from '../../Layout/Dashboard/Dashboard'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from './locale'
import { TextAreaWithLabel, TextInputWithLabel, SelectWithLabel } from '../../Common/FormFields/Form'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

const APPLICATION_TYPES = [
  'Site Plan Approval',
  'Condo Approval',
  'Subdivision Approval',
  'Zoning Amendment',
  'Registered Condominium',
  'Site Plan Control',
  'Official Plan Amendment',
  'Zoning By-law Amendment',
  'Demolition Control',
  'Cash-in-lieu of Parking',
  'Plan of Subdivision',
  'Plan of Condominium',
  'Derelict',
  'Vacant',
  'Master Plan'
]

const STATUSES = [
  'Application File Pending',
  'Application Reactivated',
  'Application Approved',
  'Community Information and Comment Session Open',
  'Application Approved by Committee',
  'Application Recommended to Council',
  'Draft Report sent to Councillor and Applicant for Response',
  'In Appeal Period',
  'Comment Period in Progress',
  'Community Information and Comment Session Held',
  'Comment Period has Ended/Issue Resolution',
  'Unknown'
]

export default class DevSiteNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeMunicipalityIndex: 0,
      statusDate: null,
      error: {}
    };
    this.loadMunicipalities = () => this._loadMunicipalities();
    this.handleChangeMunicipality = (e) => this._handleChangeMunicipality(e);
    this.handleStatusDate = (date) => this._handleStatusDate(date);
    this.handleSubmit = (e) => this._handleSubmit(e);
    this.loadMunicipalities();
  }

  _loadMunicipalities() {
    $.getJSON('/municipalities', municipalities => {
      this.setState({ municipalities, loading: false })
    });
  }

  _handleChangeMunicipality(e) {
    this.setState({ activeMunicipalityIndex: e.currentTarget.selectedIndex });
  }

  _handleStatusDate(date) {
    this.setState({ statusDate: date });
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { locale } = document.body.dataset;

    $.ajax({
      url: `/dev_sites`,
      dataType: 'JSON',
      type: 'POST',
      contentType: false,
      processData: false,
      data: new FormData(e.currentTarget),
      success: devSite => {
        this.setState({ devSite })
        window.flash('notice', 'Development Successfully Created!')
        Turbolinks.visit(`/${locale}/dev_sites/${devSite.id}`);
      },
      error: error => {
        window.flash('alert', 'Development Unsuccessfully Created!')
        this.setState({ error: error.responseJSON })
      }
    });
  }

  render() {
    const { loading, municipalities, activeMunicipalityIndex, statusDate, error } = this.state;
    i18n.setLanguage(document.body.dataset.locale);

    return(
      <Dashboard loading={loading} activeComponent='manage_dev_site'>
        {
          !loading &&
          <div className={css.content}>
            <h2>{i18n.newDevelopmentSite}</h2>

            <form encType='multipart/form-data' id='new-form' onSubmit={this.handleSubmit} acceptCharset='UTF-8'>
              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.basicInfo}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <SelectWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_municipality'
                      name='dev_site[municipality_id]'
                      label={i18n.municipality}
                      value={municipalities[activeMunicipalityIndex].id}
                      onChange={this.handleChangeMunicipality}
                      options={municipalities.map(m => [m.id,m.name])}
                      />

                    <SelectWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_ward_id'
                      name='dev_site[ward_id]'
                      label={i18n.ward}
                      options={municipalities[activeMunicipalityIndex].wards.map(w => [w.id, w.name])}
                      />
                  </div>

                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_devID'
                      name='dev_site[devID]'
                      label={i18n.developmentId}
                      error={error.devID}
                      />

                    <SelectWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_application_type'
                      name='dev_site[application_type]'
                      label={i18n.applicationType}
                      options={APPLICATION_TYPES.map(a => [a,a])}
                      />
                  </div>

                  <div className='row'>
                    <TextAreaWithLabel
                      classes='col s12'
                      id='dev_site_description'
                      name='dev_site[description]'
                      label={i18n.description}
                      error={error.description}
                      />
                  </div>
                </div>
              </div>

              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.primaryAddress}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12'
                      id='address_street'
                      name='dev_site[addresses_attributes][0][street]'
                      label={i18n.street}
                      error={error['addresses.street']}
                      />
                  </div>

                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12 m12 l4'
                      id='address_city'
                      name='dev_site[addresses_attributes][0][city]'
                      label={i18n.city}
                      />
                    <TextInputWithLabel
                      classes='col s12 m12 l4'
                      id='address_province_state'
                      name='dev_site[addresses_attributes][0][province_state]'
                      label={i18n.province}
                      />
                    <TextInputWithLabel
                      classes='col s12 m12 l4'
                      id='address_country'
                      name='dev_site[addresses_attributes][0][country]'
                      label={i18n.country}
                      />
                  </div>
                </div>
              </div>

              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.currentStatus}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <SelectWithLabel
                      classes='col s12 m12 l6'
                      id='status_name'
                      name='dev_site[statuses_attributes][0][status]'
                      label={i18n.status}
                      options={STATUSES.map(s => [s,s])}
                      />

                    <div className='input-field col s12 m12 l6'>
                      <label htmlFor='status_date'>{i18n.statusDate}</label>
                      <DatePicker selected={statusDate} dateFormat='MMMM DD, YYYY' name='dev_site[statuses_attributes][0][status_date]' onChange={this.handleStatusDate} />
                      {
                        this.state.error['statuses.status_date'] &&
                        <div className='error-message'>{this.state.error['statuses.status_date']}</div>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.contact}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_urban_planner_email'
                      name='dev_site[urban_planner_email]'
                      label={i18n.urbanPlannerEmail}
                      />
                    <TextInputWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_ward_councillor_email'
                      name='dev_site[ward_councillor_email]'
                      label={i18n.wardCouncillorEmail}
                      />
                  </div>
                </div>
              </div>

              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.attachments}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <div className='file-field input-field col s12'>
                      <label htmlFor='dev_site_files'>{i18n.files}</label>
                      <input multiple='multiple' type='file' name='dev_site[files][]' id='dev_site_files' />
                    </div>
                  </div>

                  <div className='row'>
                    <div className='file-field input-field col s12'>
                      <label htmlFor='dev_site_images'>{i18n.images}</label>
                      <input multiple='multiple' type='file' name='dev_site[images][]' id='dev_site_images' />
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <input type='submit' value={i18n.save} className='btn submit' />
              </div>
            </form>
          </div>
        }
      </Dashboard>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const devSiteNew = document.querySelector('#dev-site-new');
  devSiteNew && render(<DevSiteNew/>, devSiteNew)
})
