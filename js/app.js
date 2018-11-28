'use strict;'


/* Create a superclass Character that take commom params from Player and Enemy */
class Character {

	/*This is a constructor passing the commom params*/
	constructor(x, y, firstX, firstY, lastX, lastY, sprite) {
		this.firstX = firstX;
		this.firstY = firstY;
		this.lastX = lastX;
		this.lastY = lastY;
		this.x = x;
		this.y = y;
		this.sprite = sprite;
	}

}

// Enemies our player must avoid
/* Enemy class extends Character superclass !! */
class Enemy extends Character {

	constructor(type, pos) {
		/*Setting values to commom params in Superclass */
		super(0, 0, 0, 63, 404, 63, 'images/enemy-bug.png');
		/* Types of Velocity that move each bugs */
		this.steps = {
			turtle: 50,
			rabbit: 100,
			hurricane: 200
		};
		/* Positions of bug in panel */
		this.positions = {
			first: 63,
			middle: 146,
			last: 229
		};
		/*This is an override of position! I can't declare a property with "this" before super method.
		And i need this.positions in another method, like update. So i pass a default value in super 
		method and i make a override here !! */
		this.y = this.positions[pos];
		/*Here i set the velocity for each bug. This velocity was passed in constructor*/
		this.pass = this.steps[type];
	}

	update(dt) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		/*Using the velocity for each bug, here update the movement the bug*/
		this.x += this.pass * dt;
		if (this.x > 500) {
			this.x = 0;
			/*Here is magic ! I created bugs and randomly it took a different position for each one.*/
			this.y = this.positions[Object.keys(this.positions)[Math.floor(Math.random() * Object.keys(this.positions).length)]];
		}
		return;
	};

	checkCollision(player) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.

		/*Magic Value !!! Using this value, the condition below take more realistic when 
		the bug hit the player */
		const dx = 70;
		if (((player.getY() - this.y) === 5) && (parseInt(this.x) >= player.getX() - dx && (parseInt(this.x) <= player.getX() + dx))) {
			return true;
		}
		return false;
	};

	render() {
		/*Just render the bug on screen*/
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


class Player extends Character {

	constructor(name) {
		/*Same process on Enemy constructor function*/
		super(202, 400, 0, 0, 404, 400, 'images/char-boy.png');
		/*Set name of player*/
		this.name = name;
		/*How many lifes it begin*/
		this.bonus = 3;
		/*Start show lifes on screen*/
		this.updateBonus();
	}

	update() {
		/*Update position on screen of Player. If hit on water, he win a life, 
		i update it on screen and reset the player*/
		//hit on water
		if (this.y < 0) {
			//he win a life
			this.bonus++;
			//i update it on screen
			this.updateBonus();
			//reset the player
			this.y = this.lastY;
		}
	}

	/*I update the number of lifes on screeen*/
	updateBonus() {
		document.querySelector('#lifes').innerText = this.bonus;
		document.querySelector('#message').innerText = `${this.name} has ${this.bonus} lifes`;
		setTimeout(() => {
			document.querySelector('#message').innerText = ' ';
		}, 2000);
	}

	/*If had any collision, the player lost a life, i update it on screen and reset the player*/
	lostLife() {
		/*lost a life*/
		this.bonus--;
		/*Update new lifes on screen*/
		this.updateBonus();
		/*reset the player*/
		this.y = this.lastY;
	}

	/*Auxiliar method to return player's X position to checkCollision in Enemy Class*/
	getX() {
		return this.x;
	}

	/*Auxiliar method to return player's Y position to checkCollision in Enemy Class*/
	getY() {
		return this.y;
	}

	/*Just move the player on screen to up, down, left, right*/
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

	/*Render player character*/
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