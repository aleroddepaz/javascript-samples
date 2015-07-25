function clear(ctx) {	
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); 
}

function Circle(x,y,radius){
	this.x = x;
	this.y = y;
	this.radius = radius;
}

function Line(startPoint,endPoint, thickness) {
	this.startPoint = startPoint;
	this.endPoint = endPoint;
	this.thickness = thickness;
}

var untangleGame = {
	circles: [],
	thinLineThickness: 1,
	boldLineThickness: 5,
	lines: [],
	currentLevel: 0,
	progressPercentage: 0
};

untangleGame.levels = [
	{
		"level" : 0,
		"circles" : [
			{"x" : 400, "y" : 156},
			{"x" : 381, "y" : 241},
			{"x" : 84, "y" : 233},
			{"x" : 88, "y" : 73}
		],
		"relationship" : {
			"0" : {"connectedPoints" : [1,2]},
			"1" : {"connectedPoints" : [0,3]},
			"2" : {"connectedPoints" : [0,3]},
			"3" : {"connectedPoints" : [1,2]}
		}				  
	},
	{
		"level" : 1,
		"circles" : [
			{"x" : 401, "y" : 73},
			{"x" : 400, "y" : 240},
			{"x" : 88, "y" : 241},
			{"x" : 84, "y" : 72}],
		"relationship" : {
			"0" : {"connectedPoints" : [1,2,3]},
			"1" : {"connectedPoints" : [0,2,3]},
			"2" : {"connectedPoints" : [0,1,3]},
			"3" : {"connectedPoints" : [0,1,2]}
		}				  
	},
	{
		"level" : 2,
		"circles" : [
			{"x" : 100, "y" : 106},
			{"x" : 260, "y" : 53},
			{"x" : 400, "y" : 106},
			{"x" : 400, "y" : 226},
			{"x" : 260, "y" : 275},
			{"x" : 100, "y" : 226}
	],
		"relationship" : {
			"0" : {"connectedPoints" : [2,3,4]},
			"1" : {"connectedPoints" : [3,5]},
			"2" : {"connectedPoints" : [0,4,5]},
			"3" : {"connectedPoints" : [0,1,5]},
			"4" : {"connectedPoints" : [0,2]},
			"5" : {"connectedPoints" : [1,2,3]}
		}				  
	}
];

function setupCurrentLevel() {
	untangleGame.circles = [];
	var level = untangleGame.levels[untangleGame.currentLevel];
	for (var i=0; i<level.circles.length; i++) {
		untangleGame.circles.push(new Circle(level.circles[i].x, level.circles[i].y, 10));
	}
	
	connectCircles();
	updateLineIntersection();
}

function checkLevelCompleteness() {
	if (untangleGame.progressPercentage == 100) {
		if (untangleGame.currentLevel+1 < untangleGame.levels.length)
			untangleGame.currentLevel++;
		setupCurrentLevel();
	}
}

function drawLine(ctx, x1, y1, x2, y2, thickness) {		
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineWidth = thickness;
	ctx.strokeStyle = "#cfc";
	ctx.stroke();
}

function drawCircle(ctx, x, y, radius) {
	var circle_gradient = ctx.createRadialGradient(x-3,y-3,1,x,y, 10);
	circle_gradient.addColorStop(0, "#fff");
	circle_gradient.addColorStop(1, "#cc0");
	ctx.fillStyle = circle_gradient;

	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
}

$(function(){		 			
	var canvas = document.getElementById("game");  
	var ctx = canvas.getContext("2d");
	
	setupCurrentLevel();	
	updateLevelProgress();
	
	$("#game").mousedown(function(e) {
		var mouseX = e.pageX-this.offsetLeft;
		var mouseY = e.pageY-this.offsetTop;
		
		for(var i=0;i<untangleGame.circles.length;i++)
		{
			var circleX = untangleGame.circles[i].x;
			var circleY = untangleGame.circles[i].y;
			var radius = untangleGame.circles[i].radius;
			if (Math.pow(mouseX-circleX,2) + Math.pow(mouseY-circleY,2) < Math.pow(radius,2))
			{
				untangleGame.targetCircle = i;
				break;
			}
		}
	});
	
	$("#game").mousemove(function(e) {
		if (untangleGame.targetCircle != undefined) {
			var mouseX = e.pageX-this.offsetLeft;
			var mouseY = e.pageY-this.offsetTop;
			var radius = untangleGame.circles[untangleGame.targetCircle].radius;
			untangleGame.circles[untangleGame.targetCircle] = new Circle(mouseX, mouseY, radius);	
			
			connectCircles();
			updateLineIntersection();
			updateLevelProgress();				    	
		}
	});
	    
	$("#game").mouseup(function(e) {    	
		untangleGame.targetCircle = undefined;    	
		checkLevelCompleteness();
	});
	
	untangleGame.guide = new Image();
	untangleGame.guide.onload = function() {
		untangleGame.guideReady = true;
		untangleGame.guideFrame = 0;
		setInterval(guideNextFrame, 500);
	}
	untangleGame.guide.src = "images/guide_sprite.png";
	
	setInterval(gameloop, 30);
});

