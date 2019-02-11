$(function() {

	$.getJSON('/api/posts/count', function(data) {
		$("footer p").html('Article count: ' + data.count);
	});

	$.getJSON('/api/post/' + postID, function(data){

		$("#postTitle").text(data.title);
		$("#postContent").text(data.content);
		$("#postAuthor").html('<strong>Author: </strong>' + data.author);
		var date = new Date(data.date);
		$("#postDate").html('<strong>Date: </strong>' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + date.toDateString());


		var comments = '';
		for(var i = 0; i < data.comments.length; i++){
			var date = new Date(data.comments[i].date);
			comments += '<div class="comment"><div class="commentInfo"><i><strong>Date: </strong>' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + date.toDateString() + '</i><i><strong>Author: </strong>' + data.comments[i].author + '</i><i><strong>Email: </strong>' + data.comments[i].email + '</i></div><div class="commentContent"><p>' + data.comments[i].content + '</p></div></div>'
		}

		$("#comments").html(comments);

		$("#commentForm").attr("action", "/api/post/" + postID);

		$("#loading").fadeOut();
	});

});