importScripts("./worker.a45c2f4c.js");
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
})({"4fBwk":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "a8fb9c35fdafe466";
module.bundle.HMR_BUNDLE_ID = "a21e71a504a3b279";
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

},{}],"4ymtY":[function(require,module,exports) {
var _problemJs = require("../../src/problem/problem.js");
var _randomBinaryJs = require("../../src/model/random-binary.js");
var _solverFactoryJs = require("../../src/solver/solver-factory.js");
onmessage = async (e)=>{
    const { task , args  } = e.data;
    switch(task){
        case "create":
            create(...args);
            break;
        case "solve":
            solve(...args);
            break;
    }
};
let m = null;
let p = null;
function create(varNum, density, aveTightness) {
    m = new (0, _randomBinaryJs.RandomBinary)(varNum, density, aveTightness);
    m.setDebugOutput(log);
    p = m.createProblem(new (0, _problemJs.Problem)());
}
async function solve(type, targetRate) {
    const t = Date.now(); // Start time measurement
    const sn = (0, _solverFactoryJs.SolverFactory).fuzzySolverNames()[type];
    const s = await (0, _solverFactoryJs.SolverFactory).createSolver(sn, p);
    s.setTargetRate(targetRate);
    s.setDebugOutput(log);
    const result = s.solve();
    const time = Date.now() - t; // Stop time measurement
    const deg = p.worstSatisfactionDegree();
    postMessage({
        result,
        time,
        deg,
        solver: s.name()
    });
}
function log(e) {
    postMessage({
        log: e
    });
}

},{"../../src/problem/problem.js":"eeGnE","../../src/model/random-binary.js":"fCFwT","../../src/solver/solver-factory.js":"hWLkb"}],"fCFwT":[function(require,module,exports) {
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

},{"../problem/relation-fuzzy.js":"fQtZw","./beta.js":"5ulWQ","./model.js":"bErLg","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"fQtZw":[function(require,module,exports) {
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

},{"./relation.js":"hQbVJ","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hQbVJ":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"fn8Fk":[function(require,module,exports) {
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

},{}],"5ulWQ":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hEgcc":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"6Rq7S":[function(require,module,exports) {
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

},{"./element.js":"hEgcc","./relation-fuzzy.js":"fQtZw","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}]},["4fBwk","4ymtY"], "4ymtY", "parcelRequire7885")

//# sourceMappingURL=worker.04a3b279.js.map