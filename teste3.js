// Primeiro, vamos criar alguns pontos com informações de texto específicas.
const frota = [
  new Feature({
    geometry: new Point([-23.55, -46.633]),
    name: 'Ponto 1',  // Informação de texto específica para este ponto
  }),
  new Feature({
    geometry: new Point([-40.55, -46.633]),
    name: 'Ponto 2',  // Informação de texto específica para este ponto
  }),
];

// Agora, vamos criar a fonte do vetor com a frota.
const vectorSource = new VectorSource({
  features: frota,
});

// Em seguida, criamos uma camada de vetor usando a fonte do vetor.
const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: function(feature) {
    return new Style({
      text: new Text({
        text: feature.get('name'),  // Obtemos a informação de texto do ponto
        fill: new Fill({color: '#000'}),  // Cor do texto
        stroke: new Stroke({color: '#fff', width: 2}),  // Contorno do texto
      }),
    });
  },
});

// Adicionamos a camada de vetor ao mapa.
map.addLayer(vectorLayer);
