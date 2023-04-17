// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"5AnEX":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "a8fb9c35fdafe466";
module.bundle.HMR_BUNDLE_ID = "eb559f7a5516e4b1";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"eeGnE":[function(require,module,exports) {
/**
 * The class represents a constraint satisfaction problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Problem", ()=>Problem);
var _variableJs = require("./variable.js");
var _domainRangedJs = require("./domain-ranged.js");
var _domainArbitraryJs = require("./domain-arbitrary.js");
var _constraintJs = require("./constraint.js");
var _constraint1Js = require("./constraint-1.js");
var _constraint2Js = require("./constraint-2.js");
var _constraint3Js = require("./constraint-3.js");
class Problem {
    _isFuzzy = false;
    _vars = [];
    _cons = [];
    // Generation Methods --------
    /**
	 * Adds a variable to this problem.
	 * @param Variable v A variable.
	 */ addVariable(v) {
        v.setIndex(this._vars.length);
        this._vars.push(v);
    }
    /**
	 * Generates a domain.
	 * @param args {
	 *   @type Array 'values' Multiple values.
	 *
	 *   @type Number 'min' Minimum value.
	 *   @type Number 'max' Maximum value.
	 * }
	 * @return A domain.
	 */ createDomain(args) {
        if (args.values) return new (0, _domainArbitraryJs.DomainArbitrary)(args.values);
        else if ("min" in args && "max" in args) return new (0, _domainRangedJs.DomainRanged)(args.min, args.max);
        return null;
    }
    /**
	 * Generates a variable.
	 * @param Array args {
	 *   @type string 'name'   Display name.
	 *   @type Domain 'domain' A domain.
	 *   @type *      'value'  A value.
	 * }
	 * @return A variable.
	 */ createVariable(args) {
        if (args.value && !args.domain.contains(args.value)) throw new Error();
        const v = new (0, _variableJs.Variable)(this, args.domain);
        this.addVariable(v);
        if (args.name) v.setName(args.name);
        if (args.value) v.assign(args.value);
        return v;
    }
    /**
	 * Generates a constraint.
	 * @param Array args {
	 *   @type string   'name'      Display name.
	 *   @type Array    'variables' Variables.
	 *   @type Relation 'relation'  A relation.
	 * }
	 * @return A constraint.
	 */ createConstraint(args) {
        for (const v of args.variables){
            if (v.owner() !== this) return null;
        }
        let c;
        if (args.variables.length === 1) c = new (0, _constraint1Js.Constraint1)(args.relation, ...args.variables);
        else if (args.variables.length === 2) c = new (0, _constraint2Js.Constraint2)(args.relation, ...args.variables);
        else if (args.variables.length === 3) c = new (0, _constraint3Js.Constraint3)(args.relation, ...args.variables);
        else c = new ConstraintN(args.relation, args.variables);
        c.setIndex(this._cons.length);
        this._cons.push(c);
        for (const v of args.variables)v.connect(c);
        if (c.isFuzzy()) this._isFuzzy = true;
        if (args.name) c.setName(args.name);
        return c;
    }
    //  Modification Methods --------
    /**
	 * Remove the constraint.
	 * @param c Constraints to be removed.
	 */ removeConstraint(c) {
        const index = this._cons.indexOf(c);
        this._cons.remove(c);
        for(let i = index; i < this._cons.length; ++i)this._cons[i].setIndex(i);
        for (const v of c)v.disconnect(c);
        this._isFuzzy = false;
        for (const c of this._cons)if (c.isFuzzy()) {
            this._isFuzzy = true;
            break;
        }
    }
    /**
	 * Changes the status of all variables to unassigned.
	 */ clearAllVariables() {
        for (const v of this._vars)v.clear();
    }
    /**
	 * Reverse the order of variables.
	 * The index of each variable is reassigned.
	 */ reverseVariables() {
        this._vars.reverse();
        for(let i = 0; i < this._vars.length; ++i)this._vars[i].setIndex(i);
    }
    /**
	 * Sorts variables using a specified comparator.
	 * The index of each variable is reassigned.
	 * @param comparator A comparator.
	 */ sortVariables(comparator) {
        this._vars.sort(comparator);
        for(let i = 0; i < this._vars.length; ++i)this._vars[i].setIndex(i);
    }
    // Methods for Variables --------
    /**
	 * Returns the number of variables in the problem.
	 * @return Number of variables
	 */ variableSize() {
        return this._vars.length;
    }
    /**
	 * Returns a variable by index.
	 * @param index Index (0 <= index < getVariableSize()).
	 * @return A variable
	 */ variableAt(index) {
        return this._vars[index];
    }
    /**
	 * Returns a variable by name.
	 * @param name Name.
	 * @return A variable.
	 */ variableOf(name) {
        for (const v of this._vars){
            if (v.name() === name) return v;
        }
        return null;
    }
    /**
	 * Returns whether the variable is contained or not.
	 * @param v A variable.
	 * @return True if contained.
	 */ hasVariable(v) {
        return this._vars.includes(v);
    }
    /**
	 * Returns the list of variables.
	 * The returned list is not allowed to be modified.
	 * @return The variable list.
	 */ variables() {
        return this._vars;
    }
    // Methods for Constraints --------
    /**
	 * Gets the number of constraints in the problem.
	 * @return Number of constraints
	 */ constraintSize() {
        return this._cons.length;
    }
    /**
	 * Returns a constraint with an index.
	 * @param index Index (0 <= index < constraintSize()).
	 * @return A constraint.
	 */ constraintAt(index) {
        return this._cons[index];
    }
    /**
	 * Returns a constraint by name.
	 * @param name Name.
	 * @return A constraint.
	 */ constraintOf(name) {
        for (const c of this._cons){
            if (c.name() === name) return c;
        }
        return null;
    }
    /**
	 * Returns whether the constraint is contained or not.
	 * @param c A constraint
	 * @return True if contained.
	 */ hasConstraint(c) {
        return this._cons.includes(c);
    }
    /**
	 * Returns the list of constraint.
	 * The returned list is not allowed to be modified.
	 * @return The constraint list.
	 */ constraints() {
        return this._cons;
    }
    /**
	 * Gets the constraints that exist between the specified variables.
	 * Returns an empty array if no constraints exist.
	 * If there are multiple constraints between two variables (including the case of n-ary constraints (2 < n)), they will be included in the return array.
	 * @param v1 Variable 1
	 * @param v2 Variable 2
	 * @return Constraints.
	 */ constraintsBetween(v1, v2) {
        const cs = [];
        for (const c of v1)if (c.has(v2)) cs.push(c);
        return cs;
    }
    /**
	 * Finds the set of worst satisfiable constraints in a fuzzy constraint satisfaction problem.
	 * @return Array of constraints and worst satisfaction degree.
	 */ constraintsWithWorstSatisfactionDegree() {
        const cs = [];
        let cur = 1;
        for (const c of this._cons){
            const s = c.satisfactionDegree();
            if (s < cur) {
                cur = s;
                cs.length = 0;
                cs.push(c);
            } else if (s - cur < Number.MIN_VALUE * 10) cs.push(c);
        }
        return [
            cs,
            cur
        ];
    }
    // State acquisition methods --------
    /**
	 * Returns the worst satisfaction degree for the constraints contained in the fuzzy constraint satisfaction problem.
	 * If the degree cannot be determined because the variable has not yet been assigned a value or for some other reason, -1 is returned.
	 * @return Worst satisfaction degree.
	 */ worstSatisfactionDegree() {
        let cs = 1;
        for (const c of this._cons){
            const s = c.satisfactionDegree();
            if (s === (0, _constraintJs.Constraint).UNDEFINED) return (0, _constraintJs.Constraint).UNDEFINED;
            if (s < cs) cs = s;
        }
        return cs;
    }
    /**
	 * Gets the average of satisfaction degrees of the fuzzy constraints.
	 * @return Average of satisfaction degrees.
	 */ averageSatisfactionDegree() {
        let ave = 0;
        for (const c of this._cons)ave += c.satisfactionDegree();
        ave = ave / this._cons.length;
        return ave;
    }
    /**
	 * Returns the number of variables in the problem that have not been assigned a value.
	 * @return Number of variables with no value assigned.
	 */ emptyVariableSize() {
        let num = 0;
        for (const v of this._vars)if (v.isEmpty()) num++;
        return num;
    }
    /**
	 * Gets the constraint density (number of constraints/number of variables).
	 * @return Constraint density.
	 */ constraintDensity() {
        return this.constraintSize() / this.variableSize();
    }
    /**
	 * Returns whether the constraint satisfaction problem has any variables with empty domain.
	 * @return True if it exists.
	 */ hasEmptyDomain() {
        for (const v of this._vars){
            if (v.domain().size() === 0) return true;
        }
        return false;
    }
    /**
	 * Returns whether the problem is a fuzzy constraint satisfaction problem, i.e., whether it contains fuzzy constraints.
	 * @return True if it is a fuzzy constraint satisfaction problem.
	 */ isFuzzy() {
        return this._isFuzzy;
    }
}

},{"./variable.js":"UvkEa","./domain-ranged.js":"cjgYI","./domain-arbitrary.js":"25S75","./constraint.js":"6Rq7S","./constraint-1.js":"8Qh88","./constraint-2.js":"7tGVL","./constraint-3.js":"1qXRB","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"UvkEa":[function(require,module,exports) {
/**
 * Class that represents a variable.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Variable", ()=>Variable);
var _elementJs = require("./element.js");
class Variable extends (0, _elementJs.Element) {
    static #INVALID = Number.MIN_VALUE;
    #owner;
    #dom;
    #val = Variable.#INVALID;
    #cons = [];
    // Called only from Problem.
    constructor(owner, d){
        super();
        this.#owner = owner;
        this.#dom = d;
    }
    // Called only from Problem.
    connect(c) {
        if (this.has(c)) throw new IllegalArgumentException();
        this.#cons.push(c);
    }
    // Called only from Problem.
    disconnect(c) {
        if (!this.has(c)) throw new IllegalArgumentException();
        this.#cons = this.#cons.filter((n)=>n !== c);
    }
    /**
	 * Assign a value.
	 * @param value Value.
	 */ assign(value) {
        this.#val = value; // Do not change val_ except here.
    }
    /**
	 * Sets the state of the variable to unassigned.
	 */ clear() {
        this.assign(Variable.#INVALID); // Do not use the invalid value except here and below (isEmpty).
    }
    /**
	 * Checks whether the value is unassigned or not.
	 * @return True if unassigned.
	 */ isEmpty() {
        return this.value() === Variable.#INVALID;
    }
    /**
	 * Assign the domain.
	 * The variable will be in unassigned state.
	 * @param d Domain to be assigned.
	 */ setDomain(d) {
        this.#dom = d;
        this.clear();
    }
    /**
	 * Gets the problem that owns this variable.
	 * @return Owner.
	 */ owner() {
        return this.#owner;
    }
    /**
	 * Gets the number of associated constraints.
	 * @return Number of constraints.
	 */ size() {
        return this.#cons.length;
    }
    /**
	 * Gets the associated constraints by specifying their indices.
	 * @param index Index.
	 * @return A constraint.
	 */ at(index) {
        return this.#cons[index];
    }
    /**
	 * Gets the iterator of the associated constraints.
	 */ [Symbol.iterator]() {
        return this.#cons[Symbol.iterator]();
    }
    /**
	 * Gets the domain of the variable.
	 * @return The domain.
	 */ domain() {
        return this.#dom;
    }
    /**
	 * Checks whether or not the variable is associated with the specified constraint.
	 * @param c A constraint.
	 * @return True if associated.
	 */ has(c) {
        return this.#cons.includes(c);
    }
    /**
	 * Gets a string representation.
	 * @return A string representation.
	 */ toString() {
        return `x${this.index()}${this.name() === "" ? "" : `(${this.name()})`} = ${this.isEmpty() ? "<empty>" : this.value()}`;
    }
    /**
	 * Gets the value of the variable.
	 * @returnThe value of the variable.
	 */ value() {
        return this.#val;
    }
    /**
	 * Collects the variables connected via the associated constraints.
	 * @return An array of variables
	 */ neighbors() {
        const vs = [];
        for (const c of this.#cons){
            for (const v of c)if (v !== this) vs.push(v);
        }
        return vs;
    }
}

},{"./element.js":"hEgcc","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"cjgYI":[function(require,module,exports) {
/**
 * A variable domain with contiguous integer elements.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DomainRanged", ()=>DomainRanged);
var _domainJs = require("./domain.js");
class DomainRanged extends (0, _domainJs.Domain) {
    #min;
    #max;
    constructor(min, max){
        super();
        this.#min = min | 0;
        this.#max = max | 0;
    }
    /**
	 * {@inheritDoc}
	 */ contains(val) {
        return this.#min <= val && val <= this.#max;
    }
    /**
	 * {@inheritDoc}
	 */ indexOf(val) {
        return this.#min <= val && val <= this.#max ? val - this.#min : -1;
    }
    /**
	 * {@inheritDoc}
	 */ size() {
        return this.#max - this.#min + 1;
    }
    /**
	 * {@inheritDoc}
	 */ at(index) {
        return this.#min + index;
    }
    /**
	 * {@inheritDoc}
	 */ [Symbol.iterator]() {
        let val = this.#min;
        return {
            next: ()=>val <= this.#max ? {
                    value: val++,
                    done: false
                } : {
                    done: true
                }
        };
    }
}

},{"./domain.js":"ipCKf","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"ipCKf":[function(require,module,exports) {
/**
 * An abstract class that represents a variable domain.
 * The domain is immutable.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Domain", ()=>Domain);
class Domain {
    /**
	 * Checks whether the specified value is included as an element of the domain.
	 *
	 * @param val A value.
	 * @return True if the value is included.
	 */ contains(val) {}
    /**
	 * Gets the index of the specified value. If it does not exist, -1 is returned.
	 *
	 * @param val A value.
	 * @return The index.
	 */ indexOf(val) {}
    /**
	 * Gets the size of the domain, including the pruned elements.
	 *
	 * @return The size.
	 */ size() {}
    /**
	 * Gets the value at the specified index. The retrieved value may have been pruned.
	 *
	 * @param index An index.
	 * @return The value.
	 */ at(index) {}
    /**
	 * Gets the iterator of the values of the domain.
	 */ [Symbol.iterator]() {}
    /**
	 * Gets an arbitrary value, regardless of whether it has been pruned or not.
	 *
	 * @return A value.
	 */ random() {
        return this.at(Math.floor(Math.random() * this.size()));
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"25S75":[function(require,module,exports) {
/**
 * A variable domain with arbitrary elements.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DomainArbitrary", ()=>DomainArbitrary);
var _domainJs = require("./domain.js");
class DomainArbitrary extends (0, _domainJs.Domain) {
    #vals;
    constructor(vals){
        super();
        this.#vals = [
            ...vals
        ];
    }
    /**
	 * {@inheritDoc}
	 */ contains(val) {
        return this.#vals.includes(val);
    }
    /**
	 * {@inheritDoc}
	 */ indexOf(val) {
        return this.#vals.indexOf(val);
    }
    /**
	 * {@inheritDoc}
	 */ size() {
        return this.#vals.length;
    }
    /**
	 * {@inheritDoc}
	 */ at(index) {
        return this.#vals[index];
    }
    /**
	 * {@inheritDoc}
	 */ [Symbol.iterator]() {
        return this.#vals[Symbol.iterator]();
    }
}

},{"./domain.js":"ipCKf","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"8Qh88":[function(require,module,exports) {
/**
 * The class represents an unary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Constraint1", ()=>Constraint1);
var _constraintJs = require("./constraint.js");
class Constraint1 extends (0, _constraintJs.Constraint) {
    #vars = [
        null
    ];
    // Called only from Problem.
    constructor(r, v){
        super(r);
        this.#vars[0] = v;
    }
    /**
	 * {@inheritDoc}
	 */ size() {
        return 1;
    }
    /**
	 * {@inheritDoc}
	 */ at(index) {
        if (index === 0) return this.#vars[0];
        throw new IndexOutOfBoundsException();
    }
    /**
	 * {@inheritDoc}
	 */ [Symbol.iterator]() {
        return this.#vars[Symbol.iterator]();
    }
    /**
	 * {@inheritDoc}
	 */ has(v) {
        return v === this.#vars[0];
    }
    /**
	 * {@inheritDoc}
	 */ indexOf(v) {
        return v === this.#vars[0] ? 0 : -1;
    }
    /**
	 * {@inheritDoc}
	 */ emptyVariableSize() {
        return this.#vars[0].isEmpty() ? 1 : 0;
    }
    /**
	 * {@inheritDoc}
	 */ isDefined() {
        return !this.#vars[0].isEmpty();
    }
    /**
	 * {@inheritDoc}
	 */ isSatisfied() {
        if (this.#vars[0].isEmpty()) return (0, _constraintJs.Constraint).UNDEFINED;
        return this.crispRelation().isSatisfied(this.#vars[0].value()) ? 1 : 0;
    }
    /**
	 * {@inheritDoc}
	 */ satisfactionDegree() {
        if (this.#vars[0].isEmpty()) return (0, _constraintJs.Constraint).UNDEFINED;
        return this.fuzzyRelation().satisfactionDegree(this.#vars[0].value());
    }
    /**
	 * {@inheritDoc}
	 */ neighbors() {
        const cs = [];
        for (const c of this.#vars[0])if (c !== this) cs.push(c);
        return cs;
    }
    /**
	 * {@inheritDoc}
	 */ highestConsistencyDegree() {
        const sd = this.satisfactionDegree();
        if (sd !== (0, _constraintJs.Constraint).UNDEFINED) return sd;
        let cd = 0;
        for (const val of this.#vars[0].domain()){
            const s = this.fuzzyRelation().satisfactionDegree(val);
            if (s > cd) cd = s;
            if (cd === 1) break;
        }
        return cd;
    }
    /**
	 * {@inheritDoc}
	 */ lowestConsistencyDegree() {
        const sd = this.satisfactionDegree();
        if (sd !== (0, _constraintJs.Constraint).UNDEFINED) return sd;
        let cd = 1;
        for (const val of this.#vars[0].domain()){
            const s = this.fuzzyRelation().satisfactionDegree(val);
            if (s < cd) cd = s;
            if (cd === 0) break;
        }
        return cd;
    }
}

},{"./constraint.js":"6Rq7S","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"7tGVL":[function(require,module,exports) {
/**
 * The class represents an binary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Constraint2", ()=>Constraint2);
var _constraintJs = require("./constraint.js");
class Constraint2 extends (0, _constraintJs.Constraint) {
    #vars = [
        null,
        null
    ];
    // Called only from Problem.
    constructor(r, v1, v2){
        super(r);
        this.#vars[0] = v1;
        this.#vars[1] = v2;
    }
    /**
	 * {@inheritDoc}
	 */ size() {
        return 2;
    }
    /**
	 * {@inheritDoc}
	 */ at(index) {
        if (index === 0) return this.#vars[0];
        if (index === 1) return this.#vars[1];
        throw new IndexOutOfBoundsException();
    }
    /**
	 * {@inheritDoc}
	 */ [Symbol.iterator]() {
        return this.#vars[Symbol.iterator]();
    }
    /**
	 * {@inheritDoc}
	 */ has(v) {
        return this.#vars[0] === v || this.#vars[1] === v;
    }
    /**
	 * {@inheritDoc}
	 */ indexOf(v) {
        if (v === this.#vars[0]) return 0;
        if (v === this.#vars[1]) return 1;
        return -1;
    }
    /**
	 * {@inheritDoc}
	 */ emptyVariableSize() {
        let sum = 0;
        if (this.#vars[0].isEmpty()) ++sum;
        if (this.#vars[1].isEmpty()) ++sum;
        return sum;
    }
    /**
	 * {@inheritDoc}
	 */ isDefined() {
        return !this.#vars[0].isEmpty() && !this.#vars[1].isEmpty();
    }
    /**
	 * {@inheritDoc}
	 */ isSatisfied() {
        if (this.#vars[0].isEmpty() || this.#vars[1].isEmpty()) return (0, _constraintJs.Constraint).UNDEFINED;
        return this.crispRelation().isSatisfied(this.#vars[0].value(), this.#vars[1].value()) ? 1 : 0;
    }
    /**
	 * {@inheritDoc}
	 */ satisfactionDegree() {
        if (this.#vars[0].isEmpty() || this.#vars[1].isEmpty()) return (0, _constraintJs.Constraint).UNDEFINED;
        return this.fuzzyRelation().satisfactionDegree(this.#vars[0].value(), this.#vars[1].value());
    }
    /**
	 * {@inheritDoc}
	 */ neighbors() {
        const cs = [];
        for (const c of this.#vars[0])if (c !== this) cs.push(c);
        for (const c of this.#vars[1])if (c !== this) cs.push(c);
        return cs;
    }
    /**
	 * {@inheritDoc}
	 */ highestConsistencyDegree() {
        const sd = this.satisfactionDegree();
        if (sd !== (0, _constraintJs.Constraint).UNDEFINED) return sd;
        let cd = 0;
        const val1 = this.#vars[0].value();
        const val2 = this.#vars[1].value();
        const d1 = this.#vars[0].domain();
        const d2 = this.#vars[1].domain();
        if (this.#vars[0].isEmpty() && !this.#vars[1].isEmpty()) for (const val1 of d1){
            const s = this.fuzzyRelation().satisfactionDegree(val1, val2);
            if (s > cd) cd = s;
            if (cd === 1) break;
        }
        else if (!this.#vars[0].isEmpty() && this.#vars[1].isEmpty()) for (const val2 of d2){
            const s = this.fuzzyRelation().satisfactionDegree(val1, val2);
            if (s > cd) cd = s;
            if (cd === 1) break;
        }
        else {
            for (const val1 of d1)for (const val2 of d2){
                const s = this.fuzzyRelation().satisfactionDegree(val1, val2);
                if (s > cd) cd = s;
                if (cd === 1) break;
            }
        }
        return cd;
    }
    /**
	 * {@inheritDoc}
	 */ lowestConsistencyDegree() {
        const sd = this.satisfactionDegree();
        if (sd !== (0, _constraintJs.Constraint).UNDEFINED) return sd;
        let cd = 1;
        const val1 = this.#vars[0].value();
        const val2 = this.#vars[1].value();
        const d1 = this.#vars[0].domain();
        const d2 = this.#vars[1].domain();
        if (this.#vars[0].isEmpty() && !this.#vars[1].isEmpty()) for (const val1 of d1){
            const s = this.fuzzyRelation().satisfactionDegree(val1, val2);
            if (s < cd) cd = s;
            if (cd === 0) break;
        }
        else if (!this.#vars[0].isEmpty() && this.#vars[1].isEmpty()) for (const val2 of d2){
            const s = this.fuzzyRelation().satisfactionDegree(val1, val2);
            if (s < cd) cd = s;
            if (cd === 0) break;
        }
        else {
            for (const val1 of d1)for (const val2 of d2){
                const s = this.fuzzyRelation().satisfactionDegree(val1, val2);
                if (s < cd) cd = s;
                if (cd === 0) break;
            }
        }
        return cd;
    }
}

},{"./constraint.js":"6Rq7S","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"1qXRB":[function(require,module,exports) {
/**
 * The class represents an 3-ary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Constraint3", ()=>Constraint3);
var _constraintJs = require("./constraint.js");
class Constraint3 extends (0, _constraintJs.Constraint) {
    #vars = [
        null,
        null,
        null
    ];
    // Called only from Problem.
    constructor(r, v1, v2, v3){
        super(r);
        this.#vars[0] = v1;
        this.#vars[1] = v2;
        this.#vars[2] = v3;
    }
    /**
	 * {@inheritDoc}
	 */ size() {
        return 3;
    }
    /**
	 * {@inheritDoc}
	 */ at(index) {
        if (index === 0) return this.#vars[0];
        if (index === 1) return this.#vars[1];
        if (index === 2) return this.#vars[2];
        throw new IndexOutOfBoundsException();
    }
    /**
	 * {@inheritDoc}
	 */ [Symbol.iterator]() {
        return this.#vars[Symbol.iterator]();
    }
    /**
	 * {@inheritDoc}
	 */ has(v) {
        return this.#vars[0] === v || this.#vars[1] === v || this.#vars[2] === v;
    }
    /**
	 * {@inheritDoc}
	 */ indexOf(v) {
        if (v === this.#vars[0]) return 0;
        if (v === this.#vars[1]) return 1;
        if (v === this.#vars[2]) return 2;
        return -1;
    }
    /**
	 * {@inheritDoc}
	 */ emptyVariableSize() {
        let sum = 0;
        if (this.#vars[0].isEmpty()) ++sum;
        if (this.#vars[1].isEmpty()) ++sum;
        if (this.#vars[2].isEmpty()) ++sum;
        return sum;
    }
    /**
	 * {@inheritDoc}
	 */ isDefined() {
        return !this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && !this.#vars[2].isEmpty();
    }
    /**
	 * {@inheritDoc}
	 */ isSatisfied() {
        if (this.#vars[0].isEmpty() || this.#vars[1].isEmpty() || this.#vars[2].isEmpty()) return -1;
        return this.crispRelation().isSatisfied(this.#vars[0].value(), this.#vars[1].value(), this.#vars[2].value()) ? 1 : 0;
    }
    /**
	 * {@inheritDoc}
	 */ satisfactionDegree() {
        if (this.#vars[0].isEmpty() || this.#vars[1].isEmpty() || this.#vars[2].isEmpty()) return (0, _constraintJs.Constraint).UNDEFINED;
        return this.fuzzyRelation().satisfactionDegree(this.#vars[0].value(), this.#vars[1].value(), this.#vars[2].value());
    }
    /**
	 * {@inheritDoc}
	 */ neighbors() {
        const cs = [];
        for (const c of this.#vars[0])if (c !== this) cs.push(c);
        for (const c of this.#vars[1])if (c !== this) cs.push(c);
        for (const c of this.#vars[2])if (c !== this) cs.push(c);
        return cs;
    }
    /**
	 * {@inheritDoc}
	 */ highestConsistencyDegree() {
        const sd = this.satisfactionDegree();
        if (sd !== (0, _constraintJs.Constraint).UNDEFINED) return sd;
        let cd = 1;
        const val1 = this.#vars[0].value();
        const val2 = this.#vars[1].value();
        const val3 = this.#vars[2].value();
        const d1 = this.#vars[0].domain();
        const d2 = this.#vars[1].domain();
        const d3 = this.#vars[2].domain();
        if (this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && !this.#vars[2].isEmpty()) for (const val1 of d1){
            const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
            if (s > cd) cd = s;
            if (cd === 1) break;
        }
        else if (!this.#vars[0].isEmpty() && this.#vars[1].isEmpty() && !this.#vars[2].isEmpty()) for (const val2 of d2){
            const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
            if (s > cd) cd = s;
            if (cd === 1) break;
        }
        else if (!this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && this.#vars[2].isEmpty()) for (const val3 of d3){
            const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
            if (s > cd) cd = s;
            if (cd === 1) break;
        }
        else if (this.#vars[0].isEmpty() && this.#vars[1].isEmpty() && !this.#vars[2].isEmpty()) {
            for (const val1 of d1)for (const val2 of d2){
                const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
                if (s > cd) cd = s;
                if (cd === 1) break;
            }
        } else if (this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && this.#vars[2].isEmpty()) {
            for (const val1 of d1)for (const val3 of d3){
                const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
                if (s > cd) cd = s;
                if (cd === 1) break;
            }
        } else if (!this.#vars[0].isEmpty() && this.#vars[1].isEmpty() && this.#vars[2].isEmpty()) {
            for (const val2 of d2)for (const val3 of d3){
                const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
                if (s > cd) cd = s;
                if (cd === 1) break;
            }
        } else for (const val1 of d1){
            for (const val2 of d2)for (const val3 of d3){
                const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
                if (s > cd) cd = s;
                if (cd === 1) break;
            }
        }
        return cd;
    }
    /**
	 * {@inheritDoc}
	 */ lowestConsistencyDegree() {
        const sd = this.satisfactionDegree();
        if (sd !== (0, _constraintJs.Constraint).UNDEFINED) return sd;
        let cd = 1;
        const val1 = this.#vars[0].value();
        const val2 = this.#vars[1].value();
        const val3 = this.#vars[2].value();
        const d1 = this.#vars[0].domain();
        const d2 = this.#vars[1].domain();
        const d3 = this.#vars[2].domain();
        if (this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && !this.#vars[2].isEmpty()) for (const val1 of d1){
            const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
            if (s < cd) cd = s;
            if (cd === 0) break;
        }
        else if (!this.#vars[0].isEmpty() && this.#vars[1].isEmpty() && !this.#vars[2].isEmpty()) for (const val2 of d2){
            const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
            if (s < cd) cd = s;
            if (cd === 0) break;
        }
        else if (!this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && this.#vars[2].isEmpty()) for (const val3 of d3){
            const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
            if (s < cd) cd = s;
            if (cd === 0) break;
        }
        else if (this.#vars[0].isEmpty() && this.#vars[1].isEmpty() && !this.#vars[2].isEmpty()) {
            for (const val1 of d1)for (const val2 of d2){
                const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
                if (s < cd) cd = s;
                if (cd === 0) break;
            }
        } else if (this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && this.#vars[2].isEmpty()) {
            for (const val1 of d1)for (const val3 of d3){
                const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
                if (s < cd) cd = s;
                if (cd === 0) break;
            }
        } else if (!this.#vars[0].isEmpty() && this.#vars[1].isEmpty() && this.#vars[2].isEmpty()) {
            for (const val2 of d2)for (const val3 of d3){
                const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
                if (s < cd) cd = s;
                if (cd === 0) break;
            }
        } else for (const val1 of d1){
            for (const val2 of d2)for (const val3 of d3){
                const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
                if (s < cd) cd = s;
                if (cd === 0) break;
            }
        }
        return cd;
    }
}

},{"./constraint.js":"6Rq7S","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bErLg":[function(require,module,exports) {
/**
 * The class for models that provides a factory method to generate constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Model", ()=>Model);
class Model {
    _debug = true;
    _debugOutput = (e)=>console.log(e);
    /**
	 * Generates a constraint satisfaction problems.
	 * @param p Objects to include the problem to be generated
	 * @return A generated problem.
	 */ createProblem(p) {}
    /**
	 * Returns whether the generated problem is a fuzzy constraint satisfaction problem, i.e., whether it contains fuzzy constraints.
	 * @return If it is a fuzzy constraint satisfaction problem, true
	 */ isFuzzy() {}
    // -------------------------------------------------------------------------
    /**
	 * Sets whether to output debug strings.
	 * @param boolean flag Do output if true.
	 */ setDebugMode(flag) {
        this._debug = flag;
    }
    /**
	 * Sets a function that used for outputting debug strings.
	 * @param function fn Function called when debug output.
	 */ setDebugOutput(fn) {
        this._debugOutput = fn;
    }
    _debugOutput(str) {
        if (this._debug) this._debugOutput(str);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hWLkb":[function(require,module,exports) {
/**
 * Solver factory class.
 *
 * @author Takuto Yanagida
 * @version 2023-04-17
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SolverFactory", ()=>SolverFactory);
class SolverFactory {
    static crispSolverNames() {
        return [
            /* 0 */ "Forward Checking",
            /* 1 */ "Max Forward Checking",
            /* 2 */ "Local Changes",
            /* 3 */ "Local Changes Ex",
            /* 4 */ "Breakout",
            /* 5 */ "GENET",
            /* 6 */ "Crisp SRS 3"
        ];
    }
    static fuzzySolverNames() {
        return [
            /* 0 */ "Fuzzy Forward Checking",
            /* 1 */ "Fuzzy Forward Checking Bc",
            /* 2 */ "Flexible Local Changes",
            /* 3 */ "Flexible Local Changes Ex",
            /* 4 */ "Fuzzy Breakout",
            /* 5 */ "Fuzzy GENET",
            /* 6 */ "SRS 3",
            /* 7 */ "SRS 3 PF"
        ];
    }
    static async createSolver(type, p) {
        const cs = await SolverFactory.createCrispSolver(type, p);
        if (cs) return cs;
        const fs = await SolverFactory.createFuzzySolver(type, p);
        if (fs) return fs;
        return null;
    }
    static async createCrispSolver(type, p) {
        switch(type.replaceAll(" ", "")){
            case "ForwardChecking":
            case "forward-checking":
                const { ForwardChecking  } = await require("d4e4973b39ce930b");
                return new ForwardChecking(p);
            case "MaxForwardChecking":
            case "max-forward-checking":
                const { MaxForwardChecking  } = await require("34ebdab28e1c5bd9");
                return new MaxForwardChecking(p);
            case "LocalChanges":
            case "local-changes":
                const { LocalChanges  } = await require("9fa70884b15f38");
                return new LocalChanges(p);
            case "LocalChangesEx":
            case "local-changes-ex":
                const { LocalChangesEx  } = await require("da79c45d91b71482");
                return new LocalChangesEx(p);
            case "Breakout":
            case "breakout":
                const { Breakout  } = await require("78a7ec70795b6a8c");
                return new Breakout(p);
            case "GENET":
            case "genet":
                const { GENET  } = await require("311a61112f100960");
                return new GENET(p);
            case "CrispSRS3":
            case "crisp-srs3":
                const { CrispSRS3  } = await require("939ff44749742ac");
                return new CrispSRS3(p);
        }
        return null;
    }
    static async createFuzzySolver(type, p) {
        switch(type.replaceAll(" ", "")){
            case "FuzzyForwardChecking":
            case "fuzzy-forward-checking":
                const { FuzzyForwardChecking  } = await require("19ad2ccf0416e2ab");
                return new FuzzyForwardChecking(p);
            case "FuzzyForwardCheckingBc":
            case "fuzzy-forward-checking-bc":
                const { FuzzyForwardCheckingBc  } = await require("64ed0109718e119d");
                return new FuzzyForwardCheckingBc(p);
            case "FlexibleLocalChanges":
            case "flexible-local-changes":
                const { FlexibleLocalChanges  } = await require("6d83d6eabc1f411");
                return new FlexibleLocalChanges(p);
            case "FlexibleLocalChangesEx":
            case "flexible-local-changes-ex":
                const { FlexibleLocalChangesEx  } = await require("d824c24762972a6c");
                return new FlexibleLocalChangesEx(p);
            case "FuzzyBreakout":
            case "fuzzy-breakout":
                const { FuzzyBreakout  } = await require("3879f5adfa9382f3");
                return new FuzzyBreakout(p);
            case "FuzzyGENET":
            case "fuzzy-genet":
                const { FuzzyGENET  } = await require("bebe2f699b21cd00");
                return new FuzzyGENET(p);
            case "SRS3":
            case "srs3":
                const { SRS3  } = await require("b72340a0f3a85ad2");
                return new SRS3(p);
            case "SRS3PF":
            case "SRS3_PF":
            case "srs3-pf":
                const { SRS3_PF  } = await require("8de2615fc285a512");
                return new SRS3_PF(p);
        }
        return null;
    }
}

},{"d4e4973b39ce930b":"8TvSU","34ebdab28e1c5bd9":"ilxt7","9fa70884b15f38":"hcYTb","da79c45d91b71482":"6Pwy0","78a7ec70795b6a8c":"9VAf2","311a61112f100960":"7lQ3I","939ff44749742ac":"gVpfU","19ad2ccf0416e2ab":"lCq3I","64ed0109718e119d":"edXGO","6d83d6eabc1f411":"knfUt","d824c24762972a6c":"167im","3879f5adfa9382f3":"hz6LT","bebe2f699b21cd00":"lNBWn","b72340a0f3a85ad2":"3r8pg","8de2615fc285a512":"75k24","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"8TvSU":[function(require,module,exports) {
module.exports = require("64dd4804bd361f33")(require("84943d2821ac01d9").getBundleURL("kcG9h") + "forward-checking.65404014.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("kvthC"));

},{"64dd4804bd361f33":"9h1Ph","84943d2821ac01d9":"acFkO"}],"9h1Ph":[function(require,module,exports) {
"use strict";
/* global __parcel__importScripts__:readonly*/ var cacheLoader = require("74dbd12140c92d37");
module.exports = cacheLoader(function(bundle) {
    return new Promise(function(resolve, reject) {
        try {
            importScripts(bundle);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
});

},{"74dbd12140c92d37":"edxtI"}],"edxtI":[function(require,module,exports) {
"use strict";
var cachedBundles = {};
var cachedPreloads = {};
var cachedPrefetches = {};
function getCache(type) {
    switch(type){
        case "preload":
            return cachedPreloads;
        case "prefetch":
            return cachedPrefetches;
        default:
            return cachedBundles;
    }
}
module.exports = function(loader, type) {
    return function(bundle) {
        var cache = getCache(type);
        if (cache[bundle]) return cache[bundle];
        return cache[bundle] = loader.apply(null, arguments).catch(function(e) {
            delete cache[bundle];
            throw e;
        });
    };
};

},{}],"acFkO":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"ilxt7":[function(require,module,exports) {
module.exports = require("ecba4c7deda321a2")(require("8986644d05b7b2c3").getBundleURL("kcG9h") + "max-forward-checking.76f88260.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("kAy8j"));

},{"ecba4c7deda321a2":"9h1Ph","8986644d05b7b2c3":"acFkO"}],"hcYTb":[function(require,module,exports) {
module.exports = require("e11cf1ea3d310205")(require("71878e7e7b3b8454").getBundleURL("kcG9h") + "local-changes.64643546.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("8sNNW"));

},{"e11cf1ea3d310205":"9h1Ph","71878e7e7b3b8454":"acFkO"}],"6Pwy0":[function(require,module,exports) {
module.exports = require("561c4cb835f802c6")(require("d94337912dbc01c4").getBundleURL("kcG9h") + "local-changes-ex.4777c6e4.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("e4TmD"));

},{"561c4cb835f802c6":"9h1Ph","d94337912dbc01c4":"acFkO"}],"9VAf2":[function(require,module,exports) {
module.exports = require("3a245bde803dc284")(require("f97ed36a1c574a87").getBundleURL("kcG9h") + "breakout.ac738a9d.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("dUt6v"));

},{"3a245bde803dc284":"9h1Ph","f97ed36a1c574a87":"acFkO"}],"7lQ3I":[function(require,module,exports) {
module.exports = require("5237ba848db993ac")(require("d54f6b366a455cd6").getBundleURL("kcG9h") + "genet.eaacd072.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("bMwP6"));

},{"5237ba848db993ac":"9h1Ph","d54f6b366a455cd6":"acFkO"}],"gVpfU":[function(require,module,exports) {
module.exports = require("18a5c2ed390eca1e")(require("b2869a8505248d07").getBundleURL("kcG9h") + "crisp-srs3.1a2e5eff.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("hgxHK"));

},{"18a5c2ed390eca1e":"9h1Ph","b2869a8505248d07":"acFkO"}],"lCq3I":[function(require,module,exports) {
module.exports = require("c596c365d68c5edb")(require("d177d566ef28601b").getBundleURL("kcG9h") + "fuzzy-forward-checking.a231a240.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("dSfBZ"));

},{"c596c365d68c5edb":"9h1Ph","d177d566ef28601b":"acFkO"}],"edXGO":[function(require,module,exports) {
module.exports = require("a61253d4449e123e")(require("f31dd996a26f8fda").getBundleURL("kcG9h") + "fuzzy-forward-checking-bc.b077467d.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("5ZqQy"));

},{"a61253d4449e123e":"9h1Ph","f31dd996a26f8fda":"acFkO"}],"knfUt":[function(require,module,exports) {
module.exports = require("b88b673a7a49299a")(require("b5a4697fce5218f4").getBundleURL("kcG9h") + "flexible-local-changes.5fd2b461.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("4aWgR"));

},{"b88b673a7a49299a":"9h1Ph","b5a4697fce5218f4":"acFkO"}],"167im":[function(require,module,exports) {
module.exports = require("6a45baead9c0b349")(require("a876a29f2f2a5325").getBundleURL("kcG9h") + "flexible-local-changes-ex.84c44882.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("hEvUH"));

},{"6a45baead9c0b349":"9h1Ph","a876a29f2f2a5325":"acFkO"}],"hz6LT":[function(require,module,exports) {
module.exports = require("f808f0639854234f")(require("74b83044335f6a80").getBundleURL("kcG9h") + "fuzzy-breakout.196d865a.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("lc4Ox"));

},{"f808f0639854234f":"9h1Ph","74b83044335f6a80":"acFkO"}],"lNBWn":[function(require,module,exports) {
module.exports = require("155f5c12d54ed22a")(require("a86764791a029889").getBundleURL("kcG9h") + "fuzzy-genet.b90bf1cc.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("iFiNh"));

},{"155f5c12d54ed22a":"9h1Ph","a86764791a029889":"acFkO"}],"3r8pg":[function(require,module,exports) {
module.exports = require("c81db1e221fd83ca")(require("fb3cce9e72934766").getBundleURL("kcG9h") + "srs3.d74a19f0.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("aywcm"));

},{"c81db1e221fd83ca":"9h1Ph","fb3cce9e72934766":"acFkO"}],"75k24":[function(require,module,exports) {
module.exports = require("1434cbbeaf469cc8")(require("1d1ee4d507f1a80").getBundleURL("kcG9h") + "srs3-pf.4ca470bc.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("hF1BV"));

},{"1434cbbeaf469cc8":"9h1Ph","1d1ee4d507f1a80":"acFkO"}]},["5AnEX"], null, "parcelRequire7885")

//# sourceMappingURL=worker.5516e4b1.js.map
