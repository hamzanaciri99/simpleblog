$(function() {

	function imageExists(url, callback) {
		var img = new Image();
		img.onload = function() { callback(true); };
		img.onerror = function() { callback(false); };
		img.src = url;
	}

	$('#submit').click(function(event) {
		event.preventDefault();

		imageExists($('#thumb').val(), (exist) => {

			var thumb;
			if(exist) {
				thumb = $('#thumb').val();
			}

			$.post("/user/changeAvatar", {
				thumb 
			}).done((data) => {
				window.location = '/';
			}).fail((data) => {
				console.log('fail');
			});
		});
	});
});