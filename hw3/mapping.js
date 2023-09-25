var mapData = window.appData.map;

var map;
var geoJsonData;
var geoJsonLayer;

async function main() {
    console.log("Creating initial map...");

    map = L.map('map').setView([38.9, -77.3], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    map.invalidateSize();

    console.log("Initial map has been created...");
}

function clearOldLayers() {
    console.log("Clearing old layers...");
    if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
    }
}

function getGeoJsonData() {
    const folderPath = './mapDataSets/'
    const fileName = mapData.uuid;
    const fileExtension = '.json';
    const fileURL = `${folderPath}${fileName}${fileExtension}`;

    return fetch(fileURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            geoJsonData = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function plotGeoJsonData() {
    map.invalidateSize();
    geoJsonLayer = L.geoJSON(JSON.parse(geoJsonData), {
        style: {
            color: mapData.color,
            weight: 3,
        },
        onEachFeature: function (feature, layer) {
            if (mapData.name && mapData.dataset) {
                layer.bindTooltip("Map Name: <b>" + mapData.name + "</b><br>Data Set Name: <b>" + mapData.dataset + "</b>");
            }
        }
    }).addTo(map);

    console.log("Should have added the layer...")

    const layerBounds = geoJsonLayer.getBounds();
    if (layerBounds.isValid()) {
        map.fitBounds(layerBounds);
    }
}

function addNewDataSetToMap() {
    console.log(mapData)
    clearOldLayers();

    getGeoJsonData().then(() => {
        plotGeoJsonData();
    });

}

window.addEventListener("load", main)

UIkit.util.on("#render_map", "show", addNewDataSetToMap);