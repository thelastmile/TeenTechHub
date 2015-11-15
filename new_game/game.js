$(function() {
	// set height of background to window's height
	$('.game-container').css('height', window.innerHeight - 10);
	$(window).resize(function(e) {
		$('.game-container').css('height', e.target.innerHeight);
	});


	// game begins here ===============================================
	var level = 0;
	var clueSize = 20;
	var bcgSize = 1435;


	// clues array contains object indicating where clues
	// are located and what information they contain
	var clues = [
		{ 
			image: '<img class="bcg" src="../images/game1.jpg" />',
			top: 107,
			problem: 'Create a variable called myVar and assign it the value \'my first variable\'',
			solution: 'varmyVar=\"myfirstvariable\"',
			move: [
				{ x: -5, width: bcgSize, y: 107, height: 0 }
			],
			clues: [
				{ id: 'clue1', left: -145, top: null, clue: "Good job...you found your first clue. To understand and use Javascript, you must first understand variables. So, throughout level 1, you will be learning about variables." },
				{ id: 'clue2', left: -600, top: null, clue: "Variables are like buckets of water, except they hold information, not water." },
				{ id: 'clue3', left: -900, top: null, clue: "Variables are declared and assigned values." },		
				{ id: 'clue4', left: -1420, top: null, clue: "To declare a variable and assign it a value, just type: <p>var anyNameIChoose = 'some value';" }
			]
		},  
		{
			image: '<img class="bcg" src="../images/game2.jpg" />',
			top: 107,
			problem: 'not yet',
			solution: '',
			move: [
				{ x: -5, width: bcgSize, y: 107, height: 0 },
				{ x: -795, width: 20, y: 107, height: 40 }, 
				{ x: -5, width: bcgSize, y: 127, height: 70 }
			],
			clues: [
				{ id: 'clue1', left: -260, top: null, clue: "Good job...you found your first clue. To understand and use Javascript, you must first understand variables. So, throughout level 1, you will be learning about variables." },
				{ id: 'clue2', left: -640, top: null, clue: "Variables are like buckets of water, except they hold information, not water." },
				{ id: 'clue2', left: -635, top: null, clue: "Javascript variables are like buckets that hold information." },		
				{ id: 'clue2', left: -925, top: null, clue: "Javascript variables are like buckets that hold information." }
			]
		}
	]


	// go up a level
	var changeLevel = function() {
		level++;
	};


	// move runner down
	var goDown = function() {
		m = clues[level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').position().top);

		for (var i = 0; i < m.length; i++) {
			var mi = m[i];

			if ($bcgPos - 5 <= mi.x && $bcgPos >= mi.x - mi.width && $runPos >= mi.y && $runPos < mi.y + mi.height) {

				$('.female-runner').animate({
					top: "+=" + 5
				}, 10)
			}
		}
	};


	// move runner up
	var goUp = function() {
		m = clues[level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').position().top);

		for (var i = 0; i < m.length; i++) {
			var mi = m[i];

			if ($bcgPos - 5 <= mi.x && $bcgPos >= mi.x - mi.width && $runPos > mi.y && $runPos <= mi.y + mi.height) {

				$('.female-runner').animate({
					top: "-=" + 5
				}, 10)
			}
		}
	};


	// move runner right, which actually moves the background left
	var goRight = function() {
		m = clues[level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').position().top);

		for (var i = 0; i < m.length; i++) {
			var mi = m[i];

			if ($bcgPos - 5 <= mi.x && $bcgPos >= mi.x - mi.width + 1 && $runPos > mi.y - 1 && $runPos < mi.y + mi.height + 1) {
				$('.bcg').animate({
					right: "+=" + 5
				}, 10)
			}
		}
	};


	// move runner left, which actually moves the background right
	var goLeft = function() {
		m = clues[level].move,
		$bcgPos = parseInt($('.bcg').position().left),
		$runPos = parseInt($('.female-runner').position().top);

		for (var i = 0; i < m.length; i++) {
			var mi = m[i];

			if ($bcgPos - 5 < mi.x && $bcgPos > mi.x - mi.width - 1 && $runPos > mi.y - 1 && $runPos < mi.y + mi.height + 1) {
				$('.bcg').animate({
					right: "-=" + 5
				}, 10)

			}
		}

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
		var $bcgPos = parseInt($('.bcg').position().left);
		var clueArr = clues[level].clues;

		for (var i = 0; i < clueArr.length; i++) {
			var clue = clueArr[i];

			if ($bcgPos >= clue.left - clueSize && $bcgPos <= clue.left + clueSize && clue.top === null || $bcgPos >= clue.left - clueSize && $bcgPos <= clue.left + clueSize && $bcgPos >= clue.top - clueSize && $bcgPos <= clue.top + clueSize) {
				addClue(clue);
			}
		}
	};


	// check if the number of clues remaining is 0
	var foundAllClues = function() {
		var len = clues[level].clues.length;
		var $cluesRemaining = len - $('.clue').length;

		if ($cluesRemaining === 0) {
			$('.prob-area .problem').html(clues[level].problem);
			$('.prob-area').show();
			clearSolutionVal();
			$('.solution').val('');
			// $('.solution').focus();
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
		// $('.info-time').text()
	};
	info();


	// render the page
	var render = function() {
		changeLevel();
		removeClue();
		hideProblem();
		info();
		clearSolutionVal();
		hideProblem();
		changeImage();
	};


	// get keycodes and run functions
	$(window).on('keydown', function(e) {
		var key = e.keyCode;

		switch (key) {
			case 37:
				goLeft();
				break;
			case 38: 
				goUp();
				break;
			case 39:
				goRight();
				break;
			case 40:
				goDown();
				break;
			case 53:
			case 101:
				checkClue();
				break;
		}
	});


	// watch input to see if user has entered correct info
	$('.solution').on('change', function(e) {
		var val = this.value;

		if (val) {
			val = val.replace(/[\']/gim, '"');
			val = val.replace(/[\s]/gim, "");
		}

		if (val === clues[level].solution) {
			render();
		}
	});








	// game ends here =============================================



});