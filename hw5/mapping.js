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

function plotGeoJsonData(datasetData, geoJsonData) {
  console.log(geoJsonData)
  map.invalidateSize();

  const coordinates = geoJsonData.features[0].geometry.coordinates;
  const coordinatesLength = coordinates.length;
  const firstCoor = coordinates[0];
  const lastCoor = coordinates[coordinatesLength - 1];

  geoJsonLayer = L.geoJSON(geoJsonData, {
    style: {
      color: datasetData.color,
      weight: 4,
    },
    onEachFeature: function (feature, layer) {
      if (datasetData.name) {
        layer.bindPopup(
            "Data Set Name: <b>" +
            datasetData.name +
            "</b>"
        );
      }
    },
  }).addTo(map);

  geoJsonLayers.push(geoJsonLayer);
  console.log("Should have added the layer...");

  // const markerIcon = L.divIcon({
  //   className: "custom-marker",
  //   html: '<div style="background-color: ' + datasetData.color + ';" class="marker"></div>',
  // });
  // const firstMarker = L.marker([firstCoor[1], firstCoor[0]], { icon: markerIcon }).addTo(map);
  // const lastMarker = L.marker([lastCoor[1], lastCoor[0]], { icon: markerIcon }).addTo(map);
}

function fitAllBounds() {
  const combinedBounds = geoJsonLayers.reduce((bounds, layer) => {
    return bounds.extend(layer.getBounds());
  }, L.latLngBounds());

  map.fitBounds(combinedBounds);
}

async function updateMap () {

  clearOldLayers()

  console.log("Update Map");

  const remodel = window.appData.remodel;

  for (dataset_uuid in remodel.datasets) {
    let datasetData = remodel.datasets[dataset_uuid];
    console.log(`Adding dataset ${datasetData.name}`);

    const geoJsonDetails = geoJsonDataObject[dataset_uuid];
    if (geoJsonDetails) {
      await plotGeoJsonData(datasetData, geoJsonDetails);
    } else {
      console.error("GeoJSON data not found for dataset:", dataset);
    }
  }
  fitAllBounds();
}

window.addEventListener("load", main);

UIkit.util.on("#render_map", "show", updateMap);
