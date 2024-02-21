const frota = [
  new Feature({
    geometry: new Point([-23.55, -46.633]),
  }),
  new Feature({
    geometry: new Point([-40.55, -46.633]),
  }),
];
const vectorSource = new VectorSource({
  features: frota,
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

function encontraItem(array, item) {
  if (array?.includes(item)) {
    return item;
  } 
}

// Exemplo de uso:
const array = ['item1', 'item2', 'item3'];
const item = 'item2';
const resultado = encontraItem(array, item);

if (resultado) {
  console.log(`O item ${resultado} foi encontrado no array.`);
} else {
  console.log('O item não foi encontrado no array.');
}
