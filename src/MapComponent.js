import React, { useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import PopupTemplate from '@arcgis/core/PopupTemplate';

const MapComponent = () => {
  useEffect(() => {
    const map = new Map({
      basemap: 'streets',
    });

    const view = new MapView({
      container: 'viewDiv',
      map: map,
      center: [34.8516, 31.0461],
      zoom: 7
    });

    const popupTemplate = new PopupTemplate({
      title: "<h3 class='esri-popup__title'>{CITY_NAME}</h3>",
      content: `
        <div>
          <p><strong>Population:</strong> {POP}</p>
        </div>
      `,
      overwriteActions: []
    });

    const citiesLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0',
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-marker",
          color: "red",
          size: "8px",
          outline: {
            color: "white",
            width: 1
          }
        }
      },
      popupTemplate: popupTemplate
    });

    map.add(citiesLayer);
  }, []);

  return <div id="viewDiv" style={{ height: '100vh' }}></div>;
}

export default MapComponent;
