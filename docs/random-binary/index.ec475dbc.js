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
})({"61CIU":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "414377d5ec475dbc";
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

},{}],"2RR0N":[function(require,module,exports) {
var _solverFactoryJs = require("../../src/solver/solver-factory.js");
var _utilJs = require("../util.js");
const COUNT = 1; // Interaction count
const SOLVER_TYPE = 4;
const TARGET_RATE = 0.8;
const VAR_NUM = 10;
const DENSITY = 0.5;
const AVE_TIGHTNESS = 0.5;
document.addEventListener("DOMContentLoaded", async ()=>{
    const solTypeSel = document.getElementById("solver-type");
    (0, _solverFactoryJs.SolverFactory).fuzzySolverNames().forEach((sn, i)=>{
        const o = document.createElement("option");
        o.textContent = sn;
        o.value = i;
        solTypeSel.appendChild(o);
    });
    solTypeSel.value = SOLVER_TYPE;
    const targetRate = document.getElementById("target-rate");
    targetRate.value = TARGET_RATE;
    const varNum = document.getElementById("var-num");
    varNum.value = VAR_NUM;
    const density = document.getElementById("density");
    density.value = DENSITY;
    const aveTightness = document.getElementById("ave-tightness");
    aveTightness.value = AVE_TIGHTNESS;
    const output = document.getElementById("output");
    const log = (0, _utilJs.createLogOutput)();
    let worker = null;
    const solStartBtn = document.getElementById("solver-start");
    const solStopBtn = document.getElementById("solver-stop");
    solStartBtn.addEventListener("click", ()=>{
        solStartBtn.disabled = true;
        solStopBtn.disabled = false;
        output.value = "";
        worker = initialize(()=>solStopBtn.click());
        start(worker, parseInt(solTypeSel.value), parseFloat(targetRate.value), parseFloat(varNum.value), parseFloat(density.value), parseFloat(aveTightness.value));
    });
    solStopBtn.addEventListener("click", ()=>{
        solStartBtn.disabled = false;
        solStopBtn.disabled = true;
        worker.terminate();
    });
    // -------------------------------------------------------------------------
    let count = 0;
    function initialize(onFinish) {
        let sumTime = 0;
        let sumDeg = 0;
        const ww = new Worker(require("9a83d44b1c7d6351"));
        ww.onmessage = (e)=>{
            const { data  } = e;
            if ("log" in data) log(data.log);
            else if ("result" in data) {
                const { result , solver , time , deg  } = data;
                sumTime += time;
                sumDeg += deg;
                count += 1;
                log(`solver: ${solver}   ${result ? "success" : "failure"}`);
                log(`trial: ${count}   time: ${time}   degree: ${deg}`);
                if (COUNT <= count) {
                    log(`average time: ${sumTime / COUNT}   average rate: ${sumDeg / COUNT}`);
                    onFinish();
                }
            }
        };
        return ww;
    }
    async function start(ww, solverType, targetRate, varNum, density, aveTightness) {
        for(let i = 0; i < COUNT; ++i){
            const now = count;
            ww.postMessage({
                task: "create",
                args: [
                    varNum,
                    density,
                    aveTightness
                ]
            });
            ww.postMessage({
                task: "solve",
                args: [
                    solverType,
                    targetRate
                ]
            });
            await (0, _utilJs.waitFor)(()=>count !== now);
        }
    }
});

},{"../../src/solver/solver-factory.js":"5rSZm","../util.js":"cakah","9a83d44b1c7d6351":"bXzUe"}],"5rSZm":[function(require,module,exports) {
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

},{"d4e4973b39ce930b":"fsuVO","34ebdab28e1c5bd9":"7ICfG","9fa70884b15f38":"cKQon","da79c45d91b71482":"anpxG","78a7ec70795b6a8c":"8xyup","311a61112f100960":"2hN5Y","939ff44749742ac":"agwbX","19ad2ccf0416e2ab":"kCoga","64ed0109718e119d":"3nPqT","6d83d6eabc1f411":"84J4r","d824c24762972a6c":"e7gim","3879f5adfa9382f3":"gP9aj","bebe2f699b21cd00":"iNNhE","b72340a0f3a85ad2":"hsevu","8de2615fc285a512":"7jhxU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fsuVO":[function(require,module,exports) {
module.exports = require("e01221e175421aec")(require("8258e536e6fb39bc").getBundleURL("5Bozu") + "../forward-checking.2840558e.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("iWzoF"));

},{"e01221e175421aec":"61B45","8258e536e6fb39bc":"lgJ39"}],"61B45":[function(require,module,exports) {
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

},{}],"7ICfG":[function(require,module,exports) {
module.exports = require("efc508c69c14e1db")(require("81e497f92473ab65").getBundleURL("5Bozu") + "../max-forward-checking.b59f6425.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("ewFsV"));

},{"efc508c69c14e1db":"61B45","81e497f92473ab65":"lgJ39"}],"cKQon":[function(require,module,exports) {
module.exports = require("a54f9d395c300913")(require("189d7f0b8546f66c").getBundleURL("5Bozu") + "../local-changes.5642719f.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("528lF"));

},{"a54f9d395c300913":"61B45","189d7f0b8546f66c":"lgJ39"}],"anpxG":[function(require,module,exports) {
module.exports = require("486f67d68dddf81a")(require("c10c4a25963112e8").getBundleURL("5Bozu") + "../local-changes-ex.11e26c59.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("5SbDF"));

},{"486f67d68dddf81a":"61B45","c10c4a25963112e8":"lgJ39"}],"8xyup":[function(require,module,exports) {
module.exports = require("d51f21916456e9c6")(require("21fb68d66e0d14ad").getBundleURL("5Bozu") + "../breakout.1fd609ad.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("3Vsrl"));

},{"d51f21916456e9c6":"61B45","21fb68d66e0d14ad":"lgJ39"}],"2hN5Y":[function(require,module,exports) {
module.exports = require("651715962d8e344e")(require("44d30d3a6f7f61aa").getBundleURL("5Bozu") + "../genet.bb06b38d.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("frS8r"));

},{"651715962d8e344e":"61B45","44d30d3a6f7f61aa":"lgJ39"}],"agwbX":[function(require,module,exports) {
module.exports = require("523d5162126af2d4")(require("95b855962f1d6421").getBundleURL("5Bozu") + "../crisp-srs3.3bc686d5.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("g1oP2"));

},{"523d5162126af2d4":"61B45","95b855962f1d6421":"lgJ39"}],"kCoga":[function(require,module,exports) {
module.exports = require("a8e4ff1f30f22cd7")(require("8ae3690236f62640").getBundleURL("5Bozu") + "../fuzzy-forward-checking.c2f2e495.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("lj0XW"));

},{"a8e4ff1f30f22cd7":"61B45","8ae3690236f62640":"lgJ39"}],"3nPqT":[function(require,module,exports) {
module.exports = require("367a61733171f486")(require("a11566a420c8a2d3").getBundleURL("5Bozu") + "../fuzzy-forward-checking-bc.4420e29e.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("6LVDA"));

},{"367a61733171f486":"61B45","a11566a420c8a2d3":"lgJ39"}],"84J4r":[function(require,module,exports) {
module.exports = require("52f6ef1f5076765d")(require("89ff83dd61b2b168").getBundleURL("5Bozu") + "../flexible-local-changes.d7da5770.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("5SKYb"));

},{"52f6ef1f5076765d":"61B45","89ff83dd61b2b168":"lgJ39"}],"e7gim":[function(require,module,exports) {
module.exports = require("5c79e52f3b192ed7")(require("da4438b83d47a505").getBundleURL("5Bozu") + "../flexible-local-changes-ex.98b6ceed.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("gFjSJ"));

},{"5c79e52f3b192ed7":"61B45","da4438b83d47a505":"lgJ39"}],"gP9aj":[function(require,module,exports) {
module.exports = require("11d1a5482ccbc6e3")(require("c9ca591ee5c3a80b").getBundleURL("5Bozu") + "../fuzzy-breakout.587009ca.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("ana3Z"));

},{"11d1a5482ccbc6e3":"61B45","c9ca591ee5c3a80b":"lgJ39"}],"iNNhE":[function(require,module,exports) {
module.exports = require("764ce59b4c69292")(require("2838ce5dcd8f9849").getBundleURL("5Bozu") + "../fuzzy-genet.435b2c8e.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("86Xxw"));

},{"764ce59b4c69292":"61B45","2838ce5dcd8f9849":"lgJ39"}],"hsevu":[function(require,module,exports) {
module.exports = require("f2a2fd0d638df3b5")(require("af60884014127468").getBundleURL("5Bozu") + "../srs3.e2a6d0d8.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("gaaWt"));

},{"f2a2fd0d638df3b5":"61B45","af60884014127468":"lgJ39"}],"7jhxU":[function(require,module,exports) {
module.exports = Promise.all([
    require("ce67845b80117096")(require("2121c980d523c87").getBundleURL("5Bozu") + "../srs3.e2a6d0d8.js" + "?" + Date.now()).catch((err)=>{
        delete module.bundle.cache[module.id];
        throw err;
    }),
    require("ce67845b80117096")(require("2121c980d523c87").getBundleURL("5Bozu") + "../srs3-pf.2bb3b9a2.js" + "?" + Date.now()).catch((err)=>{
        delete module.bundle.cache[module.id];
        throw err;
    })
]).then(()=>module.bundle.root("2ksoK"));

},{"ce67845b80117096":"61B45","2121c980d523c87":"lgJ39"}],"gkKU3":[function(require,module,exports) {
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

},{}],"cakah":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "waitFor", ()=>waitFor);
parcelHelpers.export(exports, "createLogOutput", ()=>createLogOutput);
function waitFor(fn) {
    return new Promise((r)=>{
        const si = setInterval(()=>{
            if (fn()) {
                clearInterval(si);
                r();
            }
        }, 100);
    });
}
function createLogOutput(id = "output") {
    const output = document.getElementById(id);
    return (e)=>{
        output.value += `${e}\n`;
        setTimeout(()=>output.scrollTo(0, output.scrollHeight), 100);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bXzUe":[function(require,module,exports) {
let workerURL = require("1e6e5254e5bf994d");
let bundleURL = require("e8f6ea6478404105");
let url = bundleURL.getBundleURL("5Bozu") + "../worker.04a3b279.js" + "?" + Date.now();
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"1e6e5254e5bf994d":"cn2gM","e8f6ea6478404105":"lgJ39"}],"cn2gM":[function(require,module,exports) {
"use strict";
module.exports = function(workerUrl, origin, isESM) {
    if (origin === self.location.origin) // If the worker bundle's url is on the same origin as the document,
    // use the worker bundle's own url.
    return workerUrl;
    else {
        // Otherwise, create a blob URL which loads the worker bundle with `importScripts`.
        var source = isESM ? "import " + JSON.stringify(workerUrl) + ";" : "importScripts(" + JSON.stringify(workerUrl) + ");";
        return URL.createObjectURL(new Blob([
            source
        ], {
            type: "application/javascript"
        }));
    }
};

},{}]},["61CIU","2RR0N"], "2RR0N", "parcelRequire7885")

//# sourceMappingURL=index.ec475dbc.js.map