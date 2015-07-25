module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		coffee: {
			options: {
				bare: true
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.js': 'src/app/**/*.coffee'
				}
			}
		},
		ngAnnotate: {
			dist: {
				files: {
					'dist/<%= pkg.name %>.js': ['dist/<%= pkg.name %>.js']
				}
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					minifyCSS: true
				},
				files: {
					'dist/index.html': 'src/app/index.html'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('default', [ 'coffee', 'ngAnnotate', 'uglify', 'htmlmin' ]);
}
