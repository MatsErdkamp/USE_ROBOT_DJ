// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/6iZiqQZBQJY

var fs = require('fs');
var data = fs.readFileSync('parameters.json');
var words = JSON.parse(data);
console.log(words);


var express = require('express');

var app = express();

var server = app.listen(3000, listening);

function listening() {
  console.log('listening. . . ');
}

app.use(express.static('website'));

app.get('/add/:bpm_score/:valence_score/:score?', addWord);

function addWord(request, response) {

  var data = request.params;
  var value = "value";
  var score = Number(data.score);
  var bpm = "bpm";
  var bpm_score = Number(data.bpm_score)
  var valence = "valence";
  var valence_score = Number(data.valence_score)

  var reply;
  
  if (!score || !valence_score || !bpm_score) {
    var reply = {
      msg: 'Score is required.'
    };
    response.send(reply);
  } else {
    words[value] = score;
    words[bpm] = bpm_score;
    words[valence] = valence_score;

    var data = JSON.stringify(words, null, 2);

    fs.writeFile('parameters.json', data, finished);
  }
}

function finished(err) {
  console.log('all set.');
  // response.send(reply);
}
