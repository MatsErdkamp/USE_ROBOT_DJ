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

app.use(express.static('site'));

app.get('/add/:tempo_score/:energy_score/:valence_score/:danceability_score/:genres_new?', addWord);

<<<<<<< HEAD
=======
app.get('/add/:tempo_score/:energy_score/:valence_score/:danceability_score?', addWord);
>>>>>>> f9034c2838216f80d45d53c8b7134681f67f7557

function addWord(request, response) {

  var data = request.params;
<<<<<<< HEAD
  
=======
>>>>>>> f9034c2838216f80d45d53c8b7134681f67f7557
  var tempo = "Tempo";
  var tempo_score = Number(data.tempo_score);
  var energy = "Energy";
  var energy_score = Number(data.energy_score);
  var valence = "Valence";
  var valence_score = Number(data.valence_score);
  var danceability = "Danceability";
  var danceability_score = Number(data.danceability_score);
<<<<<<< HEAD
  var genre_index = 'Genre';
  var genre = data.genres_new;
  var genres =  genre.split(',');
  console.log(genre);

  var reply;
  
  if (!tempo_score || !energy_score || !valence_score || !danceability_score || !genres) {
=======

  var reply;
  
  if (!tempo_score || !energy_score || !valence_score || !danceability_score) {
>>>>>>> f9034c2838216f80d45d53c8b7134681f67f7557
    var reply = {
      msg: 'Score is required.'
    };
    console.log(reply);
  } else {
    words[tempo] = tempo_score;
    words[energy] = energy_score;
    words[valence] = valence_score;
    words[danceability] = danceability_score;
<<<<<<< HEAD
    words[genre_index] = genres;
=======
>>>>>>> f9034c2838216f80d45d53c8b7134681f67f7557

    var data = JSON.stringify(words, null, 2);

    fs.writeFile('parameters.json', data, finished);
  }
}

function finished(err) {
  console.log('all set.');
  // response.send(reply);
}