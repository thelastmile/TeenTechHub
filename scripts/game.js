$(function() {


// set height of background to window's height
$('.game-container').css('height', window.innerHeight - 10);
// $('.game-container').css('min-height', 650);
$(window).resize(function(e) {
	$('.game-container').css('height', e.target.innerHeight);
	// $('.game-container').css('min-height', 650);
});


// game begins here ===============================================
var level = -1,
	clueSize = 20,
	points = 0,
	enemySize = 20;


// go up a level
var increaseLevel = function() {
	level++;
};

var decreaseLevel = function() {
	level--;
};


// set runners starting position
var setRunnersPos = function() {
	$('.female-runner').css('top', clues[level].top);
};


// change the runners image to left or right
var flipRunner = function(pos) {
	if (flipRunner.currPos !== pos) {
		if (pos === 0) { // running right
			$('#runner1').prop('src', '../images/runner_right_2.gif');
			flipRunner.currPos = 0;
		} else if (pos === 1) { // running left
			$('#runner1').prop('src', '../images/runner_left_2.gif');
			flipRunner.currPos = 1;
		} else if (pos === 2) { // standing still right
			$('#runner1').prop('src', '../images/runner2.gif');
			flipRunner.currPos = 2;
		} 
	}
};
flipRunner.currPos = 0;


// add enemies
var addEnemies = function() {
	for (var key in enemies) {
		var rand = parseInt(bcgSize * Math.random()) + 150; 
		var enemy = $('<img src="' + enemies[key].src + '" class="enemy" id="' + enemies[key].id + '" />')
			.css({
				top: enemies[key][level],
				left: rand + 'px',
				position: 'absolute',
				zIndex: 100,
				width: 20
			});

		$('.game-container').append(enemy);
	}
	setInterval(moveEnemiesLeft, 500)
};

var stopEnemyMovement = function() {
	
};

// move enemies left
var moveEnemiesLeft = function(num, time) {
	var $enemies = $('.enemy'),
		num = num || 2,
		time = time || 10,
		runnerPos = parseInt($('#runner1').css('left')),
		runnerTopPos = parseInt($('#runner1').css('top'));

	for (var key in enemies) {
		var enemy = $('#' + enemies[key].id),
			enemyLoc = parseInt(enemy.css('left')),
			enemyTopLoc = parseInt(enemy.css('top')),
			bcgLoc = parseInt($('.bcg').css('left')),
			rand = parseInt(bcgSize * Math.random()) + 100;

		if (enemyLoc - bcgLoc <= 0) {
			enemy.css('left', 550 + 'px');
		} else {
			enemy.animate({
				left: "-=" + num
			}, time)
		}
		if (enemyLoc >= runnerPos && enemyLoc <= runnerPos + 10 && enemyTopLoc >= runnerTopPos && enemyTopLoc <= runnerTopPos + 10) {
			runner.die();
			break;
		}
	}
};

// move enemies right
var moveEnemiesRight = function(num, time) {
	var $enemies = $('.enemy'), 
		num = num || 2,
		time = time || 10,
		runnerPos = parseInt($('#runner1').css('left')),
		runnerTopPos = parseInt($('#runner1').css('top'));

	for (var key in enemies) {
		var enemy = $('#' + enemies[key].id),
			enemyLoc = parseInt(enemy.css('left')),
			enemyTopLoc = parseInt(enemy.css('top')),
			bcgLoc = parseInt($('.bcg').css('left'));

		if (enemyLoc - bcgLoc <= 0) {
			enemy.css('left', 550 + 'px');
		} else {
			enemy.animate({
				left: "+=" + num
			}, time)
		}
		if (enemyLoc >= runnerPos && enemyLoc <= runnerPos + 10 && enemyTopLoc >= runnerTopPos && enemyTopLoc <= runnerTopPos + 10) {
			runner.die();
			break;
		}
	}
};


// remove enemies 
var removeEnemies = function() {
	$('.enemy').remove();
};


var runner = {};

// kill runner and restart game
runner.die = function() {
	$('#runner1').animate({
		top: -100,
		opacity: 0
	}, 1000, function()	{
		$(this).css('opacity', 1);

		// restart game after being killed
		setTimeout(function() {
			$('.game-over').click(function() {
				decreaseLevel();
				render();
				$('.game-over').remove();9
			})
		}, 1100)
	});

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
		color: 'white'
	});

	$('.clue-area').append(p);


};

