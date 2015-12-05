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

var board = d3.select(".scoreboard").append("svg")
    .attr("width", width)
    .attr("height", height);


var Enemies = function(cx, cy, r){
  this.r = r || 10
  this.cx = Math.floor(Math.random() * (width - this.r))
  this.cy = Math.floor(Math.random() * (height - this.r))

  this.enemy = board.append("circle")
    .attr("cx", this.cx||30)
    .attr("cy", this.cy||30)
    .attr("r", this.r)
    .attr("fill", "purple")

}

var makeEnemies = function(){
  for(var i = 0; i < 50; i++) {
    new Enemies();
  };
}

var move = function(){
  var newMoves = [];
  for (var i = 0; i < 50; i++) {
    var newWidth = Math.floor(Math.random() * (width - r))
    var newHeight = Math.floor(Math.random() * (height - r))
    newMoves.push([newWidth, newHeight]); 
  };

  d3.selectAll("circle").data(newMoves)
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

makeEnemies();
move();

  
// d3.select(".scoreboard").selectAll("div")
//   .data(["black","blue"])
//   .transition().duration(1000)
//   .style("background-color",function(d){
//     return d;
//   })
//   .exit().remove();
//   // .transition.duration(1000)
//   // .style("background-color","green")
