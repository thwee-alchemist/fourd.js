'use strict';
/*
 four-d.js
 Joshua M. Moore
 April 23, 2015

 depends on: mrdoob's three.js, rev66
 https://github.com/mrdoob/three.js/tree/r66
 tested with r66
 
 This is semantic version v0.1.0.
 See http://semver.org/
 
 The API works as follows:
 Every function or code block marked api is part of the API.
 
 Here's how it works:
 
 var fourd = new FourD(); // instantiation
 fourd.init('#selector', {width: 600, height: 350}); // initialization
 
 
 var vertex_options = {
   width: 5, // pixels
   height: 5,
   depth: 5,
   color: 0x000000 // hex color
 };
 
 // or:
 
 var vertex_options = {
   width: 5,
   height: 5,
   depth: 5,
   texture: 'path_to,png'
 }
 
 // or:
 
 // leave out vertex options altogether.
 // default values will be used.
 
 
 var vertex1 = fourd.graph.add_vertex(vertex_options); // add a vertex
 var vertex2 = fourd.graph.add_vertex(vertex_options); // add another vertex
 
 var edge_options = {}; // currently not defined, but this is how you would pass them.
 
 var edge = fourd.graph.add_edge(vertex1, vertex2, edge_options);
 
 fourd.graph.remove_edge(edge); // this is why you keep those variables
 fourd.graph.remove_vertex(vertex1);
 fourd.graph.remove_vertex(vertex2);
 
*/

