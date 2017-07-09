// index.js
// Joshua M. Moore
// April 24th, 2015

(function($){
  
  fourd = new FourD();
  fourd.init('#display', {width: 600, height: 350});
  var graph = fourd.graph;
  fourd.clear();
  
  
  function ui_random_graph(){
    var n = parseInt(prompt('number of vertices, e.g. 250:'));
    var sane = 250;
    var continue_anyway = true;
    if(n > sane){
      continue_anyway = confirm("This number is considered a little high for most cases, and might eat up your resources, continue anyway? (otherwise we'll stick with " + sane + ".)");
    }
    
    n = continue_anyway ? n : sane;
    n > 0 ? random(fourd, n) : undefined;
  }
  
  
  var build_graph;
  var vertices = [];
  
  
  function pause(){
    clearInterval(build_graph);
  }
  
  
  function random(fourd, n){
    if(!n){
      n = 0;
      return;
    }
    
    fourd.clear();
    
    var count = 0;
    build_graph = setInterval(function(){
      vertices.push(fourd.graph.add_vertex({
        cube: {
          width: 5,
          height: 5,
          depth: 5,
          texture: Math.random() >= 0.5 ? 'img/bob.png' : 'img/alice.png'
        }
        /*,
        label: {
          text: count.toString(),
        }
        */
      }));
      
      var source = fourd.graph.V[Math.floor(Math.random() * Object.keys(fourd.graph.V).length)];
      var target = fourd.graph.V[Math.floor(Math.random() * Object.keys(fourd.graph.V).length)];
      
      if(count > 2){
        fourd.graph.add_edge(source, target);
      }
      
      if(count++ >= n){
        pause();
      }
    }, 25);
  }
  
  
  // fourd.graph.add_vertex({text: "Hello, Worlds!"});
  
  
  random(fourd, 25);
  $('#random-graph').click(ui_random_graph);
  $('#pause').click(pause);
  $('#clear').click(clear);
  
  
  var last_bob;
  function bob_and_alice(fourd){
    var name = Math.random() > 0.5 ? 'Bob' : 'Alice';
    var texture = Math.random() > 0.5 ? 'img/bob.png' : 'img/alice.png';
    var bob = fourd.graph.add_vertex({
      cube: {
        width: 5,
        height: 5,
        depth: 5,
        texture: texture
      },
      label: {
        text: name,
        offset: {
          size: 5,
          dimension: x,
          amount: 2,
          text: name
        }
      }
    });

    if(Math.random() > .5 && last_bob){
      fourd.graph.add_edge(
        last_bob,
        bob
      );
    }

    last_bob = bob;
  }


  function collect_random(n){
    var i = 0;
    var collect_graph = setInterval(function(){
      var v = fourd.graph.V[Math.floor(Math.random() * Object.keys(fourd.graph.V).length)];
      fourd.graph.remove_vertex(vertices[i]);
      i += 1;
      if(i < n || i < vertices.length){
        clearInterval(collect_graph);
      }
    }, 25);
  }
  
})(jQuery);





