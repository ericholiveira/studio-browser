var grunt = require("grunt");
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-release');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-jsdoc');
grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
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
    },
    jsdoc2md: {
		dist: {
			src: 'src/*.js',
			dest: '.documentation/README.md'
		}
  	}
});
grunt.registerTask("test", ["jshint","mochaTest:test"]);
grunt.registerTask("all", ["test"]);
grunt.registerTask("default", ["all"]);
grunt.registerTask("doc",["jsdoc","jsdoc2md"]);
grunt.registerTask("prod", ["all", "release"]);
