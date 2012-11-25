$(function() {
	var today=new Date();
	$('.testing').append('<ul><li>Heute ist der ' + today + '</li>');
	$('.linkinput').click (function(e) {
		e.preventDefault();
		var yearsOffset = parseInt($(this).attr('data-number'), 10); // convert string to number
		doTimetravel(yearsOffset);
	});

	function doTimetravel(yearsOffset){
		/*
			-- Timezones --
			Internally the JavaScript date object works with UTC (Zulu) time. Thats the "Z" at
			the end of "2012-11-25T13:23:26.731Z". So when you're doing
			console.log(moment().toDate().toJSON());
			time will be displayed in Zulu time also. This time will not necessarily have the
			same hours as your local time. Don't get confused by that.

			I implement startDate to endDate as the full week from thursday to wednesday.
		*/
		var startDate = moment().subtract('years', yearsOffset); // today minus year, http://momentjs.com/docs/#/manipulating/subtract/
		startDate = startDate.day(4-7); // to thursday, http://momentjs.com/docs/#/manipulating/day/
		startDate = startDate.sod(); // start of day, http://momentjs.com/docs/#/manipulating/sod/
		startDate = startDate.toDate().toJSON(); // get correct time format
		var endDate = moment().subtract('years', yearsOffset); // today minus year, http://momentjs.com/docs/#/manipulating/subtract/
		endDate = endDate.day(3); // to wednesday, http://momentjs.com/docs/#/manipulating/day/
		endDate = endDate.eod(); // end of day, http://momentjs.com/docs/#/manipulating/eod/
		endDate = endDate.toDate().toJSON(); // get correct time format
		console.log(startDate+" "+endDate); // again, don't get confused with local hours vs. UTC (Zulu) hours

		var api = $("body").zon_api({
			query:"release_date:["+startDate+" TO "+endDate+"]",
			api_key:"db707bec3c2ceb694d5e38df7054899154b4bd7ffe2431d71bbc",
			endpoint:"content",
			params:{fields:"title,href,subtitle"},
			limit: 1000
		});

		api.retrieve(0, function (data){
			console.dir(data.get_result().matches);
			var results = data.get_result().matches;
			$('.result').html(""); // clear
			$('.result').append("<span style='background-color:yellow;'>Zeitreise erfolgreich</span>. Willkommen am " + startDate);
			for (var i = 0; i < results.length; i++) {
				var item = results[i];
				$('.result').append('<li><a href="'+item.href+'"><h3>'+ item.title + '</h3><br />' + item.subtitle + '</a></li>');
			}

		});
	}
});
