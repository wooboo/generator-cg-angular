'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {

	yeoman.generators.NamedBase.apply(this, arguments);

	try {
		this.appname = require(path.join(process.cwd(), 'package.json')).name;
	} catch (e) {
		this.appname = 'Cant find name from package.json';
	}

};

util.inherits(DirectiveGenerator, yeoman.generators.NamedBase);

DirectiveGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	var prompts = [{
		type:'confirm',
		name: 'needpartial',
		message: 'Does this directive need an external html file (i.e. partial)?',
		default: true
	}];

	this.prompt(prompts, function (props) {
		this.needpartial = props.needpartial;

		cb();
	}.bind(this));
};

DirectiveGenerator.prototype.files = function files() {

    var directiveName = this.name;

	if (this.needpartial){
		this.template('directive.js', 'directive/'+directiveName+'/'+directiveName+'.js');
		this.template('directive.html', 'directive/'+directiveName+'/'+directiveName+'.html');
		this.template('directive.less', 'directive/'+directiveName+'/'+directiveName+'.less');
		this.template('spec.js', 'test/unit/directive/'+directiveName+'/'+directiveName+'.js');


        cgUtils.forEachFile('', /\.html/, function(file){
            cgUtils.addToFile(file,'<script src="directive/'+directiveName+'/'+directiveName+'.js"></script>',cgUtils.DIRECTIVE_JS_MARKER,'  ');
        });
		this.log.writeln(' updating'.green + ' %s','index.html');

		cgUtils.addToFile('css/app.less','@import "../directive/'+directiveName+'/'+directiveName+'.less";',cgUtils.DIRECTIVE_LESS_MARKER,'');
		this.log.writeln(' updating'.green + ' %s','app/app.less');
	} else {
		this.template('directive_simple.js', 'directive/'+directiveName+'.js');
		this.template('spec.js', 'test/unit/directive/'+directiveName+'/'+directiveName+'.js');

		cgUtils.forEachFile('', /\.html/, function(file){
            cgUtils.addToFile(file,'<script src="directive/'+directiveName+'.js"></script>',cgUtils.DIRECTIVE_JS_MARKER,'  ');
        });
		this.log.writeln(' updating'.green + ' %s','index.html');
	}

};
