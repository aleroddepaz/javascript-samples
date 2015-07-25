require(['./common'], function() {

	require(['dynamic-button', 'main-menu'], function(DynamicButton, MainMenu) {
		var button = new DynamicButton('You clicked me on page 2, George Big!');
		
		new MainMenu('page2.html').render();
		button.render('#mybutton');
	});
});