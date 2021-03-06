import React, { Component } from 'react'
import css from './map.scss'
import OTTAWA_WARD_GEO_JSON from './ottawa_ward.geojson'
import GUELPH_WARD_GEO_JSON from './guelph_ward.geojson'
import { replace } from 'lodash'

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.parent = this.props.parent;
    this.loadMap = () => this._loadMap();
    this.loadDevSites = () => this._loadDevSites();
    this.geoJsonBuilder = () => this._geoJsonBuilder();
    mapboxgl.accessToken = 'pk.eyJ1IjoibWlsaWV1IiwiYSI6ImNpeW14aGV3eDAwMHAycXBuanQ3eWUwNWUifQ.RIvTNaYA_z_h1zo1Pfqupw';
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { devSites, hoverdDevSiteId } = this.props;
    return (nextProps.devSites !== devSites || nextProps.hoverdDevSiteId !== hoverdDevSiteId)
  }

  componentDidUpdate(prevProps, prevState) {
    const { map, popup } = this;
    const { devSites, hoverdDevSiteId, ward } = this.props;

    if(map.style.loaded() && prevProps.devSites !== devSites){
      this.loadDevSites();
    }

    if(ward && devSites.length > 0){
      const { longitude, latitude } = devSites[0];
      map.flyTo({ center: [longitude, latitude] })
    }

    if(hoverdDevSiteId) {
      const features = map.querySourceFeatures('devSites', { filter: ['==', 'id', hoverdDevSiteId] });
      if(!features.length && !!popup) {
        popup.remove();
        return;
      }

      const feature = features[0];
      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.description)
        .addTo(map);
    }

  }

  componentDidMount() {
    const { latitude, longitude } = this.props;
    const map = this.map = new mapboxgl.Map({
      container: 'main-map',
      style: 'mapbox://styles/milieu/ciymxvkoc000g2sqerkujqsup',
      center: [longitude, latitude],
      zoom: 12.5
    });
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
    map.scrollZoom.disable();
    map.addControl(new mapboxgl.NavigationControl({ position: 'top-left' }));
    map.scrollZoom.enable();
    map.on('load', this.loadMap);
  }

  _geoJsonBuilder() {
    const keys = {
      'Active Development': 'activedev',
      'Comment Period': 'commentopen',
      'Comment Period Closed': 'inactivedev'
    }
    let files
    let fileNumber

    return {
      type: 'geojson',
      cluster: true,
      clusterMaxZoom: 13,
      data: {
        type: 'FeatureCollection',
        features: this.props.devSites.map((devSite, index) => {
          if (devSite.application_files) {
            devSite.application_files.map((file, index) => (
              files = file.application_type,
              fileNumber = file.file_number
            ))
          }

          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [devSite.longitude, devSite.latitude]
            },
            properties: {
              id: `${devSite.id}`,
              title: devSite.title,
              address: devSite.address,
              'marker-symbol': keys[devSite.general_status],
              description: `<b>${devSite.street}</b>
                            <br/>${devSite.general_status}
                            <br/>${files}
                            <br/>${fileNumber}`
            }
          }
        })
      }
    }
  }

  _loadDevSites() {
    const { map } = this;
    const { latitude, longitude } = this.props;

    if(map.getSource('devSites')){
      map.removeSource('devSites');
    }

    map.addSource('devSites', this.geoJsonBuilder());
    if(latitude && longitude) {
      map.flyTo({ center: [longitude, latitude] });
    }
  }

  _loadMap() {

    const { map } = this;

    if(map.getSource('devSites')){
      map.removeSource('devSites');
    }

    map.addSource('wards', {
      'type': 'geojson',
      'data': OTTAWA_WARD_GEO_JSON
    });

    map.addSource('guelph-wards', {
      'type': 'geojson',
      'data': GUELPH_WARD_GEO_JSON
    });

    map.addLayer({
      'id': 'guelph-fill-wards',
      'type': 'fill',
      'source': 'guelph-wards',
      'paint': {
        'fill-color': '#fff',
        'fill-opacity': 0.3
      }
    });

    map.addLayer({
      'id': 'guelph-line-wards',
      'type': 'line',
      'source': 'guelph-wards',
      'paint': {
        'line-color': '#3A7496'
      }
    });

    map.addLayer({
      'id': 'fill-wards',
      'type': 'fill',
      'source': 'wards',
      'paint': {
        'fill-color': '#fff',
        'fill-opacity': 0.3
      }
    });

    map.addLayer({
      'id': 'line-wards',
      'type': 'line',
      'source': 'wards',
      'paint': {
        'line-color': '#3A7496'
      }
    });

    map.addSource('devSites', this.geoJsonBuilder());

    map.addLayer({
      'id': 'unclustered-points',
      'type': 'symbol',
      'source': 'devSites',
      "filter": ["!has", "point_count"],
      'layout': {
        'icon-image': '{marker-symbol}',
        'icon-size': 1,
        'icon-allow-overlap': true,
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-size': 12,
        'text-offset': [0, 0.6],
        'text-anchor': 'bottom'
      }
    });

    const layers = [
      { limit: 60, color: '#c7817d' },
      { limit: 30, color: '#e9967a' },
      { limit: 0, color: '#b0c4de' },
    ];

    layers.forEach(function (layer, i) {
        map.addLayer({
            "id": "cluster-" + i,
            "type": "circle",
            "source": "devSites",
            "paint": {
                "circle-color": layer.color,
                "circle-radius": 18
            },
            "filter": i === 0 ?
                [">=", "point_count", layer['limit']] :
                ["all",
                    [">=", "point_count", layer['limit']],
                    ["<", "point_count", layers[i - 1]['limit']]]
        });
    });

    map.addLayer({
        "id": "cluster-count",
        "type": "symbol",
        "source": "devSites",
        "layout": {
            "text-field": "{point_count}",
            "text-font": [
                "DIN Offc Pro Medium",
                "Arial Unicode MS Bold"
            ],
            "text-size": 12
        }
    });

    const popup = this.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on('mousemove', e => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-points'] });
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

      if(!features.length) {
        popup.remove();
        return;
      }

      const feature = features[0];
      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.description)
        .addTo(map);
    });

    map.on('dragend', e => {
      const [latitude, longitude] = [map.getCenter().lat, map.getCenter().lng];
      this.parent.setState({ latitude, longitude },
        () => this.parent.search()
      );
    });

    map.on('zoomend', e => {
      this.parent.setState({ zoom: map.getZoom() });
    });

    map.on('click', e => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-points'] });
      const currentZoom = map.getZoom();
      const centerPointLat = e.lngLat.lat;
      const centerPointLong = e.lngLat.lng;
      const zoomer = currentZoom + 2;

      if (features.length) {
        const feature = features[0];
        this.parent.setState({ activeDevSiteId: feature.properties.id });
      }
      else {
        map.flyTo({ center: [centerPointLong, centerPointLat], zoom: zoomer });
      }
    });

    map.on('tap', e => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-points'] });
      const currentZoom = map.getZoom();
      const centerPointLat = e.lngLat.lat;
      const centerPointLong = e.lngLat.lng;
      const zoomer = currentZoom + 2;

      if (features.length) {
        const feature = features[0];
        this.parent.setState({ activeDevSiteId: feature.properties.id });
      }
      else {
        map.flyTo({ center: [centerPointLong, centerPointLat], zoom: zoomer });
      }
    });
  }

  render() {
    return <div className={css.container} id='main-map' />;
  }
}