var FourD = function(){

  var that = this;
  var CONSTANTS = {
    width: 1000,
    attraction: 0.025,
    far: 1000,
    optimal_distance: 1.0,
    minimum_velocity: 0.001,
    friction: 0.60,
    zoom: -50,

    gravity: 0.070,

    rangeMiIn: -1.0,
    rangeMaxIn: 1.0,
    rangeMinOut: -10,
    rangeMaxOut: 10,

    BHN3: {
      inner_distance: 0.036,
      repulsion: 100.0,
      epsilon: 0.1
    }
  };
  
  var is_vertex = function(potential){
    return potential.hasOwnProperty('id') && 
      potential.hasOwnProperty('edge_count') && 
      potential.hasOwnProperty('edges');
  };

  // Vertex
  var Vertex = function(id, options){
    this.options = options;
    this.id = id;
    
    this.position = new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(0, 0, 0);
    
    this.toString = function(){
      return this.id.toString();
    };

    this.edge_count = 0;
    this.edges = {};
    this.neighbors = [];
  };

  Vertex.prototype.paint = function(scene){
    this.object = cube(scene, this.options);
  };

  // Edge
  var Edge = function(id, source, target, options){
    this.options = options === undefined ? {strength: 1.0} : options;
    
    if(arguments.length < 3){
      throw new Error('Edge without sufficent arguments');
    }

    if(!is_vertex(source)){
      var source_type = typeof source;
      var source_error_msg = 'Source should be a Vertex instead of a ' + src_type + '.';
      throw new Error(src_error_msg);
    }

    if(!is_vertex(target)){
      var target_type = typeof target;
      var target_error_msg = 'Target should be a Vertex instead of a ' + tgt_type + '.';
      throw new Error(tgt_error_msg);
    }

    this.id = id;
    if(this.options.hasOwnProperty('directed')){
      this.gravity = true;
    }

    this.source = source;
    this.target = target;

    this.source.edge_count += 1;
    this.target.edge_count += 1;

    this.source.edges[this.id] = this;
    this.target.edges[this.id] = this;

    this.order = Math.random();
  };

  Edge.prototype.paint = function(scene){
    this.object = line(scene, this.source, this.target, this.options);
  };

  Edge.prototype.toString = function(){
    return this.source.toString() + '-->' + this.target.toString(); 
  };

  Edge.prototype.destroy = function(scene){
    delete this.source.edges[this.id];
    delete this.target.edges[this.id];

    CONSTANTS.scene.remove(this.object);
    delete this.object;
    
    this.source.edge_count--;
    this.target.edge_count--;
  };

  // Graph
  var Graph = function(scene){
    this.scene = scene;
    this.type = 'Graph';
    this.vertex_id_spawn = 0;
    this.V = {};

    this.edge_id_spawn = 0;
    this.E = {};

    this.edge_counts = {};
  };

  // api
  Graph.prototype.clear = function(){

    for(var e in this.E){
      this.E[e].destroy(that.scene);
    }

    for(var v in this.V){
      // this.scene.remove...
      scene.remove(this.V[v].object);
      // this.V[v].destroy();
    }
    
    this.V = {};
    this.E = {};
    this.edge_counts = {};
    this.edge_id_spawn = 0;
    this.vertex_id_spawn = 0;
  };

  Graph.prototype._make_key = function(source, target){
    return '_' + source.toString() + '_' + target.toString();
  };

  // api
  Graph.prototype.add_vertex = function(options){
    var v = new Vertex(this.vertex_id_spawn++, options);
    v.paint(this.scene);
    this.V[v.id] = v;

    return v;
  };

  // api
  Graph.prototype.add_edge = function(source, target, options){
    var key = '_' + source.id + '_' + target.id;
    var edge;
    
    if(!this.edge_counts.hasOwnProperty(key)){
      edge = new Edge(this.edge_id_spawn++, source, target, options);
      this.E[edge.id] = edge;
      this.edge_counts[key] = 1;
    }else{
      this.edge_counts[key]++;
      for(var e in target.edges){
        for(var r in source.edges){
          if(e === r){
            return source.edges[r];
          }
        }
      }
    }
    
    edge.paint(this.scene);
    return edge;
  };

  // api
  Graph.prototype.remove_edge = function(edge){
    var key = this._make_key(edge.source, edge.target);
    if(--this.edge_counts[key] === 0){
      edge.destroy();
      delete this.E[edge.id];
    }
  };

  Graph.prototype.toString = function(){
    var edges = Object.keys(this.E).length;
    var nodes = Object.keys(this.V).length;

    return '|V|: ' + nodes.toString() + ',  |E|: ' + edges.toString();
  };

  // api
  Graph.prototype.remove_vertex = function(vertex){
    for(var e in vertex.edges){
      vertex.edges[e].destroy(this.scene);  
      delete this.E[e];
    }
    
    this.scene.remove(vertex.object);
    delete this.V[vertex.id];
  };

  var is_graph = function(potential){
    return potential.type === 'Graph';
  };

  // apiish
  var cube = function(scene, options){

    if(options === undefined){
      options = {};
    }
    
    if(options.width === undefined){
      options.width = 3;
    }
    if(options.height === undefined){
      options.height = 3;
    }
    if(options.depth === undefined){
      options.depth = 3;
    }
    if(options.color === undefined){
      options.color = 0x00ccaa;
    }
    
    var geometry, material, material_args;
    geometry = new THREE.BoxGeometry(
      options.width,
      options.height,
      options.depth
    );
    geometry.dynamic = true;
    
    if(options.texture !== undefined){

      material_args = { map: THREE.ImageUtils.loadTexture( options.texture ) }; 
      
    }else{
      material_args = { color: options.color };
    }

    material = new THREE.MeshBasicMaterial( material_args );
    
    var cube = new THREE.Mesh( geometry, material );
    var scale = 2;
    cube.position = new THREE.Vector3(
      Math.random() * scale, Math.random() * scale,
      Math.random() * scale
    );
    cube.matrixAutoUpdate = true;
    
    scene.add(cube);
    return cube;
  };

  // apiish this will change
  // todo: make line options like cube options
  var line = function(scene, source, target){
    var geometry = new THREE.Geometry();
    geometry.dynamic = true;
    geometry.vertices.push(source.object.position);
    geometry.vertices.push(target.object.position);
    geometry.verticesNeedUpdate = true;
    
    var material = new THREE.LineBasicMaterial({ color: 0x000000 });
    
    var line = new THREE.Line( geometry, material );
      
    scene.add(line);
    return line;
  };

  var BHN3 = function(){
    this.inners = [];
    this.outers = {};
    this.center_sum = new THREE.Vector3(0, 0, 0);
    this.center_count = 0;
  };

  BHN3.prototype.constants = CONSTANTS.BHN3;

  BHN3.prototype.center = function(){
    return this.center_sum.clone().divideScalar(this.center_count);
  };

  BHN3.prototype.place_inner = function(vertex){
    this.inners.push(vertex);
    this.center_sum.add(vertex.object.position);
    this.center_count += 1;
  };

  BHN3.prototype.get_octant = function(position){
    var center = this.center();
    var x = center.x < position.x ? 'l' : 'r';
    var y = center.y < position.y ? 'u' : 'd';
    var z = center.z < position.z ? 'i' : 'o';
    return x + y + z;
  };

  BHN3.prototype.place_outer = function(vertex){
    var octant = this.get_octant(vertex.object.position);
    this.outers[octant] = this.outers[octant] || new BHN3();
    this.outers[octant].insert(vertex);
  };

  BHN3.prototype.insert = function(vertex){
    if(this.inners.length === 0){
      this.place_inner(vertex);
    }else{
      if(this.center().distanceTo(vertex.object.position) <=
	 this.constants.inner_distance){
        this.place_inner(vertex);
      }else{
        this.place_outer(vertex);
      }
    }
  };

  BHN3.prototype.estimate = function(vertex, force, force_fn){
    if(this.inners.indexOf(vertex) > -1){
      for(var i=0; i<this.inners.length; i++){
        if(vertex !== this.inners[i]){
          var individual_force = force_fn(
	    vertex.object.position.clone(),
	    this.inners[i].object.position.clone()
	  );
	  
          force.add(individual_force);
        }
      }
    }else{
      var sumstimate = force_fn(vertex.object.position, this.center());
      sumstimate.multiplyScalar(this.center_count);
      force.add(sumstimate);
    }
    
    for(var octant in this.outers){
      this.outers[octant].estimate(vertex, force, force_fn);
    }
  };

  BHN3.prototype.pairwise_repulsion = function( x1, x2 ){ 

    var enumerator1, denominator1, 
      enumerator2, denominator2, 
      repulsion_constant, 
      difference, absolute_difference, 
      epsilon, product, 
      term1, term2,
      square, sum, result; 
    
    // first term
    enumerator1 = repulsion_constant = CONSTANTS.BHN3.repulsion;
    
    difference = x1.clone().sub(x2.clone());
    absolute_difference = difference.length();
    
    epsilon = CONSTANTS.BHN3.epsilon;
    sum = epsilon + absolute_difference;
    denominator1 = square = sum*sum;
    
    term1 = enumerator1 / denominator1;
    
    // second term
    enumerator2 = difference;
    denominator2 = absolute_difference;
    
    term2 = enumerator2.divideScalar(denominator2);
    
    // result
    result = term2.multiplyScalar(term1);  
    
    return result;
  };
  
  var edges = false;
  Graph.prototype.layout = function(){

    // calculate repulsions
    var tree = new BHN3();
    var vertex, edge, v, e;
    
    for(v in this.V){
      vertex = this.V[v];
      vertex.acceleration = new THREE.Vector3(0.0, 0.0, 0.0);
      vertex.repulsion_forces = new THREE.Vector3(0.0, 0.0, 0.0);
      vertex.attraction_forces = new THREE.Vector3(0.0, 0.0, 0.0);

      tree.insert(vertex);
    }
    
    for(v in this.V){
      vertex = this.V[v];
      vertex.repulsion_forces = vertex.repulsion_forces || new THREE.Vector3();
      vertex.repulsion_forces.set(0.0, 0.0, 0.0);
      tree.estimate(
	vertex, vertex.repulsion_forces,
	BHN3.prototype.pairwise_repulsion
      );
    }
    
    // calculate attractions
    
    for(e in this.E){
      edge = this.E[e];
      
      var attraction = edge.source.object.position.clone().sub(
	edge.target.object.position
      );
      attraction.multiplyScalar(-1 * CONSTANTS.attraction);

      // attraction.multiplyScalar(edge.options.strength);

      edge.source.attraction_forces.sub(attraction);
      edge.target.attraction_forces.add(attraction);

      if(edge.gravity){
        var gravity = new THREE.Vector3(0.0, -1 * CONSTANTS.gravity, 0.0);
        edge.target.acceleration.add(gravity);
      }
    }
    
    for(v in this.V){
      // update velocity
      vertex = this.V[v];
      if(vertex){
        var friction = vertex.velocity.multiplyScalar(CONSTANTS.friction);

        vertex.acceleration.add(
	  vertex.repulsion_forces.clone().add(
	    vertex.attraction_forces.clone().negate()
	  )
	);
        vertex.acceleration.sub(friction);
        
        vertex.velocity.add(vertex.acceleration);
        vertex.object.position.add(vertex.velocity);
      }
    }
    
    for(e in this.E){
      edge = this.E[e];

      if(edge){  
        edge.object.geometry.dirty = true;
        edge.object.geometry.__dirty = true;
        edge.object.geometry.verticesNeedUpdate = true;
      }
    }

    this.center = tree.center();
  };
  
  this._internals = {};
  var scene,
      element,
      camera,
      light,
      renderer,
      graph;

  var render = function render(){
    requestAnimationFrame(render);
    graph.layout();
    renderer.render(scene, camera);
    camera.position.z = graph.center.z - CONSTANTS.zoom;
    camera.lookAt(graph.center);
  };

  var clear = function clear(){
    graph.clear();
  };
  
  // api
  this.init = function(selector, options){
    scene = new THREE.Scene();
    element = document.querySelector(selector);
    if(!element){
      throw "element " + selector + " wasn't found on the page.";
    }
    camera = new THREE.PerspectiveCamera(
      70,
      options.width / options.height,
      1,
      CONSTANTS.far
    );
    light = new THREE.PointLight( 0xeeeeee ); // soft white light
    
    CONSTANTS.scene = scene;
    scene.add( camera );
    scene.add( light );
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xefefef);
    renderer.setSize( options.width, options.height );
    
    document.querySelector(selector).appendChild( renderer.domElement );
    
    graph = new Graph(scene);
    
    camera.position.z = -250;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    that._internals = {
      scene: scene,
      element: element,
      camera: camera,
      light: light,
      renderer: renderer,
      graph: graph
    };

    // api
    this.version = "0.1.0";
    this.graph = graph;
    this.render = render;
    this.clear = clear;
    this.variables = CONSTANTS;

    render();
  };
  
  this._internals = {
    Vertex: Vertex,
    Edge: Edge,
    Graph: Graph,
    BHN3: BHN3,
  };

  // untested
  this.setCubeFn = function(fn){
    cube = fn;
  };

  this.setLineFn = function(fn){
    line = fn;
  };
  // end untested
  
  return this;
};
