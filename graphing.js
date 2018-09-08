$(document).ready(function() {
  init("body", 500, 500);
});




function graphingObjectClass(title, color, value) {
	this.title = title,
	this.color = color,
	this.value = value
};

function graphingClass(graphType, graphingObjects){
	this.graping = graphType,
	this.graphingObjects = graphingObjects;
};

graphingClass.prototype = {
	graphing: "",
	graphingObjects: ""
};

graphingObjectClass.prototype = {
	title: "",
	color: "",
	value: 0
};


init.prototype = {
	parentObject: "body",
	width: 500,
	height: 500,
	canvas: ""
};

function init(parentObject, width, height) {
		$(parentObject).append("<canvas id=\"gravity\" width=\""+width+"\" height=\""+height+"\"></canvas>");
		var canvas = document.getElementById("gravity");
		var context = canvas.getContext("2d");
		var graphObjects = new Array();
		var graph = new graphingClass("Bar", graphObjects);
		var objectOne = new graphingObjectClass("Test", "#FF0000", 30);
	  var objectTwo = new graphingObjectClass("Test2","#0000FF", 25);
		graphObjects.push(objectOne);
		graphObjects.push(objectTwo);
		drawGraph(canvas, context, graphObjects)
}

function drawGraph(canvas, context, graphObjects) {
	var maxValue = 0;
	for (var i = 0; i < graphObjects.length; i++) {
		if (graphObjects[i].value > maxValue) {
			maxValue = graphObjects[i].value;
		}
	}
	var scaling = maxValue;
	nextBar = 0;
	for (var i = 0; i < graphObjects.length; i++)
	{
		context.beginPath();
		context.fillStyle = graphObjects[i].color;
		//X: Starts at the point that the last ended plus a bit
		//Y: Starts at the percentage point of the canvas equal to how much
		//       The value is of the highest one. For example, if max is 30, then
		//       the value 15 starts half way up the canvas.
		//Width: Set value of 100 for now
		//Height: To the bottom of the Canvas
	  context.fillRect(nextBar, canvas.height - canvas.height*(graphObjects[i].value/scaling),100,canvas.height);
		context.stroke();
		//Distance between bars is defined as 100 (Bar width), times i+1 (Number of 100s to move over by), plus a bit of a gap
		nextBar += (100*(i+1))+10;
	}
}