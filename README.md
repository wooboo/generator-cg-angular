#generator-cg-angular

>Yeoman Generator for Enterprise Angular Projects

Features

* Provides a directory structure geared towards large Angular projects.
    * Each controller, service, filter, and directive are placed in their own file.
    * All files related to a conceptual unit are placed together.  For example, the controller, HTML, LESS, and unit test for a partial are placed together in the same directory.
* Provides a ready-made Grunt build that produces an extremely optimized distribution.
   * Build uses [grunt-ngmin](https://github.com/btford/grunt-ngmin) so you don't have to use the Angular injection syntax for safe minification (i.e. you dont need `$inject` or `(['$scope','$http',...`.
   * `grunt server` task allows you to run a simple development server with watch/livereload enabled.  Additionally, JSHint and the appropriate unit tests are run for the changed files.
* Integrates Bower for package management
* Includes Yeoman sub-generators for directives, services, partials, and filters
* Integrates LESS and includes Bootstrap via the source LESS files allowing you to reuse Bootstrap vars/mixins/etc.
* Easily Testable - Each sub-generator creates a skeleton unit test.  Unit tests can be run via `grunt test` and they run automatically during the grunt watch that is active during `grunt server`.

Directory Layout
-------------
Below is an explanation of the folder structure.

    /css ........................... usually only contains app.less
        app.less ................... main app-wide styles
    /img ........................... images (not created by default but included in /dist if added)
    /js ............................ app global javascript files
        setup.js ................... angular module initialization and route setup
    /directive ..................... angular directives folder
        my-directive.js ............ example simple directive
        my-directive-spec.js ....... example simple directive unit test
        /my-directive2 ............. example complex directive (contains external partial)
            my-directive2.js ....... complex directive javascript
            my-directive2.html...... complex directive partial
            my-directive2.less ..... complex directive LESS
            my-directive2-spec.js .. complex directive unit test
    /filter ........................ angular filters folder
        my-filter.js ............... example filter
        my-filter-spec.js .......... example filter unit test
    /partial ....................... angular partials folder
        /my-partial ................ example partial
            my-partial.html ........ example partial html
            my-partial.js .......... example partial controller
            my-partial.less ........ example partial LESS
            my-partial-spec.js ..... example partial unit test
    /service ....................... angular services folder
        my-service.js .............. example service
        my-service-spec.js ......... example service unit test
    /dist .......................... distributable version of app built using grunt and Gruntfile.js
    /bower_component................ 3rd party libraries managed by bower
    /node_modules .................. npm managed libraries used by grunt

The `directive`, `filter`, `partial`, and `service` directories won't exist until one of the relevant components is created using a sub-generator.

Getting Started
-------------

Prerequisites: Node, Grunt, Yeoman, and Bower.  Once Node is installed, do:

    npm install -g grunt-cli yo bower

Next, install this generator:

    npm install -g generator-cg-angular

To create a project:

    mkdir MyNewAwesomeApp
    cd MyNewAwesomeApp
    yo cg-angular

Grunt Tasks
-------------

Now that the project is created, you have 3 simple Grunt commands available:

    grunt server  #This will run a development server with watch & livereload enabled.
    grunt test    #Run unit tests.
    grunt build   #Places a fully optimized (minified, concatenated, and more) in /dist

When `grunt server` is running, any changed javascript files will be validated using JSHint as well as have their appropriate unit tests executed.  Only the unit tests that correspond to the changed file will be run.

Yeoman Subgenerators
-------------

There are a set of sub-generators to initialize empty Angular components.  Each of these generators will:

* Create one or more skeleton files (javascript, LESS, html, spec etc) for the component type.
* Update index.html and add the necessary `script` tags.
* Update app.less and add the @import as needed.
* For partials, update the setup.js, adding the necessary route call if a route was entered in the generator prompts.

There are generators for `directive`,`partial`,`service`, and `filter`.

Running a generator:

    yo cg-angular:directive my-awesome-directive
    yo cg-angular:partial my-partial
    yo cg-angular:service my-service
    yo cg-angular:filter my-filter

The name paramater passed (i.e. 'my-awesome-directive') will be used for directory and/or file names.  The generators will derive appropriate class names from this parameter (ex. 'my-awesome-directive' will convert to a class name of 'MyAwesomeDirective').

One quick note, each sub-generator pulls the Angular app/module name from the package.json.  Therefore, if you choose to change the name of your Angular app/module, you must ensure that the name in the package.json stays in sync.

Preconfigured Libraries
-------------

The new app will have a handful of preconfigured libraries included.  This includes Angular 1.2, Bootstrap 3, AngularUI Bootstrap, AngularUI Utils, FontAwesome 4, JQuery 2, Underscore 1.5, LESS 1.5, and Moment 2.5.  You may of course add to or remove any of these libraries.  But the work to integrate them into the app and into the build process has already been done for you.

Build Process
-------------

The project will include a ready-made Grunt build that will:

* Build all the LESS files into one minified CSS file.
* Uses [grunt-angular-templates](https://github.com/ericclemmons/grunt-angular-templates) to turn all your partials into Javascript.
* Uses [grunt-ngmin](https://github.com/btford/grunt-ngmin) to preprocess all Angular injectable methods and add the necessary Angular annotations to ensure minification will not break your app (and you don't have to use the array syntax to
manually add the annotations nor $inject).  Read more about [ngmin](https://github.com/btford/ngmin).
* Concatenates and minifies all Javascript into one file.
* Replaces all appropriate script references in `index.html` with the minified CSS and JS files.
* Minifies any images in `/img`.
* Minifies the `index.html`.
* Copies any extra files necessary for a distributable build (ex.  Font-Awesome font files, etc).

The resulting build loads only a few highly compressed files.

The build process uses [grunt-dom-munger](https://github.com/wooboo/grunt-dom-munger) to pull script references from the `index.html`.  This means that **your index.html is the single source of truth about what makes up your app**.  Adding a new library, new controller, new directive, etc does not require that you update the build file.  Also the order of the scripts in your `index.html` will be maintained when they're concatenated.

Importantly, `grunt-dom-munger` uses JQuery selectors to manage the parsing of the script tags. It is very easy to exclude certain scripts from the build.  For example, the project includes a references to the `livereload.js` from the `grunt-contrib-watch` task.  But this file should not be included in a production build.  Thus the `grunt-dom-munger` task is configured with a selector like `script[data-build!="exclude"]` and the script tag for `livereload.js` includes an attribute like `data-build="exclude"`.  You can use this flexibility in your project to include/exclude scripts in your production builds.

Release History
-------------
* 1/06/2013 - v2.1.0 - Nice enhancements for unit testing.  Specs are now placed in the same directory as the component they're testing.  Additionally, unit tests are now run during `grunt server` allowing for an easy and efficient test-driven workflow.
* 12/30/2013 - v2.0.0 - Big Update.  Angular 1.2 and Bootstrap 3.  Newer versions of Angular UI, Font Awesome, and JQuery.  Lodash was replaced with Underscore.  Lots of other small changes.
* 9/06/2013 - V1.0.4 - Fixed templating issue with generated specs for `yo cg-angular:service` subgenerator.
* 8/29/2013 - V1.0.3 - Renamed `/lib` back to `/bower_components` as clarity trumps brevity.  Renamed `/bin` to `/dist`. Fixed spelling error in generated directive's js template location.  Moved up to later version of `yeoman-generator` dependency to solve "Cannot read bold of undefined" error coming from Yeoman.  JSHint options now read from `.jshintrc`.  And more small stuff.
* 7/08/2013 - V1.0.2 - Added utf8 charset to index.html.  Fix for "EMFile, too many open files" on `grunt watch` by no longer watching the `lib` folder.
* 6/20/2013 - v1.0.1 - Fixed a ton of known issues.  Replaced `grunt-regarde` with `grunt-contrib-watch`.  Fixed and tweaked the unit test specs and `grunt test`.  Fixed issues with the build.  Generator is now ready for real use.
* 6/18/2013 - v1.0.0 - Initial release of template as Yeoman generator.
