var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

function playSound(name) {
    var music = new Audio('sounds/'+name+'.mp3');
    music.play();
}

function animatePress(currentColor) {
    $('.'+currentColor).addClass('pressed');
    setTimeout(function(){
        $('.'+currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(arrA, arrB) {
    for (var i=0; i<arrA.length; i++){
        if (arrA[i] !== arrB[i]){
            return false;
        }
    }
    return true;
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    level = 0;
}


function nextSequence() {
    // generate a rand num
    var randomNumber = Math.floor(Math.random()*4);
    // choose a color
    var randomChosenColour = buttonColors[randomNumber];
    
    // add to sequence
    gamePattern.push(randomChosenColour);
    
    // flash effect
    $('#'+gamePattern[level]).fadeOut(100).fadeIn(100); 
    // play sounds
    playSound(gamePattern[level]);
    
    // change h1 heading
    $('h1').text('Level '+level);
    level++;
    gameStarted = true;
}


// record buttons user clicked and produce sounds
$('.btn').on('click', function(){
    // handler function
    // use THIS to query clicked item
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // if user sucessfully repeats the pattern
    if (userClickedPattern.length === gamePattern.length && checkAnswer(userClickedPattern, gamePattern)) {
        // clean the user clicked pattern
        if (userClickedPattern.length === gamePattern.length){
            // clear to force user start entering pattern from first one
            userClickedPattern = [];
        }
        nextSequence();
    }  

    // if user fails
    else if (!checkAnswer(userClickedPattern, gamePattern)){
        $('body').addClass("game-over");
        playSound('wrong');
        setTimeout(function(){
            $('body').removeClass("game-over");       
        }, 200);
        $('h1').text('Game Over, Press Any Key to Restart'); 
        startOver();
    }

});




$(document).keypress(function(event){
    if (!gameStarted){
        nextSequence();
    }    
})










