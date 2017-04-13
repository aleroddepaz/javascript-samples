function Score(id) {
  let score = 0;
  const elem = document.getElementById(id);
	elem.innerHTML = score;
	this.increment = function() {
		score++;
		elem.innerHTML = score;
	};
};

function Ball(elem) {
  let $elem = $(elem);
	let speed = 5;

  this.height = $elem.height();
	this.width = $elem.width();
  this.x = 150;
	this.y = 100;
	this.directionX = 1;
	this.directionY = 1;
	this.render = function render() {
		$elem.css({ 'left': this.x, 'top': this.y });
	};
	this.update = function update() {
		this.x += speed * this.directionX;
		this.y += speed * this.directionY;
	};
	this.reset = function reset(x, y, dir_x) {
	  this.x = x;
	  this.y = y;
	  this.directionX = dir_x;
	};
};

function Paddle(elem) {
  let $elem = $(elem);

  this.height = $elem.height();
  this.width = $elem.width();
	this.left = parseInt($elem.css('left'));
	this.top = function top() {
		return parseInt($elem.css('top'));
	};
	this.move = function move(offset) {
		$elem.css('top', this.top() + offset);
	}
};

$(function() {
	const KEYS = {
		UP: 38,
		DOWN: 40,
		W: 87,
		S: 83,
		PAUSE: 80
	};
  const pressedKeys = [];
	const minWidth = 0;
	const minHeight = 0;
	const maxWidth = document.getElementById('playground').offsetWidth;
	const maxHeight = document.getElementById('playground').offsetHeight;

	const scoreA = new Score('scoreA');
  const scoreB = new Score('scoreB');
	const paddleA = new Paddle('#paddleA');
	const paddleB = new Paddle('#paddleB');
	const ball = new Ball('#ball');

	let timer = setInterval(gameloop, 30);
	let paused = false;

	$(document).keydown(function(e) {
		if(e.which === KEYS.PAUSE) {
			if(paused) {
				timer = setInterval(gameloop, 30);
			} else {
				clearInterval(timer);
			}
			paused = !paused;
		}
		pressedKeys[e.which] = true;
	});

	$(document).keyup(function(e) {
		pressedKeys[e.which] = false;
	});

	function gameloop() {
		ball.update();
		if (!(minHeight < ball.y && ball.y < maxHeight - ball.height)) {
			ball.directionY *= -1;
		} else if (ball.x >= maxWidth - ball.width) {
			scoreB.increment();
			ball.reset(250, 100, -1);
		} else if (ball.x <= minWidth) {
			scoreA.increment();
			ball.reset(150, 100, 1);
		}

		const correctedHeight = ball.height / 1.5;
		if (ball.x <= paddleA.left + paddleA.width && ball.x >= paddleA.left + paddleA.width - 5) {
			if (ball.y <= paddleA.top() + paddleA.height && ball.y + correctedHeight >= paddleA.top()) {
				ball.directionX = 1;
			}
		}
		if (ball.x >= paddleB.left - ball.width && ball.x <= paddleB.left - ball.width + 5) {
			if (ball.y <= paddleB.top() + paddleB.height && ball.y + correctedHeight >= paddleB.top()) {
				ball.directionX = -1;
			}
		}
		ball.render();

		if (pressedKeys[KEYS.UP] && paddleB.top() > minHeight) {
			paddleB.move(-5);
		}
		if (pressedKeys[KEYS.DOWN] && paddleB.top() + paddleB.height < maxHeight) {
			paddleB.move(+5);
		}

		if (pressedKeys[KEYS.W] && paddleA.top() > minHeight) {
			paddleA.move(-5);
		}
		if (pressedKeys[KEYS.S] && paddleA.top() + paddleA.height < maxHeight) {
			paddleA.move(+5);
		}
	}
});
