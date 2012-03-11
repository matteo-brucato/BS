$('body').live("pagecreate", function(event) {
	$(".clickabletable .clickableCell").click(function () {
		/* get payoff from element */
		var payoff = parseFloat($(this).attr("data-payoff"));
		
		/* highlight only this element on this row */
		$(this).siblings().removeClass("highlighted");
		$(this).addClass("highlighted");
		//alert($(this).find('button').attr('data-theme'));
		//$(this).find('button').buttonMarkup({ theme: "a" });
		
		$(this).find('button').attr('data-theme', 'a');
		$(this).find('button').button('refresh');
		
		//$(this).find("input[type='radio']").checkboxradio({ theme: "a" });
		//$(this).find("input[type='radio']:first").attr("checked",true).checkboxradio("refresh");
		
		
		//$(this).find('*[data-theme]').attr('data-theme', 'b');
		//$(this).find('*[data-theme]').trigger('updatelayout');
		//$(this).find('button').trigger('create');
		/* update partial total */
		$(this).siblings(".rowTotal").html(payoff);
		
		/* calculate and update global total */
		var table = $(this).parents(".clickabletable");
		var total = 0;
		table.find(".rowTotal").each(function () {
			total += parseFloat($(this).text());
		});
		table.find(".total").html(total);
		
		//$('#nurse1').trigger('pageshow');
	});
	
	//$("button").live('click', function () {
		//$(this).find('*[data-theme]').attr('data-theme', 'b');
		//$(this).hide();
	//});
});
