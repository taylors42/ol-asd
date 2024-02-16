import { addLine } from "./addFunc";
export function routeGenerator(
  map,
  routeArray,
  numberOfGenerations,
  conditional
) {
  let lat = Math.random() * 180 - 90;
  let long = Math.random() * 360 - 180;

  for (let i = 1; i < numberOfGenerations; i++) {
    lat += (Math.random() - 0.3) * 20;
    long += (Math.random() - 0.3) * 20;
    routeArray.push([lat, long]);
  }
  if (conditional === "y") {
    addLine(map, routeArray);
  }
}
