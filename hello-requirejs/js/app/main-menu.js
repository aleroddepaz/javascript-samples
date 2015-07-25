define(function(require) {
	var $ = require('jquery');

	var MainMenu = function(actual) {
		this.actual = actual;
	};

	MainMenu.prototype.render = function() {
		$('#navigation').empty().append(
			'<li role="presentation"><a href="index.html">Index</a></li>',
			'<li role="presentation"><a href="page1.html">Page 1</a></li>',
			'<li role="presentation"><a href="page2.html">Page 2</a></li>'
		);
		$('#navigation > li > a[href^="' + this.actual + '"]').parent().addClass('active');
	};

	return MainMenu;
});