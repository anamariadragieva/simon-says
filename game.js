var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


// Start
$(document).on("keydown", function() {
    if (gameStarted === false) {

        console.log("Game started now!");

        nextSequence();
        gameStarted = !gameStarted;

    } else {
        console.log("Game has already started!");
    }
});

// Start for small screen
$(".start").click(function() {
    if (gameStarted === false) {

        $(".start").hide();

        console.log("Game started now!");

        nextSequence();
        gameStarted = !gameStarted;

    } else {
        console.log("Game has already started!");
    }
});


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
    $("#" + randomChosenColor).fadeOut(150).fadeIn(150);
    playSound(randomChosenColor);
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
        }, 800);
        
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
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
    var audio = new Audio('/sounds/' + name + '.mp3');
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}




