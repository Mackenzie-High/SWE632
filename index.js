
async function main ()
{
    console.log("loading");
    var map = L.map('map').setView([51.505, -0.09], 13);

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Station",
        "amenity": "Train Station",
        "popupContent": "This is where the chunnel starts!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [51.505, -0.09]
    }
};
    
    L.geoJSON(geojsonFeature).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Â© OpenStreetMap'}).addTo(map);    

var popup = L.popup()
    .setLatLng([51.505, -0.09])
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    .openOn(map);

// create a red polyline from an array of LatLng points
var latlngs = [
    [45.51, -122.68],
    [37.77, -122.43],
    [34.04, -118.2]
];

var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

// zoom the map to the polyline
map.fitBounds(polyline.getBounds());

    console.log("loaded");
}

window.addEventListener("load", main);
