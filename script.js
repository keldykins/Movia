$(document).foundation();
$( document ).ready(function() {
const startButton = $("#startButton");
const main = $("#main");
const header = $("header");


startButton.on("click", function () {
    main.css("display", "none");
    header.css("display", "none");
    startQuiz();
});

function startQuiz() {
    
var textDiv = $("<p>").text("Hello World");

$("#questions").append(textDiv);

}

// Movie Search (AJAX CALL)
var movies = [];
var movieDisplay = $("movie-display");


$("#movieSearchBtn").on("click", function(event){
    event.preventDefault();
    var movieTitle = $("#movieInput").val();

    $.ajax({
        url: `https://www.omdbapi.com/?t=${movieTitle}&apikey=trilogy`,
        method: "GET"
    }).then(function(response) {
        // Creating a div to hold the movie
        var movieDiv = $("<div class='movie'>");
    
        // Storing the rating data
        var rating = response.Rated;
    
        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);
    
        // Displaying the rating
        movieDiv.append(pOne);
    
        // Storing the release year
        var released = response.Released;
    
        // Creating an element to hold the release year
        var pTwo = $("<p>").text("Released: " + released);
    
        // Displaying the release year
        movieDiv.append(pTwo);
    
        // Storing the plot
        var plot = response.Plot;
    
        // Creating an element to hold the plot
        var pThree = $("<p>").text("Plot: " + plot);
    
        // Appending the plot
        movieDiv.append(pThree);
    
        // Retrieving the URL for the image
        var imgURL = response.Poster;
    
        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);
    
        // Appending the image
        movieDiv.append(image);
    
        // Putting the entire movie above the previous movies
        $("#movie-display").prepend(movieDiv);
    
    })

});

});

