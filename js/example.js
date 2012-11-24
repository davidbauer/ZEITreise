$(function() {
	var today=new Date();
	$('.testing').append('<ul><li>Heute ist der ' + today + '</li>');
	
	$('.linkinput').click (function(e) {
		e.preventDefault();
		var destination = $(this).attr('data-word');
		var years = $(this).attr('data-number');
		getTimestamp(destination, years);
		

		
	});
	
	
	function getTimestamp(destination, years) {
		var destination = new Date();
		destination.setFullYear(destination.getFullYear()-years);
		$('.testing').append('<li>Vor ' + years + ' Jahr(en) war der ' + destination + '</li>');
	};
	
	
	$('#searchform').submit(function(e) {
		e.preventDefault();
		
		var api = $("body").zon_api({
		query:"release_date:" + "2011-12-01",
		api_key:"db707bec3c2ceb694d5e38df7054899154b4bd7ffe2431d71bbc",
		endpoint:"content",
		params:{fields:"title,href"},
		limit: 100
	});

	// show in browser
	api.retrieve(0, function (data){
		console.debug("1",data.get_result().matches);
		
		var results = data.get_result().matches;

		for (var i = 0; i < results.length; i++) {
			var item = results[i];

			$('.result').append('<li><a href="'+item.href+'">'+ item.title + '</a></li>');
		} 

	});
	});
});
