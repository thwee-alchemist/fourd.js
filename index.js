// index.js
// Joshua M. Moore
// April 24th, 2015

fourd = new FourD();
fourd.init('#display', {width: 600, height: 350});
var graph = fourd.graph;
fourd.clear();

var last_bob;
function bob_malkovich(fourd){
  var bob = fourd.graph.add_vertex({
    width: 5,
    height: 5,
    depth: 5,
    texture: Math.random() > 0.5 ? 'img/bob.png' : 'img/alice.png'
  });

  if(Math.random() > .5 && last_bob){
    fourd.graph.add_edge(
      last_bob,
      bob
    );
  }

  last_bob = bob;
}

var interval;

function random(fourd, n){
  if(!n){
    n = 0;
  }
  
  fourd.clear();
  
  var count = 0;
  interval = setInterval(function(){
    fourd.graph.add_vertex();
    
    if(count++ >= n){
      clearInterval(interval);
    }
    
    var source = fourd.graph.V[Math.floor(Math.random() * Object.keys(fourd.graph.V).length)];
    var target = fourd.graph.V[Math.floor(Math.random() * Object.keys(fourd.graph.V).length)];
    
    if(count > 2){
      fourd.graph.add_edge(source, target);
    }
  }, 25);
}

function shape(fourd, string){
  // get vertices and edges out of string
  var edge_strings = string.split(/\,/);
  var edge_sep = /\,/;
  var edge_re = /\>/;
  var edge_string_to_vertex_strings = function(edge_string){
    // edge_string: "1>2"
    return edge_string.split(edge_re);
  }
  var vertex_strings = edge_strings.map(edge_string_to_vertex_strings);
  var vertex_numbers = [];
  var extract_vertex = function(vertex_string){
    var vertex = parseInt(vertex_string);
    if(vertex_numbers.indexOf(vertex) === -1){
      vertex_numbers.push(vertex);
    }
    return vertex;
  }
  var edge_representations = vertex_strings.map(extract_vertex);
  
  
  
  console.log(edge_representations);
  
  // draw vertices and edges
  var index = 0;
  var vertices = [];
  var i = setInterval(function(){
    vertices.push(fourd.graph.add_vertex());
    
    if(index++ >= vertices.length){
      clearInterval(i);
    }
  }, 25); // looks smoother
  
  index = 0;
  var edges = [];
  interval = setInterval(function(){
    edges.push(fourd.graph.add_edge(
      edge_representations[index][0],
      edge_representations[index][1]
    ));
    
    if(index++ >= edges.length){
      clearInterval(interval);
    }
  }, 25);
}

random(fourd, 25);