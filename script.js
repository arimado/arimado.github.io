


var colours = new Array("#CCCCCC","#00CC00","#000000","#020202","#010101","#0000CC","#CC0000");
var prevColour = '';

setInterval(setColour, 5000);

document.bgColor = '#000000';

function setColour() {
	var randArrayIndex = parseInt(Math.random() * colours.length);

	if(randArrayIndex !== prevColour) {
		document.bgColor = colours[randArrayIndex];
	} else {
		var randArrayIndex_2 = parseInt(Math.random() * colours.length);
		document.bgColor = colours[randArrayIndex_2];
	}
	prevColour = randArrayIndex;
}

var isLoading = false;

$(function() {

	var form = $('#ajax-contact');
	var formMessages = $('#form-messages');

	form.submit(function(e) {

		console.log('you pressed the submit button.');
		e.preventDefault();

		var form_name = $('#contactname').val();
		var form_email = $('#email').val();
		var form_message = $('#message').val();

		function validateEmail(email) {
			// http://stackoverflow.com/a/46181/11236
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}

		function validateMessage(message) {
			if(message.length > 3) {
				return true;
			} else {
				return false;
			}
		}

		function validateName(name) {
			if(name.length > 0) {
				return true;
			} else {
				return false;
			}
		}

		if(validateName(form_name) == false) {
			$('.nameErr').animate({'opacity':'.6'}, 500);
			$('#contactname').focus();
		} else {
			$('.nameErr').animate({'opacity':'0'}, 500);
		}

		if(validateMessage(form_message) == false) {
			$('.msgErr').animate({'opacity':'.6'}, 500);
			$('#message').focus();
		} else {
			$('.msgErr').animate({'opacity':'0'}, 500);
		}

		if(validateEmail(form_email) == false) {
			$('.emailErr').animate({'opacity':'.6'}, 500);
			$('#email').focus();
		} else {
			$('.emailErr').animate({'opacity':'0'}, 500);
		}

		if(!isLoading) {

		}

		var cycle;

		function loading() {
				$("#buttonText").html('')
				form.submit(function(){
				    $(this).find('input[type=submit]').attr('disabled', 'disabled');
				});
				isLoading = true;
				if(isLoading) cycle = setInterval(dotCycle, 90);

		}

		function dotCycle() {
			if($("#buttonText").html().length > 3) {
				$("#buttonText").html('');
			} else {
				$("#buttonText").append('.');
			}
		}

		$('.logo img').click(function(){



		});


		function sentEmail() {
			$("#buttonText").html('Sent');
			clearInterval(cycle);
			$("#greenDiv").animate({'opacity':'1'}, 50, function(){
				$(this).animate({'opacity':'0'}, 1000, function(){
					setTimeout(function(){$("#buttonText").html('Send')}, 2000);
				})
			});

		}

		if(validateName(form_name) && validateMessage(form_message) && validateEmail(form_email)) {
			loading();
			$.ajax({
				type: 'POST',
				url: 'https://mandrillapp.com/api/1.0/messages/send.json',
				data: {
					'key': 'iC3FrNTF1InrtZT9Ev_oEA',
					'message': {
						'from_email': form_email,
						'to': [
							{
								'email': 'jarimado@gmail.com',
								'name': 'Jeremy Test Name',
								'type': 'to'
							}
						],
						'autotext':'true',
						'subject': form_name + ' messaged you via jeremyarimado.com',
						'html': form_message
					}
				}
			}).done(function(response) {
				sentEmail();
				$('.nameErr').animate({'opacity':'0'}, 500);
				$('.nameErr').animate({'opacity':'0'}, 500);
				$('.emailErr').animate({'opacity':'0'}, 500);

				console.log(response);
				$('#contactname').val('');
				$('#email').val('');
				$('#message').val('');

			});
		}








	});
});

// Host smtp.mandrillapp.com Copy
// Port 587 Copy
// SMTP Username jarimado@gmail.com Copy
// SMTP Password any valid API key

// iC3FrNTF1InrtZT9Ev_oEA


		// 	var formData = form.serialize();
		// console.log(formData);
	// $.ajax({
		// 	type: 'POST',
		// 	url: form.attr('action'),
		// 	data: formData
		// }).done(function(response){
		// 	formMessages.removeClass('error');
		// 	formMessages.addClass('success');

		// 	$(formMessages).text(response);

		// 	$('#contactname').val('');
		// 	$('#email').val('');
		// 	$('#message').val('');
		// }).fail(function(data){
		// 	formMessages.removeClass('success');
		// 	formMessages.addClass('error');

		// 	if(data.responseText !== '') {
		// 		formMessages.text(data.responseText);
		// 	} else {
		// 		formMessages.text('Oops! an error occured.');
		// 	}
		// });


// Show hidden messages

$('#reveal-stuff').on('click', function(e){
	$('.other-post').toggleClass('hidden-post');
})
