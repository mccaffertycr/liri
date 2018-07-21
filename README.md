# liri 

## intro
Week 10 homework assignment - LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is be a command line node app that takes in parameters and gives you back data.

### parameters

1. this-user-tweets
    * pass [node liri.js this-user-tweets username] to print that user's last 20 tweets

    ![tweets example](liri_tweets.jpg)

2. movie-this
    * pass [node liri.js movie-this "movie title"] to print info about the movie

    ![movie example](liri_movie.jpg)

3. spotify-this-song
    * pass [node liri.js spotify-this-song "song title"] to print info about the song with a spotify link

    ![spotify example](liri_spotify.jpg)

4. do-what-it-says
    * pass [node liri.js do-what-it-says] to read the text file in the project and do-what-it-says (spoiler it just does a spotify-this-song search for 'I Want it That Way' by the Backstreet Boys)

    ![dowhatitsays example](liri_dowhatitsays.jpg)