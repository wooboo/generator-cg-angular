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

function generateFiles(gen, name, type){
    gen.ctrlname = _.camelize(_.classify(name)) + _.camelize(type) + 'Ctrl';

    gen.template(type+'.js', 'partial/'+name+'/' +name+'-'+type+ '/' +type+'.js');
    gen.template(type+'.html', 'partial/'+name+'/'+name+'-'+type+ '/'+type+'.html');
    gen.template(type+'.less', 'partial/'+name+'/'+name+'-'+type+ '/'+type+'.less');
    gen.template(type+'-spec.js', 'test/unit/partial/'+name+'/'+name+'-'+type+ '/'+type+'.js');

    cgUtils.addToFile('index.html','<script src="partial/'+name+'/'+name+'-'+type+ '/'+type+'.js"></script>',cgUtils.PARTIAL_JS_MARKER,'  ');
    gen.log.writeln(' updating'.green + ' %s','index.html');

    cgUtils.addToFile('css/app.less','@import "../partial/'+name+'/'+name+'-'+type+ '/'+type+'.less";',cgUtils.PARTIAL_LESS_MARKER,'');
    gen.log.writeln(' updating'.green + ' %s','app/app.less');

}
PartialGenerator.prototype.files = function files() {

    generateFiles(this, this.name, 'list')
    generateFiles(this, this.name, 'new')
    generateFiles(this, this.name, 'edit')
    this.template('service.js', 'service/'+this.name+'.js');
    this.template('service-spec.js', 'test/unit/service/'+this.name+'.js');

    cgUtils.addToFile('index.html','<script src="service/'+this.name+'.js"></script>',cgUtils.SERVICE_JS_MARKER,'  ');

    cgUtils.addToFile('js/setup.js','when(\'/'+this.name+'\',{templateUrl: \'partial/'+this.name+'/'+this.name+'-list/list.html\'}).',cgUtils.ROUTE_MARKER,'\t');
    cgUtils.addToFile('js/setup.js','when(\'/'+this.name+'/new\',{templateUrl: \'partial/'+this.name+'/'+this.name+'-new/new.html\'}).',cgUtils.ROUTE_MARKER,'\t');
    cgUtils.addToFile('js/setup.js','when(\'/'+this.name+'/:id\',{templateUrl: \'partial/'+this.name+'/'+this.name+'-edit/edit.html\'}).',cgUtils.ROUTE_MARKER,'\t');
    this.log.writeln(' updating'.green + ' %s','js/setup.js');


};
