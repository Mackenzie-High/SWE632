var mapData = window.appData.map;

var map;
var geoJsonLayer;
var geoJsonLayers = [];
var mapName = "";

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
  mapName = "";

  console.log(geoJsonLayers);
}

function getGeoJsonData(datasetData) {
  const datasetUuid = datasetData.uuid;
  return geoJsonDataObject[datasetUuid];
}

function plotGeoJsonData(datasetData, geoJsonData) {
  console.log(geoJsonData)
  map.invalidateSize();
  geoJsonLayer = L.geoJSON(geoJsonData, {
    style: {
      color: datasetData.color,
      weight: 3,
    },
    onEachFeature: function (feature, layer) {
      if (datasetData.name && mapData) {
        layer.bindTooltip(
          "Map Name: <b>" + mapName +
            "</b><br>Data Set Name: <b>" +
            datasetData.name +
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

  for (dataset in mapData) {
    mapName = dataset;
    for(uuid in mapData[dataset]) {
      const geoJsonDetails = getGeoJsonData(mapData[dataset][uuid]);
      if (geoJsonDetails) {
        await plotGeoJsonData(mapData[dataset][uuid], geoJsonDetails);
      } else {
        console.error("GeoJSON data not found for dataset:", dataset);
      }
    }
  }
  fitAllBounds();
}

window.addEventListener("load", main);

UIkit.util.on("#render_map", "show", addNewDataSetToMap);
