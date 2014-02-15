'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {

	yeoman.generators.NamedBase.apply(this, arguments);

	try {
		this.appname = require(path.join(process.cwd(), 'package.json')).name;
	} catch (e) {
		this.appname = 'Cant find name from package.json';
	}

};

util.inherits(ServiceGenerator, yeoman.generators.NamedBase);

ServiceGenerator.prototype.files = function files() {
	var serviceName = this.name;
    this.template('service.js', 'service/'+serviceName+'.js');
	this.template('spec.js', 'test/unit/service/'+serviceName+'.js');
    var log = this.log;

    cgUtils.forEachFile('', /\.html/,function(file){
        cgUtils.addToFile(file,'<script src="service/'+serviceName+'.js"></script>',cgUtils.SERVICE_JS_MARKER,'  ');
        log.writeln(' updating'.green + ' %s',file);
    });
};
