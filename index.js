// index.js
// Joshua M. Moore
// April 24th, 2015
// April 4th, 2018

(function($){
  
  fourd = new FourD();
  fourd.init('#display', {
    width: window.innerWidth, 
    height: window.innerHeight, 
    background: 0xeeccff
  });
  fourd.clear();
  
  var remove_first = function(visualizations){
    fourd.graph.remove_vertex(visualizations[0]);
    visualizations.splice(0);
  }
  
  start = function(){
  
  var millisecondsseconds_time = new Date();
  var seconds_time = new Date();
  var minutes_time = new Date();
  var milliseconds = [];
  var seconds = [];
  var minutes = [];
  fourd.render_loop.push(function(){
    var now = new Date();
    if((now - seconds_time) >= 1){
      var milli_second_ish = fourd.graph.add_vertex({cube: {size: 10, color: 0x000000}});
      milliseconds.push(milli_second_ish);
        
      milliseconds_time = now;
        
      if((now - seconds_time) >= 1000){
        console.log('Second');
        for(var i=0; i<milliseconds.length; i++){
          fourd.graph.remove_vertex(milliseconds[i]);
        }
        
        var second = fourd.graph.add_vertex({cube: {size: 20, color: 0xff00000}});
        seconds.push(second);
        seconds_time = now;
      }
      
      if((now - minutes_time >= 60*1000)){
        console.log('Minute');
        for(var i=0; i<seconds.length; i++){
          fourd.graph.remove_vertex(seconds[i]);
         }
        
        var minute = fourd.graph.add_vertex({cube: {size: 30, color: 0x00ffff}});
        minutes.push(minute);
        minutes_time = now;
      }
    }
    
  });
  };
    
  start();
  // $('#clear').click(fourd.clear);
})(jQuery);
