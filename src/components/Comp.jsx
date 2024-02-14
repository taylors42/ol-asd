import { useContext, useMemo, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import TheMap from "../context/Map";
import "../App.css";
import { Feature } from "ol";
import { Vector as VectorSource } from "ol/source";
import { OSM } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Point from "ol/geom/Point.js";
import { toLonLat, useGeographic } from "ol/proj.js";
import { Overlay } from "ol";
import { getVectorContext } from "ol/render.js";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style.js";
import { Polygon } from "ol/geom";
import Polyline from "ol/format/Polyline.js";
import LineString from "ol/geom/LineString.js";
export default function Comp() {
  useGeographic();
  const { view, map, createMap, setView } = useContext(MapContext);
  const popupDiv = document.querySelector(".ol-selectable");
  const [num, setNum] = useState(0);
  const overlays = [];
  const layers = [
    new TileLayer({
      source: new OSM(),
    }),
  ];
  const line = [[0, 0]];

  useEffect(() => {
    const container = document.getElementById("popup");
    const overlay1 = new Overlay({
      id: "overlay1",
      element: container,
    });

    if (document.querySelector(".ol-viewport")) {
      document.querySelector(".ol-viewport").remove();
    }
    overlays.push(overlay1);
    createMap(TheMap(layers, overlays, view));
  }, [num]);

  function addPoint(coordinates) {
    map.addLayer(
      new VectorLayer({
        source: new VectorSource({
          features: [new Feature(new Point(coordinates))],
        }),
      })
    );
  }
  function addMarker(coordinates) {
    let icon = new Style({
      image: new Icon({
        // src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fgeo_2527411&psig=AOvVaw2e8A_faApApIIoWlhJp1-Q&ust=1708017056441000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKiHiLypq4QDFQAAAAAdAAAAABAE",
        // src: "../img/icon.png",
      }),
    });
    let feature = new Feature({
      geometry: new Point(coordinates),
    });

    feature.setStyle(icon);

    map.addLayer(
      new VectorLayer({
        source: new VectorSource({
          features: [feature],
        }),
      })
    );
  }

  function addLine() {
    map.addLayer(
      new VectorLayer({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: new LineString(line),
            }),
          ],
        }),
      })
    );
  }
  function limparPontos() {
    map.getLayers().forEach((layer) => {
      if (layer instanceof VectorLayer) {
        let features = layer.getSource().getFeatures();
        features.forEach((feature) => {
          if (feature.getGeometry() instanceof Point) {
            layer.getSource().removeFeature(feature);
          }
        });
      }
    });
  }
  const cleanDuplicateDiv = (div) => {
    const innerDiv = document.querySelectorAll(div);
    if (innerDiv && innerDiv.length > 1) {
      innerDiv[0].remove();
    }
  };
  const cleanTextContent = (div) => {
    const innerDiv = document.querySelector(div);
    if (innerDiv && innerDiv.hasChildNodes) {
      while (innerDiv.firstChild) {
        innerDiv.removeChild(innerDiv.firstChild);
      }
      cleanDuplicateDiv(div);
    } else {
      console.error("line 77");
    }
  };
  function cleanDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i] === array[j]) {
          array.splice(j, 1);
          j--;
        }
      }
    }
  }
  let localizacoes = [];
  function obterLocalizacaoPontos() {
    map.getLayers().forEach((layer) => {
      if (layer instanceof VectorLayer) {
        let features = layer.getSource().getFeatures();
        features.forEach((feature) => {
          if (feature.getGeometry() instanceof Point) {
            let coordenadas = feature.getGeometry().getCoordinates();
            localizacoes.push(coordenadas);
          }
        });
      }
    });

    return localizacoes;
  }
  function test() {
    if (map) {
      limparPontos();
      addPoint([
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ]);
      addPoint([
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ]);
      const arr = obterLocalizacaoPontos();
      map.addLayer(
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new LineString(arr),
              }),
            ],
          }),
        })
      );
    }
  }
  function addIcon() {
    if (map) {
      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: "https://openlayers.org/en/latest/examples/data/icon.png",
        }),
      });
      const iconFeature = new Feature({
        geometry: new Point([0, 0]),
      });

      // Aplica o estilo de ícone à feature
      iconFeature.setStyle(iconStyle);
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [iconFeature],
        }),
      });
      map.addLayer(vectorLayer);
      vectorLayer.setPosition(line[line.length - 1]);
      //   const overlay3 = new Overlay({
      //     className: "overlay3",
      //     element: document.querySelector(".overlay3"),
      //   });
      //   new VectorLayer({
      //     source: new VectorSource({
      //       features:
      //     })
      //   })
      //   map.addOverlay(overlay3);
      //   overlay3.setPosition(line[line.length - 1]);
    }
  }
  if (map !== null) {
    const overlaysMap = map.getOverlays().getArray();
    overlaysMap.forEach((item) => {
      if (item.id == "overlay1") {
        map.on("singleclick", (event) => {
          document.querySelector(".ol-selectable").style.display = "flex";
          popupDiv.style.removeProperty("position");
          let pTag = document.createElement("p");
          line.push(event.coordinate);
          cleanDuplicates(line);
          map.addLayer(
            new VectorLayer({
              source: new VectorSource({
                features: [
                  new Feature({
                    geometry: new LineString(line),
                  }),
                ],
              }),
            })
          );
          limparPontos();
          // addMarker(line[0]);
          addPoint(line[0]);
          addPoint(line[line.length - 1]);
          console.log(obterLocalizacaoPontos());
          cleanTextContent(".ol-selectable");
          if (map.getFeaturesAtPixel(event.pixel)[0] != undefined) {
            pTag.textContent = "ponto";
            popupDiv.appendChild(pTag);
            item.setPosition(event.coordinate);
          } else {
            document.querySelector(".ol-selectable").style.display = "none";
          }
        });
      }
    });
  }

  return (
    <div id="map">
      <button
        className="botao"
        style={{ position: "absolute", zIndex: "10" }}
        onClick={() => {
          addLine("y");
        }}
      >
        Click
      </button>
      <button
        className="botao"
        style={{ position: "absolute", zIndex: "10", marginLeft: "3rem" }}
        onClick={() => {
          addPoint([-110, 45]);
        }}
      >
        Click
      </button>
      <button
        className="botao"
        style={{ position: "absolute", zIndex: "10", marginLeft: "6rem" }}
        onClick={() => {
          test();
        }}
      >
        Click
      </button>
      <button
        className="botao"
        style={{ position: "absolute", zIndex: "10", marginLeft: "9rem" }}
        onClick={() => {
          addIcon();
        }}
      >
        Click
      </button>
    </div>
  );
}
