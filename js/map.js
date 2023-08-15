const extent = [-34.88325, -56.165199];

var map = L.map('map').setView(extent, 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap'
// }).addTo(map);


var CartoDB_Voyager = L.tileLayer(
	'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

CartoDB_Voyager.addTo(map);

// var MapboxCoffe = L.tileLayer(
// 	'https://api.mapbox.com/styles/v1/guillermodangelo/cll6q34o700k101ql6nurglv0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VpbGxlcm1vZGFuZ2VsbyIsImEiOiJjbGJkd2Q0MWMwNWlzM25tZnM3enkwcm4xIn0.v1NSQl2NjA8mdcFdmMZmxQ', {
// 	maxZoom: 18,
// 	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
// 	'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
// 	'Imagery © <a href="http://mapbox.com">Mapbox</a>',
// })

/* MapboxCoffe.addTo(map);

var baseMaps = {
	"Voyager": CartoDB_Voyager,
	"Coffe": MapboxCoffe,
	};


var overlayMaps = {};

var layerControl = L.control.layers(
baseMaps, overlayMaps, {
	collapsed: true
});

layerControl.addTo(map); */

function pointStyle(feature) {
	return {
		fillColor: '#e14389',
		color: 'white',
		weight: 1,
		opacity: 1,
		fillOpacity: 1,
		radius: 5
	};
	}


var coffeeBean = L.icon({
	iconUrl: 'icons/coffee-bean.svg',
	iconSize: [18, 18]
});


function addGeoJsonLayerWithClustering(data) {
	var markers = L.markerClusterGroup({
		showCoverageOnHover: false,
		maxClusterRadius: 10
	});
	var geoJsonLayer = L.geoJson(data,  {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: coffeeBean
			});
		
			var props = feature.properties;
			var popupContent = '<h3>' + props.nombre
			 + '</h3><p>' + props.direccion + '</p>'
			 + "</b><a href=" + 'https://www.instagram.com/cafes.uy/' + 
			 " target=\"_blank\">Fuente</a>";
			marker.bindPopup(popupContent);
			return marker;
		},
		style: pointStyle
		});
	markers.addLayer(geoJsonLayer);
    map.addLayer(markers);
};

addGeoJsonLayerWithClustering(cafes_geo);

// const cafes = L.geoJson(cafes_geo, {
// pointToLayer: function(feature, latlng) {
// 	var marker = L.marker(latlng, {
// 		icon: coffeeBean
// 	});

// 	var props = feature.properties;
// 	marker.bindPopup('<h3>' + props.nombre + '</h3><p>' + props.direccion + '</p>');
// 	return marker;
// },
// style: pointStyle
// }).addTo(map);

