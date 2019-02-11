$(function() {

	$.getJSON('/api/posts/count', function(data) {
		$("footer p").html('Article count: ' + data.count);
	});

});