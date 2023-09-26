var mapData = window.appData.map;

var map;
var geoJsonLayer;
var geoJsonLayers = [];

async function main() {
  console.log("Creating initial map...");

  map = L.map("map").setView([38.9, -77.3], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  map.invalidateSize();

  console.log("Initial map has been created...");
}

function clearOldLayers() {
  console.log(geoJsonLayers)
  console.log("Clearing old layers...");
  geoJsonLayers.forEach((layer) => {
    map.removeLayer(layer);
  });
  geoJsonLayers.length = 0;

  console.log(geoJsonLayers);
}

function getGeoJsonData(datasetData) {
  const folderPath = "./mapDataSets/";
  const fileName = datasetData.uuid;
  const fileExtension = ".json";
  const fileURL = `${folderPath}${fileName}${fileExtension}`;

  return fetch(fileURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function plotGeoJsonData(datasetData, geoJsonData) {
  map.invalidateSize();
  geoJsonLayer = L.geoJSON(JSON.parse(geoJsonData), {
    style: {
      color: datasetData.color,
      weight: 3,
    },
    onEachFeature: function (feature, layer) {
      if (datasetData.name && datasetData.dataset) {
        layer.bindTooltip(
          "Map Name: <b>" +
            datasetData.name +
            "</b><br>Data Set Name: <b>" +
            datasetData.dataset +
            "</b>"
        );
      }
    },
  }).addTo(map);

  geoJsonLayers.push(geoJsonLayer);
  console.log("Should have added the layer...");
}

function fitAllBounds() {
  const combinedBounds = geoJsonLayers.reduce((bounds, layer) => {
    return bounds.extend(layer.getBounds());
  }, L.latLngBounds());

  map.fitBounds(combinedBounds);
}

async function addNewDataSetToMap() {
  console.log(mapData);
  clearOldLayers();

  const promises = [];0
  for (let dataset of mapData) {
    const promise = getGeoJsonData(dataset).then((geoJsonData) => {
      plotGeoJsonData(dataset, geoJsonData);
    });
    promises.push(promise);
  }
  await Promise.all(promises);
  fitAllBounds();
}

window.addEventListener("load", main);

UIkit.util.on("#render_map", "show", addNewDataSetToMap);
