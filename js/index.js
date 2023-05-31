ol.proj.useGeographic();
var map, modal, testoModal;
var datiFoss={nome: "Fossano", desc:"La città più grande di Italia (dopo Cappellazzo)"};
var dati = [
    {nome: "Chicago", desc: "Io invece no"},
    {nome: "Pechino", desc: "Pochino di cosa?"},
    {nome: "Napoli", desc: "VESUVIO ERUTTA, TUTTA NAPOLI E' DISTRUTTA"},
    {nome: "Foggia", desc: "WTF is goin' on in Foggia?"},
    {nome: "Tokio", desc: "Deja vu, i've just been in this place before, ridin on the streets"},
    {nome: "Catanzaro", desc: "La grande foresta amazzonica Italiana (a malapena)"},
    {nome: "Atlanta", desc: "Boh in pratica l'Atalanta non lo so non guardo il calcio"},
    {nome: "Toronto", desc: "W I N D    W I N D    W I N D     W I N D     W I N D"},
    {nome: "Houston", desc: "La casa del boss della barba (ha minacciato di uccidere la mia famiglia se non l'avessi detto)"},
    {nome: "Padova", desc: "E' molto lontana l'Islanda, è vicina a Padova l'Islanda"}
];
var datiAmog = {nome: "Amogus", desc:"PAM PAM PAM PAM PAM PAM PAM, PA-PA-PAM, PAM PAM"};

window.onload = async function(){
    modal = document.getElementById("sfondoModal");
    testoModal = document.querySelector("#myModal main");
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
    createMarker(layer1,datiFoss, coords[0], coords[1]);

    console.log(map);
    map.on('click', function(event) {
        let marker = map.forEachFeatureAtPixel(event.pixel, function(feature){return feature});
        if(marker!=undefined){
            console.log(event.pixel);
            console.log(marker);
            testoModal.innerHTML = marker.dati.nome + "<br>" + marker.dati.desc;
            modal.style.display = "flex";
        }
        else{
            console.log(event.coordinate);
            createMarker(layer1,datiAmog, event.coordinate[0], event.coordinate[1]);
        }
    });

    for(let i=0;i<dati.length;i++){
        let busta = await fetch("https://nominatim.openstreetmap.org/search?format=json&city="+dati[i].nome);
        let bustaJSON = await busta.json();
        console.log(bustaJSON[0]);

        let coords = [parseFloat(bustaJSON[0].lon), parseFloat(bustaJSON[0].lat)];
        let layer1 = createLayer(map, "../img/marker3.png");
        createMarker(layer1,dati[i], coords[0], coords[1]);
    }
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

function createMarker(layer, data, lon, lat) {
    let marker = new ol.Feature(new ol.geom.Point([lon, lat]));
    marker.name = data.nome;
    marker.dati = data;
    marker.lon = lon;
    marker.lat = lat;
    layer.getSource().addFeature(marker);
}