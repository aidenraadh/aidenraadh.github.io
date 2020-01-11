$(document).ready(function(){
	
// Init Wow
wow = new WOW( {
    animateClass: 'animated',
    offset:       100
});

// initialize WOW
wow.init();

// Set localStorage for #repaimentDetail's page
$('.spModel, #SPModelLainnya').click(function(){
	// Check browser support
	if (typeof(Storage) !== "undefined") {
		// Store
		if($(this).is('#SPModelLainnya')){
			sessionStorage.setItem("MODEL", $('[name="phoneModel"]').val());
			sessionStorage.setItem("MODEL-IMG", '../img/icons/SPLainnya.png');
		}
		else{
			sessionStorage.setItem("MODEL", $(this).find('span').text());
			sessionStorage.setItem("MODEL-IMG", $(this).find('img').attr("src"));
		}
	}
	else {
	    alert("Sorry, your browser does not support Web Storage...");
	}
});

$('.spBreakage').click(function(){
	sessionStorage.setItem("MODEL-BRKG", $(this).find('span').text());
});

// Get #repairmentDetail's local storage
$('.MODEL').text(sessionStorage.getItem('MODEL'));
$('.MODEL-IMG').attr("src", sessionStorage.getItem('MODEL-IMG'));
$('.MODEL-BRKG').text(sessionStorage.getItem('MODEL-BRKG'));

// Remove #repairmentDetail's local storage
if($('title').text() === "Dalvis | Gadget Type"){
	sessionStorage.removeItem("gadgetName");
	sessionStorage.removeItem("imgSrc");
}

// Open and close navbar
$('.navbar li > a').click(function(){
	$('.navbar li > a').removeClass('active');
	$(this).addClass('active');
});

//open navbar items when ths button clicked
$('.openItems').click(function(){
	$('.navbar .navItems').addClass('trans showed');
});

//close navbar items when ths button clicked
$('.closeItems').click(function(){
	$('.navItems').removeClass('showed').one('transitionend', function(){
		$('.navItems').removeClass('trans');
	});
});

// Smooth scroll
$('.navbar li > a').click(function(e){

	if((this.hash !== "") && $('title').text() === "Dalvis"){
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({scrollTop: $(hash).offset().top}, 600, "linear", function(){
			window.location.hash = hash;
		});
	}
});

// For unfinished gadget section page
$('.unfinished').click(function(){
	alert("Under Construction.");
});

/*price generator this only applied to touchscreenBreakage.html page*/
/*
function priceGenerator(start, mul, end, dur, timeout){
	if(start < end){
		start += mul;
		$('#num').text(start);		
		timeout = setTimeout(function(){
			priceGenerator(start, mul, end, dur, timeout);
		}, dur);
	}
}
*/

$('.opnModal').click(function(){
	var modalid = $(this).attr('modalid');
	$('#'+modalid).removeClass('hidden').outerWidth();
	$('#'+modalid).addClass('darkBG').one('transitionend', function(){
		$('#'+modalid).find('.modal').addClass('shown');
	});
});

$('.clsModal').click(function(){

	var modalid = $(this).attr('modalid');

	$('#'+modalid).find('.modal').removeClass('shown').one('transitionend', function(){
		$('#'+modalid).removeClass('darkBG').one('transitionend', function(){
			$(this).addClass('hidden');
		});
	});
});

/**** Live Chat ****/

$('.opnLiveChat').click(function(){
  if( !$(this).is('on') ){
    $('.livechat').addClass('shown').outerWidth();
    $('.livechat').addClass('zoomIn');
    $(this).addClass('on');
    $('.clsLiveChat').removeClass('on');
  }
});
$('.clsLiveChat').click(function(){
  if( !$(this).is('on') ){
    $('.livechat').removeClass('zoomIn').one('transitionend', function(){
      $('.livechat').removeClass('shown');
    });
    $(this).removeClass('on');
    $('.opnLiveChat').addClass('on');
  }
});

});