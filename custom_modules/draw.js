var path;

window.efficient=false;

var receivedPath=new Path();
receivedPath.strokeWidth=1;
receivedPath.strokeColor="#ff0000";

// var textItem = new PointText(new Point(10, 20));
// textItem.fillColor = 'black';
//
// textItem.content = 'Click and drag to draw a line.';

function onMouseDown(event) {
	// If we produced a path before, deselect it:
	if (path) {
		path.selected = false;
	}

	path = new Path();
	path.strokeColor = 'black';
  path.strokeWidth=1;

}

function onMouseDrag(event) {
	// Every drag event, add a point to the path at the current
	// position of the mouse:
	path.add(event.point);

  if(efficient==false){send(JSON.stringify(event.point));
  }
  console.log(JSON.stringify(event.point));

}

function onMouseUp(event) {
	var segmentCount = path.segments.length;

	// When the mouse is released, simplify it:
	path.simplify();
  console.log(path.exportJSON());
  if(efficient==false) {send('{"new_line":"true"}');}
  else{send(path.exportJSON());}
}




window.new_point = function(new_point){
        	receivedPath.add(new_point);
        	paper.view.update();
        }
window.new_line = function(){

	console.log("New line added");
  receivedPath = new Path({

      strokeColor: 'red'

  });
}
window.my_draw = function(to_draw){

console.log(to_draw);

receivedPath = new Path();

receivedPath.importJSON(to_draw);
receivedPath.strokeColor='red';
paper.view.update();
}
window.my_clear = function(){
paper.project.clear();
paper.view.update();
path = new Path({

      strokeColor: 'black'

  });
  receivedPath = new Path({

      strokeColor: 'red'

  });

  var textItem = new PointText(new Point(10, 20));
  textItem.fillColor = 'black';

  textItem.content = 'Click and drag to draw a line.';
  send('{"clear":"true"}');
}

window.clearIt=function(){
  paper.project.clear();
  paper.view.update();
  path = new Path({

        strokeColor: 'black'

    });
    receivedPath = new Path({

        strokeColor: 'red'


    });

    // var textItem = new PointText(new Point(10, 20));
    // textItem.fillColor = 'black';
    //
    // textItem.content = 'Click and drag to draw a line.';
}

window.toggleMode=function(){


  efficient=!efficient;
  if(efficient){
  $("#drawMode").html("Path mode");
}
else{
  $("#drawMode").html("Point mode");

}
  console.log(efficient);
}
