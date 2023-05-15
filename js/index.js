var map;

window.onload = async function(){
    let busta = await fetch("https://www.openstreetmap.org/search?format=json&city=Fossano")


    //Definisco una mappa
    /*
    map = new ol.Map(
        {
            target:"map", /* id dell'oggetto html */
            /* Definisco il livello base (mappa globale completa) */
            /*layers:[
                new ol.layer.Tile({source:new ol.source.OSM()})
            ],
            /* caratteristiche visive (zoom, centro, ...) della mappa creata */
            /*view:new ol.View({

                zoom:4
            })
    });*/
}