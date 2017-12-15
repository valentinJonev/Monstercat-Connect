var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.cordova = require('cordova-lib').cordova.raw;
var del = require('del');
var es = require('event-stream');    
var bowerFiles = require('main-bower-files');
var print = require('gulp-print');
var Q = require('q');   

var cordovaPlugins = ['cordova-plugin-file-transfer'];

var paths = {
    scripts: './app/**/*.ts',
    styles: './styles/*.css',
    misc: './misc/**',
    views: './app/**/*.html',
    index: './app/index.html',
    tsDefinitions: './typings/**/*.ts',
    dist: './www',
    distScripts: './www/js',
    distStyles: './www/css',
    distViews: './www',
    distMisc: './www/misc',
    serviceWorker: './app/serviceWorker.js'
};

var tsProject = plugins.typescript.createProject('./app/tsconfig.json');

var pipes = {};

pipes.orderedVendorScripts = function() {
    return plugins.order(['angular.js', 'angular-ui-router.js', 'angular-sanitize.js', 'ng-cordova.js', 'loading-bar.min.js', 'angular-animate.min.js', 'mustache.js', 'ui-bootstrap-tpls.js', 'onsenui.js', 'angular-onsenui.min.js', 'jquery.js']);
};

pipes.orderedAppScripts = function() {  
    return plugins.angularFilesort();
};

pipes.minifiedFileName = function() {  
    return plugins.rename(function (path) {
        path.extname = '.min' + path.extname;
    });
};

gulp.task('ts-lint', function () {
    return gulp.src(paths.scripts).pipe(plugins.tslint()).pipe(plugins.tslint.report('prose'));
});

pipes.compileTypescript = function () {
    var sourceTsFiles = [paths.scripts,                //path to typescript files
                         paths.tsDefinitions]; //reference to library .d.ts files
                        

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(tsProject());

        tsResult.dts.pipe(plugins.angularFilesort()).pipe(gulp.dest(paths.distScripts));
        return tsResult.js
                        .pipe(plugins.angularFilesort())
                        .pipe(gulp.dest(paths.distScripts));
};

pipes.builtVendorScriptsDev = function() {  
    return gulp.src(bowerFiles())
        .pipe(pipes.orderedVendorScripts())
        .pipe(gulp.dest(paths.distScripts));
};

pipes.builtVendorScriptsProd = function() {  
    return gulp.src(bowerFiles())
        .pipe(pipes.orderedVendorScripts())
        .pipe(plugins.concat('lib.min.js'))
        .pipe(gulp.dest(paths.distScripts));
};

pipes.builtStylesDev = function() {  
    return gulp.src(paths.styles)
        .pipe(gulp.dest(paths.distStyles));
};

pipes.builtMiscFolder = function() {  
    return gulp.src(paths.misc)
        .pipe(gulp.dest(paths.distMisc));
};

pipes.builtServiceWorker = function(){
    return gulp.src(paths.serviceWorker)
        .pipe(gulp.dest(paths.dist));
};

pipes.builtStylesProd = function() {  
    return gulp.src(paths.styles)
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.minifyCss())
        .pipe(plugins.sourcemaps.write())
        .pipe(pipes.minifiedFileName())
        .pipe(gulp.dest(paths.distStyles));
};

pipes.builtViews = function(){
    return gulp.src(paths.views)
        .pipe(gulp.dest(paths.distViews));
};

pipes.validatedIndex = function() {  
    return gulp.src(paths.index)
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
};

pipes.builtIndexDev = function() {

    var orderedVendorScripts = pipes.builtVendorScriptsDev()
        .pipe(pipes.orderedVendorScripts());

    var orderedAppScripts = pipes.compileTypescript()
        .pipe(pipes.orderedAppScripts());

    var appStyles = pipes.builtStylesDev();

    var appViews = pipes.builtViews();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.dist)) // write first to get relative path for inject
        .pipe(plugins.inject(orderedVendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(orderedAppScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(gulp.dest(paths.dist));
};

pipes.builtIndexProd = function() {

    var vendorScripts = pipes.builtVendorScriptsDev()
        .pipe(pipes.orderedVendorScripts());
    var appScripts = pipes.compileTypescript();
    var appStyles = pipes.builtStylesProd();
    var appViews = pipes.builtViews();
    var misc = pipes.builtMiscFolder();
    var serviceWorker = pipes.builtServiceWorker();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.dist)) // write first to get relative path for inject
        .pipe(plugins.inject(vendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(appScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(plugins.htmlmin({removeComments: true}))
        .pipe(gulp.dest(paths.dist));
};

gulp.task('clean', function() {
    var deferred = Q.defer();
    del(paths.dist, function() {
        deferred.resolve();
    });
    return deferred.promise;
});

pipes.builtAppProd = function() {  
    return pipes.builtIndexProd();
};

gulp.task('build-app-prod', pipes.builtAppProd);  

gulp.task('clean-build-app-prod', ['clean'], pipes.builtAppProd); 

gulp.task('default', ['clean-build-app-prod']);  

gulp.task('build', ['clean-build-app-prod'], function(){
    plugins.cordova.plugins('add', cordovaPlugins)
        .then(function(){
            plugins.cordova.build();
        })
})

gulp.task('run', ['build'], function(){
    plugins.cordova.run({platforms: ['android']})
});