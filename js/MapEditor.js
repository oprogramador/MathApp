/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function MapEditor(parameters) {
    var map;
    var points = [];

    function addListeners() {
        google.maps.event.addListener(map, 'click', function(e) {
            addPointFromEvent(e);
        });
    }

    function makePdf(file) {
        var content = JSON.parse(file.content);
        var img = new Image();
        img.setAttribute('crossOrigin','anonymous');
        img.src = 'http://maps.googleapis.com/maps/api/staticmap?center='+
            content.center.A+','+content.center.F+
            '&zoom='+
            content.zoom+
            '&scale=true&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=color:yellow';
        img.width = 1200;
        img.height = 800;
        for(var i=0; i<content.points.length; i++) img.src += '|'+content.points[i].A+','+content.points[i].F;
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        img.onload = function() {
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            var imgData = canvas.toDataURL('image/png');
            var doc = new jsPDF('p', 'mm');
            doc.addImage(imgData, 'PNG', 10, 10);
            doc.save(file.name+'.pdf');
        }
    }

    function addPoint(point) {
        var icon = {
            path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
            fillColor: 'yellow',
            fillOpacity: 0.8,
            scale: 0.1,
            strokeColor: 'gold',
            strokeWeight: 1.4
        }

        var marker = new google.maps.Marker({
            position: point,
            icon: icon,
            map: map,
        });

        //map.panTo(point);
    } 

    function loadPoints() {
        for(var i=0; i<points.length; i++) addPoint(points[i]);
    }

    function addPointFromEvent(event) {
        var point = event.latLng;
        points.push(point);
        addPoint(point);
    }

    function createMap() {
        var mapOptions = {
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(0,0)
        };
        map = new google.maps.Map(document.getElementById(parameters.mapCanvasId), mapOptions);
    }

    function init() {
        if(typeof google === 'undefined' || typeof google.maps === 'undefined') return;
        createMap();
        addListeners();
    }

    function setValue(value) {
        createMap();
        addListeners();
        try {
            var data = JSON.parse(value);
            points = data.points.map(function(x){ return new google.maps.LatLng(x.A, x.F); });
            map.setCenter(new google.maps.LatLng(data.center.A, data.center.F));
            map.setZoom(data.zoom);
            loadPoints();
        } catch(e) {
            e.message;
        }
    }

    function getValue() {
        return JSON.stringify({
            points: points,
            center: map.getCenter(),
            zoom: map.getZoom(),
        });
    }

    function getMap() {
        return map;
    }

    this.setValue = setValue;
    this.getValue = getValue;
    this.getMap = getMap;
    this.makePdf = makePdf;
    init();
}
