require('dotenv').config();
var keys = require('./keys.js');
var request = require('request');
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api'); 
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var omdb_key = keys.omdb.key;
var action = process.argv[2];

// function for the switch statement that is the main logic of the program
function liriSwitch(a, b) {
    switch (a) {
        case 'this-user-tweets':
            tweet();
            break;
        case 'spotify-this-song':
            song(b);
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

// pass twitter username as an argument to get that users last 20 tweets
function tweet() {
    var tweeter = process.argv[3];
    var params = {screen_name: tweeter};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text, tweets[i].created_at + '\n');
            }
        }
    });
}

// function that makes a spotify request
function song(s) {
    if (s) {
        var songName = s;
    } else {
        var songName = 'the sign';
    }
    spotify.search({ type: 'track', query: songName, limit: 6 }, function(err, data) {
        if (err) {
            return console.log('error: ' + err);
        }
        // log data about the song passed as an argument or 'The Sign' as default
        if (songName === s) {
            console.log('artist: ' + data.tracks.items[0].artists[0].name); 
            console.log('song: ' + data.tracks.items[0].name);
            console.log('album: ' + data.tracks.items[0].album.name);
            console.log('listen: ' + data.tracks.items[0].external_urls.spotify);
        } else {
            console.log('artist: ' + data.tracks.items[5].artists[0].name); 
            console.log('song: ' + data.tracks.items[5].name);
            console.log('album: ' + data.tracks.items[5].album.name);
            console.log('listen: ' + data.tracks.items[5].external_urls.spotify);
        }
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

        liriSwitch(action, readArr[1]);
    });
}

// run the liriswitch function
liriSwitch(action, process.argv[3]);
