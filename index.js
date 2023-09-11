
var map = null;
var polyline = null;

async function main ()
{
    console.log("loading");
    map = L.map('map').setView([38.4755, 38.4755], 13);

    // var geojsonFeature = {
    //     "type": "Feature",
    //     "properties": {
    //         "name": "Station",
    //         "amenity": "Train Station",
    //         "popupContent": "This is where the chunnel starts!"
    //     }
    // };
        
    // L.geoJSON(geojsonFeature).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'}).addTo(map);
    
    // create a red polyline from an array of LatLng points
    var latlngs = [
        [38.541662, -78.349214],
        [38.572671, -78.3075003],
        [38.572403, -78.271279]
    ];
    
    polyline = L.polyline(latlngs, {color: '#FF69B4'}).addTo(map);
    polyline.bindTooltip("Gangadaran's Hike Up Old Rag Mountain <br> Gangadaran's Adventures");
    
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

