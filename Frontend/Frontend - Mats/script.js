checkedArray = []

// Get the hash of the url
hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function(initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';

//load the dataset file
fetch("https://raw.githubusercontent.com/MatsErdkamp/USE_ROBOT_DJ/Neumorphic/Frontend/ImplicitGrant/Callback/data.json")
    .then(function(resp) {

        return resp.json();
    })
    .then(function(data) {
        arr = data;
        console.log(arr);

    });

// Set token
let _token = hash.access_token;


const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "5d7b7b63771f45efb4c618aa0046adb7";
const redirectUri = 'http://robotdj.epizy.com';
const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-modify-public",
    "playlist-read-private",
    "playlist-modify-private",
    "user-read-currently-playing",
    "user-library-read",
    "user-library-modify"
]

// If there is no token, redirect to Spotify authorization
if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

// Make a call using the token
$.ajax({
    url: "https://api.spotify.com/v1/me",
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + _token
    },
    contentType: 'application/json',
    success: function(data) {
        console.log(data.display_name);
        userID = data.display_name;
    }
});


document.getElementById("Generate").addEventListener("click", generateValues);


//CREATE THE PLAYLIST FOR THE USER
function generatePlaylist() {
    console.log('generating playlist!')
    console.log("Token: " + _token)
    urlString = 'https://api.spotify.com/v1/users/' + userID + '/playlists'
    $.ajax({
        url: urlString,
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + _token
        },
        contentType: 'application/json',
        data: JSON.stringify({
            name: "Robot DJ generated playlist",
            public: true
        }),
        dataType: 'json'
    });
}


//-----READING OF VALUES AND CONVERSION INTO THE CORRECT RANGE-----

function generateValues() {

    var sliderOffset = $('.neumorphic-slider').offset().left
    var sliderWidth = $('.neumorphic-slider').width();

    console.log('Converting page values:');

    //GENRE SELECTION HANDLING CODE


    if (checkedArray.length == 0) {
        alert("Please select genres!");
    }

    console.log('Included genres:' + checkedArray);


    //VALENCE SLIDER CONVERSION
    minValence = Math.min(($('.neumorphic-slider__thumb_left').offset().left - sliderOffset + 10), ($('.neumorphic-slider__thumb_right').offset().left - sliderOffset + 10)) / sliderWidth;
    maxValence = Math.max(($('.neumorphic-slider__thumb_left').offset().left - sliderOffset + 10), ($('.neumorphic-slider__thumb_right').offset().left - sliderOffset + 10)) / sliderWidth;
    console.log("Valence:" + minValence + " , " + maxValence);
    //STILL NEED TO MAP THESE TO THE HIGHEST IN THE ARRAY

    //TEMPO SLIDER VALUE CONVERSION
    var minTempo = Math.min(($('.neumorphic-slider__thumb2_left').offset().left - sliderOffset + 10), ($('.neumorphic-slider__thumb2_right').offset().left - sliderOffset + 10)) / sliderWidth;
    var maxTempo = Math.max(($('.neumorphic-slider__thumb2_left').offset().left - sliderOffset + 10), ($('.neumorphic-slider__thumb2_right').offset().left - sliderOffset + 10)) / sliderWidth;
    //console.log("Valence:" + tempoMin + " , " + tempoMax);



    //SONG FILTERING CODE
    var filteredData = arr.filter(item =>

        item.valence >= minValence &&
        item.valence <= maxValence


    )
    console.log("Songs left that meet criteria:" + filteredData.length);




    //--MAP SONGS TO LINE

    //GET THE WANTED DURATION
    //GET MINIMUM AND MAXIMUM EXCITEMENT
    //GET (X0 in ms ,Y0 in excitement) AND ENDPOINT   


    generatePlaylist();
}








$('.neumorphic-checkbox').on('click', function() {
    $(this).toggleClass('neumorphic-checkbox_active');
    var checks = document.getElementsByClassName("neumorphic-checkbox_active")

    checkedArray = [];
    for (var i = 0; i < checks.length; ++i) {


        checkedArray.push(checks[i].id);

    }
    console.log(checkedArray);

});


