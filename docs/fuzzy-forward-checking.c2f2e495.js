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
})({"9bLQa":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "71805da8c2f2e495";
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

},{}],"lj0XW":[function(require,module,exports) {
/**
 * This class implements the forward checking method for fuzzy CSP.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 * Each variable must have its own domain because it hides domain elements as branch pruning.
 * Forward checking is also performed for problems with polynomial constraints.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FuzzyForwardChecking", ()=>FuzzyForwardChecking);
var _constraintJs = require("../../problem/constraint.js");
var _assignmentListJs = require("../../util/assignment-list.js");
var _domainPrunerJs = require("../../util/domain-pruner.js");
var _solverJs = require("../solver.js");
class FuzzyForwardChecking extends (0, _solverJs.Solver) {
    static CONTINUE = 0;
    static TERMINATE = 1;
    #vars;
    #sol = new (0, _assignmentListJs.AssignmentList)();
    #relCons;
    #solWorstDeg = 0;
    #iterCount;
    #endTime;
    #useMRV = false;
    #degInc = 0;
    #sequence;
    #unaryCons;
    #checkedCons;
    #pruneIntensively = false;
    /**
	 * Generates the solver given a fuzzy constraint satisfaction problem.
	 * @param p A fuzzy problem.
	 * @param worstSatisfactionDegree Worst satisfaction degree.
	 */ constructor(p, worstSatisfactionDegree = null){
        super(p);
        this.#vars = [
            ...this._pro.variables()
        ];
        this.#sequence = new Array(this._pro.variableSize());
        this.#initializeRelatedConstraintTable();
        this.#checkedCons = new Array(this._pro.constraintSize());
        const temp = [];
        for (const c of this._pro.constraints())if (c.size() === 1) temp.push(c);
        this.#unaryCons = [
            ...temp
        ]; // To make it even if it is empty.
        if (worstSatisfactionDegree) this.#solWorstDeg = worstSatisfactionDegree;
    }
    name() {
        return "Forward Checking for Fuzzy CSPs";
    }
    // Initializes a table that caches constraints between two variables.
    #initializeRelatedConstraintTable() {
        this.#relCons = [];
        for(let j = 0; j < this.#vars.length; ++j){
            this.#relCons.push(new Array(this.#vars.length));
            for(let i = 0; i < this.#vars.length; ++i)if (i < j) this.#relCons[j][i] = this._pro.constraintsBetween(this.#vars[i], this.#vars[j]);
        }
    }
    // Retrieves an array of constraints from a table that caches constraints between two variables.
    #getConstraintsBetween(vi_index, vj_index) {
        if (vi_index < vj_index) return this.#relCons[vj_index][vi_index];
        return this.#relCons[vi_index][vj_index];
    }
    // Prune elements of the domain that make the unary constraint worse than the current worst degree.
    #pruneUnaryConstraints() {
        for (const c of this.#unaryCons){
            const v = c.at(0);
            const orgVal = v.value(); // Save the value.
            const d = v.domain();
            const dc = v.solverObject;
            for(let i = 0, n = d.size(); i < n; ++i){
                v.assign(d.at(i));
                if (c.satisfactionDegree() <= this.#solWorstDeg) dc.hide(i, -1); // Here's a branch pruning!
            }
            v.assign(orgVal); // Restore the value.
            if (dc.isEmpty()) return false;
        }
        return true;
    }
    // Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there is one unassigned variable in the scope of the constraint).
    #checkForwardConsistency(level, vi, c) {
        const di = vi.domain();
        const dci = vi.solverObject;
        for(let i = 0, n = di.size(); i < n; ++i){
            if (dci.isValueHidden(i)) continue;
            vi.assign(di.at(i));
            if (c.satisfactionDegree() <= this.#solWorstDeg) dci.hide(i, level); // Here's a branch pruning!
        }
        vi.clear();
        return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
    }
    // Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there are two unassigned variables in the scope of the constraint).
    #checkForwardConsistency2(level1, vi1, c1) {
        const di = vi1.domain();
        const dci = vi1.solverObject;
        const vj = null;
        for (const v of c1)if (v.isEmpty() && v !== vi1) {
            vj = v;
            break;
        }
        const dj = vj.domain();
        const dcj = vj.solverObject;
        loop_i: for(let i = 0, ni = di.size(); i < ni; ++i){
            if (dci.isValueHidden(i)) continue;
            vi1.assign(di.at(i)); // Tentative assignment to vi
            for(let j = 0, nj = dj.size(); j < nj; ++j){
                if (dcj.isValueHidden(j)) continue;
                vj.assign(dj.at(j)); // Tentative assignment to vj
                const s = c1.satisfactionDegree();
                if (s > this.#solWorstDeg) continue loop_i; // Tentative assignment to vi was OK -> next tentative assignment.
            }
            dci.hide(i, level1); // It is not a solution when it is 'smaller than or equals'.
        }
        vj.clear();
        vi1.clear();
        return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
    }
    // Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there are three unassigned variables in the scope of the constraint).
    #checkForwardConsistency3(level2, vi2, c2) {
        const di = vi2.domain();
        const dci = vi2.solverObject;
        let vj = null;
        let vk = null;
        for (const v of c2)if (v.isEmpty() && v !== vi2) {
            if (vj === null) vj = v;
            else {
                vk = v;
                break;
            }
        }
        const dj = vj.domain();
        const dk = vk.domain();
        const dcj = vj.solverObject;
        const dck = vk.solverObject;
        loop_i: for(let i = 0, ni = di.size(); i < ni; ++i){
            if (dci.isValueHidden(i)) continue;
            vi2.assign(di.at(i)); // Tentative assignment to vi
            for(let j = 0, nj = dj.size(); j < nj; ++j){
                if (dcj.isValueHidden(j)) continue;
                vj.assign(dj.at(j)); // Tentative assignment to vj
                for(let k = 0, nk = dk.size(); k < nk; ++k){
                    if (dck.isValueHidden(k)) continue;
                    vk.assign(dk.at(k)); // Tentative assignment to vk
                    const s = c2.satisfactionDegree();
                    if (s > this.#solWorstDeg) continue loop_i; // Tentative assignment to vi was OK -> next tentative assignment.
                }
            }
            dci.hide(i, level2); // It is not a solution when it is 'smaller than or equals'.
        }
        vk.clear();
        vj.clear();
        vi2.clear();
        return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
    }
    // In the case of polynomial constraints and when there are four or more unassigned variables, all combinations of assignments of unassigned variables are examined and pruned.
    #checkForwardConsistencyN(level3, vi3, c3, emptySize) {
        const di = vi3.domain();
        const dci = vi3.solverObject;
        const emp = new Array(emptySize - 1);
        let j = 0;
        for (const v of c3)if (v.isEmpty() && v !== vi3) emp[j++] = v;
        const indexes = new Array(emp.length);
        loop_i: for(let i = 0, n = di.size(); i < n; ++i){
            if (dci.isValueHidden(i)) continue;
            vi3.assign(di.at(i)); // Tentative assignment to vi
            indexes.fill(0);
            comLoop: while(true){
                let hidden = false;
                for(let k = 0; k < emp.length; ++k){
                    const dk = emp[k].domain();
                    const dck = emp[k].solverObject;
                    if (dck.isValueHidden(indexes[k])) {
                        hidden = true;
                        break;
                    }
                    emp[k].assign(dk.at(indexes[k]));
                }
                if (!hidden) {
                    const s = c3.satisfactionDegree();
                    if (s > this.#solWorstDeg) continue loop_i; // Tentative assignment to vi was OK -> next tentative assignment.
                }
                for(let k = 0; k < emp.length; ++k){
                    indexes[k] += 1;
                    if (indexes[k] < emp[k].domain().size()) break;
                    indexes[k] = 0;
                    if (k === emp.length - 1) break comLoop;
                }
            }
            dci.hide(i, level3);
        }
        for (const v of emp)v.clear();
        vi3.clear();
        return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
    }
    // Checks for possible assignment to a future variable from the current variable assignment.
    #checkForward(level4, index) {
        for (const v_i of this.#vars){
            if (!v_i.isEmpty()) continue; // If it is a past or present variable.
            const cs = this.#getConstraintsBetween(index, v_i.index());
            for (const c of cs){
                const emptySize = c.emptyVariableSize();
                if (emptySize === 1) {
                    if (!this.#checkForwardConsistency(level4, v_i, c)) return false;
                } else if (this.#pruneIntensively) {
                    if (emptySize === 2) {
                        if (!this.#checkForwardConsistency2(level4, v_i, c)) return false;
                    } else if (emptySize === 3) {
                        if (!this.#checkForwardConsistency3(level4, v_i, c)) return false;
                    } else if (emptySize > 3) {
                        if (!this.#checkForwardConsistencyN(level4, v_i, c, emptySize)) return false;
                    }
                }
            }
        }
        return true;
    }
    // Checks to see if the current variable assignment makes the degree of the past variable worse than the current worst degree.
    #checkBackwardConsistency(vc) {
        this.#checkedCons.fill(false); // Reuse.
        for(let i = 0; i < this.#vars.length; ++i){
            const vi = this.#vars[i];
            if (vi === vc || vi.isEmpty()) continue; // If it is a future variable or a present variable.
            const cs = this.#getConstraintsBetween(vc.index(), i);
            for (const c of cs){
                if (this.#checkedCons[c.index()]) continue; // Because of the possibility of duplication in polynomial constraints
                const s = c.satisfactionDegree();
                if (s !== (0, _constraintJs.Constraint).UNDEFINED && s <= this.#solWorstDeg) return false;
                this.#checkedCons[c.index()] = true;
            }
        }
        return true;
    }
    #refresh() {
        for(let i = 0; i < this.#sequence.length; ++i){
            const index_vi = this.#sequence[i].index();
            for(let j = i + 1; j < this.#sequence.length; ++j){
                const vj = this.#sequence[j];
                const cs = this.#getConstraintsBetween(index_vi, vj.index());
                for (const c of cs){
                    const orgVal = vj.value();
                    const dj = vj.domain();
                    const dcj = vj.solverObject;
                    for(let k = 0, n = dj.size(); k < n; ++k){
                        if (dcj.isValueHidden(k)) continue;
                        vj.assign(dj.at(k));
                        if (c.satisfactionDegree() <= this.#solWorstDeg) dcj.hide(k, i); // Here's a branch pruning!
                    }
                    vj.assign(orgVal);
                }
            }
        }
    }
    // Returns the index of the smallest domain variable.
    #indexOfVariableWithMRV() {
        let index = 0;
        let size = Number.MAX_VALUE;
        for(let i = 0; i < this.#vars.length; ++i){
            const v = this.#vars[i];
            if (!v.isEmpty()) continue;
            const d = v.domain();
            const s = d.size() - v.solverObject.hiddenSize();
            if (s < size) {
                size = s;
                index = i;
            }
        }
        return index;
    }
    // Performs search one variable at a time.
    #branch(level5) {
        let bc = FuzzyForwardChecking.CONTINUE;
        const vc_index = this.#useMRV ? this.#indexOfVariableWithMRV() : level5;
        const vc = this.#vars[vc_index];
        const d = vc.domain();
        const dc = vc.solverObject;
        this.#sequence[level5] = vc;
        for(let i = 0, n = d.size(); i < n; ++i){
            if (dc.isValueHidden(i)) continue;
            if (this._iterLimit && this._iterLimit < this.#iterCount++ || this.#endTime < Date.now()) {
                bc = FuzzyForwardChecking.TERMINATE; // Search terminated due to restrictions.
                break;
            }
            vc.assign(d.at(i));
            for (const v of this.#vars)v.solverObject.reveal(level5);
            if (!this.#checkBackwardConsistency(vc)) continue;
            if (!this.#checkForward(level5, vc_index)) continue;
            const nextLevel = level5 + 1;
            bc = nextLevel === this.#vars.length - 1 ? this.#branchLast(nextLevel) : this.#branch(nextLevel);
            if (bc === FuzzyForwardChecking.TERMINATE) break;
        }
        if (bc === FuzzyForwardChecking.CONTINUE) for (const v of this.#vars)v.solverObject.reveal(level5);
        vc.clear();
        return bc;
    }
    // Performs search on the last variable.
    #branchLast(level6) {
        let bc = FuzzyForwardChecking.CONTINUE;
        const vc = this.#vars[this.#useMRV ? this.#indexOfVariableWithMRV() : level6];
        const d = vc.domain();
        const dc = vc.solverObject;
        this.#sequence[level6] = vc;
        for(let i = 0, n = d.size(); i < n; ++i){
            if (dc.isValueHidden(i)) continue;
            if (this._iterLimit && this._iterLimit < this.#iterCount++ || this.#endTime < Date.now()) {
                bc = FuzzyForwardChecking.TERMINATE; // Search terminated due to restrictions.
                break;
            }
            vc.assign(d.at(i));
            const deg = this._pro.worstSatisfactionDegree();
            if (deg > this.#solWorstDeg) {
                this.#solWorstDeg = deg;
                this.#sol.setProblem(this._pro);
                bc = FuzzyForwardChecking.TERMINATE;
                if (this._targetDeg !== null && this._targetDeg <= this.#solWorstDeg) break;
                this.#pruneUnaryConstraints();
                this.#refresh();
            }
        }
        vc.clear();
        return bc;
    }
    // Do search.
    exec() {
        this.#endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        this.#iterCount = 0;
        for (const v of this.#vars)v.solverObject = new (0, _domainPrunerJs.DomainPruner)(v.domain().size()); // Generation of domain pruners.
        this._pro.clearAllVariables();
        if (!this.#pruneUnaryConstraints()) return false; // Since _worstSatisfactionDegree_ has been updated, call this function.
        let success = false;
        while(true){
            const bc = this.#branch(0);
            if (bc === FuzzyForwardChecking.TERMINATE) {
                if (this._iterLimit && this._iterLimit < this.#iterCount++) {
                    this._debugOutput("stop: number of iterations has reached the limit");
                    break;
                }
                if (this.#endTime < Date.now()) {
                    this._debugOutput("stop: time limit has been reached");
                    break;
                }
            }
            if (this.#sol.isEmpty()) break;
            this._debugOutput(`\tfound a solution: ${this.#solWorstDeg}`);
            if (this.foundSolution(this.#sol, this.#solWorstDeg)) {
                success = true;
                break;
            }
            if (this._targetDeg === null) {
                success = true;
                this.#solWorstDeg += this.#degInc; // Find the next solution within the limit.
            } else if (this._targetDeg <= this.#solWorstDeg) {
                this._debugOutput("stop: current degree is above the target");
                success = true;
                break;
            }
            for (const v of this.#vars)v.solverObject.revealAll();
        }
        this.#sol.apply();
        for (const v of this.#vars)v.solverObject = null; // Delete branch pruner
        return success;
    }
    /**
	 * Constraint satisfaction degree is set as an achievement goal that serves as a condition for stopping the solver.
	 * The solver stops as successful when the specified degree is reached or exceeded.
	 * The default (unset) is 0.8.
	 * @param rate Degree. null indicates not set.
	 */ setTargetRate(rate = null) {
        this._targetDeg = rate;
        if (this._targetDeg === null) this.#solWorstDeg = 0;
        else {
            // Find the worstSatisfactionDegree_ that is slightly smaller than the targetDegree_.
            let e = Number.MIN_VALUE;
            this.#solWorstDeg = this._targetDeg - e;
            while(this.#solWorstDeg >= this._targetDeg){
                e *= 10;
                this.#solWorstDeg = this._targetDeg - e;
            }
        }
    }
    /**
	 * Specify whether to use the minimum-remaining-values (MRV) heuristic.
	 * Use of MRV may increase processing time for some problems.
	 * Default is false.
	 * @param flag Use MRV if true.
	 */ setUsingMinimumRemainingValuesHeuristics(flag) {
        this.#useMRV = flag;
    }
    /**
	 * If a solution is found and the search continues, it specifies how much the worst constraint satisfaction degree should be increased.
	 * @param degree Increasing constraint satisfaction degree.
	 */ setIncrementStepOfWorstSatisfactionDegree(degree) {
        this.#degInc = degree;
    }
    /**
	 * Specifies whether or not to intensively prune branches when the problem contains 3- or n-ary constraints.
	 * Depending on the problem, intensive pruning may increase processing time.
	 * Default is false.
	 * @param flag Whether or not to intensively prune branches.
	 */ setIntensivePruning(flag) {
        this.#pruneIntensively = flag;
    }
}

},{"../../problem/constraint.js":"33EPT","../../util/assignment-list.js":"hRVDU","../../util/domain-pruner.js":"a8ssJ","../solver.js":"8Y1Zp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"33EPT":[function(require,module,exports) {
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

},{"./element.js":"6pLtx","./relation-fuzzy.js":"aBYKX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6pLtx":[function(require,module,exports) {
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

},{}],"aBYKX":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hRVDU":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a8ssJ":[function(require,module,exports) {
/**
 * This class holds the branch pruning states for a domain.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DomainPruner", ()=>DomainPruner);
class DomainPruner {
    static #UNHIDDEN = -1;
    #hiddenLevels;
    #hiddenSize = 0;
    /**
	 * Generates a class that holds branch pruning states for a domain.
	 * @param size Size of the corresponding domain
	 */ constructor(size){
        this.#hiddenLevels = new Array(size);
        this.#hiddenLevels.fill(DomainPruner.#UNHIDDEN);
    }
    /**
	 * Returns the size of the erased element.
	 * @return Size of the erased element.
	 */ hiddenSize() {
        return this.#hiddenSize;
    }
    /**
	 * Erases the element at the specified index.
	 * @param index Index.
	 * @param level Level.
	 */ hide(index, level) {
        if (this.#hiddenLevels[index] === DomainPruner.#UNHIDDEN) ++this.#hiddenSize;
        this.#hiddenLevels[index] = level;
    }
    /**
	 * Returns whether the element is empty or not.
	 * Returns true if all elements have been erased.
	 * @return True if empty.
	 */ isEmpty() {
        return this.#hiddenLevels.length === this.#hiddenSize;
    }
    /**
	 * Returns whether or not the element at the specified index has been erased.
	 * @param index Index.
	 * @return True if erased.
	 */ isValueHidden(index) {
        return this.#hiddenLevels[index] !== DomainPruner.#UNHIDDEN;
    }
    /**
	 * Restores the value that had been erased, by specifying a level.
	 * @param level Level
	 */ reveal(level) {
        for(let i = 0; i < this.#hiddenLevels.length; ++i)if (this.#hiddenLevels[i] === level) {
            this.#hiddenLevels[i] = DomainPruner.#UNHIDDEN;
            --this.#hiddenSize;
        }
    }
    /**
	 * Restores all erased values.
	 */ revealAll() {
        this.#hiddenLevels.fill(DomainPruner.#UNHIDDEN);
        this.#hiddenSize = 0;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8Y1Zp":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["9bLQa"], null, "parcelRequire7885")

//# sourceMappingURL=fuzzy-forward-checking.c2f2e495.js.map