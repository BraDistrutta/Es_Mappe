ol.proj.useGeographic();
var map;

window.onload = async function(){
    let busta = await fetch("https://nominatim.openstreetmap.org/search?format=json&city=Fossano");
    let bustaJSON = await busta.json();
    console.log(bustaJSON[0]);


    let coords = [parseFloat(bustaJSON[0].lon), parseFloat(bustaJSON[0].lat)];

    map = new ol.Map(
        {
            target:"map",
            layers:[
                new ol.layer.Tile({source:new ol.source.OSM()})
            ],
            view:new ol.View({
                zoom:14,
                center: [coords[0],coords[1]]
            })
    });

    let layer1 = createLayer(map, "../img/marker3.png");
    createMarker(layer1,"zemel", coords[0], coords[1]);

    console.log(map);
    map.on('click', function(event) {
        console.log(event.coordinate);
        createMarker(layer1,"neger", event.coordinate[0], event.coordinate[1]);
    });
}

function createLayer(map, pathImg) {
    let layer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: pathImg
            })
        }),
        name: "zebby"
    });

    map.addLayer(layer);
    return layer;
}

function createMarker(layer, MKname, lon, lat) {
    let marker = new ol.Feature(new ol.geom.Point([lon, lat]));
    marker.name = MKname;
    layer.getSource().addFeature(marker);
}