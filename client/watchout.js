// start slingin' some d3 here.





var Sprite = function(cx, cy, r){
  this.r = r || 10
  this.cx = cx || Math.floor(Math.random() * (width - this.r))
  this.cy = cy || Math.floor(Math.random() * (height - this.r))

}

var Enemies = function(cx, cy, r){
  // .gravity(0.05)
  Sprite.call(this)

    var enemy = board.append("svg:image")
    .style("padding", "5px")
    .style("border", "5px solid black")
        .attr("class", "enemy")
        .attr("xlink:href", "imgs/shuriken.png")
        .attr("height" , imageHeight)
        .attr("width" , imageWidth)
        .attr("x", this.cx)
        .attr("y", this.cy)

    // enemy.append("circle")
    // .attr("class", "enemy")
    // .attr("cx", this.cx)
    // .attr("cy", this.cy)
    // .attr("r", this.r)
    // .attr("fill", "green")
}

    

var makeEnemies = function(n){
  //d3.range(200)
  for(var i = 0; i < n; i++) {
    new Enemies();
  };
}

var Player = function(){
  Sprite.call(this, width/2, height/2, 10)

  this.player = board.append("svg:image")
    .attr("class", "player")
    .attr("xlink:href" , "imgs/ninja2.png")
    .attr("x", this.cx)
    .attr("y", this.cy)
    .attr("height", playerHeight)
    .attr("width", playerWidth)
    .call(drag)
}


var move = function(){
  var newMoves = [];
  for (var i = 0; i < enemies; i++) {
    var newWidth = Math.floor(Math.random() * (width - r))
    var newHeight = Math.floor(Math.random() * (height - r))
    newMoves.push([newWidth, newHeight]); 
  };

  d3.selectAll(".enemy").data(newMoves)
    .transition().duration(1000)
    .attr("x", function(d){
      return d[0]
    })
    .attr("y", function(d) {
      return d[1];
    })
  
  setTimeout(function(){
    move()
  },1000)
  if(wasCollision) {
    updateScore(false);
  } else {
    updateScore(true); 
  }
  wasCollision = false; 
}

var collisionChecker = function() {
  var player = d3.select(".player");
  d3.selectAll(".enemy").data([])
    .exit().each( function(el) {

      //******
      var enemy = d3.select(this)
      //******
      //remove parseInt if this works
      var squarX = Math.pow(parseInt(player.attr('x')) - parseInt(enemy.attr('x')),2);
      var squarY = Math.pow(parseInt(player.attr('y')) - parseInt(enemy.attr('y')),2); 
      var totalR = playerR + imageR;
      if(Math.sqrt(squarX + squarY) <= totalR) {
        triggerCollision(); 
        wasCollision = true; 
      }
    })

  setTimeout(function() {
    collisionChecker();
  }, .1); 
}

//d3.select(".player").attr('cy')

var triggerCollision = function(){
  d3.select("image").data([])
    .exit()
    .attr("xlink:href", "imgs/red.png")
    .attr("height", "100%")
    .attr("width", "100%")
    .transition().duration(100)
    .attr("xlink:href", "imgs/background.jpg")
}

var updateScore = function(bool){
  //if true increase by # enemy
  //if false reset score collision++

  //while loop to incriment score by 1 til at score
  if(bool){
    if(currentScore >= highScore) {
      highScore += enemies; 
      d3.select(".highscore span").text(highScore); 
    }; 
    currentScore += enemies; 
    d3.select(".current span").text(currentScore);
  }else{
    currentScore = 0;
    collisions ++; 
    d3.select(".current span").text(currentScore);
    d3.select(".collisions span").text(collisions);
  }

}

var drag =  d3.behavior.drag()
              //.on("dragstart",function(){})
              .on("drag", function(){
                currentPlayer.attr("x", d3.event.x)
                .attr("y",d3.event.y)
              })
              //.on("dragend",function(){})



var width = 1366
var height =768
var r = 10
var board = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid black")

d3.select("svg").append("image")
    .attr("xlink:href" , "imgs/background.jpg")
    .attr("height" , height)
    .attr("width" , width)



var highScore = 0;
var currentScore = 0;
var collisions = 0;
var enemies = 10
var wasCollision = false;
var imageHeight = 60;
var imageWidth = 60;
var imageR = 30

var playerHeight = 60;
var playerWidth = 60;
var playerR = 30;

makeEnemies(enemies);
var player = new Player();
var currentPlayer = d3.select(".player")
move();

collisionChecker();


  
// d3.select(".scoreboard").selectAll("div")
//   .data(["black","blue"])
//   .transition().duration(1000)
//   .style("background-color",function(d){
//     return d;
//   })
//   .exit().remove();
//   // .transition.duration(1000)
//   // .style("background-color","green")
