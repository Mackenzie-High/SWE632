
var map = null;
var polyline = null;

async function main ()
{
    console.log("loading");
    map = L.map('map').setView([51.505, -0.09], 13);

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
        attribution: '© OpenStreetMap'}).addTo(map);    
    
    // create a red polyline from an array of LatLng points
    var latlngs = [
        [45.51, -122.68],
        [37.77, -122.43],
        [34.04, -118.2]
    ];
    
    polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
    
    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());

    console.log("loaded");
}

function resize ()
{
    console.log("resize");
    map.invalidateSize();
    map.fitBounds(polyline.getBounds());
}

window.addEventListener("load", main);

UIkit.util.on("#render_map", "show", resize);

