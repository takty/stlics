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
})({"f9oPo":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "a7952b94acdb86fd";
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

},{}],"5nuKp":[function(require,module,exports) {
var _problemJs = require("../../src/problem/problem.js");
var _randomBinaryJs = require("../../src/model/random-binary.js");
var _solverFactoryJs = require("../../src/solver/solver-factory.js");
const COUNT = 1; // Interaction count
const VAR_NUM = 10; // Number of variables
const DENSITY = 0.5;
const AVE_TIGHTNESS = 0.5;
document.addEventListener("DOMContentLoaded", async ()=>{
    const output = document.getElementById("output");
    const log = (e)=>output.value += `${e}\n`;
    const sn = (0, _solverFactoryJs.SolverFactory).fuzzySolverNames()[1];
    let sum_time = 0;
    let sum_deg = 0;
    for(let i = 0; i < COUNT; ++i){
        const rp = new (0, _randomBinaryJs.RandomBinary)(VAR_NUM, DENSITY, AVE_TIGHTNESS);
        const p = rp.createProblem(new (0, _problemJs.Problem)());
        const t = Date.now(); // Start time measurement
        const s = await (0, _solverFactoryJs.SolverFactory).createSolver(sn, p);
        // s.setTargetRate(null);
        s.setTimeLimit(10000);
        s.setDebugOutput(log);
        const res = s.solve();
        const ct = Date.now() - t; // Stop time measurement
        const cd = p.worstSatisfactionDegree();
        log(`solver: ${s.name()}   ${res ? "success" : "failure"}`);
        log(`trial: ${i + 1}   time: ${ct}   degree: ${cd}`);
        sum_time += ct;
        sum_deg += cd;
    }
    log(`average time: ${sum_time / COUNT}   average degree: ${sum_deg / COUNT}`);
});

},{"../../src/problem/problem.js":"h3trE","../../src/model/random-binary.js":"iOWTY","../../src/solver/solver-factory.js":"5rSZm"}],"h3trE":[function(require,module,exports) {
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

},{"./variable.js":"kkVjL","./domain-ranged.js":"gcJd8","./domain-arbitrary.js":"2LyKs","./constraint.js":"33EPT","./constraint-1.js":"1ZIfx","./constraint-2.js":"jlDbO","./constraint-3.js":"7D39L","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kkVjL":[function(require,module,exports) {
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

},{"./element.js":"6pLtx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6pLtx":[function(require,module,exports) {
/**
 * The common class of variables and constraints.
 *
 * @author Takuto Yanagida
 * @version 2022-08-15
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Element", ()=>Element);
class Element {
    #index = -1;
    #name = "";
    /**
	 * It is used when the user wishes to associate an arbitrary object with each element.
	 */ userObject = null;
    /**
	 * Used when the solver wants to associate an arbitrary object with each element.
	 */ solverObject = null;
    // Called only from Problem.
    setIndex(index) {
        this.#index = index;
    }
    /**
	 * Sets the name.
	 *
	 * @param name String representing the name.
	 */ setName(name) {
        this.#name = name;
    }
    /**
	 * Get the index on the owned problem.
	 * Each variable and constraint is assigned a serial number as an index, which is used to access it through the problem.
	 *
	 * @return Integer value representing the index.
	 */ index() {
        return this.#index;
    }
    /**
	 * Gets the name.
	 *
	 * @return String representing the name.
	 */ name() {
        return this.#name;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"gcJd8":[function(require,module,exports) {
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

},{"./domain.js":"l9kJx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l9kJx":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2LyKs":[function(require,module,exports) {
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

},{"./domain.js":"l9kJx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"33EPT":[function(require,module,exports) {
/**
 * The class represents a constraint.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Constraint", ()=>Constraint);
var _elementJs = require("./element.js");
var _relationFuzzyJs = require("./relation-fuzzy.js");
class Constraint extends (0, _elementJs.Element) {
    /**
	 * The constant indicating that the satisfaction degree is not defined.
	 */ static UNDEFINED = -1;
    rel;
    // Called only from Problem.
    constructor(r){
        super();
        this.rel = r;
    }
    /**
	 * Returns the crisp relation between variables.
	 * @return Relation.
	 */ crispRelation() {
        return this.rel;
    }
    /**
	 * Returns the fuzzy relation between variables.
	 * @return Relation.
	 */ fuzzyRelation() {
        return this.rel;
    }
    /**
	 * Returns whether this is a fuzzy constraint.
	 * @return True if it is fuzzy constraint.
	 */ isFuzzy() {
        return this.rel instanceof (0, _relationFuzzyJs.FuzzyRelation);
    }
    /**
	 * Returns a string representation.
	 * @return A string representation.
	 */ toString() {
        const s = this.satisfactionDegree();
        return `c${this.index()}${this.name() === "" ? "" : `(${this.name()})`} = ${s === Constraint.UNDEFINED ? "UNDEFINED" : s}`;
    }
    /**
	 * Returns the order of the constraint, i.e., the number of (associated) variables in the scope.
	 * @return Order.
	 */ size() {}
    /**
	 * Gets the associated variable by specifying its index.
	 * @param index Index.
	 * @return A variable.
	 */ at(index) {}
    /**
	 * Gets the iterator of the associated variables.
	 */ [Symbol.iterator]() {}
    /**
	 * Returns whether the specified variable is associated or not.
	 * @param v A variable.
	 * @return True if it is associated.
	 */ has(v) {}
    /**
	 * Gets the index of a specified variable.
	 * If not found, returns -1.
	 * @param v A variable.
	 * @return Index.
	 */ indexOf(v) {}
    /**
	 * Returns the number of scope variables that have not been assigned a value.
	 * @return Number of variables
	 */ emptyVariableSize() {}
    /**
	 * Returns whether or not the satisfaction (degree) is defined.
	 * Satisfaction (degree) is defined when all associated variables have values assigned to them.
	 * @return True if it is defined.
	 */ isDefined() {}
    /**
	 * Returns whether or not this constraint is satisfied.
	 * @return 1 if satisfied, 0 if not, UNDEFINED if undefined
	 */ isSatisfied() {}
    /**
	 * Gets the current satisfaction degree.
	 * @return Degree 0 - 1, UNDEFINED if undefined.
	 */ satisfactionDegree() {}
    /**
	 * Returns the set of constraints connected via the associated variables.
	 * @return A set of constraints.
	 */ neighbors() {}
    /**
	 * Calculates the highest consistency degree.
	 * That is, it seeks the highest satisfaction degree of the possible combinations of variable assignments for a given constraint.
	 * When all associated variables have been assigned values, it returns the same value as getSatisfactionDegree().
	 * @return The highest consistency degree.
	 */ highestConsistencyDegree() {}
    /**
	 * Calculates the lowest consistency degree.
	 * That is, it seeks the lowest satisfaction degree of the possible combinations of variable assignments for a given constraint.
	 * When all associated variables have been assigned values, it returns the same value as getSatisfactionDegree().
	 * @return The lowest consistency degree.
	 */ lowestConsistencyDegree() {}
}

},{"./element.js":"6pLtx","./relation-fuzzy.js":"aBYKX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aBYKX":[function(require,module,exports) {
/**
 * The class represents fuzzy relationships between variables.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FuzzyRelation", ()=>FuzzyRelation);
var _relationJs = require("./relation.js");
class FuzzyRelation extends (0, _relationJs.Relation) {
    /**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vals Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */ satisfactionDegree(...vals) {
        throw new Exception();
    }
    /**
	 * Returns a view as a crisp relation.
	 * @return A crisp relation.
	 */ asCrispRelation() {
        return new CrispRelationView(this);
    }
}

},{"./relation.js":"9hGNN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9hGNN":[function(require,module,exports) {
/**
 * An interface that represents the relationship between variables.
 * Use CrispRelation or FuzzyRelation class that implement this interface.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Relation", ()=>Relation);
class Relation {
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1ZIfx":[function(require,module,exports) {
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

},{"./constraint.js":"33EPT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jlDbO":[function(require,module,exports) {
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

},{"./constraint.js":"33EPT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7D39L":[function(require,module,exports) {
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

},{"./constraint.js":"33EPT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iOWTY":[function(require,module,exports) {
/**
 * Sample implementation of a random binary problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RandomBinary", ()=>RandomBinary);
var _relationFuzzyJs = require("../problem/relation-fuzzy.js");
var _betaJs = require("./beta.js");
var _modelJs = require("./model.js");
class RandomBinary extends (0, _modelJs.Model) {
    static nextInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    #size;
    #den;
    #t;
    #sig;
    constructor(varCount, density, aveTightness, domainSize = null){
        super();
        this.#size = varCount;
        this.#den = density;
        this.#t = aveTightness;
        this.#sig = domainSize ?? varCount;
    }
    getVariableCount() {
        return this.#size;
    }
    setVariableCount(count) {
        this.#size = count;
    }
    getDensity() {
        return this.#den;
    }
    setDensity(density) {
        this.#den = density;
    }
    getAverageTightness() {
        return this.#t;
    }
    setAverageTightness(tightness) {
        this.#t = tightness;
    }
    getDomainSize() {
        return this.#sig;
    }
    setDomainSize(size) {
        this.#sig = size;
    }
    isFuzzy() {
        return true;
    }
    createProblem(p) {
        const r = this.#den * ((this.#size * this.#size - this.#size) / 2) | 0;
        const vs = [];
        for(let i = 0; i < this.#size; ++i)vs.push(p.createVariable({
            domain: p.createDomain({
                min: 0,
                max: this.#sig - 1
            }),
            value: 0
        }));
        while(p.constraintSize() < r){
            const i = RandomBinary.nextInt(this.#size);
            const j = RandomBinary.nextInt(this.#size);
            if (i !== j) {
                const temp = p.constraintsBetween(vs[i], vs[j]);
                if (0 === temp.length) p.createConstraint({
                    relation: new TableRelation(this.#getRelationTable()),
                    variables: [
                        vs[i],
                        vs[j]
                    ]
                });
            }
        }
        return p;
    }
    #getRelationTable() {
        const table = [];
        for(let i = 0; i < this.#sig; ++i)table.push(new Array(this.#sig));
        for(let i = 0; i < this.#sig; ++i)for(let j = 0; j < this.#sig; ++j){
            const q = this.#t === 0 ? Number.MAX_VALUE : (1 - this.#t) / this.#t;
            table[i][j] = (0, _betaJs.Beta).random(1, q);
        }
        return table;
    }
}
class TableRelation extends (0, _relationFuzzyJs.FuzzyRelation) {
    #table;
    constructor(table){
        super();
        this.#table = table;
    }
    satisfactionDegree(value1, value2) {
        return this.#table[value1][value2];
    }
}

},{"../problem/relation-fuzzy.js":"aBYKX","./beta.js":"Jnzrq","./model.js":"6rSfu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Jnzrq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Beta", ()=>Beta);
class Beta {
    static #gamma(a) {
        let t, x, y, u, r;
        if (a > 1) {
            t = Math.sqrt(2 * a - 1);
            do do {
                do {
                    do {
                        x = Math.random();
                        y = 2 * Math.random() - 1;
                    }while (x * x + y * y >= 1 || x === 0);
                    y = y / x;
                    x = t * y + a - 1;
                }while (x <= 0);
                u = (a - 1) * Math.log(x / (a - 1)) - t * y;
            }while (u <= -50);
            while ((1 + y * y) * Math.exp(u) <= Math.random());
        } else {
            t = Math.E / (a + Math.E);
            do if (Math.random() < t) {
                x = 0;
                y = 1;
                r = Math.random();
                if (r > 0) {
                    x = Math.exp(Math.log(r) / a);
                    y = Math.exp(-x);
                }
            } else {
                r = Math.random();
                x = 1;
                y = 0;
                if (r > 0) {
                    x = 1 - Math.log(r);
                    y = Math.exp((a - 1) * Math.log(x));
                }
            }
            while (Math.random() >= y);
        }
        return x;
    }
    static random(a, b) {
        const T = Beta.#gamma(a);
        return T / (T + Beta.#gamma(b));
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6rSfu":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5rSZm":[function(require,module,exports) {
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

},{"d4e4973b39ce930b":"fqRTF","34ebdab28e1c5bd9":"jHeZF","9fa70884b15f38":"jRpuZ","da79c45d91b71482":"43mLa","78a7ec70795b6a8c":"kzvRT","311a61112f100960":"jct1h","939ff44749742ac":"5o32q","19ad2ccf0416e2ab":"j8y8C","64ed0109718e119d":"agW6K","6d83d6eabc1f411":"7ZkLb","d824c24762972a6c":"epvJW","3879f5adfa9382f3":"a2mmY","bebe2f699b21cd00":"lfJWt","b72340a0f3a85ad2":"bs1sr","8de2615fc285a512":"fWxKs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fqRTF":[function(require,module,exports) {
module.exports = require("3eb9f0174fec4556")(require("201489c1ce579be0").getBundleURL("eo2oZ") + "../forward-checking.2840558e.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("iWzoF"));

},{"3eb9f0174fec4556":"61B45","201489c1ce579be0":"lgJ39"}],"61B45":[function(require,module,exports) {
"use strict";
var cacheLoader = require("ceaf3802b3207d01");
module.exports = cacheLoader(function(bundle) {
    return new Promise(function(resolve, reject) {
        // Don't insert the same script twice (e.g. if it was already in the HTML)
        var existingScripts = document.getElementsByTagName("script");
        if ([].concat(existingScripts).some(function isCurrentBundle(script) {
            return script.src === bundle;
        })) {
            resolve();
            return;
        }
        var preloadLink = document.createElement("link");
        preloadLink.href = bundle;
        preloadLink.rel = "preload";
        preloadLink.as = "script";
        document.head.appendChild(preloadLink);
        var script = document.createElement("script");
        script.async = true;
        script.type = "text/javascript";
        script.src = bundle;
        script.onerror = function(e) {
            var error = new TypeError("Failed to fetch dynamically imported module: ".concat(bundle, ". Error: ").concat(e.message));
            script.onerror = script.onload = null;
            script.remove();
            reject(error);
        };
        script.onload = function() {
            script.onerror = script.onload = null;
            resolve();
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    });
});

},{"ceaf3802b3207d01":"j49pS"}],"j49pS":[function(require,module,exports) {
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

},{}],"lgJ39":[function(require,module,exports) {
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

},{}],"jHeZF":[function(require,module,exports) {
module.exports = require("782415f4a000f4ea")(require("c335552f4fa9186e").getBundleURL("eo2oZ") + "../max-forward-checking.b59f6425.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("ewFsV"));

},{"782415f4a000f4ea":"61B45","c335552f4fa9186e":"lgJ39"}],"jRpuZ":[function(require,module,exports) {
module.exports = require("69e1106f4cde94d1")(require("b355e75e09cd5893").getBundleURL("eo2oZ") + "../local-changes.5642719f.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("528lF"));

},{"69e1106f4cde94d1":"61B45","b355e75e09cd5893":"lgJ39"}],"43mLa":[function(require,module,exports) {
module.exports = require("e38b875579c2cbf7")(require("661574df591db57e").getBundleURL("eo2oZ") + "../local-changes-ex.11e26c59.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("5SbDF"));

},{"e38b875579c2cbf7":"61B45","661574df591db57e":"lgJ39"}],"kzvRT":[function(require,module,exports) {
module.exports = require("ea88e8b25af8a65f")(require("d1728e8343c73fd0").getBundleURL("eo2oZ") + "../breakout.1fd609ad.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("3Vsrl"));

},{"ea88e8b25af8a65f":"61B45","d1728e8343c73fd0":"lgJ39"}],"jct1h":[function(require,module,exports) {
module.exports = require("b19a28a382b0e7cd")(require("494af480dac069e4").getBundleURL("eo2oZ") + "../genet.bb06b38d.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("frS8r"));

},{"b19a28a382b0e7cd":"61B45","494af480dac069e4":"lgJ39"}],"5o32q":[function(require,module,exports) {
module.exports = require("8099b79fea33a738")(require("7582fa93c0ebf193").getBundleURL("eo2oZ") + "../crisp-srs3.3bc686d5.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("g1oP2"));

},{"8099b79fea33a738":"61B45","7582fa93c0ebf193":"lgJ39"}],"j8y8C":[function(require,module,exports) {
module.exports = require("14a6570bc4e32784")(require("cddf9fc50ff44da9").getBundleURL("eo2oZ") + "../fuzzy-forward-checking.c2f2e495.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("lj0XW"));

},{"14a6570bc4e32784":"61B45","cddf9fc50ff44da9":"lgJ39"}],"agW6K":[function(require,module,exports) {
module.exports = require("f05899b1e438fe3d")(require("2633a05cd7b1e743").getBundleURL("eo2oZ") + "../fuzzy-forward-checking-bc.4420e29e.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("6LVDA"));

},{"f05899b1e438fe3d":"61B45","2633a05cd7b1e743":"lgJ39"}],"7ZkLb":[function(require,module,exports) {
module.exports = require("227d9391b801a243")(require("5acb951738d08efd").getBundleURL("eo2oZ") + "../flexible-local-changes.d7da5770.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("5SKYb"));

},{"227d9391b801a243":"61B45","5acb951738d08efd":"lgJ39"}],"epvJW":[function(require,module,exports) {
module.exports = require("6729dc5c1398751d")(require("514b0224632c4a1c").getBundleURL("eo2oZ") + "../flexible-local-changes-ex.98b6ceed.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("gFjSJ"));

},{"6729dc5c1398751d":"61B45","514b0224632c4a1c":"lgJ39"}],"a2mmY":[function(require,module,exports) {
module.exports = require("8dbbd7b220939c6c")(require("c95c7bbccc78cd51").getBundleURL("eo2oZ") + "../fuzzy-breakout.587009ca.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("ana3Z"));

},{"8dbbd7b220939c6c":"61B45","c95c7bbccc78cd51":"lgJ39"}],"lfJWt":[function(require,module,exports) {
module.exports = require("4cdf15cb936eb595")(require("d726287167143e26").getBundleURL("eo2oZ") + "../fuzzy-genet.435b2c8e.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("86Xxw"));

},{"4cdf15cb936eb595":"61B45","d726287167143e26":"lgJ39"}],"bs1sr":[function(require,module,exports) {
module.exports = require("cb120a4bcbbe565e")(require("412a02fad878e17b").getBundleURL("eo2oZ") + "../srs3.e2a6d0d8.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("gaaWt"));

},{"cb120a4bcbbe565e":"61B45","412a02fad878e17b":"lgJ39"}],"fWxKs":[function(require,module,exports) {
module.exports = Promise.all([
    require("c6e75717203133f5")(require("5c94b4a489cd5f1").getBundleURL("eo2oZ") + "../srs3.e2a6d0d8.js" + "?" + Date.now()).catch((err)=>{
        delete module.bundle.cache[module.id];
        throw err;
    }),
    require("c6e75717203133f5")(require("5c94b4a489cd5f1").getBundleURL("eo2oZ") + "../srs3-pf.2bb3b9a2.js" + "?" + Date.now()).catch((err)=>{
        delete module.bundle.cache[module.id];
        throw err;
    })
]).then(()=>module.bundle.root("2ksoK"));

},{"c6e75717203133f5":"61B45","5c94b4a489cd5f1":"lgJ39"}]},["f9oPo","5nuKp"], "5nuKp", "parcelRequire7885")

//# sourceMappingURL=index.acdb86fd.js.map
