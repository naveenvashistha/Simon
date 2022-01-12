var buttonColors = ['red','blue','green','yellow'];
var count = 0;
var game_comp = [];
var game_us = [];

function nextSequence(buttonColors){
  var randomNumber = Math.floor(Math.random()*4);
  return buttonColors[randomNumber];
}

$(document).keydown(function(){
  if (count === 0){
  var color = randomColor();
  game_comp.push(color);
  count++;
  $("h1").text("Level "+count);
}
});

$(".btn").click(function(){
  var element = this;
  if (count != 0){
  clickColor(element);
  game_us.push($(element).attr("id"));
  check(game_us.length - 1);
}
else{
  clickColor(element);
  wrong();
}
});

function check(currentPoint){
  var check = 0;
    if (game_comp[currentPoint] === game_us[currentPoint]){
      if (game_comp.length === game_us.length){
      count++;
      auto_click();
    }
  }
  else{
    wrong();
  }
}


function auto_click(){
  setTimeout(function(){
    var color = randomColor();
    game_comp.push(color);
    game_us = [];
    $("h1").text("Level "+count);
  },500);

}

function wrong(){
  $("h1").text("Game Over. Refresh to play it again.");
  $("body").addClass("red");
  var audio1 = new Audio("sounds/wrong.mp3");
  audio1.play();
  setTimeout(function(){$("body").removeClass("red");},100);
}

function randomColor(){
  var color = nextSequence(buttonColors);
  var audio = new Audio("sounds/"+color+".mp3");
  $("."+color).addClass("pressed");
  setTimeout(function(){
    $("."+color).removeClass("pressed");
  },100);
  audio.play();
  return color;
}

function clickColor(element){
  var audio = new Audio("sounds/"+$(element).attr("id")+".mp3");
  $(element).addClass("pressed");
  setTimeout(function(){
    $(element).removeClass("pressed");
  },100);
  audio.play();
}
