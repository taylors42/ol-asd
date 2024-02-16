export function routeGenerator(routeArray, numberOfGenerations) {
  let lat = Math.random() * 180 - 90;
  let long = Math.random() * 360 - 180;
  routeArray.push([lat, long]);

  for (let i = 1; i < numberOfGenerations; i++) {
    lat += (Math.random() - 0.5) * 20;
    long += (Math.random() - 0.5) * 20;
    routeArray.push([lat, long]);
  }
}
