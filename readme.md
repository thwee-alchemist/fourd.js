# fourd.js
[http://lowrekey.github.io/fourd.js/](http://lowrekey.github.io/fourd.js)
## A dynamic 3d graph visualization library
### What do these words mean?
A **Graph** is a collection of vertices and edges. Think of a train network or phone and power lines. In the train network, the train stations are the vertices (singular: vertex, also called nodes), while the tracks the train travels on are the edges. The phone and power lines are the edges, the poles and buildings are vertices.
**Dynamic** in this context means the vertices and edges don't have to be known upfront. You can add or remove them on the go. 
**Visualization** means you can look at it. Please make an effort to use or plan for the use of standardized formats such as [www.data-vocabulary.org]. I can do better in this department myself.
3D or FourD. We agree to call a flat surface representing depth "3D" as long as its elements move. Add to that the dynamic property, and you get FourD.

### What can I do with it?

This is a library, it can be used to visualize graphs. With a little tweaking, you could use it for a collection of mathematical shapes. I intend to make data visualizations of society. You know how social media gives us contact lists? Why can't we have nice things?

### Compatibility

Intended to run in the browser, it has been tested in Chrome, Firefox, and Internet Explorer 11. Rumor has it that by switching to the CanvasRenderer, the library even works on a Raspberry PI. This is, of course, complete and utter nonsense, and when I catch those responsible ...

### API
This library has been tested with r66 of three.js. The library is pure javascript. As time goes on, I might involve a build system, i.e. grunt. 

```
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
  cube: { // optional
    width: 5,
    height: 5,
    depth: 5,
    texture: 'path_to,png'
  }, 
  label: { // optional, but you should pick one of the two. This one doesn't wowrk quite yet.  
    text: "some string" 
  }
}

// or: // not sure this works any more. 

// leave out vertex options altogether.
// default values will be used.


var vertex1 = fourd.graph.add_vertex(vertex_options); // add a vertex
var vertex2 = fourd.graph.add_vertex(vertex_options); // add another vertex

var edge_options = {}; // currently not defined, but this is how you would pass them.

var edge = fourd.graph.add_edge(vertex1, vertex2, edge_options);

fourd.graph.remove_edge(edge); // this is why you keep those variables
fourd.graph.remove_vertex(vertex1);
fourd.graph.remove_vertex(vertex2);
``` 
 
Changelog:
0.2.0: adds labels, changes vertex options data layout
0.1.0: add/remove x vertex/edge works
  vertex options work.
0.0.4: Added options to init function.
