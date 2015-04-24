# FourD.js
## A dynamic 3d graph visualization library
With the help of this library, you can implement 3d graph visualizations. It might take
some fiddling at this point, I'm not quite happy with the API.

But here's what we have so far:

```
<div id="graph"></div>

var fourd = FourD('#graph');
fourd.render();

var graph = fourd.api.graph;
var v1 = graph.add_vertex();
var v2 = graph.add_vertex();
var e = graph.add_edge(v1, v2);
```

Some other commands are:

```
graph.remove_edge(e);
graph.remove_vertex(v1);
graph.remove_vertex(v2);
```
