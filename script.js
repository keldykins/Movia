$(document).foundation();

const startButton = $("#startButton");
const main = $("#main");
const header = $("header");
let score = 0;
let triviaQuestionIndex = 0;
let apiResponse = "";

startButton.on("click", function () {
  main.css("display", "none");
  header.css("display", "none");
  startQuiz();
});

function startQuiz() {
  event.preventDefault();
  $("#main").fadeOut("slow");
  $("#main").empty();
  triviaCall();
}

function triviaCall() {
  $.ajax({
    dataType: "json",
    url:
      "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple",
    method: "GET",
  }).then(function (response) {
    $("#main").fadeIn("slow");
    apiResponse = response.results;
    renderQuestions();
    // if then statements to run through correct/ wrong answers scenarios
  });
}

function renderQuestions() {
  $("#questions").empty();
  const triviaRes = apiResponse;
  const trivia = triviaRes[triviaQuestionIndex];
  let questionnaireCards = $("#questions");
  let triviaQuestionsRes = $("<p>").addClass("card-text").html(trivia.question);
  let correctAnswerRes = trivia.correct_answer;
  let incorrectAnswersRes = trivia.incorrect_answers;
  incorrectAnswersRes.push(correctAnswerRes);
  let totalAnswers = incorrectAnswersRes;
  // set up p tags for questions

  let displayedQuestions = $("<p>").html(triviaQuestionsRes);

  for (let j = 0; j < totalAnswers.length; j++) {
    // set up buttons for choices
    let buttonEl = $("<button>");
    buttonEl
      .addClass("button small large-only-expanded answer-button")
      .html(incorrectAnswersRes[j]);
    buttonEl.val(incorrectAnswersRes[j]);
    // append one question and its choice within the same box
    let questionnaireCardBody = $("<div>").addClass("card-section");
    questionnaireCardBody.append(displayedQuestions[j]);
    questionnaireCardBody.append(buttonEl);
    let questionnaireCard = $("<div>").addClass("card");
    questionnaireCard.append(questionnaireCardBody);
    questionnaireCards.append(questionnaireCard);
  }
}

$(document).on("click", ".answer-button", function () {
  const correct = $(this).val();
  if (correct === apiResponse[triviaQuestionIndex].correct_answer) {
    score++;
    console.log(score);
  }
  triviaQuestionIndex++;
  if (triviaQuestionIndex <= 9) {
    renderQuestions();
  } else if ((triviaQuestionIndex) => 0) {
    endQuiz();
  }

  // empty the question div
  //display score
  //display our movieInput and SearchBtn style to block
  // }
});

function endQuiz() {
  $(".card-section").empty();

  let scoreCard = $("<div>").addClass("card score").text(score);

  $("#scores").append(scoreCard);
  scoreQuiz();
}

function scoreQuiz() {
  // const totalScore =
  // (correct_answer / triviaQuestionIndex);

  if (score >= 9) {
    $("#scores").append(
      "Well Done! Keep up the good work and go watch some more movies."
    );
  } else if (score >= 7) {
    $("#scores").append(
      "Your Score wasn't horrible. Improve your chances next time by checking out more movies."
    );
  } else if (score >= 5) {
    $("#scores").append(
      "Well... might I suggest incorporating some more movie nights?"
    );
  } else if (score >= 2) {
    $("#scores").append(
      "Who's keeping score anyway? Here go check out some movies."
    );
  } else {
    $("#scores").append(
      "Your feelings matter. You should treat yourself to more movies."
    );
  }
}

// Movie Search (AJAX CALL)
var movies = [];
var movieDisplay = $("movie-display");
$("#movieSearchBtn").on("click", function (event) {
  event.preventDefault();
  var movieTitle = $("#movieInput").val();

  $.ajax({
    url: `https://www.omdbapi.com/?t=${movieTitle}&apikey=trilogy`,
    method: "GET",
  }).then(function (response) {
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
  });
});
