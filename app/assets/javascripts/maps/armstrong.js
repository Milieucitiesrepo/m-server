$(document).on('ready page:load', function(){

  if($("#armstrong-map").length > 0) {

    mapboxgl.accessToken = 'pk.eyJ1IjoibXR1Y2swNjMiLCJhIjoiY2ltNXA0OHZhMDFub3RzbTR5b3NmbTR4bCJ9.WDWrgehrJIsDpt1BX5IASQ';

    var map = new mapboxgl.Map({
      container: 'armstrong-map',
      style: 'mapbox://styles/mtuck063/cim8gs43500449lm1hv082tp2',
      center: [-75.7, 45.42],
      zoom: 18,
      hash: true
    });

    map.on('load', function () {

      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [-75.72762, 45.40270],
              [-75.72715, 45.40289],
              [-75.72636, 45.40322],
              [-75.72579, 45.40382],
              [-75.72522, 45.40440],
              [-75.72341, 45.40618],
              [-75.72224, 45.40749]
            ]
          }
        }
      });

      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          "line-join": "round",
          "line-cap": "round"
        },
        'paint': {
          'line-color': '#5d9bc0',
          "line-width": 8,
          'line-opacity': 1
        }
      });

      map.addSource("markers", {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-75.72636, 45.40322]
            },
            "properties": {
              "title": "Stirling Avenue",
              "marker-symbol": "marker",
              "description": '<iframe width="380" height="214" src="https://www.youtube.com/embed/oH0LmGQuQWg?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>'
            }
          },{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-75.72579, 45.40382]
            },
            "properties": {
              "title": "Pinhey Street",
              "marker-symbol": "marker",
              "description": '<iframe width="380" height="214" src="https://www.youtube.com/embed/4nIx44b-vHI?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>'
            }
          },{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-75.72522, 45.40440]
            },
            "properties": {
              "title": "Merton Street",
              "marker-symbol": "marker",
              "description": '<iframe width="380" height="214" src="https://www.youtube.com/embed/oH1b8xkGv38?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>'
            }
          },{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-75.72715, 45.40289]
            },
            "properties": {
              "title": "Carruthers Avenue",
              "marker-symbol": "marker",
              "description": '<iframe width="380" height="214" src="https://www.youtube.com/embed/Bapve-abpgw?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>'
            }
          },{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-75.72341, 45.40618]
            },
            "properties": {
              "title": "Garland Street",
              "marker-symbol": "marker",
              "description": '<iframe width="380" height="214" src="https://www.youtube.com/embed/e_YvAHJfG70?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>'
            }
          },{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-75.72762, 45.40270]
            },
            "properties": {
              "title": "Mc Cormick Street",
              "marker-symbol": "marker",
              "description": '<iframe width="380" height="214" src="https://www.youtube.com/embed/Bapve-abpgw?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>'

            }
          },{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-75.72224, 45.40749]
            },
            "properties": {
              "title": "Bayview Road",
              "marker-symbol": "marker",
              "description": '<iframe width="380" height="214" src="https://www.youtube.com/embed/Ne85m1AqMsE?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>'
            }
          }
        ]
      }
    });

    map.addLayer({
      "id": "markers",
      "type": "symbol",
      "source": "markers",
      "layout": {
        "icon-image": "{marker-symbol}-15",
        "text-field": "{title}",
        "text-font": ["Open Sans Regular", "Arial Unicode MS Bold"],
        "text-offset": [0, -0.8],
        "text-anchor": "bottom"
      }
    });

  });

  map.flyTo({
    center: [-75.72720, 45.40262],
    zoom: 18.84,
    bearing: 28.4,
    pitch: 110
  });

  map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['markers'] });
    if (features.length) {
      map.flyTo({center: features[0].geometry.coordinates});
    }
  });

  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['markers'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    if (!features.length) {
      popup.remove();
      return;
    }

    var feature = features[0];

    popup.setLngLat(feature.geometry.coordinates)
    .setHTML(feature.properties.description)
    .addTo(map);
  });

}

});
