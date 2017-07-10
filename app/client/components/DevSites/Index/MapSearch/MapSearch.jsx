import React, { Component } from 'react'
import css from './map-search.scss'
import i18n from './locale'
import Autocomplete from '../../../Utility/Autocomplete/Autocomplete'
import Select from '../../../Utility/Select/Select'
import { flatten } from 'lodash'
import { YEARS, STATUS_TYPES } from '../../../Common/constants'

export default class MapSearch extends Component {
  constructor(props) {
    super(props);
    this.parent = this.props.parent;
    this.autocompleteCallback = (address, autocomplete) => this._autocompleteCallback(address, autocomplete);
    this.handleAutocompleteSelect = (address) => this._handleAutocompleteSelect(address);
    this.handleSelectDropdown = (type, value) => this._handleSelectDropdown(type, value);
    this.geocodeAddress = (address) => this._geocodeAddress(address);
    this.wardNames = () => this._wardNames();
    this.municipalityNames = () => this._municipalityNames();
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
    let newState = { [type]: value };

    if (type === value) {
      newState = { [type]: null }
    }

    if (type === 'ward' || type === 'municipality') {
      newState = Object.assign(newState, { latitude: null, longitude: null })
    }

    this.parent.setState(newState,
      () => this.parent.search_and_sort()
    );
  }

  _wardNames() {
    if (this.props.municipality) {
      const selectedMunicipality = this.props.municipality;
      const municipality = this.props.municipalities.find((municipality) => municipality.name == selectedMunicipality);
      const wards = municipality && municipality.wards.map((ward) => ward.name);
      return wards || [];
    } else {
      const municipalities = this.props.municipalities || [];
      const wards = municipalities.map((municipality) => {
        return municipality.wards.map((ward) => ward.name)
      });
      return flatten(wards);
    }
  }

  _municipalityNames() {
    return this.props.municipalities.map((municipality) => municipality.name)
  }

  render() {
  const { locale } = document.body.dataset;
  i18n.setLanguage(locale);
  const cities = this.municipalityNames();
  const wards = this.wardNames();

    return <div className={css.container}>
      <div className={css.wrapper}>
        <Autocomplete callback={this.autocompleteCallback} placeholder={i18n.address} type='autocomplete' onSelect={this.handleAutocompleteSelect}/>
      </div>
    </div>;
  }
}
