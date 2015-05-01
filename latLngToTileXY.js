//Lat/Lon to Tile Coordinates
//Given a latitude & longitude in WGS84 and a zoom level, this script
//outputs the corresponding pixel coordinate (based on an origin in 
//the bottom left of the tile)
//For example, at zoom level 0, lat/lon 0,0 should appear at tile coordinate 128,128, the center of the 256 pixel square tile

//Javascript implementation of a script found at https://help.openstreetmap.org/questions/747/given-a-latlon-how-do-i-find-the-precise-position-on-the-tile


//Converts numeric degrees to radians 
Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}


//input object includes lat, lon, and zoom level.
var i = {
    lat:0,
    lng:0,
    zoom:0
};

console.log('Calculating Tile Coordinates for ' + i.lat + ',' + i.lng + ' at zoom level ' + i.zoom)

var result = latLngToTileXY(i.lat,i.lng,i.zoom);

console.log('The corresponding tile coordinate is ' + result.x + ',' + result.y);


function latLngToTileXY(lat,lng,zoom) {
    var MinLatitude = -85.05112878,
        MaxLatitude = 85.05112878,
        MinLongitude = -180,
        MaxLongitude = 180,
        mapSize = Math.pow(2, zoom) * 256;

    latitude = clip(lat, MinLatitude, MaxLatitude)
    longitude = clip(lng, MinLongitude, MaxLongitude)

    var p = {};
    p.x = (longitude + 180.0) / 360.0 * (1 << zoom)
    p.y = (1.0 - Math.log(Math.tan(latitude * Math.PI / 180.0) + 1.0 / Math.cos(lat.toRad())) / Math.PI) / 2.0 * (1 << zoom)



    var tilex  = parseInt(Math.trunc(p.x));
    var tiley  = parseInt(Math.trunc(p.y));



    var pixelX = clipByRange((tilex * 256) + ((p.x - tilex) * 256), mapSize - 1)
    var pixelY = (256 - clipByRange((tiley * 256) + ((p.y - tiley) * 256), mapSize - 1))

    var result =  {
        x:parseInt(parseInt(pixelX)),
        y:parseInt(parseInt(pixelY))
    }
    return result

    function clip(n,minValue,maxValue) {
        return Math.min(Math.max(n, minValue), maxValue);
    }

    function clipByRange(n,range) {

        return n % range;
    }
}


