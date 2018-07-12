require('dotenv').config();
var keys = require('./keys.js');
var request = require('request');
var fs = require('fs');
// var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify);
var omdb_key = keys.omdb.omdb;
var action = process.argv[2];

// function for the switch statement that is the main logic of the program
function liriSwitch(a) {
    switch (a) {
        case 'my-tweets':
            break;
        case 'spotify-this-song':
            song(process.argv[3]);
            break;
        case 'movie-this':
            movie();
            break;
        case 'do-what-it-says':
            random();
            break;
        default:
            break;
    }
}

// function that makes a spotify request
function song(s) {
    if (s) {
        var songName = s;
    } else {
        var songName = 'the sign';
    }
    spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('error: ' + err);
        }
            console.log('artist: ' + data.tracks.items[0].artists[0].name); 
            console.log('song: ' + data.tracks.items[0].name);
            console.log('listen: ' + data.tracks.items[0].external_urls.spotify);
            console.log('album: ' + data.tracks.items[0].album.name);
            
    });
}

// function that makes an OMDB request
function movie() {
    if (process.argv[3]) {
        var movieName = process.argv[3];
    } else {
        var movieName = 'mr nobody';
    }
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=' + omdb_key;
    // Then run a request to the OMDB API with the movie specified
    request(queryUrl, function(error, response, body) {
        // If the request is successful 
        if (!error && response.statusCode === 200) {
            // Then log info about the movie
            console.log('movie: ' + JSON.parse(body).Title);
            console.log('year released: ' + JSON.parse(body).Year);
            console.log('imdb rating: ' + JSON.parse(body).Ratings[0].Value);
            console.log('rt rating: ' + JSON.parse(body).Ratings[1].Value);
            console.log('country: ' + JSON.parse(body).Country);
            console.log('language: ' + JSON.parse(body).Language);
            console.log('plot: ' + JSON.parse(body).Plot);
            console.log('actors: ' + JSON.parse(body).Actors);
        } else {
            return console.log('error: ' + error);
        }
    });
}

// function that reads the random text file and does what it says
function random() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        // if the code experiences any errors it will log them to the console
        if (error) {
            return console.log(error);
        } 
        var readArr = data.split(',');
        
        action = readArr[0];

        song(readArr[1]);
    });
}

// run the liriswitch function when the rest of the file loads
liriSwitch(action);
