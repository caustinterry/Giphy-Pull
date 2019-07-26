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
    "Tupac",
    "The Beatles",
    "Nicki Minaj",
    "Flock of Seaguls",
    "Beyonce",
    "The Black Keys",
    "Weezer",
    "Psy",
    "Notorious B.I.G",
    "David Bowie",
    "Rod Stewart",
    "Justin Bieber",
    "Elton John",
    "Phil Collins"
  ];

  //API keys
  var bandAPI = "eb1552eb-9dea-4af7-b57e-efceb15cc39e";
  var gifyAPI = "BlgbDHXopyhvnQ1BXVu7szoDw8gwuUSy";

  //Functions
  //for loop to create the buttons in the array
  function buttonCreate() {
    $("#buttonSpot").empty();
    for (var j = 0; j < artists.length; j++) {
      var buttons = $("<button class='button'>");
      buttons.attr("class", "artButton");
      buttons.attr("data-artist", artists[j]);
      buttons.attr("value", artists[j]);
      buttons.text(artists[j]);

      $("#buttonSpot").append(buttons);
    }
  }
  //function to create the musician from the input bar
  function addBand() {
    $("#artBtn").on("click", function() {
      var artInput = $("#formInput")
        .val()
        .trim();
      if (artInput === "") {
        return false;
      }

      artists.push(artInput);
      buttonCreate();
      event.preventDefault();
    });
  }

  //Clicking the button for the artists to make populate the gifs
  function gifRuns() {
    console.log("test");
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
      "&limit=12&rating=PG";

    $.ajax({
      url: gifyQueryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      $("#gif").empty();
      var gifReturn = response.data;
      for (var i = 0; i < gifReturn.length; i++) {
        var p = $("<p>").text("Rating: " + gifReturn[i].rating); //pulls rating of gif and adds it to <p>

        var gifDiv = $("<div>"); //create div to put the gif into
        gifDiv.attr("class", "card");
        gifDiv.attr("style", "width: 18rem");

        var cardBody = $("<div>"); //create div for body content of card
        cardBody.attr("class", "card-body");
        cardBody.append(p);

        var gifStillURL = gifReturn[i].images.fixed_width_still.url;
        var gifAnimateURL = gifReturn[i].images.fixed_width.url;

        var artistImage = $("<img>");
        artistImage.attr("class", "card-img-top giphy");
        artistImage.attr("src", gifStillURL);
        artistImage.attr("alt", "artist image");
        artistImage.attr("data-still", gifStillURL);
        artistImage.attr("data-animate", gifAnimateURL);
        artistImage.attr("data-state", "still");

        gifDiv.append(artistImage);
        gifDiv.append(cardBody);

        $("#gif").prepend(gifDiv);
      }
    });
  }
  //function to animate the gifs
  function animation() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  buttonCreate();
  addBand();

  //Event Listeners
  //click listener for the musician gifs to populate
  $(document).on("click", ".artButton", gifRuns);
  //gifs will animate when hovered over instead of clicking
  $(document).on("mouseenter mouseleave", ".giphy", animation);
});
