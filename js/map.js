
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

    // google.maps.event.addListener(marker, 'click', function () {
    //     infowindow.setContent(contentString);
    //     infowindow.setOptions('maxWidth', 350);
    //     infowindow.open(map, marker);
    // });

    // google.maps.event.addDomListener(li, "click", function () {
    //     google.maps.event.trigger(marker, "click");
    // });
    bounds.extend(marker.position);
}

buscarApi(api_url)
    .then(mostrarLocation);

console.log(locations_teste);

var locations = [
    {
        name: 'Av. Ana Costa, 473 - Gonzaga, Santos - SP',
        iconEtapa: '1'
    },
    {
        name: 'Rua Alexandre Herculano, 23, Santos - SP',
        iconEtapa: '1'
    }
];







var nextAddress = 0;
function theNext() {
    if (nextAddress < locations.length) {
        setTimeout('geocodeAddress("' + nextAddress + '",theNext)', delay);
        nextAddress++;
    } else {
        map.fitBounds(bounds);
    }
}
theNext();