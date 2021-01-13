var MARKER_LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var map;

$(function(){
    var myTrips = Cookies.getJSON('MYTRIPS');

    if(!myTrips)
        myTrips = [];

    showMap();
    generateMyTripList(myTrips);
});

function showMap(){
    map = new google.maps.Map(document.getElementById('map'),{
        zoom : 12,
        center : {
            lat : 33.3617,
            lng : 126.5292
        }
    });
}

function generateMyTripList(list){
    var bounds = new google.maps.LatLngBounds(); // 마커 여러개일때 영역을 한 번에 보여줌
    var $list = $('#mytrip-list');

    for(var i=0; i<list.length; i++){
        var myTrip = list[i];

        var pos = {
            lat : myTrip.x,
            lng : myTrip.y
        };

        var markerlabel = MARKER_LABELS[i];

        var $item = $('#mytrip-item-template').clone().removeAttr('id');
        $item.find('.item-name').html(markerlabel + '. ' + myTrip.name);
        $item.find('.item-city-name').html(myTrip.cityName);

        $list.append($item);

        new google.maps.Marker({
            position : pos,
            label: markerlabel,
            map : map
        });

        bounds.extend(pos);
    }
    map.fitBounds(bounds);
}