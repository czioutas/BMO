/*
My grunt foo is low at the moment. But I want to add the filename aka fpm
and camelCase the function name only on the generated Directve.js file
so the function in fpms.js::status() would become fpmStatus()
*/

module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      options: {
        separator: grunt.util.linefeed
      },
      dist: {
        src: ['Directives/*.js'],
        dest: 'Directives/Directive.js'
      }
    },
    pkg: grunt.file.readJSON('package.json'),
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat']);
};
