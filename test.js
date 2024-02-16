map.on("singleclick", (event) => {
  document.querySelector(".ol-selectable").style.display = "flex";
  popupDiv.style.removeProperty("position");
  popupDiv.innerHTML = "Texto de teste"; // Adicione um texto de teste no início
  console.log(popupDiv); // Verifique se o popupDiv está sendo selecionado corretamente
  const featuresObj = map.getFeaturesAtPixel(event.pixel)[0];
  if (featuresObj !== undefined) {
    if (featuresObj.id_ === "lineStringID" || featuresObj.id_ === "icone") {
      overlaysMap.forEach((item) => {
        if (item.id === "overlay1") {
          cleanDuplicateDiv("ol-selectable");
          cleanDuplicateTextContent(".ol-selectable");
          popupDiv.innerHTML = featuresObj.id_;
          item.setPosition(event.coordinate);
        }
      });
    } else {
      document.querySelector(".ol-selectable").style.display = "none";
      popupDiv.innerHTML = "Nenhum recurso encontrado aqui.";
    }
  } else {
    popupDiv.innerHTML = "Nenhum clique em um recurso.";
  }
});
