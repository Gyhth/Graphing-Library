$(document).ready(function() {
  init("body", 500, 500);
});

function graphingObjectClass(title, color, value) {
	this.title = title,
	this.color = color,
	this.value = value
};

function graphingClass(graphType, graphingObjects, gap, legendX, legendY){
	this.graping = graphType,
	this.graphingObjects = graphingObjects,
  this.gap = gap;
  this.legendX = legendX;
  this.legendY = legendY;
};

graphingClass.prototype = {
	graphing: "",
	graphingObjects: "",
  gap: 0,
  legendX: 0,
  legendY: 0
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
		var graph = new graphingClass("Bar", graphObjects, 5, 100, 0);
		var objectOne = new graphingObjectClass("Test", "#FF0000", 30);
	  var objectTwo = new graphingObjectClass("Test2","#0000FF", 15);
		var objectThree = new graphingObjectClass("Test3","#00FF00", 60);
		graphObjects.push(objectOne);
		graphObjects.push(objectTwo);
		graphObjects.push(objectThree);
		drawGraph(canvas, context, graphObjects, graph)
}

function drawGraph(canvas, context, graphObjects, graph) {
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
		//Width: Canvas Width Divided by number of objects, minus gap times number of
    //       Elements
		//Height: To the bottom of the Canvas
    context.fillRect(nextBar, canvas.height - canvas.height*(graphObjects[i].value/scaling),Math.floor((canvas.width/graphObjects.length)-(graph.gap*graphObjects.length)),canvas.height);
		context.stroke();
    nextBar += Math.floor((canvas.width/graphObjects.length)+graph.gap);
    context.font = "30px Arial";
    context.fillText(graphObjects[i].title,10+graph.legendX,((i+1)*25)+graph.legendY);
    console.log(graph.legendX);
	}
}
