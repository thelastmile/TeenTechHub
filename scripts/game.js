$(function() {


// set height of background to window's height
$('.game-container').css('height', window.innerHeight - 10);
// $('.game-container').css('min-height', 650);
$(window).resize(function(e) {
	$('.game-container').css('height', e.target.innerHeight);
	// $('.game-container').css('min-height', 650);
});


// game begins here ===============================================
var gv = {
	level:-1,
	clueSize: 20,
	points: 0,
	enemySize: 20,
	runnerOffset: 80
};


// +++++++++++++++++++++++++++++++++++++++++++++++++++
// enemy object that holds all enemy methods and props
var enemy = {};

enemy.moveEnemiesIntervalId;

// stop enemies from moving
enemy.stopEnemyMovement = function() {
	clearInterval(enemy.moveEnemiesIntervalId);
};

// get enemies moving left
enemy.startEnemyMovement = function() {
	enemy.moveEnemiesIntervalId = setInterval(enemy.moveEnemiesLeft, 500);
}

// check to see if enemy collides with runner
enemy.checkIfRunnerHit = function() {
	var $enemies = $('.enemy'),
		runnerPos = parseInt($('#runner1').css('left')),
		runnerTopPos = parseInt($('#runner1').css('top'));

	for (var i = 0; i < $enemies.length; i++) {
		var enemy = $enemies[i],
			enemyLoc = parseInt(enemy.style.left),
			enemyTopLoc = parseInt(enemy.style.top),
			bcgLoc = parseInt($('.bcg').css('left')),
			rand = parseInt(bcgSize * Math.random()) + 100;

		if (enemyLoc >= runnerPos && 
			enemyLoc <= runnerPos + gv.enemySize - 10 && 
			enemyTopLoc >= runnerTopPos && 
			enemyTopLoc <= runnerTopPos + gv.enemySize) {
				runner.die();
				break;
		}
	}
};

// move enemies left
enemy.moveEnemiesLeft = function(num, time) {
	var $enemies = $('.enemy'),
		num = num || 2,
		time = time || 10,
		runnerPos = parseInt($('#runner1').css('left')),
		runnerTopPos = parseInt($('#runner1').css('top'));

	for (var key in enemies) {
		var myEnemy = $('#' + enemies[key].id),
			enemyLoc = parseInt(myEnemy.css('left')),
			enemyTopLoc = parseInt(myEnemy.css('top')),
			bcgLoc = parseInt($('.bcg').css('left')),
			rand = parseInt(bcgSize * Math.random()) + 100;

		if (enemyLoc - bcgLoc <= 0) {
			myEnemy.css('left', window.innerWidth / 2 + 'px')
		} else {
			myEnemy.animate({
				left: "-=" + num
			}, time)
		}

	}
	enemy.checkIfRunnerHit();
};

// move enemies right
enemy.moveEnemiesRight = function(num, time) {
	var $enemies = $('.enemy'), 
		num = num || 2,
		time = time || 10,
		runnerPos = parseInt($('#runner1').css('left')),
		runnerTopPos = parseInt($('#runner1').css('top'));

	for (var key in enemies) {
		var myEnemy = $('#' + enemies[key].id),
			enemyLoc = parseInt(myEnemy.css('left')),
			enemyTopLoc = parseInt(myEnemy.css('top')),
			bcgLoc = parseInt($('.bcg').css('left'));

		myEnemy.animate({
			left: "+=" + num
		}, time)
	}
	enemy.checkIfRunnerHit();
};

// add enemies
enemy.addEnemies = function() {
	var rand = parseInt(window.innerWidth / 3);

	for (var key in enemies) {
		
		var myEnemy = $('<img src="' + enemies[key].src + '" class="enemy" id="' + enemies[key].id + '" />')
			.css({
				top: enemies[key][gv.level],
				left: rand + 'px',
				position: 'absolute',
				zIndex: 100,
				width: gv.enemySize,
				height: gv.enemySize
			});

		$('.game-container').append(myEnemy);

		rand += parseInt(Math.random() * window.innerWidth / 2);
	}
	enemy.startEnemyMovement();
};

// remove enemies 
enemy.removeEnemies = function() {
	$('.enemy').remove();
};



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// runner object that holds all runner methods and properties
var runner = {};

// set runners starting position
runner.setRunnersPos = function() {
	$('.female-runner').css({
		top: clues[gv.level].top,
		left: gv.runnerOffset
	});
};

// change the runners image to left or right
runner.flipRunner = function(pos) {
	if (runner.flipRunner.currPos !== pos) {
		if (pos === 0) { // running right
			$('#runner1').prop('src', '../images/runner_right_2.gif');
			runner.flipRunner.currPos = 0;
		} else if (pos === 1) { // running left
			$('#runner1').prop('src', '../images/runner_left_2.gif');
			runner.flipRunner.currPos = 1;
		} else if (pos === 2) { // standing still right
			$('#runner1').prop('src', '../images/runner2.gif');
			runner.flipRunner.currPos = 2;
		} 
	}
};
runner.flipRunner.currPos = 0;

// kill runner and restart game
runner.die = function() {
	$('.clue-area .clue, .clue-area .deadclue').remove();

	enemy.stopEnemyMovement();

	$('#runner1').animate({
		top: -100,
		opacity: 0
	}, 1000, function()	{
		$(this).css('opacity', 1);
		game.renderGameOver();
	});
};

// make runner jump
runner.jump = function(way) {
	var m = clues[gv.level].move, 
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top')),
		possibleTops = [];

	for (var i = 0; i < clues[gv.level].move.length; i++) {
		var tops = clues[gv.level].move[i];

		if (tops) {
			possibleTops.push(tops.y)
		}
	}

	if (possibleTops.indexOf($runPos) > -1) {
		if (way && $bcgPos > -bcgSize + 45 && $runPos) { // jump right
			runner.jumpRight($runPos);
		} else if (!way && $bcgPos < -45) { // jump left
			runner.jumpLeft($runPos);
		}
	}
};

// jump right
runner.jumpRight = function(runnersPosition) {
	var leftRightAmount = 45;

	runner.flipRunner(0);
	game.hideClue();
	
	$('.female-runner').animate({
		top: "-=" + 35
	}, 300)

	$('.bcg').animate({
		left: "-=" + leftRightAmount
	}, 500)
	
	$('.female-runner').animate({
		top: runnersPosition
	}, 300)

	enemy.moveEnemiesLeft(leftRightAmount, 500);
};

// jump left
runner.jumpLeft = function(runnersPosition) {
	var leftRightAmount = 45;

	runner.flipRunner(1);
	game.hideClue();

	$('.female-runner').animate({
		top: "-=" + 35
	}, 300)

	$('.bcg').animate({
			left: "+=" + leftRightAmount
		}, 500)
	
	$('.female-runner').animate({
		top: runnersPosition
	}, 300)

	enemy.moveEnemiesRight(leftRightAmount, 500);
};

// move runner down
runner.goDown = function() {
	var m = clues[gv.level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top'));

	game.hideClue();

	for (var i = 0; i < m.length; i++) {
		var mi = m[i];

		if ($bcgPos - 5 <= mi.x && $bcgPos >= mi.x - mi.width && $runPos >= mi.y && $runPos < mi.y + mi.height) {

			$('.female-runner').animate({
				top: "+=" + 2
			}, 10)
		}
	}
};

// move runner up
runner.goUp = function() {
	var m = clues[gv.level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top'));

	game.hideClue();

	for (var i = 0; i < m.length; i++) {
		var mi = m[i];

		if ($bcgPos - 5 <= mi.x && $bcgPos >= mi.x - mi.width && $runPos > mi.y && $runPos <= mi.y + mi.height) {

			$('.female-runner').animate({
				top: "-=" + 2
			}, 10)
		}
	}
};

// move runner right, which actually moves the background left
runner.goRight = function() {
	var m = clues[gv.level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top'));

	runner.flipRunner(0);
	game.hideClue();

	for (var i = 0; i < m.length; i++) {
		var mi = m[i];

		if ($bcgPos <= mi.x && $bcgPos > mi.x - mi.width + 4 && $runPos > mi.y - 1 && $runPos < mi.y + mi.height + 1) {

			$('.bcg')
			.animate({
				left: "-=" + 2
			}, 10)

			enemy.moveEnemiesLeft();
		}
	}
};

// move runner left, which actually moves the background right
runner.goLeft = function() {
	var m = clues[gv.level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top'));

	runner.flipRunner(1);
	game.hideClue();

	for (var i = 0; i < m.length; i++) {
		var mi = m[i];

		if ($bcgPos < mi.x && $bcgPos >= mi.x - mi.width - 4 && $runPos > mi.y - 1 && $runPos < mi.y + mi.height + 1) {

			$('.bcg').animate({
				left: "+=" + 2
			}, 10)

			enemy.moveEnemiesRight();
		}
	}
};



// +++++++++++++++++++++++++++++++++++++++++++++++++++++
var game = {};

// go up a level
game.increaseLevel = function() {
	gv.level++;
};

game.decreaseLevel = function() {
	gv.level--;
};

// show points on screen
game.showPoints = function() {
	$('.info-points').text(gv.points);
};

// increase points
game.increasePoints = function(num) {
	gv.points += num || 10;

	game.showPoints();
};

// remove all clues from .clue-area
game.removeClue = function() {
	$('.clue-area .clue, .clue-area .deadclue').remove();
};

// hide all previous clues from .clue-area
game.hideClue = function() {
	var $clues = $('.clue-area .clue');

	$('.deadclue').remove();

	for (var i = 0; i < $clues.length; i++) {
		$clues.eq(i).hide();
	}
};

// append the clue to .clue-area
game.addClue = function(clueObj) {
	var $topPos = parseInt($('.female-runner').css('top'));

	game.hideClue();

	var alreadyExists = $('#' + clueObj.id);

	if (alreadyExists.length === 0) {
		if (clueObj.id.indexOf('deadclue') === -1) {
			var that = $('<p />', { id: clueObj.id, class: "clue tooltip" });
			game.appendClue(clueObj, that, $topPos);
			game.appendClueToGameManager(clueObj, that);

		} else {
			var that = $('<p />', { id: clueObj.id, class: "deadclue tooltip" });
			game.appendClue(clueObj, that, $topPos);
		}
	} else {
		alreadyExists.show();
	}
};

// append clue to .clue-area
game.appendClue = function(clueObj, thatObj, top) {
	thatObj.html(clueObj.clue).appendTo('.clue-area');
	thatObj.css({
		top: top - parseInt(thatObj.css('height')) - 28,
		left: gv.runnerOffset - 25
	});

	game.info();
}

// add clue to game manager
game.appendClueToGameManager = function(clueObj, thatObj) {
	game.appendClueToGameManager.index++;

	var id = 'clue0' + game.appendClueToGameManager.index,
		newEl = '<div class="game-instructions clue-manager" id="' + id +  '"><h5>Clue ' + game.appendClueToGameManager.index + '</h5><p class="game-instructions-info">' + clueObj.clue + '</p></div>';

	$('.game-manager').append(newEl);
	$('.game-instructions-info').hide();


	game.addGameManagerClick(id);
};
game.appendClueToGameManager.index = 0;


// remove clues from game manager
game.removeCluesFromGameManager = function() {
	$('.clue-manager').remove();
};

// check to see if there is a clue
game.checkClue = function() {
	var $bcgPos = parseInt($('.bcg').position().left),
		$topPos = parseInt($('.female-runner').css('top')),
		clueArr = clues[gv.level].clues,
		deadClueArr = deadClues[gv.level].clues;

	for (var i = 0; i < clueArr.length; i++) {
		var clue = clueArr[i],
			isClue;

		if (($bcgPos >= clue.left - gv.clueSize && 
			$bcgPos <= clue.left + gv.clueSize && 
			clue.top === null) || 
			($bcgPos >= clue.left - gv.clueSize && 
			$bcgPos <= clue.left + gv.clueSize && 
			$topPos >= clue.top - gv.clueSize && 
			$topPos <= clue.top + gv.clueSize)) {
				isClue = clue;
				game.increasePoints();
		} 
	}

	// if there's no clue, then check deadClue
	for (var i = 0; i < deadClueArr.length; i++) {
		var deadClue = deadClueArr[i],
			isDeadClue;

		if ($bcgPos >= deadClue.left - gv.clueSize && 
			$bcgPos <= deadClue.left + gv.clueSize && 
			$topPos >= deadClue.top - gv.clueSize && 
			$topPos <= deadClue.top + gv.clueSize) {
				isDeadClue = deadClue;
		}
	}

	if (isClue) {
		game.addClue(isClue);
	} else if (isDeadClue) {
		game.addClue(isDeadClue);
	} else {
		game.addClue(deadClueArr[0]);
	}
};

// check if the number of clues remaining is 0
game.foundAllClues = function() {
	var len = clues[gv.level].clues.length,
		$cluesRemaining = len - $('.clue').length;

	if ($cluesRemaining === 0) {
		game.showProblem();
	}
};

// show problem
game.showProblem = function() {
	$('.prob-area .problem').html(clues[gv.level].problem);
	$('.prob-area').show();
	game.clearSolutionVal();
	$('.solution').focus();
	setTimeout(function() {
		$('.solution').val('');
	}, 10);

	game.hideGameManager();
};

// hide .prob-area
game.hideProblem = function() {
	$('.prob-area').hide();
	$('.problem').text('');

	game.showGameManager();
};

// changes the game image
game.changeImage = function() {
	var $bcg = $('.bcg');

	if ($bcg.length <= 0) {
		$('.game-container').append(clues[gv.level].image);
		$('.female-runner').css('top', clues[gv.level].top)
	} else {
		$bcg.remove();
		$('.game-container').append(clues[gv.level].image);
		$('.female-runner').css('top', clues[gv.level].top)
	}
};

// clear .solutions value
game.clearSolutionVal = function() {
	$('.solution').val('');
};

// prints info in .info section
game.info = function() {
	$('.info-level').text(gv.level + 1);

	var $len = $('.clue').length;
	$('.info-clues').text(clues[gv.level].clues.length - $len)
	game.foundAllClues();
};

game.renderGameOver = function() {
	// restart game after being killed, but needs to delay
	// until after the animation finishes moving character
	// off screen
	setTimeout(function() {
		$('.game-over').click(function() {
			game.decreaseLevel();
			game.removeGameOver();
			game.render();
			runner.setRunnersPos();
		});
	}, 1100)

	game.createGameOverEl();
	game.hideProblem();
	game.hideGameManager();
};

// create the game over element
game.createGameOverEl = function() {
	var p = $('<p class="game-over">Game Over<br>Click Here to Play Again</p>').css({
		zIndex: '1000',
		position: 'absolute',
		top: '13px',
		left: '0',
		right: '0',
		textAlign: 'center',
		width: '50px',
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: '1em',
		color: 'black',
		fontWeight: 'bold'
	});

	$('.clue-area').append(p);
};

// remove the game over <p>
game.removeGameOver = function() {
	$('.game-over').remove();
};

// add a toggle to show/hide game info in .game-info
game.addGameManagerClick = function(elId) {
	$('#' + elId).click(function() {
		$(this).children('.game-instructions-info').toggle();
	});
};

// hide game manager
game.hideGameManager = function() {
	$('.game-manager').hide();
};

// show game manager
game.showGameManager = function() {
	$('.game-manager').show();
}

// adds click event to instructions in game manager
game.addInstructionsClick = function() {
	$('.game-instructions').click(function() {
		$(this).children('.game-instructions-info').toggle();
	})
};
game.addInstructionsClick();

// render the page
game.render = function() {
	game.removeGameOver();
	enemy.removeEnemies();
	game.increaseLevel();
	game.removeClue();
	game.hideProblem();
	game.info();
	runner.setRunnersPos();
	game.clearSolutionVal();
	game.hideProblem();
	game.changeImage();
	game.appendClueToGameManager.index = 0;
	game.removeCluesFromGameManager()
	game.showPoints();
	enemy.stopEnemyMovement();
	enemy.addEnemies();
};
game.render();


game.smoothMoves = {
	time: 0,
	tickRate: 30,
	keyArrowUp: false,
	keyArrowDown: false,
	keyArrowLeft: false,
	keyArrowRight: false
};

// get keycodes and run functions
$(window).on('keydown', function(e) {
	game.keyDown(e);
});

// click event on keyup
$(window).on('keyup', function(e) {
	game.keyUp(e);
});

// click handler to pause game
$('.pause').click(function() {
	game.pause();
})

// pause the game
game.pause = function() {
	if (game.pause.index % 2 === 0) {
		enemy.stopEnemyMovement();
		$(window).off('keydown');
		$(window).off('keyup');
	} else {
		enemy.startEnemyMovement();
		$(window).on('keydown', function(e) {
			game.keyDown(e)
		});
		$(window).on('keyup', function(e){
			game.keyUp(e);
		});
	}
	game.pause.index++;
}
game.pause.index = 0;

// function to call when keydown event fires
game.keyDown = function(eventObj) {
	var key = eventObj.which,
		timestamp = eventObj.timeStamp,
		timeDelta = eventObj.timeStamp - game.smoothMoves.time;

	if (key === 37 || key === 100 & !game.smoothMoves.keyArrowLeft) {
		game.smoothMoves.keyArrowLeft = true;
	} else if (key === 39 || key === 102 & !game.smoothMoves.keyArrowRight) {
		game.smoothMoves.keyArrowRight = true;
	} else if (key === 38 || key === 104 & !game.smoothMoves.keyArrowUp) {
		game.smoothMoves.keyArrowUp = true;
	} else if (key === 40 || key === 98 & !game.smoothMoves.keyArrowDown) {
		game.smoothMoves.keyArrowDown = true;
	} 

	switch(key) {
		case 53:
		case 101:
			game.checkClue();
			break;
		case 55:
		case 103:
			if (timeDelta > 700) {
				runner.jump(false); // jump left
				time = timestamp;
			}
			break;
		case 57:
		case 105:
			if (timeDelta > 700) {
				runner.jump(true); // jump right
				time = timestamp;
			}
			break;
		case 80:
			game.showProblem();
			break;
		case 72:
			game.hideProblem();
			break;
	}
};

// function to call when keyup event fires
game.keyUp = function(eventObj) {
	var key = eventObj.which,
		timestamp = eventObj.timeStamp,
		timeDelta = eventObj.timeStamp - game.smoothMoves.time;

	if (key === 37 || key === 100 & game.smoothMoves.keyArrowLeft) {
		game.smoothMoves.keyArrowLeft = false;
	} else if (key === 39 || key === 102 & game.smoothMoves.keyArrowRight) {
		game.smoothMoves.keyArrowRight = false;
	} else if (key === 38 || key === 104 & game.smoothMoves.keyArrowUp) {
		game.smoothMoves.keyArrowUp = false;
	}  else if (key === 40 || key === 98 & game.smoothMoves.keyArrowDown) {
		game.smoothMoves.keyArrowDown = false;
	} 
}

// smooth out the movement of the character
game.smoothMoves.tick = function() {
	if (game.smoothMoves.keyArrowRight) {
		runner.goRight();
	} else if (game.smoothMoves.keyArrowLeft) {
		runner.goLeft();
	} else if (game.smoothMoves.keyArrowUp) {
		runner.goUp();
	} else if (game.smoothMoves.keyArrowDown) {
		runner.goDown();
	} 

	setTimeout(game.smoothMoves.tick, game.smoothMoves.tickRate);
}
game.smoothMoves.tick();


// watch input to see if user has entered correct info
$('.solution').on('change', function(e) {
	var val = this.value;

	if (val) {
		val = val.replace(/[\']/gim, '"');
		val = val.replace(/[\s;]/gim, "");
	}

	if (val === clues[gv.level].solution) {
		game.increasePoints(100);
		game.render();
	}
});





// game ends here =============================================



	
}); // end of doc.ready
