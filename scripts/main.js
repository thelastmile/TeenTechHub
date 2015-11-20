$(function() {

	
	// control scrolling speed from nav bar to section
	$('a.pageDown, a.pageUp').click(function(e) {
		e.preventDefault();
		var $id = e.currentTarget.hash;

		if ($id) {
			$('html, body').animate({ scrollTop: $($id).offset().top }, 1000);
		}

	});

	// adjust the sizing on window.resize
	$('#game .overlay').css('height', window.innerHeight - 46);

	$(window).resize(function(e) {
		var $height = e.target.innerHeight;
		$('#game .overlay').css('height', $height - 46);
	});


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



});