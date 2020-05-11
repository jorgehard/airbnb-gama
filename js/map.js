buscarApi(api_url)
    .then(function (response) {
        if (locationEnd !== '') {


            response = response.filter((locationx) => {
                return locationx.keyword === locationEnd;
            });

            locations = response.map(function (elem) {
                return {
                    name: elem.location,
                    iconEtapa: "1",
                }
            });
            theNext();

        }
    });


var locationEnd = JSON.parse(sessionStorage.getItem('locationEnd'));
var delay = 10;
var infowindow = new google.maps.InfoWindow();
var latlng = new google.maps.LatLng(-23.962077, -46.397010);
var mapOptions = {
    zoom: 13,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}
var geocoder = new google.maps.Geocoder();
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
var bounds = new google.maps.LatLngBounds();

var nextAddress = 0;

function theNext() {
    if (nextAddress < locations.length) {
        setTimeout('geocodeAddress("' + nextAddress + '",theNext)', delay);
        nextAddress++;
    } else {
        map.fitBounds(bounds);
    }
}
function createMarker(add, lat, lng) {
    var image = {
        url: "./assets/marker.png",
        scaledSize: new google.maps.Size(39, 39)
    };
    var icons = {
        '1': { icon: image },
    };
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        icon: icons[add.iconEtapa].icon
    });
    bounds.extend(marker.position);
}

function geocodeAddress(address, next) {
    var address = locations[address];
    geocoder.geocode({ 'address': address.name }, function (results, status) {
        componentRestrictions: {
            country: 'BR'
        }
        if (status == google.maps.GeocoderStatus.OK) {
            var p = results[0].geometry.location;
            var lat = p.lat();
            var lng = p.lng();
            createMarker(address, lat, lng);
        } else {
            if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                nextAddress--;
                delay++;
            }
        }
        next();
    });
}