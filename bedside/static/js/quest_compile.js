/*
 * NOTE:
 * Ricorda: quando l'utente invia i dati, essi devono essere coerenti con le risposte precedentemente date.
 * Nel senso che se per esempio l'utente ha detto 'no' in un branching, non si devono inviare eventuali
 * campi relativi alla domanda eventualmente saltata... Pensaci un po'...
 * 
 * TODO:
 * Modifica gli id delle pagine con valori hash, così da non potere saltare alle pagine a piacimento!
 * E i valori li conservi in un vettore...
 * 
 * */

/// Transforms the provided XML questionnaire into the corresponding HTML
/// This function might be replaced with a XSLT transformation
function XMLtoHTML(xml) {
	// Parse XML and get all questions
	//var qids = new Array();
	var q = new Array();
	//var qnum=1;
	$(xml).find('question').each(function() {
		//qids[qnum] = $(this).attr('qid');
		q.push($(this));
		//qnum++;
	});
	var main_id = 'main';
	var summary_id = 'summary';
	//qids[0]    = 'main';		// First "question" is the main entrance screen
	//qids[qnum] = 'summary';		// Last "question" is the review screen
	
	// Add questionnaire title and link to first question
	$('#q'+main_id).find('.content h2').text($(xml).find('title').text());
	$('#q'+main_id).find('.content').append($(xml).find('info').text());
	//$('#entry .content a').attr('href', '#q'+qids[0]);
	$('#q'+main_id).find('.content').append('<div id="forward-opts"><button data-icon="forward" data-iconpos="right">Comincia il questionario</button></div>');
	$('#q'+main_id).find('.content').trigger('create');
	
	// Add a Jquerymobile page for each question on the XML file
	for (i=0; i<q.length; i++) {
		
		// NOTA: MOlto meglio lasciare data-qid. Togliere id complesso
		var newquestion = $('<div data-role="page" data-i="'+parseInt(parseInt(i)+1)+'" id="q'+$(q[i]).attr('qid')+'" data-qid="'+$(q[i]).attr('qid')+'"></div>')
			.append('<div data-role="header" class="header"><h1>'+$(xml).find('title').text()+'</h1></div>')
			.append('<div data-role="content" class="content"></div>')
			.append('<div data-role="footer" data-position="fixed" class="footer"></div>');
		//$('.content', newquestion).append('<h4>'+$(this).find('string').text()+'</h4>');
		$('.footer', newquestion).append('<div class="ui-grid-b" style="padding:5px;"></div>');
		
		// Store question type
		$(newquestion).attr('data-qtype', $(q[i]).attr('type'));
		
		// Freccia indietro
		//$('.footer .ui-grid-b', newquestion).append('<div class="ui-block-a"><a href="#q'+qids[(i+(qnum+1)-1)%(qnum+1)]+'" data-role="button" data-direction="reverse" data-icon="arrow-l">Indietro</a></div>');
		$('.footer .ui-grid-b', newquestion).append('<div id="backward-opts-'+$(q[i]).attr('qid')+'" class="ui-block-a"><button data-direction="reverse" data-icon="arrow-l">Indietro</button></div>');
		
		// Avanzamento nel questionario
		$('.footer .ui-grid-b', newquestion).append('<div class="ui-block-b" style="text-align:center; padding-top:5px;">Domanda '+(i+1)+' di '+q.length+'</div>');
		
		// Freccia avanti
		//$('.footer .ui-grid-b', newquestion).append('<div id="forward-opts-'+qids[i]+'" class="ui-block-c" style="text-align:right; display:none;"><a href="#q'+qids[(i+1)%(qnum+1)]+'" data-role="button" data-icon="arrow-r" data-theme="b" data-iconpos="right">Avanti</a></div>');
		$('.footer .ui-grid-b', newquestion).append('<div id="forward-opts-'+$(q[i]).attr('qid')+'" class="ui-block-c" style="text-align:right; display:none;"><button data-i="'+i+'" data-icon="arrow-r" data-theme="b" data-iconpos="right">Avanti</button></div>');
		
		switch ($(q[i]).attr('type')) {
		case 'o':
			if (parseInt($(q[i]).attr('left_val')) == parseInt($(q[i]).attr('right_val')) == 1) {
				$('.content', newquestion).append('<div data-role="fieldcontain"><fieldset data-role="controlgroup" id="opts-'+$(q[i]).attr('qid')+'"><legend>'+$(q[i]).find('string').text()+'</legend></fieldset></div>');
				$(q[i]).find('option').each(function() {
					$('#opts-'+$(q[i]).attr('qid'), newquestion).append('<input type="radio" name="opts-'+$(q[i]).attr('qid')+'" id="opts-'+$(q[i]).attr('qid')+'-'+$(this).attr('oid')+'" value="'+$(this).attr('oid')+'" />');
					$('#opts-'+$(q[i]).attr('qid'), newquestion).append('<label for="opts-'+$(q[i]).attr('qid')+'-'+$(this).attr('oid')+'">'+$(this).text()+'</label>');
				});
			} else {
				//$('#forward-opts-'+$(q[i]).attr('qid'), newquestion).show();
				$('.content', newquestion).append('<div data-role="fieldcontain"><fieldset data-role="controlgroup" id="opts-'+$(q[i]).attr('qid')+'"><legend>'+$(q[i]).find('string').text()+'</legend></fieldset></div>');
				$(q[i]).find('option').each(function() {
					$('#opts-'+$(q[i]).attr('qid'), newquestion).append('<input type="checkbox" name="opts-'+$(q[i]).attr('qid')+'" id="opts-'+$(q[i]).attr('qid')+'-'+$(this).attr('oid')+'" value="'+$(this).attr('oid')+'" />');
					$('#opts-'+$(q[i]).attr('qid'), newquestion).append('<label for="opts-'+$(q[i]).attr('qid')+'-'+$(this).attr('oid')+'">'+$(this).text()+'</label>');
				});
				$('#opts-'+$(q[i]).attr('qid'), newquestion).append('<input type="checkbox" name="opts-'+$(q[i]).attr('qid')+'-none" id="opts-'+$(q[i]).attr('qid')+'-none" value="none" />');
				$('#opts-'+$(q[i]).attr('qid'), newquestion).append('<label for="opts-'+$(q[i]).attr('qid')+'-none">Nessuno dei precedenti</label>');
			}
			break;
		case 'b':
			$('.content', newquestion).append('<div data-role="fieldcontain"><fieldset data-role="controlgroup" id="opts-'+$(q[i]).attr('qid')+'"><legend>'+$(q[i]).find('string').text()+'</legend></fieldset></div>');
			$(q[i]).find('option').each(function() {
				$('#opts-'+$(q[i]).attr('qid'), newquestion).append('<input data-branching="true" type="radio" data-left_val="'+parseInt($(q[i]).attr('left_val'))+'" data-right_val="'+parseInt($(q[i]).attr('right_val'))+'" name="opts-'+$(q[i]).attr('qid')+'" id="opts-'+$(q[i]).attr('qid')+'-'+$(this).attr('oid')+'" value="'+$(this).attr('oid')+'" />');
				$('#opts-'+$(q[i]).attr('qid'), newquestion).append('<label for="opts-'+$(q[i]).attr('qid')+'-'+$(this).attr('oid')+'">'+$(this).text()+'</label>');
			});
			break;
		case 'r':
			//$('#forward-opts-'+$(q[i]).attr('qid'), newquestion).show();
			$('.content', newquestion).append('<h4>'+$(q[i]).find('string').text()+'</h4>');
			$('.content', newquestion).append('<center><input type="range" name="opts-'+$(q[i]).attr('qid')+'" id="opts-'+$(q[i]).attr('qid')+'" value="" min="'+parseInt($(q[i]).attr('left_val'))+'" max="'+parseInt($(q[i]).attr('right_val'))+'" /></center>');
			$('.content', newquestion).append('<h5>Valore compreso nell\'intervallo tra '+parseInt($(q[i]).attr('left_val'))+' e '+parseInt($(q[i]).attr('right_val'))+'</h5>');
			break;
		case 'n':
			$('.content', newquestion).append('<h4>'+$(q[i]).find('string').text()+'</h4>');
			$('.content', newquestion).append('<div style="width:200px; margin:auto;"><input type="number" name="opts-'+$(q[i]).attr('qid')+'" id="opts-'+$(q[i]).attr('qid')+'" value="" min="'+parseInt($(q[i]).attr('left_val'))+'" max="'+parseInt($(q[i]).attr('right_val'))+'" /></div>');
			$('.content', newquestion).append('<h5>Valore compreso nell\'intervallo tra '+parseInt($(q[i]).attr('left_val'))+' e '+parseInt($(q[i]).attr('right_val'))+'</h5>');
			break;
		case 's':
			$('.content', newquestion).append('<h4>'+$(q[i]).find('string').text()+'</h4>');
			$('.content', newquestion).append('<center><input type="text" name="opts-'+$(q[i]).attr('qid')+'" id="opts-'+$(q[i]).attr('qid')+'" value="" /></center>');
			$('.content', newquestion).append('<h5>Lunghezza dell\'input consentita: tra '+parseInt($(q[i]).attr('left_val'))+' e '+parseInt($(q[i]).attr('right_val'))+'</h5>');
			break;
		}
		//$('#opts-'+$(q[i]).attr('qid'), newquestion).bind("change", function(event, ui) {
			//alert('#opts-'+$(q[i]).attr('qid'));
			//$('#forward'+$(q[i]).attr('qid')).show(100);
		//});
		
		$('body').append(newquestion);
		//i = i+1;
	}
	
	// Add review screen
	var newquestion = $('<div data-role="page" id="qsummary"></div>')
		.append('<div data-role="header" data-position="fixed" class="header"><h1>'+$(xml).find('title').text()+'</h1></div>')
		.append('<div data-role="content" class="content"></div>')
		.append('<div data-role="footer" data-position="fixed" class="footer"></div>');
	$('.content', newquestion).append('<h4>Riepilogo</h4>');
	$('.footer', newquestion).append('<div class="ui-grid-b" style="padding:5px;"></div>');
	$('.footer .ui-grid-b', newquestion).append('<div id="backward-summary" class="ui-block-a"><button data-direction="reverse" data-icon="arrow-l">Indietro</button></div>');
	$('.footer .ui-grid-b', newquestion).append('<div class="ui-block-b" style="text-align:center; padding-top:5px;">Riepilogo</div>');
	$('.footer .ui-grid-b', newquestion).append('<div class="ui-block-c" style="text-align:right;"><a href="/givings/" data-role="button" data-icon="arrow-r" data-theme="b" data-iconpos="right">Invia i dati</a></div>');
	$('body').append(newquestion);
}


