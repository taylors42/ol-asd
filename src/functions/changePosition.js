export function changePosition(array, overlay, position) {
  array?.forEach((overlays) => overlays?.setPosition(undefined));
  overlay?.setPosition(position);
}
