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
  var artists = [
    "Coolio",
    "Taylor Swift",
    "Kanye",
    "Lady Gaga",
    "Katy Perry",
    "Nirvana",
    "Nicki Minaj",
    "Flock of Seaguls",
    "Beyonce",
    "The Black Keys",
    "Weezer"
  ];

  //API keys
  var bandAPI = "eb1552eb-9dea-4af7-b57e-efceb15cc39e";
  var gifyAPI = "BlgbDHXopyhvnQ1BXVu7szoDw8gwuUSy";

  //Functions
  //for loop to create the buttons in the array
  function buttonCreate() {
    for (var j = 0; j < artists.length; j++) {
      var buttons = $("<button>" + artists[j] + "</>");
      buttons.attr("class", "artButton");
      buttons.attr("data-artist", artists[j]);
      buttons.attr("value", artists[j]);

      $("#buttonSpot").append(buttons);
    }
  }
  buttonCreate();
  //Event Listeners

  //Clicking the button for the artists to make populate the gifs
  $("button").on("click", function() {
    var band = $(this).attr("data-artist");

    //Query URLS for API's
    var bandsQueryURL =
      "https://rest.bandsintown.com/artists/" +
      band +
      "?app_id=" +
      bandAPI +
      "";
    var gifyQueryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      band +
      "&api_key=" +
      gifyAPI +
      "&limit=5&rating=PG";

    $.ajax({
      url: gifyQueryURL,
      method: "GET"
    }).then(function(gif) {
      console.log(gif);
      var gifReturn = gif.data;
      for (var i = 0; i < gifReturn.length; i++) {
        var p = $("<p>").text("Rating: " + gifReturn[i].rating);

        var gifDiv = $("<div>");
        gifDiv.attr("class", "card");
        gifDiv.attr("style", "width: 18rem");

        var cardBody = $("<div>");
        cardBody.attr("class", "card-body");
        cardBody.append(p);

        var gifURL = gifReturn[i].images.fixed_height.url;

        var artistImage = $("<img>");
        artistImage.attr("class", "card-img-top");
        artistImage.attr("src", gifURL);
        artistImage.attr("alt", "artist image");

        gifDiv.append(artistImage);
        gifDiv.append(cardBody);

        $("#gif").prepend(gifDiv);
      }
    });
  });

  $("#artBtn").on("click", function() {
    var artInput = $("#formInput");
    artists.push(artInput.val().trim());
    buttonCreate();
  });
});
