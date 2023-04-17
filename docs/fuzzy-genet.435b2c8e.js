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
})({"f26Ff":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "644d4e11435b2c8e";
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

},{}],"86Xxw":[function(require,module,exports) {
/**
 * This class implements fuzzy GENET.
 * CSPs and FCSPs (but only Binary (F)CSPs) is supported.
 *
 * @author Takuto Yanagida
 * @version 2023-04-17
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FuzzyGENET", ()=>FuzzyGENET);
var _assignmentListJs = require("../../util/assignment-list.js");
var _solverJs = require("../solver.js");
class FuzzyGENET extends (0, _solverJs.Solver) {
    static nextInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    #clusters = [];
    #connections;
    #worstSatisfactionDegree;
    constructor(p, worstSatisfactionDegree = 1){
        super(p);
        this.#worstSatisfactionDegree = worstSatisfactionDegree;
    }
    name() {
        return "Fuzzy GENET";
    }
    #createNetwork(worstDeg) {
        this._debugOutput("network creation start");
        const cons = [];
        for (const v of this._pro.variables()){
            if (v.domain().size() === 0) return false;
            this.#clusters.push(new FuzzyGENET.Cluster(v));
        }
        for (const c of this._pro.constraints())if (c.size() === 1) {
            const v = c.at(0);
            const cl = this.#clusters[c.at(0).index()];
            for(let i = 0; i < cl.size(); ++i){
                const origVal = v.value(); // Save the value.
                v.assign(cl.get(i)._value);
                if (c.satisfactionDegree() <= worstDeg) cons.push(new FuzzyGENET.Connection(c, cl.get(i)));
                v.assign(origVal); // Restore the value.
            }
        } else {
            const v1 = c.at(0);
            const v2 = c.at(1);
            const cl_f = this.#clusters[c.at(0).index()];
            const cl_s = this.#clusters[c.at(1).index()];
            for(let i = 0; i < cl_f.size(); ++i){
                const origVal1 = v1.value(); // Save the value.
                v1.assign(cl_f.get(i)._value);
                for(let j = 0; j < cl_s.size(); ++j){
                    const origVal2 = v2.value(); // Save the value.
                    v2.assign(cl_s.get(j)._value);
                    if (c.satisfactionDegree() <= worstDeg) cons.push(new FuzzyGENET.Connection(c, cl_f.get(i), cl_s.get(j)));
                    v2.assign(origVal2); // Restore the value.
                }
                v1.assign(origVal1); // Restore the value.
            }
        }
        for (const cl of this.#clusters)for (const n of cl._neurons)n.lockConnections();
        this.#connections = cons;
        this._debugOutput("network creation complete");
        return true;
    }
    #shuffle(is) {
        for(let i = is.length; i > 1; --i){
            const j = FuzzyGENET.nextInt(i);
            const temp = is[i - 1];
            is[i - 1] = is[j];
            is[j] = temp;
        }
        return is;
    }
    exec() {
        if (!this.#createNetwork(this.#worstSatisfactionDegree)) throw new Exception();
        const endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        let iterCount = 0;
        const sol = new (0, _assignmentListJs.AssignmentList)();
        const order = [];
        for(let i = 0; i < this.#clusters.length; ++i)order.push(i);
        let cur = this._pro.worstSatisfactionDegree();
        let success = false;
        while(true){
            if (this._iterLimit && this._iterLimit < iterCount++) {
                this._debugOutput("stop: number of iterations has reached the limit");
                break;
            }
            if (endTime < Date.now()) {
                this._debugOutput("stop: time limit has been reached");
                break;
            }
            let modified = false;
            for (const i of this.#shuffle(order))if (this.#clusters[i].setActivityMaximumInput()) modified = true; // Turn on the node with the largest input in each cluster
            if (!modified) {
                for (const con of this.#connections)con.refreshWeight(); // Update weights for all connections
                continue;
            } else {
                for (const clu of this.#clusters)clu.applyToVariable(); // Apply to variable
                const d = this._pro.worstSatisfactionDegree();
                if (cur < d) {
                    cur = d;
                    this._debugOutput(`worst satisfaction degree: ${d}`);
                    sol.setProblem(this._pro);
                    if (this.foundSolution(sol, d)) {
                        success = true;
                        break;
                    }
                    if (this._targetDeg === null) success = true;
                    else if (this._targetDeg <= cur) {
                        this._debugOutput("stop: current degree is above the target");
                        success = true;
                        break;
                    }
                }
            }
        }
        sol.apply();
        return success;
    }
}
(()=>{
    class Cluster {
        static nextInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        #v;
        #index;
        #maxNeurons = [];
        _neurons = [];
        constructor(v){
            this.#v = v;
            for (const val of v.domain())this._neurons.push(new Neuron(val));
            this.#setActivity(Cluster.nextInt(this._neurons.length));
        }
        #setActivity(index) {
            for (const n of this._neurons)n._isActive = false;
            this._neurons[index]._isActive = true;
            this.#index = index;
        }
        applyToVariable() {
            this.#v.assign(this._neurons[this.#index]._value);
        }
        get(index) {
            return this._neurons[index];
        }
        neurons() {
            return this._neurons;
        }
        // Turn on the node with the largest input.
        setActivityMaximumInput() {
            this.#maxNeurons.length = 0;
            let max = Number.NEGATIVE_INFINITY;
            let alreadyOn = false;
            for(let i = 0; i < this._neurons.length; ++i){
                const input = this._neurons[i].getInput();
                if (max <= input) {
                    if (max < input) {
                        max = input;
                        this.#maxNeurons.length = 0;
                        alreadyOn = false;
                    }
                    this.#maxNeurons.push(i);
                    if (this.#index === i) alreadyOn = true;
                }
            }
            if (alreadyOn || this.#maxNeurons.length === 0) return false;
            this.#setActivity(this.#maxNeurons[Cluster.nextInt(this.#maxNeurons.length)]);
            return true;
        }
        size() {
            return this._neurons.length;
        }
    }
    FuzzyGENET.Cluster = Cluster;
    class Connection {
        #c;
        #first;
        #second;
        _weight;
        // Order of neurons must be the same as the order of variables that the constraint has.
        constructor(c, first, second = null){
            this._weight = c.satisfactionDegree() - 1;
            this.#c = c;
            this.#first = first;
            this.#first.addConnection(this);
            this.#second = second;
            if (this.#second !== null) this.#second.addConnection(this);
        }
        getNeuron(self) {
            if (self === this.#first) return this.#second;
            if (self === this.#second) return this.#first;
            return null;
        }
        refreshWeight() {
            if (!this.#first._isActive || this.#second !== null && !this.#second._isActive) return;
            if (this.#c.size() === 1) this._weight += this.#c.fuzzyRelation().satisfactionDegree(this.#first._value) - 1;
            else this._weight += this.#c.fuzzyRelation().satisfactionDegree(this.#first._value, this.#second._value) - 1;
        }
    }
    FuzzyGENET.Connection = Connection;
    class Neuron {
        #conTemp = [];
        #connections;
        _value;
        _isActive = false;
        constructor(value){
            this._value = value;
        }
        addConnection(c) {
            this.#conTemp.push(c);
        }
        lockConnections() {
            this.#connections = [
                ...this.#conTemp
            ];
            this.#conTemp = null; // No longer being used.
        }
        getInput() {
            let ret = 0;
            for (const c of this.#connections){
                const n = c.getNeuron(this); // If n is null, then the unary constraint.
                ret += c._weight * (n === null || n._isActive ? 1 : 0);
            }
            return ret;
        }
    }
    FuzzyGENET.Neuron = Neuron;
})();

},{"../../util/assignment-list.js":"hRVDU","../solver.js":"8Y1Zp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hRVDU":[function(require,module,exports) {
/**
 * The class represents multiple variables and their assignments.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AssignmentList", ()=>AssignmentList);
var _assignmentJs = require("./assignment.js");
class AssignmentList {
    static fromVariables(vs) {
        const al = new AssignmentList();
        al.setVariables(vs);
        return al;
    }
    #as = [];
    constructor(){}
    setProblem(problem) {
        this.#as.length = 0;
        for (const v of problem.variables())this.#as.push(new (0, _assignmentJs.Assignment)({
            variable: v,
            value: v.value()
        }));
    }
    setAssignmentList(al) {
        this.#as.length = 0;
        for (const a of al)this.#as.push(new (0, _assignmentJs.Assignment)({
            variable: a.variable(),
            value: a.value()
        }));
    }
    setVariables(vs) {
        this.#as.length = 0;
        for (const v of vs)this.#as.push(new (0, _assignmentJs.Assignment)({
            variable: v,
            value: v.value()
        }));
    }
    addVariable(variable, value = null) {
        this.#as.push(new (0, _assignmentJs.Assignment)({
            variable,
            value
        }));
    }
    apply() {
        for (const a of this.#as)a.apply();
    }
    /**
	 * Remove all assignments.
	 */ clear() {
        this.#as.length = 0;
    }
    /**
	 * Checks whether the list is empty or not.
	 * @return True if empty.
	 */ isEmpty() {
        return this.#as.length === 0;
    }
    /**
	 * Gets the number of assignments.
	 * @return Number of assignments.
	 */ size() {
        return this.#as.length;
    }
    differenceSize() {
        let diff = 0;
        for (const a of this.#as)if (a.variable().value() !== a.value()) ++diff;
        return diff;
    }
    /**
	 * Gets the assignments by specifying their indices.
	 * @param index Index.
	 * @return An assignment.
	 */ at(index) {
        return this.#as[index];
    }
    /**
	 * Gets the iterator of the assignments.
	 */ [Symbol.iterator]() {
        return this.#as[Symbol.iterator]();
    }
    /**
	 * Gets an arbitrary assignment.
	 *
	 * @return An assignment.
	 */ random() {
        return this.#as[Math.floor(Math.random() * this.#as.length)];
    }
}

},{"./assignment.js":"8iiwg","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8iiwg":[function(require,module,exports) {
/**
 * The class represents a pair of variables and the values to be assigned to them.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Assignment", ()=>Assignment);
class Assignment {
    #variable;
    #value;
    constructor(args){
        if (args.assignment) {
            this.#variable = args.assignment.variable();
            this.#value = args.assignment.value();
        } else if (args.variable) {
            this.#variable = args.variable;
            this.#value = args.value ?? args.variable.value();
        }
    }
    /**
	 * Assigns a value to a stored variable.
	 */ apply() {
        this.#variable.assign(this.#value);
    }
    /**
	 * Returns a string representation.
	 * @return A string representation.
	 */ toString() {
        return `v${this.#variable.index()} <- ${this.#value}`;
    }
    /**
	 * Gets the value.
	 * @return Value.
	 */ value() {
        return this.#value;
    }
    /**
	 * Gets the variable.
	 * @return Variable.
	 */ variable() {
        return this.#variable;
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

},{}],"8Y1Zp":[function(require,module,exports) {
/**
 * The class for solvers for finding solutions to constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Solver", ()=>Solver);
class Solver {
    _debug = true;
    _debugOutput = (e)=>console.log(e);
    /**
	 * The crisp/fuzzy constraint satisfaction problem solved by the solver.
	 */ _pro;
    /**
	 *  Limit number of iterations.
	 */ _iterLimit = null;
    /**
	 * Time limit.
	 */ _timeLimit = null;
    /**
	 * Target 'satisfied constraint rate' or 'constraint satisfaction degree'.
	 */ _targetDeg = 0.8;
    /**
	 * Listeners of this solver.
	 */ #listener = [];
    /**
	 * Generates a solver given a constraint satisfaction problem.
	 * @param pro A constraint satisfaction problem.
	 */ constructor(pro){
        this._pro = pro;
    }
    /**
	 * Returns the name of the solver.
	 * @return The name.
	 */ name() {
        return "";
    }
    /**
	 * Placeholder for implementing an algorithm.
	 * The solve method calls this method and returns the return value of this method.
	 * @return True if the algorithm succeeds,
	 */ exec() {
        return false;
    }
    /**
	 * Sets and limits the maximum number of iterations for the solver's behavior.
	 * After the specified number of iterations, the solver stops as a failure. The specific behavior depends on the solver.
	 * @param count Maximum value; null means not set.
	 */ setIterationLimit(count = null) {
        this._iterLimit = count;
    }
    /**
	 * Sets a time limit on the solver's behavior.
	 * If the specified time is exceeded, the solver stops as a failure. The specific behavior depends on the solver.
	 * @param msec Time limit. null means not set.
	 */ setTimeLimit(msec = null) {
        this._timeLimit = msec;
    }
    /**
	 * The goal to be achieved, which is the condition for stopping the solver, is set as the constraint satisfaction degree (fuzzy) or the percentage of constraints satisfied (crisp).
	 * The solver stops as success if the specified percentage is reached or exceeded. The specific behavior depends on the solver.
	 * @param rate Degree or rate. null indicates not set.
	 */ setTargetRate(rate = null) {
        this._targetDeg = rate;
    }
    /**
	 * Computes the solution to a constraint satisfaction problem.
	 * The specific meaning of the return value depends on the implementation of the algorithm.
	 * @return True if the algorithm succeeds
	 */ solve() {
        return this.exec();
    }
    addListener(l) {
        this.#listener.add(l);
    }
    removeListener(l) {
        this.#listener.splice(this.#listener.indexOf(l), 1);
    }
    foundSolution(solution, worstDegree) {
        let finish = false;
        for (const l of this.#listener)if (l.foundSolution(solution, worstDegree)) finish = true;
        return finish;
    }
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["f26Ff"], null, "parcelRequire7885")

//# sourceMappingURL=fuzzy-genet.435b2c8e.js.map
