module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '\n/*!\n' +
              ' * <%= pkg.name %> v<%= pkg.version %> by tsov\n' +
              '' +
              ' * Copyright <%= grunt.template.today("yyyy") %> Air-Menu\n' +
              '' +
              ' */\n',


    html2js: {
      options: {
        module: 'air-menu-ui.templates',
        rename: function(moduleName) {
          return '/air-menu' + moduleName.match(/\/[\w-]*\.html/);
        }
      },
      main: {
        src: ['partials/**/*.html'],
        dest: 'js/templates.js'
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      'air_menu': {
        src: [
          'js/**/*.js'
        ],
        dest: 'app/assets/lib/<%= pkg.name %>-<%= pkg.version %>.js'
      },
      bootstrap: {
        src: [
          'app/assets/lib/bootstrap/affix.js',
          'app/assets/lib/bootstrap/alert.js',
          'app/assets/lib/bootstrap/button.js',
          'app/assets/lib/bootstrap/carousel.js',
          'app/assets/lib/bootstrap/collapse.js',
          'app/assets/lib/bootstrap/dropdown.js',
          'app/assets/lib/bootstrap/modal.js',
          'app/assets/lib/bootstrap/tooltip.js',
          'app/assets/lib/bootstrap/popover.js',
          'app/assets/lib/bootstrap/scrollspy.js',
          'app/assets/lib/bootstrap/tab.js',
          'app/assets/lib/bootstrap/transition.js'
        ],
        dest: 'app/assets/lib/bootstrap-3.1.0.js'
      },
      air_menu_standalone: {
        src: [
          'app/assets/lib/jquery-2.0.2.js',
          'app/assets/lib/bootstrap-3.1.0.js',
          'app/assets/lib/angular/angular.js',
		  'app/assets/lib/angular/angular-animate.js',
		  'app/assets/lib/angular/angular-cookies.js',
		  'app/assets/lib/angular/angular-loader.js',
		  'app/assets/lib/angular/angular-resource.js',
		  'app/assets/lib/angular/angular-route.js',
		  'app/assets/lib/angular/angular-sanitize.js',
		  'app/assets/lib/angular/angular-touch.js',
          'app/assets/lib/breakpoint-0.0.1.js',
          'app/assets/lib/underscore-1.6.0.js',
          'app/assets/lib/angular-google-maps-1.0.18.js',
          '<%= concat.air_menu.dest %>'
        ],
        dest: 'app/assets/lib/<%= pkg.name %>-standalone-<%= pkg.version %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      air_menu: {
        src: ['<%= concat.air_menu.dest %>'],
        dest: 'app/assets/lib/<%= pkg.name %>-<%= pkg.version %>.min.js'
      },
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: 'app/assets/lib/bootstrap-3.1.0.min.js'
      },
      air_menu_standalone: {
        src: ['<%= concat.air_menu_standalone.dest %>'],
        dest: 'app/assets/lib/<%= pkg.name %>-standalone-<%= pkg.version %>.min.js'
      }
    },

    less: {
	  air_menu: {
	    options: {
		  paths: ['less']
	    },
		files: {
			"app/assets/css/<%= pkg.name %>-<%= pkg.version %>.css": ["less/application.less", "app/assets/css/font-awesome.css"]
		}
	  },
      air_menu_min: {
	    options: {
		  paths: ['less']
	    },
	    files: {
		  "app/assets/css/<%= pkg.name %>-<%= pkg.version %>.min.css": ["less/application.less", "app/assets/css/font-awesome.css"]
	    }
	  }
    },

    watch: {
      css: {
        files: ['less/**/*.less'],
        tasks: ['less']
      },
      partials: {
        files: ['partials/**/*.html'],
        tasks: ['html2js']
      },
      air_menu: {
        files: ['js/**/*.js'],
        tasks: ['concat:air_menu']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['html2js', 'concat', 'uglify', 'less']);
};