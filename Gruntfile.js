module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    jshint: {
      files: ['src/js/*'],
      options: {
        strict: true,
        sub: true,
        smarttabs: true, // allow mixed-tabs/spaces to align things
        curly: true,
        indent: 2,
        newcap: true, // capitalize constructor names
        noempty: true, // no empty blocks
        undef: true, // no undefined vars (except defined globals)
        unused: "vars", // allow unused function arguments, disallow unused vars otherwise
        browser: true,
        jquery: true,
        globals: {
          console: true,
          _: true,
          angular: true,
          Modernizr: true,
          // tests
          beforeEach: true,
          afterEach: true,
          describe: true,
          expect: true,
          it: true,
          spyOn: true,
          inject: true,
          module: true,
          __indexOf: true,
          alert: true //to be removed - no alerts in build JS thank you!!
        }
      }
    },
    sass: {
      options: {
        style: 'compressed'
      },
      build: {
        files: {
          'dist/<%= pkg.name %>.css' : 'src/css/<%= pkg.name %>.scss'
        }
      }
    },
    watch: {
      css: {
        files: 'src/css/*.scss',
        tasks: ['sass']
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['jshint','uglify'],
        options: {
          spawn: false,
        },
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};