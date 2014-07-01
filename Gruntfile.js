var path = require('path');

module.exports = function(grunt) {

  log = function(err, stdout, stderr, cb) {
    console.log(stdout);
    cb();
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    protractor: {
      options: {
        configFile: "test/protractor.conf.js", // Default config file
        args: {
          seleniumPort: 4444
        }
      },
      run: {}
    }
  });

  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.loadNpmTasks('grunt-selenium-webdriver');

  grunt.registerTask("test", "custom test", function() {
    var app = require('./app.js');
    app.set('port', process.env.PORT || 3000);

    var server = app.listen(app.get('port'), function() {
      grunt.log.writeln('Express server listening on port ' + server.address().port);
    });

    grunt.task.run("protractor");
  });

  // DEFAULT TASK
  grunt.registerTask('default', ['selenium_start', 'selenium_phantom_hub', 'test', 'selenium_stop']);

};
