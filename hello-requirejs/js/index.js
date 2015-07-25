require(['./common'], function() {

	require(['jquery', 'main-menu'], function($, MainMenu) {
		new MainMenu('index.html').render();
		$('#main-alert').html('<strong>RequireJS</strong> is fully up and running!');
	});
});