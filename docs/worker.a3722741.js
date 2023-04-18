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
})({"1prd0":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "a8fb9c35fdafe466";
module.bundle.HMR_BUNDLE_ID = "9f598ce4a3722741";
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

},{}],"c85su":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Problem", ()=>$b3946af8d0a4f6b3$export$559d26475d35ac1e);
parcelHelpers.export(exports, "CrispProblem", ()=>$2101e22eb3ae726f$export$2d7b2a6964dca148);
parcelHelpers.export(exports, "Element", ()=>$a6d4d56491033d44$export$db77ccec0bb4ccac);
parcelHelpers.export(exports, "Variable", ()=>$d579165ed6156fef$export$c867a5c9595a1350);
parcelHelpers.export(exports, "ObservableVariable", ()=>$34d613011f471732$export$a14c1bd8f74377e);
parcelHelpers.export(exports, "Domain", ()=>$508208a6b2bd191f$export$f102e87ccfb079d0);
parcelHelpers.export(exports, "DomainArbitrary", ()=>$db2d13503f6020b2$export$62fe53be9d2bcdd3);
parcelHelpers.export(exports, "DomainRanged", ()=>$ee9c9e9065869300$export$681548042801f21c);
parcelHelpers.export(exports, "Constraint", ()=>$5108df96f96301e5$export$aec1359a0a40a615);
parcelHelpers.export(exports, "Constraint1", ()=>$b0a9d1b63859ae83$export$42d7bbd8a43e587d);
parcelHelpers.export(exports, "Constraint2", ()=>$7ca5368ccef10d69$export$18305a9eb79647d6);
parcelHelpers.export(exports, "Constraint3", ()=>$56ac6fbf2c694e12$export$7dc34a7e74bc57bb);
parcelHelpers.export(exports, "ConstraintN", ()=>$05a57f57159fb878$export$fd9d2e5591a15c9a);
parcelHelpers.export(exports, "Relation", ()=>$3ad6598cfee2c4f1$export$b57c6722681faed7);
parcelHelpers.export(exports, "FuzzyRelation", ()=>$a3e6c3477395ea27$export$3b3c4a6f6988f9e8);
parcelHelpers.export(exports, "FuzzyTabledRelation", ()=>$156a3c65876fbe62$export$9af92f8a5a1bfd9d);
parcelHelpers.export(exports, "FuzzyRelationFunction", ()=>$1f9eaa8675325d70$export$292ff2b1fb710ade);
parcelHelpers.export(exports, "CrispRelation", ()=>$48d470acfc59c60d$export$182ea39d269dda05);
parcelHelpers.export(exports, "CrispTabledRelation", ()=>$f89acf0bacbb6f88$export$14031e4758dfc3cf);
parcelHelpers.export(exports, "CrispRelationFunction", ()=>$566faa83320be882$export$a1cc6d3c2a0259e4);
parcelHelpers.export(exports, "CrispRelationView", ()=>$1a2fe3a3e431eeba$export$f47c6ef1c1dceb7d);
parcelHelpers.export(exports, "FuzzyRelationView", ()=>$1a2fe3a3e431eeba$export$105e23542a0b280f);
parcelHelpers.export(exports, "Solver", ()=>$c4f5921582438a32$export$cca492cadf45c096);
parcelHelpers.export(exports, "SolverFactory", ()=>$bc75b5b8eb656b55$export$4e442516b8f577ee);
parcelHelpers.export(exports, "FlexibleLocalChanges", ()=>$8d58e5e35735c7ec$export$c15ba88cf158f3d6);
parcelHelpers.export(exports, "FlexibleLocalChangesEx", ()=>$0ed82bb4e6966b5c$export$f3429dcb0286bfee);
parcelHelpers.export(exports, "FuzzyBreakout", ()=>$b222557a012b5259$export$151ca5d788220218);
parcelHelpers.export(exports, "FuzzyForwardChecking", ()=>$d149e5ad62c58307$export$2d94cf9ddb103458);
parcelHelpers.export(exports, "FuzzyForwardCheckingBc", ()=>$a7583aef89e9a883$export$532d5536583284b8);
parcelHelpers.export(exports, "FuzzyGENET", ()=>$1ccf339c7def6c57$export$6a3df005617df82a);
parcelHelpers.export(exports, "SRS3", ()=>$2b8a116c9a37397b$export$4bfabca73d1ccb59);
parcelHelpers.export(exports, "SRS3_PF", ()=>$5e4f7d48ff32a2ed$export$281ed65cbb041503);
parcelHelpers.export(exports, "Breakout", ()=>$2c8e786ab4db97cd$export$44de86bc32e07644);
parcelHelpers.export(exports, "CrispSRS3", ()=>$621e09da02c15793$export$193930056f923a8);
parcelHelpers.export(exports, "ForwardChecking", ()=>$753cae771624653d$export$8570b7b487498488);
parcelHelpers.export(exports, "GENET", ()=>$0cb6792a4a1b293a$export$d94917317b4f74cb);
parcelHelpers.export(exports, "LocalChanges", ()=>$62da18818fc7efc1$export$8153937ab18ca581);
parcelHelpers.export(exports, "LocalChangesEx", ()=>$7f4ecc5acb283d86$export$e577c7182ffc977b);
parcelHelpers.export(exports, "MaxForwardChecking", ()=>$5da71a10526e78a7$export$2a32484f7cb0d846);
parcelHelpers.export(exports, "AC3", ()=>$1d9f94f1b65cd2b2$export$ac824f187e852f5a);
parcelHelpers.export(exports, "NodeConsistency", ()=>$ca17a2e259f989db$export$975ddbe83e2b310a);
parcelHelpers.export(exports, "PostStabilization", ()=>$b0cf4fb82eab32dc$export$52631f16ca582d39);
parcelHelpers.export(exports, "Problems", ()=>$9270f99178eaf6e6$export$32fae9b8f93405d0);
parcelHelpers.export(exports, "Assignment", ()=>$5c2079e5752e4879$export$e6b39d88cc0d636);
parcelHelpers.export(exports, "AssignmentList", ()=>$a7e2f7128ad72da7$export$1d4e454bcd46f18f);
parcelHelpers.export(exports, "DomainPruner", ()=>$173b03f492df9c2c$export$f307752a90139b0e);
parcelHelpers.export(exports, "LoopDetector", ()=>$d588427b879288b9$export$136021658ac30d9);
function $parcel$export(e, n, v, s) {
    Object.defineProperty(e, n, {
        get: v,
        set: s,
        enumerable: true,
        configurable: true
    });
}
var $b3946af8d0a4f6b3$exports = {};
$parcel$export($b3946af8d0a4f6b3$exports, "Problem", function() {
    return $b3946af8d0a4f6b3$export$559d26475d35ac1e;
});
/**
 * The class represents a constraint satisfaction problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ var $d579165ed6156fef$exports = {};
$parcel$export($d579165ed6156fef$exports, "Variable", function() {
    return $d579165ed6156fef$export$c867a5c9595a1350;
});
/**
 * Class that represents a variable.
 *
 * @author Takuto Yanagida
 * @version 2023-04-18
 */ var $a6d4d56491033d44$exports = {};
