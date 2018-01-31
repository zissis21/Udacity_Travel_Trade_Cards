const mymap = L.map('mapid').setView([39.00496, 22.9248], 6);
const $card = $('.card');
let markers = {};
const data = [
  {
    userName:'Veniamin Tsigourof',
    udacityForumUserName:'tsigourof_ben6oqe',
    placeName:'Thassos, Ancient Quarries',
    altPlaceName:'Αλυκή Θάσσου, Αρχαία Λατομεία',
    description:'Alykes is a peninsula of archaeological interest where the ancient quarry of marble is situated. The quarry of marble was used from the ancient to byzantine years. Huge marble rocks are discernible under the surface of the sea.',
    latLong:[40.60436,24.74364],
    imgUrl:'./img/thassos_aliki.jpg',
    country:'Greece'
  },
  {
    userName:'Veniamin Tsigourof',
    udacityForumUserName:'tsigourof_ben6oqe',
    placeName:'Patmos, Xora',
    altPlaceName:'Πάτμος, Χώρα',
    description:'Η Πάτμος είναι ελληνικό νησί του Αιγαίου Πελάγους υπαγόμενο, κατά τους αρχαίους Έλληνες, στις Νότιες Σποράδες, κατά δε τη σύγχρονη πολιτική διαίρεση της χώρας στη Δωδεκάνησο.',
    latLong:[37.30903, 26.54765],
    imgUrl:'./img/patmos_xwra.jpeg',
    country:'Greece'
  },
  {
    userName:'Veniamin Tsigourof',
    udacityForumUserName:'tsigourof_ben6oqe',
    placeName:'Mount Beshtau',
    altPlaceName:'Бештау',
    description:'Бешта́у — изолированная пятиглавая гора — лакколит, высочайшая из 17 останцовых магматических гор Пятигорья на Кавказских Минеральных Водах. Высота 1400м. Памятник природы. Дала название окружающей местности (Пятигорье) и городу Пятигорску.',
    latLong:[44.09749, 43.02235],
    imgUrl:'./img/beshtau.jpg',
    country:'Russia'
  },
  {
    userName: 'Thomas Zegos',
    udacityForumUserName: "ThomasZ",
    placeName: "Serres, Upper Poroia",
    altPlaceName: "Σέρρες, Άνω Πορόια",
    description: "Upper Poroia is a large settlement of Serres in Macedonia. It is built on the foot of Mount Belles northwest of Lake Kerkini. It 's an alternative and homely place for relaxion. Horseback riding and hiking are remarkable entertaining activities you couldn't lose.",
    latLong:[41.285892, 23.035583],
    imgUrl: "./img/Ano-Poroia.jpg",
    country: "Greece"
  },
  {
    userName: 'Thomas Zegos',
    udacityForumUserName: "ThomasZ",
    placeName: "Chalkidiki, Afytos",
    altPlaceName: "Χαλκιδική, Άφυτος",
    description: "Afytos is a village in Chalkidiki, northern Greece. It is one of the most beautiful places for vacation. You can take a lot of pictures near the sea, eat good seafood and of course, you can take a dip in the sea. And, if you 're lucky you will see dolphins, too. This place is highly recommended for couples.",
    latLong:[40.098651,23.436987],
    imgUrl: "./img/Afytos.jpg",
    country: "Greece"
  },

];
/****************************
Leaflet - Initialize map
***************************/
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '<a href="https://carto.com/">Carto </a>|   <a href="https://www.openstreetmap.org">OpenStreetMap</a>',
}).addTo(mymap);
/****************************
 Leaflet  - EXTENDING THE ICON CLASS- snippet from https://stackoverflow.com/questions/25683871/assign-id-to-marker-in-leaflet
 ****************************/
const MarkerIcon = L.Icon.extend({
  options: {
      customId: ""
  }
});
//This is used to create the option customId on the MarkerIcon that will work as unique id for each marker on the map and for each element of the markers object
/****************************
 Leaflet - Icons - markers
***************************/
const myDefaultMarker = new MarkerIcon({
  customId: "",
  iconUrl: 'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png',
  iconSize: [25,41]
});
//  const iconArcheology = L.icon({
//   iconUrl: './img/archeology.svg',
//   iconSize: [40,40],
//   iconAnchor: [40,40],
//   popupAnchor: [-3,-76]
// });

function generateMarkers(arr) {
  let id = 0;
  arr.forEach(function(element) {
    element.id = id;
    const idString = id.toString();
    L.marker(element.latLong, {icon: myDefaultMarker, customId: idString, title:element.placeName}).addTo(mymap)
    .on('click', markerClick)
    .bindPopup(`<b>${element.placeName}</b><br>${element.altPlaceName}`);
    markers[id] = element;
    id+=1;
  });
};
generateMarkers(data);
/****************************
Leaflet - map Click Events
***************************/
function markerClick(e) {
  const customId = this.options.customId;
  $('#cardImage').attr('src', markers[customId].imgUrl);
  $('#cardTitle').html(markers[customId].placeName);
  $('#cardText').html(markers[customId].description);
};
//Get Coordinates From Map
//For Now run getLatLong() manually in the console of the browser to use it, latter will add a button
const popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
};
function getLatLong() {
  mymap.on('click', onMapClick);
};
