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

    
    var mask = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
    var genres = ["Soul", "Reggae", "Ambient", "Rock" , "Jazz", "Pop", "Funk", "Electronic", "Classical", "Country", "Disco", "Blues", "World", "HipHop", "Metal", "Mood"];
    var Soul = document.getElementById("Soul");
    var Reggae = document.getElementById("Reggae");
    var Ambient = document.getElementById("Ambient");
    var Rock = document.getElementById("Rock");
    var Jazz = document.getElementById("Jazz");
    var Pop = document.getElementById("Pop");
    var Funk = document.getElementById("Funk");
    var Electronic = document.getElementById("Electronic");
    var Classical = document.getElementById("Classical");
    var Country = document.getElementById("Country");
    var Disco = document.getElementById("Disco");
    var Blues = document.getElementById("Blues");
    var World = document.getElementById("World");
    var HipHop = document.getElementById("HipHop");
    var Metal = document.getElementById("Metal");
    var Mood = document.getElementById("Mood");
      
    if(Soul.checked == true){
      mask[0] = true;
    }

    if(Reggae.checked == true){
      mask[1] = true;
    }
    
    if(Ambient.checked == true){
      mask[2] = true;
    }

    if(Rock.checked == true){
      mask[3] = true;
    }
    if(Jazz.checked == true){
      mask[4] = true;
    }

    if(Pop.checked == true){
      mask[5] = true;
    }
    if(Funk.checked == true){
      mask[6] = true;
    }

    if(Electronic.checked == true){
      mask[7] = true;
    }
    if(Classical.checked == true){
      mask[8] = true;
    }

    if(Country.checked == true){
      mask[9] = true;
    }
    if(Disco.checked == true){
      mask[10] = true;
    }

    if(Blues.checked == true){
      mask[11] = true;
    }
    if(World.checked == true){
      mask[12] = true;
    }

    if(HipHop.checked == true){
      mask[13] = true;
    }
    if(Metal.checked == true){
      mask[14] = true;
    }

    if(Mood.checked == true){
      mask[15] = true;
    }
    
    genres_new = genres.filter((item, i) => mask[i]);
    //new
  
    loadJSON('add/' + tempo_score +  '/' + energy_score + '/' + valence_score + '/' + danceability_score + '/' + genres_new);
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