$parcel$export($a6d4d56491033d44$exports, "Element", function() {
    return $a6d4d56491033d44$export$db77ccec0bb4ccac;
});
/**
 * The common class of variables and constraints.
 *
 * @author Takuto Yanagida
 * @version 2022-08-15
 */ class $a6d4d56491033d44$export$db77ccec0bb4ccac {
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
class $d579165ed6156fef$export$c867a5c9595a1350 extends $a6d4d56491033d44$export$db77ccec0bb4ccac {
    static #INVALID = Number.MIN_VALUE;
    #owner;
    #dom;
    #val = $d579165ed6156fef$export$c867a5c9595a1350.#INVALID;
    #cons = [];
    // Called only from Problem.
    constructor(owner, d){
        super();
        this.#owner = owner;
        this.#dom = d;
    }
    // Called only from Problem.
    connect(c1) {
        if (this.has(c1)) throw new IllegalArgumentException();
        this.#cons.push(c1);
    }
    // Called only from Problem.
    disconnect(c1) {
        if (!this.has(c1)) throw new IllegalArgumentException();
        this.#cons = this.#cons.filter((n)=>n !== c1);
    }
    /**
	 * Assign a value.
	 * @param value Value.
	 */ assign(value) {
        this.#val = value; // Do not change #val except here.
    }
    /**
	 * Sets the state of the variable to unassigned.
	 */ clear() {
        this.assign($d579165ed6156fef$export$c867a5c9595a1350.#INVALID); // Do not use the invalid value except here and below (isEmpty).
    }
    /**
	 * Checks whether the value is unassigned or not.
	 * @return True if unassigned.
	 */ isEmpty() {
        return this.value() === $d579165ed6156fef$export$c867a5c9595a1350.#INVALID;
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
	 */ has(c1) {
        return this.#cons.includes(c1);
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
        for (const c1 of this.#cons){
            for (const v of c1)if (v !== this) vs.push(v);
        }
        return vs;
    }
}
var $ee9c9e9065869300$exports = {};
$parcel$export($ee9c9e9065869300$exports, "DomainRanged", function() {
    return $ee9c9e9065869300$export$681548042801f21c;
});
/**
 * A variable domain with contiguous integer elements.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */ var $508208a6b2bd191f$exports = {};
$parcel$export($508208a6b2bd191f$exports, "Domain", function() {
    return $508208a6b2bd191f$export$f102e87ccfb079d0;
});
/**
 * An abstract class that represents a variable domain.
 * The domain is immutable.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */ class $508208a6b2bd191f$export$f102e87ccfb079d0 {
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
class $ee9c9e9065869300$export$681548042801f21c extends $508208a6b2bd191f$export$f102e87ccfb079d0 {
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
var $db2d13503f6020b2$exports = {};
$parcel$export($db2d13503f6020b2$exports, "DomainArbitrary", function() {
    return $db2d13503f6020b2$export$62fe53be9d2bcdd3;
});
/**
 * A variable domain with arbitrary elements.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */ class $db2d13503f6020b2$export$62fe53be9d2bcdd3 extends $508208a6b2bd191f$export$f102e87ccfb079d0 {
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
var $5108df96f96301e5$exports = {};
$parcel$export($5108df96f96301e5$exports, "Constraint", function() {
    return $5108df96f96301e5$export$aec1359a0a40a615;
});
/**
 * The class represents a constraint.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */ var $a3e6c3477395ea27$exports = {};
$parcel$export($a3e6c3477395ea27$exports, "FuzzyRelation", function() {
    return $a3e6c3477395ea27$export$3b3c4a6f6988f9e8;
});
/**
 * The class represents fuzzy relationships between variables.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */ var $3ad6598cfee2c4f1$exports = {};
$parcel$export($3ad6598cfee2c4f1$exports, "Relation", function() {
    return $3ad6598cfee2c4f1$export$b57c6722681faed7;
});
/**
 * An interface that represents the relationship between variables.
 * Use CrispRelation or FuzzyRelation class that implement this interface.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */ class $3ad6598cfee2c4f1$export$b57c6722681faed7 {
}
class $a3e6c3477395ea27$export$3b3c4a6f6988f9e8 extends $3ad6598cfee2c4f1$export$b57c6722681faed7 {
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
class $5108df96f96301e5$export$aec1359a0a40a615 extends $a6d4d56491033d44$export$db77ccec0bb4ccac {
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
        return this.rel instanceof $a3e6c3477395ea27$export$3b3c4a6f6988f9e8;
    }
    /**
	 * Returns a string representation.
	 * @return A string representation.
	 */ toString() {
        const s = this.satisfactionDegree();
        return `c${this.index()}${this.name() === "" ? "" : `(${this.name()})`} = ${s === $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED ? "UNDEFINED" : s}`;
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
var $b0a9d1b63859ae83$exports = {};
$parcel$export($b0a9d1b63859ae83$exports, "Constraint1", function() {
    return $b0a9d1b63859ae83$export$42d7bbd8a43e587d;
});
/**
 * The class represents an unary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */ class $b0a9d1b63859ae83$export$42d7bbd8a43e587d extends $5108df96f96301e5$export$aec1359a0a40a615 {
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
        if (this.#vars[0].isEmpty()) return $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED;
        return this.crispRelation().isSatisfied(this.#vars[0].value()) ? 1 : 0;
    }
    /**
	 * {@inheritDoc}
	 */ satisfactionDegree() {
        if (this.#vars[0].isEmpty()) return $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED;
        return this.fuzzyRelation().satisfactionDegree(this.#vars[0].value());
    }
    /**
	 * {@inheritDoc}
	 */ neighbors() {
        const cs = [];
        for (const c1 of this.#vars[0])if (c1 !== this) cs.push(c1);
        return cs;
    }
    /**
	 * {@inheritDoc}
	 */ highestConsistencyDegree() {
        const sd = this.satisfactionDegree();
        if (sd !== $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) return sd;
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
        if (sd !== $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) return sd;
        let cd = 1;
        for (const val of this.#vars[0].domain()){
            const s = this.fuzzyRelation().satisfactionDegree(val);
            if (s < cd) cd = s;
            if (cd === 0) break;
        }
        return cd;
    }
}
var $7ca5368ccef10d69$exports = {};
$parcel$export($7ca5368ccef10d69$exports, "Constraint2", function() {
    return $7ca5368ccef10d69$export$18305a9eb79647d6;
});
/**
 * The class represents an binary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $7ca5368ccef10d69$export$18305a9eb79647d6 extends $5108df96f96301e5$export$aec1359a0a40a615 {
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
        if (this.#vars[0].isEmpty() || this.#vars[1].isEmpty()) return $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED;
        return this.crispRelation().isSatisfied(this.#vars[0].value(), this.#vars[1].value()) ? 1 : 0;
    }
    /**
	 * {@inheritDoc}
	 */ satisfactionDegree() {
        if (this.#vars[0].isEmpty() || this.#vars[1].isEmpty()) return $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED;
        return this.fuzzyRelation().satisfactionDegree(this.#vars[0].value(), this.#vars[1].value());
    }
    /**
	 * {@inheritDoc}
	 */ neighbors() {
        const cs = [];
        for (const c1 of this.#vars[0])if (c1 !== this) cs.push(c1);
        for (const c1 of this.#vars[1])if (c1 !== this) cs.push(c1);
        return cs;
    }
    /**
	 * {@inheritDoc}
	 */ highestConsistencyDegree() {
        const sd = this.satisfactionDegree();
        if (sd !== $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) return sd;
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
        if (sd !== $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) return sd;
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
var $56ac6fbf2c694e12$exports = {};
$parcel$export($56ac6fbf2c694e12$exports, "Constraint3", function() {
    return $56ac6fbf2c694e12$export$7dc34a7e74bc57bb;
});
/**
 * The class represents an 3-ary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */ class $56ac6fbf2c694e12$export$7dc34a7e74bc57bb extends $5108df96f96301e5$export$aec1359a0a40a615 {
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
        if (this.#vars[0].isEmpty() || this.#vars[1].isEmpty() || this.#vars[2].isEmpty()) return $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED;
        return this.fuzzyRelation().satisfactionDegree(this.#vars[0].value(), this.#vars[1].value(), this.#vars[2].value());
    }
    /**
	 * {@inheritDoc}
	 */ neighbors() {
        const cs = [];
        for (const c1 of this.#vars[0])if (c1 !== this) cs.push(c1);
        for (const c1 of this.#vars[1])if (c1 !== this) cs.push(c1);
        for (const c1 of this.#vars[2])if (c1 !== this) cs.push(c1);
        return cs;
    }
    /**
	 * {@inheritDoc}
	 */ highestConsistencyDegree() {
        const sd = this.satisfactionDegree();
        if (sd !== $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) return sd;
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
        if (sd !== $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) return sd;
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
var $05a57f57159fb878$exports = {};
$parcel$export($05a57f57159fb878$exports, "ConstraintN", function() {
    return $05a57f57159fb878$export$fd9d2e5591a15c9a;
});
/**
 * The class represents an n-ary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */ class $05a57f57159fb878$export$fd9d2e5591a15c9a extends $5108df96f96301e5$export$aec1359a0a40a615 {
    #vars;
    #vals;
    // Called only from Problem.
    constructor(r, ...vs){
        super(r);
        this.#vars = [
            ...vs
        ];
        this.#vals = new Array(this.#vars.length);
    }
    /**
	 * {@inheritDoc}
	 */ size() {
        return this.#vars.length;
    }
    /**
	 * {@inheritDoc}
	 */ at(index) {
        return this.#vars[index];
    }
    /**
	 * {@inheritDoc}
	 */ [Symbol.iterator]() {
        return this.#vars[Symbol.iterator]();
    }
    /**
	 * {@inheritDoc}
	 */ has(v) {
        return this.#vars.includes(v);
    }
    /**
	 * {@inheritDoc}
	 */ indexOf(v) {
        return this.#vars.indexOf(v);
    }
    /**
	 * {@inheritDoc}
	 */ emptyVariableSize() {
        let sum = 0;
        for (const v of this.#vars)if (v.isEmpty()) ++sum;
        return sum;
    }
    /**
	 * {@inheritDoc}
	 */ isDefined() {
        for (const v of this.#vars){
            if (v.isEmpty()) return false;
        }
        return true;
    }
    /**
	 * {@inheritDoc}
	 */ isSatisfied() {
        for(let i = 0; i < this.#vars.length; ++i){
            if (this.#vars[i].isEmpty()) return -1;
            this.#vals[i] = this.#vars[i].value();
        }
        return this.crispRelation().isSatisfied(...this.#vals) ? 1 : 0;
    }
    /**
	 * {@inheritDoc}
	 */ satisfactionDegree() {
        for(let i = 0; i < this.#vars.length; ++i){
            const v = this.#vars[i];
            if (v.isEmpty()) return $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED;
            this.#vals[i] = v.value();
        }
        return this.fuzzyRelation().satisfactionDegree(...this.#vals);
    }
    /**
	 * {@inheritDoc}
	 */ neighbors() {
        const cs = [];
        for (const v of this.#vars){
            for (const c1 of v)if (c1 !== this) cs.push(c1);
        }
        return cs;
    }
    /**
	 * {@inheritDoc}
	 */ highestConsistencyDegree() {
        const sd = this.satisfactionDegree();
        if (sd !== $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) return sd;
        const emptyIndices = new Array(this.emptyVariableSize());
        let c1 = 0;
        for(let i = 0; i < this.#vars.length; ++i)if (this.#vars[i].isEmpty()) emptyIndices[c1++] = i;
        else this.#vals[i] = this.#vars[i].value();
        return this.checkHCD(emptyIndices, 0, 0);
    }
    /**
	 * {@inheritDoc}
	 */ lowestConsistencyDegree() {
        const sd = this.satisfactionDegree();
        if (sd !== $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) return sd;
        const emptyIndices = new Array(this.emptyVariableSize());
        let c1 = 0;
        for(let i = 0; i < this.#vars.length; ++i)if (this.#vars[i].isEmpty()) emptyIndices[c1++] = i;
        else this.#vals[i] = this.#vars[i].value();
        return this.checkLCD(emptyIndices, 0, 1);
    }
    checkHCD(emptyIndices, currentStep, cd) {
        const index = emptyIndices[currentStep];
        const d = this.#vars[index].domain();
        if (currentStep === emptyIndices.length - 1) for (const val of d){
            this.#vals[index] = val;
            const s = this.fuzzyRelation().satisfactionDegree(this.#vals);
            if (s > cd) cd = s;
            if (cd === 1) break;
        }
        else for (const val of d){
            this.#vals[index] = val;
            cd = this.checkLCD(emptyIndices, currentStep + 1, cd);
        }
        return cd;
    }
    checkLCD(emptyIndices, currentStep, cd) {
        const index = emptyIndices[currentStep];
        const d = this.#vars[index].domain();
        if (currentStep === emptyIndices.length - 1) for (const val of d){
            this.#vals[index] = val;
            const s = this.fuzzyRelation().satisfactionDegree(this.#vals);
            if (s < cd) cd = s;
            if (cd === 0) break;
        }
        else for (const val of d){
            this.#vals[index] = val;
            cd = this.checkLCD(emptyIndices, currentStep + 1, cd);
        }
        return cd;
    }
}
class $b3946af8d0a4f6b3$export$559d26475d35ac1e {
    #fv = (o, d)=>new $d579165ed6156fef$export$c867a5c9595a1350(o, d);
    #fc = (r, vs)=>{
        if (vs.length === 1) return new $b0a9d1b63859ae83$export$42d7bbd8a43e587d(r, ...vs);
        if (vs.length === 2) return new $7ca5368ccef10d69$export$18305a9eb79647d6(r, ...vs);
        if (vs.length === 3) return new $56ac6fbf2c694e12$export$7dc34a7e74bc57bb(r, ...vs);
        return new $05a57f57159fb878$export$fd9d2e5591a15c9a(r, vs);
    };
    _isFuzzy = false;
    _vars = [];
    _cons = [];
    // Methods for Modifying Factories --------
    /**
	 * Sets a variable factory.
	 */ setVariableFactory(fn) {
        this.#fv = fn;
    }
    /**
	 * Sets a variable factory.
	 */ setConstraintFactory(fn) {
        this.#fc = fn;
    }
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
        if (args.values) return new $db2d13503f6020b2$export$62fe53be9d2bcdd3(args.values);
        else if ("min" in args && "max" in args) return new $ee9c9e9065869300$export$681548042801f21c(args.min, args.max);
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
        const v = this.#fv(this, args.domain);
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
        const c1 = this.#fc(args.relation, args.variables);
        c1.setIndex(this._cons.length);
        this._cons.push(c1);
        for (const v of args.variables)v.connect(c1);
        if (c1.isFuzzy()) this._isFuzzy = true;
        if (args.name) c1.setName(args.name);
        return c1;
    }
    //  Modification Methods --------
    /**
	 * Remove the constraint.
	 * @param c Constraints to be removed.
	 */ removeConstraint(c1) {
        const index = this._cons.indexOf(c1);
        this._cons.remove(c1);
        for(let i = index; i < this._cons.length; ++i)this._cons[i].setIndex(i);
        for (const v of c1)v.disconnect(c1);
        this._isFuzzy = false;
        for (const c1 of this._cons)if (c1.isFuzzy()) {
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
        for (const c1 of this._cons){
            if (c1.name() === name) return c1;
        }
        return null;
    }
    /**
	 * Returns whether the constraint is contained or not.
	 * @param c A constraint
	 * @return True if contained.
	 */ hasConstraint(c1) {
        return this._cons.includes(c1);
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
        for (const c1 of v1)if (c1.has(v2)) cs.push(c1);
        return cs;
    }
    /**
	 * Finds the set of worst satisfiable constraints in a fuzzy constraint satisfaction problem.
	 * @return Array of constraints and worst satisfaction degree.
	 */ constraintsWithWorstSatisfactionDegree() {
        const cs = [];
        let cur = 1;
        for (const c1 of this._cons){
            const s = c1.satisfactionDegree();
            if (s < cur) {
                cur = s;
                cs.length = 0;
                cs.push(c1);
            } else if (s - cur < Number.MIN_VALUE * 10) cs.push(c1);
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
        for (const c1 of this._cons){
            const s = c1.satisfactionDegree();
            if (s === $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) return $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED;
            if (s < cs) cs = s;
        }
        return cs;
    }
    /**
	 * Gets the average of satisfaction degrees of the fuzzy constraints.
	 * @return Average of satisfaction degrees.
	 */ averageSatisfactionDegree() {
        let ave = 0;
        for (const c1 of this._cons)ave += c1.satisfactionDegree();
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
var $2101e22eb3ae726f$exports = {};
$parcel$export($2101e22eb3ae726f$exports, "CrispProblem", function() {
    return $2101e22eb3ae726f$export$2d7b2a6964dca148;
});
/**
 * The class represents a crisp constraint satisfaction problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $2101e22eb3ae726f$export$2d7b2a6964dca148 extends $b3946af8d0a4f6b3$export$559d26475d35ac1e {
    /**
	 * Generates a crisp constraint.
	 * @param Array args {
	 *   @type string   'name'      Display name.
	 *   @type Array    'variables' Variables.
	 *   @type Relation 'relation'  A relation.
	 * }
	 * @return A constraint.
	 */ createConstraint(args) {
        if (args.relation instanceof $a3e6c3477395ea27$export$3b3c4a6f6988f9e8) throw new Error();
        return super.createConstraint(args);
    }
    /**
	 * Returns whether the problem is a fuzzy constraint satisfaction problem, i.e., whether it contains fuzzy constraints.
	 * @return Always returns false.
	 */ isFuzzy() {
        return false;
    }
    /**
	 * Returns the rate of constraints that are satisfied out of all constraints.
	 * @return Rate of satisfied constraints.
	 */ satisfiedConstraintRate() {
        return this.satisfiedConstraintSize() / this._cons.length;
    }
    /**
	 * Returns the number of satisfied constraints.
	 * Undefined constraints are ignored.
	 * @return Number of satisfied constraints.
	 */ satisfiedConstraintSize() {
        let count = 0;
        for (const c1 of this._cons)if (c1.isSatisfied() === 1) ++count;
        return count;
    }
    /**
	 * Returns a list of violating constraints.
	 * Undefined constraints are ignored.
	 * @return Array of constraints.
	 */ violatingConstraints() {
        const cs = [];
        for (const c1 of this._cons)if (c1.isSatisfied() === 0) cs.push(c1);
        return cs;
    }
    /**
	 * Returns the number of violating constraints.
	 * Undefined constraints are ignored.
	 * @return Number of violating constraints.
	 */ violatingConstraintSize() {
        let count = 0;
        for (const c1 of this._cons)if (c1.isSatisfied() === 0) ++count;
        return count;
    }
}
var $34d613011f471732$exports = {};
$parcel$export($34d613011f471732$exports, "ObservableVariable", function() {
    return $34d613011f471732$export$a14c1bd8f74377e;
});
/**
 * Class that represents an observable variable.
 *
 * @author Takuto Yanagida
 * @version 2023-04-18
 */ class $34d613011f471732$export$a14c1bd8f74377e extends $d579165ed6156fef$export$c867a5c9595a1350 {
    #observer;
    // Called only from Problem.
    constructor(owner, d, observer){
        super(owner, d);
        this.#observer = observer;
    }
    /**
	 * Assign a value.
	 * @param value Value.
	 */ assign(value) {
        super.assign(value);
        if (this.#observer) this.#observer(this, value);
    }
}
var $156a3c65876fbe62$exports = {};
$parcel$export($156a3c65876fbe62$exports, "FuzzyTabledRelation", function() {
    return $156a3c65876fbe62$export$9af92f8a5a1bfd9d;
});
/**
 * This class represents fuzzy relationships by table.
 *
 * @author Takuto YANAGIDA
 * @version 2023-03-26
 */ class $156a3c65876fbe62$export$9af92f8a5a1bfd9d extends $a3e6c3477395ea27$export$3b3c4a6f6988f9e8 {
    #elms;
    #doms;
    #mul;
    constructor(elms, doms){
        this.#elms = [
            ...elms
        ];
        this.#doms = [
            ...doms
        ];
        this.#mul = new Array(doms.length);
        let m = 1;
        for(let i = this.#mul.length - 1; i >= 0; --i){
            this.#mul[i] = m;
            m *= doms[i].size();
        }
    }
    /**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vals Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */ satisfactionDegree(...vals) {
        if (this.#mul.length !== vals.length) throw new Exception();
        let index = 0;
        for(let i = 0; i < this.#mul.length; ++i)index += this.#mul[i] * this.#doms[i].indexOf(vals[i]);
        return this.#elms[index];
    }
}
var $1f9eaa8675325d70$exports = {};
$parcel$export($1f9eaa8675325d70$exports, "FuzzyRelationFunction", function() {
    return $1f9eaa8675325d70$export$292ff2b1fb710ade;
});
/**
 * Fuzzy relations defined by functions.
 *
 * @author Takuto Yanagida
 * @version 2023-04-04
 */ class $1f9eaa8675325d70$export$292ff2b1fb710ade extends $a3e6c3477395ea27$export$3b3c4a6f6988f9e8 {
    #fn;
    constructor(fn){
        super();
        this.#fn = fn;
    }
    /**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vals Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */ satisfactionDegree(...vals) {
        return this.#fn(...vals);
    }
}
var $48d470acfc59c60d$exports = {};
$parcel$export($48d470acfc59c60d$exports, "CrispRelation", function() {
    return $48d470acfc59c60d$export$182ea39d269dda05;
});
/**
 * The class represents crisp relationships between variables.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */ class $48d470acfc59c60d$export$182ea39d269dda05 extends $3ad6598cfee2c4f1$export$b57c6722681faed7 {
    /**
	 * Gets whether or not the relation is satisfied in this crisp relation.
	 * @param vals Values of each variable
	 * @return Whether or not it is satisfied.
	 */ isSatisfied(...vals) {
        throw new Exception();
    }
    /**
	 * Returns a view as a fuzzy relation.
	 * @return A fuzzy relation.
	 */ asFuzzyRelation() {
        return new FuzzyRelationView(this);
    }
}
var $f89acf0bacbb6f88$exports = {};
$parcel$export($f89acf0bacbb6f88$exports, "CrispTabledRelation", function() {
    return $f89acf0bacbb6f88$export$14031e4758dfc3cf;
});
/**
 * This class represents crisp relationships by table.
 *
 * @author Takuto YANAGIDA
 * @version 2023-03-26
 */ class $f89acf0bacbb6f88$export$14031e4758dfc3cf extends $48d470acfc59c60d$export$182ea39d269dda05 {
    #elms;
    #doms;
    #mul;
    constructor(elms, doms){
        this.#elms = [
            ...elms
        ];
        this.#doms = [
            ...doms
        ];
        this.#mul = new Array(doms.length);
        let m = 1;
        for(let i = this.#mul.length - 1; i >= 0; --i){
            this.#mul[i] = m;
            m *= doms[i].size();
        }
    }
    /**
	 * Gets whether or not the relation is satisfied in this crisp relation.
	 * @param vals Values of each variable
	 * @return Whether or not it is satisfied.
	 */ isSatisfied(...vals) {
        if (this.#mul.length !== vals.length) throw new Exception();
        let index = 0;
        for(let i = 0; i < this.#mul.length; ++i)index += this.#mul[i] * this.#doms[i].indexOf(vals[i]);
        return this.#elms[index];
    }
}
var $566faa83320be882$exports = {};
$parcel$export($566faa83320be882$exports, "CrispRelationFunction", function() {
    return $566faa83320be882$export$a1cc6d3c2a0259e4;
});
/**
 * Crisp relations defined by functions.
 *
 * @author Takuto Yanagida
 * @version 2023-04-04
 */ class $566faa83320be882$export$a1cc6d3c2a0259e4 extends $48d470acfc59c60d$export$182ea39d269dda05 {
    #fn;
    constructor(fn){
        super();
        this.#fn = fn;
    }
    /**
	 * Gets whether or not the relation is satisfied in this crisp relation.
	 * @param vals Values of each variable
	 * @return Whether or not it is satisfied.
	 */ isSatisfied(...vals) {
        return this.#fn(...vals);
    }
}
var $1a2fe3a3e431eeba$exports = {};
$parcel$export($1a2fe3a3e431eeba$exports, "CrispRelationView", function() {
    return $1a2fe3a3e431eeba$export$f47c6ef1c1dceb7d;
});
$parcel$export($1a2fe3a3e431eeba$exports, "FuzzyRelationView", function() {
    return $1a2fe3a3e431eeba$export$105e23542a0b280f;
});
/**
 * View of relations.
 *
 * @author Takuto Yanagida
 * @version 2023-04-12
 */ class $1a2fe3a3e431eeba$export$f47c6ef1c1dceb7d extends $48d470acfc59c60d$export$182ea39d269dda05 {
    constructor(that){
        this.that = that;
    }
    isSatisfied(...vals) {
        return this.that.satisfactionDegree(vals) === 1;
    }
}
class $1a2fe3a3e431eeba$export$105e23542a0b280f extends $a3e6c3477395ea27$export$3b3c4a6f6988f9e8 {
    constructor(that){
        this.that = that;
    }
    satisfactionDegree(...vals) {
        return this.that.isSatisfied(vals) ? 1 : 0;
    }
}
var $c4f5921582438a32$exports = {};
$parcel$export($c4f5921582438a32$exports, "Solver", function() {
    return $c4f5921582438a32$export$cca492cadf45c096;
});
/**
 * The class for solvers for finding solutions to constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $c4f5921582438a32$export$cca492cadf45c096 {
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
var $bc75b5b8eb656b55$exports = {};
$parcel$export($bc75b5b8eb656b55$exports, "SolverFactory", function() {
    return $bc75b5b8eb656b55$export$4e442516b8f577ee;
});
/**
 * Solver factory class.
 *
 * @author Takuto Yanagida
 * @version 2023-04-17
 */ var $753cae771624653d$exports = {};
$parcel$export($753cae771624653d$exports, "ForwardChecking", function() {
    return $753cae771624653d$export$8570b7b487498488;
});
/**
 * This class that implements the forward checking method.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 * Searches for variable assignments that satisfy all constraints and fails if none are found.
 * Each variable must have its own domain because it hides domain elements as branch pruning.
 * Forward checking is also performed for problems with polynomial constraints.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ var $a7e2f7128ad72da7$exports = {};
$parcel$export($a7e2f7128ad72da7$exports, "AssignmentList", function() {
    return $a7e2f7128ad72da7$export$1d4e454bcd46f18f;
});
/**
 * The class represents multiple variables and their assignments.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ var $5c2079e5752e4879$exports = {};
$parcel$export($5c2079e5752e4879$exports, "Assignment", function() {
    return $5c2079e5752e4879$export$e6b39d88cc0d636;
});
/**
 * The class represents a pair of variables and the values to be assigned to them.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */ class $5c2079e5752e4879$export$e6b39d88cc0d636 {
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
class $a7e2f7128ad72da7$export$1d4e454bcd46f18f {
    static fromVariables(vs) {
        const al = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
        al.setVariables(vs);
        return al;
    }
    #as = [];
    constructor(){}
    setProblem(problem) {
        this.#as.length = 0;
        for (const v of problem.variables())this.#as.push(new $5c2079e5752e4879$export$e6b39d88cc0d636({
            variable: v,
            value: v.value()
        }));
    }
    setAssignmentList(al) {
        this.#as.length = 0;
        for (const a of al)this.#as.push(new $5c2079e5752e4879$export$e6b39d88cc0d636({
            variable: a.variable(),
            value: a.value()
        }));
    }
    setVariables(vs) {
        this.#as.length = 0;
        for (const v of vs)this.#as.push(new $5c2079e5752e4879$export$e6b39d88cc0d636({
            variable: v,
            value: v.value()
        }));
    }
    addVariable(variable, value = null) {
        this.#as.push(new $5c2079e5752e4879$export$e6b39d88cc0d636({
            variable: variable,
            value: value
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
var $173b03f492df9c2c$exports = {};
$parcel$export($173b03f492df9c2c$exports, "DomainPruner", function() {
    return $173b03f492df9c2c$export$f307752a90139b0e;
});
/**
 * This class holds the branch pruning states for a domain.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */ class $173b03f492df9c2c$export$f307752a90139b0e {
    static #UNHIDDEN = -1;
    #hiddenLevels;
    #hiddenSize = 0;
    /**
	 * Generates a class that holds branch pruning states for a domain.
	 * @param size Size of the corresponding domain
	 */ constructor(size){
        this.#hiddenLevels = new Array(size);
        this.#hiddenLevels.fill($173b03f492df9c2c$export$f307752a90139b0e.#UNHIDDEN);
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
        if (this.#hiddenLevels[index] === $173b03f492df9c2c$export$f307752a90139b0e.#UNHIDDEN) ++this.#hiddenSize;
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
        return this.#hiddenLevels[index] !== $173b03f492df9c2c$export$f307752a90139b0e.#UNHIDDEN;
    }
    /**
	 * Restores the value that had been erased, by specifying a level.
	 * @param level Level
	 */ reveal(level) {
        for(let i = 0; i < this.#hiddenLevels.length; ++i)if (this.#hiddenLevels[i] === level) {
            this.#hiddenLevels[i] = $173b03f492df9c2c$export$f307752a90139b0e.#UNHIDDEN;
            --this.#hiddenSize;
        }
    }
    /**
	 * Restores all erased values.
	 */ revealAll() {
        this.#hiddenLevels.fill($173b03f492df9c2c$export$f307752a90139b0e.#UNHIDDEN);
        this.#hiddenSize = 0;
    }
}
class $753cae771624653d$export$8570b7b487498488 extends $c4f5921582438a32$export$cca492cadf45c096 {
    #vars;
    #sol = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
    #relCons;
    #useMRV = false;
    #iterCount;
    #endTime;
    /**
	 * Generates a solver given a constraint satisfaction problem.
	 * @param p A problem.
	 */ constructor(p){
        super(p);
        this.#vars = [
            ...this._pro.variables()
        ];
        for (const v of this.#vars)v.solverObject = new $173b03f492df9c2c$export$f307752a90139b0e(v.domain().size());
        this.#initializeRelatedConstraintTable();
    }
    name() {
        return "Forward Checking";
    }
    // Initializes a table that caches constraints between two variables.
    #initializeRelatedConstraintTable() {
        const temp = [];
        this.#relCons = [];
        for(let j = 0; j < this.#vars.length; ++j){
            this.#relCons.push(new Array(this.#vars.length));
            for(let i = 0; i < this.#vars.length; ++i)if (i < j) this.#relCons[j][i] = this._pro.constraintsBetween(this.#vars[i], this.#vars[j]);
        }
    }
    // Retrieves an array of constraints from a table that caches constraints between two variables.
    #getConstraintsBetween(i, j) {
        if (i < j) return this.#relCons[j][i];
        return this.#relCons[i][j];
    }
    // Checks for possible assignment to a future variable from the current variable assignment.
    #checkForward(level, currentIndex) {
        for (const v_i of this.#vars){
            if (!v_i.isEmpty()) continue; // If it is a past or present variable.
            const d_i = v_i.domain();
            const dc_i = v_i.solverObject;
            const cs = this.#getConstraintsBetween(currentIndex, v_i.index());
            for (const c1 of cs){
                if (c1.emptyVariableSize() !== 1) continue;
                for(let k = 0, n = d_i.size(); k < n; ++k){
                    if (dc_i.isValueHidden(k)) continue;
                    v_i.assign(d_i.at(k));
                    if (c1.isSatisfied() === 0) dc_i.hide(k, level);
                }
                v_i.clear();
                if (dc_i.isEmpty()) return false; // Failure if the domain of one of the future variables is empty.
            }
        }
        return true;
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
    // Searches for one variable at a time.
    #branch(level1) {
        if (this._iterLimit && this._iterLimit < this.#iterCount++) {
            this._debugOutput("stop: number of iterations has reached the limit");
            return false;
        }
        if (this.#endTime < Date.now()) {
            this._debugOutput("stop: time limit has been reached");
            return false;
        }
        if (level1 === this._pro.variableSize()) {
            this.#sol.setProblem(this._pro);
            return true;
        }
        const vc_index = this.#useMRV ? this.#indexOfVariableWithMRV() : level1;
        const vc = this.#vars[vc_index];
        const d = vc.domain();
        const dc = vc.solverObject;
        for(let i = 0, n = d.size(); i < n; ++i){
            if (dc.isValueHidden(i)) continue;
            vc.assign(d.at(i));
            if (this.#checkForward(level1, vc_index) && this.#branch(level1 + 1)) return true;
            for (const v of this.#vars)v.solverObject.reveal(level1);
        }
        vc.clear();
        return false;
    }
    // Do search.
    exec() {
        this.#endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        this.#iterCount = 0;
        this._pro.clearAllVariables();
        const r = this.#branch(0);
        for (const a of this.#sol){
            a.apply();
            a.variable().solverObject.revealAll();
        }
        return r;
    }
    /**
	 * The settings made by this method are invalid.
	 */ setTargetRate() {
    // Do nothing.
    }
    /**
	 * Specify whether to use the minimum-remaining-values (MRV) heuristic.
	 * Use of MRV may increase processing time for some problems.
	 * Default is false.
	 * @param flag Use MRV if true.
	 */ setUsingMinimumRemainingValuesHeuristics(flag) {
        this.#useMRV = flag;
    }
}
var $5da71a10526e78a7$exports = {};
$parcel$export($5da71a10526e78a7$exports, "MaxForwardChecking", function() {
    return $5da71a10526e78a7$export$2a32484f7cb0d846;
});
/**
 * This class that implements the forward checking method.
 * Find the solution to the problem as the maximum CSP.
 * Each variable must have its own domain because it hides domain elements as branch pruning.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $5da71a10526e78a7$export$2a32484f7cb0d846 extends $c4f5921582438a32$export$cca492cadf45c096 {
    #vars;
    #sol = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
    #maxVioCount;
    #vioCount;
    #checkedCons = new Set();
    #cons = [];
    #iterCount;
    #endTime;
    constructor(p){
        super(p);
        this.#vars = [
            ...this._pro.variables()
        ];
        for (const v of this.#vars)v.solverObject = new $173b03f492df9c2c$export$f307752a90139b0e(v.domain().size());
        this.#maxVioCount = this._pro.constraintSize();
    }
    name() {
        return "Forward Checking for Max CSPs";
    }
    #branch(level2, vioCount) {
        if (this._iterLimit && this._iterLimit < this.#iterCount++) return false; // Failure if repeated a specified number.
        if (this.#endTime < Date.now()) return false; // Failure if time limit is exceeded.
        if (level2 === this._pro.variableSize()) {
            const vcs = this._pro.violatingConstraintSize();
            if (vcs < this.#maxVioCount) {
                this.#maxVioCount = vcs;
                this.#sol.setProblem(this._pro);
                this._debugOutput(`   refreshed ${this.#maxVioCount}`);
                if ((this._targetDeg ?? 1) <= this._pro.satisfiedConstraintRate()) return true;
            }
            return false;
        }
        const vc = this.#vars[level2];
        const dom = vc.domain();
        const dc = vc.solverObject;
        for(let i = 0; i < dom.size(); ++i){
            if (dc.isValueHidden(i)) continue;
            vc.assign(dom.at(i));
            this.#vioCount = vioCount + this.#getAdditionalViolationCount(level2, vc); // for max begin
            if (this.#vioCount > this.#maxVioCount) continue; // for max end
            if (this.#checkForward(level2) && this.#branch(level2 + 1, this.#vioCount)) return true;
            for (const v of this.#vars)v.solverObject.reveal(level2);
        }
        vc.clear();
        return false;
    }
    // Checks for possible assignment to a future variable from the current variable assignment.
    #checkForward(level11) {
        const vc = this.#vars[level11];
        for(let i = level11 + 1; i < this.#vars.length; ++i){
            const future = this.#vars[i];
            this.#cons = this._pro.constraintsBetween(vc, future);
            for (const c1 of this.#cons){
                if (c1.emptyVariableSize() !== 1) continue;
                if (this.#revise(future, c1, level11)) {
                    if (future.solverObject.isEmpty()) return false; // Failure if the domain of one of the future variables is empty.
                }
            }
        }
        return true;
    }
    // Find the number of constraint violations that have increased due to the current value of the variable vc.
    #getAdditionalViolationCount(level21, vc) {
        let avc = 0;
        this.#checkedCons.clear(); // Reuse.
        for(let i = 0; i < level21; ++i){
            this.#cons = this._pro.constraintsBetween(vc, this.#vars[i]);
            for (const c1 of this.#cons){
                if (this.#checkedCons.has(c1)) continue; // Because of the possibility of duplication in polynomial constraints
                if (c1.isSatisfied() === 0) ++avc; // Neither satisfied nor undefined.
                this.#checkedCons.add(c1);
            }
        }
        return avc;
    }
    // Remove values from the domain of v1 that do not correspond to v2. That is, match v1 with v2.
    #revise(v1, c1, level3) {
        let deleted = false;
        const dom = v1.domain();
        const dc = v1.solverObject;
        for(let i = 0; i < dom.size(); ++i){
            if (dc.isValueHidden(i)) continue;
            v1.assign(dom.at(i));
            if (c1.isSatisfied() === 0 && this.#vioCount + 1 > this.#maxVioCount) {
                dc.hide(i, level3);
                deleted = true;
            }
        }
        return deleted;
    }
    exec() {
        this.#endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        this.#iterCount = 0;
        this._pro.clearAllVariables();
        const r = this.#branch(0, 0);
        if (r) this._debugOutput("stop: current degree is above the target");
        else {
            if (this._iterLimit && this._iterLimit < this.#iterCount) this._debugOutput("stop: number of iterations has reached the limit");
            if (this.#endTime < Date.now()) this._debugOutput("stop: time limit has been reached");
        }
        for (const a of this.#sol){
            a.apply();
            a.variable().solverObject.revealAll();
        }
        return r;
    }
}
var $62da18818fc7efc1$exports = {};
$parcel$export($62da18818fc7efc1$exports, "LocalChanges", function() {
    return $62da18818fc7efc1$export$8153937ab18ca581;
});
/**
 * Class implements the local changes method.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $62da18818fc7efc1$export$8153937ab18ca581 extends $c4f5921582438a32$export$cca492cadf45c096 {
    static #setPlusSet(s1, s2) {
        const sn = new Set(s1);
        for (const v of s2)sn.add(v);
        return sn;
    }
    static #setMinusSet(s11, s21) {
        const sn = new Set(s11);
        for (const v of s21)sn.delete(v);
        return sn;
    }
    static #setPlusElement(s, e) {
        const sn = new Set(s);
        sn.add(e);
        return sn;
    }
    static #setMinusElement(s3, e1) {
        const sn = new Set(s3);
        sn.delete(e1);
        return sn;
    }
    #iterCount;
    #endTime;
    #globalReturn;
    constructor(p, unassignAll = false){
        super(p);
        if (unassignAll) this._pro.clearAllVariables();
    }
    name() {
        return "Local Changes";
    }
    #createNewV3(V1_V2, v, val) {
        const newV3 = new Set();
        const cs = new Set();
        for (const va of V1_V2){
            const temp = this._pro.constraintsBetween(v, va);
            for (const c1 of temp)cs.add(c1);
        }
        const origVal = v.value(); // Save the value.
        v.assign(val);
        for (const c1 of cs){
            if (c1.isSatisfied() === 0) for (const vi of c1)newV3.add(vi);
        }
        v.assign(origVal); // Restore the value.
        newV3.delete(v);
        return newV3;
    }
    #isConsistent(A, v11, val1) {
        const cs = new Set();
        for (const va of A){
            const temp = this._pro.constraintsBetween(v11, va);
            for (const c1 of temp)cs.add(c1);
        }
        const origVal = v11.value(); // Save the value.
        v11.assign(val1);
        for (const c1 of cs)if (c1.isSatisfied() === 0) {
            v11.assign(origVal); // Restore the value.
            return false;
        }
        v11.assign(origVal); // Restore the value.
        return true;
    }
    #lcValue(V1, V2, v2, val2) {
        if (!this.#isConsistent(V1, v2, val2)) return false;
        const V1_V2 = $62da18818fc7efc1$export$8153937ab18ca581.#setPlusSet(V1, V2);
        if (this.#isConsistent(V1_V2, v2, val2)) return true;
        const V3 = this.#createNewV3(V1_V2, v2, val2);
        const T = $62da18818fc7efc1$export$8153937ab18ca581.#setMinusSet(V1_V2, V3);
        if (!this.#isConsistent(T, v2, val2)) this._debugOutput("bug");
        for (const vv of V3)vv.clear();
        V1 = $62da18818fc7efc1$export$8153937ab18ca581.#setPlusElement(V1, v2);
        V2 = $62da18818fc7efc1$export$8153937ab18ca581.#setMinusSet(V2, V3);
        return this.#lcVariables(V1, V2, V3);
    }
    #lcVariable(V11, V21, v3, d) {
        if (d.size === 0) return false;
        const val = d.values().next().value;
        const al = $a7e2f7128ad72da7$export$1d4e454bcd46f18f.fromVariables(V21);
        v3.assign(val);
        const ret = this.#lcValue(V11, V21, v3, val);
        if (ret || this.#globalReturn) return ret;
        v3.clear();
        al.apply();
        return this.#lcVariable(V11, V21, v3, $62da18818fc7efc1$export$8153937ab18ca581.#setMinusElement(d, val));
    }
    #lcVariables(V12, V22, V3) {
        this._debugOutput(`V1 ${V12.size}, V2' ${V22.size}, V3' ${V3.size}`);
        if ((this._targetDeg ?? 1) <= this._pro.satisfiedConstraintRate()) {
            this._debugOutput("stop: current degree is above the target");
            this.#globalReturn = true;
            return true;
        }
        if (this._iterLimit && this._iterLimit < this.#iterCount++) {
            this._debugOutput("stop: number of iterations has reached the limit");
            this.#globalReturn = true;
            return false;
        }
        if (this.#endTime < Date.now()) {
            this._debugOutput("stop: time limit has been reached");
            this.#globalReturn = true;
            return false;
        }
        if (V3.size === 0) return true;
        const v = V3.values().next().value;
        const d = new Set();
        for (const val of v.domain())d.add(val);
        const ret = this.#lcVariable(V12, V22, v, d);
        if (!ret || this.#globalReturn) return ret;
        V22 = $62da18818fc7efc1$export$8153937ab18ca581.#setPlusElement(V22, v);
        V3 = $62da18818fc7efc1$export$8153937ab18ca581.#setMinusElement(V3, v);
        return this.#lcVariables(V12, V22, V3);
    }
    exec() {
        this.#endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        this.#iterCount = 0;
        this.#globalReturn = false;
        if (this._pro.emptyVariableSize() === 0) this._pro.clearAllVariables();
        const notFixed = new Set();
        const unassigned = new Set();
        for (const v of this._pro.variables())(!v.isEmpty() ? notFixed : unassigned).add(v);
        return this.#lcVariables(new Set(), notFixed, unassigned);
    }
}
var $7f4ecc5acb283d86$exports = {};
$parcel$export($7f4ecc5acb283d86$exports, "LocalChangesEx", function() {
    return $7f4ecc5acb283d86$export$e577c7182ffc977b;
});
/**
 * Class implements the local changes method.
 * The implementation is optimized by converting recursive calls to loops.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $7f4ecc5acb283d86$export$e577c7182ffc977b extends $c4f5921582438a32$export$cca492cadf45c096 {
    static #setPlusSet(s12, s22) {
        const sn = new Set(s12);
        for (const v of s22)sn.add(v);
        return sn;
    }
    static #setMinusSet(s111, s211) {
        const sn = new Set(s111);
        for (const v of s211)sn.delete(v);
        return sn;
    }
    static #setPlusElement(s4, e2) {
        const sn = new Set(s4);
        sn.add(e2);
        return sn;
    }
    static #setMinusElement(s31, e11) {
        const sn = new Set(s31);
        sn.delete(e11);
        return sn;
    }
    #iterCount;
    #endTime;
    #globalReturn;
    constructor(p, unassignAll = false){
        super(p);
        if (unassignAll) this._pro.clearAllVariables();
    }
    name() {
        return "Local Changes Ex";
    }
    #createNewV3(V1_V21, v4, val3) {
        const newV3 = new Set();
        const cs = new Set();
        for (const va of V1_V21){
            const temp = this._pro.constraintsBetween(v4, va);
            for (const c1 of temp)cs.add(c1);
        }
        const origVal = v4.value(); // Save the value.
        v4.assign(val3);
        for (const c1 of cs){
            if (c1.isSatisfied() === 0) for (const vi of c1)newV3.add(vi);
        }
        v4.assign(origVal); // Restore the value.
        newV3.delete(v4);
        return newV3;
    }
    #isConsistent(A1, v12, val11) {
        const cs = new Set();
        for (const va of A1){
            const temp = this._pro.constraintsBetween(v12, va);
            for (const c1 of temp)cs.add(c1);
        }
        const origVal = v12.value(); // Save the value.
        v12.assign(val11);
        for (const c1 of cs)if (c1.isSatisfied() === 0) {
            v12.assign(origVal); // Restore the value.
            return false;
        }
        v12.assign(origVal); // Restore the value.
        return true;
    }
    #lcValue(V13, V23, v21) {
        if (!this.#isConsistent(V13, v21, v21.value())) return false;
        const V1_V2 = $7f4ecc5acb283d86$export$e577c7182ffc977b.#setPlusSet(V13, V23);
        if (this.#isConsistent(V1_V2, v21, v21.value())) return true;
        const V3 = this.#createNewV3(V1_V2, v21, v21.value());
        V23 = $7f4ecc5acb283d86$export$e577c7182ffc977b.#setMinusSet(V23, V3);
        V13 = $7f4ecc5acb283d86$export$e577c7182ffc977b.#setPlusElement(V13, v21);
        return this.#lcVariables(V13, V23, V3);
    }
    #lcVariable(V111, V211, v31) {
        for (const val of v31.domain()){
            const s = $a7e2f7128ad72da7$export$1d4e454bcd46f18f.fromVariables(V211);
            v31.assign(val);
            const ret = this.#lcValue(V111, V211, v31);
            if (ret || this.#globalReturn) return ret;
            v31.clear();
            s.apply();
        }
        return false;
    }
    #lcVariables(V121, V221, V31) {
        V221 = new Set(V221); // Clone
        V31 = new Set(V31); // Clone
        while(true){
            this._debugOutput(`V1 ${V121.size}, V2' ${V221.size}, V3' ${V31.size}`);
            if ((this._targetDeg ?? 1) <= this._pro.satisfiedConstraintRate()) {
                this._debugOutput("stop: current degree is above the target");
                this.#globalReturn = true;
                return true;
            }
            if (this._iterLimit && this._iterLimit < this.#iterCount++) {
                this._debugOutput("stop: number of iterations has reached the limit");
                this.#globalReturn = true;
                return false;
            }
            if (this.#endTime < Date.now()) {
                this._debugOutput("stop: time limit has been reached");
                this.#globalReturn = true;
                return false;
            }
            if (V31.size === 0) return true;
            const v = V31.values().next().value;
            const ret = this.#lcVariable(V121, V221, v);
            if (!ret || this.#globalReturn) return ret;
            V221.add(v);
            V31.delete(v);
        }
    }
    exec() {
        this.#endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        this.#iterCount = 0;
        this.#globalReturn = false;
        if (this._pro.emptyVariableSize() === 0) this._pro.clearAllVariables();
        const notFixed = new Set();
        const unassigned = new Set();
        for (const v of this._pro.variables())(!v.isEmpty() ? notFixed : unassigned).add(v);
        return this.#lcVariables(new Set(), notFixed, unassigned);
    }
}
var $2c8e786ab4db97cd$exports = {};
$parcel$export($2c8e786ab4db97cd$exports, "Breakout", function() {
    return $2c8e786ab4db97cd$export$44de86bc32e07644;
});
/**
 * Class implements a solver using the breakout method.
 * Solves a problem as a maximum CSP.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $2c8e786ab4db97cd$export$44de86bc32e07644 extends $c4f5921582438a32$export$cca492cadf45c096 {
    #weights;
    #isRandom = true;
    constructor(p){
        super(p);
        this.#weights = new Array(this._pro.constraintSize());
        this.#weights.fill(1);
    }
    name() {
        return "Breakout";
    }
    #findCandidates(vioVars, canList) {
        let maxDiff = 0;
        for (const v of vioVars){
            const v_val = v.value(); // Save the value
            let nowVio = 0;
            for (const c1 of v)nowVio += (1 - c1.isSatisfied()) * this.#weights[c1.index()];
            out: for (const d of v.domain()){
                if (v_val === d) continue;
                v.assign(d);
                let diff = nowVio;
                for (const c1 of v){
                    diff -= (1 - c1.isSatisfied()) * this.#weights[c1.index()];
                    // If the improvement is less than the previous improvement, try the next variable.
                    if (diff < maxDiff) continue out;
                }
                if (diff > maxDiff) {
                    maxDiff = diff;
                    canList.clear();
                    canList.addVariable(v, d);
                } else if (maxDiff !== 0) canList.addVariable(v, d);
            }
            v.assign(v_val); // Restore the value.
        }
    }
    #listViolatingVariables(vioCons) {
        const vvs = new Set();
        for (const c1 of vioCons)for (const v of c1)vvs.add(v);
        return Array.from(vvs);
    }
    exec() {
        const endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        let iterCount = 0;
        for (const v of this._pro.variables())if (v.isEmpty()) v.assign(v.domain().at(0));
        const canList = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
        while(true){
            const vc = this._pro.violatingConstraints();
            if ((this._targetDeg ?? 1) <= this._pro.satisfiedConstraintRate()) {
                this._debugOutput("stop: current degree is above the target");
                return true;
            }
            if (this._iterLimit && this._iterLimit < iterCount++) {
                this._debugOutput("stop: number of iterations has reached the limit");
                return false;
            }
            if (endTime < Date.now()) {
                this._debugOutput("stop: time limit has been reached");
                return false;
            }
            this._debugOutput(vc.length + " violations");
            this.#findCandidates(this.#listViolatingVariables(vc), canList);
            if (0 < canList.size()) {
                const e = this.#isRandom ? canList.random() : canList.at(0);
                e.apply();
                canList.clear();
                this._debugOutput("	" + e);
            } else {
                for (const c1 of vc)this.#weights[c1.index()] += 1;
                this._debugOutput("breakout");
            }
        }
    }
    /**
	 * Sets the randomness of the algorithm.
	 * Enabling randomness reduces the risk of local solutions, but makes the solution unrepeatable.
	 * @param flag Whether the randomness is enabled.
	 */ setRandomness(flag) {
        this.#isRandom = flag;
    }
}
var $0cb6792a4a1b293a$exports = {};
$parcel$export($0cb6792a4a1b293a$exports, "GENET", function() {
    return $0cb6792a4a1b293a$export$d94917317b4f74cb;
});
/**
 * This class implements GENET.
 * CSP (but only Binary CSP) is supported.
 * Find the solution to the problem as the maximum CSP.
 *
 * @author Takuto Yanagida
 * @version 2023-04-17
 */ class $0cb6792a4a1b293a$export$d94917317b4f74cb extends $c4f5921582438a32$export$cca492cadf45c096 {
    static nextInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    #clusters = [];
    #connections;
    constructor(p){
        super(p);
    }
    name() {
        return "GENET";
    }
    #createNetwork() {
        this._debugOutput("network creation start");
        const cons = [];
        for (const v of this._pro.variables()){
            if (v.domain().size() === 0) return false;
            this.#clusters.push(new $0cb6792a4a1b293a$export$d94917317b4f74cb.Cluster(v));
        }
        for (const c1 of this._pro.constraints())if (c1.size() === 1) {
            const v = c1.at(0);
            const cl = this.#clusters[c1.at(0).index()];
            for(let i = 0; i < cl.size(); ++i){
                const origVal = v.value(); // Save the value.
                v.assign(cl.get(i)._value);
                if (c1.isSatisfied() === 0) cons.push(new $0cb6792a4a1b293a$export$d94917317b4f74cb.Connection(cl.get(i)));
                v.assign(origVal); // Restore the value.
            }
        } else {
            const v1 = c1.at(0);
            const v2 = c1.at(1);
            const cl_f = this.#clusters[c1.at(0).index()];
            const cl_s = this.#clusters[c1.at(1).index()];
            for(let i = 0; i < cl_f.size(); ++i){
                const origVal1 = v1.value(); // Save the value.
                v1.assign(cl_f.get(i)._value);
                for(let j = 0; j < cl_s.size(); ++j){
                    const origVal2 = v2.value(); // Save the value.
                    v2.assign(cl_s.get(j)._value);
                    if (c1.isSatisfied() === 0) cons.push(new $0cb6792a4a1b293a$export$d94917317b4f74cb.Connection(cl_f.get(i), cl_s.get(j)));
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
            const j = $0cb6792a4a1b293a$export$d94917317b4f74cb.nextInt(i);
            const temp = is[i - 1];
            is[i - 1] = is[j];
            is[j] = temp;
        }
        return is;
    }
    exec() {
        if (!this.#createNetwork()) throw new Exception();
        const endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        let iterCount = 0;
        const sol = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
        const order = [];
        for(let i = 0; i < this.#clusters.length; ++i)order.push(i);
        let cur = this._pro.satisfiedConstraintRate();
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
            if (!modified) for (const con of this.#connections)con.refreshWeight(); // Update weights for all connections
            else {
                for (const clu of this.#clusters)clu.applyToVariable(); // Apply to variable
                const d = this._pro.satisfiedConstraintRate();
                if (cur < d) {
                    cur = d;
                    this._debugOutput(`satisfied constraint rate: ${d}`);
                    sol.setProblem(this._pro);
                    if (this.foundSolution(sol, d)) {
                        success = true;
                        break;
                    }
                    if (this._targetDeg ?? 1 <= cur) {
                        this._debugOutput("stop: current degree is above the target");
                        success = true;
                        break;
                    }
                }
            }
        }
        sol.apply(); // Despite the failures, the best assignment so far is applied for now.
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
    $0cb6792a4a1b293a$export$d94917317b4f74cb.Cluster = Cluster;
    class Connection {
        #first;
        #second;
        _weight;
        // Order of neurons must be the same as the order of variables that the constraint has.
        constructor(first, second = null){
            this._weight = -1;
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
            this._weight += -1;
        }
    }
    $0cb6792a4a1b293a$export$d94917317b4f74cb.Connection = Connection;
    class Neuron {
        #conTemp = [];
        #connections;
        _value;
        _isActive = false;
        constructor(value){
            this._value = value;
        }
        addConnection(c1) {
            this.#conTemp.push(c1);
        }
        lockConnections() {
            this.#connections = [
                ...this.#conTemp
            ];
            this.#conTemp = null; // No longer being used.
        }
        getInput() {
            let ret = 0;
            for (const c1 of this.#connections){
                const n = c1.getNeuron(this); // If n is null, then the unary constraint.
                ret += c1._weight * (n === null || n._isActive ? 1 : 0);
            }
            return ret;
        }
    }
    $0cb6792a4a1b293a$export$d94917317b4f74cb.Neuron = Neuron;
})();
var $621e09da02c15793$exports = {};
$parcel$export($621e09da02c15793$exports, "CrispSRS3", function() {
    return $621e09da02c15793$export$193930056f923a8;
});
/**
 * This class implements the SRS algorithm for crisp CSP.
 * The given crisp CSP is treated as the maximum CSP.
 * Similar to SRS 3, the repair algorithm searches for an assignment that satisfies itself without reducing the number of satisfactions of its neighbors.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $621e09da02c15793$export$193930056f923a8 extends $c4f5921582438a32$export$cca492cadf45c096 {
    #closedList = new Set();
    #openList = new Set();
    #nodes = [];
    #neighborConstraints = [];
    #isRandom = true;
    constructor(p){
        super(p);
        for (const c1 of this._pro.constraints()){
            this.#nodes.push(new $621e09da02c15793$export$193930056f923a8.TreeNode(c1));
            this.#neighborConstraints.push(null);
        }
    }
    name() {
        return "SRS 3 for Crisp CSPs";
    }
    #getNeighborConstraints(c2) {
        const index = c2.index();
        if (this.#neighborConstraints[index] === null) this.#neighborConstraints[index] = c2.neighbors();
        return this.#neighborConstraints[index];
    }
    #repair(c0) {
        this._debugOutput("repair");
        const canList = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
        let maxDiff = 0;
        for (const v of c0){
            const v_val = v.value(); // Save the value
            let nowVio = 0;
            for (const c1 of v)nowVio += 1 - c1.isSatisfied();
            out: for (const d of v.domain()){
                if (v_val === d) continue;
                v.assign(d);
                if (c0.isSatisfied() !== 1) continue; // Assuming c0 improvement
                let diff = nowVio;
                for (const n of v){
                    diff -= 1 - n.isSatisfied();
                    if (diff < maxDiff) continue out; // If the improvement is less than the previous improvement, try the next variable.
                }
                if (diff > maxDiff) {
                    maxDiff = diff;
                    canList.clear();
                    canList.addVariable(v, d);
                } else if (maxDiff !== 0) canList.addVariable(v, d);
            }
            v.assign(v_val); // Restore the value
        }
        if (canList.size() > 0) {
            const e = this.#isRandom ? canList.random() : canList.at(0);
            e.apply();
            this._debugOutput("	" + e);
            return true;
        }
        return false;
    }
    #shrink(node, c_stars) {
        const temp = [];
        let cur = node;
        while(true){
            cur = cur.parent();
            temp.length = 0;
            cur.getDescendants(temp);
            cur.clear();
            for (const n of c_stars){
                this.#openList.delete(n);
                this.#closedList.delete(n);
            }
            if (c_stars.delete(cur)) break;
            this.#openList.add(cur);
            if (cur.parent() !== null && !this.#repair(cur.parent().getObject())) break;
        }
    }
    #spread(node1) {
        this._debugOutput("spread");
        this.#closedList.add(node1);
        for (const c1 of this.#getNeighborConstraints(node1.getObject())){
            const tnc = this.#nodes[c1.index()];
            if (!this.#closedList.has(tnc) && !this.#openList.has(tnc)) {
                tnc.clear(); // Because of its reuse, it may have had children when it was used before.
                node1.add(tnc);
                this.#openList.add(tnc);
            }
        }
    }
    #srs(c_stars1) {
        this._debugOutput("srs");
        const endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        let iterCount = 0;
        this.#closedList.clear();
        this.#openList.clear();
        for (const n of c_stars1)this.#openList.add(n);
        while(c_stars1.size && this.#openList.size){
            if ((this._targetDeg ?? 1) <= this._pro.satisfiedConstraintRate()) {
                this._debugOutput("stop: current degree is above the target");
                return true;
            }
            if (this._iterLimit && this._iterLimit < iterCount++) {
                this._debugOutput("stop: number of iterations has reached the limit");
                return false;
            }
            if (endTime < Date.now()) {
                this._debugOutput("stop: time limit has been reached");
                return false;
            }
            const node = this.#openList.values().next().value;
            this.#openList.delete(node);
            if (this.#repair(node.getObject())) {
                if (!c_stars1.delete(node)) {
                    if (node.parent() !== null && this.#repair(node.parent().getObject())) this.#shrink(node, c_stars1);
                    else this.#spread(node);
                }
            } else this.#spread(node);
        }
        return false;
    }
    exec() {
        const vcs = this._pro.violatingConstraints();
        const c_stars = new Set();
        for (const c1 of vcs){
            const tnc = this.#nodes[c1.index()];
            c_stars.add(tnc);
        }
        if (this.#srs(c_stars)) return true;
        return c_stars.length === 0;
    }
    /**
	 * Sets the randomness of the algorithm.
	 * Enabling randomness reduces the risk of falling into a local solution, but makes the solution unrepeatable.
	 * @param flag If true, randomness is enabled.
	 */ setRandomness(flag) {
        this.#isRandom = flag;
    }
}
{
    class TreeNode {
        #children = [];
        #parent;
        #obj;
        constructor(obj){
            this.#obj = obj;
        }
        add(tn) {
            tn.#parent = this;
            this.#children.push(tn);
        }
        clear() {
            for (const tn of this.#children)tn.#parent = null;
            this.#children.length = 0;
        }
        getDescendants(tns) {
            tns.push(this);
            for (const tn of this.#children)tn.getDescendants(tns);
        }
        getObject() {
            return this.#obj;
        }
        parent() {
            return this.#parent;
        }
    }
    $621e09da02c15793$export$193930056f923a8.TreeNode = TreeNode;
}var $d149e5ad62c58307$exports = {};
$parcel$export($d149e5ad62c58307$exports, "FuzzyForwardChecking", function() {
    return $d149e5ad62c58307$export$2d94cf9ddb103458;
});
/**
 * This class implements the forward checking method for fuzzy CSP.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 * Each variable must have its own domain because it hides domain elements as branch pruning.
 * Forward checking is also performed for problems with polynomial constraints.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $d149e5ad62c58307$export$2d94cf9ddb103458 extends $c4f5921582438a32$export$cca492cadf45c096 {
    static CONTINUE = 0;
    static TERMINATE = 1;
    #vars;
    #sol = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
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
        for (const c1 of this._pro.constraints())if (c1.size() === 1) temp.push(c1);
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
        for (const c1 of this.#unaryCons){
            const v = c1.at(0);
            const orgVal = v.value(); // Save the value.
            const d = v.domain();
            const dc = v.solverObject;
            for(let i = 0, n = d.size(); i < n; ++i){
                v.assign(d.at(i));
                if (c1.satisfactionDegree() <= this.#solWorstDeg) dc.hide(i, -1); // Here's a branch pruning!
            }
            v.assign(orgVal); // Restore the value.
            if (dc.isEmpty()) return false;
        }
        return true;
    }
    // Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there is one unassigned variable in the scope of the constraint).
    #checkForwardConsistency(level4, vi, c3) {
        const di = vi.domain();
        const dci = vi.solverObject;
        for(let i = 0, n = di.size(); i < n; ++i){
            if (dci.isValueHidden(i)) continue;
            vi.assign(di.at(i));
            if (c3.satisfactionDegree() <= this.#solWorstDeg) dci.hide(i, level4); // Here's a branch pruning!
        }
        vi.clear();
        return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
    }
    // Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there are two unassigned variables in the scope of the constraint).
    #checkForwardConsistency2(level12, vi1, c11) {
        const di = vi1.domain();
        const dci = vi1.solverObject;
        const vj = null;
        for (const v of c11)if (v.isEmpty() && v !== vi1) {
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
                const s = c11.satisfactionDegree();
                if (s > this.#solWorstDeg) continue loop_i; // Tentative assignment to vi was OK -> next tentative assignment.
            }
            dci.hide(i, level12); // It is not a solution when it is 'smaller than or equals'.
        }
        vj.clear();
        vi1.clear();
        return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
    }
    // Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there are three unassigned variables in the scope of the constraint).
    #checkForwardConsistency3(level22, vi2, c21) {
        const di = vi2.domain();
        const dci = vi2.solverObject;
        let vj = null;
        let vk = null;
        for (const v of c21)if (v.isEmpty() && v !== vi2) {
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
                    const s = c21.satisfactionDegree();
                    if (s > this.#solWorstDeg) continue loop_i; // Tentative assignment to vi was OK -> next tentative assignment.
                }
            }
            dci.hide(i, level22); // It is not a solution when it is 'smaller than or equals'.
        }
        vk.clear();
        vj.clear();
        vi2.clear();
        return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
    }
    // In the case of polynomial constraints and when there are four or more unassigned variables, all combinations of assignments of unassigned variables are examined and pruned.
    #checkForwardConsistencyN(level31, vi3, c31, emptySize) {
        const di = vi3.domain();
        const dci = vi3.solverObject;
        const emp = new Array(emptySize - 1);
        let j = 0;
        for (const v of c31)if (v.isEmpty() && v !== vi3) emp[j++] = v;
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
                    const s = c31.satisfactionDegree();
                    if (s > this.#solWorstDeg) continue loop_i; // Tentative assignment to vi was OK -> next tentative assignment.
                }
                for(let k = 0; k < emp.length; ++k){
                    indexes[k] += 1;
                    if (indexes[k] < emp[k].domain().size()) break;
                    indexes[k] = 0;
                    if (k === emp.length - 1) break comLoop;
                }
            }
            dci.hide(i, level31);
        }
        for (const v of emp)v.clear();
        vi3.clear();
        return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
    }
    // Checks for possible assignment to a future variable from the current variable assignment.
    #checkForward(level41, index) {
        for (const v_i of this.#vars){
            if (!v_i.isEmpty()) continue; // If it is a past or present variable.
            const cs = this.#getConstraintsBetween(index, v_i.index());
            for (const c1 of cs){
                const emptySize = c1.emptyVariableSize();
                if (emptySize === 1) {
                    if (!this.#checkForwardConsistency(level41, v_i, c1)) return false;
                } else if (this.#pruneIntensively) {
                    if (emptySize === 2) {
                        if (!this.#checkForwardConsistency2(level41, v_i, c1)) return false;
                    } else if (emptySize === 3) {
                        if (!this.#checkForwardConsistency3(level41, v_i, c1)) return false;
                    } else if (emptySize > 3) {
                        if (!this.#checkForwardConsistencyN(level41, v_i, c1, emptySize)) return false;
                    }
                }
            }
        }
        return true;
    }
    // Checks to see if the current variable assignment makes the degree of the past variable worse than the current worst degree.
    #checkBackwardConsistency(vc1) {
        this.#checkedCons.fill(false); // Reuse.
        for(let i = 0; i < this.#vars.length; ++i){
            const vi = this.#vars[i];
            if (vi === vc1 || vi.isEmpty()) continue; // If it is a future variable or a present variable.
            const cs = this.#getConstraintsBetween(vc1.index(), i);
            for (const c1 of cs){
                if (this.#checkedCons[c1.index()]) continue; // Because of the possibility of duplication in polynomial constraints
                const s = c1.satisfactionDegree();
                if (s !== $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED && s <= this.#solWorstDeg) return false;
                this.#checkedCons[c1.index()] = true;
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
                for (const c1 of cs){
                    const orgVal = vj.value();
                    const dj = vj.domain();
                    const dcj = vj.solverObject;
                    for(let k = 0, n = dj.size(); k < n; ++k){
                        if (dcj.isValueHidden(k)) continue;
                        vj.assign(dj.at(k));
                        if (c1.satisfactionDegree() <= this.#solWorstDeg) dcj.hide(k, i); // Here's a branch pruning!
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
        let bc = $d149e5ad62c58307$export$2d94cf9ddb103458.CONTINUE;
        const vc_index = this.#useMRV ? this.#indexOfVariableWithMRV() : level5;
        const vc = this.#vars[vc_index];
        const d = vc.domain();
        const dc = vc.solverObject;
        this.#sequence[level5] = vc;
        for(let i = 0, n = d.size(); i < n; ++i){
            if (dc.isValueHidden(i)) continue;
            if (this._iterLimit && this._iterLimit < this.#iterCount++ || this.#endTime < Date.now()) {
                bc = $d149e5ad62c58307$export$2d94cf9ddb103458.TERMINATE; // Search terminated due to restrictions.
                break;
            }
            vc.assign(d.at(i));
            for (const v of this.#vars)v.solverObject.reveal(level5);
            if (!this.#checkBackwardConsistency(vc)) continue;
            if (!this.#checkForward(level5, vc_index)) continue;
            const nextLevel = level5 + 1;
            bc = nextLevel === this.#vars.length - 1 ? this.#branchLast(nextLevel) : this.#branch(nextLevel);
            if (bc === $d149e5ad62c58307$export$2d94cf9ddb103458.TERMINATE) break;
        }
        if (bc === $d149e5ad62c58307$export$2d94cf9ddb103458.CONTINUE) for (const v of this.#vars)v.solverObject.reveal(level5);
        vc.clear();
        return bc;
    }
    // Performs search on the last variable.
    #branchLast(level6) {
        let bc = $d149e5ad62c58307$export$2d94cf9ddb103458.CONTINUE;
        const vc = this.#vars[this.#useMRV ? this.#indexOfVariableWithMRV() : level6];
        const d = vc.domain();
        const dc = vc.solverObject;
        this.#sequence[level6] = vc;
        for(let i = 0, n = d.size(); i < n; ++i){
            if (dc.isValueHidden(i)) continue;
            if (this._iterLimit && this._iterLimit < this.#iterCount++ || this.#endTime < Date.now()) {
                bc = $d149e5ad62c58307$export$2d94cf9ddb103458.TERMINATE; // Search terminated due to restrictions.
                break;
            }
            vc.assign(d.at(i));
            const deg = this._pro.worstSatisfactionDegree();
            if (deg > this.#solWorstDeg) {
                this.#solWorstDeg = deg;
                this.#sol.setProblem(this._pro);
                bc = $d149e5ad62c58307$export$2d94cf9ddb103458.TERMINATE;
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
        for (const v of this.#vars)v.solverObject = new $173b03f492df9c2c$export$f307752a90139b0e(v.domain().size()); // Generation of domain pruners.
        this._pro.clearAllVariables();
        if (!this.#pruneUnaryConstraints()) return false; // Since _worstSatisfactionDegree_ has been updated, call this function.
        let success = false;
        while(true){
            const bc = this.#branch(0);
            if (bc === $d149e5ad62c58307$export$2d94cf9ddb103458.TERMINATE) {
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
var $a7583aef89e9a883$exports = {};
$parcel$export($a7583aef89e9a883$exports, "FuzzyForwardCheckingBc", function() {
    return $a7583aef89e9a883$export$532d5536583284b8;
});
/**
 * This class implements the forward checking method for fuzzy CSPs that contain only binary constraints.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $a7583aef89e9a883$export$532d5536583284b8 extends $c4f5921582438a32$export$cca492cadf45c096 {
    static CONTINUE = 0;
    static TERMINATE = 1;
    #vars;
    #sol = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
    #relCons;
    #solWorstDeg = 0;
    #iterCount;
    #endTime;
    #useMRV = false;
    #degInc = 0;
    /**
	 * Generates the solver given a fuzzy constraint satisfaction problem.
	 * @param p A fuzzy problem.
	 * @param worstSatisfactionDegree Worst satisfaction degree.
	 */ constructor(p, worstSatisfactionDegree = null){
        super(p);
        this.#vars = [
            ...this._pro.variables()
        ];
        this.#initializeRelatedConstraintTable();
        this.#solWorstDeg = Math.max(0, p.worstSatisfactionDegree());
        if (worstSatisfactionDegree) this.#solWorstDeg = worstSatisfactionDegree;
    }
    name() {
        return "Forward Checking for Fuzzy CSPs of Binary Constraints";
    }
    foundSolution() {
        return false;
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
    #getConstraintsBetween(vi_index1, vj_index1) {
        if (vi_index1 < vj_index1) return this.#relCons[vj_index1][vi_index1];
        return this.#relCons[vi_index1][vj_index1];
    }
    // Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there is one unassigned variable in the scope of the constraint).
    #checkForwardConsistency(level7, vi4, c4) {
        const di = vi4.domain();
        const dci = vi4.solverObject;
        for(let i = 0, n = di.size(); i < n; ++i){
            if (dci.isValueHidden(i)) continue;
            vi4.assign(di.at(i));
            if (c4.satisfactionDegree() <= this.#solWorstDeg) dci.hide(i, level7); // Here's a branch pruning!
        }
        vi4.clear();
        return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
    }
    // Checks for possible assignment to a future variable from the current variable assignment.
    #checkForward(level13, index1) {
        for (const v_i of this.#vars){
            if (!v_i.isEmpty()) continue; // If it is a past or present variable.
            const cs = this.#getConstraintsBetween(index1, v_i.index());
            for (const c1 of cs)if (c1.size() === 2) {
                if (!this.#checkForwardConsistency(level13, v_i, c1)) return false;
            }
        }
        return true;
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
    #branch(level23) {
        let bc = $a7583aef89e9a883$export$532d5536583284b8.CONTINUE;
        const vc_index = this.#useMRV ? this.#indexOfVariableWithMRV() : level23;
        const vc = this.#vars[vc_index];
        const d = vc.domain();
        const dc = vc.solverObject;
        for(let i = 0, n = d.size(); i < n; ++i){
            if (dc.isValueHidden(i)) continue;
            if (this._iterLimit && this._iterLimit < this.#iterCount++ || this.#endTime < Date.now()) {
                bc = $a7583aef89e9a883$export$532d5536583284b8.TERMINATE; // Search terminated due to restrictions.
                break;
            }
            vc.assign(d.at(i));
            for (const v of this.#vars)v.solverObject.reveal(level23);
            if (!this.#checkForward(level23, vc_index)) continue;
            const nextLevel = level23 + 1;
            bc = nextLevel === this.#vars.length - 1 ? this.#branchLast(nextLevel) : this.#branch(nextLevel);
            if (bc === $a7583aef89e9a883$export$532d5536583284b8.TERMINATE) break;
        }
        if (bc === $a7583aef89e9a883$export$532d5536583284b8.CONTINUE) for (const v of this.#vars)v.solverObject.reveal(level23);
        vc.clear();
        return bc;
    }
    // Performs search on the last variable.
    #branchLast(level32) {
        let bc = $a7583aef89e9a883$export$532d5536583284b8.CONTINUE;
        const vc = this.#vars[this.#useMRV ? this.#indexOfVariableWithMRV() : level32];
        const d = vc.domain();
        const dc = vc.solverObject;
        for(let i = 0, n = d.size(); i < n; ++i){
            if (dc.isValueHidden(i)) continue;
            if (this._iterLimit && this._iterLimit < this.#iterCount++ || this.#endTime < Date.now()) {
                bc = $a7583aef89e9a883$export$532d5536583284b8.TERMINATE; // Search terminated due to restrictions.
                break;
            }
            vc.assign(d.at(i));
            const deg = this._pro.worstSatisfactionDegree();
            if (deg > this.#solWorstDeg) {
                this.#solWorstDeg = deg;
                this.#sol.setProblem(this._pro);
                bc = $a7583aef89e9a883$export$532d5536583284b8.TERMINATE; // Search terminated due to restrictions.
                if (this._targetDeg !== null && this._targetDeg <= this.#solWorstDeg) break;
            }
        }
        vc.clear();
        return bc;
    }
    // Do search.
    exec() {
        this.#endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        this.#iterCount = 0;
        for (const v of this.#vars)v.solverObject = new $173b03f492df9c2c$export$f307752a90139b0e(v.domain().size()); // Generation of domain pruners.
        this._pro.clearAllVariables();
        const sol = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
        let success = false;
        while(true){
            const bc = this.#branch(0);
            if (bc === $a7583aef89e9a883$export$532d5536583284b8.TERMINATE) {
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
            sol.setAssignmentList(this.#sol);
            this.#sol.clear(); // Clear it so that if the solution is not found in the next search, it will be known.
            this._debugOutput(`\tfound a solution: ${this.#solWorstDeg}`);
            if (this.foundSolution(sol, this.#solWorstDeg)) {
                success = true;
                break;
            }
            if (this._targetDeg === null) {
                success = true;
                if (this.#solWorstDeg + this.#degInc > 1) break;
                this.#solWorstDeg += this.#solWorstDeg + this.#degInc > 1 ? 0 : this.#degInc; // Find the next solution within the limit.
            } else if (this._targetDeg <= this.#solWorstDeg) {
                this._debugOutput(`stop: current degree is above the target`);
                success = true;
                break;
            }
            for (const v of this.#vars)v.solverObject.revealAll();
        }
        sol.apply();
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
}
var $8d58e5e35735c7ec$exports = {};
$parcel$export($8d58e5e35735c7ec$exports, "FlexibleLocalChanges", function() {
    return $8d58e5e35735c7ec$export$c15ba88cf158f3d6;
});
/**
 * A class that implements the flexible local changes method.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $8d58e5e35735c7ec$export$c15ba88cf158f3d6 extends $c4f5921582438a32$export$cca492cadf45c096 {
    static #setPlusSet(s13, s23) {
        const sn = new Set(s13);
        for (const v of s23)sn.add(v);
        return sn;
    }
    static #setMinusSet(s112, s212) {
        const sn = new Set(s112);
        for (const v of s212)sn.delete(v);
        return sn;
    }
    static #setPlusElement(s5, e3) {
        const sn = new Set(s5);
        sn.add(e3);
        return sn;
    }
    static #setMinusElement(s32, e12) {
        const sn = new Set(s32);
        sn.delete(e12);
        return sn;
    }
    #lt;
    #lb;
    #iterCount;
    #endTime;
    #globalReturn;
    constructor(p){
        super(p);
        this.#computeHighestAndLowestConsistencyDegree();
    }
    name() {
        return "Flexible Local Changes";
    }
    #choose(x2, cr) {
        const res = new Map();
        for (const c1 of cr){
            if (!c1.isDefined()) continue;
            for (const v of c1)if (!res.has(v)) res.set(v, 1);
            else res.set(v, res.get(v) + 1);
        }
        const vs = [
            ...x2
        ];
        vs.sort((o1, o2)=>{
            let res1 = 0;
            let res2 = 0;
            if (res.has(o1)) res1 = res.get(o1);
            if (res.has(o2)) res2 = res.get(o2);
            if (res1 < res2) return 1;
            if (res1 > res2) return -1;
            return 0;
        });
        const ret = new Set();
        for (const v of vs){
            let remain = false;
            for (const c1 of cr)if (c1.isDefined()) {
                remain = true;
                break;
            }
            if (!remain) break;
            v.clear();
            ret.add(v);
        }
        return ret;
    }
    #computeHighestAndLowestConsistencyDegree() {
        let low = 1;
        let high = 0;
        for (const v of this._pro.variables())for (const c1 of v){
            const l = c1.lowestConsistencyDegree();
            const h = c1.highestConsistencyDegree();
            if (l < low) low = l;
            if (h > high) high = h;
        }
        this.#lb = low;
        this.#lt = high;
    }
    #flcRepair(X1, X2, xi, consX1xi, consX12, cr1, rc) {
        const X3p = this.#choose(X2, cr1);
        const X1p = $8d58e5e35735c7ec$export$c15ba88cf158f3d6.#setPlusElement(X1, xi);
        const X2p = $8d58e5e35735c7ec$export$c15ba88cf158f3d6.#setMinusSet(X2, X3p);
        return this.#flcVariables(X1p, X2p, X3p, consX1xi, Math.min(consX12, consX1xi), rc);
    }
    #flcVariable(X11, X21, xi1, consX1, consX121, rc1) {
        let bestCons = this.#lb;
        if (xi1.domain().size() === 0) return bestCons;
        let bestX2 = $a7e2f7128ad72da7$export$1d4e454bcd46f18f.fromVariables(X21);
        let bestDij = xi1.domain().at(0);
        const x2Store = $a7e2f7128ad72da7$export$1d4e454bcd46f18f.fromVariables(X21);
        for(let j = 0; j < xi1.domain().size() && bestCons < consX121; ++j){
            const dij = xi1.domain().at(j);
            xi1.assign(dij);
            const consX1_xi = Math.min(consX1, this.#testX1(X11, xi1, bestCons, rc1));
            if (consX1_xi > Math.max(bestCons, rc1)) {
                const crNew = new Set();
                const consX12_xi = Math.min(Math.min(consX1_xi, consX121), this.#testX12(X11, X21, xi1, consX1_xi, consX121, crNew));
                if (consX12_xi > bestCons) {
                    bestCons = consX12_xi;
                    bestDij = dij;
                    bestX2 = $a7e2f7128ad72da7$export$1d4e454bcd46f18f.fromVariables(X21);
                }
                if (crNew.size) {
                    const repairCons = this.#flcRepair(X11, X21, xi1, consX1_xi, consX121, crNew, Math.max(rc1, bestCons));
                    if (this.#globalReturn !== -1) return bestCons;
                    if (repairCons > bestCons) {
                        bestCons = repairCons;
                        bestDij = dij;
                        bestX2 = $a7e2f7128ad72da7$export$1d4e454bcd46f18f.fromVariables(X21);
                    }
                    x2Store.apply();
                }
            }
        }
        bestX2.apply();
        xi1.assign(bestDij);
        return bestCons;
    }
    #flcVariables(X12, X22, X3, consX11, consX122, rc2) {
        this._debugOutput(`X1 ${X12.size}, X2' ${X22.size}, X3' ${X3.size}`);
        if (this._targetDeg !== null && this._targetDeg <= this._pro.worstSatisfactionDegree()) {
            this._debugOutput("stop: current degree is above the target");
            this.#globalReturn = 1;
            return consX122;
        }
        if (this._iterLimit && this._iterLimit < this.#iterCount++) {
            this._debugOutput("stop: number of iterations has reached the limit");
            this.#globalReturn = 0;
            return consX122;
        }
        if (this.#endTime < Date.now()) {
            this._debugOutput("stop: time limit has been reached");
            this.#globalReturn = 0;
            return consX122;
        }
        if (X3.size === 0) return consX122;
        const xi = X3.values().next().value;
        const consX12xi = this.#flcVariable(X12, X22, xi, consX11, consX122, rc2);
        if (this.#globalReturn !== -1) return consX122;
        if (consX12xi < rc2) return this.#lb;
        X22 = $8d58e5e35735c7ec$export$c15ba88cf158f3d6.#setPlusElement(X22, xi);
        X3 = $8d58e5e35735c7ec$export$c15ba88cf158f3d6.#setMinusElement(X3, xi);
        return this.#flcVariables(X12, X22, X3, consX11, consX12xi, rc2);
    }
    #initTest(X, cr2) {
        const cs = new Set();
        for (const v of X)for (const c1 of v)cs.add(c1); // All variables in X have been assigned.
        let ret = 1;
        for (const c1 of cs){
            const sd = c1.satisfactionDegree();
            if (sd === $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) continue;
            if (sd < ret) ret = sd;
        }
        for (const c1 of this._pro.constraints()){
            const cd = c1.lowestConsistencyDegree();
            if (cd < this.#lt) cr2.add(c1);
        }
        return ret;
    }
    #testX1(X13, xi2, bestCons, rc3) {
        let cd = 1;
        const cs = new Set();
        for (const v of X13){
            const temp = this._pro.constraintsBetween(v, xi2);
            for (const c1 of temp)cs.add(c1);
        }
        for (const c1 of cs){
            const d = c1.satisfactionDegree();
            if (d === $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) continue;
            if (d < cd) cd = d;
            if (cd <= bestCons || cd <= rc3) return cd; // If it is determined that a better solution than the current solution cannot be obtained
        }
        return cd;
    }
    #testX12(X14, X23, xi3, consX1xi1, consX123, cr3) {
        let csd = 1;
        const cs = new Set();
        for (const v of X14){
            const temp = this._pro.constraintsBetween(v, xi3);
            for (const c1 of temp)cs.add(c1);
        }
        for (const v of X23){
            const temp = this._pro.constraintsBetween(v, xi3);
            for (const c1 of temp)cs.add(c1);
        }
        for (const c1 of cs){
            const sd = c1.satisfactionDegree();
            if (sd === $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) continue;
            if (sd < csd) csd = sd;
        }
        for (const c1 of cs){
            const sd = c1.satisfactionDegree();
            if (sd === $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) continue;
            if (sd < consX1xi1 || sd < consX123) cr3.add(c1);
        }
        return csd;
    }
    exec() {
        this.#endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        this.#iterCount = 0;
        this.#globalReturn = -1;
        const wsd = this._pro.worstSatisfactionDegree();
        if (this._pro.emptyVariableSize() === 0) this._pro.clearAllVariables();
        const X1 = new Set();
        const X2 = new Set(); // Currently assigned variables.
        const X3 = new Set(); // Currently unassigned variables.
        for (const v of this._pro.variables())(!v.isEmpty() ? X2 : X3).add(v);
        const cr = new Set();
        const initCons = this.#initTest(X2, cr);
        let rc;
        let initSol = null;
        if (X3.size === 0) {
            rc = initCons;
            initSol = $a7e2f7128ad72da7$export$1d4e454bcd46f18f.fromVariables(X2);
        } else rc = this.#lb;
        const X3p = $8d58e5e35735c7ec$export$c15ba88cf158f3d6.#setPlusSet(this.#choose(X2, cr), X3);
        const X2p = $8d58e5e35735c7ec$export$c15ba88cf158f3d6.#setMinusSet(X2, X3p);
        let result = this.#flcVariables(X1, X2p, X3p, this.#lt, this.#lt, rc);
        if (result < rc) {
            if (initSol !== null) initSol.apply();
        }
        result = this._pro.worstSatisfactionDegree();
        return result > wsd && result > 0 && (this.#globalReturn !== 0 || this._targetDeg === null);
    }
}
var $0ed82bb4e6966b5c$exports = {};
$parcel$export($0ed82bb4e6966b5c$exports, "FlexibleLocalChangesEx", function() {
    return $0ed82bb4e6966b5c$export$f3429dcb0286bfee;
});
/**
 * A class that implements the flexible local changes method.
 * The implementation is optimized by converting recursive calls to loops.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */ class $0ed82bb4e6966b5c$export$f3429dcb0286bfee extends $c4f5921582438a32$export$cca492cadf45c096 {
    static #setPlusSet(s14, s24) {
        const sn = new Set(s14);
        for (const v of s24)sn.add(v);
        return sn;
    }
    static #setMinusSet(s113, s213) {
        const sn = new Set(s113);
        for (const v of s213)sn.delete(v);
        return sn;
    }
    static #setPlusElement(s6, e4) {
        const sn = new Set(s6);
        sn.add(e4);
        return sn;
    }
    #lt;
    #lb;
    #iterCount;
    #endTime;
    #globalReturn;
    constructor(p){
        super(p);
        this.#computeHighestAndLowestConsistencyDegree();
    }
    name() {
        return "Flexible Local Changes Ex";
    }
    #choose(x21, cr4) {
        const res = new Map();
        for (const c1 of cr4){
            if (!c1.isDefined()) continue;
            for (const v of c1)if (!res.has(v)) res.set(v, 1);
            else res.set(v, res.get(v) + 1);
        }
        const vs = [
            ...x21
        ];
        vs.sort((o1, o2)=>{
            let res1 = 0;
            let res2 = 0;
            if (res.has(o1)) res1 = res.get(o1);
            if (res.has(o2)) res2 = res.get(o2);
            if (res1 < res2) return 1;
            if (res1 > res2) return -1;
            return 0;
        });
        const ret = new Set();
        for (const v of vs){
            let remain = false;
            for (const c1 of cr4)if (c1.isDefined()) {
                remain = true;
                break;
            }
            if (!remain) break;
            v.clear();
            ret.add(v);
        }
        return ret;
    }
    #computeHighestAndLowestConsistencyDegree() {
        let low = 1;
        let high = 0;
        for (const v of this._pro.variables())for (const c1 of v){
            const l = c1.lowestConsistencyDegree();
            const h = c1.highestConsistencyDegree();
            if (l < low) low = l;
            if (h > high) high = h;
        }
        this.#lb = low;
        this.#lt = high;
    }
    #flcRepair(X15, X24, xi4, consX1xi2, consX124, cr11, rc4) {
        const X3p = this.#choose(X24, cr11);
        const X1p = $0ed82bb4e6966b5c$export$f3429dcb0286bfee.#setPlusElement(X15, xi4);
        const X2p = $0ed82bb4e6966b5c$export$f3429dcb0286bfee.#setMinusSet(X24, X3p);
        return this.#flcVariables(X1p, X2p, X3p, consX1xi2, Math.min(consX124, consX1xi2), rc4);
    }
    #flcVariable(X111, X211, xi11, consX13, consX1211, rc11) {
        let bestCons = this.#lb;
        if (xi11.domain().size() === 0) return bestCons;
        let bestX2 = $a7e2f7128ad72da7$export$1d4e454bcd46f18f.fromVariables(X211);
        let bestDij = xi11.domain().at(0);
        const x2Store = $a7e2f7128ad72da7$export$1d4e454bcd46f18f.fromVariables(X211);
        for(let j = 0; j < xi11.domain().size() && bestCons < consX1211; ++j){
            const dij = xi11.domain().at(j);
            xi11.assign(dij);
            const consX1_xi = Math.min(consX13, this.#testX1(X111, xi11, bestCons, rc11));
            if (consX1_xi > Math.max(bestCons, rc11)) {
                const crNew = new Set();
                const consX12_xi = Math.min(Math.min(consX1_xi, consX1211), this.#testX12(X111, X211, xi11, consX1_xi, consX1211, crNew));
                if (consX12_xi > bestCons) {
                    bestCons = consX12_xi;
                    bestDij = dij;
                    bestX2 = $a7e2f7128ad72da7$export$1d4e454bcd46f18f.fromVariables(X211);
                }
                if (crNew.size) {
                    const repairCons = this.#flcRepair(X111, X211, xi11, consX1_xi, consX1211, crNew, Math.max(rc11, bestCons));
                    if (this.#globalReturn !== -1) return bestCons;
                    if (repairCons > bestCons) {
                        bestCons = repairCons;
                        bestDij = dij;
                        bestX2 = $a7e2f7128ad72da7$export$1d4e454bcd46f18f.fromVariables(X211);
                    }
                    x2Store.apply();
                }
            }
        }
        bestX2.apply();
        xi11.assign(bestDij);
        return bestCons;
    }
    #flcVariables(X121, X221, X31, consX111, consX1221, rc21) {
        X221 = new Set(X221); // Clone
        X31 = new Set(X31); // Clone
        while(true){
            this._debugOutput(`X1 ${X121.size}, X2' ${X221.size}, X3' ${X31.size}`);
            if (this._targetDeg !== null && this._targetDeg <= this._pro.worstSatisfactionDegree()) {
                this._debugOutput("stop: current degree is above the target");
                this.#globalReturn = 1;
                return consX1221;
            }
            if (this._iterLimit && this._iterLimit < this.#iterCount++) {
                this._debugOutput("stop: number of iterations has reached the limit");
                this.#globalReturn = 0;
                return consX1221;
            }
            if (this.#endTime < Date.now()) {
                this._debugOutput("stop: time limit has been reached");
                this.#globalReturn = 0;
                return consX1221;
            }
            if (X31.size === 0) return consX1221;
            const xi = X31.values().next().value;
            const consX12xi = this.#flcVariable(X121, X221, xi, consX111, consX1221, rc21);
            if (this.#globalReturn !== -1) return consX1221;
            if (consX12xi < rc21) return this.#lb;
            X221.add(xi);
            X31.delete(xi);
            consX1221 = consX12xi;
        }
    }
    #initTest(X4, cr21) {
        const cs = new Set();
        for (const v of X4)for (const c1 of v)cs.add(c1); // All variables in X have been assigned.
        let ret = 1;
        for (const c1 of cs){
            const sd = c1.satisfactionDegree();
            if (sd === $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) continue;
            if (sd < ret) ret = sd;
        }
        for (const c1 of this._pro.constraints()){
            const cd = c1.lowestConsistencyDegree();
            if (cd < this.#lt) cr21.add(c1);
        }
        return ret;
    }
    #testX1(X131, xi21, bestCons1, rc31) {
        let cd = 1;
        const cs = new Set();
        for (const v of X131){
            const temp = this._pro.constraintsBetween(v, xi21);
            for (const c1 of temp)cs.add(c1);
        }
        for (const c1 of cs){
            const d = c1.satisfactionDegree();
            if (d === $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) continue;
            if (d < cd) cd = d;
            if (cd <= bestCons1 || cd <= rc31) return cd; // If it is determined that a better solution than the current solution cannot be obtained
        }
        return cd;
    }
    #testX12(X141, X231, xi31, consX1xi11, consX1231, cr31) {
        let csd = 1;
        const cs = new Set();
        for (const v of X141){
            const temp = this._pro.constraintsBetween(v, xi31);
            for (const c1 of temp)cs.add(c1);
        }
        for (const v of X231){
            const temp = this._pro.constraintsBetween(v, xi31);
            for (const c1 of temp)cs.add(c1);
        }
        for (const c1 of cs){
            const sd = c1.satisfactionDegree();
            if (sd === $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) continue;
            if (sd < csd) csd = sd;
        }
        for (const c1 of cs){
            const sd = c1.satisfactionDegree();
            if (sd === $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED) continue;
            if (sd < consX1xi11 || sd < consX1231) cr31.add(c1);
        }
        return csd;
    }
    exec() {
        this.#endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        this.#iterCount = 0;
        this.#globalReturn = -1;
        const wsd = this._pro.worstSatisfactionDegree();
        if (this._pro.emptyVariableSize() === 0) this._pro.clearAllVariables();
        const X1 = new Set();
        const X2 = new Set(); // Currently assigned variables.
        const X3 = new Set(); // Currently unassigned variables.
        for (const v of this._pro.variables())(!v.isEmpty() ? X2 : X3).add(v);
        const cr = new Set();
        const initCons = this.#initTest(X2, cr);
        let rc;
        let initSol = null;
        if (X3.size === 0) {
            rc = initCons;
            initSol = $a7e2f7128ad72da7$export$1d4e454bcd46f18f.fromVariables(X2);
        } else rc = this.#lb;
        const X3p = $0ed82bb4e6966b5c$export$f3429dcb0286bfee.#setPlusSet(this.#choose(X2, cr), X3);
        const X2p = $0ed82bb4e6966b5c$export$f3429dcb0286bfee.#setMinusSet(X2, X3p);
        let result = this.#flcVariables(X1, X2p, X3p, this.#lt, this.#lt, rc);
        if (result < rc) {
            if (initSol !== null) initSol.apply();
        }
        result = this._pro.worstSatisfactionDegree();
        return result > wsd && result > 0 && (this.#globalReturn !== 0 || this._targetDeg === null);
    }
}
var $b222557a012b5259$exports = {};
$parcel$export($b222557a012b5259$exports, "FuzzyBreakout", function() {
    return $b222557a012b5259$export$151ca5d788220218;
});
/**
 * Class implements a solver using the breakout method for fuzzy CSP.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $b222557a012b5259$export$151ca5d788220218 extends $c4f5921582438a32$export$cca492cadf45c096 {
    #weights;
    #lastSolDeg;
    #isRandom = true;
    constructor(p){
        super(p);
        this.#weights = new Array(this._pro.constraintSize());
        this.#weights.fill(1);
    }
    name() {
        return "Fuzzy Breakout";
    }
    foundSolution() {
        return false;
    }
    #findCandidates(worstVars, canList1) {
        let maxDiff = 0;
        for (const v of worstVars){
            const v_val = v.value(); // Save the value
            let nowVio = 0;
            for (const c1 of v)nowVio += (1 - c1.satisfactionDegree()) * this.#weights[c1.index()];
            out: for (const d of v.domain()){
                if (v_val === d) continue;
                v.assign(d);
                let diff = nowVio;
                for (const c1 of v){
                    diff -= (1 - c1.satisfactionDegree()) * this.#weights[c1.index()];
                    // If the improvement is less than the previous improvement, try the next variable.
                    if (diff < maxDiff) continue out;
                }
                if (diff > maxDiff) {
                    maxDiff = diff;
                    canList1.clear();
                    canList1.addVariable(v, d);
                } else if (maxDiff !== 0) canList1.addVariable(v, d);
            }
            v.assign(v_val); // Restore the value.
        }
    }
    #listWorstVariables(worstCons) {
        const wvs = new Set();
        for (const c1 of worstCons)for (const v of c1)wvs.add(v);
        return Array.from(wvs);
    }
    exec() {
        const endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        let iterCount = 0;
        for (const v of this._pro.variables())if (v.isEmpty()) v.assign(v.domain().at(0));
        const deg = this._pro.worstSatisfactionDegree();
        const canList = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
        const sol = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
        while(true){
            const [vc, wsd] = this._pro.constraintsWithWorstSatisfactionDegree();
            if (this._targetDeg !== null && this._targetDeg <= wsd) {
                this._debugOutput("stop: current degree is above the target");
                return true;
            }
            if (this._iterLimit && this._iterLimit < iterCount++) {
                this._debugOutput("stop: number of iterations has reached the limit");
                break;
            }
            if (endTime < Date.now()) {
                this._debugOutput("stop: time limit has been reached");
                break;
            }
            this._debugOutput("worst satisfaction degree: " + wsd);
            if (this.#lastSolDeg < wsd) {
                sol.setProblem(this._pro);
                this.#lastSolDeg = wsd;
                if (foundSolution(sol, this.#lastSolDeg)) return true;
            }
            this.#findCandidates(this.#listWorstVariables(vc), canList);
            if (0 < canList.size()) {
                const e = this.#isRandom ? canList.random() : canList.at(0);
                e.apply();
                canList.clear();
                this._debugOutput("	" + e);
            } else {
                for (const c1 of vc)this.#weights[c1.index()] += 1;
                this._debugOutput("breakout");
            }
        }
        if (this._targetDeg === null && deg < this._pro.worstSatisfactionDegree()) return true;
        return false;
    }
    /**
	 * Sets the randomness of the algorithm.
	 * Enabling randomness reduces the risk of local solutions, but makes the solution unrepeatable.
	 * @param flag Whether the randomness is enabled.
	 */ setRandomness(flag) {
        this.#isRandom = flag;
    }
}
var $1ccf339c7def6c57$exports = {};
$parcel$export($1ccf339c7def6c57$exports, "FuzzyGENET", function() {
    return $1ccf339c7def6c57$export$6a3df005617df82a;
});
/**
 * This class implements fuzzy GENET.
 * CSPs and FCSPs (but only Binary (F)CSPs) is supported.
 *
 * @author Takuto Yanagida
 * @version 2023-04-17
 */ class $1ccf339c7def6c57$export$6a3df005617df82a extends $c4f5921582438a32$export$cca492cadf45c096 {
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
            this.#clusters.push(new $1ccf339c7def6c57$export$6a3df005617df82a.Cluster(v));
        }
        for (const c1 of this._pro.constraints())if (c1.size() === 1) {
            const v = c1.at(0);
            const cl = this.#clusters[c1.at(0).index()];
            for(let i = 0; i < cl.size(); ++i){
                const origVal = v.value(); // Save the value.
                v.assign(cl.get(i)._value);
                if (c1.satisfactionDegree() <= worstDeg) cons.push(new $1ccf339c7def6c57$export$6a3df005617df82a.Connection(c1, cl.get(i)));
                v.assign(origVal); // Restore the value.
            }
        } else {
            const v1 = c1.at(0);
            const v2 = c1.at(1);
            const cl_f = this.#clusters[c1.at(0).index()];
            const cl_s = this.#clusters[c1.at(1).index()];
            for(let i = 0; i < cl_f.size(); ++i){
                const origVal1 = v1.value(); // Save the value.
                v1.assign(cl_f.get(i)._value);
                for(let j = 0; j < cl_s.size(); ++j){
                    const origVal2 = v2.value(); // Save the value.
                    v2.assign(cl_s.get(j)._value);
                    if (c1.satisfactionDegree() <= worstDeg) cons.push(new $1ccf339c7def6c57$export$6a3df005617df82a.Connection(c1, cl_f.get(i), cl_s.get(j)));
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
    #shuffle(is1) {
        for(let i = is1.length; i > 1; --i){
            const j = $1ccf339c7def6c57$export$6a3df005617df82a.nextInt(i);
            const temp = is1[i - 1];
            is1[i - 1] = is1[j];
            is1[j] = temp;
        }
        return is1;
    }
    exec() {
        if (!this.#createNetwork(this.#worstSatisfactionDegree)) throw new Exception();
        const endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        let iterCount = 0;
        const sol = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
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
    $1ccf339c7def6c57$export$6a3df005617df82a.Cluster = Cluster;
    class Connection {
        #c;
        #first;
        #second;
        _weight;
        // Order of neurons must be the same as the order of variables that the constraint has.
        constructor(c1, first, second = null){
            this._weight = c1.satisfactionDegree() - 1;
            this.#c = c1;
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
    $1ccf339c7def6c57$export$6a3df005617df82a.Connection = Connection;
    class Neuron {
        #conTemp = [];
        #connections;
        _value;
        _isActive = false;
        constructor(value){
            this._value = value;
        }
        addConnection(c1) {
            this.#conTemp.push(c1);
        }
        lockConnections() {
            this.#connections = [
                ...this.#conTemp
            ];
            this.#conTemp = null; // No longer being used.
        }
        getInput() {
            let ret = 0;
            for (const c1 of this.#connections){
                const n = c1.getNeuron(this); // If n is null, then the unary constraint.
                ret += c1._weight * (n === null || n._isActive ? 1 : 0);
            }
            return ret;
        }
    }
    $1ccf339c7def6c57$export$6a3df005617df82a.Neuron = Neuron;
})();
var $2b8a116c9a37397b$exports = {};
$parcel$export($2b8a116c9a37397b$exports, "SRS3", function() {
    return $2b8a116c9a37397b$export$4bfabca73d1ccb59;
});
/**
 * This class implements the SRS algorithm.
 *
 * @author Takuto Yanagida
 * @version 2023-04-17
 */ class $2b8a116c9a37397b$export$4bfabca73d1ccb59 extends $c4f5921582438a32$export$cca492cadf45c096 {
    // Threshold for adopting a candidate assignment at repair time (should be 0 if strictly following SRS 3)
    static REPAIR_THRESHOLD = 0;
    #closedList = new Set();
    #openList = new Set();
    #nodes = [];
    #neighborConstraints = [];
    #c_stars = new Set();
    #iterCount;
    #endTime;
    #isRandom = true;
    constructor(p){
        super(p);
        for (const c1 of this._pro.constraints()){
            this.#nodes.push(new $2b8a116c9a37397b$export$4bfabca73d1ccb59.TreeNode(c1));
            this.#neighborConstraints.push(null);
        }
    }
    name() {
        return "SRS 3";
    }
    foundSolution(solution, worstDegree) {
        return false;
    }
    #getNeighborConstraints(c5) {
        const index = c5.index();
        if (this.#neighborConstraints[index] === null) this.#neighborConstraints[index] = c5.neighbors();
        return this.#neighborConstraints[index];
    }
    #repair(c01) {
        this._debugOutput("repair");
        const canList = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
        const minDeg0 = c01.satisfactionDegree(); // Target c0 should certainly be an improvement over this.
        const min = this._pro.worstSatisfactionDegree(); // Lower bound of neighborhood constraints.
        let maxDeg0 = c01.satisfactionDegree(); // Satisfaction degree of target c0 for the most improvement so far.
        // If a candidate satisfying the condition is stronger than the previous candidates,
        // it is replaced, and if no candidate is found until the end, it fails.
        for (const v of c01){
            const v_val = v.value(); // Save the value
            out: for (const d of v.domain()){
                if (v_val === d) continue;
                v.assign(d);
                const deg0 = c01.satisfactionDegree();
                // If target c0 cannot be improved, the assignment is rejected.
                if (minDeg0 > deg0 || maxDeg0 - deg0 > $2b8a116c9a37397b$export$4bfabca73d1ccb59.REPAIR_THRESHOLD) continue;
                for (const c1 of v){
                    if (c1 === c01) continue;
                    const deg = c1.satisfactionDegree();
                    // If one of the neighborhood constraints c is less than or equal to the worst, the assignment is rejected.
                    if (deg !== $5108df96f96301e5$export$aec1359a0a40a615.UNDEFINED && deg < min) continue out;
                }
                if (deg0 > maxDeg0) {
                    maxDeg0 = deg0;
                    canList.clear();
                }
                canList.addVariable(v, d);
            }
            v.assign(v_val); // Restore the value
        }
        if (canList.size() > 0) {
            const e = this.#isRandom ? canList.random() : canList.at(0);
            e.apply();
            this._debugOutput("	" + e);
            return true;
        }
        return false;
    }
    #shrink(node2) {
        this._debugOutput("shrink");
        let removeCStar = false;
        while(true){
            node2 = node2.parent();
            if (this.#c_stars.delete(node2)) {
                removeCStar = true;
                break;
            }
            if (!this.#repair(node2.parent().getObject())) break;
        }
        const temp = [];
        node2.getDescendants(temp); // temp contains node.
        for (const n of temp){
            n.clear(); // Prepare for reuse
            this.#openList.delete(n);
            this.#closedList.delete(n);
        }
        if (!removeCStar) this.#openList.add(node2);
    }
    #spread(node11) {
        this._debugOutput("spread");
        this.#closedList.add(node11);
        for (const c1 of this.#getNeighborConstraints(node11.getObject())){
            const cn = this.#nodes[c1.index()];
            if (!this.#closedList.has(cn) && !this.#openList.has(cn)) {
                node11.add(cn);
                this.#openList.add(cn);
            }
        }
    }
    #srs() {
        this._debugOutput("srs");
        const [wsdcs] = this._pro.constraintsWithWorstSatisfactionDegree();
        for (const c1 of wsdcs){
            const cn = this.#nodes[c1.index()];
            cn.setParent(null);
            this.#c_stars.add(cn);
        }
        this.#closedList.clear();
        this.#openList.clear();
        for (const n of this.#c_stars)this.#openList.add(n);
        while(this.#c_stars.size && this.#openList.size){
            if (this._iterLimit && this._iterLimit < this.#iterCount++) {
                this._debugOutput("stop: number of iterations has reached the limit");
                return false;
            }
            if (this.#endTime < Date.now()) {
                this._debugOutput("stop: time limit has been reached");
                return false;
            }
            const node = this.#openList.values().next().value;
            this.#openList.delete(node);
            if (this.#repair(node.getObject())) {
                if (this.#c_stars.delete(node)) continue; // If the repaired node is included in C* (to be deleted)
                if (this.#repair(node.parent().getObject())) {
                    this.#shrink(node); // When its improvement leads to the improvement of its parents
                    continue;
                }
            }
            this.#spread(node);
        }
        return true;
    }
    exec() {
        this.#endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
        this.#iterCount = 0;
        if (this._targetDeg && this._targetDeg <= this._pro.worstSatisfactionDegree()) return true;
        const sol = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
        let success = false;
        while(true){
            const ret = this.#srs();
            if (!ret || this.#c_stars.size) break;
            const solutionWorstDeg = this._pro.worstSatisfactionDegree();
            this._debugOutput(`\tfound a solution: ${solutionWorstDeg}\t${this._targetDeg}`);
            sol.setProblem(this._pro);
            if (this.foundSolution(sol, solutionWorstDeg)) {
                success = true;
                break;
            }
            if (this._targetDeg === null) success = true;
            else if (this._targetDeg <= solutionWorstDeg) {
                this._debugOutput("stop: current degree is above the target");
                success = true;
                break;
            }
        }
        return success;
    }
    /**
	 * Sets the randomness of the algorithm.
	 * Enabling randomness reduces the risk of falling into a local solution, but makes the solution unrepeatable.
	 * @param flag If true, randomness is enabled.
	 */ setRandomness(flag) {
        this.#isRandom = flag;
    }
}
{
    class TreeNode {
        #children = [];
        #parent;
        #obj;
        constructor(obj){
            this.#obj = obj;
        }
        add(tn) {
            tn.#parent = this;
            this.#children.push(tn);
        }
        clear() {
            for (const tn of this.#children)tn.#parent = null;
            this.#children.length = 0;
        }
        getDescendants(tns) {
            tns.push(this);
            for (const tn of this.#children)tn.getDescendants(tns);
        }
        getObject() {
            return this.#obj;
        }
        parent() {
            return this.#parent;
        }
        setParent(p) {
            this.#parent = p;
        }
    }
    $2b8a116c9a37397b$export$4bfabca73d1ccb59.TreeNode = TreeNode;
}var $5e4f7d48ff32a2ed$exports = {};
$parcel$export($5e4f7d48ff32a2ed$exports, "SRS3_PF", function() {
    return $5e4f7d48ff32a2ed$export$281ed65cbb041503;
});
/**
 * This class implements the SRS algorithm with PF.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ var $b0cf4fb82eab32dc$exports = {};
$parcel$export($b0cf4fb82eab32dc$exports, "PostStabilization", function() {
    return $b0cf4fb82eab32dc$export$52631f16ca582d39;
});
/**
 * Class of post-stabilization.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $b0cf4fb82eab32dc$export$52631f16ca582d39 {
    static apply(p, orig) {
        this._debugOutput("start post-stabilization");
        let stabilized;
        let count = 0;
        do {
            this._debugOutput("post-stabilization: count " + count++);
            stabilized = false;
            let C_min = p.worstSatisfactionDegree();
            const vars = p.variables();
            for(let i = 0; i < vars.length; ++i){
                const v = vars[i];
                const org = v.value();
                const a = orig.get(i);
                if (org === a.value()) continue;
                a.apply(); // Try to assign the original.
                if (p.worstSatisfactionDegree() >= C_min) stabilized = true;
                else v.assign(org); // Restore.
            }
        }while (stabilized);
        this._debugOutput("finish post-stabilization");
        return true;
    }
}
class $5e4f7d48ff32a2ed$export$281ed65cbb041503 extends $2b8a116c9a37397b$export$4bfabca73d1ccb59 {
    constructor(p){
        super(p);
    }
    name() {
        return "SRS 3 + PF";
    }
    exec() {
        let deg = 0;
        let uvs = 0;
        if (this._debug) {
            deg = this._pro.worstSatisfactionDegree();
            uvs = this._pro.emptyVariableSize();
        }
        const al = new $a7e2f7128ad72da7$export$1d4e454bcd46f18f();
        al.setProblem(this._pro);
        const res = super.exec();
        if (res) $b0cf4fb82eab32dc$export$52631f16ca582d39.apply(this._pro, al);
        this._debugOutput(`result: ${res ? "success" : "failure"}`);
        this._debugOutput(`satisfaction degree: ${deg} -> ${this._pro.worstSatisfactionDegree()}`);
        this._debugOutput(`unassigned size: ${uvs} -> ${this._pro.emptyVariableSize()}`);
        return res;
    }
}
class $bc75b5b8eb656b55$export$4e442516b8f577ee {
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
        const cs = await $bc75b5b8eb656b55$export$4e442516b8f577ee.createCrispSolver(type, p);
        if (cs) return cs;
        const fs = await $bc75b5b8eb656b55$export$4e442516b8f577ee.createFuzzySolver(type, p);
        if (fs) return fs;
        return null;
    }
    static async createCrispSolver(type, p) {
        switch(type.replaceAll(" ", "")){
            case "ForwardChecking":
            case "forward-checking":
                return new $753cae771624653d$export$8570b7b487498488(p);
            case "MaxForwardChecking":
            case "max-forward-checking":
                return new $5da71a10526e78a7$export$2a32484f7cb0d846(p);
            case "LocalChanges":
            case "local-changes":
                return new $62da18818fc7efc1$export$8153937ab18ca581(p);
            case "LocalChangesEx":
            case "local-changes-ex":
                return new $7f4ecc5acb283d86$export$e577c7182ffc977b(p);
            case "Breakout":
            case "breakout":
                return new $2c8e786ab4db97cd$export$44de86bc32e07644(p);
            case "GENET":
            case "genet":
                return new $0cb6792a4a1b293a$export$d94917317b4f74cb(p);
            case "CrispSRS3":
            case "crisp-srs3":
                return new $621e09da02c15793$export$193930056f923a8(p);
        }
        return null;
    }
    static async createFuzzySolver(type, p) {
        switch(type.replaceAll(" ", "")){
            case "FuzzyForwardChecking":
            case "fuzzy-forward-checking":
                return new $d149e5ad62c58307$export$2d94cf9ddb103458(p);
            case "FuzzyForwardCheckingBc":
            case "fuzzy-forward-checking-bc":
                return new $a7583aef89e9a883$export$532d5536583284b8(p);
            case "FlexibleLocalChanges":
            case "flexible-local-changes":
                return new $8d58e5e35735c7ec$export$c15ba88cf158f3d6(p);
            case "FlexibleLocalChangesEx":
            case "flexible-local-changes-ex":
                return new $0ed82bb4e6966b5c$export$f3429dcb0286bfee(p);
            case "FuzzyBreakout":
            case "fuzzy-breakout":
                return new $b222557a012b5259$export$151ca5d788220218(p);
            case "FuzzyGENET":
            case "fuzzy-genet":
                return new $1ccf339c7def6c57$export$6a3df005617df82a(p);
            case "SRS3":
            case "srs3":
                return new $2b8a116c9a37397b$export$4bfabca73d1ccb59(p);
            case "SRS3PF":
            case "SRS3_PF":
            case "srs3-pf":
                return new $5e4f7d48ff32a2ed$export$281ed65cbb041503(p);
        }
        return null;
    }
}
var $1d9f94f1b65cd2b2$exports = {};
$parcel$export($1d9f94f1b65cd2b2$exports, "AC3", function() {
    return $1d9f94f1b65cd2b2$export$ac824f187e852f5a;
});
/**
 * The class implements AC-3, one of the arc consistency algorithms.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */ class $1d9f94f1b65cd2b2$export$ac824f187e852f5a {
    static #checkConsistency(c6, v_j) {
        for (const val of v_j.domain()){
            v_j.assign(val);
            if (c6.isSatisfied() === 1) return true; // Current assignment of v_i is consistent.
        }
        return false;
    }
    static #reviseDomain(p, v_i, v_j1) {
        const val_i = v_i.value();
        const val_j = v_j1.value(); // Save the value.
        const d_i = v_i.domain();
        const temp = [];
        const cs = p.constraintsBetween(v_i, v_j1);
        vals: for (const val of d_i){
            v_i.assign(val);
            for (const c1 of cs){
                if (c1.size() !== 2) continue; // Check the next constraint
                if (!$1d9f94f1b65cd2b2$export$ac824f187e852f5a.#checkConsistency(c1, v_j1)) continue vals; // Since there is no partner satisfying the constraint, check the next value.
            }
            temp.push(val);
        }
        v_i.assign(val_i); // Restore the value.
        v_j1.assign(val_j); // Restore the value.
        if (temp.length !== d_i.size()) {
            const nd = p.createDomain({
                values: temp
            });
            v_i.setDomain(nd);
            this._debugOutput(d_i.size() + " -> " + nd.size());
            return true;
        }
        return false;
    }
    static apply(p) {
        const cs = [];
        for (const c1 of p.constraints())if (c1.size() === 2) cs.add(c1);
        while(!cs.isEmpty()){
            const c1 = cs.remove(cs.size() - 1);
            const v_k = c1.at(0);
            const v_m = c1.at(1);
            if ($1d9f94f1b65cd2b2$export$ac824f187e852f5a.#reviseDomain(p, v_k, v_m)) {
                for (const c1 of p.constraints())if (c1.size() === 2 && c1.at(1) === v_k && c1.at(0) !== v_m) cs.add(0, c1);
            }
        }
    }
}
var $ca17a2e259f989db$exports = {};
$parcel$export($ca17a2e259f989db$exports, "NodeConsistency", function() {
    return $ca17a2e259f989db$export$975ddbe83e2b310a;
});
/**
 * Utility class that performs node consistency.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */ class $ca17a2e259f989db$export$975ddbe83e2b310a {
    /**
	 * Guarantees consistency of fuzzy unary constraints. The domain of each variable is replaced as needed.
	 * Deletes elements from domains that do not meet the specified worst satisfaction degree.
	 * @param p A problem.
	 * @param threshold Worst satisfaction degree.
	 * @return True if there is no empty domain.
	 */ static apply(p, threshold) {
        for (const v of p.variables()){
            const d = v.domain();
            const origVal = v.value(); // Save the value.
            const elms = [];
            for (const c1 of v){
                if (c1.size() !== 1) continue;
                for (const val of d){
                    v.assign(val);
                    if (c1.satisfactionDegree() >= threshold) elms.push(val);
                }
                p.removeConstraint(c1);
            }
            v.assign(origVal); // Restore the value.
            if (elms.length === 0) return false;
            v.setDomain(p.createDomain({
                values: elms
            }));
        }
        return true;
    }
    /**
	 * Guarantees consistency of crisp unary constraints. The domain of each variable is replaced as needed.
	 * It cannot be applied to crisp views of fuzzy constraint satisfaction problems because it changes the structure of the constraint graph.
	 * @param p A crisp problem.
	 * @return True if there is no empty domain.
	 */ static apply(p) {
        for (const v of p.variables()){
            const d = v.domain();
            const origVal = v.value(); // Save the value.
            const elms = [];
            for (const c1 of v){
                if (c1.size() !== 1) continue;
                for (const val of d){
                    v.assign(val);
                    if (c1.isSatisfied() === 1) elms.push(val);
                }
                p.removeConstraint(c1);
            }
            v.assign(origVal); // Restore the value.
            if (elms.length === 0) return false;
            v.setDomain(p.createDomain({
                values: elms
            }));
        }
        return true;
    }
}
var $9270f99178eaf6e6$exports = {};
$parcel$export($9270f99178eaf6e6$exports, "Problems", function() {
    return $9270f99178eaf6e6$export$32fae9b8f93405d0;
});
/**
 * Utility class for constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2023-04-18
 */ class $9270f99178eaf6e6$export$32fae9b8f93405d0 {
    static #averagePathLength(p1, v5, length, baseLength, vo) {
        const vn = [];
        for (const c1 of v5){
            for (const vi of c1)if (length[vi.index()] === Number.MAX_VALUE) {
                vn.push(vi);
                length[vi.index()] = baseLength + 1;
            }
        }
        for (const vi of vn)vo.add(vi);
        for (const vi of vn)$9270f99178eaf6e6$export$32fae9b8f93405d0.#averagePathLength(p1, vi, length, baseLength + 1, vo);
    }
    /**
	 * Calculates the average path length for a given variable.
	 * @param p A problem.
	 * @param v A variable of the problem.
	 * @return Average path length.
	 */ static averagePathLength(p, v) {
        const ls = new Array(p.variableSize());
        ls.fill(Number.MAX_VALUE);
        const vs = new Set();
        vs.add(v);
        ls[v.index()] = 0;
        $9270f99178eaf6e6$export$32fae9b8f93405d0.#averagePathLength(p, v, ls, 0, vs);
        let connectedSize = 0;
        let sum = 0;
        for(let i = 0; i < ls.length; ++i)if (ls[i] !== Number.MAX_VALUE && i !== v.index()) {
            ++connectedSize;
            sum += ls[i];
        }
        if (connectedSize === 0) return 0;
        return sum / connectedSize;
    }
    /**
	 * Calculates the average path length.
	 * @param p A problem.
	 * @return Average path length.
	 */ static averagePathLengths(p) {
        const ls = new Array(p.variableSize());
        for (const v of p.variables())ls[v.index()] = $9270f99178eaf6e6$export$32fae9b8f93405d0.averagePathLength(p, v);
        return ls;
    }
    /**
	 * Gets an array containing all domains.
	 * @param p A problem.
	 * @return Array of domains.
	 */ static domains(p) {
        const ds = [];
        for (const v of p.variables())ds.push(v.domain());
        return ds;
    }
    /**
	 * Returns the array of possible satisfaction degree values for all unary constraints.
	 * @param p A problem.
	 * @param degrees Array of degree values.
	 * @return The array.
	 */ static possibleSatisfactionDegreesOfUnaryConstraints(p, degrees) {
        for (const c1 of p.constraints()){
            if (c1.size() !== 1) continue;
            const v = c1.at(0);
            const origVal = v.value(); // Save the value.
            for (const val of v.domain()){
                v.assign(val);
                degrees.add(c1.satisfactionDegree());
            }
            v.assign(origVal); // Restore the value.
        }
        return degrees;
    }
    /**
	 * Set up all domains.
	 * @param p A problem.
	 * @param ds Array of domains.
	 */ static setDomains(p, ds) {
        for(let i = 0; i < ds.length; ++i)p.variableAt(i).setDomain(ds[i]);
    }
    /**
	 * Returns a view of the fuzzy constraint satisfaction problem as a crisp constraint satisfaction problem.
	 * The relations and domains of the specified fuzzy constraint satisfaction problem are reused, but the other elements are newly generated.
	 * Note: Assignments to variables and changes to domains of the view are reflected in the variables of the original problem.
	 * @param p A fuzzy constraint satisfaction problem.
	 * @param threshold The threshold of constraint satisfaction degree. A constraint is considered satisfied when the constraint satisfaction degree is greater than or equal to this value.
	 * @return A crisp constraint satisfaction problem.
	 */ static toViewAsCrispProblem(p, threshold) {
        const cp = new $9270f99178eaf6e6$var$CrispFuzzyProblem();
        for (const v of p.variables())cp.createVariable(v);
        for (c of p.constraints()){
            const vs = [];
            for (const v of c)vs.push(cp.variableAt(v.index()));
            const r = c.crispRelation();
            if (c.isFuzzy()) r = new $9270f99178eaf6e6$var$CrispFuzzyRelation(c.fuzzyRelation(), threshold);
            cp.createConstraint({
                relation: r,
                variables: vs
            });
        }
        return cp;
    }
}
class $9270f99178eaf6e6$var$CrispFuzzyProblem extends $2101e22eb3ae726f$export$2d7b2a6964dca148 {
    createVariable(v) {
        const iv = new $9270f99178eaf6e6$var$ImaginaryVariable(v);
        this.addVariable(iv);
        return v;
    }
}
class $9270f99178eaf6e6$var$CrispFuzzyRelation extends $48d470acfc59c60d$export$182ea39d269dda05 {
    #th;
    #fr;
    constructor(fr, th){
        this.#fr = fr;
        this.#th = th;
    }
    isSatisfied(...vs) {
        return this.#fr.satisfactionDegree(vs) >= this.#th;
    }
}
class $9270f99178eaf6e6$var$ImaginaryVariable extends $d579165ed6156fef$export$c867a5c9595a1350 {
    #orig;
    constructor(v){
        super(v.owner(), v.domain());
        this.#orig = v;
        setName(v.name());
        assign(v.value());
    }
    assign(value) {
        this.#orig.assign(value);
    }
    domain() {
        return this.#orig.domain();
    }
    setDomain(dom) {
        this.#orig.setDomain(dom);
    }
    value() {
        return this.#orig.value();
    }
}
var $d588427b879288b9$exports = {};
$parcel$export($d588427b879288b9$exports, "LoopDetector", function() {
    return $d588427b879288b9$export$136021658ac30d9;
});
/**
 * This class detects that a solver's operation is looping.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */ class $d588427b879288b9$export$136021658ac30d9 {
    #indices = [];
    #values = [];
    #cur = null;
    #loopLength = null;
    #iterCount = null;
    constructor(loopLength = 30, iterCount = 3){
        this.#loopLength = loopLength;
        this.#iterCount = iterCount;
        this.#initArrays();
    }
    #assignToVariable(index2, value) {
        this.#indices[this.#cur] = index2;
        this.#values[this.#cur] = value;
        if (--this.#cur === -1) this.#cur = this.#indices.length - 1;
    }
    #checkLooping() {
        const key = new Array(this.#loopLength);
        const val = new Array(this.#loopLength);
        out: for(let length = 1; length <= this.#loopLength; ++length){
            let offset = this.#cur + 1;
            for(let i = 0; i < length; ++i){
                if (i + offset === this.#indices.length) offset -= this.#indices.length;
                key[i] = this.#indices[i + offset];
                val[i] = this.#values[i + offset];
            }
            let fi = length;
            for(let i = 0; i < this.#iterCount - 1; ++i){
                offset = this.#cur + 1;
                for(let j = 0; j < length; ++j){
                    if (fi + j + offset >= this.#indices.length) offset -= this.#indices.length;
                    if (this.#indices[fi + j + offset] !== key[j] || this.#values[fi + j + offset] !== val[j]) continue out;
                }
                fi += length;
            }
            return length;
        }
        return 0;
    }
    #initArrays() {
        this.#indices = new Array(this.#loopLength * this.#iterCount);
        this.#values = new Array(this.#loopLength * this.#iterCount);
        this.#indices.fill(-1);
        this.#values.fill(-1);
        this.#cur = this.#indices.length - 1;
    }
    checkLoop(variableIndex, value) {
        this.#assignToVariable(variableIndex, value);
        return this.#checkLooping();
    }
    clear() {
        this.#indices.fill(-1);
        this.#values.fill(-1);
    }
    iterationCount() {
        return this.#iterCount;
    }
    loopLength() {
        return this.#loopLength;
    }
    values() {
        return this.#values.clone();
    }
    variableIndices() {
        return this.#indices.clone();
    }
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

},{}],"hQbVJ":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bErLg":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}]},["1prd0"], null, "parcelRequire95bc")

//# sourceMappingURL=worker.a3722741.js.map
