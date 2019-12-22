$(function() {

	var toolbarOptions = [
		
		['bold', 'italic', 'underline', 'strike'],        // toggled buttons
		['blockquote', 'code-block'],
	  
		[{ 'header': 1 }, { 'header': 2 }],               // custom button values
		[{ 'list': 'ordered'}, { 'list': 'bullet' }],
		[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
		[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
		[{ 'direction': 'rtl' }],                         // text direction
	  
		[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
	  
		[{ 'color': ['#55efc4', '#81ecec', '#74b9ff', '#a29bfe', '#dfe6e9',
					 '#00b894', '#00cec9', '#0984e3', '#6c5ce7', '#b2bec3',
					 '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#636e72',
					 '#fdcb6e', '#e17055', '#d63031', '#e84393', '#2d3436'] },
		{ 'background': ['#55efc4', '#81ecec', '#74b9ff', '#a29bfe', '#dfe6e9',
						'#00b894', '#00cec9', '#0984e3', '#6c5ce7', '#b2bec3',
						'#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#636e72',
						'#fdcb6e', '#e17055', '#d63031', '#e84393', '#2d3436'] }],

		[{ 'font': [] }],
		[{ 'align': [] }],
		
		['link', 'image']
	  ];

	  toolbarOptions.container = '#toolbar';

	var quill = new Quill('#editor', {
		theme: 'snow',
		modules: {
			toolbar: toolbarOptions
		}
	});

	function imageExists(url, callback) {
		var img = new Image();
		img.onload = function() { callback(true); };
		img.onerror = function() { callback(false); };
		img.src = url;
	}

	function hide(el) {
		el.animate({height:'0px'}, 150,  "linear", function(){
			el.css('display', 'none');
			const id = $("button span").attr("class");
			$.get("/user/removePost/"+id, function(data) {
			});
		});
	}

	$('.rm').on('click', function(){
		var el = $(this).closest('.list-item');
		hide(el);
	});

	$('#submit').click(function(event) {
		event.preventDefault();
		const content = quill.root.innerHTML;
		const title = $('#title').val();

		imageExists($('#thumb').val(), (exist) => {

			var thumb;
			if(exist) {
				thumb = $('#thumb').val();
			}

			$.post("/user/addPost", {
				title,
				content,
				thumb 
			}).done((data) => {
				window.location = '/';
			}).fail((data) => {
				console.log('fail');
			});
		});

	});

});