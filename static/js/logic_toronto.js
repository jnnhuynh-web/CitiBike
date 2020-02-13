var newYorkCoords = [43.6577, -79.4216];
var mapZoomLevel = 13;
var url = "https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_information"

// Create the createMap function
function createMap(bikeStations) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Bike Stations": bikeStations
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [lightmap, bikeStations]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
  
} //ends the createMap function
// createMap();

// Create the createMarkers function
function createMarkers(response){
  // Pull the "stations" property off of response.data
  var stations = response.data.stations;

  // Initialize an array to hold bike markers
    var bikeMarkers = [];

    // Loop through the stations array
    for (var i = 0; i < stations.length; i++) {
      var station = stations[i];
      // For each station, create a marker and bind a popup with the station's name
      var bikeMarker = L.marker([station.lat, station.lon])
      .bindPopup(`
        <h3> ${station.name} </h3>  
        <p> Capacity: ${station.capacity} </p> 
        <p> Rental Methods: ${station.rental_methods} </p>
        `);
      // Add the marker to the bikeMarkers array
      bikeMarkers.push(bikeMarker)
    }; // for loop closing

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(bikeMarkers));
} // closing for createMarkers()

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when comple
d3.json(url, createMarkers);


// PART 2
// Second API call to the Citi Bike Station Status Endpoint for station_id, num_bikes_available, is_installed, and is_renting
// var statusUrl = "https://gbfs.citibikenyc.com/gbfs/en/station_status.json"
// d3.json(statusUrl, function(data) {
//   var station = data.data.stations;
//   var station_id_list = [];
//   var num_bikes_available_list = [];
//   var is_installed_list = [];
//   var is_renting_list = [];
  
//   // for loop to loop each station
//   for (var i = 0; i < station.length; i++) {
//     var station_id = station[i].station_id
//     station_id_list.push(station_id)

//     var num_bikes_available = station[i].num_bikes_available
//     num_bikes_available_list.push(num_bikes_available)

//     var is_installed = station[i].is_installed
//     is_installed_list.push(is_installed)

//     var is_renting = station[i].is_renting
//     is_renting_list.push(is_renting)

//   }
//   console.log(station_id_list)
// });