// make runner jump
runner.jump = function(way) {
	var m = clues[level].move, 
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top')),
		possibleTops = [];

	for (var i = 0; i < clues[level].move.length; i++) {
		var tops = clues[level].move[i];

		if (tops) {
			possibleTops.push(tops.y)
		}
	}

	if (possibleTops.indexOf($runPos) > -1) {
		// jump right
		if (way && $bcgPos > -bcgSize + 45 && $runPos) {
			flipRunner(0);
			
			$('.female-runner').animate({
				top: "-=" + 35
			}, 300)

			$('.bcg').animate({
				left: "-=" + 45
			}, 500)
			
			$('.female-runner').animate({
				top: $runPos
			}, 300)

			moveEnemiesLeft(45, 500);

		// jump left
		} else if (!way && $bcgPos < -45) {
			flipRunner(1);

			$('.female-runner').animate({
				top: "-=" + 35
			}, 300)

			$('.bcg').animate({
					left: "+=" + 45
				}, 500)
			
			$('.female-runner').animate({
				top: $runPos
			}, 300)

			moveEnemiesRight(45, 500);
		}
	}
};

// move runner down
runner.goDown = function() {
	var m = clues[level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top'));

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
	var m = clues[level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top'));

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
	var m = clues[level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top'));

	flipRunner(0);

	for (var i = 0; i < m.length; i++) {
		var mi = m[i];

		if ($bcgPos <= mi.x && $bcgPos > mi.x - mi.width + 4 && $runPos > mi.y - 1 && $runPos < mi.y + mi.height + 1) {

			$('.bcg')
			.animate({
				left: "-=" + 2
			}, 10)

			moveEnemiesLeft();
		}
	}
};

// move runner left, which actually moves the background right
runner.goLeft = function() {
	var m = clues[level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top'));

	flipRunner(1);

	for (var i = 0; i < m.length; i++) {
		var mi = m[i];

		if ($bcgPos < mi.x && $bcgPos >= mi.x - mi.width - 4 && $runPos > mi.y - 1 && $runPos < mi.y + mi.height + 1) {

			$('.bcg').animate({
				left: "+=" + 2
			}, 10)

			moveEnemiesRight();
		}
	}
};




// show points on screen
var showPoints = function() {
	$('.info-points').text(points);
};


// increase points
var increasePoints = function(num) {
	points += num || 10;

	showPoints();
};


// remove all clues from .clue-area
var removeClue = function() {
	$('.clue-area .clue').remove();
};


// hide all previous clues from .clue-area
var hideClue = function() {
	var $clues = $('.clue-area .clue');

	for (var i = 0; i < $clues.length; i++) {
		$clues.eq(i).hide();
	}
};


// append the clue to .clue-area
var addClue = function(clueObj) {
	hideClue();

	var alreadyExists = $('#' + clueObj.id);

	if (alreadyExists.length === 0) {
		var that = $('<p />', { id: clueObj.id, class: "clue" });
		that.html(clueObj.clue).appendTo('.clue-area').fadeOut(15000);
		info();
	} else {
		alreadyExists.show().fadeOut(15000);
	}
};


// check to see if there is a clue
var checkClue = function() {
	var $bcgPos = parseInt($('.bcg').position().left),
		$topPos = parseInt($('.female-runner').css('top')),
		clueArr = clues[level].clues;

	for (var i = 0; i < clueArr.length; i++) {
		var clue = clueArr[i];

		if (($bcgPos >= clue.left - clueSize && $bcgPos <= clue.left + clueSize && clue.top === null) || 
			($bcgPos >= clue.left - clueSize && $bcgPos <= clue.left + clueSize && $topPos >= clue.top - clueSize && $topPos <= clue.top + clueSize)) {
			addClue(clue);
			increasePoints();
		}
	}
};


// check if the number of clues remaining is 0
var foundAllClues = function() {
	var len = clues[level].clues.length,
		$cluesRemaining = len - $('.clue').length;

	if ($cluesRemaining === 0) {
		$('.prob-area .problem').html(clues[level].problem);
		$('.prob-area').show();
		clearSolutionVal();
		stopEnemyMovement();
		$('.solution').focus();
		setTimeout(function() {
			$('.solution').val('');
		}, 10);
	}
};


// changes the game image
var changeImage = function() {
	var $bcg = $('.bcg');

	if ($bcg.length <= 0) {
		$('.game-container').append(clues[level].image);
		$('.female-runner').css('top', clues[level].top)
	} else {
		$bcg.remove();
		$('.game-container').append(clues[level].image);
		$('.female-runner').css('top', clues[level].top)
	}
	setRunnersPos();
};


// clear .solutions value
var clearSolutionVal = function() {
	$('.solution').val('');
};


// hide .prob-area
var hideProblem = function() {
	$('.prob-area').hide();
	$('.problem').text('');
};


// prints info in .info section
var info = function() {
	$('.info-level').text(level + 1);

	var $len = $('.clue').length;
	$('.info-clues').text(clues[level].clues.length - $len)
	foundAllClues()
};

// remove the game over <p>
var removeGameOver = function() {
	$('.game-over').remove();
}

// render the page
var render = function() {
	removeGameOver();
	removeEnemies();
	increaseLevel();
	removeClue();
	hideProblem();
	info();
	clearSolutionVal();
	hideProblem();
	changeImage();
	showPoints();
	addEnemies();
};
render();


var time = 0,
	tickRate = 30,
	keyArrowUp = false,
	keyArrowDown = false,
	keyArrowLeft = false,
	keyArrowRight = false;

// get keycodes and run functions
$(window).on('keydown', function(e) {
	var key = e.which,
		timestamp = e.timeStamp,
		timeDelta = e.timeStamp - time;

	if (key === 37 || key === 100 & !keyArrowLeft) {
		keyArrowLeft = true;
	} else if (key === 39 || key === 102 & !keyArrowRight) {
		keyArrowRight = true;
	} else if (key === 38 || key === 104 & !keyArrowUp) {
		keyArrowUp = true;
	} else if (key === 40 || key === 98 & !keyArrowDown) {
		keyArrowDown = true;
	} 

	switch(key) {
		case 53:
		case 101:
			checkClue();
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
	}
});


$(window).on('keyup', function(e) {
	var key = e.which,
		timestamp = e.timeStamp,
		timeDelta = e.timeStamp - time;

	if (key === 37 || key === 100 & keyArrowLeft) {
		keyArrowLeft = false;
	} else if (key === 39 || key === 102 & keyArrowRight) {
		keyArrowRight = false;
	} else if (key === 38 || key === 104 & keyArrowUp) {
		keyArrowUp = false;
	}  else if (key === 40 || key === 98 & keyArrowDown) {
		keyArrowDown = false;
	} else if (key === 53 || key === 101) {
		key5 = false;
	} 
});


var tick = function() {
	if (keyArrowRight) {
		runner.goRight();
	} else if (keyArrowLeft) {
		runner.goLeft();
	} else if (keyArrowUp) {
		runner.goUp();
	} else if (keyArrowDown) {
		runner.goDown();
	} 

	setTimeout(tick, tickRate);
}
tick();


// watch input to see if user has entered correct info
$('.solution').on('change', function(e) {
	var val = this.value;

	if (val) {
		val = val.replace(/[\']/gim, '"');
		val = val.replace(/[\s;]/gim, "");
	}

	if (val === clues[level].solution) {
		increasePoints(100);
		render();
	}
});





// game ends here =============================================



	
}); // end of doc.ready
