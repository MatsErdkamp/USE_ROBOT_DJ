const fs = require('fs');
const objectAssignDeep = require(`object-assign-deep`);

var Tracks = require(__dirname + "/data/Tracks.json");
var AudioFeatures = require(__dirname + "/data/AudioFeatures.json");
var Artists = require(__dirname + "/data/Artists.json");

var result = objectAssignDeep(Tracks, Artists);
var result = objectAssignDeep(result, AudioFeatures);

console.log(result);

fs.writeFileSync(__dirname + '/data/data.json', JSON.stringify(result, null, 2));