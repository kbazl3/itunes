var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here

    this.getItunes = function(artist) {
      var dfd = $q.defer();
      console.log(artist);
      $http({
          method: "JSONP",
          url: "https:itunes.apple.com/search?attribute=allArtistTerm&term=" + artist + "&callback=JSON_CALLBACK"
      })
      .then(function(response) {
          var artistInfo = [];
          var parsedResponse = response.data.results;
        //   console.log(parsedResponse);
          parsedResponse.forEach(function(value) {
              artistInfo.push({
                 AlbumArt: value.artworkUrl30,
                  Artist: value.artistName,
                  Collection: value.collectionName,
                  TrackPrice: value.trackPrice,
                  CollectionPrice: value.collectionPrice,
                  Play: value.previewUrl,
                  Type: value.kind,
                  Song: value.trackName
              });
              console.log(artistInfo);
          });
          dfd.resolve(artistInfo);
      });
      return dfd.promise;
  };
});
