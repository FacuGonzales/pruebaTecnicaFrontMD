// Karma configuration
// Generated on Wed Feb 26 2025 05:38:56 GMT-0300 (hora estándar de Argentina)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    files: [
      'src/**/*.ts',
      'src/**/*.spec.ts'
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.ts': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    angularCli: {
      environment: 'dev'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
}

