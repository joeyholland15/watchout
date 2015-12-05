// start slingin' some d3 here.
d3.selectAll("div")
  .data([,"red","green","blue"])
  .style("background-color", function(d){
    return d
  })
  .style("height", 40);

var width = 800
var height =600
var r = 10

var board = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var Sprite = function(cx, cy, r){
  this.r = r || 10
  this.cx = cx || Math.floor(Math.random() * (width - this.r))
  this.cy = cy || Math.floor(Math.random() * (height - this.r))

}

var Enemies = function(cx, cy, r){
  // .gravity(0.05)
  Sprite.call(this)

  this.enemy = board.append("circle")
    .attr("class", "enemy")
    .attr("cx", this.cx)
    .attr("cy", this.cy)
    .attr("r", this.r)
    .attr("fill", "purple")

}

var Player = function(){
  Sprite.call(this, width/2, height/2, 10)

  this.player = board.append("circle")
    .attr("class", "player")
    .attr("cx", this.cx)
    .attr("cy", this.cy)
    .attr("r", this.r)
    .attr("fill", "red")
    .call(drag)
}

var makeEnemies = function(n){
  //d3.range(200)
  for(var i = 0; i < n; i++) {
    new Enemies();
  };
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
    .attr("cx", function(d){
      return d[0]
    })
    .attr("cy", function(d) {
      return d[1];
    })
  
  setTimeout(function(){
    move()
  },1000)
}

var collisionChecker = function() {
  var player = d3.select(".player");
  d3.selectAll(".enemy").data([])
    .exit().each( function(el) {

      //******
      var enemy = d3.select(this)
      //******
      //remove parseInt if this works
      var squarX = Math.pow(parseInt(player.attr('cx')) - parseInt(enemy.attr('cx')),2);
      var squarY = Math.pow(parseInt(player.attr('cy')) - parseInt(enemy.attr('cy')),2); 
      var totalR = 20;
      if(Math.sqrt(squarX + squarY) <= totalR) {
        triggerCollision(); 
      }
    })

  setTimeout(function() {
    collisionChecker();
  }, 10); 
}
//d3.select(".player").attr('cy')

var triggerCollision = function(){
  d3.select("svg").data([])
    .exit()
    .style("background-color", "red")
    .transition().duration(100)
    .style("background-color", "white")
}
var drag =  d3.behavior.drag()
              //.on("dragstart",function(){})
              .on("drag", function(){
                currentPlayer.attr("cx", d3.event.x)
                .attr("cy",d3.event.y)
              })
              //.on("dragend",function(){})


var enemies = 10
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
