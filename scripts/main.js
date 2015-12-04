$(function() {

	
	// control scrolling speed from nav bar to section
	$('a.pageDown, a.pageUp').click(function(e) {
		e.preventDefault();
		var $id = e.currentTarget.hash;

		if ($id) {
			$('html, body').animate({ scrollTop: $($id).offset().top }, 1000);
		}

	});

	// adjust the sizing on window.resize of the games 
	// overlay and background
	// $('#game .overlay, #game .homeSlide').css({
	// 	height: document.body.scrollHeight - 40,
	// });

	// $(window).resize(function(e) {
	// 	$('#game .overlay').css({
	// 		height: document.body.scrollHeight - 40,
	// 	})
	// });


	// add class active to the active link on the navbar
	$('nav li a').click(function() {
		$('nav li').removeClass('active');
		$(this).parent().addClass('active');
	});


	// changes #youth-programs viewable data
	$('.program-nav ul li').click(function(e) {
		var id = e.target.id;

		$('.prog-active').addClass('hidden').removeClass('prog-active');

		$('.' + id).removeClass('hidden').addClass('prog-active');
	})


	// add class active to the active link on the prog-nav
	$('.program-nav li').click(function() {
		$('.program-nav li').removeClass('active');
		$(this).addClass('active');
	});


	// toggle navigation
	var $input = $('#nav-check'),
		$nav = $("#nav-ul"),
		$navLabel = $('#nav-label');

	$input.on('click', function(e) {
		if ($input[0].checked) {
			$nav.css('left', '0')
			$nav.slideDown('fast', function() {
				$nav.css('display', 'block');
			})
		} else {
			$nav.slideUp('fast', function() {
				$nav.css('display', 'none');
			})
		}
	})


	// when you click on the nav's li, it routes to the a link
	$('ul.nav > li').click(function() {
		$(this).children()[0].click();
	})








});