$('.neumorphic-tab-container__control').on('click', function() {
    if ($(this).hasClass('neumorphic-tab-container__control_active')) {
        return false;
    }
    $('.neumorphic-tab-container__tab_shown').removeClass('neumorphic-tab-container__tab_shown');
    $('.neumorphic-tab-container__control_active').removeClass('neumorphic-tab-container__control_active');
    $(this).addClass('neumorphic-tab-container__control_active');
    $('#' + $(this).data('target')).addClass('neumorphic-tab-container__tab_shown');
});



$('.neumorphic-slider__thumb_left').on('mousedown', function() {
    $(document).on('mousemove.mm', function(e) {
        var new_value = 0;
        var length = Math.abs($('.neumorphic-slider__thumb_left').offset().left - $('.neumorphic-slider__thumb_right').offset().left + 10);
        if (e.clientX < $('.neumorphic-slider').offset().left) {
            new_value = '0%';
        } else if (e.clientX > $('.neumorphic-slider').offset().left + $('.neumorphic-slider').width() - 10) {
            new_value = '100%';
        } else {
            new_value = ((e.clientX - $('.neumorphic-slider').offset().left) / ($('.neumorphic-slider').width() - 10) * 100).toFixed(0) + '%';

        }



        document.documentElement.style.setProperty('--length', length);
        document.documentElement.style.setProperty('--value_left', new_value);

    });
    $(document).on('mouseup.mu', function() {
        $(document).off('mousemove.mm');
        $('.neumorphic-slider__thumb').off('mouseup.mu');
    });
});

$('.neumorphic-slider__thumb_right').on('mousedown', function() {
    $(document).on('mousemove.mm', function(e) {
        var new_value = 0;
        var length = Math.abs($('.neumorphic-slider__thumb_left').offset().left - $('.neumorphic-slider__thumb_right').offset().left + 10);
        if (e.clientX < $('.neumorphic-slider').offset().left) {
            new_value = '0%';
        } else if (e.clientX > $('.neumorphic-slider').offset().left + $('.neumorphic-slider').width() - 10) {
            new_value = '100%';
        } else {
            new_value = ((e.clientX - $('.neumorphic-slider').offset().left) / ($('.neumorphic-slider').width() - 10) * 100).toFixed(0) + '%';

        }

        document.documentElement.style.setProperty('--value_right', new_value);

    });
    $(document).on('mouseup.mu', function() {
        $(document).off('mousemove.mm');
        $('.neumorphic-slider__thumb_right').off('mouseup.mu');
    });
});

$('.neumorphic-slider__thumb2_left').on('mousedown', function() {
    $(document).on('mousemove.mm', function(e) {
        var new_value = 0;
        var length = Math.abs($('.neumorphic-slider__thumb_left').offset().left - $('.neumorphic-slider__thumb_right').offset().left + 10);
        if (e.clientX < $('.neumorphic-slider2').offset().left) {
            new_value = '0%';
        } else if (e.clientX > $('.neumorphic-slider2').offset().left + $('.neumorphic-slider2').width() - 10) {
            new_value = '100%';
        } else {
            new_value = ((e.clientX - $('.neumorphic-slider2').offset().left) / ($('.neumorphic-slider2').width() - 10) * 100).toFixed(0) + '%';
        }
        document.documentElement.style.setProperty('--value2_left', new_value);

    });
    $(document).on('mouseup.mu', function() {
        $(document).off('mousemove.mm');
        $('.neumorphic-slider__thumb2').off('mouseup.mu');
    });
});

$('.neumorphic-slider__thumb2_right').on('mousedown', function() {
    $(document).on('mousemove.mm', function(e) {
        var new_value = 0;
        var length = Math.abs($('.neumorphic-slider__thumb_left').offset().left - $('.neumorphic-slider__thumb_right').offset().left + 10);
        if (e.clientX < $('.neumorphic-slider2').offset().left) {
            new_value = '0%';
        } else if (e.clientX > $('.neumorphic-slider2').offset().left + $('.neumorphic-slider2').width() - 10) {
            new_value = '100%';
        } else {
            new_value = ((e.clientX - $('.neumorphic-slider2').offset().left) / ($('.neumorphic-slider2').width() - 10) * 100).toFixed(0) + '%';
        }
        document.documentElement.style.setProperty('--value2_right', new_value);

    });
    $(document).on('mouseup.mu', function() {
        $(document).off('mousemove.mm');
        $('.neumorphic-slider__thumb2_right').off('mouseup.mu');
    });
});