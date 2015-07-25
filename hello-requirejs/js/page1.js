require(['./common'], function() {
	
	require(['dynamic-button', 'main-menu'], function(DynamicButton, MainMenu) {
		var button = new DynamicButton('You clicked me on page 1!'),
			menu = new MainMenu('page1.html');

		menu.render();
		button.render('#mybutton');
	});
});