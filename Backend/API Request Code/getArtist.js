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
iterations = Math.ceil(songNumber / 50);


if (loopNumber == 0) {
    getIDCSV();
    console.log("Artist info is being generated!")
};

function getIDCSV() {

    for (var i = 0; i < songArray.length; i++) {
        var ID = String(songArray[i]["artist_uri"].slice(15));
        IDCSV = IDCSV.concat(ID, ",");

    }
    IDCSV = IDCSV.slice(0, -1)
    Loop();
    //console.log(IDCSV);

}


function Loop() {
    if (loopNumber < iterations) {
        //console.log(loopNumber);

        loopNumber += 1;
        setTimeout(getAudioFeatures, 10);


        console.log(((loopNumber - 1) * 50) + " / " + songNumber + "  tracks generated!");


    } else {
        setTimeout(Save, 1000);
        console.log("Saving!")

    }

}

function Save() {

    console.log(songNumber + " / " + songNumber + "  artist information generated!"); // CONSOLE LOG COMPLETION
    console.log("Audio feature generation completed!")

    //console.log(Object.values(AudioFeatures));


    fs.writeFileSync(__dirname + '/data/Artists.json', JSON.stringify(AudioFeatures));
}










function getAudioFeatures(access_token) {
    AuthorizeWithRefreshToken(credentials.client_id, credentials.client_secret, authorization.refresh_token).then(function(newAuthorization) {
        return new Promise(function(resolve, reject) {

            //console.log(newAuthorization.access_token);


            var index = IDCSV.slice((loopNumber - 1) * 1150, ((loopNumber) * 1150) - 1);
            console.log(index)

            //console.log(index);
            request({
                url: "https://api.spotify.com/v1/artists?ids=" + index,
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
                //console.log(x)
                AudioFeatures = _.concat(AudioFeatures, x[0])
                Loop();
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