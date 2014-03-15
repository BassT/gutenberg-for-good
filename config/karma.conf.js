module.exports = function(config) {
	config.set({
		basePath : '../',

		files : [ 'app/lib/angular/angular.js', 'app/lib/angular/angular-*.js',
				'app/lib/ui-bootstrap-0.10.0.js',
				'app/lib/ui-bootstrap-tpls-0.10.0.js',
				'test/lib/angular/angular-mocks.js', 'app/js/**/*.js',
				//'app/js/controllers.js',
				// 'test/unit/servicesSpec.js',
				//'test/unit/**/*.js'
				//'test/unit/service tests/AnalysisFactory.spec.js',
				'test/unit/controller tests/First-OrderMonkeyCtrl.spec.js'
				],

		exclude : [ 'app/lib/angular/angular-loader.js',
				'app/lib/angular/*.min.js',
				'app/lib/angular/angular-scenario.js' ],

		autoWatch : true,

		frameworks : [ 'jasmine' ],

		browsers : [ 'Chrome' ],

		plugins : [ 'karma-chrome-launcher', 'karma-firefox-launcher',
				'karma-jasmine' ],

	});
};
