$(function(){
    var id = parseId(window.location.search);

    getDetail(id);

    showMap();
})

function parseId(str){ // search의 id문자열 입력
    var s = str.substring(1); // ? 제거
    var args = s.split('&'); // 대개 URL 인자들은 &로 구분되어있{음}

    for(var i=0; i<args.length; i++){
        var arg = args[i];
        var tokens = arg.split('='); // id=n split

        if(tokens[0] === 'id')
            return tokens[1];
    }

    return null;
}

function getDetail(id){
    var url = 'https://javascript-basic.appspot.com/locationDetail';

    $.getJSON(url,{
        id:id
    },function(r){
        console.log(r);
        $('.detail-header-name').html(r.name);
        $('.detail-header-city-name').html(r.cityName);
        $('.detail-desc-text').html(r.desc);

        var $gallery = $('#detail-images');
        var images = r.subImageList;

        for(var i=0; i< images.length; i++){
            var $image = $('<img src="'+ images[i] + '" />');
            $gallery.append($image);
        }

        Galleria.loadTheme('libs/galleria/themes/classic/galleria.classic.min.js');
        Galleria.run('#detail-images');

        showMarker(r.position.x,r.position.y);
    });
}

function showMap(){
    map = new google.maps.Map(document.getElementById('map'),{
        zoom : 12,
        center : {
            lat : 33.3617,
            lng : 126.5292
        }
    });
}

function showMarker(lat, lng){

    var pos = {
        lat : lat,
        lng : lng
    };

    new google.maps.Marker({
        position: {
            lat : lat,
            lng : lng
        },
        map : map
    });

    map.panTo(pos);
}