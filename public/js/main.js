$(function() {
	
	$.getJSON('/api/posts/count', function(data) {
		$("footer p").html('Article count: ' + data.count);
	});

	$.getJSON('/api/posts?sorted=true', function(data) {

		var post = '';
		for(var i = 0; i < data.length; i++) {
			var date = new Date(data[i].date);
			var content = data[i].content.substring(0,50) + "...";
			post += '<div class="article"><strong class="title">' + data[i].title + '</strong><i class="author">' + data[i].author + '</i><i class="date">' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + date.toDateString() + '</i><p class="content">' + content + '</p><a href=""><b class="readMore"><a href="/post/' + data[i]._id + ' ">readMore...</a></b></a></div>'
		}

		$("article").html(post);

		$("#loading").fadeOut();
	});

});