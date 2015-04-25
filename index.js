// index.js
// Joshua M. Moore
// April 24th, 2015

var fourd = new FourD();
fourd.init('#demo', {width: 300, height: 300});
var graph = fourd.graph;
// fourd.render();
polyiamond(fourd, 10);
console.log('graph:', graph);

function polyiamond(fourd, n){
  fourd.clear();

  var top = fourd.graph.add_vertex();
  var bottom = fourd.graph.add_vertex();

  var corners = [];
  var last;
  for(var i=0; i<n; i++){
    corners.push(fourd.graph.add_vertex());
    last = i;
  }
  corners.map(function(corner, j){
    fourd.graph.add_edge(top, corner);
    fourd.graph.add_edge(bottom, corner);
    fourd.graph.add_edge(corners[j == 0 ? last : j - 1], corner);
  });

  return 1;
}

