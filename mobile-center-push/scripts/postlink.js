var rnpmlink = require('mobile-center-link-scripts');
var package = require('./../package.json');

return rnpmlink.ios.initMobileCenterConfig().then(function (file) {
    var code = '  [RNPush register];  // Initialize Mobile Center push';
    return rnpmlink.ios.initInAppDelegate('#import <RNPush/RNPush.h>', code);
}).then(function (file) {
    console.log('Added code to initialize iOS Push SDK in ' + file);
    return rnpmlink.ios.addPodDeps([
        { pod: 'MobileCenter/Push', version: '0.11.2' },
        { pod: 'RNMobileCenterShared', version: '0.8.1' } // in case people don't link mobile-center (core)
    ]).catch(function (e) {
        console.log(`
            Could not install dependencies using CocoaPods.
            Please refer to the documentation to install dependencies manually.

            Error Reason - ${e.message}
        `)
        return Promise.resolve();
    })
});
