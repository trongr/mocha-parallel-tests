'use strict';

var child_process = require('child_process');
var fs = require('fs');
var Mocha = require('mocha');
var statSync = require('fs').statSync;

var MochaParallelTests = module.exports = function (options) {
    var _dir = String(options._);

    process.setMaxListeners(0);

    options._.forEach(function (testPath) {
        var isDirectory = statSync(testPath).isDirectory();
        var paths = [];

        // if directory get files
        if (isDirectory) {
            fs.readdirSync(testPath).forEach(function(file){
                if (file.substr(-3) === '.js') {
                    paths.push(testPath + '/' + file)
                }
            });
        } else {
            paths.push(testPath);
        }

        paths.forEach(function (file) {
            var filePath = process.cwd() + '/' + file;
            // need to add try catch for filter
            // try {
            //     require(filePath);
            // } catch (ex) {
            // }

            var mocha = new Mocha(options);
            mocha.addFile(filePath);
            mocha.run();
        });

    });
};
