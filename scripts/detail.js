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

        $('.btn-register').click(function(){ // 쿠키에 여행지 저장
            var myTrips = Cookies.getJSON('MYTRIPS');
            var overlap = 0;
            if(!myTrips)
                myTrips = [];
            console.log(myTrips);
            for(var j=0; j< myTrips.length; j++){
                var checkId = myTrips[j];
                if(r.id == checkId.id){
                    overlap = 1; // 이미 등록된 경우 등록 x
                }
                console.log('r.id ='+r.id);
                console.log('check.id ='+ checkId.id);
            }

            if(overlap === 1) alert('이미 등록된 장소입니다.');
            else{
            myTrips.push({
                id: id,
                name : r.name,
                cityName : r.cityName,
                x: r.position.x,
                y:r.position.y
            });
            Cookies.set('MYTRIPS',myTrips);
            alert('여행지가 등록되었습니다!');
            }
        });
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