function guideNextFrame() {
	untangleGame.guideFrame++;
	if (untangleGame.guideFrame > 5) {
		untangleGame.guideFrame = 0;
	}
}

function connectCircles() {
	var level = untangleGame.levels[untangleGame.currentLevel];
	untangleGame.lines.length = 0;
	for (var i in level.relationship) {
		var connectedPoints = level.relationship[i].connectedPoints;
		var startPoint = untangleGame.circles[i];
		for (var j in connectedPoints) {
			var endPoint = untangleGame.circles[connectedPoints[j]];
			untangleGame.lines.push(new Line(startPoint, endPoint));
		}
	}
}

function updateLineIntersection() {
	for (var i=0;i<untangleGame.lines.length;i++) {
		var line1 = untangleGame.lines[i];
		line1.thickness = untangleGame.thinLineThickness;
		for(var j=0;j<i;j++) {	
			var line2 = untangleGame.lines[j];
			
			if (isIntersect(line1, line2)) {
				line1.thickness = untangleGame.boldLineThickness;
				line2.thickness = untangleGame.boldLineThickness;
			}			
		}
	}
}

function updateLevelProgress() {
	var progress = 0;
	for (var i=0;i<untangleGame.lines.length;i++) {
		if (untangleGame.lines[i].thickness == untangleGame.thinLineThickness) {
			progress++;
		}
	}
	var progressPercentage = Math.floor(progress/untangleGame.lines.length*100);
	untangleGame.progressPercentage = progressPercentage;
}

function gameloop() {
	var canvas = document.getElementById("game");  
	var ctx = canvas.getContext("2d"); 				
	
	clear(ctx);
	
	if (untangleGame.currentLevel == 0 && untangleGame.guideReady) {
		// the dimension of each frame is 80x130
		var nextFrameX = untangleGame.guideFrame * 80;
		ctx.drawImage(untangleGame.guide, nextFrameX, 0, 80, 130, 325, 130, 80, 130);
	}
	
	for(var i=0;i<untangleGame.lines.length;i++) {
		var line = untangleGame.lines[i];
		var startPoint = line.startPoint;
		var endPoint = line.endPoint;
		var thickness = line.thickness;
		drawLine(ctx, startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
	}
	
	for(var i=0;i<untangleGame.circles.length;i++) {
		var circle = untangleGame.circles[i];
		drawCircle(ctx, circle.x, circle.y, circle.radius);
	}
	
	ctx.font = "24px 'Rock Salt'";
	ctx.fillStyle = "#ffffff";
	ctx.textAlign = "left";
	ctx.textBaseline = "bottom";
	var bottomText = "Puzzle "  + untangleGame.currentLevel + ", Completeness:" + untangleGame.progressPercentage + "%";
	ctx.fillText(bottomText, 60, ctx.canvas.height - 50);
}

function isIntersect(line1, line2) {
	var a1 = line1.endPoint.y - line1.startPoint.y;
	var b1 = line1.startPoint.x - line1.endPoint.x;
	var c1 = a1 * line1.startPoint.x + b1 * line1.startPoint.y;
	
	var a2 = line2.endPoint.y - line2.startPoint.y;
	var b2 = line2.startPoint.x - line2.endPoint.x;
	var c2 = a2 * line2.startPoint.x + b2 * line2.startPoint.y;
	
	var d = a1*b2 - a2*b1;
	
	if (d == 0) {
		return false;
	}else {
		var x = (b2*c1 - b1*c2) / d;
		var y = (a1*c2 - a2*c1) / d;
					
		// check if the interception point is on both line segments
		if ((isInBetween(line1.startPoint.x, x, line1.endPoint.x) || isInBetween(line1.startPoint.y, y, line1.endPoint.y)) &&
			(isInBetween(line2.startPoint.x, x, line2.endPoint.x) || isInBetween(line2.startPoint.y, y, line2.endPoint.y))) 
		{
			return true;	
		}
	}
	
	return false;
}

// return true if b is between a and c,
// we exclude the result when a==b or b==c
function isInBetween(a, b, c) {
	// return false if b is almost equal to a or c.
	// this is to elmiate some floating point when
	// two value is equal to each other but different with 0.00000...0001
	if (Math.abs(a-b) < 0.000001 || Math.abs(b-c) < 0.000001) {
		return false;
	}
	
	// true when b is in between a and c
	return (a < b && b < c) || (c < b && b < a);
}

