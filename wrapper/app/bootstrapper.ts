'use strict';
var httpd = null;
var serverUrl = null;

var CordovaInit = function() {

	var onDeviceReady = function() {
		httpd = ( cordova && cordova.plugins && cordova.plugins.CorHttpd ) ? cordova.plugins.CorHttpd : null;
		httpd.startServer({
			'www_root' : '',
			'port' : 8080,
			'localhost_only' : true
		}, function( url ){
			// if server is up, it will return the url of http://<server ip>:port/ 
			// the ip is the active network connection 
			// if no wifi or no cell, "127.0.0.1" will be returned. 
			console.log("server is started: ", url);
			window.location.assign(url);
		}, function( error ){
			httpd.getURL(function(url){
    			if(url.length > 0) {
					if ('serviceWorker' in navigator) {
						navigator.serviceWorker.register('./serviceWorker.js', { scope: '/' }).then(function(reg) {
							if (reg.waiting) {
								_updateReady(reg.waiting);
							return;
							}

							if (reg.installing) {
								_trackInstalling(reg.installing);
							return;
							}

							reg.addEventListener('updatefound', function() {
								_trackInstalling(reg.installing);
							});
							console.log('Service Worker registered');
						}).catch(function(err) {
							console.log('Service Worker registration failed: ', err);
						});
					}
					receivedEvent();
    			} else {
    				console.log('failed to start server: ' + error);
					receivedEvent();
    			}
    		});
		});
	};

	var receivedEvent = function() {
		console.log('Start event received, bootstrapping application setup.');
		angular.bootstrap($('body'), ['mobile-wrapper']);
	};

	this.bindEvents = function() {
		document.addEventListener('deviceready', onDeviceReady, false);
	};

	//If cordova is present, wait for it to initialize, otherwise just try to
	//bootstrap the application.
	if (window.cordova !== undefined) {
		console.log('Cordova found, wating for device.');
		this.bindEvents();
	} else {
		console.log('Cordova not found, booting application');
		receivedEvent();
	}
};

$(function() {
	console.log('Bootstrapping!');
	persistence.store.cordovasql.config(
		persistence,
		'mobilewrapper',
		'0.0.1',                // DB version
		'Mobile wrapper db',          // DB display name
		5 * 1024 * 1024,        // DB size (WebSQL fallback only)
		0,                      // SQLitePlugin Background processing disabled
		2                       // DB location (iOS only), 0 (default): Documents, 1: Library, 2: Library/LocalDatabase
								//   0: iTunes + iCloud, 1: NO iTunes + iCloud, 2: NO iTunes + NO iCloud
								//   More information at https://github.com/litehelpers/Cordova-sqlite-storage#opening-a-database
	);
	new CordovaInit();
});

function _trackInstalling(worker) {
  worker.addEventListener('statechange', function() {
    if (worker.state == 'installed') {
      _updateReady(worker);
    }
  });
};

function _updateReady(worker) {
	worker.postMessage({action: 'skipWaiting'});
	console.log('Service worker updated!');
};