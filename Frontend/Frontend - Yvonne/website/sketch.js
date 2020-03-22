// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/4zr8j-jeU_M

function setup() {
  var button = select('#submit');
  button.mousePressed(submitWord);
}

function submitWord() {
    var tempo_score = select('#Tempo').value();
    var energy_score = select('#Energy').value();
    var valence_score = select('#Valence').value();
    var danceability_score = select('#Danceability').value();
  
    loadJSON('add/' + tempo_score +  '/' + energy_score + '/' + valence_score + '/' + danceability_score);
  }

  //Slider output for Tempo 
  var tempo_value = document.getElementById("Tempo"); 
  var tempo_output = document.getElementById("tempo_value"); 
  
  tempo_output.innerHTML = tempo_value.value; 
    
  tempo_value.oninput = function() { 
    tempo_output.innerHTML = this.value; 
  } 

  //Slider output for Energy 
  var energy_value = document.getElementById("Energy"); 
  var energy_output = document.getElementById("energy_value"); 
  
  energy_output.innerHTML = energy_value.value; 
    
  energy_value.oninput = function() { 
    energy_output.innerHTML = this.value; 
  }

  //Slider output for Valence 
  var valence_value = document.getElementById("Valence"); 
  var valence_output = document.getElementById("valence_value"); 
  
  valence_output.innerHTML = valence_value.value; 
    
  valence_value.oninput = function() { 
    valence_output.innerHTML = this.value; 
  }

  //Slider output for Danceability 
  var danceability_value = document.getElementById("Danceability"); 
  var danceability_output = document.getElementById("danceability_value"); 
  
  danceability_output.innerHTML = danceability_value.value; 
    
  danceability_value.oninput = function() { 
    danceability_output.innerHTML = this.value; 
  }