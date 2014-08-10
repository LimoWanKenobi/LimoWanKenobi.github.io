// https://github.com/dannygarcia/grunt-jekyll
 
/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    jekyll: {                             // Task
      options: {                          // Universal options
        bundleExec: true
      },
      serve: {                            // Another target
        options: {
          drafts: true,
          watch: true,
          serve: true,
          port:4000
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('default', ['jshint', 'jekyll']);
};