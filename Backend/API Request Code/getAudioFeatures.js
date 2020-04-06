const request = require('request');
const fs = require('fs');
const bota = require('btoa');
const process = require('process');
const Promise = require('bluebird');
var _ = require('lodash');

const credentials = JSON.parse(fs.readFileSync(__dirname + '/credentials.json'));
const authorization = JSON.parse(fs.readFileSync(__dirname + '/authorization.json'));
const redirect_uri = 'http://localhost:8888/callback';

songArray = require(__dirname + "/data/Tracks.json")
var IDCSV = ""
AudioFeatures = [];
songNumber = songArray.length;
loopNumber = 0;
iterations = Math.ceil(songNumber / 100);


if (loopNumber == 0) {
    getIDCSV();
    console.log("Audio Features are being generated!")
};

function getIDCSV() {
    for (var i = 0; i < songArray.length; i++) {
        //console.log("entered function");
        var ID = String(songArray[i]["song_uri"].slice(14));
        //console.log(ID);
        IDCSV = IDCSV.concat(ID, ",");
        //console.log(i);

    }
    IDCSV = IDCSV.slice(0, -1);
    //console.log(IDCSV);
    Loop();

}


function Loop() {
    if (loopNumber < iterations) {
        //console.log(loopNumber);

        loopNumber += 1;
        setTimeout(getAudioFeatures, 10);


        console.log(((loopNumber - 1) * 100) + " / " + songNumber + "  tracks generated!");


    } else {
        setTimeout(Save, 1000);
        console.log("Saving!")

    }

}

function Save() {

    console.log(songNumber + " / " + songNumber + "  tracks generated!"); // CONSOLE LOG COMPLETION
    console.log("Audio feature generation completed!")

    //console.log(Object.values(AudioFeatures));


    fs.writeFileSync(__dirname + '/data/AudioFeatures.json', JSON.stringify(AudioFeatures));
}










function getAudioFeatures(access_token) {
    AuthorizeWithRefreshToken(credentials.client_id, credentials.client_secret, authorization.refresh_token).then(function(newAuthorization) {
        return new Promise(function(resolve, reject) {

            //console.log(newAuthorization.access_token);


            var index = IDCSV.slice((loopNumber - 1) * 2300, ((loopNumber) * 2300) - 1)
            console.log(index);

            //console.log(index);
            request({
                url: "https://api.spotify.com/v1/audio-features?ids=" + index,
                method: 'GET',
                headers: {
                    'Authorization': 'sBearer ' + newAuthorization.access_token
                }
            }, function(e, response) {
                if (e) {
                    reject(e);
                    return;
                }
                resolve(JSON.parse(response.body));

                x = Object.values(JSON.parse(response.body));
                z = x[0]

                for (var i = 0; i < z.length; i++) {



                    var excitement = ((z[i].valence * 0.07) + (z[i].energy * 0.16) + 0.45)
                    z[i]['excitement'] = excitement;


                }

                AudioFeatures = _.concat(AudioFeatures, z); //= 0,45+([@valence]*0,07)+(0,16*[@energy])
                console.log(z)


                Loop();


                // console.log(Object.values(JSON.parse(response.body)));

                // var x = [];

                // Object.keys(AudioFeatures).forEach(function(key) {
                //     x.push(AudioFeatures[key]);

                // });
                // console.log(x);

            });


        });
    });

};

function AuthorizeWithRefreshToken(client_id, client_secret, refresh_token) {

    var botaAuth = bota(client_id + ":" + client_secret);

    return new Promise(function(resolve, reject) {
        request({
            url: "https://accounts.spotify.com/api/token",
            method: 'POST',
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
            headers: {
                'Authorization': "Basic " + botaAuth
            }
        }, function(e, response) {
            if (e) {
                reject(e)
                return;
            }
            resolve(JSON.parse(response.body));


        })
    });
}