$(function() {

// images array that holds all the objects used in
// our images
var	images = [
		{ 
			id: 0, 
			src: '../images/fantasy1_clues.jpg', 
			problem: 'Create a variable named princess that holds the string \'help me\':',
			solution: 'varprincess=helpme',
			firstClue: 'Check the princesses only light source for your first clue.',
			clues: [ 
				{
					id: 'clue1', coords: {x: 85, y: 46}, text: '<p class=\'font-bold\'>Clue #1: Variables</p><p>Think of variables as buckets.  Just like a bucket holds water, variables hold information.</p><p>Your next clue can be found in the sky on a bright night.</p>' 
				}, 
				{ 
					id: 'clue2', coords: {x: 28, y: 14}, text: '<p class=\'font-bold\'>Clue #2: Declaring a variable</p>Declaring, or creating, a variable in javascript is easy, just type:</p><p class=\'font-blue\'>var variableName;</p><p>Where variable name is anything that you choose.</p><p>Your next clue can be found where the pollen grows.</p>'
				},
				{
					id: 'clue3', coords: {x: 38, y: 27}, text: '<p class=\'font-bold\'>Clue #3: Assigning a Value</p><p>To assign a value to a variable, just type:</p><p class=\'font-blue\'>var bucket = \'apples\'</p><p>Now your bucket variable contains the string \'apples\'</p><p>Your next clue sits on the stairway to the world below.</p>' 
				}, 
				{ 
					id: 'clue4', coords: {x: 71, y: 78}, text: '<p class=\'font-bold\'>Clue #4: Variable assignment</p><p>Congratulations! You found the last clue.</p><p>So, we should now know how to create a variable:</p><p class=\'font-blue\'>var princess = \'help me\';</p><p>You should be able to crack the code. Enter it below.</p>'
				}
			]
		},
		{ 
			id: 1, 
			src: '../images/fantasy2_clues.jpg', 
			problem: 'Create a variable named princess that holds the number 40:',
			solution: '40',
			clues: [ 
				{
					id: 'clue1', coords: {x: 78.2, y: 46.2}, text: '<p class=\'font-bold\'>Clue #1: Variables</p><p></p>' 
				}, 
				{ 
					id: 'clue2', coords: {x: 32.5, y: 14}, text: '<p class=\'font-bold\'>Clue #2: Declaring a variable</p><p></p>'
				},
				{
					id: 'clue3', coords: {x: 24, y: 52}, text: '<p class=\'font-bold\'>Clue #3: Assigning a Value</p><p></p>' 
				}, 
				{ 
					id: 'clue4', coords: {x: 67, y: 79}, text: '<p class=\'font-bold\'>Clue #4: Variable assignment</p></p>'
				}
			]
		}

	];

	var imageNum = 0;
	var image = images[imageNum];
	var clueNum = 0;

	// increment imageNum by 1
	var incrementImageNum = function() {
		imageNum++;
		image = images[imageNum];
	};


	// decrement imageNum by 1
	var decrementImageNum = function() {
		imageNum--;
	};


	// change image from images array and adds text
	// for quiz problem
	var changeImage = function() {
		if (imageNum > 0) {
			$('#image-here img, .solve-code').fadeOut(2000, function() {
				$(this).attr('src', image.src).fadeIn(2000);
				$('.problem').text(image.problem).hide();
			});
		}
		$(window).resize(function(e) {
			$('#image-here img').css('height', e.target.innerHeight);
		});
	};


	// create div and label
	var createClue = function() {
		var str = "";

		if (image.clues) {
			for (var i = 0; i < image.clues.length; i++) {
				var clue = image.clues[i];
				$('<div />', {
					id: clue.id,
				}).css({
					position: 'absolute',
					right: clue.coords.x + '%',
					top: clue.coords.y + '%',
				})
				.appendTo('div.clues')
				.append('<label>' + clue.text + '</label>')
			}
		} 
		$('#first-clue').text(image.firstClue);
	};


	// remove all clues
	var removeClues = function() {
		$('.clues').children().remove();
	};


	// create problem and its inputs
	var showProblem = function() {
		$('.solve-code, .problem, #solution-input').show(2000);
	};

	var hideProblem = function() {
		$('.solve-code').hide();
		$('#solution-input').hide();
	};


	// clear the user inputs value
	var clearVal = function() {
		$('#solution-input').val('');
	};


	// add a mouseover event to attach
	// to each clue
	var addMouseoverEvent = function() {
		$('.clues div:last-child').on('mouseover', function() {
			showProblem();
		})
	};


	// render page
	var render = function() {
		changeImage();
		removeClues();
		createClue();
		clearVal();
		hideProblem();
		addMouseoverEvent()
	}
	render();


	// check solution, if correct, change image,
	// quiz problem, and clues by calling render
	var checkSolution = function(code) {
		var newCode = code.replace(/[\s\'\";]/gim, "");
		if (image.solution == newCode) {
			incrementImageNum();
			render();
		} else {
			$('.error-text').css('display', 'block').fadeOut(3000);
		}
	};

	$('#solution-input').on('change', function(e) {
		checkSolution(e.target.value);
	});


	$('#image-here img').css('height', window.innerHeight-150);
	$(window).resize(function(e) {
		$('#image-here img').css('height', e.target.innerHeight);
	});

});