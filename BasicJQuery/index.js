

// $("body").css("background-color", "blue");

$("h1").on("click", function(){
	$("h1").css("color","red");
});


$(document).keypress(function(e){
	$("h1").text(e.key);
});

 In Pure Js 
// document.addEventListener("keydown", function(e){
// 	var heading = document.querySelector("h1");
// 	heading.innerHTML = e.key;
// });