import { useContext, useEffect, useState, useRef } from "react";
import { MapContext } from "../context/MapContext";
import TheMap from "../context/Map";
import "../App.css";
import "../overlays.css";
import { Feature } from "ol";
import { useGeographic } from "ol/proj";
import Cluster from "ol/source/Cluster";
import Map from "ol/Map";
import {
  Circle as CircleStyle,
  Fill,
  Icon,
  Stroke,
  Style,
  Text,
} from "ol/style.js";
import { changePosition } from "../functions/changePosition";
import {
  createIcon,
  createLine,
  createOverlay,
  createPoint,
} from "../functions/createScripts";
import {
  cleanPoints,
  cleanDuplicateDiv,
  cleanDuplicateTextContent,
  cleanDuplicatesOnArray,
} from "../functions/cleanScripts";

import { cleanAllOverlaysOnMap } from "../functions/changePosition";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { routeGenerator } from "../functions/generateScripts";
import { getLocationOfPoint, getOverlayById } from "../functions/getScripts";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Overlay from "ol/Overlay";
export default function Comp1() {
  useGeographic();
  const { map, createMap } = useContext(MapContext);
  const line = [];
  const layers = [
    new TileLayer({
      source: new OSM(),
    }),
  ];

  useEffect(() => {
    document.querySelector(".ol-viewport")?.remove();
    createMap(TheMap(layers));
  }, []);
  const infoOverlay = new Overlay({
    element: document.createElement("div"),
    className: "overlayID1",
  });
  map?.addOverlay(infoOverlay);
  line.push(
    [-15.7801, -47.9292], // Brasília, DF
    [-23.5505, -46.6333], // São Paulo, SP
    [-22.9083, -43.1964], // Rio de Janeiro, RJ
    [-12.9714, -38.5014], // Salvador, BA
    [-16.6799, -49.255], // Goiânia, GO
    [-3.7172, -38.5433], // Fortaleza, CE
    [-15.8692, -48.0225], // Goiânia, GO
    [-5.7945, -35.211], // Natal, RN
    [-7.2306, -35.8811], // João Pessoa, PB
    [-20.3155, -40.3126], // Vitória, ES
    [-22.9068, -43.1729], // Niterói, RJ
    [-29.9511, -51.171], // Porto Alegre, RS
    [-23.5505, -46.6333], // Campinas, SP
    [-9.9754, -67.8249], // Rio Branco, AC
    [-7.2575, -35.9075], // Recife, PE
    [-8.0476, -34.877], // Olinda, PE
    [-22.8778, -43.3172], // Nova Iguaçu, RJ
    [-8.0636, -34.8808], // Jaboatão dos Guararapes, PE
    [-5.7945, -35.211], // Mossoró, RN
    [-20.2976, -40.2951], // Serra, ES
    [-23.682, -46.875], // Osasco, SP
    [-20.3155, -40.3126], // Vila Velha, ES
    [-29.1655, -51.1793], // Canoas, RS
    [-15.601, -56.0974], // Varzea Grande, MT
    [-22.9035, -47.0435], // Campinas, SP
    [-22.9297, -43.0819], // São Gonçalo, RJ
    [-12.9714, -38.5014], // Lauro de Freitas, BA
    [-8.0476, -34.877], // Paulista, PE
    [-12.9472, -38.3314], // Camaçari, BA
    [-5.7945, -35.211], // Parnamirim, RN
    [-9.662, -35.735], // Maceió, AL
    [-27.5954, -48.548], // Florianópolis, SC
    [-22.9509, -43.2115], // São João de Meriti, RJ
    [-12.2448, -38.9674], // Simões Filho, BA
    [-23.3155, -47.1625], // Itaquaquecetuba, SP
    [-8.0476, -34.877], // Igarassu, PE
    [-8.05389, -34.8811], // Abreu e Lima, PE
    [-8.05361, -34.945], // Cabo de Santo Agostinho, PE
    [-22.7338, -41.8891], // Petrópolis, RJ
    [-22.7654, -43.3372], // Duque de Caxias, RJ
    [-23.9765, -46.3172], // Santo André, SP
    [-8.0603, -34.9003], // Recife, PE
    [-23.6231, -46.8978], // Mauá, SP
    [-8.0466, -34.877], // São Lourenço da Mata, PE
    [-8.0475, -34.877], // Camaragibe, PE
    [-5.7945, -35.211], // Parnamirim, RN
    [-29.7217, -52.4373], // Caxias do Sul, RS
    [-23.6039, -46.919], // Ribeirão Pires, SP
    [-8.0511, -34.8796], // Olinda, PE
    [-8.0356, -34.9451], // Cabo de Santo Agostinho, PE
    [-5.7945, -35.211], // Macaíba, RN
    [-12.9714, -38.5014], // Salvador, BA
    [-22.9009, -47.0632], // Sumaré, SP
    [-22.8926, -43.3096], // São João de Meriti, RJ
    [-15.8267, -48.049], // Gama, DF
    [-20.3155, -40.3126], // Cariacica, ES
    [-8.0476, -34.877], // Recife, PE
    [-7.1195, -34.845], // João Pessoa, PB
    [-29.9942, -51.1639], // Esteio, RS
    [-23.5505, -46.6333], // São Caetano do Sul, SP
    [-23.5505, -46.6333], // Santo André, SP
    [-23.5505, -46.6333], // São Bernardo do Campo, SP
    [-8.0476, -34.877], // Olinda, PE
    [-15.601, -56.0974], // Cuiabá, MT
    [-22.9068, -43.1729], // Niterói, RJ
    [-29.1655, -51.1793], // Canoas, RS
    [-12.9704, -38.5014], // Salvador, BA
    [-7.1195, -34.845], // João Pessoa, PB
    [-20.2976, -40.2951], // Serra, ES
    [-8.0476, -34.877], // Recife, PE
    [-7.1195, -34.845], // João Pessoa, PB
    [-29.7217, -52.4373], // Caxias do Sul, RS
    [-23.3155, -47.1625], // Itaquaquecetuba, SP
    [-15.8267, -48.049], // Gama, DF
    [-22.9068, -43.1729], // Niterói, RJ
    [-23.5505, -46.6333], // Santo André, SP
    [-23.9765, -46.3172], // Santo André, SP
    [-8.0476, -34.877], // Recife, PE
    [-29.1655, -51.1793], // Canoas, RS
    [-8.0476, -34.877], // Recife, PE
    [-5.7945, -35.211], // Natal, RN
    [-8.0476, -34.877], // Recife, PE
    [-23.6231, -46.8978], // Mauá, SP
    [-20.2976, -40.2951], // Serra, ES
    [-22.9068, -43.1729], // Niterói, RJ
    [-8.0476, -34.877], // Recife, PE
    [-7.2306, -35.8811]
  );

  const pontos = line.map((point) => {
    return new Feature({
      geometry: new Point(point.reverse()),
    });
  });

  const source = new VectorSource({
    features: pontos,
  });

  const clusterSource = new Cluster({
    distance: 50,
    source: source,
  });

  const clusterLayer = new VectorLayer({
    source: clusterSource,
    style: function (feature) {
      const size =
        feature.get("features").length > 1
          ? feature.get("features").length
          : " ";
      return new Style({
        image: new CircleStyle({
          radius: 10,
          stroke: new Stroke({
            color: "#fff",
          }),
          fill: new Fill({
            color: "#3399CC",
          }),
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: "#fff",
          }),
        }),
      });
    },
  });

  map?.addLayer(clusterLayer);
  map?.on("click", function (event) {
    const coord = map?.getFeaturesAtPixel(event.pixel)[0]?.geometryChangeKey_
      ?.target?.flatCoordinates;
    if (!coord) cleanAllOverlaysOnMap(map);
    map?.forEachFeatureAtPixel(event.pixel, function (feature) {
      if (feature.get("features")) {
        var features = feature.get("features");
        if (features.length > 1) {
          console.log("Clicou em um cluster de pontos");
        } else {
          infoOverlay.setPosition(coord);
          console.log("Clicou em um ponto individual");
        }
      }
    });
  });

  return <div id="map"></div>;
}
