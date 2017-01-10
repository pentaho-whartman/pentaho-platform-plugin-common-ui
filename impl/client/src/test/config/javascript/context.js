/* globals window, requirejs */

// Find and inject tests using requirejs
var tests = Object.keys(window.__karma__.files).filter(function(file) {
    return (/.spec\.js$/).test(file);
});

var requirePaths   = requireCfg.paths;
var requireShim    = requireCfg.shim;
var requireMap     = requireCfg.map;

requireCfg.baseUrl = "/base";

// Javascript Tests source files
requirePaths["tests"] = baseTest;

requirePaths["dojo"] = depWebJars + "/dojo/${dojo.version}";
requirePaths["dijit"] = depWebJars + "/dijit/${dojo.version}";
requirePaths["dojox"] = depDir + "/dojo-release-${dojo.version}-src/dojox";


// ...Overrides
requirePaths["dojo/on"] = dojoOverrides + "dojo/on";
requirePaths["dojo/dom-geometry"] = dojoOverrides + "dojo/dom-geometry";
requirePaths["dojo/dom-prop"] = dojoOverrides + "dojo/dom-prop";
requirePaths["dojox/layout/ResizeHandle"] = dojoOverrides + "dojox/layout/ResizeHandle";
requirePaths["dojox/grid/_View"] = dojoOverrides + "dojox/grid/_View";
requirePaths["dojox/xml/parser"] = dojoOverrides + "dojox/xml/parser";
requirePaths["dojox/grid/Selection"] =  dojoOverrides + "dojox/grid/Selection";
requirePaths["dojox/grid/_FocusManager"] = dojoOverrides + "dojox/grid/_FocusManager";
requirePaths["dojox/grid/_Scroller"] = dojoOverrides + "dojox/grid/_Scroller";
requirePaths["dojox/storage"] = dojoOverrides + "dojox/storage";
requirePaths["dojox/json"] = dojoOverrides + "dojox/json";
requirePaths["dojox/rpc"] = dojoOverrides + "dojox/rpc";
requirePaths["dojo/_base/kernel"] = dojoOverrides + "dojo/_base/kernel";
requirePaths["dojo/_base/config"] = dojoOverrides + "dojo/_base/config";
requirePaths["dojo/store/Memory"] = dojoOverrides + "dojo/store/Memory";
requirePaths["dijit/_HasDropDown"] = dojoOverrides + "dijit/_HasDropDown";
requirePaths["dijit/_CssStateMixin"] = dojoOverrides + "dijit/_CssStateMixin";


requirePaths["pentaho/CustomContextVars"] = basePath + "/pentaho/CustomContextVars";

// TODO: remove this mapping after all Pentaho consumers of GlobalContextVars (DET, Analyzer, CDF) have been changed.
requireMap["*"]["pentaho/GlobalContextVars"] = "pentaho/CustomContextVars";

// TODO: Only used if not defined explicitly by webcontext.js.
// When the latter is converted to do so, these 2 paths can be removed as well as the `_globalContextVars` module.
requirePaths["pentaho/_globalContextVars"] = basePath + "/pentaho/_globalContextVars";
requirePaths["pentaho/contextVars"] = requirePaths["pentaho/_globalContextVars"];

requirePaths["common-ui"     ] = basePath;
requirePaths["common-data"   ] = basePath + "/dataapi";
requirePaths["common-repo"   ] = basePath + "/repo";
requirePaths["pentaho/common"] = basePath + "/dojo/pentaho/common";

// TODO: Only used if not defined explicitly by webcontext.js.
// Unfortunately, mantle already maps the "pentaho" id to "/js",
// so all the following sub-modules must be mapped individually.
requirePaths["pentaho/data"   ] = basePath + "/pentaho/data";
requirePaths["pentaho/lang"   ] = basePath + "/pentaho/lang";
requirePaths["pentaho/type"   ] = basePath + "/pentaho/type";
requirePaths["pentaho/util"   ] = basePath + "/pentaho/util";
requirePaths["pentaho/visual" ] = basePath + "/pentaho/visual";
requirePaths["pentaho/service"] = basePath + "/pentaho/service";
requirePaths["pentaho/i18n"   ] = baseTest + "/pentaho/i18nMock";
requirePaths["pentaho/shim"   ] = basePath + "/pentaho/shim";

requirePaths["common-ui/jquery-clean"] = depWebJars + "/jquery/${jquery.version}/dist/jquery";
requireShim["common-ui/jquery-clean"] = {
    exports: "$",
    init: function() { return $.noConflict(true); }
};

requirePaths["common-ui/underscore"] = basePath + "/underscore/underscore";

requirePaths["json"] = basePath + "/util/require-json/json";
requirePaths["text"] = basePath + "/util/require-text/text";

requireCfg.deps = tests;

function mapTheme(mid, themeRoot, themes) {
  var theme = (typeof active_theme !== "undefined") ? active_theme : null;
  if(!theme || themes.indexOf(theme) < 0) theme = themes[0];

  // e.g. "/theme" -> "/themes/crystal"
  requireMap["*"][mid + "/theme"] = mid + "/" + themeRoot + "/" + theme;
}

/*function registerVizPackage(name) {
  requireCfg.packages.push({"name": name, "main": "model"});

  requireService[name] = "pentaho/visual/base";
}*/

// Metadata Model Base Theme
mapTheme("pentaho/type", "themes", ["crystal"]);

// CCC Themes
mapTheme("pentaho/visual/ccc", "_themes", ["crystal", "sapphire", "onyx", "det"]);

// sample/calc theme
mapTheme("pentaho/visual/samples/calc", "themes", ["crystal"]);

requireCfg.callback = function() {
    window.__karma__.start();
};

requirejs.config(requireCfg);
