var lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
});

$(document).ready(function(){

$('form').on('change','.js-onchange-submit', function(){
	$(this).closest('form').submit();
});

$('[rel=tooltip]').hover(function(){
	el = $(this)
	$(el).offset().left
	$('#'+$(el).attr('href')).css({
		'left': $(el).offset().left+$(el).width(),
		'top': $(el).offset().top+$(el).height()
	}).fadeIn()
}, function(){
	el = $(this)
	$('#'+$(el).attr('href')).hide();
}).click(function(){return false;})

/* sliders */

$('.main-slider').owlCarousel({
	items: 1,
	lazyLoad: true,
	nav: true,
	dots: false,
	loop: true
});

$('.carousel-slider').owlCarousel({
	lazyLoad: true,
	nav: true,
	responsive: {
		0: {
			slideBy: 1,
			items: 1,
			nav: false
		},
		550: {
			slideBy: 2,
			items: 2,
			nav: false,
			margin: 5
		},
		850: {
			slideBy: 3,
			items: 3,
			margin: 10
		},
		1170: {
			slideBy: 4,
			items: 4,
			margin: 22
		}
	}
});

var carSLider = $('.car-slider').owlCarousel({
	items: 1,
	autoHeight: true,
	lazyLoad: true,
	nav: true,
	dots: false,
	onChanged: function(prop){
		$('.car-images-other-img.active').removeClass('active');
		$('.car-images-other-img:eq(' + prop.item.index + ')').addClass('active');
	}
});

$('.car-images-other-img').click(function(){
	carSLider.trigger('to.owl.carousel', [$(this).index(),300]);
});

var videogallery = $('.videogallery-slider').owlCarousel({
	items: 1,
	video: true,
	nav: false,
	dots: false,
	lazyLoad:true,
	onInitialized: function(el){
		$('.owl-item:eq('+el.item.index+') .owl-video-play-icon').click()
	}
})
$('.videogallery-thumbs').owlCarousel({
	items: 1,
	nav: false,
	dots: true,
	autoHeight: true,
	lazyLoad:true
})

$('.videogallery-thumbs-main').owlCarousel({
	items: 4,
	nav: true,
	dots: true,
	lazyLoad:true,
	slideBy: 4,
	responsive: {
		0: {
			slideBy: 1,
			items: 1,
			nav: false
		},
		550: {
			slideBy: 2,
			items: 2,
			nav: false,
			margin: 5
		},
		850: {
			slideBy: 3,
			items: 3,
			margin: 10
		},
		1170: {
			slideBy: 4,
			items: 4,
			margin: 22
		}
	}
})

$('.videogallery-thumbs .videogallery-thumbs-item').click(function(){
	$('.videogallery-thumbs-item.current').removeClass('current')
	$(this).addClass('current')
	videogallery.trigger('to.owl.carousel', $(this).data('num'))
	$('.videogallery-slider .owl-item:nth-child('+$(this).data('num')+') .owl-video-play-icon').click()
})



$('.podbor-slider-item').each(function(i, el){
	var min 	= $('.podbor-slider',el).data('min')
			max 	= $('.podbor-slider',el).data('max')
			from 	= $('.podbor-slider',el).data('from')
			to 		= $('.podbor-slider',el).data('to')

	$('.podbor-slider',el).slider({
		range: true,
		min: min,
		max: max,
		values: [from, to],
		slide: function( event, ui ) {
			$('.js-podbor-from', el).val(ui.values[ 0 ]);
			$('.js-podbor-to', el).val(ui.values[ 1 ]);
    },
    create: function( event, ui ) {
			$('.js-podbor-from', el).val(from);
			$('.js-podbor-to', el).val(to);
    },
    stop: function() {
    	$('.side-filter').submit()
    }
	});
	$('.js-podbor-from,.js-podbor-to', el).change(function(){
		from 	= Number($('.js-podbor-from', el).val())
		to 		= Number($('.js-podbor-to', el).val())
		from 	= (from >= min) ? from : min
		to 		= (to <= max) ? to : max
		$('.js-podbor-from', el).val(from)
		$('.js-podbor-to', el).val(to)
		$('.podbor-slider',el).slider( "values", [ from,  to ] );
	});
});

$('.filter-slider-item').each(function(i, el){
	var min 	= $('.filter-slider',el).data('min')
			max 	= $('.filter-slider',el).data('max')
			from 	= $('.filter-slider',el).data('from')
			to 		= $('.filter-slider',el).data('to')

	$('.filter-slider',el).slider({
		range: true,
		min: min,
		max: max,
		values: [from, to],
		slide: function( event, ui ) {
			$('.js-slider-from', el).val(ui.values[ 0 ]);
			$('.js-slider-to', el).val(ui.values[ 1 ]);
    },
    create: function( event, ui ) {
			$('.js-slider-from', el).val(from);
			$('.js-slider-to', el).val(to);
    },
    stop: function() {
    	$('.side-filter').submit()
    }
	});
	$('.js-slider-from,.js-slider-to', el).change(function(){
		from 	= Number($('.js-slider-from', el).val())
		to 		= Number($('.js-slider-to', el).val())
		from 	= (from >= min) ? from : min
		to 		= (to <= max) ? to : max
		$('.js-slider-from', el).val(from)
		$('.js-slider-to', el).val(to)
		$('.filter-slider',el).slider( "values", [ from,  to ] );
	});
});

$('.js-select-model').change(function(){
	var mark = $(this).val();
	if(mark == 0) {
		$('select[name=model] option:first').prop('selected',true)
		$('select[name=model]').prop('disabled',true)
	} else {
		$.ajax({
			type: "POST",
			url: "/select-model/",
			data: {
				'mark': mark
			},
			success: function(back) {
				$('select[name=model]').html(back).removeAttr('disabled')
			}
		});
	}
});

$('.js-faq-toggle').click(function(){$(this).closest('.js-faq-item').toggleClass('faq-item_opened');});

$('.m-menu-toggle').click(function(){
	$('.mainmenu').slideToggle();
});

$('body').on('click', '[data-toggle]', function(){
	$el = $(this);
	($el.data('toggle-class')) ? $($el.data('toggle')).toggleClass($el.data('toggle-class')) : $($el.data('toggle')).slideToggle();
	if($el.data('toggle-self')) $el.toggleClass($el.data('toggle-self'));
	return false;
});

setDeliveryItems = function(){
	$('.delivery-steps-item-desc').each(function(i,item){
		$(item).css('top', $(this).prev('.delivery-steps-item').position().top+$(this).prev('.delivery-steps-item').height())
	});
}
$(window).resize(setDeliveryItems).load(setDeliveryItems);

$('.delivery-steps-item').click(function(){
	$(this).siblings('.delivery-steps-item').removeClass('delivery-steps-item_opened');
});



/* valid */

	valid = function(frm) {
		$('[required]',frm).removeClass('signal');
		var fld = $('.required',frm).filter(function() { return !this.value; });
		if(fld.length==0) return true;
		else {
			for(i=0; i<fld.length; i++) $(fld[i]).addClass('signal');
			$(fld[0]).focus();
			return false;
		}
	}
	$('.popup .close, .fade, .popup-close').click(function(){
		$('.fade, .popup-error, .popup-confirm').hide(); $('.popup').fadeOut(200);
		return false;
	});
	$(document).keyup(function(e) {	if (e.keyCode == 27) $('.fade').click(); });
	$('.poplink').click(function(){
		$('.fade').show();
		popup = $($(this).attr('href'));
		if($(this).data('field'))
			$.each($(this).data('field'), function(i, item) {
    		$('input[name=' + item.name + ']',popup).val(item.val);
			});
		$(popup).css({top: $(window).scrollTop(), opacity: 0}).show().animate({top: "+=50",opacity: 1},300,"linear");
		return false;
	});
	$('.ajaxform').prepend('<div class="popup-error" /><div class="popup-confirm" />');
	$('.ajaxform').submit(function(){
		var formLay = $(this),
				errorMessage = $(formLay).data('error'),
				okMessage = $(formLay).data('ok'),
				invalidMessage = $(formLay).data('invalid'),
				data = $(formLay).serializeArray();
		if($(formLay).data('addform'))
			data = data.concat($($(formLay).data('addform')).serializeArray())
		$('.popup-error, .popup-confirm').hide();
		if(valid(formLay) || $("<input />").prop("required") != undefined) {
			$.ajax({
				type: "POST",
				url: "/ajaxmail.php",
				data: data,
				success: function(back) {
					if(back!='error' && back!='captcha-error') {
						$('.popup-confirm',formLay).text(okMessage).slideDown(200);
						grecaptcha.reset();
						$(formLay)[0].reset();
						ga('send', {
						  hitType: 'event',
						  eventCategory: 'form',
						  eventAction: 'clicksend'
						});
						fbq('track', 'Lead')
					} else if(back=='captcha-error') {
						$('.popup-error',formLay).text('РћС‚РјРµС‚СЊС‚Рµ РіР°Р»РѕС‡РєСѓ "РЇ РЅРµ СЂРѕР±РѕС‚"').slideDown(200).focus();
					}	else {
						$('.popup-error',formLay).text(errorMessage).slideDown(200);
					}
				},
				error: function() {
					$('.popup-error',formLay).text(errorMessage).slideDown(200);
				}
			});
		}
		else $('.popup-error',formLay).text(invalidMessage).slideDown(200);
		return false;
	});

	$('.header-city-select_list li').click(function(){
		$('.js-header-city-input').val($(this).data('id'));
		$('.js-header-city-select').submit()
	});

	$('.tabs-header .tab').click(function(){
    parent = $(this).parents('.tabs');
    $('.active', parent).removeClass('active');
    $('.btn3', parent).removeClass('btn3').addClass('btn4');
    $('.tabs-content .tab:nth-child('+($(this).index() + 1)+')', parent).addClass('active');
    $('.tabs-header .tab:nth-child('+($(this).index() + 1)+')', parent).removeClass('btn4').addClass('btn3');
    return false;
  });

	/* carfax */

	$('.vin-mask').mask("AAAAAAAAAAAAA0000", {
		translation: {
			A: {pattern: /[0-9A-HJ-NPR-Za-hj-npr-z]/}
		},
		onComplete: function(cep, e, field) {
			$(field).removeClass('txt-error').addClass('txt-confirm');
  	},
		onKeyPress: function(cep, e, field) {
			$(field).removeClass('txt-confirm').addClass('txt-error');
  	}
	});

	$('.carfax-form').submit(function(){
		var formLay = $(this),
				errorMessage = $(formLay).data('error'),
				okMessage = $(formLay).data('ok'),
				invalidMessage = $(formLay).data('invalid'),
				data = $(formLay).serializeArray();
		$('.carfax-form-btn',formLay).addClass('carfax-form-btn_loader').prop('disabled', true);
		$('.popup-error, .popup-confirm').hide();
		if(valid(formLay) || $("<input />").prop("required") != undefined) {
			$.ajax({
				type: "POST",
				url: "/ajax/carfax/",
				data: data,
				success: function(back) {
					try {
						back = $.parseJSON(back)
						window.location = back.url
					} catch(e) {
					  console.log('bad')
						$('.carfax-form-btn',formLay).removeClass('carfax-form-btn_loader').removeAttr('disabled');
						$('.popup-error',formLay).text(errorMessage).slideDown(200);
					}
				},
				error: function() {
					$('.carfax-form-btn',formLay).removeClass('carfax-form-btn_loader').removeAttr('disabled');
					$('.popup-error',formLay).text(errorMessage).slideDown(200);
				}
			});
		}
		else $('.popup-error',formLay).text(invalidMessage).slideDown(200);
		return false;
	});

});