/// Performs a transition to the 'nextid' page in the sequence of question
function gotoNextPage(currentid, nextid) {
	//alert('going from '+currentid+' to '+nextid);
	$('#'+nextid).attr('data-prev-id', currentid);
	$.mobile.changePage('#'+nextid, {allowSamePageTransition:true, changeHash:false});
}



/// Things to do at the beginning: transform XML to HTML and set all bindings
$('#qmain').live("pageinit", function() {
	
	$.get('/givings/getxml/'+$(this).attr('data-gid'), function(xml, status, request) {
		
		/// @todo: Check server response
		
		// Transform XML of questionnaire into HTML
		XMLtoHTML(xml);
		
		// Binding to first page BEGIN BUTTON
		$('#qmain button').bind('click', function(event, ui) {
			page = $(this).closest('div[data-role="page"]');
			gotoNextPage($(page).attr('id'), $(page).nextAll('div[data-role="page"]').attr('id'));
		});
		
		// Things to do every time a page is displayed
		$('div[data-role="page"]').live('pageinit', function(event) {
			// Generate summary when its page is loaded
			if ($(this).attr('id') == 'qsummary') $('.content', this).append(get_recap());
			
			// Add behaviour for "None of the above" button (if any)
			$('input[name$="none"]', this).bind('change', function(event, ui) {
				if ($(this).attr('checked')) {
					$(this).parent().siblings().find('input').attr('checked', false).checkboxradio('refresh');
					$(this).parent().siblings().find('input').checkboxradio('disable');
				} else {
					$(this).parent().siblings().find('input').checkboxradio('enable');
				}
			});
			
			// Show NEXT ARROW after getting some input from user
			$('input[name^="opts-"]', this).bind('change', function(event, ui) {
				$(this).closest('div[data-role="page"]').find('div[id^="forward"]').show(200);
			});
			
			// Binding to NEXT ARROW for all transitions
			$('div[id^="forward"] button', this).bind('click', function(event, ui) {
				var page = $(this).closest('div[data-role="page"]');
				var id = $(page).attr('id');
				var next_id;

				// If it's a branching
				var input = $(page).find('input[data-branching="true"]');
				if (input.length > 0) {
					//event.preventDefault();
					offset_true = parseInt(input.attr('data-left_val'));
					offset_false = parseInt(input.attr('data-right_val'));
					current = parseInt($(page).attr('data-qid'));
					sel = $(input).closest('fieldset').find('input').first();
					if ($(sel).attr('checked')) {
						next_id = 'q'+parseInt(current+offset_true);
					}
					else {
						next_id = 'q'+parseInt(current+offset_false);
					}
				}
				else {
					next_id = $(page).next().attr('id');
				}
				
				gotoNextPage(id, next_id);
			});
			
			// Binding to BACK ARROW for all transitions
			$('div[id^="backward"] button', this).bind('click', function(event, ui) {
				var page = $(this).closest('div[data-role="page"]');
				$.mobile.changePage('#'+$(page).attr('data-prev-id'), {allowSamePageTransition:true, changeHash:false, reverse:true});
			});
		});
		
	}, 'xml');
	
});


/// Returns the summary as a list of choices the user has made
function get_recap() {
	var recap = $('<ul></ul>');
	
	$('div[data-qid]').each(function() {
		var li = $('<li>'+$(this).attr('id')+': </li>');
		switch ($(this).attr('data-qtype')) {
		case 'o':
			$(this).find('input').each(function() {
				if ($(this).attr('checked')) {
					$(li).append($(this).siblings('label').text()+' ');
				}
			});
			break;
		case 's':
			$(li).append($(this).find('.content input').attr('value'));
			break;
		}
		$(recap).append(li);
	});
	
	return recap;
}
