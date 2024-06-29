// ===========================================================================================

function toHexString(byteArray) {
  return Array.prototype.map.call(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}

function swap16(val) {
    return ((val & 0xFF) << 8)
           | ((val >> 8) & 0xFF);
}

var customMapFormat = {
    name: "GOGITUM Export",
    extension: "dat",

    write: function(map, fileName) {

		var w = map.width;
		var h = map.height;
        
		var arrayBuffer = new ArrayBuffer(2+(w*h))
		var byteBuffer = new Int8Array(arrayBuffer)

		byteBuffer[0] = w-1;
		byteBuffer[1] = h-1;
		
        for (var i = 0; i < map.layerCount; ++i) {
            
			var layer = map.layerAt(i);
			
			if (layer.isTileLayer && layer.name == "Terrain") {
				
				var idx=2;
				
				for (var y = 0; y < h; ++y) {
					for (var x = 0; x < w; ++x) {
						var tile = layer.tileAt(x, y);
						if (tile != null) {
							byteBuffer[idx]=tile.id+1;
						} else {
							byteBuffer[idx]=0;
						}
						idx++;
					}
				}

			}
			
			if (layer.isTileLayer && layer.name == "Structures") {
				
				var idx=2;
				
				for (var y = 0; y < h; ++y) {
					for (var x = 0; x < w; ++x) {
						var tile = layer.tileAt(x, y);
						if (tile != null) {
							byteBuffer[idx]=tile.id+1;
						}
						idx++;
					}
				}

			}			
			
        }

		var file = new BinaryFile(fileName, BinaryFile.WriteOnly);
		file.write(arrayBuffer);
		file.commit();

    },
}


var customMapFormat16 = {
    name: "GOGITUM 16 Export",
    extension: "dat",

    write: function(map, fileName) {

		var w = map.width;
		var h = map.height;
        
		var arrayBuffer = new ArrayBuffer((2+(w*h))*2)
		var byteBuffer = new Int16Array(arrayBuffer)

		byteBuffer[0] = swap16(w-1);
		byteBuffer[1] = swap16(h-1);
		
        for (var i = 0; i < map.layerCount; ++i) {
            
			var layer = map.layerAt(i);
			
			
			if (layer.isTileLayer && layer.name == "Terrain") {
				
				var idx=2;
				
				for (var y = 0; y < h; ++y) {
					for (var x = 0; x < w; ++x) {
						var tile = layer.tileAt(x, y);
						if (tile != null) {
							var tilesetIndex=Number(tile.tileset.name.substr(tile.tileset.name.length-1))
							if (tilesetIndex == undefined) {
								tilesetIndex=0
							}
							if ( tilesetIndex > 0) {
								tilesetIndex=tilesetIndex-1
							}
							byteBuffer[idx]=swap16(tilesetIndex*300+tile.id+1) // To BigEndian
						} else {
							byteBuffer[idx]=0;
						}
						idx++;
					}
				}
			}
			
			
			
			if (layer.isTileLayer && layer.name == "Structures") {
				
				var idx=2;
				
				for (var y = 0; y < h; ++y) {
					for (var x = 0; x < w; ++x) {
						var tile = layer.tileAt(x, y);
						if (tile != null) {
							byteBuffer[idx]=swap16(tile.id+1); // To BigEndian
						}
						idx++;
					}
				}

			}		
			
        } 



		var file = new BinaryFile(fileName, BinaryFile.WriteOnly);
		file.write(arrayBuffer);
		file.commit();
		

    },
}

tiled.registerMapFormat("custom8", customMapFormat)

tiled.registerMapFormat("custom16", customMapFormat16)