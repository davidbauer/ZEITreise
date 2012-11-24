$(function() {
	var today=new Date();
	var one=new Date()
	one.setFullYear(one.getFullYear()-1);
	var ten=new Date()
	ten.setFullYear(ten.getFullYear()-10);
	var twenty=new Date();
	twenty.setFullYear(twenty.getFullYear()-20);
	var thirty=new Date();
	thirty.setFullYear(thirty.getFullYear()-30);
	var fourty=new Date();
	fourty.setFullYear(fourty.getFullYear()-40);
	
	$('.testing').append('<ul><li>Heute ist der ' + today + '</li>');
	$('.testing').append('<li>Vor 1 Jahr war der ' + one + '</li>');
	$('.testing').append('<li>Vor 10 Jahren war der ' + ten + '</li>');
	$('.testing').append('<li>Vor 20 Jahren war der ' + twenty + '</li>');
	$('.testing').append('<li>Vor 30 Jahren war der ' + thirty + '</li>');
	$('.testing').append('<li>Vor 40 Jahren war der ' + fourty + '</li></ul>');
	
	
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
