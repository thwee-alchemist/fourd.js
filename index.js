// index.js
// Joshua M. Moore
// April 24th, 2015

fourd = new FourD();
fourd.init('#demo', {width: 600, height: 350});
var graph = fourd.graph;
fourd.clear();

// fourd.render();

function polyiamond(fourd, n){
  fourd.clear();
  
  var top_bottom_options = {
    width: 5,
    height: 5,
    depth: 5,
    texture: 'img/bob.png'
    // color: 0x00ccaa
  };
  
  var top    = fourd.graph.add_vertex(top_bottom_options);
  var bottom = fourd.graph.add_vertex(top_bottom_options);

  var vertex_options = {
    width: 5,
    height: 5,
    depth: 5,
    color: 0xff0000
  };
  
  var corners = [];
  for(var i=0; i<n; i++){
    corners.push(fourd.graph.add_vertex(vertex_options));
  }

  for(var j=0; j<n; j++){
    fourd.graph.add_edge(top,    corners[j], {strength: 0.7}); // what to pass on?
    fourd.graph.add_edge(bottom, corners[j], {strength: 0.7});
  }

  return 1;
}

var last_bob;
function bob_malkovich(fourd){
  var bob = fourd.graph.add_vertex({
    width: 256,
    height: 256,
    depth: 256,
    texture: 'lib/bob.png'
  });

  if(Math.random() > .5 && last_bob){
    fourd.graph.add_edge(
      last_bob,
      bob
    );
  }

  last_bob = bob;
}


polyiamond(fourd, 10);

function logarithmic_scale(minIn, maxIn, minOut, maxOut, value){
  var minIn = minIn || 1,
      maxIn = maxIn || 10,
      minOut = minOut || -10,
      maxOut = maxOut || 10;

  var scale = (maxOut - minOut) / (maxIn - minIn);
  return Math.exp(minOut + scale * (value - minIn));
}
