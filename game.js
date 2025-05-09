var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


$(document).ready(function () {
    // Set initial message and button visibility
    if (window.innerWidth < 726) {
        $("#level-title").text("Tap Start to Play");
        $(".start").show();
    } else {
        $("#level-title").text("Press Any Key to Start");
        $(".start").hide();
    }
});

// Desktop: Start on key press
$(document).on("keydown", function() {
    if (!gameStarted && window.innerWidth >= 726) {

        startGame();

    } else {
        console.log("Game has already started!");
    }
});


// Mobile: Start on button click
$(".start").on("click", function() {
    if (!gameStarted && window.innerWidth < 726) {

        $(".start").text("start").hide();
        startGame();
        
    } else {
        console.log("Game has already started!");
    }
});

// Start
function startGame() {
    console.log("Game started now!");
    gameStarted = true;
    nextSequence();
}

// find which button is clicked and add to sequence
$(".btn").on("click", function() {

    var userChosenColor = this.id;  // $(this).attr("id");
    console.log("user clicked: " + userChosenColor);

    userClickedPattern.push(userChosenColor);
    console.log("user clicked sequence: " + userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern.length - 1);
});


function nextSequence() {

    // Reset user sequence
    userClickedPattern = [];

    // Increase level
    level++;
    $("#level-title").text("Level " + level);

    // Generate next random number
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    console.log("match this color: " + randomChosenColor);

    gamePattern.push(randomChosenColor);
    console.log("generated sequence: ");
    console.log(gamePattern);

    // flash random button and play sound
    setTimeout(function () {
        $("#" + randomChosenColor).fadeOut(150).fadeIn(150);
        playSound(randomChosenColor);
    }, 100);

}


function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("Success!");

        if (userClickedPattern.length === gamePattern.length) {

            console.log("user clicked pattern: ");
            console.log(userClickedPattern);

            console.log("Sequence finished.");

            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong!");

        playSound("wrong");

        $("#level-title").text("Game Over!");
        setTimeout(function() {
            $("#level-title").text("Press Any Key to Restart");
            if (window.innerWidth < 726) {
                $("#level-title").text("Tap Restart");
                $(".start").text("restart").show();
            }
        }, 800);
        
        $("body").addClass("game-over");
        $("footer").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            $("footer").removeClass("game-over");
        }, 200);

        startOver();
        console.log("user clicked pattern: ");
        console.log(userClickedPattern);
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
    if (window.matchMedia("(max-width: 600px)").matches) {
        $(".start").show();
      }   
}


function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}





