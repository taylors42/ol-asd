layers: [ new TileLayer({ source: new OSM()}), new VectorLayer({ source: new VectorSource({features: [new Feature(point)],
}),
style: {
  'circle-radius': 9,
  'circle-fill-color': 'red',
},
}),
],