'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var _ = require('underscore');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var PartialGenerator = module.exports = function PartialGenerator(args, options, config) {

	yeoman.generators.NamedBase.apply(this, arguments);

	try {
		this.appname = require(path.join(process.cwd(), 'package.json')).name;
	} catch (e) {
		this.appname = 'Cant find name from package.json';
	}

};

util.inherits(PartialGenerator, yeoman.generators.NamedBase);

PartialGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	var prompts = [{
		name: 'route',
		message: 'Enter your route name (i.e. /mypartial/:id).  If you don\'t want a route added for you, leave this empty.'
	},{
        name: 'group',
        message: 'Enter the group name (i.e. employees).  If you don\'t want to group, leave this empty.'
    }];

	this.prompt(prompts, function (props) {
		this.route = props.route;
        this.group = '';
        if(props.group){
            this.group = props.group+'/';
        }
		cb();
	}.bind(this));
};

PartialGenerator.prototype.files = function files() {

    var partialName = this.name;
    var groupName = this.group;
	var log = this.log;
    this.ctrlname = _.camelize(_.classify(partialName)) + 'Ctrl';

	this.template('partial.js', 'partial/'+groupName+partialName+'/'+partialName+'.js');
	this.template('partial.html', 'partial/'+groupName+partialName+'/'+partialName+'.html');
	this.template('partial.less', 'partial/'+groupName+partialName+'/'+partialName+'.less');
	this.template('spec.js', 'test/unit/partial/'+groupName+partialName+'/'+partialName+'.js');

    cgUtils.forEachFile('', /\.html/, function(file){
	   cgUtils.addToFile(file,'<script src="partial/'+groupName+partialName+'/'+partialName+'.js"></script>',cgUtils.PARTIAL_JS_MARKER,'  ');
	   log.writeln(' updating'.green + ' %s',file);
    });
	cgUtils.addToFile('css/app.less','@import "../partial/'+groupName+partialName+'/'+partialName+'.less";',cgUtils.PARTIAL_LESS_MARKER,'');
	this.log.writeln(' updating'.green + ' %s','app/app.less');

	if (this.route && this.route.length > 0){
        var route = this.route;
		cgUtils.forEachFile('js', /setup\.js/, function(file){
            cgUtils.addToFile('js/setup.js','when(\''+route+'\',{templateUrl: \'partial/'+groupName+partialName+'/'+partialName+'.html\'}).',cgUtils.ROUTE_MARKER,'\t');
    		log.writeln(' updating'.green + ' %s',file);
        });
	}

};
