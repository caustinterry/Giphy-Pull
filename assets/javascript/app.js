// on document load, a set of buttons are loaded from an array
// when a button is clicked, 10 gifs are populted from gify
// each gif has information such as the rating and other metadata of my choosing
// images are static until clicked, once clicked they animate, on click again they will become static

// additionally, there's  field that the user can input additional items to the array
// when inserted to the array it will create a new butoon that can be clicked
// Bonus features: mobile responsive, add more gifs without over writting, add additional API (OMDB, Bands in Town)
// xtra Bonus: add to local storage so the gifs stay on the page after you leave

$(document).ready(function() {
  //variables
  //Artists array
  var artists = "coolio";

  //API keys
  var bandAPI = "eb1552eb-9dea-4af7-b57e-efceb15cc39e";
  var gifyAPI = "BlgbDHXopyhvnQ1BXVu7szoDw8gwuUSy";

  //Query URLS for API's
  var bandsQueryURL =
    "https://rest.bandsintown.com/artists/" +
    artists +
    "?app_id=" +
    bandAPI +
    "";

  var gifyQueryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    artists +
    "&api_key=" +
    gifyAPI +
    "&limit=5";

  //Functions

  //Event Listeners

  //Clicking the button for the artists to make populate the gifs
  $("#artistButton").on("click", function() {
    $.ajax({
      url: gifyQueryURL,
      method: "GET"
    }).then(function(gif) {
      console.log(gif);
      var gifReturn = gif.data;
      for (var i = 0; i < gifReturn.length; i++) {
        var gifURL = gifReturn[i].images.fixed_height.url;

        console.log(i);
        var artistImage = $("<img>");
        artistImage.attr("src", gifURL);
        artistImage.attr("alt", "artist image");

        $("#gif").append(artistImage);
      }
    });
  });
});
