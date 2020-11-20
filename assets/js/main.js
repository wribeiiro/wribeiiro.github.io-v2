;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {
		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	var counterWayPoint = function() {
		if ($('#mypage-counter').length > 0 ) {
			$('#mypage-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
			}
		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-mypage-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});
	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
			var container = $("#mypage-aside, .js-mypage-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {

				if ( $('body').hasClass('offcanvas') ) {

					$('body').removeClass('offcanvas');
					$('.js-mypage-nav-toggle').removeClass('active');
				
				}
			}
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-mypage-nav-toggle').removeClass('active');
			
	    	}
		});
	};

	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-mypage-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});
	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});
	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});
	};

	var sliderMain = function() {
		
	  	$('#mypage-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}
	  	});
	};

	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})
	};

	// Document on load.
	$(function(){
		fullHeight()
		counterWayPoint()
		contentWayPoint()
		burgerMenu()

		clickMenu()
		navigationSection()
		mobileMenuOutsideClick()
		sliderMain()
		owlCrouselFeatureSlide()
		fetchWorks()
	});

	function fetchWorks() {

		const personalWorks = {
			body: [
				{
					client: "React Weather",
					description: "",
					link: "https://react-weather-alpha.vercel.app/",
					image: "https://raw.githubusercontent.com/wribeiiro/react-weather/master/weather.jpg",
					class: "Website",
					tags: "React;Javascript;HTML;CSS;API",
				},
				{
					client: "Amazon Prime Video Clone",
					description: "",
					link: "https://amazon-prime-video-clone.vercel.app/",
					image: "https://raw.githubusercontent.com/wribeiiro/amazon-prime-video-clone/master/home.jpg",
					class: "Website",
					tags: "React;Javascript;HTML;CSS;API",
				},
				{
					client: "Clone Whatsapp Chat",
					description: "",
					link: "https://wribeiiro.com/clone-whatsapp/",
					image: "https://raw.githubusercontent.com/wribeiiro/clone-whatsapp/master/login.jpg",
					class: "System",
					tags: "PHP;Javascript;Jquery;HTML;CSS;BOOTSTRAP",
				},
				{
					client: "Danfe Generator",
					description: "",
					link: "https://wribeiiro.com/danfe-generator/",
					image: "https://raw.githubusercontent.com/wribeiiro/danfe-generator/master/screen.png",
					class: "System",
					tags: "PHP;PHP-NFE;API",
				},
				{
					client: "React Spotify Player",
					description: "",
					link: "https://react-spotify-rho.vercel.app/",
					image: "https://raw.githubusercontent.com/wribeiiro/react-spotify/master/player.jpg",
					class: "Website",
					tags: "React;Javascript;HTML;CSS;API",
				},
				{
					client: "React Evil",
					description: "",
					link: "https://react-evil.vercel.app/",
					image: "https://raw.githubusercontent.com/wribeiiro/react-evil/master/home.jpg",
					class: "Website",
					tags: "React;Javascript;HTML;CSS;API",
				},
			],
			code: 200
		}
		
		const pworkDiv = $(`#personal-work`)
		const workDiv  = $(`#mypage-work`)

		const createWorks = (data, div) => {

			console.log(data)
			
			let template = ``

			if (data.code === 200) {

				data.body.forEach(element => {

					let tags = ``;

					element.tags.split(';').forEach((myString) => tags += `<span><a rel="noopener" href="${element.link}" target="_blank">${myString}</a></span>`)
				
					template += `
					<div class="col-md-6">
						<div class="project" style="background-image: url('${element.image}'); height: 300px;">
							<div class="desc">
								<div class="con">
									<h3><a rel="noopener" href="${element.link}" target="_blank">${element.client}</a></h3>
									<span>${element.class}</span>
									<p class="icon">${tags}</p>
								</div>
							</div>
						</div>
					</div>
					`
				})
			}

			div.html(template)
		}

		const loader = (status, div) => {
			let template = ``

			if (status === 0) {
				template = `<div class="col-md-12 col-xs-12">
								<div class="project">
									Fetching works, please wait...
								</div>
							</div>`
			} 

			if (status === 1) {
				template = `<div class="col-md-12 col-xs-12">
								<div class="project">
									A error ocurred when trying to get works, try again later
								</div>
							</div>`
			}

			div.html(template)				
		}

		$.ajax({
			type: "GET",
			url: "https://www.wribeiiro.com/lumen-api/api/v1/work",
			dataType: "JSON",
			success: (response) => {
				createWorks(response, workDiv)
				createWorks(personalWorks, pworkDiv)
			},
			beforeSend: (xhr) => {
				xhr.setRequestHeader(`Authorization`, `Basic 69864bfe57e7a39e8ab90107a3bd0f75eb82bc009249dbb504f0af6058bd540650d3316476e5597fa4daa282250826c569e8bddd22a20d43ec5b3a605e6bedb8gstI9JsMCW3Yr04o0P2JKJyJKSCCk1RUQBn6Ic7DEuVynLVoaLfXxEkoZe5PCAwC`)
				loader(0, workDiv)
				loader(0, pworkDiv)
			},
			error: () => {
				loader(1, workDiv)
				loader(1, pworkDiv)
			},
			complete: () => {}
		})
	}
}());