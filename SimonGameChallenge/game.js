
let userClickedPattern = [];

let gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let StartedTheGame = false;       

let level = 0;

$(".btn").click(function(){

	let userChosenColour = $(this).attr("id");

	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);

	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length - 1);


});

$(document).keypress(function(evt){

	if (!StartedTheGame){  			 

		nextSequence();

		StartedTheGame = true;

	}

});


function nextSequence(){

	userClickedPattern = [];

	level++;

	$("#level-title").text("LEVEL  " + level);

	console.log(level);

	let n = Math.random() * 4;

	let randomChosenColour = Math.floor(n);

	let nextColorInPattern = buttonColours[randomChosenColour];

	gamePattern.push(nextColorInPattern);

	$("#" + nextColorInPattern).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(nextColorInPattern);

}


function playSound(name){

	var blockSound = new Audio("sounds/"  + name + ".mp3");

	blockSound.play();
}

function animatePress(currentColour){

	$("#" + currentColour ).addClass("pressed");

	setTimeout( function(){
		$(".btn").removeClass("pressed")
	}, 100);

}

function checkAnswer(currentLevel){
	if( userClickedPattern[currentLevel] === gamePattern[currentLevel]){

		if (userClickedPattern.length === gamePattern.length){
			
		setTimeout( function(){
			nextSequence();
		} ,1000);
	}
}
	
	else{
		playSound("wrong");
		$("body").addClass("game-over");
		$("h1").text("Game Over, Press A Key to Restart");     			// <-
		setTimeout( function(){
			$("body").removeClass("game-over");
		}, 200);
		startOver();
	}
	
}

function startOver(){

	gamePattern = [];
	level = 0;
	StartedTheGame = false;

}