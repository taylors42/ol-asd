import { Map } from "ol";
/**
 * @description this function automates the process
 * of compare and put a overlay on the screen
 * @param {object instanceof Map} map
 * @param {array with object with properties overlay, id, text} array: array with the overlays
 * @param {string} id: id of the object
 * @param {2*dimentional array} coord: a coord to put the overlay
 *
 */

export function changePosition(map, array, id, coord) {
  if (map instanceof Map && id !== undefined && id !== null) {
    if (typeof array !== "object")
      return console.error(`${array} is not a object`);
    cleanAllOverlaysOnMap(map);
    let indexOfOverlay = array?.findIndex((object) => object.id === id);
    let overlay = array[indexOfOverlay];
    document.querySelector("." + overlay.id).textContent = overlay.text;
    overlay.overlay.setPosition(coord);
  } else {
    cleanAllOverlaysOnMap(map);
  }
}

export function cleanAllOverlaysOnMap(map) {
  if (map instanceof Map) {
    const overlaysArray = map.getOverlays().getArray();
    overlaysArray?.forEach((overlay) => {
      overlay?.setPosition(undefined);
    });
  }
}
