/*
  debug.js
  Joshua M. Moore
  April 28, 2015
  
  lowrekey@gmail.com
  
  This library faciliates gathering data for testing and analysis
  purposes.
*/

var Debug = function(subject){
  this.subject = subject;
  
  var data = {
    date = new Date();
    
  }
};

/*
  Runs fn n times and returns 
  * first_start, first_end, first_numeric_difference,
  * bulk_start, bulk_end, bulk_numeric_difference,
  * last_start, last_end, last_numeric_difference
    
  Return values named ending in _start and _end are of type Date.
  Return values named ending in _numeric_difference are of type 
  Number and are obtained using _end.getTime() - _start.getTime(). 
  They are not named _span to warn you to watch out for leap 
  seconds. 
    
  The caller of Debug.prototype.timer is responsible for considering
  side effects in a parameter passed to the fn argument. 
  
  Iff the type of fn is determined to be a string, eval is used.
  Otherwise fn is considered a function and is called using the
  application operator. 
  
  The first and last time 
*/
Debug.prototype.timer = function(fn, n){
  
  var use_eval = typeof fn === 'string' ? true : false;
  
  var start, end, value, i;
  switch(use_eval){
    start = new Date();
    for(i=0; i<n; i++){
      value = 
    }
    end = new Date();
  }
  
  var start = new Date();
  for(var i=0; i<n; i++){
    
  }  
  var end = new Date();
  
  return {
    start: start,
    fn: fn,
    value: value,
    end: end,
    span: end.getTime() - start.getTime()
  };
};