$(function () {
	$(".clickabletable .clickableCell").click(function () {
		/* get payoff from element */
		var payoff = parseFloat($(this).attr("data-payoff"));
		
		/* highlight only this element on this row */
		$(this).siblings().removeClass("highlighted");
		$(this).addClass("highlighted");
		/* update partial total */
		$(this).siblings(".rowTotal").html(payoff);
		
		/* calculate and update global total */
		var table = $(this).parents(".clickabletable");
		var total = 0;
		table.find(".rowTotal").each(function () {
			total += parseFloat($(this).text());
		});
		table.find(".total").html(total);
	});		
});
