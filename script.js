$(document).foundation();

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