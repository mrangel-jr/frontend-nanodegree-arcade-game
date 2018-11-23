// Enemies our player must avoid
var Enemy = function (type, pos) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	this.positions = {
		first: 63,
		middle: 146,
		last: 229
	};
	this.firstX = 0;
	this.firstY = 63;
	this.lastX = 404;
	this.lastY = 63;
	this.x = 0;
	this.y = this.positions[pos];
	this.steps = {
		turtle: 50,
		rabbit: 100,
		hurricane: 200
	}
	this.pass = this.steps[type];
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.pass * dt;
	if (this.x > 500) {
		this.x = 0;
		this.y = this.positions[Object.keys(this.positions)[Math.floor(Math.random() * Object.keys(this.positions).length)]];
	}
	return;
};

//Check collision between enemies and player.
//Return True if has collision. Otherwise, return false

Enemy.prototype.checkCollision = function (player) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	//63,146,229
	dx = 2;
	if (((player.getY() - this.y) === 5) && (parseInt(this.x) >= player.getX() - dx && (parseInt(this.x) <= player.getX() + dx))) {
		return true;
	}
	return false;
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {

	constructor(name) {
		this.name = name;
		this.sprite = 'images/char-boy.png';
		this.firstX = 0;
		this.firstY = 0;
		this.lastX = 404;
		this.lastY = 400;
		this.x = 202;
		this.y = 400;
		this.bonus = 0;
	}

	update() {
		if (this.y < 0) {
			this.bonus++;
			console.log(`${this.name} has ${this.bonus}`);
			this.y = this.lastY;
		}
	}

	lostLife() {
		this.bonus--;
		console.log(`${this.name} has ${this.bonus}`);
		this.y = this.lastY;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	handleInput(move) {
		switch (move) {
			case 'left':
				{
					if (this.x > this.firstX) {
						this.x -= 101;
					}
					break;
				}
			case 'right':
				{
					if (this.x < this.lastX) {
						this.x += 101;
					}
					break;
				}
			case 'up':
				{
					if (this.y > this.firstY) {
						this.y -= 83;
					}
					break;
				}
			case 'down':
				{
					if (this.y < this.lastY) {
						this.y += 83;
					}
					break;
				}
			default:
				{
					return
				}
		}
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player('John');

const bug1 = new Enemy('hurricane', 'first');
const bug2 = new Enemy('rabbit', 'middle');
const bug3 = new Enemy('hurricane', 'last');
const bug4 = new Enemy('turtle', 'middle');
const bug5 = new Enemy('rabbit', 'first');
const bug6 = new Enemy('rabbit', 'middle');

const allEnemies = [];

allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});