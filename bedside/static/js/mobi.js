var AJAX_ACTIVE = true;
/*$('#questionnaire-list').live('pageinit', function() {
	if (! $.cookie('email')) $.mobile.changePage($('#loginPage'));
	else $('#welcome-string').text('Benvenuto ' + $.cookie('email'));
	
	// Get questionnaires list for current patients
	$.get('/givings/', function(data, status, request) {
		alert('ottenuto ' + data.val);
	}, 'json');
});*/
$('#page').live("pageinit", function() {
	//alert('init');
	/*var session_id = $.cookie("session_id");
	if (session_id != null && session_id != "") {
		//alert("Welcome again " + session_id);
		window.location = '#questionnaire-list';
	}
	else {
		//window.location = '#login';
	}*/
	
	
	/* Form submit bindings
	$('form').live('submit', function(event) {
		//alert($(this).serialize());
		if ($(this).hasClass('noajax') || ! AJAX_ACTIVE) return;
		event.preventDefault();
		href = $(this).attr('action');
		postdata = $(this).serialize();
		execute_ajax(href, postdata);
		return false;
	});*/
	$(document).ajaxSend(function(event, xhr, settings) {
		function getCookie(name) {
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = jQuery.trim(cookies[i]);
					// Does this cookie string begin with the name we want?
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		}
		function sameOrigin(url) {
			// url could be relative or scheme relative or absolute
			var host = document.location.host; // host + port
			var protocol = document.location.protocol;
			var sr_origin = '//' + host;
			var origin = protocol + sr_origin;
			// Allow absolute or scheme relative URLs to same origin
			return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
				(url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
				// or any other URL that isn't scheme relative or absolute i.e relative.
				!(/^(\/\/|http:|https:).*/.test(url));
		}
		function safeMethod(method) {
			return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
		}

		if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
			xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
		}
	});
});
/*function execute_ajax(href, postdata) {
	//if (href == curpage) return;
	//$("#leftcolumn_content").slideUp(50, function() {
		$.post(href, postdata, function(data, status, request) {
			//alert('fine ajax: ' + data.email);
			$.mobile.changePage($('#questionnaire-list'));
			$('#welcome-string').text('Benvenuto ' + $.cookie('email'));
		}, 'json');
	//});
}*/
