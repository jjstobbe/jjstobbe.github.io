var data = {
	"location": [{
		"Lat": 33.451683, 
                "Lng": -86.851161,
		"Label": "Birmingham Boulders"
	},{
		"Lat": 33.502123, 
		"Lng": -86.806445,
		"Label": "Campus Recreation Center Climbing Gym"
	}]
};

console.log(data);

var map = L.map('mapid').setView([39.82, -98.58], 4);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

for(var i = 0;i<data.location.length;i++){
	L.marker([data.location[i].Lat, data.location[i].Lng]).addTo(map)
		.bindPopup(data.location[i].Label);
}
