var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83,
	PAUSE: 80
}

var pingpong = {
	scoreA: 0,
	scoreB: 0,
	paused: false
}

pingpong.pressedKeys = [];

pingpong.ball = {
	speed: 5,
	x: 150,
	y: 100,
	directionX: 1,
	directionY: 1,
	height: parseInt($('#ball').height()),
	width: parseInt($('#ball').width())
}

pingpong.playground = {
	height: parseInt($('#playground').height()),
	width: parseInt($('#playground').width())
}

pingpong.paddleA = initializePaddle('#paddleA');
pingpong.paddleB = initializePaddle('#paddleB');

function initializePaddle(paddle) {
	var paddle = $(paddle);
	return {
		top: parseInt(paddle.css('top')),
		left: parseInt(paddle.css('left')),
		width: parseInt(paddle.css('width')),
		height: parseInt(paddle.css('height'))
	}
}

$(function(){
	pingpong.timer = setInterval(gameloop, 30);
	
	$(document).keydown(function(e){
		if(e.which == KEY.PAUSE){
			if(pingpong.paused){
				pingpong.paused = false;
				pingpong.timer = setInterval(gameloop, 30);
			} else {
				pingpong.paused = true;
				clearInterval(pingpong.timer);
			}
		}
		pingpong.pressedKeys[e.which] = true;
	});
	$(document).keyup(function(e){
		pingpong.pressedKeys[e.which] = false;
	});
});

function gameloop() {
	moveBall();
	movePaddles();
}

function moveBall() {
	var playground = pingpong.playground;
	var ball = pingpong.ball;
	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;
	
	if (!ball.y.between(0, playground.height - ball.height)) {
		ball.directionY *= -1;
	}
	else if (ball.x >= playground.width - ball.width) {
		pingpong.scoreB++;
		$('#scoreB').html(pingpong.scoreB);
		ball.x = 250;
		ball.y = 100;
		$('#ball').css({ 'left': ball.x, 'top': ball.y });
		ball.directionX = -1;
	}
	else if (ball.x <= 0) {
		pingpong.scoreA++;
		$('#scoreA').html(pingpong.scoreA);
		ball.x = 150;
		ball.y = 100;
		$('#ball').css({ 'left': ball.x, 'top' : ball.y });
		ball.directionX = 1;
	}
	
	var correctedHeight = ball.height/1.5
	var paddleA = pingpong.paddleA;
	var paddleB = pingpong.paddleB;
	
	paddleA.top = parseInt($('#paddleA').css('top'));
	if (ball.x <= paddleA.left + paddleA.width && ball.x >= paddleA.left + paddleA.width - 5) {
		if (ball.y <= paddleA.top + paddleA.height && ball.y + correctedHeight >= paddleA.top) {
			ball.directionX = 1;
		}
	}
	paddleB.top = parseInt($('#paddleB').css('top'));
	if (ball.x >= paddleB.left - ball.width && ball.x <= paddleB.left - ball.width + 5) {
		if (ball.y <= paddleB.top + paddleB.height && ball.y + correctedHeight >= paddleB.top) {
			ball.directionX = -1;
		}
	}
	$('#ball').css({ 'left': ball.x, 'top': ball.y });
}

Number.prototype.between = function(a,b){ return a < this && this < b; };

function movePaddles() {
	if (pingpong.pressedKeys[KEY.UP]) {
		moveUpPaddle('#paddleB');
	}
	if (pingpong.pressedKeys[KEY.DOWN]) {
		moveDownPaddle('#paddleB');
	}
	if (pingpong.pressedKeys[KEY.W]) {
		moveUpPaddle('#paddleA');
	}
	if (pingpong.pressedKeys[KEY.S]) {
		moveDownPaddle('#paddleA');
	}
}

function moveUpPaddle(paddle) {
	var top = parseInt($(paddle).css('top'));
	if(top > 0) {
		$(paddle).css('top', top-5);
	}
}

function moveDownPaddle(paddle) {
	var top = parseInt($(paddle).css('top'));
	var height = parseInt($(paddle).height());
	if(top + height < pingpong.playground.height) {
		$(paddle).css('top', top+5);
	}
}
