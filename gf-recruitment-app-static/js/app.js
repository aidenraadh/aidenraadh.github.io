$(document).ready(function(){

var AppURL = 'http://localhost/gf_recruitment_app/public';

function viewJobPostingMdlAJAX(xhttp){
	var data = xhttp.responseText.split('_');
	data.forEach(function(item, index){
		$('#viewJobPostingMdl').find('.getAJAX').eq(index).html(item);
	});
	$('#viewJobPostingMdl').removeClass('hidden').outerWidth();
	$('#viewJobPostingMdl').addClass('fadeInDown');	
}


function startAJAX(url, cFunction){
	var xhttp = new XMLHttpRequest();
	xhttp.open('POST', url, true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhttp.setRequestHeader( 'X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content') );
	xhttp.send();
	xhttp.addEventListener('readystatechange', function(){
		if(this.readyState === 4 && this.status === 200){
			cFunction(this);
		}
	}, false);
}


//2019-11-11 20:08:26
//var date = new Date('2019-11-11 20:08:26');
//alert(date.getHours);


/*----------------------------------------
#                                        #
#           Toggle Show Modal Function    #
#                                        #
------------------------------------------*/

//modalid = accepting ID attribute of the targeted modal
//open = true will show the modal, false otherwise
//url = only when some content of the modal requires AJAX's response
//AJAXcFunction = the AJAX callback function

function toggleModal(modalid, open, url, AJAXcFunction){
	if(open){
		$('.modalContainer').removeClass('hidden').outerWidth();
		$('.modalContainer').addClass('darken').one('transitionend', function(){
			//If the modal data requires AJAX's response
			if (url) {
				startAJAX(url, AJAXcFunction);
			}
			else{
				console.log(modalid);
				$(modalid).removeClass('hidden').outerWidth();
				$(modalid).addClass('fadeInDown');
			}
		});	
	}
	else{
		$(modalid).removeClass('fadeInDown').one('transitionend', function(){
			$(modalid).addClass('hidden');
			$('.modalContainer').removeClass('darken').one('transitionend', function(){
				$(this).addClass('hidden');
			});
		});	
	}
}

/*---------------------------------------------
#                                             #
#  Get AJAX Response for View Job Post Modal  #
#                                             #
----------------------------------------------*/

/*----------------------------------------
#                                        #
#     Toggle Show Prompt Modal Function  #
#                                        #
------------------------------------------*/

//open = true will show the modal, false otherwise
// btn = the button triggering the prompt

function togglePrompt(open, btn){

	if(open){
		// Only if the selected items is > 0
		if( $('.items:checked').length > 0 ){
			$('.modalContainer').removeClass('hidden').outerWidth();
			// Assign the prompt message 
			$('.prompt .msg').text( $(btn).attr('msg') );
			// Assign the form ID to the submitting button
			$('.submitItemsBtn').attr('formid', $(btn).attr('formid'));
			// Show the prompt
			$('.prompt').removeClass('hidden').outerWidth();
			$('.prompt').addClass('fadeInDown');
		}
	}
	else{
		// Disable all prompt buttons, preventing the user do some action
		$('.clsPrompt, .submitItemsBtn').attr('disabled', true);
		$('.prompt').removeClass('fadeInDown').one('transitionend', function(){
			// Hide prompt
			$('.prompt').addClass('hidden');
			$('.modalContainer').addClass('hidden');
			// Enable all prompt buttons again
			$('.clsPrompt, .submitItemsBtn').attr('disabled', false);
		});
	}
}

/*----------------------------------------
#                                        #
#      Submit Checked Items Function     #
#                                        #
------------------------------------------*/

function submitItems(formid){
	$('.items:checked').attr('form', formid);
	$('.items:checked').siblings('.subitems[type="hidden"]').attr('form', formid);
	$('#'+formid).submit();
}

/*----------------------------------------
#                                        #
#              Navbar Events             #
#                                        #
------------------------------------------*/

$('.clsNavItems').click(function(){
	$('.navItems').addClass('hidden');
});

$('.opnNavItems').click(function(){
	$('.navItems').removeClass('hidden');
});


/*----------------------------------------
#                                        #
#              Modal Events              #
#                                        #
------------------------------------------*/


$('.addJobPosting').click(function(){
	toggleModal( '#'+$(this).attr('modalid'), true );
});

$('.viewJobPosting').click(function(){
	//Find the target modal
	var modalid = '#'+$(this).attr('modalid');

	//Save the job ID
	var jobid = $(this).attr('jobid');

	//Save the job title
	var jobtitle = $(this).find('.jobtitle').text();

	//Save the time when the job is opened
	var opnat = $(this).attr('opnat');

	//Append the saved data to the modal
	$(modalid).find('.jobtitle').text(jobtitle);
	$(modalid).find('.footer').text('Opened at: '+opnat);

	toggleModal(modalid, true/*, AppURL+'/admin/jobposting/view/'+jobid, viewJobPostingMdlAJAX*/);
});

$('.clsModal').click(function(){
	toggleModal( '#'+$(this).closest('.modal').attr('id'), false, null);
});


/*----------------------------------------
#                                        #
#           Prompt Modal Events          #
#                                        #
------------------------------------------*/

$('.openJobPosting').click(function(){
	togglePrompt(true, $(this));
});

$('.closeJobPosting').click(function(){
	togglePrompt(true, $(this));
});

$('.deleteJobPosting').click(function(){
	togglePrompt(true, $(this));
});

$('.acceptFile').click(function(){
	togglePrompt(true, $(this));
});

$('.denyFile').click(function(){
	togglePrompt(true, $(this));
});

$('.submitItemsBtn').click(function(){
	$(this).add($(this).siblings()).attr('disabled', true);
	submitItems($(this).attr('formid'));
});

$('.clsPrompt').click(function(){
	togglePrompt(false, '', '');
});


/*----------------------------------------
#                                        #
#      Submit Checked Items Events       #
#                                        #
------------------------------------------*/

$('.selectAll').click(function(){

	//The button's already clicked before
	if($(this).is('.clicked')){
		$('[name="item[]"]').prop('checked', false);
		$(this).removeClass('clicked');
		$(this).children('span').text('Select All')
	}

	//The button is not already clicked before
	else{
		$('[name="item[]"]').prop('checked', true);
		$(this).addClass('clicked');
		$(this).children('span').text('Deselect All')
	}

});

/*----------------------------------------
#                                        #
#               Tab Events               #
#                                        #
------------------------------------------*/

$('.tab-link').click(function(){
  var tab = '#'+this.hash.slice(1);
  $('.tab-link').attr('aria-selected', 'false').removeClass('active');
  $(this).attr('aria-selected', 'true').addClass('active');
  $('.tab-pane.show').removeClass('show').one('transitionend',function(){
    $(this).removeClass('active');
    $(tab).addClass('active');
    $(tab).addClass('show');      
  });
});
 

});

