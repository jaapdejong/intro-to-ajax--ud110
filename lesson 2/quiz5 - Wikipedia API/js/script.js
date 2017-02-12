
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
	var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview';
	streetviewUrl += '?' + $.param({
		'size': '600x400',
		'location': address
	});
	$body.append('<img class="bgimg" src="' + streetviewUrl + '">');

	// load nytimes
	var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
	nytimesUrl += '?' + $.param({
		'api-key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
		'sort': 'newest',
		'q': cityStr
	});
	$.getJSON( nytimesUrl, function( data ) {
		$.each( data.response.docs, function( key, val ) {
			var article = '<a href="' + val.web_url + '">' + val.headline.print_headline + '</a>';
			var snippet = '<p>' + val.snippet + '</p>';
			var item = '<li class="article">' + article + snippet + '</li>';
			$( item ).appendTo( $( '#nytimes-articles' ) );
		});
	})
	.fail( function() {
		$( '<p>New York Times Articles Could Not Be Loaded</p>' ).appendTo( 'body' );	
	});
	
	// load wikipedia
	var wikipediaUrl = 'https://en.wikipedia.org/w/api.php';
	wikipediaUrl += '?' + $.param({
		'action': 'opensearch',
		'format': 'json',
		'search': cityStr
	});
	$.ajax({
		url: wikipediaUrl,
		dataType: 'jsonp'
	}).done( function( data ) {
		var subject = data[1];
		var link = data[3];
		for (i = 0; i < subject.length; ++i) {
			var article = '<a href="' + link[i] + '">' + subject[i] + '</a>';
			var item = '<li class="article">' + article + '</li>';
			$( item ).appendTo( $( '#wikipedia-links' ) );
		}
	});
	
	return false;
};

$('#form-container').submit(loadData);
