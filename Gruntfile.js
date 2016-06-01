var grunt = require("grunt");
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-release');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.initConfig({
	jshint: {
		all: ['src/**/*.js', '*.js', 'tests/**/*.js'],
		options:{
			node:true
		}
	},
	mochaTest: {
		test: {
			options: {
				reporter: 'spec',
				clearRequireCache:true
			},
			src: ['tests/**/*_tests.js']
		}
	},
	release: {
		options: {
			bump: true,
			npm: true,
			npmTag: "<%= version %>"
		}
	}
});
grunt.registerTask("test", ["mochaTest:test"]);
grunt.registerTask("all", ["jshint", "test"]);
grunt.registerTask("default", ["all", "watch"]);
grunt.registerTask("prod", ["all", "release"]);
