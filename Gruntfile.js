var grunt = require("grunt");
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-release');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-jsdoc');
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
	},
	jsdoc : {
        dist : {
            src: ['src/*.js','README.md'],
            options: {
                destination: '.documentation',
                template : "node_modules/ink-docstrap/template",
              	configure : "node_modules/ink-docstrap/template/jsdoc.conf.json"
            }
        }
    }
});
grunt.registerTask("test", ["mochaTest:test"]);
grunt.registerTask("all", ["jshint", "test"]);
grunt.registerTask("default", ["all"]);
grunt.registerTask("prod", ["all", "release"]);
