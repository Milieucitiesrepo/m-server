import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './map-wrapper.scss'
import MapSearch from '../MapSearch/MapSearch'
import MapFilter from '../MapFilter/MapFilter'
import DevSiteList from '../DevSiteList/DevSiteList'
import DevSitePreview from '../../Preview/Preview'
import MapAwesome from '../Map/Map'
import { Map } from 'immutable'
import { debounce, omitBy, isNil } from 'lodash'
import Header from '../../../Layout/Header/Header'

export default class MapWrapper extends Component {
  constructor(props) {
    super(props);
    const devSiteMap = document.querySelector('#dev-site-map');

    this.state = {
                   loading: true,
                   page: parseInt(getParameterByName('page')) || 0,
                   devSites: [],
                   municipalities: [],
                   latitude: getParameterByName('latitude') || this.props.latitude || 45.42435419303618,
                   longitude: getParameterByName('longitude') || this.props.longitude || -75.68289194238083,
                   zoom: getParameterByName('zoom') || 12.5,
                   ward: getParameterByName('ward'),
                   status: getParameterByName('status'),
                   year: getParameterByName('year'),
                   municipality: getParameterByName('municipality'),
                   activeDevSiteId: getParameterByName('activeDevSiteId'),
                   isMobile: (window.innerWidth < 992)
                 };

    this.search_and_sort = () => this._search_and_sort();
    this.loadDevSites = () => this._loadDevSites();
    this.loadMunicipalities = () => this._loadMunicipalities();
    this.params = () => this._params();
    this.loadDevSites();
    this.loadMunicipalities();

    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 992) })
      }, 100)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { locale } = document.body.dataset;
    const path = `${window.location.pathname}?${$.param(this.params())}`;
    window.history.replaceState({ path },'', path);
  }

  _params() {
    const { page, latitude, longitude, zoom, status, year, municipality, ward, activeDevSiteId } = this.state;
    return omitBy({ page, latitude, longitude, zoom, status, year, municipality, ward, activeDevSiteId }, isNil);
  }

  _loadDevSites() {
    const scrollToTop = () => this.refs.sidebar.scrollTop = 0;
    $.getJSON(`/dev_sites`, this.params(), json => {
      this.setState({ devSites: (json.dev_sites || []), total: json.total, loading: false }, scrollToTop);
    });
  }

  _loadMunicipalities() {
    $.getJSON(`/municipalities`, municipalities => {
      this.setState({ municipalities });
    });
  }

  _search_and_sort() {
    const scrollToTop = () => this.refs.sidebar.scrollTop = 0;
    this.setState({ loading: true });

    $.getJSON(`/dev_sites`, this.params(), json => {
      if(json.dev_sites && (!this.state.longitude || !this.state.latitude)) {
        this.setState({ longitude: json.dev_sites[0].longitude, latitude: json.dev_sites[0].latitude });
      }
      this.setState({ page: 0, devSites: (json.dev_sites || []), total: json.total, loading: false }, scrollToTop);
    });
  }

  render() {
    return(
      <div>
        <Header />
        <div className={css.container}>
          <div className={css.sidebar} ref='sidebar'>
            <MapSearch {...this.state} parent={this} />
            {
              false &&
              <MapFilter parent={this} />
            }
            <DevSiteList {...this.state} parent={this} />
          </div>
          <div className={css.content}>
            {
              this.state.activeDevSiteId &&
              <DevSitePreview id={this.state.activeDevSiteId} parent={this} />
            }
            {
              !this.state.isMobile && !this.state.activeDevSiteId &&
              <MapAwesome {...this.state} parent={this} />
            }
          </div>
        </div>
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const devSiteMap = document.querySelector('#dev-site-map');
  if (devSiteMap) {
    const { userLongitude, userLatitude } = devSiteMap.dataset;
    render(
      <MapWrapper
        longitude={userLongitude}
        longitude={userLongitude}
      />, devSiteMap
    )
  }
})
