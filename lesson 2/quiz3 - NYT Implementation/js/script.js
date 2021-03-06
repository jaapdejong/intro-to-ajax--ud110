
function loadData() {

	var $body = $('body');
	var $wikiElem = $('#wikipedia-links');
	var $nytHeaderElem = $('#nytimes-header');
	var $nytElem = $('#nytimes-articles');
	var $greeting = $('#greeting');

	// clear out old data before new request
	$wikiElem.text("");
	$nytElem.text("");

	var streetStr = $('#street').val();
	var cityStr = $('#city').val();
	var address = streetStr + ', ' + cityStr;

	$greeting.text('So, you want to live at ' + address + '?');


	// load streetview
	var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
	$body.append('<img class="bgimg" src="' + streetviewUrl + '">');

	// load nytimes
	var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
	url += '?' + $.param({
		'api-key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
		'sort': 'newest',
		'q': cityStr
	});
	$.getJSON( url, function( data ) {
		console.log(data);	
		$.each( data.response.docs, function( key, val ) {
			var article = '<a href="' + val.web_url + '">' + val.headline.print_headline + '</a>';
			var snippet = '<p>' + val.snippet + '</p>';
			var item = '<li class="article">' + article + snippet + '</li>';
			$( item ).appendTo( $( '#nytimes-articles' ) );
		});
	});
	
	return false;
};

$('#form-container').submit(loadData);
