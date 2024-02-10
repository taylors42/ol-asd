fetch("data/polyline/route.json").then(function (response) {
  response.json().then(function (result) {
    const polyline = result.routes[0].geometry;

    const route = new Polyline({
      factor: 1e6,
    }).readGeometry(polyline, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });

    const routeFeature = new Feature({
      type: "route",
      geometry: route,
    });
    const startMarker = new Feature({
      type: "icon",
      geometry: new Point(route.getFirstCoordinate()),
    });
    const endMarker = new Feature({
      type: "icon",
      geometry: new Point(route.getLastCoordinate()),
    });
    const position = startMarker.getGeometry().clone();
    const geoMarker = new Feature({
      type: "geoMarker",
      geometry: position,
    });

    const styles = {
      route: new Style({
        stroke: new Stroke({
          width: 6,
          color: [237, 212, 0, 0.8],
        }),
      }),
      icon: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "data/icon.png",
        }),
      }),
      geoMarker: new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: "black" }),
          stroke: new Stroke({
            color: "white",
            width: 2,
          }),
        }),
      }),
    };

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [routeFeature, geoMarker, startMarker, endMarker],
      }),
      style: function (feature) {
        return styles[feature.get("type")];
      },
    });

    map.addLayer(vectorLayer);

  });
});
