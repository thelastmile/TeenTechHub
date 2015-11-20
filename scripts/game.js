$(function() {


// set height of background to window's height
$('.game-container').css('height', window.innerHeight - 10);
$(window).resize(function(e) {
	$('.game-container').css('height', e.target.innerHeight);
});


// game begins here ===============================================
var level = -1,
	clueSize = 20,
	points = 0;


// go up a level
var changeLevel = function() {
	level++;
};


// set runners starting position
var setRunnersPos = function() {
	$runPos = $('.female-runner').css('top', clues[level].top);
};


// change the runners image to left or right
var flipRunner = function(pos) {
	if (flipRunner.currPos !== pos) {
		if (pos === 0) {
			$('#runner1').prop('src', '../images/runner_right_2.gif');
			flipRunner.currPos = 0;
		} else if (pos === 1) {
			$('#runner1').prop('src', '../images/runner_left_2.gif');
			flipRunner.currPos = 1;
		} else if (pos === 2) {
			$('#runner1').prop('src', '../images/runner_right_2.gif');
			flipRunner.currPos = 2;
		} else if (pos === 3) {
			$('#runner1').prop('src', '../images/runner_left_2.gif');
			flipRunner.currPos = 3;
		}
	}
};
flipRunner.currPos = 0;



// make runner jump
var jump = function(way) {
	var m = clues[level].move, 
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top'));

	if (way && $bcgPos < -20 && $bcgPos > -bcgSize + 20) {
		flipRunner(0);
		
		$('.female-runner').animate({
			top: "-=" + 20
		}, 100)

		$('.bcg').animate({
			left: "-=" + 20
		}, 200)
		
		$('.female-runner').animate({
			top: $runPos
		}, 300)
	} else if (!way && $bcgPos < -20 && $bcgPos > -bcgSize + 20) {
		flipRunner(1);

		$('.female-runner').animate({
			top: "-=" + 20
		}, 100)

		$('.bcg').animate({
				left: "+=" + 20
			}, 200)
		
		$('.female-runner').animate({
			top: $runPos
		}, 300)
	}
};


// move runner down
var goDown = function() {
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
var goUp = function() {
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
var goRight = function() {
	var m = clues[level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top'));

	flipRunner(0);

	for (var i = 0; i < m.length; i++) {
		var mi = m[i];

		if ($bcgPos <= mi.x && $bcgPos > mi.x - mi.width + 4 && $runPos > mi.y - 1 && $runPos < mi.y + mi.height + 1) {

			$('.bcg')
			.animate({
				left: "-=" + 3
			}, 50)
		}
	}
};


// move runner left, which actually moves the background right
var goLeft = function() {
	var m = clues[level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').css('top'));

	flipRunner(1);

	for (var i = 0; i < m.length; i++) {
		var mi = m[i];

		if ($bcgPos < mi.x && $bcgPos >= mi.x - mi.width - 4 && $runPos > mi.y - 1 && $runPos < mi.y + mi.height + 1) {

			$('.bcg').animate({
				left: "+=" + 3
			}, 50)
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
		// $('.solution').val('');
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


// render the page
var render = function() {
	changeLevel();
	removeClue();
	hideProblem();
	info();
	clearSolutionVal();
	hideProblem();
	changeImage();
	showPoints();
};
render();


var time = 0;
// get keycodes and run functions
$(window).on('keydown', function(e) {
	var key = e.keyCode,
		timestamp = e.timeStamp,
		timeDelta = e.timeStamp - time;

	switch (key) {
		case 37:
		case 100:
			if (timeDelta > 50) {
				goLeft();
				time = timestamp;
			}
			break;
		case 38: 
		case 104:
			goUp();
			break;
		case 39:
		case 102:
			if (timeDelta > 50) {
				goRight();
				time = timestamp;
			}
			break;
		case 40:
		case 98:
			goDown();
			break;
		case 53:
		case 101:
			checkClue();
			break;
		case 55:
		case 103:
			if (timeDelta > 500) {
				jump(false);
				time = timestamp;
			}
			break;
		case 57:
		case 105:
			if (timeDelta > 500) {
				jump(true);
				time = timestamp;
			}
			break;
	}
});


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
