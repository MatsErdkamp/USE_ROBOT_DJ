// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/4zr8j-jeU_M

function setup() {
  var button = select('#submit');
  button.mousePressed(submitWord);
}

function submitWord() {
    var score = select('#score').value();
    var bpm_score = select('#bpm_score').value();
    var valence_score = select('#valence_score').value();
    console.log(score);
  
    loadJSON('add/' + bpm_score + '/' + valence_score + '/' + score);
  }

