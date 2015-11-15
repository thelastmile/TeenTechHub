$(function() {

	
	// control scrolling speed from nav bar to section
	$('a.pageDown, a.pageUp').click(function(e) {
		e.preventDefault();
		var $id = e.currentTarget.hash;

		$('html, body').animate({ scrollTop: $($id).offset().top }, 1000);
	});

	// adjust the sizing of the parallax image on window.resize
	$('.homeSlide').css('height', window.innerHeight);
	$(window).resize(function(e) {
		$('.homeSlide').css('height', e.target.innerHeight);
	});








});