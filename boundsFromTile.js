//Bounds from Tile 
//Given a zoom, x, and y for a map tile, returns the tile's bounding box in WGS84
//Javascript implementation of code found at http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection/

//input object is the z/x/y notation for a map tile
var i = {
  x:0,
  y:0,
  z:0
}


console.log('Calculating bounding box for tile ' + i.z + '/' + i.x + '/' + i.y)


var output = boundsFromTile(i.z,i.x,i.y)

console.log('The bounding box is:');
console.log(output);


function boundsFromTile(z,x,y) {
var bounds = tileBounds(z,x,y);
    mins = metersToLatLng(bounds[0]);
    maxs = metersToLatLng(bounds[1]);
       
    bounds={
      minLat:mins[1],
      maxLat:maxs[1],
      minLng:mins[0],
      maxLng:maxs[0]
    };

    return bounds;
}

function metersToLatLng(coord) {
  lng = (coord[0] / (2 * Math.PI * 6378137 / 2.0)) * 180.0
  
  lat = (coord[1] / (2 * Math.PI * 6378137 / 2.0)) * 180.0
  lat = 180 / Math.PI * (2 * Math.atan( Math.exp( lat * Math.PI / 180.0)) - Math.PI / 2.0)
  
  return [lng,lat]
}

function tileBounds(z,x,y) {
  var mins = pixelsToMeters( z, x*256, y*256 )
  var maxs = pixelsToMeters( z, (x+1)*256, (y+1)*256 )
        
  return [mins,maxs];
}

function pixelsToMeters(z,x,y) {
  var res = (2 * Math.PI * 6378137 / 256) / (Math.pow(2,z));
  mx = x * res - (2 * Math.PI * 6378137 / 2.0);
  my = y * res - (2 * Math.PI * 6378137 / 2.0);
  return [mx, my];
}


