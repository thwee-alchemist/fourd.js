/*
  defineProperty Test
  
  The goal is to couple one object's property with another's.
*/

function Vector(x, y z){
  this.x = x;
  this.y = y;
  this.z = z;
}

function Label(text, position){
  this.text = text;
  this.position = position;
}

function Mesh(position, Label){
  this.position = position;
  this.label = label;
}

function