import React, { Component } from 'react'
import css from './map-search.scss'
import i18n from './locale'
import Autocomplete from '../../../Utility/Autocomplete/Autocomplete'
import Select from '../../../Utility/Select/Select'
import { toLower, toUpper } from 'lodash'

export default class MapSearch extends Component {
  constructor(props) {
    super(props);
    this.parent = this.props.parent;
    this.autocompleteCallback = (address, autocomplete) => this._autocompleteCallback(address, autocomplete);
    this.handleAutocompleteSelect = (address) => this._handleAutocompleteSelect(address);
    this.handleSelectDropdown = (type, value) => this._handleSelectDropdown(type, value);
    this.geocodeAddress = (address) => this._geocodeAddress(address);
  }
  _autocompleteCallback(address, autocomplete) {
    const googleLocationAutocomplete = new google.maps.places.AutocompleteService();
    const request = { input: address, types: ['address'], componentRestrictions: {country: 'ca'} };
    googleLocationAutocomplete.getPlacePredictions(request, (predictions) => {
      const suggestions = predictions ? predictions.map(function(prediction){ return prediction.description; }) : [];
      autocomplete.setState({ suggestions: suggestions });
    })
  }

  _handleAutocompleteSelect(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, (result) => {
      const [latitude, longitude] = [result[0].geometry.location.lat(), result[0].geometry.location.lng()];
      this.parent.setState({ latitude, longitude },
        () => this.parent.search_and_sort()
      );
    });
  }
  _handleSelectDropdown(type, value) {
    if(type === 'Ward' && value){
      this.parent.setState({ [toLower(type)]: toUpper(value), latitude: null, longitude: null },
        () => this.parent.search_and_sort()
      );
    } else {
      this.parent.setState({ [toLower(type)]: value },
        () => this.parent.search_and_sort()
      );
    }
  }
  render() {
  const { locale } = document.body.dataset;
  i18n.setLanguage(locale);

    return <div className={css.container}>
      <div className={css.wrapper}>
        <Autocomplete callback={this.autocompleteCallback} placeholder={i18n.address} type='autocomplete' onSelect={this.handleAutocompleteSelect}/>
      </div>
      <div className={css.divider}></div>
      <div className='row no-marg'>
        <div className='col s12 m4'>
          <Select title={i18n.year} options={YEARS} defaultValue={this.props.year} onSelect={this.handleSelectDropdown} />
        </div>
        <div className='col s12 m4'>
          <Select title={i18n.status} options={STATUS_TYPES} defaultValue={this.props.status} onSelect={this.handleSelectDropdown} />
        </div>
        <div className='col s12 m4'>
          <Select title={i18n.ward} options={WARD_TYPES} defaultValue={this.props.ward} onSelect={this.handleSelectDropdown} />
        </div>
      </div>
    </div>;
  }
}

const YEARS = ['2016', '2015', '2014', '2013', '2012', '2011'];

const STATUS_TYPES = ['Active Development','Application File Pending', 'Application Reactivated','Comment Period','Comment Period in Progress','Community \'Heads Up\' - Completed','Community Information and Comment Session Held','Notice of Public Meeting Sent','Comment period closed', 'Agreement Package Received from Owner', 'Agreement Signed', 'Amendment Initiated',
                      'Amendment Recommended to Council for Approval', 'Appealed to OMB',
                      'Applicant Concurs', 'Applicant Does Not Concur', 'Application Approved',
                      'Application Approved - No Agreement/Letter of Undertaking Required',
                      'Application Approved by Committee', 'Application Approved by Council',
                      'Application Approved by OMB', 'Application Approved by OMB - Agreement Pending',
                      'Application Approved by Staff', 'Application Approved in part by OMB',
                      'Application Draft Approved',
                      'Application Recommended to Council for Approval', 'Application Recommended to Council for Refusal',
                      'Application Refused by OMB', 'Application on Hold', 'By-law Passed - Appeal Period Pending',
                      'By-law Passed - In Appeal Period', 'Comment Period has Ended/Issue Resolution',
                      'Councillor Concurs', 'Deferred by Committee', 'Delegated Authority Reinstated',
                      'Draft Approval Revised/Extended', 'Draft Approved', 'Draft Report Sent to Councillor and Applicant for Response',
                      'In Appeal Period', 'No Appeal', 'No Appeal - Official Plan Amendment Adopted','OMB Appeal Withdrawn - Application Approved', 'OMB Hearing Held', 'OMB Package Sent', 'OMB Pre-Hearing Held',
                      'Public Meeting Held', 'Receipt of Agreement from Owner Pending',
                      'Receipt of Letter of Undertaking from Owner Pending', 'Referred to Staff by Committee',
                      'Request for Agreement Received', 'Revision Request Received', 'Unknown', 'Zoning By-law in Effect']

const WARD_TYPES = ['Orleans', 'Innes', 'Barrhaven', 'Kanata North',
                    'West Carleton-March', 'Stittsville', 'Bay', 'College', 'Knoxdale-Merivale',
                    'Gloucester-Southgate', 'Beacon Hill-Cyrville', 'Rideau-Vanier', 'Rideau-Rockcliffe',
                    'Somerset', 'Kitchissippi', 'River', 'Capital', 'Alta Vista', 'Cumberland', 'Osgoode',
                    'Rideau-Goulbourn', 'Gloucester-South Nepean', 'Kanata South',
                    'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5', 'Ward 6'
                   ]
