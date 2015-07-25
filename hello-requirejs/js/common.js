require.config({
	baseUrl: 'js/app',
	shim: {
		bootstrap: {'deps':['jquery']}
	},
	paths: {
		jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min',
		bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js'
	}
});