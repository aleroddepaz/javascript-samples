define(function(require) {
	var $ = require('jquery');
	
	function DynamicButton(text) {
		this.text = text;
	};
	
	DynamicButton.prototype = {
		render: function(elem) {
			var text = this.text;
			$(elem).click(function() {
				$(elem).html(text);
			});
		}
	};
	return DynamicButton;
});