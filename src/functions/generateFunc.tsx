import { addLine } from "./addFunc";
import { Map } from "ol";

export function routeGenerator(
  map: Map,
  routeArray: number[][],
  numberOfGenerations: number,
  conditional: string
) {
  let lat: number = Math.random() * 180 - 90;
  let long: number = Math.random() * 360 - 180;

  for (let i = 1; i < numberOfGenerations; i++) {
    lat += (Math.random() - 0.3) * 20;
    long += (Math.random() - 0.3) * 20;
    routeArray.push([lat, long]);
  }
  if (conditional === "y") {
    addLine(map, routeArray);
  }
}
