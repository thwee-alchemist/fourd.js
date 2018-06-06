# fourd.js
[http://thwee-alchemist.github.io/fourd.js/lib/](http://thwee-alchemist.github.io/fourd.js/lib/)

## A dynamic 3d graph visualization library
### What do these words mean?
A **Graph** is a collection of vertices and edges. Think of a train network or phone or power lines. In the train network, the train stations are the vertices (singular: vertex, also called nodes), while the tracks the train travels on are the edges. The phone and power lines are the edges, the poles and buildings are vertices.
**Dynamic** in this context means the vertices and edges don't have to be known upfront. You can add or remove them on the go. 

### What can I do with it?

This is a software library, it can be used to visualize graphs. With a little tweaking, you could use it for a collection of mathematical shapes. I intend to make data visualizations of society. You know how social media gives us contact lists? Why can't we have nice things?

## Compatibility

Intended to run in the browser, it has been tested in Chrome, Firefox, and Internet Explorer 11. Rumor has it that by switching to the CanvasRenderer, the library even works on a Raspberry PI. This is, of course, complete and utter nonsense, and when I catch those responsible ...

## API
This library has been tested with r66 of three.js. The library is pure javascript. As time goes on, I might involve a build system, i.e. grunt. 

```
var fourd = new FourD(); // instantiation
fourd.init('#selector', {width: 600, height: 350}); // initialization


var vertex_options = {
  cube: {
    width: 5, // pixels
    height: 5,
    depth: 5,
    color: 0x000000 // hex color
  },
  label: {
    text: "some short string"
  }
};

// or:

var vertex_options = {
  cube: {
    size: 10,
    texture: "path/to.png"
  },
  label: {
    text: "short string"
  }
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
// but if anything else, clear should take care of that as well. 
``` 

## Announcement
A more class friendly, less compositiony and more inheritancy way is under development. Take a look at [https://github.com/thwee-alchemist/FourD.git]. 
Another quick project, FourDSocketProxy is available via npm. 