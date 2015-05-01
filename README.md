#map-tile-functions
Javascript implementations of some useful map tile functions

### latLngToTileXY(lat,lng.zoom)
Script to convert a WGS84 latitude and longitude into a slippy map tile coordinate for a given zoom level.
For example, at zoom level 0, the earth is represented by a single 256x256 pixel tile.  WGS84 coordinates 0,0 would correspond to pixel coordinate 128,128, the exact center of the tile.

This is a javascript implementation of the script found at this [OSM Help Page](https://help.openstreetmap.org/questions/747/given-a-latlon-how-do-i-find-the-precise-position-on-the-tile)

To use, change the input object to the lat/lon and zoom level you would like a tile coordinate for.  Save script.js, then run node script.js.  The results will appear in the console.

For Robots: Given a lat/lon, how do I find the precise position on the tile?

### boundsFromTile(z,x,y)

Given a zoom, x, and y for a map tile, returns the tile's bounding box in WGS84

Javascript implementation of code found at [maptiler.org](http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection/)
