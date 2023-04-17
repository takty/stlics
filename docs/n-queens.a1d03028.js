// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/problem/element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Element = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _index = /*#__PURE__*/new WeakMap();
var _name = /*#__PURE__*/new WeakMap();
/**
 * The common class of variables and constraints.
 *
 * @author Takuto Yanagida
 * @version 2022-08-15
 */
var Element = /*#__PURE__*/function () {
  function Element() {
    _classCallCheck(this, Element);
    _classPrivateFieldInitSpec(this, _index, {
      writable: true,
      value: -1
    });
    _classPrivateFieldInitSpec(this, _name, {
      writable: true,
      value: ''
    });
    /**
     * It is used when the user wishes to associate an arbitrary object with each element.
     */
    _defineProperty(this, "userObject", null);
    /**
     * Used when the solver wants to associate an arbitrary object with each element.
     */
    _defineProperty(this, "solverObject", null);
  }
  _createClass(Element, [{
    key: "setIndex",
    value:
    // Called only from Problem.
    function setIndex(index) {
      _classPrivateFieldSet(this, _index, index);
    }

    /**
     * Sets the name.
     *
     * @param name String representing the name.
     */
  }, {
    key: "setName",
    value: function setName(name) {
      _classPrivateFieldSet(this, _name, name);
    }

    /**
     * Get the index on the owned problem.
     * Each variable and constraint is assigned a serial number as an index, which is used to access it through the problem.
     *
     * @return Integer value representing the index.
     */
  }, {
    key: "index",
    value: function index() {
      return _classPrivateFieldGet(this, _index);
    }

    /**
     * Gets the name.
     *
     * @return String representing the name.
     */
  }, {
    key: "name",
    value: function name() {
      return _classPrivateFieldGet(this, _name);
    }
  }]);
  return Element;
}();
exports.Element = Element;
},{}],"../src/problem/variable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Variable = void 0;
var _element = require("./element.js");
var _Symbol$iterator;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; } /**
                                                                                                                                                    * Class that represents a variable.
                                                                                                                                                    *
                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                    */
var _owner = /*#__PURE__*/new WeakMap();
var _dom = /*#__PURE__*/new WeakMap();
var _val = /*#__PURE__*/new WeakMap();
var _cons = /*#__PURE__*/new WeakMap();
_Symbol$iterator = Symbol.iterator;
var Variable = /*#__PURE__*/function (_Element) {
  _inherits(Variable, _Element);
  var _super = _createSuper(Variable);
  // Called only from Problem.
  function Variable(owner, d) {
    var _this;
    _classCallCheck(this, Variable);
    _this = _super.call(this);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _owner, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _dom, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _val, {
      writable: true,
      value: _classStaticPrivateFieldSpecGet(Variable, Variable, _INVALID)
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _cons, {
      writable: true,
      value: []
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _owner, owner);
    _classPrivateFieldSet(_assertThisInitialized(_this), _dom, d);
    return _this;
  }

  // Called only from Problem.
  _createClass(Variable, [{
    key: "connect",
    value: function connect(c) {
      if (this.has(c)) {
        throw new IllegalArgumentException();
      }
      _classPrivateFieldGet(this, _cons).push(c);
    }

    // Called only from Problem.
  }, {
    key: "disconnect",
    value: function disconnect(c) {
      if (!this.has(c)) {
        throw new IllegalArgumentException();
      }
      _classPrivateFieldSet(this, _cons, _classPrivateFieldGet(this, _cons).filter(function (n) {
        return n !== c;
      }));
    }

    /**
     * Assign a value.
     * @param value Value.
     */
  }, {
    key: "assign",
    value: function assign(value) {
      _classPrivateFieldSet(this, _val, value); // Do not change val_ except here.
    }

    /**
     * Sets the state of the variable to unassigned.
     */
  }, {
    key: "clear",
    value: function clear() {
      this.assign(_classStaticPrivateFieldSpecGet(Variable, Variable, _INVALID)); // Do not use the invalid value except here and below (isEmpty).
    }

    /**
     * Checks whether the value is unassigned or not.
     * @return True if unassigned.
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.value() === _classStaticPrivateFieldSpecGet(Variable, Variable, _INVALID);
    }

    /**
     * Assign the domain.
     * The variable will be in unassigned state.
     * @param d Domain to be assigned.
     */
  }, {
    key: "setDomain",
    value: function setDomain(d) {
      _classPrivateFieldSet(this, _dom, d);
      this.clear();
    }

    /**
     * Gets the problem that owns this variable.
     * @return Owner.
     */
  }, {
    key: "owner",
    value: function owner() {
      return _classPrivateFieldGet(this, _owner);
    }

    /**
     * Gets the number of associated constraints.
     * @return Number of constraints.
     */
  }, {
    key: "size",
    value: function size() {
      return _classPrivateFieldGet(this, _cons).length;
    }

    /**
     * Gets the associated constraints by specifying their indices.
     * @param index Index.
     * @return A constraint.
     */
  }, {
    key: "at",
    value: function at(index) {
      return _classPrivateFieldGet(this, _cons)[index];
    }

    /**
     * Gets the iterator of the associated constraints.
     */
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return _classPrivateFieldGet(this, _cons)[Symbol.iterator]();
    }

    /**
     * Gets the domain of the variable.
     * @return The domain.
     */
  }, {
    key: "domain",
    value: function domain() {
      return _classPrivateFieldGet(this, _dom);
    }

    /**
     * Checks whether or not the variable is associated with the specified constraint.
     * @param c A constraint.
     * @return True if associated.
     */
  }, {
    key: "has",
    value: function has(c) {
      return _classPrivateFieldGet(this, _cons).includes(c);
    }

    /**
     * Gets a string representation.
     * @return A string representation.
     */
  }, {
    key: "toString",
    value: function toString() {
      return "x".concat(this.index()).concat(this.name() === '' ? '' : "(".concat(this.name(), ")"), " = ").concat(this.isEmpty() ? '<empty>' : this.value());
    }

    /**
     * Gets the value of the variable.
     * @returnThe value of the variable.
     */
  }, {
    key: "value",
    value: function value() {
      return _classPrivateFieldGet(this, _val);
    }

    /**
     * Collects the variables connected via the associated constraints.
     * @return An array of variables
     */
  }, {
    key: "neighbors",
    value: function neighbors() {
      var vs = [];
      var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(this, _cons)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var c = _step.value;
          var _iterator2 = _createForOfIteratorHelper(c),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var v = _step2.value;
              if (v !== this) vs.push(v);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return vs;
    }
  }]);
  return Variable;
}(_element.Element);
exports.Variable = Variable;
var _INVALID = {
  writable: true,
  value: Number.MIN_VALUE
};
},{"./element.js":"../src/problem/element.js"}],"../src/problem/domain.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Domain = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * An abstract class that represents a variable domain.
 * The domain is immutable.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */
var Domain = /*#__PURE__*/function (_Symbol$iterator) {
  function Domain() {
    _classCallCheck(this, Domain);
  }
  _createClass(Domain, [{
    key: "contains",
    value:
    /**
     * Checks whether the specified value is included as an element of the domain.
     *
     * @param val A value.
     * @return True if the value is included.
     */
    function contains(val) {}

    /**
     * Gets the index of the specified value. If it does not exist, -1 is returned.
     *
     * @param val A value.
     * @return The index.
     */
  }, {
    key: "indexOf",
    value: function indexOf(val) {}

    /**
     * Gets the size of the domain, including the pruned elements.
     *
     * @return The size.
     */
  }, {
    key: "size",
    value: function size() {}

    /**
     * Gets the value at the specified index. The retrieved value may have been pruned.
     *
     * @param index An index.
     * @return The value.
     */
  }, {
    key: "at",
    value: function at(index) {}

    /**
     * Gets the iterator of the values of the domain.
     */
  }, {
    key: _Symbol$iterator,
    value: function value() {}

    /**
     * Gets an arbitrary value, regardless of whether it has been pruned or not.
     *
     * @return A value.
     */
  }, {
    key: "random",
    value: function random() {
      return this.at(Math.floor(Math.random() * this.size()));
    }
  }]);
  return Domain;
}(Symbol.iterator);
exports.Domain = Domain;
},{}],"../src/problem/domain-ranged.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomainRanged = void 0;
var _domain = require("./domain.js");
var _Symbol$iterator;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } } /**
                                                                                                                                                                                                                                                                    * A variable domain with contiguous integer elements.
                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                                                                                                    * @version 2023-04-10
                                                                                                                                                                                                                                                                    */
var _min = /*#__PURE__*/new WeakMap();
var _max = /*#__PURE__*/new WeakMap();
_Symbol$iterator = Symbol.iterator;
var DomainRanged = /*#__PURE__*/function (_Domain) {
  _inherits(DomainRanged, _Domain);
  var _super = _createSuper(DomainRanged);
  function DomainRanged(min, max) {
    var _this;
    _classCallCheck(this, DomainRanged);
    _this = _super.call(this);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _min, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _max, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _min, min | 0);
    _classPrivateFieldSet(_assertThisInitialized(_this), _max, max | 0);
    return _this;
  }

  /**
   * {@inheritDoc}
   */
  _createClass(DomainRanged, [{
    key: "contains",
    value: function contains(val) {
      return _classPrivateFieldGet(this, _min) <= val && val <= _classPrivateFieldGet(this, _max);
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "indexOf",
    value: function indexOf(val) {
      return _classPrivateFieldGet(this, _min) <= val && val <= _classPrivateFieldGet(this, _max) ? val - _classPrivateFieldGet(this, _min) : -1;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "size",
    value: function size() {
      return _classPrivateFieldGet(this, _max) - _classPrivateFieldGet(this, _min) + 1;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "at",
    value: function at(index) {
      return _classPrivateFieldGet(this, _min) + index;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: _Symbol$iterator,
    value: function value() {
      var _this2 = this;
      var val = _classPrivateFieldGet(this, _min);
      return {
        next: function next() {
          return val <= _classPrivateFieldGet(_this2, _max) ? {
            value: val++,
            done: false
          } : {
            done: true
          };
        }
      };
    }
  }]);
  return DomainRanged;
}(_domain.Domain);
exports.DomainRanged = DomainRanged;
},{"./domain.js":"../src/problem/domain.js"}],"../src/problem/domain-arbitrary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomainArbitrary = void 0;
var _domain = require("./domain.js");
var _Symbol$iterator;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } } /**
                                                                                                                                                                                                                                                                    * A variable domain with arbitrary elements.
                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                                                                                                    * @version 2023-04-10
                                                                                                                                                                                                                                                                    */
var _vals = /*#__PURE__*/new WeakMap();
_Symbol$iterator = Symbol.iterator;
var DomainArbitrary = /*#__PURE__*/function (_Domain) {
  _inherits(DomainArbitrary, _Domain);
  var _super = _createSuper(DomainArbitrary);
  function DomainArbitrary(vals) {
    var _this;
    _classCallCheck(this, DomainArbitrary);
    _this = _super.call(this);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _vals, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _vals, _toConsumableArray(vals));
    return _this;
  }

  /**
   * {@inheritDoc}
   */
  _createClass(DomainArbitrary, [{
    key: "contains",
    value: function contains(val) {
      return _classPrivateFieldGet(this, _vals).includes(val);
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "indexOf",
    value: function indexOf(val) {
      return _classPrivateFieldGet(this, _vals).indexOf(val);
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "size",
    value: function size() {
      return _classPrivateFieldGet(this, _vals).length;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "at",
    value: function at(index) {
      return _classPrivateFieldGet(this, _vals)[index];
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return _classPrivateFieldGet(this, _vals)[Symbol.iterator]();
    }
  }]);
  return DomainArbitrary;
}(_domain.Domain);
exports.DomainArbitrary = DomainArbitrary;
},{"./domain.js":"../src/problem/domain.js"}],"../src/problem/relation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Relation = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/**
 * An interface that represents the relationship between variables.
 * Use CrispRelation or FuzzyRelation class that implement this interface.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */
var Relation = /*#__PURE__*/_createClass(function Relation() {
  _classCallCheck(this, Relation);
});
exports.Relation = Relation;
},{}],"../src/problem/relation-fuzzy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FuzzyRelation = void 0;
var _relation = require("./relation.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); } /**
                                                                                                                                                                                                                      * The class represents fuzzy relationships between variables.
                                                                                                                                                                                                                      *
                                                                                                                                                                                                                      * @author Takuto Yanagida
                                                                                                                                                                                                                      * @version 2023-03-25
                                                                                                                                                                                                                      */
var FuzzyRelation = /*#__PURE__*/function (_Relation) {
  _inherits(FuzzyRelation, _Relation);
  var _super = _createSuper(FuzzyRelation);
  function FuzzyRelation() {
    _classCallCheck(this, FuzzyRelation);
    return _super.apply(this, arguments);
  }
  _createClass(FuzzyRelation, [{
    key: "satisfactionDegree",
    value:
    /**
     * Gets the satisfaction degree in this fuzzy relation.
     * @param vals Values of each variable
     * @return A satisfaction degree d (0 <= d <= 1).
     */
    function satisfactionDegree() {
      throw new Exception();
    }

    /**
     * Returns a view as a crisp relation.
     * @return A crisp relation.
     */
  }, {
    key: "asCrispRelation",
    value: function asCrispRelation() {
      return new CrispRelationView(this);
    }
  }]);
  return FuzzyRelation;
}(_relation.Relation);
exports.FuzzyRelation = FuzzyRelation;
},{"./relation.js":"../src/problem/relation.js"}],"../src/problem/constraint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constraint = void 0;
var _element = require("./element.js");
var _relationFuzzy = require("./relation-fuzzy.js");
var _Symbol$iterator;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /**
                                                                                                                                                                                                                                                                                                                                                                                               * The class represents a constraint.
                                                                                                                                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                                                                                                                                               * @author Takuto Yanagida
                                                                                                                                                                                                                                                                                                                                                                                               * @version 2023-04-11
                                                                                                                                                                                                                                                                                                                                                                                               */
_Symbol$iterator = Symbol.iterator;
var Constraint = /*#__PURE__*/function (_Element) {
  _inherits(Constraint, _Element);
  var _super = _createSuper(Constraint);
  // Called only from Problem.
  function Constraint(r) {
    var _this;
    _classCallCheck(this, Constraint);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "rel", void 0);
    _this.rel = r;
    return _this;
  }

  /**
   * Returns the crisp relation between variables.
   * @return Relation.
   */
  _createClass(Constraint, [{
    key: "crispRelation",
    value: function crispRelation() {
      return this.rel;
    }

    /**
     * Returns the fuzzy relation between variables.
     * @return Relation.
     */
  }, {
    key: "fuzzyRelation",
    value: function fuzzyRelation() {
      return this.rel;
    }

    /**
     * Returns whether this is a fuzzy constraint.
     * @return True if it is fuzzy constraint.
     */
  }, {
    key: "isFuzzy",
    value: function isFuzzy() {
      return this.rel instanceof _relationFuzzy.FuzzyRelation;
    }

    /**
     * Returns a string representation.
     * @return A string representation.
     */
  }, {
    key: "toString",
    value: function toString() {
      var s = this.satisfactionDegree();
      return "c".concat(this.index()).concat(this.name() === '' ? '' : "(".concat(this.name(), ")"), " = ").concat(s === Constraint.UNDEFINED ? 'UNDEFINED' : s);
    }

    /**
     * Returns the order of the constraint, i.e., the number of (associated) variables in the scope.
     * @return Order.
     */
  }, {
    key: "size",
    value: function size() {}

    /**
     * Gets the associated variable by specifying its index.
     * @param index Index.
     * @return A variable.
     */
  }, {
    key: "at",
    value: function at(index) {}

    /**
     * Gets the iterator of the associated variables.
     */
  }, {
    key: _Symbol$iterator,
    value: function value() {}

    /**
     * Returns whether the specified variable is associated or not.
     * @param v A variable.
     * @return True if it is associated.
     */
  }, {
    key: "has",
    value: function has(v) {}

    /**
     * Gets the index of a specified variable.
     * If not found, returns -1.
     * @param v A variable.
     * @return Index.
     */
  }, {
    key: "indexOf",
    value: function indexOf(v) {}

    /**
     * Returns the number of scope variables that have not been assigned a value.
     * @return Number of variables
     */
  }, {
    key: "emptyVariableSize",
    value: function emptyVariableSize() {}

    /**
     * Returns whether or not the satisfaction (degree) is defined.
     * Satisfaction (degree) is defined when all associated variables have values assigned to them.
     * @return True if it is defined.
     */
  }, {
    key: "isDefined",
    value: function isDefined() {}

    /**
     * Returns whether or not this constraint is satisfied.
     * @return 1 if satisfied, 0 if not, UNDEFINED if undefined
     */
  }, {
    key: "isSatisfied",
    value: function isSatisfied() {}

    /**
     * Gets the current satisfaction degree.
     * @return Degree 0 - 1, UNDEFINED if undefined.
     */
  }, {
    key: "satisfactionDegree",
    value: function satisfactionDegree() {}

    /**
     * Returns the set of constraints connected via the associated variables.
     * @return A set of constraints.
     */
  }, {
    key: "neighbors",
    value: function neighbors() {}

    /**
     * Calculates the highest consistency degree.
     * That is, it seeks the highest satisfaction degree of the possible combinations of variable assignments for a given constraint.
     * When all associated variables have been assigned values, it returns the same value as getSatisfactionDegree().
     * @return The highest consistency degree.
     */
  }, {
    key: "highestConsistencyDegree",
    value: function highestConsistencyDegree() {}

    /**
     * Calculates the lowest consistency degree.
     * That is, it seeks the lowest satisfaction degree of the possible combinations of variable assignments for a given constraint.
     * When all associated variables have been assigned values, it returns the same value as getSatisfactionDegree().
     * @return The lowest consistency degree.
     */
  }, {
    key: "lowestConsistencyDegree",
    value: function lowestConsistencyDegree() {}
  }]);
  return Constraint;
}(_element.Element);
exports.Constraint = Constraint;
/**
 * The constant indicating that the satisfaction degree is not defined.
 */
_defineProperty(Constraint, "UNDEFINED", -1);
},{"./element.js":"../src/problem/element.js","./relation-fuzzy.js":"../src/problem/relation-fuzzy.js"}],"../src/problem/constraint-1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constraint1 = void 0;
var _constraint = require("./constraint.js");
var _Symbol$iterator;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; } /**
                                                                                                                                                    * The class represents an unary constraint.
                                                                                                                                                    * The constructor is not called directly, since it is created by the Problem.
                                                                                                                                                    *
                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                    * @version 2023-04-11
                                                                                                                                                    */
var _vars = /*#__PURE__*/new WeakMap();
_Symbol$iterator = Symbol.iterator;
var Constraint1 = /*#__PURE__*/function (_Constraint) {
  _inherits(Constraint1, _Constraint);
  var _super = _createSuper(Constraint1);
  // Called only from Problem.
  function Constraint1(r, v) {
    var _this;
    _classCallCheck(this, Constraint1);
    _this = _super.call(this, r);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _vars, {
      writable: true,
      value: [null]
    });
    _classPrivateFieldGet(_assertThisInitialized(_this), _vars)[0] = v;
    return _this;
  }

  /**
   * {@inheritDoc}
   */
  _createClass(Constraint1, [{
    key: "size",
    value: function size() {
      return 1;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "at",
    value: function at(index) {
      if (index === 0) return _classPrivateFieldGet(this, _vars)[0];
      throw new IndexOutOfBoundsException();
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return _classPrivateFieldGet(this, _vars)[Symbol.iterator]();
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "has",
    value: function has(v) {
      return v === _classPrivateFieldGet(this, _vars)[0];
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "indexOf",
    value: function indexOf(v) {
      return v === _classPrivateFieldGet(this, _vars)[0] ? 0 : -1;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "emptyVariableSize",
    value: function emptyVariableSize() {
      return _classPrivateFieldGet(this, _vars)[0].isEmpty() ? 1 : 0;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "isDefined",
    value: function isDefined() {
      return !_classPrivateFieldGet(this, _vars)[0].isEmpty();
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "isSatisfied",
    value: function isSatisfied() {
      if (_classPrivateFieldGet(this, _vars)[0].isEmpty()) return _constraint.Constraint.UNDEFINED;
      return this.crispRelation().isSatisfied(_classPrivateFieldGet(this, _vars)[0].value()) ? 1 : 0;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "satisfactionDegree",
    value: function satisfactionDegree() {
      if (_classPrivateFieldGet(this, _vars)[0].isEmpty()) return _constraint.Constraint.UNDEFINED;
      return this.fuzzyRelation().satisfactionDegree(_classPrivateFieldGet(this, _vars)[0].value());
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "neighbors",
    value: function neighbors() {
      var cs = [];
      var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)[0]),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var c = _step.value;
          if (c !== this) cs.push(c);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return cs;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "highestConsistencyDegree",
    value: function highestConsistencyDegree() {
      var sd = this.satisfactionDegree();
      if (sd !== _constraint.Constraint.UNDEFINED) {
        return sd;
      }
      var cd = 0;
      var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)[0].domain()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var val = _step2.value;
          var s = this.fuzzyRelation().satisfactionDegree(val);
          if (s > cd) cd = s;
          if (cd === 1) break;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return cd;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "lowestConsistencyDegree",
    value: function lowestConsistencyDegree() {
      var sd = this.satisfactionDegree();
      if (sd !== _constraint.Constraint.UNDEFINED) {
        return sd;
      }
      var cd = 1;
      var _iterator3 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)[0].domain()),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var val = _step3.value;
          var s = this.fuzzyRelation().satisfactionDegree(val);
          if (s < cd) cd = s;
          if (cd === 0) break;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return cd;
    }
  }]);
  return Constraint1;
}(_constraint.Constraint);
exports.Constraint1 = Constraint1;
},{"./constraint.js":"../src/problem/constraint.js"}],"../src/problem/constraint-2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constraint2 = void 0;
var _constraint = require("./constraint.js");
var _Symbol$iterator;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; } /**
                                                                                                                                                    * The class represents an binary constraint.
                                                                                                                                                    * The constructor is not called directly, since it is created by the Problem.
                                                                                                                                                    *
                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                    */
var _vars = /*#__PURE__*/new WeakMap();
_Symbol$iterator = Symbol.iterator;
var Constraint2 = /*#__PURE__*/function (_Constraint) {
  _inherits(Constraint2, _Constraint);
  var _super = _createSuper(Constraint2);
  // Called only from Problem.
  function Constraint2(r, v1, v2) {
    var _this;
    _classCallCheck(this, Constraint2);
    _this = _super.call(this, r);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _vars, {
      writable: true,
      value: [null, null]
    });
    _classPrivateFieldGet(_assertThisInitialized(_this), _vars)[0] = v1;
    _classPrivateFieldGet(_assertThisInitialized(_this), _vars)[1] = v2;
    return _this;
  }

  /**
   * {@inheritDoc}
   */
  _createClass(Constraint2, [{
    key: "size",
    value: function size() {
      return 2;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "at",
    value: function at(index) {
      if (index === 0) return _classPrivateFieldGet(this, _vars)[0];
      if (index === 1) return _classPrivateFieldGet(this, _vars)[1];
      throw new IndexOutOfBoundsException();
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return _classPrivateFieldGet(this, _vars)[Symbol.iterator]();
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "has",
    value: function has(v) {
      return _classPrivateFieldGet(this, _vars)[0] === v || _classPrivateFieldGet(this, _vars)[1] === v;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "indexOf",
    value: function indexOf(v) {
      if (v === _classPrivateFieldGet(this, _vars)[0]) return 0;
      if (v === _classPrivateFieldGet(this, _vars)[1]) return 1;
      return -1;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "emptyVariableSize",
    value: function emptyVariableSize() {
      var sum = 0;
      if (_classPrivateFieldGet(this, _vars)[0].isEmpty()) ++sum;
      if (_classPrivateFieldGet(this, _vars)[1].isEmpty()) ++sum;
      return sum;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "isDefined",
    value: function isDefined() {
      return !_classPrivateFieldGet(this, _vars)[0].isEmpty() && !_classPrivateFieldGet(this, _vars)[1].isEmpty();
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "isSatisfied",
    value: function isSatisfied() {
      if (_classPrivateFieldGet(this, _vars)[0].isEmpty() || _classPrivateFieldGet(this, _vars)[1].isEmpty()) return _constraint.Constraint.UNDEFINED;
      return this.crispRelation().isSatisfied(_classPrivateFieldGet(this, _vars)[0].value(), _classPrivateFieldGet(this, _vars)[1].value()) ? 1 : 0;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "satisfactionDegree",
    value: function satisfactionDegree() {
      if (_classPrivateFieldGet(this, _vars)[0].isEmpty() || _classPrivateFieldGet(this, _vars)[1].isEmpty()) return _constraint.Constraint.UNDEFINED;
      return this.fuzzyRelation().satisfactionDegree(_classPrivateFieldGet(this, _vars)[0].value(), _classPrivateFieldGet(this, _vars)[1].value());
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "neighbors",
    value: function neighbors() {
      var cs = [];
      var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)[0]),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var c = _step.value;
          if (c !== this) cs.push(c);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)[1]),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _c = _step2.value;
          if (_c !== this) cs.push(_c);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return cs;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "highestConsistencyDegree",
    value: function highestConsistencyDegree() {
      var sd = this.satisfactionDegree();
      if (sd !== _constraint.Constraint.UNDEFINED) {
        return sd;
      }
      var cd = 0;
      var val1 = _classPrivateFieldGet(this, _vars)[0].value();
      var val2 = _classPrivateFieldGet(this, _vars)[1].value();
      var d1 = _classPrivateFieldGet(this, _vars)[0].domain();
      var d2 = _classPrivateFieldGet(this, _vars)[1].domain();
      if (_classPrivateFieldGet(this, _vars)[0].isEmpty() && !_classPrivateFieldGet(this, _vars)[1].isEmpty()) {
        var _iterator3 = _createForOfIteratorHelper(d1),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _val = _step3.value;
            var s = this.fuzzyRelation().satisfactionDegree(_val, val2);
            if (s > cd) cd = s;
            if (cd === 1) break;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      } else if (!_classPrivateFieldGet(this, _vars)[0].isEmpty() && _classPrivateFieldGet(this, _vars)[1].isEmpty()) {
        var _iterator4 = _createForOfIteratorHelper(d2),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _val2 = _step4.value;
            var _s = this.fuzzyRelation().satisfactionDegree(val1, _val2);
            if (_s > cd) cd = _s;
            if (cd === 1) break;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      } else {
        var _iterator5 = _createForOfIteratorHelper(d1),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _val3 = _step5.value;
            var _iterator6 = _createForOfIteratorHelper(d2),
              _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var _val4 = _step6.value;
                var _s2 = this.fuzzyRelation().satisfactionDegree(_val3, _val4);
                if (_s2 > cd) cd = _s2;
                if (cd === 1) break;
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
      return cd;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "lowestConsistencyDegree",
    value: function lowestConsistencyDegree() {
      var sd = this.satisfactionDegree();
      if (sd !== _constraint.Constraint.UNDEFINED) {
        return sd;
      }
      var cd = 1;
      var val1 = _classPrivateFieldGet(this, _vars)[0].value();
      var val2 = _classPrivateFieldGet(this, _vars)[1].value();
      var d1 = _classPrivateFieldGet(this, _vars)[0].domain();
      var d2 = _classPrivateFieldGet(this, _vars)[1].domain();
      if (_classPrivateFieldGet(this, _vars)[0].isEmpty() && !_classPrivateFieldGet(this, _vars)[1].isEmpty()) {
        var _iterator7 = _createForOfIteratorHelper(d1),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _val5 = _step7.value;
            var s = this.fuzzyRelation().satisfactionDegree(_val5, val2);
            if (s < cd) cd = s;
            if (cd === 0) break;
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      } else if (!_classPrivateFieldGet(this, _vars)[0].isEmpty() && _classPrivateFieldGet(this, _vars)[1].isEmpty()) {
        var _iterator8 = _createForOfIteratorHelper(d2),
          _step8;
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var _val6 = _step8.value;
            var _s3 = this.fuzzyRelation().satisfactionDegree(val1, _val6);
            if (_s3 < cd) cd = _s3;
            if (cd === 0) break;
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      } else {
        var _iterator9 = _createForOfIteratorHelper(d1),
          _step9;
        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var _val7 = _step9.value;
            var _iterator10 = _createForOfIteratorHelper(d2),
              _step10;
            try {
              for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                var _val8 = _step10.value;
                var _s4 = this.fuzzyRelation().satisfactionDegree(_val7, _val8);
                if (_s4 < cd) cd = _s4;
                if (cd === 0) break;
              }
            } catch (err) {
              _iterator10.e(err);
            } finally {
              _iterator10.f();
            }
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      }
      return cd;
    }
  }]);
  return Constraint2;
}(_constraint.Constraint);
exports.Constraint2 = Constraint2;
},{"./constraint.js":"../src/problem/constraint.js"}],"../src/problem/constraint-3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constraint3 = void 0;
var _constraint = require("./constraint.js");
var _Symbol$iterator;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; } /**
                                                                                                                                                    * The class represents an 3-ary constraint.
                                                                                                                                                    * The constructor is not called directly, since it is created by the Problem.
                                                                                                                                                    *
                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                    * @version 2023-04-11
                                                                                                                                                    */
var _vars = /*#__PURE__*/new WeakMap();
_Symbol$iterator = Symbol.iterator;
var Constraint3 = /*#__PURE__*/function (_Constraint) {
  _inherits(Constraint3, _Constraint);
  var _super = _createSuper(Constraint3);
  // Called only from Problem.
  function Constraint3(r, v1, v2, v3) {
    var _this;
    _classCallCheck(this, Constraint3);
    _this = _super.call(this, r);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _vars, {
      writable: true,
      value: [null, null, null]
    });
    _classPrivateFieldGet(_assertThisInitialized(_this), _vars)[0] = v1;
    _classPrivateFieldGet(_assertThisInitialized(_this), _vars)[1] = v2;
    _classPrivateFieldGet(_assertThisInitialized(_this), _vars)[2] = v3;
    return _this;
  }

  /**
   * {@inheritDoc}
   */
  _createClass(Constraint3, [{
    key: "size",
    value: function size() {
      return 3;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "at",
    value: function at(index) {
      if (index === 0) return _classPrivateFieldGet(this, _vars)[0];
      if (index === 1) return _classPrivateFieldGet(this, _vars)[1];
      if (index === 2) return _classPrivateFieldGet(this, _vars)[2];
      throw new IndexOutOfBoundsException();
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return _classPrivateFieldGet(this, _vars)[Symbol.iterator]();
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "has",
    value: function has(v) {
      return _classPrivateFieldGet(this, _vars)[0] === v || _classPrivateFieldGet(this, _vars)[1] === v || _classPrivateFieldGet(this, _vars)[2] === v;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "indexOf",
    value: function indexOf(v) {
      if (v === _classPrivateFieldGet(this, _vars)[0]) return 0;
      if (v === _classPrivateFieldGet(this, _vars)[1]) return 1;
      if (v === _classPrivateFieldGet(this, _vars)[2]) return 2;
      return -1;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "emptyVariableSize",
    value: function emptyVariableSize() {
      var sum = 0;
      if (_classPrivateFieldGet(this, _vars)[0].isEmpty()) ++sum;
      if (_classPrivateFieldGet(this, _vars)[1].isEmpty()) ++sum;
      if (_classPrivateFieldGet(this, _vars)[2].isEmpty()) ++sum;
      return sum;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "isDefined",
    value: function isDefined() {
      return !_classPrivateFieldGet(this, _vars)[0].isEmpty() && !_classPrivateFieldGet(this, _vars)[1].isEmpty() && !_classPrivateFieldGet(this, _vars)[2].isEmpty();
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "isSatisfied",
    value: function isSatisfied() {
      if (_classPrivateFieldGet(this, _vars)[0].isEmpty() || _classPrivateFieldGet(this, _vars)[1].isEmpty() || _classPrivateFieldGet(this, _vars)[2].isEmpty()) return -1;
      return this.crispRelation().isSatisfied(_classPrivateFieldGet(this, _vars)[0].value(), _classPrivateFieldGet(this, _vars)[1].value(), _classPrivateFieldGet(this, _vars)[2].value()) ? 1 : 0;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "satisfactionDegree",
    value: function satisfactionDegree() {
      if (_classPrivateFieldGet(this, _vars)[0].isEmpty() || _classPrivateFieldGet(this, _vars)[1].isEmpty() || _classPrivateFieldGet(this, _vars)[2].isEmpty()) return _constraint.Constraint.UNDEFINED;
      return this.fuzzyRelation().satisfactionDegree(_classPrivateFieldGet(this, _vars)[0].value(), _classPrivateFieldGet(this, _vars)[1].value(), _classPrivateFieldGet(this, _vars)[2].value());
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "neighbors",
    value: function neighbors() {
      var cs = [];
      var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)[0]),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var c = _step.value;
          if (c !== this) cs.push(c);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)[1]),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _c = _step2.value;
          if (_c !== this) cs.push(_c);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)[2]),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _c2 = _step3.value;
          if (_c2 !== this) cs.push(_c2);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return cs;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "highestConsistencyDegree",
    value: function highestConsistencyDegree() {
      var sd = this.satisfactionDegree();
      if (sd !== _constraint.Constraint.UNDEFINED) {
        return sd;
      }
      var cd = 1;
      var val1 = _classPrivateFieldGet(this, _vars)[0].value();
      var val2 = _classPrivateFieldGet(this, _vars)[1].value();
      var val3 = _classPrivateFieldGet(this, _vars)[2].value();
      var d1 = _classPrivateFieldGet(this, _vars)[0].domain();
      var d2 = _classPrivateFieldGet(this, _vars)[1].domain();
      var d3 = _classPrivateFieldGet(this, _vars)[2].domain();
      if (_classPrivateFieldGet(this, _vars)[0].isEmpty() && !_classPrivateFieldGet(this, _vars)[1].isEmpty() && !_classPrivateFieldGet(this, _vars)[2].isEmpty()) {
        var _iterator4 = _createForOfIteratorHelper(d1),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _val = _step4.value;
            var s = this.fuzzyRelation().satisfactionDegree(_val, val2, val3);
            if (s > cd) cd = s;
            if (cd === 1) break;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      } else if (!_classPrivateFieldGet(this, _vars)[0].isEmpty() && _classPrivateFieldGet(this, _vars)[1].isEmpty() && !_classPrivateFieldGet(this, _vars)[2].isEmpty()) {
        var _iterator5 = _createForOfIteratorHelper(d2),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _val2 = _step5.value;
            var _s = this.fuzzyRelation().satisfactionDegree(val1, _val2, val3);
            if (_s > cd) cd = _s;
            if (cd === 1) break;
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      } else if (!_classPrivateFieldGet(this, _vars)[0].isEmpty() && !_classPrivateFieldGet(this, _vars)[1].isEmpty() && _classPrivateFieldGet(this, _vars)[2].isEmpty()) {
        var _iterator6 = _createForOfIteratorHelper(d3),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _val3 = _step6.value;
            var _s2 = this.fuzzyRelation().satisfactionDegree(val1, val2, _val3);
            if (_s2 > cd) cd = _s2;
            if (cd === 1) break;
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      } else if (_classPrivateFieldGet(this, _vars)[0].isEmpty() && _classPrivateFieldGet(this, _vars)[1].isEmpty() && !_classPrivateFieldGet(this, _vars)[2].isEmpty()) {
        var _iterator7 = _createForOfIteratorHelper(d1),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _val4 = _step7.value;
            var _iterator8 = _createForOfIteratorHelper(d2),
              _step8;
            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var _val5 = _step8.value;
                var _s3 = this.fuzzyRelation().satisfactionDegree(_val4, _val5, val3);
                if (_s3 > cd) cd = _s3;
                if (cd === 1) break;
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      } else if (_classPrivateFieldGet(this, _vars)[0].isEmpty() && !_classPrivateFieldGet(this, _vars)[1].isEmpty() && _classPrivateFieldGet(this, _vars)[2].isEmpty()) {
        var _iterator9 = _createForOfIteratorHelper(d1),
          _step9;
        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var _val6 = _step9.value;
            var _iterator10 = _createForOfIteratorHelper(d3),
              _step10;
            try {
              for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                var _val7 = _step10.value;
                var _s4 = this.fuzzyRelation().satisfactionDegree(_val6, val2, _val7);
                if (_s4 > cd) cd = _s4;
                if (cd === 1) break;
              }
            } catch (err) {
              _iterator10.e(err);
            } finally {
              _iterator10.f();
            }
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      } else if (!_classPrivateFieldGet(this, _vars)[0].isEmpty() && _classPrivateFieldGet(this, _vars)[1].isEmpty() && _classPrivateFieldGet(this, _vars)[2].isEmpty()) {
        var _iterator11 = _createForOfIteratorHelper(d2),
          _step11;
        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var _val8 = _step11.value;
            var _iterator12 = _createForOfIteratorHelper(d3),
              _step12;
            try {
              for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                var _val9 = _step12.value;
                var _s5 = this.fuzzyRelation().satisfactionDegree(val1, _val8, _val9);
                if (_s5 > cd) cd = _s5;
                if (cd === 1) break;
              }
            } catch (err) {
              _iterator12.e(err);
            } finally {
              _iterator12.f();
            }
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }
      } else {
        var _iterator13 = _createForOfIteratorHelper(d1),
          _step13;
        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var _val10 = _step13.value;
            var _iterator14 = _createForOfIteratorHelper(d2),
              _step14;
            try {
              for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
                var _val11 = _step14.value;
                var _iterator15 = _createForOfIteratorHelper(d3),
                  _step15;
                try {
                  for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                    var _val12 = _step15.value;
                    var _s6 = this.fuzzyRelation().satisfactionDegree(_val10, _val11, _val12);
                    if (_s6 > cd) cd = _s6;
                    if (cd === 1) break;
                  }
                } catch (err) {
                  _iterator15.e(err);
                } finally {
                  _iterator15.f();
                }
              }
            } catch (err) {
              _iterator14.e(err);
            } finally {
              _iterator14.f();
            }
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
      }
      return cd;
    }

    /**
     * {@inheritDoc}
     */
  }, {
    key: "lowestConsistencyDegree",
    value: function lowestConsistencyDegree() {
      var sd = this.satisfactionDegree();
      if (sd !== _constraint.Constraint.UNDEFINED) {
        return sd;
      }
      var cd = 1;
      var val1 = _classPrivateFieldGet(this, _vars)[0].value();
      var val2 = _classPrivateFieldGet(this, _vars)[1].value();
      var val3 = _classPrivateFieldGet(this, _vars)[2].value();
      var d1 = _classPrivateFieldGet(this, _vars)[0].domain();
      var d2 = _classPrivateFieldGet(this, _vars)[1].domain();
      var d3 = _classPrivateFieldGet(this, _vars)[2].domain();
      if (_classPrivateFieldGet(this, _vars)[0].isEmpty() && !_classPrivateFieldGet(this, _vars)[1].isEmpty() && !_classPrivateFieldGet(this, _vars)[2].isEmpty()) {
        var _iterator16 = _createForOfIteratorHelper(d1),
          _step16;
        try {
          for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
            var _val13 = _step16.value;
            var s = this.fuzzyRelation().satisfactionDegree(_val13, val2, val3);
            if (s < cd) cd = s;
            if (cd === 0) break;
          }
        } catch (err) {
          _iterator16.e(err);
        } finally {
          _iterator16.f();
        }
      } else if (!_classPrivateFieldGet(this, _vars)[0].isEmpty() && _classPrivateFieldGet(this, _vars)[1].isEmpty() && !_classPrivateFieldGet(this, _vars)[2].isEmpty()) {
        var _iterator17 = _createForOfIteratorHelper(d2),
          _step17;
        try {
          for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
            var _val14 = _step17.value;
            var _s7 = this.fuzzyRelation().satisfactionDegree(val1, _val14, val3);
            if (_s7 < cd) cd = _s7;
            if (cd === 0) break;
          }
        } catch (err) {
          _iterator17.e(err);
        } finally {
          _iterator17.f();
        }
      } else if (!_classPrivateFieldGet(this, _vars)[0].isEmpty() && !_classPrivateFieldGet(this, _vars)[1].isEmpty() && _classPrivateFieldGet(this, _vars)[2].isEmpty()) {
        var _iterator18 = _createForOfIteratorHelper(d3),
          _step18;
        try {
          for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
            var _val15 = _step18.value;
            var _s8 = this.fuzzyRelation().satisfactionDegree(val1, val2, _val15);
            if (_s8 < cd) cd = _s8;
            if (cd === 0) break;
          }
        } catch (err) {
          _iterator18.e(err);
        } finally {
          _iterator18.f();
        }
      } else if (_classPrivateFieldGet(this, _vars)[0].isEmpty() && _classPrivateFieldGet(this, _vars)[1].isEmpty() && !_classPrivateFieldGet(this, _vars)[2].isEmpty()) {
        var _iterator19 = _createForOfIteratorHelper(d1),
          _step19;
        try {
          for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
            var _val16 = _step19.value;
            var _iterator20 = _createForOfIteratorHelper(d2),
              _step20;
            try {
              for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
                var _val17 = _step20.value;
                var _s9 = this.fuzzyRelation().satisfactionDegree(_val16, _val17, val3);
                if (_s9 < cd) cd = _s9;
                if (cd === 0) break;
              }
            } catch (err) {
              _iterator20.e(err);
            } finally {
              _iterator20.f();
            }
          }
        } catch (err) {
          _iterator19.e(err);
        } finally {
          _iterator19.f();
        }
      } else if (_classPrivateFieldGet(this, _vars)[0].isEmpty() && !_classPrivateFieldGet(this, _vars)[1].isEmpty() && _classPrivateFieldGet(this, _vars)[2].isEmpty()) {
        var _iterator21 = _createForOfIteratorHelper(d1),
          _step21;
        try {
          for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
            var _val18 = _step21.value;
            var _iterator22 = _createForOfIteratorHelper(d3),
              _step22;
            try {
              for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
                var _val19 = _step22.value;
                var _s10 = this.fuzzyRelation().satisfactionDegree(_val18, val2, _val19);
                if (_s10 < cd) cd = _s10;
                if (cd === 0) break;
              }
            } catch (err) {
              _iterator22.e(err);
            } finally {
              _iterator22.f();
            }
          }
        } catch (err) {
          _iterator21.e(err);
        } finally {
          _iterator21.f();
        }
      } else if (!_classPrivateFieldGet(this, _vars)[0].isEmpty() && _classPrivateFieldGet(this, _vars)[1].isEmpty() && _classPrivateFieldGet(this, _vars)[2].isEmpty()) {
        var _iterator23 = _createForOfIteratorHelper(d2),
          _step23;
        try {
          for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
            var _val20 = _step23.value;
            var _iterator24 = _createForOfIteratorHelper(d3),
              _step24;
            try {
              for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
                var _val21 = _step24.value;
                var _s11 = this.fuzzyRelation().satisfactionDegree(val1, _val20, _val21);
                if (_s11 < cd) cd = _s11;
                if (cd === 0) break;
              }
            } catch (err) {
              _iterator24.e(err);
            } finally {
              _iterator24.f();
            }
          }
        } catch (err) {
          _iterator23.e(err);
        } finally {
          _iterator23.f();
        }
      } else {
        var _iterator25 = _createForOfIteratorHelper(d1),
          _step25;
        try {
          for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
            var _val22 = _step25.value;
            var _iterator26 = _createForOfIteratorHelper(d2),
              _step26;
            try {
              for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
                var _val23 = _step26.value;
                var _iterator27 = _createForOfIteratorHelper(d3),
                  _step27;
                try {
                  for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
                    var _val24 = _step27.value;
                    var _s12 = this.fuzzyRelation().satisfactionDegree(_val22, _val23, _val24);
                    if (_s12 < cd) cd = _s12;
                    if (cd === 0) break;
                  }
                } catch (err) {
                  _iterator27.e(err);
                } finally {
                  _iterator27.f();
                }
              }
            } catch (err) {
              _iterator26.e(err);
            } finally {
              _iterator26.f();
            }
          }
        } catch (err) {
          _iterator25.e(err);
        } finally {
          _iterator25.f();
        }
      }
      return cd;
    }
  }]);
  return Constraint3;
}(_constraint.Constraint);
exports.Constraint3 = Constraint3;
},{"./constraint.js":"../src/problem/constraint.js"}],"../src/problem/problem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Problem = void 0;
var _variable = require("./variable.js");
var _domainRanged = require("./domain-ranged.js");
var _domainArbitrary = require("./domain-arbitrary.js");
var _constraint = require("./constraint.js");
var _constraint2 = require("./constraint-1.js");
var _constraint3 = require("./constraint-2.js");
var _constraint4 = require("./constraint-3.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /**
                                                                                                                                                                                                                                                                                                                                                                                               * The class represents a constraint satisfaction problem.
                                                                                                                                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                                                                                                                                               * @author Takuto Yanagida
                                                                                                                                                                                                                                                                                                                                                                                               * @version 2023-04-16
                                                                                                                                                                                                                                                                                                                                                                                               */
var Problem = /*#__PURE__*/function () {
  function Problem() {
    _classCallCheck(this, Problem);
    _defineProperty(this, "_isFuzzy", false);
    _defineProperty(this, "_vars", []);
    _defineProperty(this, "_cons", []);
  }
  _createClass(Problem, [{
    key: "addVariable",
    value:
    // Generation Methods --------
    /**
     * Adds a variable to this problem.
     * @param Variable v A variable.
     */
    function addVariable(v) {
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
     */
  }, {
    key: "createDomain",
    value: function createDomain(args) {
      if (args.values) {
        return new _domainArbitrary.DomainArbitrary(args.values);
      } else if ('min' in args && 'max' in args) {
        return new _domainRanged.DomainRanged(args.min, args.max);
      }
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
     */
  }, {
    key: "createVariable",
    value: function createVariable(args) {
      if (args.value && !args.domain.contains(args.value)) {
        throw new Error();
      }
      var v = new _variable.Variable(this, args.domain);
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
     */
  }, {
    key: "createConstraint",
    value: function createConstraint(args) {
      var _iterator = _createForOfIteratorHelper(args.variables),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;
          if (v.owner() !== this) return null;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var c;
      if (args.variables.length === 1) c = _construct(_constraint2.Constraint1, [args.relation].concat(_toConsumableArray(args.variables)));else if (args.variables.length === 2) c = _construct(_constraint3.Constraint2, [args.relation].concat(_toConsumableArray(args.variables)));else if (args.variables.length === 3) c = _construct(_constraint4.Constraint3, [args.relation].concat(_toConsumableArray(args.variables)));else c = new ConstraintN(args.relation, args.variables);
      c.setIndex(this._cons.length);
      this._cons.push(c);
      var _iterator2 = _createForOfIteratorHelper(args.variables),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _v = _step2.value;
          _v.connect(c);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (c.isFuzzy()) this._isFuzzy = true;
      if (args.name) c.setName(args.name);
      return c;
    }

    //  Modification Methods --------

    /**
     * Remove the constraint.
     * @param c Constraints to be removed.
     */
  }, {
    key: "removeConstraint",
    value: function removeConstraint(c) {
      var index = this._cons.indexOf(c);
      this._cons.remove(c);
      for (var i = index; i < this._cons.length; ++i) {
        this._cons[i].setIndex(i);
      }
      var _iterator3 = _createForOfIteratorHelper(c),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var v = _step3.value;
          v.disconnect(c);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      this._isFuzzy = false;
      var _iterator4 = _createForOfIteratorHelper(this._cons),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _c = _step4.value;
          if (_c.isFuzzy()) {
            this._isFuzzy = true;
            break;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }

    /**
     * Changes the status of all variables to unassigned.
     */
  }, {
    key: "clearAllVariables",
    value: function clearAllVariables() {
      var _iterator5 = _createForOfIteratorHelper(this._vars),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var v = _step5.value;
          v.clear();
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }

    /**
     * Reverse the order of variables.
     * The index of each variable is reassigned.
     */
  }, {
    key: "reverseVariables",
    value: function reverseVariables() {
      this._vars.reverse();
      for (var i = 0; i < this._vars.length; ++i) {
        this._vars[i].setIndex(i);
      }
    }

    /**
     * Sorts variables using a specified comparator.
     * The index of each variable is reassigned.
     * @param comparator A comparator.
     */
  }, {
    key: "sortVariables",
    value: function sortVariables(comparator) {
      this._vars.sort(comparator);
      for (var i = 0; i < this._vars.length; ++i) {
        this._vars[i].setIndex(i);
      }
    }

    // Methods for Variables --------

    /**
     * Returns the number of variables in the problem.
     * @return Number of variables
     */
  }, {
    key: "variableSize",
    value: function variableSize() {
      return this._vars.length;
    }

    /**
     * Returns a variable by index.
     * @param index Index (0 <= index < getVariableSize()).
     * @return A variable
     */
  }, {
    key: "variableAt",
    value: function variableAt(index) {
      return this._vars[index];
    }

    /**
     * Returns a variable by name.
     * @param name Name.
     * @return A variable.
     */
  }, {
    key: "variableOf",
    value: function variableOf(name) {
      var _iterator6 = _createForOfIteratorHelper(this._vars),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var v = _step6.value;
          if (v.name() === name) return v;
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return null;
    }

    /**
     * Returns whether the variable is contained or not.
     * @param v A variable.
     * @return True if contained.
     */
  }, {
    key: "hasVariable",
    value: function hasVariable(v) {
      return this._vars.includes(v);
    }

    /**
     * Returns the list of variables.
     * The returned list is not allowed to be modified.
     * @return The variable list.
     */
  }, {
    key: "variables",
    value: function variables() {
      return this._vars;
    }

    // Methods for Constraints --------

    /**
     * Gets the number of constraints in the problem.
     * @return Number of constraints
     */
  }, {
    key: "constraintSize",
    value: function constraintSize() {
      return this._cons.length;
    }

    /**
     * Returns a constraint with an index.
     * @param index Index (0 <= index < constraintSize()).
     * @return A constraint.
     */
  }, {
    key: "constraintAt",
    value: function constraintAt(index) {
      return this._cons[index];
    }

    /**
     * Returns a constraint by name.
     * @param name Name.
     * @return A constraint.
     */
  }, {
    key: "constraintOf",
    value: function constraintOf(name) {
      var _iterator7 = _createForOfIteratorHelper(this._cons),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var c = _step7.value;
          if (c.name() === name) return c;
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      return null;
    }

    /**
     * Returns whether the constraint is contained or not.
     * @param c A constraint
     * @return True if contained.
     */
  }, {
    key: "hasConstraint",
    value: function hasConstraint(c) {
      return this._cons.includes(c);
    }

    /**
     * Returns the list of constraint.
     * The returned list is not allowed to be modified.
     * @return The constraint list.
     */
  }, {
    key: "constraints",
    value: function constraints() {
      return this._cons;
    }

    /**
     * Gets the constraints that exist between the specified variables.
     * Returns an empty array if no constraints exist.
     * If there are multiple constraints between two variables (including the case of n-ary constraints (2 < n)), they will be included in the return array.
     * @param v1 Variable 1
     * @param v2 Variable 2
     * @return Constraints.
     */
  }, {
    key: "constraintsBetween",
    value: function constraintsBetween(v1, v2) {
      var cs = [];
      var _iterator8 = _createForOfIteratorHelper(v1),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var c = _step8.value;
          if (c.has(v2)) cs.push(c);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      return cs;
    }

    /**
     * Finds the set of worst satisfiable constraints in a fuzzy constraint satisfaction problem.
     * @return Array of constraints and worst satisfaction degree.
     */
  }, {
    key: "constraintsWithWorstSatisfactionDegree",
    value: function constraintsWithWorstSatisfactionDegree() {
      var cs = [];
      var cur = 1;
      var _iterator9 = _createForOfIteratorHelper(this._cons),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var c = _step9.value;
          var s = c.satisfactionDegree();
          if (s < cur) {
            cur = s;
            cs.length = 0;
            cs.push(c);
          } else if (s - cur < Number.MIN_VALUE * 10) {
            cs.push(c);
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
      return [cs, cur];
    }

    // State acquisition methods --------

    /**
     * Returns the worst satisfaction degree for the constraints contained in the fuzzy constraint satisfaction problem.
     * If the degree cannot be determined because the variable has not yet been assigned a value or for some other reason, -1 is returned.
     * @return Worst satisfaction degree.
     */
  }, {
    key: "worstSatisfactionDegree",
    value: function worstSatisfactionDegree() {
      var cs = 1;
      var _iterator10 = _createForOfIteratorHelper(this._cons),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var c = _step10.value;
          var s = c.satisfactionDegree();
          if (s === _constraint.Constraint.UNDEFINED) return _constraint.Constraint.UNDEFINED;
          if (s < cs) cs = s;
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
      return cs;
    }

    /**
     * Gets the average of satisfaction degrees of the fuzzy constraints.
     * @return Average of satisfaction degrees.
     */
  }, {
    key: "averageSatisfactionDegree",
    value: function averageSatisfactionDegree() {
      var ave = 0;
      var _iterator11 = _createForOfIteratorHelper(this._cons),
        _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var c = _step11.value;
          ave += c.satisfactionDegree();
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
      ave = ave / this._cons.length;
      return ave;
    }

    /**
     * Returns the number of variables in the problem that have not been assigned a value.
     * @return Number of variables with no value assigned.
     */
  }, {
    key: "emptyVariableSize",
    value: function emptyVariableSize() {
      var num = 0;
      var _iterator12 = _createForOfIteratorHelper(this._vars),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var v = _step12.value;
          if (v.isEmpty()) num++;
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
      return num;
    }

    /**
     * Gets the constraint density (number of constraints/number of variables).
     * @return Constraint density.
     */
  }, {
    key: "constraintDensity",
    value: function constraintDensity() {
      return this.constraintSize() / this.variableSize();
    }

    /**
     * Returns whether the constraint satisfaction problem has any variables with empty domain.
     * @return True if it exists.
     */
  }, {
    key: "hasEmptyDomain",
    value: function hasEmptyDomain() {
      var _iterator13 = _createForOfIteratorHelper(this._vars),
        _step13;
      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var v = _step13.value;
          if (v.domain().size() === 0) return true;
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
      return false;
    }

    /**
     * Returns whether the problem is a fuzzy constraint satisfaction problem, i.e., whether it contains fuzzy constraints.
     * @return True if it is a fuzzy constraint satisfaction problem.
     */
  }, {
    key: "isFuzzy",
    value: function isFuzzy() {
      return this._isFuzzy;
    }
  }]);
  return Problem;
}();
exports.Problem = Problem;
},{"./variable.js":"../src/problem/variable.js","./domain-ranged.js":"../src/problem/domain-ranged.js","./domain-arbitrary.js":"../src/problem/domain-arbitrary.js","./constraint.js":"../src/problem/constraint.js","./constraint-1.js":"../src/problem/constraint-1.js","./constraint-2.js":"../src/problem/constraint-2.js","./constraint-3.js":"../src/problem/constraint-3.js"}],"../src/problem/problem-crisp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrispProblem = void 0;
var _problem = require("./problem.js");
var _relationFuzzy = require("./relation-fuzzy.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); } /**
                                                                                                                                                                                                                      * The class represents a crisp constraint satisfaction problem.
                                                                                                                                                                                                                      *
                                                                                                                                                                                                                      * @author Takuto Yanagida
                                                                                                                                                                                                                      * @version 2023-04-16
                                                                                                                                                                                                                      */
var CrispProblem = /*#__PURE__*/function (_Problem) {
  _inherits(CrispProblem, _Problem);
  var _super = _createSuper(CrispProblem);
  function CrispProblem() {
    _classCallCheck(this, CrispProblem);
    return _super.apply(this, arguments);
  }
  _createClass(CrispProblem, [{
    key: "createConstraint",
    value:
    /**
     * Generates a crisp constraint.
     * @param Array args {
     *   @type string   'name'      Display name.
     *   @type Array    'variables' Variables.
     *   @type Relation 'relation'  A relation.
     * }
     * @return A constraint.
     */
    function createConstraint(args) {
      if (args.relation instanceof _relationFuzzy.FuzzyRelation) throw new Error();
      return _get(_getPrototypeOf(CrispProblem.prototype), "createConstraint", this).call(this, args);
    }

    /**
     * Returns whether the problem is a fuzzy constraint satisfaction problem, i.e., whether it contains fuzzy constraints.
     * @return Always returns false.
     */
  }, {
    key: "isFuzzy",
    value: function isFuzzy() {
      return false;
    }

    /**
     * Returns the rate of constraints that are satisfied out of all constraints.
     * @return Rate of satisfied constraints.
     */
  }, {
    key: "satisfiedConstraintRate",
    value: function satisfiedConstraintRate() {
      return this.satisfiedConstraintSize() / this._cons.length;
    }

    /**
     * Returns the number of satisfied constraints.
     * Undefined constraints are ignored.
     * @return Number of satisfied constraints.
     */
  }, {
    key: "satisfiedConstraintSize",
    value: function satisfiedConstraintSize() {
      var count = 0;
      var _iterator = _createForOfIteratorHelper(this._cons),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var c = _step.value;
          if (c.isSatisfied() === 1) ++count;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return count;
    }

    /**
     * Returns a list of violating constraints.
     * Undefined constraints are ignored.
     * @return Array of constraints.
     */
  }, {
    key: "violatingConstraints",
    value: function violatingConstraints() {
      var cs = [];
      var _iterator2 = _createForOfIteratorHelper(this._cons),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var c = _step2.value;
          if (c.isSatisfied() === 0) cs.push(c);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return cs;
    }

    /**
     * Returns the number of violating constraints.
     * Undefined constraints are ignored.
     * @return Number of violating constraints.
     */
  }, {
    key: "violatingConstraintSize",
    value: function violatingConstraintSize() {
      var count = 0;
      var _iterator3 = _createForOfIteratorHelper(this._cons),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var c = _step3.value;
          if (c.isSatisfied() === 0) ++count;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return count;
    }
  }]);
  return CrispProblem;
}(_problem.Problem);
exports.CrispProblem = CrispProblem;
},{"./problem.js":"../src/problem/problem.js","./relation-fuzzy.js":"../src/problem/relation-fuzzy.js"}],"../src/problem/relation-crisp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrispRelation = void 0;
var _relation = require("./relation.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); } /**
                                                                                                                                                                                                                      * The class represents crisp relationships between variables.
                                                                                                                                                                                                                      *
                                                                                                                                                                                                                      * @author Takuto Yanagida
                                                                                                                                                                                                                      * @version 2023-03-25
                                                                                                                                                                                                                      */
var CrispRelation = /*#__PURE__*/function (_Relation) {
  _inherits(CrispRelation, _Relation);
  var _super = _createSuper(CrispRelation);
  function CrispRelation() {
    _classCallCheck(this, CrispRelation);
    return _super.apply(this, arguments);
  }
  _createClass(CrispRelation, [{
    key: "isSatisfied",
    value:
    /**
     * Gets whether or not the relation is satisfied in this crisp relation.
     * @param vals Values of each variable
     * @return Whether or not it is satisfied.
     */
    function isSatisfied() {
      throw new Exception();
    }

    /**
     * Returns a view as a fuzzy relation.
     * @return A fuzzy relation.
     */
  }, {
    key: "asFuzzyRelation",
    value: function asFuzzyRelation() {
      return new FuzzyRelationView(this);
    }
  }]);
  return CrispRelation;
}(_relation.Relation);
exports.CrispRelation = CrispRelation;
},{"./relation.js":"../src/problem/relation.js"}],"../src/model/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The class for models that provides a factory method to generate constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */
var Model = /*#__PURE__*/function () {
  function Model() {
    _classCallCheck(this, Model);
    _defineProperty(this, "_debug", true);
    _defineProperty(this, "_debugOutput", function (e) {
      return console.log(e);
    });
  }
  _createClass(Model, [{
    key: "createProblem",
    value:
    /**
     * Generates a constraint satisfaction problems.
     * @param p Objects to include the problem to be generated
     * @return A generated problem.
     */
    function createProblem(p) {}

    /**
     * Returns whether the generated problem is a fuzzy constraint satisfaction problem, i.e., whether it contains fuzzy constraints.
     * @return If it is a fuzzy constraint satisfaction problem, true
     */
  }, {
    key: "isFuzzy",
    value: function isFuzzy() {}

    // -------------------------------------------------------------------------

    /**
     * Sets whether to output debug strings.
     * @param boolean flag Do output if true.
     */
  }, {
    key: "setDebugMode",
    value: function setDebugMode(flag) {
      this._debug = flag;
    }

    /**
     * Sets a function that used for outputting debug strings.
     * @param function fn Function called when debug output.
     */
  }, {
    key: "setDebugOutput",
    value: function setDebugOutput(fn) {
      this._debugOutput = fn;
    }
  }, {
    key: "_debugOutput",
    value: function _debugOutput(str) {
      if (this._debug) this._debugOutput(str);
    }
  }]);
  return Model;
}();
exports.Model = Model;
},{}],"../src/model/n-queens.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.N_queens = void 0;
var _relationCrisp = require("../problem/relation-crisp.js");
var _model = require("./model.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } } /**
                                                                                                                                                                                                                                                                    * A sample implementation of the N queens problem.
                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                                                                                                                                    */
var _size = /*#__PURE__*/new WeakMap();
var N_queens = /*#__PURE__*/function (_Model) {
  _inherits(N_queens, _Model);
  var _super = _createSuper(N_queens);
  function N_queens(queenSize) {
    var _this;
    _classCallCheck(this, N_queens);
    _this = _super.call(this);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _size, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _size, queenSize);
    return _this;
  }
  _createClass(N_queens, [{
    key: "getQueenSize",
    value: function getQueenSize() {
      return _classPrivateFieldGet(this, _size);
    }
  }, {
    key: "setQueenSize",
    value: function setQueenSize(size) {
      _classPrivateFieldSet(this, _size, size);
    }
  }, {
    key: "isFuzzy",
    value: function isFuzzy() {
      return false;
    }
  }, {
    key: "createProblem",
    value: function createProblem(p) {
      var v = [];
      for (var i = 0; i < _classPrivateFieldGet(this, _size); ++i) {
        v.push(p.createVariable({
          name: "Queen ".concat(i),
          domain: p.createDomain({
            min: 1,
            max: _classPrivateFieldGet(this, _size)
          }),
          value: 1
        }));
      }
      for (var _i = 0; _i < _classPrivateFieldGet(this, _size); ++_i) {
        for (var j = _i + 1; j < _classPrivateFieldGet(this, _size); ++j) {
          p.createConstraint({
            relation: new CrispQueenRelation(_i, j),
            variables: [v[_i], v[j]]
          });
        }
      }
      return p;
    }
  }, {
    key: "printResult",
    value: function printResult(p) {
      for (var y = 0; y < _classPrivateFieldGet(this, _size); ++y) {
        var l = '';
        if (p.variableAt(y).isEmpty()) {
          for (var x = 0; x < _classPrivateFieldGet(this, _size); ++x) {
            l += '- ';
          }
        } else {
          for (var _x = 0; _x < _classPrivateFieldGet(this, _size); ++_x) {
            if (p.variableAt(y).value() - 1 === _x) {
              l += 'o ';
            } else {
              l += '- ';
            }
          }
        }
        this._debugOutput(l);
      }
    }
  }]);
  return N_queens;
}(_model.Model);
exports.N_queens = N_queens;
var _dist = /*#__PURE__*/new WeakMap();
var CrispQueenRelation = /*#__PURE__*/function (_CrispRelation) {
  _inherits(CrispQueenRelation, _CrispRelation);
  var _super2 = _createSuper(CrispQueenRelation);
  function CrispQueenRelation(i, j) {
    var _this2;
    _classCallCheck(this, CrispQueenRelation);
    _this2 = _super2.call(this);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this2), _dist, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(_assertThisInitialized(_this2), _dist, j - i);
    return _this2;
  }
  _createClass(CrispQueenRelation, [{
    key: "isSatisfied",
    value: function isSatisfied() {
      for (var _len = arguments.length, vs = new Array(_len), _key = 0; _key < _len; _key++) {
        vs[_key] = arguments[_key];
      }
      var v1 = vs[0],
        v2 = vs[1];
      if (v1 !== v2 && v1 !== v2 + _classPrivateFieldGet(this, _dist) && v1 !== v2 - _classPrivateFieldGet(this, _dist)) return true;
      return false;
    }
  }]);
  return CrispQueenRelation;
}(_relationCrisp.CrispRelation);
},{"../problem/relation-crisp.js":"../src/problem/relation-crisp.js","./model.js":"../src/model/model.js"}],"../src/util/assignment.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Assignment = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _variable = /*#__PURE__*/new WeakMap();
var _value = /*#__PURE__*/new WeakMap();
/**
 * The class represents a pair of variables and the values to be assigned to them.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */
var Assignment = /*#__PURE__*/function () {
  function Assignment(args) {
    _classCallCheck(this, Assignment);
    _classPrivateFieldInitSpec(this, _variable, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _value, {
      writable: true,
      value: void 0
    });
    if (args.assignment) {
      _classPrivateFieldSet(this, _variable, args.assignment.variable());
      _classPrivateFieldSet(this, _value, args.assignment.value());
    } else if (args.variable) {
      var _args$value;
      _classPrivateFieldSet(this, _variable, args.variable);
      _classPrivateFieldSet(this, _value, (_args$value = args.value) !== null && _args$value !== void 0 ? _args$value : args.variable.value());
    }
  }

  /**
   * Assigns a value to a stored variable.
   */
  _createClass(Assignment, [{
    key: "apply",
    value: function apply() {
      _classPrivateFieldGet(this, _variable).assign(_classPrivateFieldGet(this, _value));
    }

    /**
     * Returns a string representation.
     * @return A string representation.
     */
  }, {
    key: "toString",
    value: function toString() {
      return "v".concat(_classPrivateFieldGet(this, _variable).index(), " <- ").concat(_classPrivateFieldGet(this, _value));
    }

    /**
     * Gets the value.
     * @return Value.
     */
  }, {
    key: "value",
    value: function value() {
      return _classPrivateFieldGet(this, _value);
    }

    /**
     * Gets the variable.
     * @return Variable.
     */
  }, {
    key: "variable",
    value: function variable() {
      return _classPrivateFieldGet(this, _variable);
    }
  }]);
  return Assignment;
}();
exports.Assignment = Assignment;
},{}],"../src/util/assignment-list.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssignmentList = void 0;
var _assignment = require("./assignment.js");
var _Symbol$iterator;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; } /**
                                                                                                                                                    * The class represents multiple variables and their assignments.
                                                                                                                                                    *
                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                    */
var _as = /*#__PURE__*/new WeakMap();
_Symbol$iterator = Symbol.iterator;
var AssignmentList = /*#__PURE__*/function () {
  function AssignmentList() {
    _classCallCheck(this, AssignmentList);
    _classPrivateFieldInitSpec(this, _as, {
      writable: true,
      value: []
    });
  }
  _createClass(AssignmentList, [{
    key: "setProblem",
    value: function setProblem(problem) {
      _classPrivateFieldGet(this, _as).length = 0;
      var _iterator = _createForOfIteratorHelper(problem.variables()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;
          _classPrivateFieldGet(this, _as).push(new _assignment.Assignment({
            variable: v,
            value: v.value()
          }));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "setAssignmentList",
    value: function setAssignmentList(al) {
      _classPrivateFieldGet(this, _as).length = 0;
      var _iterator2 = _createForOfIteratorHelper(al),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var a = _step2.value;
          _classPrivateFieldGet(this, _as).push(new _assignment.Assignment({
            variable: a.variable(),
            value: a.value()
          }));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "setVariables",
    value: function setVariables(vs) {
      _classPrivateFieldGet(this, _as).length = 0;
      var _iterator3 = _createForOfIteratorHelper(vs),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var v = _step3.value;
          _classPrivateFieldGet(this, _as).push(new _assignment.Assignment({
            variable: v,
            value: v.value()
          }));
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "addVariable",
    value: function addVariable(variable) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      _classPrivateFieldGet(this, _as).push(new _assignment.Assignment({
        variable: variable,
        value: value
      }));
    }
  }, {
    key: "apply",
    value: function apply() {
      var _iterator4 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _as)),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var a = _step4.value;
          a.apply();
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }

    /**
     * Remove all assignments.
     */
  }, {
    key: "clear",
    value: function clear() {
      _classPrivateFieldGet(this, _as).length = 0;
    }

    /**
     * Checks whether the list is empty or not.
     * @return True if empty.
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return _classPrivateFieldGet(this, _as).length === 0;
    }

    /**
     * Gets the number of assignments.
     * @return Number of assignments.
     */
  }, {
    key: "size",
    value: function size() {
      return _classPrivateFieldGet(this, _as).length;
    }
  }, {
    key: "differenceSize",
    value: function differenceSize() {
      var diff = 0;
      var _iterator5 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _as)),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var a = _step5.value;
          if (a.variable().value() !== a.value()) ++diff;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return diff;
    }

    /**
     * Gets the assignments by specifying their indices.
     * @param index Index.
     * @return An assignment.
     */
  }, {
    key: "at",
    value: function at(index) {
      return _classPrivateFieldGet(this, _as)[index];
    }

    /**
     * Gets the iterator of the assignments.
     */
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return _classPrivateFieldGet(this, _as)[Symbol.iterator]();
    }

    /**
     * Gets an arbitrary assignment.
     *
     * @return An assignment.
     */
  }, {
    key: "random",
    value: function random() {
      return _classPrivateFieldGet(this, _as)[Math.floor(Math.random() * _classPrivateFieldGet(this, _as).length)];
    }
  }], [{
    key: "fromVariables",
    value: function fromVariables(vs) {
      var al = new AssignmentList();
      al.setVariables(vs);
      return al;
    }
  }]);
  return AssignmentList;
}();
exports.AssignmentList = AssignmentList;
},{"./assignment.js":"../src/util/assignment.js"}],"../src/util/domain-pruner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomainPruner = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _hiddenLevels = /*#__PURE__*/new WeakMap();
var _hiddenSize = /*#__PURE__*/new WeakMap();
/**
 * This class holds the branch pruning states for a domain.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */
var DomainPruner = /*#__PURE__*/function () {
  /**
   * Generates a class that holds branch pruning states for a domain.
   * @param size Size of the corresponding domain
   */
  function DomainPruner(size) {
    _classCallCheck(this, DomainPruner);
    _classPrivateFieldInitSpec(this, _hiddenLevels, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _hiddenSize, {
      writable: true,
      value: 0
    });
    _classPrivateFieldSet(this, _hiddenLevels, new Array(size));
    _classPrivateFieldGet(this, _hiddenLevels).fill(_classStaticPrivateFieldSpecGet(DomainPruner, DomainPruner, _UNHIDDEN));
  }

  /**
   * Returns the size of the erased element.
   * @return Size of the erased element.
   */
  _createClass(DomainPruner, [{
    key: "hiddenSize",
    value: function hiddenSize() {
      return _classPrivateFieldGet(this, _hiddenSize);
    }

    /**
     * Erases the element at the specified index.
     * @param index Index.
     * @param level Level.
     */
  }, {
    key: "hide",
    value: function hide(index, level) {
      if (_classPrivateFieldGet(this, _hiddenLevels)[index] === _classStaticPrivateFieldSpecGet(DomainPruner, DomainPruner, _UNHIDDEN)) {
        var _this$hiddenSize;
        _classPrivateFieldSet(this, _hiddenSize, (_this$hiddenSize = _classPrivateFieldGet(this, _hiddenSize), ++_this$hiddenSize));
      }
      _classPrivateFieldGet(this, _hiddenLevels)[index] = level;
    }

    /**
     * Returns whether the element is empty or not.
     * Returns true if all elements have been erased.
     * @return True if empty.
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return _classPrivateFieldGet(this, _hiddenLevels).length === _classPrivateFieldGet(this, _hiddenSize);
    }

    /**
     * Returns whether or not the element at the specified index has been erased.
     * @param index Index.
     * @return True if erased.
     */
  }, {
    key: "isValueHidden",
    value: function isValueHidden(index) {
      return _classPrivateFieldGet(this, _hiddenLevels)[index] !== _classStaticPrivateFieldSpecGet(DomainPruner, DomainPruner, _UNHIDDEN);
    }

    /**
     * Restores the value that had been erased, by specifying a level.
     * @param level Level
     */
  }, {
    key: "reveal",
    value: function reveal(level) {
      for (var i = 0; i < _classPrivateFieldGet(this, _hiddenLevels).length; ++i) {
        if (_classPrivateFieldGet(this, _hiddenLevels)[i] === level) {
          var _this$hiddenSize2;
          _classPrivateFieldGet(this, _hiddenLevels)[i] = _classStaticPrivateFieldSpecGet(DomainPruner, DomainPruner, _UNHIDDEN);
          _classPrivateFieldSet(this, _hiddenSize, (_this$hiddenSize2 = _classPrivateFieldGet(this, _hiddenSize), --_this$hiddenSize2));
        }
      }
    }

    /**
     * Restores all erased values.
     */
  }, {
    key: "revealAll",
    value: function revealAll() {
      _classPrivateFieldGet(this, _hiddenLevels).fill(_classStaticPrivateFieldSpecGet(DomainPruner, DomainPruner, _UNHIDDEN));
      _classPrivateFieldSet(this, _hiddenSize, 0);
    }
  }]);
  return DomainPruner;
}();
exports.DomainPruner = DomainPruner;
var _UNHIDDEN = {
  writable: true,
  value: -1
};
},{}],"../src/solver/solver.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Solver = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
var _listener = /*#__PURE__*/new WeakMap();
/**
 * The class for solvers for finding solutions to constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */
var Solver = /*#__PURE__*/function () {
  /**
   * Generates a solver given a constraint satisfaction problem.
   * @param pro A constraint satisfaction problem.
   */
  function Solver(pro) {
    _classCallCheck(this, Solver);
    _defineProperty(this, "_debug", true);
    _defineProperty(this, "_debugOutput", function (e) {
      return console.log(e);
    });
    /**
     * The crisp/fuzzy constraint satisfaction problem solved by the solver.
     */
    _defineProperty(this, "_pro", void 0);
    /**
     *  Limit number of iterations.
     */
    _defineProperty(this, "_iterLimit", null);
    /**
     * Time limit.
     */
    _defineProperty(this, "_timeLimit", null);
    /**
     * Target 'satisfied constraint rate' or 'constraint satisfaction degree'.
     */
    _defineProperty(this, "_targetDeg", 0.8);
    /**
     * Listeners of this solver.
     */
    _classPrivateFieldInitSpec(this, _listener, {
      writable: true,
      value: []
    });
    this._pro = pro;
  }

  /**
   * Returns the name of the solver.
   * @return The name.
   */
  _createClass(Solver, [{
    key: "name",
    value: function name() {
      return '';
    }

    /**
     * Placeholder for implementing an algorithm.
     * The solve method calls this method and returns the return value of this method.
     * @return True if the algorithm succeeds,
     */
  }, {
    key: "exec",
    value: function exec() {
      return false;
    }

    /**
     * Sets and limits the maximum number of iterations for the solver's behavior.
     * After the specified number of iterations, the solver stops as a failure. The specific behavior depends on the solver.
     * @param count Maximum value; null means not set.
     */
  }, {
    key: "setIterationLimit",
    value: function setIterationLimit() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this._iterLimit = count;
    }

    /**
     * Sets a time limit on the solver's behavior.
     * If the specified time is exceeded, the solver stops as a failure. The specific behavior depends on the solver.
     * @param msec Time limit. null means not set.
     */
  }, {
    key: "setTimeLimit",
    value: function setTimeLimit() {
      var msec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this._timeLimit = msec;
    }

    /**
     * The goal to be achieved, which is the condition for stopping the solver, is set as the constraint satisfaction degree (fuzzy) or the percentage of constraints satisfied (crisp).
     * The solver stops as success if the specified percentage is reached or exceeded. The specific behavior depends on the solver.
     * @param rate Degree or rate. null indicates not set.
     */
  }, {
    key: "setTargetRate",
    value: function setTargetRate() {
      var rate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this._targetDeg = rate;
    }

    /**
     * Computes the solution to a constraint satisfaction problem.
     * The specific meaning of the return value depends on the implementation of the algorithm.
     * @return True if the algorithm succeeds
     */
  }, {
    key: "solve",
    value: function solve() {
      return this.exec();
    }
  }, {
    key: "addListener",
    value: function addListener(l) {
      _classPrivateFieldGet(this, _listener).add(l);
    }
  }, {
    key: "removeListener",
    value: function removeListener(l) {
      _classPrivateFieldGet(this, _listener).splice(_classPrivateFieldGet(this, _listener).indexOf(l), 1);
    }
  }, {
    key: "foundSolution",
    value: function foundSolution(solution, worstDegree) {
      var finish = false;
      var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(this, _listener)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var l = _step.value;
          if (l.foundSolution(solution, worstDegree)) {
            finish = true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return finish;
    }

    // -------------------------------------------------------------------------

    /**
     * Sets whether to output debug strings.
     * @param boolean flag Do output if true.
     */
  }, {
    key: "setDebugMode",
    value: function setDebugMode(flag) {
      this._debug = flag;
    }

    /**
     * Sets a function that used for outputting debug strings.
     * @param function fn Function called when debug output.
     */
  }, {
    key: "setDebugOutput",
    value: function setDebugOutput(fn) {
      this._debugOutput = fn;
    }
  }, {
    key: "_debugOutput",
    value: function _debugOutput(str) {
      if (this._debug) this._debugOutput(str);
    }
  }]);
  return Solver;
}();
exports.Solver = Solver;
},{}],"../src/solver/crisp/forward-checking.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForwardChecking = void 0;
var _assignmentList = require("../../util/assignment-list.js");
var _domainPruner = require("../../util/domain-pruner.js");
var _solver = require("../solver.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } } /**
                                                                                                                                                                                                                                                                    * This class that implements the forward checking method.
                                                                                                                                                                                                                                                                    * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
                                                                                                                                                                                                                                                                    * Searches for variable assignments that satisfy all constraints and fails if none are found.
                                                                                                                                                                                                                                                                    * Each variable must have its own domain because it hides domain elements as branch pruning.
                                                                                                                                                                                                                                                                    * Forward checking is also performed for problems with polynomial constraints.
                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                                                                                                                                    */
var _vars = /*#__PURE__*/new WeakMap();
var _sol = /*#__PURE__*/new WeakMap();
var _relCons = /*#__PURE__*/new WeakMap();
var _useMRV = /*#__PURE__*/new WeakMap();
var _iterCount = /*#__PURE__*/new WeakMap();
var _endTime = /*#__PURE__*/new WeakMap();
var _initializeRelatedConstraintTable = /*#__PURE__*/new WeakSet();
var _getConstraintsBetween = /*#__PURE__*/new WeakSet();
var _checkForward = /*#__PURE__*/new WeakSet();
var _indexOfVariableWithMRV = /*#__PURE__*/new WeakSet();
var _branch = /*#__PURE__*/new WeakSet();
var ForwardChecking = /*#__PURE__*/function (_Solver) {
  _inherits(ForwardChecking, _Solver);
  var _super = _createSuper(ForwardChecking);
  /**
   * Generates a solver given a constraint satisfaction problem.
   * @param p A problem.
   */
  function ForwardChecking(p) {
    var _this;
    _classCallCheck(this, ForwardChecking);
    _this = _super.call(this, p);
    // Searches for one variable at a time.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _branch);
    // Returns the index of the smallest domain variable.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _indexOfVariableWithMRV);
    // Checks for possible assignment to a future variable from the current variable assignment.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _checkForward);
    // Retrieves an array of constraints from a table that caches constraints between two variables.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _getConstraintsBetween);
    // Initializes a table that caches constraints between two variables.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _initializeRelatedConstraintTable);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _vars, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _sol, {
      writable: true,
      value: new _assignmentList.AssignmentList()
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _relCons, {
      writable: true,
      value: void 0
    });
    // Table to cache constraints between two variables.
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _useMRV, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _iterCount, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _endTime, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _vars, _toConsumableArray(_this._pro.variables()));
    var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(_assertThisInitialized(_this), _vars)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        v.solverObject = new _domainPruner.DomainPruner(v.domain().size());
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    _classPrivateMethodGet(_assertThisInitialized(_this), _initializeRelatedConstraintTable, _initializeRelatedConstraintTable2).call(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ForwardChecking, [{
    key: "name",
    value: function name() {
      return 'Forward Checking';
    }
  }, {
    key: "exec",
    value:
    // Do search.
    function exec() {
      _classPrivateFieldSet(this, _endTime, this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit);
      _classPrivateFieldSet(this, _iterCount, 0);
      this._pro.clearAllVariables();
      var r = _classPrivateMethodGet(this, _branch, _branch2).call(this, 0);
      var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _sol)),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var a = _step2.value;
          a.apply();
          a.variable().solverObject.revealAll();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return r;
    }

    /**
     * The settings made by this method are invalid.
     */
  }, {
    key: "setTargetRate",
    value: function setTargetRate() {
      // Do nothing.
    }

    /**
     * Specify whether to use the minimum-remaining-values (MRV) heuristic.
     * Use of MRV may increase processing time for some problems.
     * Default is false.
     * @param flag Use MRV if true.
     */
  }, {
    key: "setUsingMinimumRemainingValuesHeuristics",
    value: function setUsingMinimumRemainingValuesHeuristics(flag) {
      _classPrivateFieldSet(this, _useMRV, flag);
    }
  }]);
  return ForwardChecking;
}(_solver.Solver);
exports.ForwardChecking = ForwardChecking;
function _initializeRelatedConstraintTable2() {
  var temp = [];
  _classPrivateFieldSet(this, _relCons, []);
  for (var j = 0; j < _classPrivateFieldGet(this, _vars).length; ++j) {
    _classPrivateFieldGet(this, _relCons).push(new Array(_classPrivateFieldGet(this, _vars).length));
    for (var i = 0; i < _classPrivateFieldGet(this, _vars).length; ++i) {
      if (i < j) {
        _classPrivateFieldGet(this, _relCons)[j][i] = this._pro.constraintsBetween(_classPrivateFieldGet(this, _vars)[i], _classPrivateFieldGet(this, _vars)[j]);
      }
    }
  }
}
function _getConstraintsBetween2(i, j) {
  if (i < j) {
    return _classPrivateFieldGet(this, _relCons)[j][i];
  }
  return _classPrivateFieldGet(this, _relCons)[i][j];
}
function _checkForward2(level, currentIndex) {
  var _iterator3 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var v_i = _step3.value;
      if (!v_i.isEmpty()) continue; // If it is a past or present variable.
      var d_i = v_i.domain();
      var dc_i = v_i.solverObject;
      var cs = _classPrivateMethodGet(this, _getConstraintsBetween, _getConstraintsBetween2).call(this, currentIndex, v_i.index());
      var _iterator4 = _createForOfIteratorHelper(cs),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var c = _step4.value;
          if (c.emptyVariableSize() !== 1) continue;
          for (var k = 0, n = d_i.size(); k < n; ++k) {
            if (dc_i.isValueHidden(k)) continue;
            v_i.assign(d_i.at(k));
            if (c.isSatisfied() === 0) {
              // Do hide when in violation (not even undefined).
              dc_i.hide(k, level);
            }
          }
          v_i.clear();
          if (dc_i.isEmpty()) return false; // Failure if the domain of one of the future variables is empty.
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return true;
}
function _indexOfVariableWithMRV2() {
  var index = 0;
  var size = Number.MAX_VALUE;
  for (var i = 0; i < _classPrivateFieldGet(this, _vars).length; ++i) {
    var v = _classPrivateFieldGet(this, _vars)[i];
    if (!v.isEmpty()) continue;
    var d = v.domain();
    var s = d.size() - v.solverObject.hiddenSize();
    if (s < size) {
      size = s;
      index = i;
    }
  }
  return index;
}
function _branch2(level) {
  var _this$iterCount, _this$iterCount2;
  if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount = _classPrivateFieldGet(this, _iterCount), _this$iterCount2 = _this$iterCount++, _this$iterCount)), _this$iterCount2)) {
    // Failure if repeated a specified number.
    this._debugOutput('stop: number of iterations has reached the limit');
    return false;
  }
  if (_classPrivateFieldGet(this, _endTime) < Date.now()) {
    // Failure if time limit is exceeded.
    this._debugOutput('stop: time limit has been reached');
    return false;
  }
  if (level === this._pro.variableSize()) {
    _classPrivateFieldGet(this, _sol).setProblem(this._pro);
    return true;
  }
  var vc_index = _classPrivateFieldGet(this, _useMRV) ? _classPrivateMethodGet(this, _indexOfVariableWithMRV, _indexOfVariableWithMRV2).call(this) : level;
  var vc = _classPrivateFieldGet(this, _vars)[vc_index];
  var d = vc.domain();
  var dc = vc.solverObject;
  for (var i = 0, n = d.size(); i < n; ++i) {
    if (dc.isValueHidden(i)) continue;
    vc.assign(d.at(i));
    if (_classPrivateMethodGet(this, _checkForward, _checkForward2).call(this, level, vc_index) && _classPrivateMethodGet(this, _branch, _branch2).call(this, level + 1)) return true;
    var _iterator5 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var v = _step5.value;
        v.solverObject.reveal(level);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }
  vc.clear();
  return false;
}
},{"../../util/assignment-list.js":"../src/util/assignment-list.js","../../util/domain-pruner.js":"../src/util/domain-pruner.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/crisp/max-forward-checking.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaxForwardChecking = void 0;
var _assignmentList = require("../../util/assignment-list.js");
var _domainPruner = require("../../util/domain-pruner.js");
var _solver = require("../solver.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } } /**
                                                                                                                                                                                                                                                                    * This class that implements the forward checking method.
                                                                                                                                                                                                                                                                    * Find the solution to the problem as the maximum CSP.
                                                                                                                                                                                                                                                                    * Each variable must have its own domain because it hides domain elements as branch pruning.
                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                                                                                                                                    */
var _vars = /*#__PURE__*/new WeakMap();
var _sol = /*#__PURE__*/new WeakMap();
var _maxVioCount = /*#__PURE__*/new WeakMap();
var _vioCount = /*#__PURE__*/new WeakMap();
var _checkedCons = /*#__PURE__*/new WeakMap();
var _cons = /*#__PURE__*/new WeakMap();
var _iterCount = /*#__PURE__*/new WeakMap();
var _endTime = /*#__PURE__*/new WeakMap();
var _branch = /*#__PURE__*/new WeakSet();
var _checkForward = /*#__PURE__*/new WeakSet();
var _getAdditionalViolationCount = /*#__PURE__*/new WeakSet();
var _revise = /*#__PURE__*/new WeakSet();
var MaxForwardChecking = /*#__PURE__*/function (_Solver) {
  _inherits(MaxForwardChecking, _Solver);
  var _super = _createSuper(MaxForwardChecking);
  function MaxForwardChecking(p) {
    var _this;
    _classCallCheck(this, MaxForwardChecking);
    _this = _super.call(this, p);
    // Remove values from the domain of v1 that do not correspond to v2. That is, match v1 with v2.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _revise);
    // Find the number of constraint violations that have increased due to the current value of the variable vc.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _getAdditionalViolationCount);
    // Checks for possible assignment to a future variable from the current variable assignment.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _checkForward);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _branch);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _vars, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _sol, {
      writable: true,
      value: new _assignmentList.AssignmentList()
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _maxVioCount, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _vioCount, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _checkedCons, {
      writable: true,
      value: new Set()
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _cons, {
      writable: true,
      value: []
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _iterCount, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _endTime, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _vars, _toConsumableArray(_this._pro.variables()));
    var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(_assertThisInitialized(_this), _vars)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        v.solverObject = new _domainPruner.DomainPruner(v.domain().size());
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    _classPrivateFieldSet(_assertThisInitialized(_this), _maxVioCount, _this._pro.constraintSize());
    return _this;
  }
  _createClass(MaxForwardChecking, [{
    key: "name",
    value: function name() {
      return 'Forward Checking for Max CSPs';
    }
  }, {
    key: "exec",
    value: function exec() {
      _classPrivateFieldSet(this, _endTime, this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit);
      _classPrivateFieldSet(this, _iterCount, 0);
      this._pro.clearAllVariables();
      var r = _classPrivateMethodGet(this, _branch, _branch2).call(this, 0, 0);
      if (r) {
        this._debugOutput('stop: current degree is above the target');
      } else {
        if (this._iterLimit && this._iterLimit < _classPrivateFieldGet(this, _iterCount)) {
          this._debugOutput('stop: number of iterations has reached the limit');
        }
        if (_classPrivateFieldGet(this, _endTime) < Date.now()) {
          this._debugOutput('stop: time limit has been reached');
        }
      }
      var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _sol)),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var a = _step2.value;
          a.apply();
          a.variable().solverObject.revealAll();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return r;
    }
  }]);
  return MaxForwardChecking;
}(_solver.Solver);
exports.MaxForwardChecking = MaxForwardChecking;
function _branch2(level, vioCount) {
  var _this$iterCount, _this$iterCount2;
  if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount = _classPrivateFieldGet(this, _iterCount), _this$iterCount2 = _this$iterCount++, _this$iterCount)), _this$iterCount2)) return false; // Failure if repeated a specified number.
  if (_classPrivateFieldGet(this, _endTime) < Date.now()) return false; // Failure if time limit is exceeded.

  if (level === this._pro.variableSize()) {
    var vcs = this._pro.violatingConstraintSize();
    if (vcs < _classPrivateFieldGet(this, _maxVioCount)) {
      var _this$_targetDeg;
      _classPrivateFieldSet(this, _maxVioCount, vcs);
      _classPrivateFieldGet(this, _sol).setProblem(this._pro);
      this._debugOutput("   refreshed ".concat(_classPrivateFieldGet(this, _maxVioCount)));
      if (((_this$_targetDeg = this._targetDeg) !== null && _this$_targetDeg !== void 0 ? _this$_targetDeg : 1) <= this._pro.satisfiedConstraintRate()) return true;
    }
    return false;
  }
  var vc = _classPrivateFieldGet(this, _vars)[level];
  var dom = vc.domain();
  var dc = vc.solverObject;
  for (var i = 0; i < dom.size(); ++i) {
    if (dc.isValueHidden(i)) continue;
    vc.assign(dom.at(i));
    _classPrivateFieldSet(this, _vioCount, vioCount + _classPrivateMethodGet(this, _getAdditionalViolationCount, _getAdditionalViolationCount2).call(this, level, vc)); // for max begin
    if (_classPrivateFieldGet(this, _vioCount) > _classPrivateFieldGet(this, _maxVioCount)) continue; // for max end
    if (_classPrivateMethodGet(this, _checkForward, _checkForward2).call(this, level) && _classPrivateMethodGet(this, _branch, _branch2).call(this, level + 1, _classPrivateFieldGet(this, _vioCount))) return true;
    var _iterator3 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var v = _step3.value;
        v.solverObject.reveal(level);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  vc.clear();
  return false;
}
function _checkForward2(level) {
  var vc = _classPrivateFieldGet(this, _vars)[level];
  for (var i = level + 1; i < _classPrivateFieldGet(this, _vars).length; ++i) {
    var future = _classPrivateFieldGet(this, _vars)[i];
    _classPrivateFieldSet(this, _cons, this._pro.constraintsBetween(vc, future));
    var _iterator4 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _cons)),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var c = _step4.value;
        if (c.emptyVariableSize() !== 1) continue;
        if (_classPrivateMethodGet(this, _revise, _revise2).call(this, future, c, level)) {
          if (future.solverObject.isEmpty()) return false; // Failure if the domain of one of the future variables is empty.
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }
  return true;
}
function _getAdditionalViolationCount2(level, vc) {
  var avc = 0;
  _classPrivateFieldGet(this, _checkedCons).clear(); // Reuse.
  for (var i = 0; i < level; ++i) {
    _classPrivateFieldSet(this, _cons, this._pro.constraintsBetween(vc, _classPrivateFieldGet(this, _vars)[i]));
    var _iterator5 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _cons)),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var c = _step5.value;
        if (_classPrivateFieldGet(this, _checkedCons).has(c)) continue; // Because of the possibility of duplication in polynomial constraints
        if (c.isSatisfied() === 0) ++avc; // Neither satisfied nor undefined.
        _classPrivateFieldGet(this, _checkedCons).add(c);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }
  return avc;
}
function _revise2(v1, c, level) {
  var deleted = false;
  var dom = v1.domain();
  var dc = v1.solverObject;
  for (var i = 0; i < dom.size(); ++i) {
    if (dc.isValueHidden(i)) continue;
    v1.assign(dom.at(i));
    if (c.isSatisfied() === 0 && _classPrivateFieldGet(this, _vioCount) + 1 > _classPrivateFieldGet(this, _maxVioCount)) {
      dc.hide(i, level);
      deleted = true;
    }
  }
  return deleted;
}
},{"../../util/assignment-list.js":"../src/util/assignment-list.js","../../util/domain-pruner.js":"../src/util/domain-pruner.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/crisp/local-changes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalChanges = void 0;
var _assignmentList = require("../../util/assignment-list.js");
var _solver = require("../solver.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; } /**
                                                                                                                                                                                    * Class implements the local changes method.
                                                                                                                                                                                    *
                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                                                    */
var _iterCount = /*#__PURE__*/new WeakMap();
var _endTime = /*#__PURE__*/new WeakMap();
var _globalReturn = /*#__PURE__*/new WeakMap();
var _createNewV = /*#__PURE__*/new WeakSet();
var _isConsistent = /*#__PURE__*/new WeakSet();
var _lcValue = /*#__PURE__*/new WeakSet();
var _lcVariable = /*#__PURE__*/new WeakSet();
var _lcVariables = /*#__PURE__*/new WeakSet();
var LocalChanges = /*#__PURE__*/function (_Solver) {
  _inherits(LocalChanges, _Solver);
  var _super = _createSuper(LocalChanges);
  function LocalChanges(p) {
    var _this;
    var unassignAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    _classCallCheck(this, LocalChanges);
    _this = _super.call(this, p);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _lcVariables);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _lcVariable);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _lcValue);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _isConsistent);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _createNewV);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _iterCount, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _endTime, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _globalReturn, {
      writable: true,
      value: void 0
    });
    if (unassignAll) {
      _this._pro.clearAllVariables();
    }
    return _this;
  }
  _createClass(LocalChanges, [{
    key: "name",
    value: function name() {
      return 'Local Changes';
    }
  }, {
    key: "exec",
    value: function exec() {
      _classPrivateFieldSet(this, _endTime, this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit);
      _classPrivateFieldSet(this, _iterCount, 0);
      _classPrivateFieldSet(this, _globalReturn, false);
      if (this._pro.emptyVariableSize() === 0) {
        this._pro.clearAllVariables();
      }
      var notFixed = new Set();
      var unassigned = new Set();
      var _iterator = _createForOfIteratorHelper(this._pro.variables()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;
          (!v.isEmpty() ? notFixed : unassigned).add(v);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return _classPrivateMethodGet(this, _lcVariables, _lcVariables2).call(this, new Set(), notFixed, unassigned);
    }
  }]);
  return LocalChanges;
}(_solver.Solver);
exports.LocalChanges = LocalChanges;
function _setPlusSet(s1, s2) {
  var sn = new Set(s1);
  var _iterator2 = _createForOfIteratorHelper(s2),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var v = _step2.value;
      sn.add(v);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return sn;
}
function _setMinusSet(s1, s2) {
  var sn = new Set(s1);
  var _iterator3 = _createForOfIteratorHelper(s2),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var v = _step3.value;
      sn.delete(v);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return sn;
}
function _setPlusElement(s, e) {
  var sn = new Set(s);
  sn.add(e);
  return sn;
}
function _setMinusElement(s, e) {
  var sn = new Set(s);
  sn.delete(e);
  return sn;
}
function _createNewV2(V1_V2, v, val) {
  var newV3 = new Set();
  var cs = new Set();
  var _iterator4 = _createForOfIteratorHelper(V1_V2),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var va = _step4.value;
      var temp = this._pro.constraintsBetween(v, va);
      var _iterator6 = _createForOfIteratorHelper(temp),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var c = _step6.value;
          cs.add(c);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  var origVal = v.value(); // Save the value.
  v.assign(val);
  var _iterator5 = _createForOfIteratorHelper(cs),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _c = _step5.value;
      if (_c.isSatisfied() === 0) {
        var _iterator7 = _createForOfIteratorHelper(_c),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var vi = _step7.value;
            newV3.add(vi);
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  v.assign(origVal); // Restore the value.
  newV3.delete(v);
  return newV3;
}
function _isConsistent2(A, v, val) {
  var cs = new Set();
  var _iterator8 = _createForOfIteratorHelper(A),
    _step8;
  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var va = _step8.value;
      var temp = this._pro.constraintsBetween(v, va);
      var _iterator10 = _createForOfIteratorHelper(temp),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var c = _step10.value;
          cs.add(c);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  var origVal = v.value(); // Save the value.
  v.assign(val);
  var _iterator9 = _createForOfIteratorHelper(cs),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _c2 = _step9.value;
      if (_c2.isSatisfied() === 0) {
        v.assign(origVal); // Restore the value.
        return false;
      }
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  v.assign(origVal); // Restore the value.
  return true;
}
function _lcValue2(V1, V2, v, val) {
  if (!_classPrivateMethodGet(this, _isConsistent, _isConsistent2).call(this, V1, v, val)) {
    return false;
  }
  var V1_V2 = _classStaticPrivateMethodGet(LocalChanges, LocalChanges, _setPlusSet).call(LocalChanges, V1, V2);
  if (_classPrivateMethodGet(this, _isConsistent, _isConsistent2).call(this, V1_V2, v, val)) {
    return true;
  }
  var V3 = _classPrivateMethodGet(this, _createNewV, _createNewV2).call(this, V1_V2, v, val);
  var T = _classStaticPrivateMethodGet(LocalChanges, LocalChanges, _setMinusSet).call(LocalChanges, V1_V2, V3);
  if (!_classPrivateMethodGet(this, _isConsistent, _isConsistent2).call(this, T, v, val)) {
    this._debugOutput('bug');
  }
  var _iterator11 = _createForOfIteratorHelper(V3),
    _step11;
  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var vv = _step11.value;
      vv.clear();
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }
  V1 = _classStaticPrivateMethodGet(LocalChanges, LocalChanges, _setPlusElement).call(LocalChanges, V1, v);
  V2 = _classStaticPrivateMethodGet(LocalChanges, LocalChanges, _setMinusSet).call(LocalChanges, V2, V3);
  return _classPrivateMethodGet(this, _lcVariables, _lcVariables2).call(this, V1, V2, V3);
}
function _lcVariable2(V1, V2, v, d) {
  if (d.size === 0) {
    return false;
  }
  var val = d.values().next().value;
  var al = _assignmentList.AssignmentList.fromVariables(V2);
  v.assign(val);
  var ret = _classPrivateMethodGet(this, _lcValue, _lcValue2).call(this, V1, V2, v, val);
  if (ret || _classPrivateFieldGet(this, _globalReturn)) {
    return ret;
  }
  v.clear();
  al.apply();
  return _classPrivateMethodGet(this, _lcVariable, _lcVariable2).call(this, V1, V2, v, _classStaticPrivateMethodGet(LocalChanges, LocalChanges, _setMinusElement).call(LocalChanges, d, val));
}
function _lcVariables2(V1, V2, V3) {
  var _this$_targetDeg;
  var _this$iterCount, _this$iterCount2;
  this._debugOutput("V1 ".concat(V1.size, ", V2' ").concat(V2.size, ", V3' ").concat(V3.size));
  if (((_this$_targetDeg = this._targetDeg) !== null && _this$_targetDeg !== void 0 ? _this$_targetDeg : 1) <= this._pro.satisfiedConstraintRate()) {
    // Success if violation rate improves from specified
    this._debugOutput('stop: current degree is above the target');
    _classPrivateFieldSet(this, _globalReturn, true);
    return true;
  }
  if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount = _classPrivateFieldGet(this, _iterCount), _this$iterCount2 = _this$iterCount++, _this$iterCount)), _this$iterCount2)) {
    // Failure if repeated a specified number
    this._debugOutput('stop: number of iterations has reached the limit');
    _classPrivateFieldSet(this, _globalReturn, true);
    return false;
  }
  if (_classPrivateFieldGet(this, _endTime) < Date.now()) {
    // Failure if time limit is exceeded
    this._debugOutput('stop: time limit has been reached');
    _classPrivateFieldSet(this, _globalReturn, true);
    return false;
  }
  if (V3.size === 0) {
    return true;
  }
  var v = V3.values().next().value;
  var d = new Set();
  var _iterator12 = _createForOfIteratorHelper(v.domain()),
    _step12;
  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      var val = _step12.value;
      d.add(val);
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }
  var ret = _classPrivateMethodGet(this, _lcVariable, _lcVariable2).call(this, V1, V2, v, d);
  if (!ret || _classPrivateFieldGet(this, _globalReturn)) {
    return ret;
  }
  V2 = _classStaticPrivateMethodGet(LocalChanges, LocalChanges, _setPlusElement).call(LocalChanges, V2, v);
  V3 = _classStaticPrivateMethodGet(LocalChanges, LocalChanges, _setMinusElement).call(LocalChanges, V3, v);
  return _classPrivateMethodGet(this, _lcVariables, _lcVariables2).call(this, V1, V2, V3);
}
},{"../../util/assignment-list.js":"../src/util/assignment-list.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/crisp/local-changes-ex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalChangesEx = void 0;
var _assignmentList = require("../../util/assignment-list.js");
var _solver = require("../solver.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; } /**
                                                                                                                                                                                    * Class implements the local changes method.
                                                                                                                                                                                    * The implementation is optimized by converting recursive calls to loops.
                                                                                                                                                                                    *
                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                                                    */
var _iterCount = /*#__PURE__*/new WeakMap();
var _endTime = /*#__PURE__*/new WeakMap();
var _globalReturn = /*#__PURE__*/new WeakMap();
var _createNewV = /*#__PURE__*/new WeakSet();
var _isConsistent = /*#__PURE__*/new WeakSet();
var _lcValue = /*#__PURE__*/new WeakSet();
var _lcVariable = /*#__PURE__*/new WeakSet();
var _lcVariables = /*#__PURE__*/new WeakSet();
var LocalChangesEx = /*#__PURE__*/function (_Solver) {
  _inherits(LocalChangesEx, _Solver);
  var _super = _createSuper(LocalChangesEx);
  function LocalChangesEx(p) {
    var _this;
    var unassignAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    _classCallCheck(this, LocalChangesEx);
    _this = _super.call(this, p);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _lcVariables);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _lcVariable);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _lcValue);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _isConsistent);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _createNewV);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _iterCount, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _endTime, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _globalReturn, {
      writable: true,
      value: void 0
    });
    if (unassignAll) {
      _this._pro.clearAllVariables();
    }
    return _this;
  }
  _createClass(LocalChangesEx, [{
    key: "name",
    value: function name() {
      return 'Local Changes Ex';
    }
  }, {
    key: "exec",
    value: function exec() {
      _classPrivateFieldSet(this, _endTime, this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit);
      _classPrivateFieldSet(this, _iterCount, 0);
      _classPrivateFieldSet(this, _globalReturn, false);
      if (this._pro.emptyVariableSize() === 0) {
        this._pro.clearAllVariables();
      }
      var notFixed = new Set();
      var unassigned = new Set();
      var _iterator = _createForOfIteratorHelper(this._pro.variables()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;
          (!v.isEmpty() ? notFixed : unassigned).add(v);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return _classPrivateMethodGet(this, _lcVariables, _lcVariables2).call(this, new Set(), notFixed, unassigned);
    }
  }]);
  return LocalChangesEx;
}(_solver.Solver);
exports.LocalChangesEx = LocalChangesEx;
function _setPlusSet(s1, s2) {
  var sn = new Set(s1);
  var _iterator2 = _createForOfIteratorHelper(s2),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var v = _step2.value;
      sn.add(v);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return sn;
}
function _setMinusSet(s1, s2) {
  var sn = new Set(s1);
  var _iterator3 = _createForOfIteratorHelper(s2),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var v = _step3.value;
      sn.delete(v);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return sn;
}
function _setPlusElement(s, e) {
  var sn = new Set(s);
  sn.add(e);
  return sn;
}
function _setMinusElement(s, e) {
  var sn = new Set(s);
  sn.delete(e);
  return sn;
}
function _createNewV2(V1_V2, v, val) {
  var newV3 = new Set();
  var cs = new Set();
  var _iterator4 = _createForOfIteratorHelper(V1_V2),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var va = _step4.value;
      var temp = this._pro.constraintsBetween(v, va);
      var _iterator6 = _createForOfIteratorHelper(temp),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var c = _step6.value;
          cs.add(c);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  var origVal = v.value(); // Save the value.
  v.assign(val);
  var _iterator5 = _createForOfIteratorHelper(cs),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _c = _step5.value;
      if (_c.isSatisfied() === 0) {
        var _iterator7 = _createForOfIteratorHelper(_c),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var vi = _step7.value;
            newV3.add(vi);
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  v.assign(origVal); // Restore the value.
  newV3.delete(v);
  return newV3;
}
function _isConsistent2(A, v, val) {
  var cs = new Set();
  var _iterator8 = _createForOfIteratorHelper(A),
    _step8;
  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var va = _step8.value;
      var temp = this._pro.constraintsBetween(v, va);
      var _iterator10 = _createForOfIteratorHelper(temp),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var c = _step10.value;
          cs.add(c);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  var origVal = v.value(); // Save the value.
  v.assign(val);
  var _iterator9 = _createForOfIteratorHelper(cs),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _c2 = _step9.value;
      if (_c2.isSatisfied() === 0) {
        v.assign(origVal); // Restore the value.
        return false;
      }
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  v.assign(origVal); // Restore the value.
  return true;
}
function _lcValue2(V1, V2, v) {
  if (!_classPrivateMethodGet(this, _isConsistent, _isConsistent2).call(this, V1, v, v.value())) {
    return false;
  }
  var V1_V2 = _classStaticPrivateMethodGet(LocalChangesEx, LocalChangesEx, _setPlusSet).call(LocalChangesEx, V1, V2);
  if (_classPrivateMethodGet(this, _isConsistent, _isConsistent2).call(this, V1_V2, v, v.value())) {
    return true;
  }
  var V3 = _classPrivateMethodGet(this, _createNewV, _createNewV2).call(this, V1_V2, v, v.value());
  V2 = _classStaticPrivateMethodGet(LocalChangesEx, LocalChangesEx, _setMinusSet).call(LocalChangesEx, V2, V3);
  V1 = _classStaticPrivateMethodGet(LocalChangesEx, LocalChangesEx, _setPlusElement).call(LocalChangesEx, V1, v);
  return _classPrivateMethodGet(this, _lcVariables, _lcVariables2).call(this, V1, V2, V3);
}
function _lcVariable2(V1, V2, v) {
  var _iterator11 = _createForOfIteratorHelper(v.domain()),
    _step11;
  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var val = _step11.value;
      var s = _assignmentList.AssignmentList.fromVariables(V2);
      v.assign(val);
      var ret = _classPrivateMethodGet(this, _lcValue, _lcValue2).call(this, V1, V2, v);
      if (ret || _classPrivateFieldGet(this, _globalReturn)) {
        return ret;
      }
      v.clear();
      s.apply();
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }
  return false;
}
function _lcVariables2(V1, V2, V3) {
  V2 = new Set(V2); // Clone
  V3 = new Set(V3); // Clone

  while (true) {
    var _this$iterCount, _this$iterCount2, _this$_targetDeg;
    this._debugOutput("V1 ".concat(V1.size, ", V2' ").concat(V2.size, ", V3' ").concat(V3.size));
    if (((_this$_targetDeg = this._targetDeg) !== null && _this$_targetDeg !== void 0 ? _this$_targetDeg : 1) <= this._pro.satisfiedConstraintRate()) {
      // Success if violation rate improves from specified
      this._debugOutput('stop: current degree is above the target');
      _classPrivateFieldSet(this, _globalReturn, true);
      return true;
    }
    if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount = _classPrivateFieldGet(this, _iterCount), _this$iterCount2 = _this$iterCount++, _this$iterCount)), _this$iterCount2)) {
      // Failure if repeated a specified number
      this._debugOutput('stop: number of iterations has reached the limit');
      _classPrivateFieldSet(this, _globalReturn, true);
      return false;
    }
    if (_classPrivateFieldGet(this, _endTime) < Date.now()) {
      // Failure if time limit is exceeded
      this._debugOutput('stop: time limit has been reached');
      _classPrivateFieldSet(this, _globalReturn, true);
      return false;
    }
    if (V3.size === 0) {
      return true;
    }
    var v = V3.values().next().value;
    var ret = _classPrivateMethodGet(this, _lcVariable, _lcVariable2).call(this, V1, V2, v);
    if (!ret || _classPrivateFieldGet(this, _globalReturn)) {
      return ret;
    }
    V2.add(v);
    V3.delete(v);
  }
}
},{"../../util/assignment-list.js":"../src/util/assignment-list.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/crisp/breakout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Breakout = void 0;
var _assignmentList = require("../../util/assignment-list.js");
var _solver = require("../solver.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } } /**
                                                                                                                                                                                                                                                                    * Class implements a solver using the breakout method.
                                                                                                                                                                                                                                                                    * Solves a problem as a maximum CSP.
                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                                                                                                                                    */
var _weights = /*#__PURE__*/new WeakMap();
var _isRandom = /*#__PURE__*/new WeakMap();
var _findCandidates = /*#__PURE__*/new WeakSet();
var _listViolatingVariables = /*#__PURE__*/new WeakSet();
var Breakout = /*#__PURE__*/function (_Solver) {
  _inherits(Breakout, _Solver);
  var _super = _createSuper(Breakout);
  function Breakout(p) {
    var _this;
    _classCallCheck(this, Breakout);
    _this = _super.call(this, p);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _listViolatingVariables);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _findCandidates);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _weights, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _isRandom, {
      writable: true,
      value: true
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _weights, new Array(_this._pro.constraintSize()));
    _classPrivateFieldGet(_assertThisInitialized(_this), _weights).fill(1);
    return _this;
  }
  _createClass(Breakout, [{
    key: "name",
    value: function name() {
      return 'Breakout';
    }
  }, {
    key: "exec",
    value: function exec() {
      var endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
      var iterCount = 0;
      var _iterator = _createForOfIteratorHelper(this._pro.variables()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;
          if (v.isEmpty()) v.assign(v.domain().at(0));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var canList = new _assignmentList.AssignmentList();
      while (true) {
        var _this$_targetDeg;
        var vc = this._pro.violatingConstraints();
        if (((_this$_targetDeg = this._targetDeg) !== null && _this$_targetDeg !== void 0 ? _this$_targetDeg : 1) <= this._pro.satisfiedConstraintRate()) {
          // Success if violation rate improves from specified
          this._debugOutput('stop: current degree is above the target');
          return true;
        }
        if (this._iterLimit && this._iterLimit < iterCount++) {
          // Failure if repeated a specified number
          this._debugOutput('stop: number of iterations has reached the limit');
          return false;
        }
        if (endTime < Date.now()) {
          // Failure if time limit is exceeded
          this._debugOutput('stop: time limit has been reached');
          return false;
        }
        this._debugOutput(vc.length + ' violations');
        _classPrivateMethodGet(this, _findCandidates, _findCandidates2).call(this, _classPrivateMethodGet(this, _listViolatingVariables, _listViolatingVariables2).call(this, vc), canList);
        if (0 < canList.size()) {
          var e = _classPrivateFieldGet(this, _isRandom) ? canList.random() : canList.at(0);
          e.apply();
          canList.clear();
          this._debugOutput('\t' + e);
        } else {
          var _iterator2 = _createForOfIteratorHelper(vc),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var c = _step2.value;
              _classPrivateFieldGet(this, _weights)[c.index()] += 1;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          this._debugOutput('breakout');
        }
      }
    }

    /**
     * Sets the randomness of the algorithm.
     * Enabling randomness reduces the risk of local solutions, but makes the solution unrepeatable.
     * @param flag Whether the randomness is enabled.
     */
  }, {
    key: "setRandomness",
    value: function setRandomness(flag) {
      _classPrivateFieldSet(this, _isRandom, flag);
    }
  }]);
  return Breakout;
}(_solver.Solver);
exports.Breakout = Breakout;
function _findCandidates2(vioVars, canList) {
  var maxDiff = 0;
  var _iterator3 = _createForOfIteratorHelper(vioVars),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var v = _step3.value;
      var v_val = v.value(); // Save the value

      var nowVio = 0;
      var _iterator4 = _createForOfIteratorHelper(v),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var c = _step4.value;
          nowVio += (1 - c.isSatisfied()) * _classPrivateFieldGet(this, _weights)[c.index()];
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      var _iterator5 = _createForOfIteratorHelper(v.domain()),
        _step5;
      try {
        out: for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var d = _step5.value;
          if (v_val === d) continue;
          v.assign(d);
          var diff = nowVio;
          var _iterator6 = _createForOfIteratorHelper(v),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var _c = _step6.value;
              diff -= (1 - _c.isSatisfied()) * _classPrivateFieldGet(this, _weights)[_c.index()];
              // If the improvement is less than the previous improvement, try the next variable.
              if (diff < maxDiff) {
                continue out;
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
          if (diff > maxDiff) {
            // Found assignments that are better than ever before.
            maxDiff = diff;
            canList.clear();
            canList.addVariable(v, d);
          } else if (maxDiff !== 0) {
            // Found assignments that can be improved to the same level as before.
            canList.addVariable(v, d);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      v.assign(v_val); // Restore the value.
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
}
function _listViolatingVariables2(vioCons) {
  var vvs = new Set();
  var _iterator7 = _createForOfIteratorHelper(vioCons),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var c = _step7.value;
      var _iterator8 = _createForOfIteratorHelper(c),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var v = _step8.value;
          vvs.add(v);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  return Array.from(vvs);
}
},{"../../util/assignment-list.js":"../src/util/assignment-list.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/crisp/genet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GENET = void 0;
var _assignmentList = require("../../util/assignment-list.js");
var _solver = require("../solver.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; } /**
                                                                                                                                                    * This class implements GENET.
                                                                                                                                                    * CSP (but only Binary CSP) is supported.
                                                                                                                                                    * Find the solution to the problem as the maximum CSP.
                                                                                                                                                    *
                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                    */
var _clusters = /*#__PURE__*/new WeakMap();
var _connections = /*#__PURE__*/new WeakMap();
var _createNetwork = /*#__PURE__*/new WeakSet();
var _shuffle = /*#__PURE__*/new WeakSet();
var GENET = /*#__PURE__*/function (_Solver) {
  _inherits(GENET, _Solver);
  var _super = _createSuper(GENET);
  function GENET(p) {
    var _this;
    _classCallCheck(this, GENET);
    _this = _super.call(this, p);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _shuffle);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _createNetwork);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _clusters, {
      writable: true,
      value: []
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _connections, {
      writable: true,
      value: void 0
    });
    return _this;
  }
  _createClass(GENET, [{
    key: "name",
    value: function name() {
      return 'GENET';
    }
  }, {
    key: "exec",
    value: function exec() {
      if (!_classPrivateMethodGet(this, _createNetwork, _createNetwork2).call(this)) {
        throw new Exception();
      }
      var endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
      var iterCount = 0;
      var sol = new _assignmentList.AssignmentList();
      var order = [];
      for (var i = 0; i < _classPrivateFieldGet(this, _clusters).length; ++i) {
        order.push(i);
      }
      var cur = this._pro.satisfiedConstraintRate();
      var success = false;
      while (true) {
        if (this._iterLimit && this._iterLimit < iterCount++) {
          // Failure if repeated a specified number
          this._debugOutput('stop: number of iterations has reached the limit');
          break;
        }
        if (endTime < Date.now()) {
          // Failure if time limit is exceeded
          this._debugOutput('stop: time limit has been reached');
          break;
        }
        var modified = false;
        var _iterator = _createForOfIteratorHelper(_classPrivateMethodGet(this, _shuffle, _shuffle2).call(this, order)),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _i = _step.value;
            if (_classPrivateFieldGet(this, _clusters)[_i].setActivityMaximumInput()) {
              modified = true; // Turn on the node with the largest input in each cluster
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (!modified) {
          // When the local minimum solution is reached.
          var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _connections)),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var con = _step2.value;
              con.refreshWeight(); // Update weights for all connections
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } else {
          var _iterator3 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _clusters)),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var clu = _step3.value;
              clu.applyToVariable(); // Apply to variable
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          var d = this._pro.satisfiedConstraintRate();
          if (cur < d) {
            var _this$_targetDeg;
            // If it's a better assignment than ever, save it.
            cur = d;
            this._debugOutput("satisfied constraint rate: ".concat(d));
            sol.setProblem(this._pro);
            if (this.foundSolution(sol, d)) {
              // Call hook
              success = true;
              break;
            }
            if ((_this$_targetDeg = this._targetDeg) !== null && _this$_targetDeg !== void 0 ? _this$_targetDeg : 1 <= cur) {
              // Success if violation rate improves from specified
              this._debugOutput('stop: current degree is above the target');
              success = true;
              break;
            }
          }
        }
      }
      sol.apply(); // Despite the failures, the best assignment so far is applied for now.
      return success;
    }
  }], [{
    key: "nextInt",
    value: function nextInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }]);
  return GENET;
}(_solver.Solver);
exports.GENET = GENET;
function _createNetwork2() {
  this._debugOutput('network creation start');
  var cons = [];
  var _iterator7 = _createForOfIteratorHelper(this._pro.variables()),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var v = _step7.value;
      if (v.domain().size() === 0) return false;
      _classPrivateFieldGet(this, _clusters).push(new GENET.Cluster(v));
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  var _iterator8 = _createForOfIteratorHelper(this._pro.constraints()),
    _step8;
  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var c = _step8.value;
      if (c.size() === 1) {
        // In the case of unary constraints.
        var _v = c.at(0);
        var cl = _classPrivateFieldGet(this, _clusters)[c.at(0).index()];
        for (var i = 0; i < cl.size(); ++i) {
          var origVal = _v.value(); // Save the value.
          _v.assign(cl.get(i)._value);
          if (c.isSatisfied() === 0) {
            cons.push(new GENET.Connection(cl.get(i)));
          }
          _v.assign(origVal); // Restore the value.
        }
      } else {
        // In the case of binary constraints.
        var v1 = c.at(0);
        var v2 = c.at(1);
        var cl_f = _classPrivateFieldGet(this, _clusters)[c.at(0).index()];
        var cl_s = _classPrivateFieldGet(this, _clusters)[c.at(1).index()];
        for (var _i2 = 0; _i2 < cl_f.size(); ++_i2) {
          var origVal1 = v1.value(); // Save the value.
          v1.assign(cl_f.get(_i2)._value);
          for (var j = 0; j < cl_s.size(); ++j) {
            var origVal2 = v2.value(); // Save the value.
            v2.assign(cl_s.get(j)._value);
            if (c.isSatisfied() === 0) {
              cons.push(new GENET.Connection(cl_f.get(_i2), cl_s.get(j)));
            }
            v2.assign(origVal2); // Restore the value.
          }

          v1.assign(origVal1); // Restore the value.
        }
      }
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  var _iterator9 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _clusters)),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _cl = _step9.value;
      var _iterator10 = _createForOfIteratorHelper(_cl._neurons),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var n = _step10.value;
          n.lockConnections();
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  _classPrivateFieldSet(this, _connections, cons);
  this._debugOutput('network creation complete');
  return true;
}
function _shuffle2(is) {
  for (var i = is.length; i > 1; --i) {
    var j = GENET.nextInt(i);
    var temp = is[i - 1];
    is[i - 1] = is[j];
    is[j] = temp;
  }
  return is;
}
{
  var _var = /*#__PURE__*/new WeakMap();
  var _index = /*#__PURE__*/new WeakMap();
  var _maxNeurons = /*#__PURE__*/new WeakMap();
  var _setActivity = /*#__PURE__*/new WeakSet();
  var Cluster = /*#__PURE__*/function () {
    function Cluster(v) {
      _classCallCheck(this, Cluster);
      _classPrivateMethodInitSpec(this, _setActivity);
      _classPrivateFieldInitSpec(this, _var, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _index, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _maxNeurons, {
        writable: true,
        value: []
      });
      _defineProperty(this, "_neurons", []);
      _classPrivateFieldSet(this, _var, v);
      var _iterator4 = _createForOfIteratorHelper(v.domain()),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var val = _step4.value;
          this._neurons.push(new Neuron(val));
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      _classPrivateMethodGet(this, _setActivity, _setActivity2).call(this, Cluster.nextInt(this._neurons.length));
    }
    _createClass(Cluster, [{
      key: "applyToVariable",
      value: function applyToVariable() {
        _classPrivateFieldGet(this, _var).assign(this._neurons[_classPrivateFieldGet(this, _index)]._value);
      }
    }, {
      key: "get",
      value: function get(index) {
        return this._neurons[index];
      }
    }, {
      key: "neurons",
      value: function neurons() {
        return this._neurons;
      }

      // Turn on the node with the largest input.
    }, {
      key: "setActivityMaximumInput",
      value: function setActivityMaximumInput() {
        _classPrivateFieldGet(this, _maxNeurons).length = 0;
        var max = Number.NEGATIVE_INFINITY;
        var alreadyOn = false;
        for (var i = 0; i < this._neurons.length; ++i) {
          var input = this._neurons[i].getInput();
          if (max <= input) {
            if (max < input) {
              max = input;
              _classPrivateFieldGet(this, _maxNeurons).length = 0;
              alreadyOn = false;
            }
            _classPrivateFieldGet(this, _maxNeurons).push(i);
            if (_classPrivateFieldGet(this, _index) === i) {
              alreadyOn = true;
            }
          }
        }
        if (alreadyOn || _classPrivateFieldGet(this, _maxNeurons).length === 0) {
          return false;
        }
        _classPrivateMethodGet(this, _setActivity, _setActivity2).call(this, _classPrivateFieldGet(this, _maxNeurons)[Cluster.nextInt(_classPrivateFieldGet(this, _maxNeurons).length)]);
        return true;
      }
    }, {
      key: "size",
      value: function size() {
        return this._neurons.length;
      }
    }], [{
      key: "nextInt",
      value: function nextInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
    }]);
    return Cluster;
  }();
  function _setActivity2(index) {
    var _iterator6 = _createForOfIteratorHelper(this._neurons),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var n = _step6.value;
        n._isActive = false;
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    this._neurons[index]._isActive = true;
    _classPrivateFieldSet(this, _index, index);
  }
  GENET.Cluster = Cluster;
  var _first = /*#__PURE__*/new WeakMap();
  var _second = /*#__PURE__*/new WeakMap();
  var Connection = /*#__PURE__*/function () {
    // Direct reference (read) allowed.

    // Order of neurons must be the same as the order of variables that the constraint has.
    function Connection(first) {
      var second = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      _classCallCheck(this, Connection);
      _classPrivateFieldInitSpec(this, _first, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _second, {
        writable: true,
        value: void 0
      });
      _defineProperty(this, "_weight", void 0);
      this._weight = -1;
      _classPrivateFieldSet(this, _first, first);
      _classPrivateFieldGet(this, _first).addConnection(this);
      _classPrivateFieldSet(this, _second, second);
      if (_classPrivateFieldGet(this, _second) !== null) {
        _classPrivateFieldGet(this, _second).addConnection(this);
      }
    }
    _createClass(Connection, [{
      key: "getNeuron",
      value: function getNeuron(self) {
        if (self === _classPrivateFieldGet(this, _first)) return _classPrivateFieldGet(this, _second);
        if (self === _classPrivateFieldGet(this, _second)) return _classPrivateFieldGet(this, _first);
        return null;
      }
    }, {
      key: "refreshWeight",
      value: function refreshWeight() {
        if (!_classPrivateFieldGet(this, _first)._isActive || _classPrivateFieldGet(this, _second) !== null && !_classPrivateFieldGet(this, _second)._isActive) {
          return;
        }
        this._weight += -1;
      }
    }]);
    return Connection;
  }();
  GENET.Connection = Connection;
  var _conTemp = /*#__PURE__*/new WeakMap();
  var _connections2 = /*#__PURE__*/new WeakMap();
  var Neuron = /*#__PURE__*/function () {
    // Direct reference (read, write) allowed.

    function Neuron(value) {
      _classCallCheck(this, Neuron);
      _classPrivateFieldInitSpec(this, _conTemp, {
        writable: true,
        value: []
      });
      _classPrivateFieldInitSpec(this, _connections2, {
        writable: true,
        value: void 0
      });
      _defineProperty(this, "_value", void 0);
      // Direct reference (read) allowed.
      _defineProperty(this, "_isActive", false);
      this._value = value;
    }
    _createClass(Neuron, [{
      key: "addConnection",
      value: function addConnection(c) {
        _classPrivateFieldGet(this, _conTemp).push(c);
      }
    }, {
      key: "lockConnections",
      value: function lockConnections() {
        _classPrivateFieldSet(this, _connections2, _toConsumableArray(_classPrivateFieldGet(this, _conTemp)));
        _classPrivateFieldSet(this, _conTemp, null); // No longer being used.
      }
    }, {
      key: "getInput",
      value: function getInput() {
        var ret = 0;
        var _iterator5 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _connections2)),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var c = _step5.value;
            var n = c.getNeuron(this); // If n is null, then the unary constraint.
            ret += c._weight * (n === null || n._isActive ? 1 : 0);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        return ret;
      }
    }]);
    return Neuron;
  }();
  GENET.Neuron = Neuron;
}
},{"../../util/assignment-list.js":"../src/util/assignment-list.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/crisp/crisp-srs3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrispSRS3 = void 0;
var _assignmentList = require("../../util/assignment-list.js");
var _solver = require("../solver.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; } /**
                                                                                                                                                    * This class implements the SRS algorithm for crisp CSP.
                                                                                                                                                    * The given crisp CSP is treated as the maximum CSP.
                                                                                                                                                    * Similar to SRS 3, the repair algorithm searches for an assignment that satisfies itself without reducing the number of satisfactions of its neighbors.
                                                                                                                                                    *
                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                    */
var _closedList = /*#__PURE__*/new WeakMap();
var _openList = /*#__PURE__*/new WeakMap();
var _nodes = /*#__PURE__*/new WeakMap();
var _neighborConstraints = /*#__PURE__*/new WeakMap();
var _isRandom = /*#__PURE__*/new WeakMap();
var _getNeighborConstraints = /*#__PURE__*/new WeakSet();
var _repair = /*#__PURE__*/new WeakSet();
var _shrink = /*#__PURE__*/new WeakSet();
var _spread = /*#__PURE__*/new WeakSet();
var _srs = /*#__PURE__*/new WeakSet();
var CrispSRS3 = /*#__PURE__*/function (_Solver) {
  _inherits(CrispSRS3, _Solver);
  var _super = _createSuper(CrispSRS3);
  function CrispSRS3(p) {
    var _this;
    _classCallCheck(this, CrispSRS3);
    _this = _super.call(this, p);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _srs);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _spread);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _shrink);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _repair);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _getNeighborConstraints);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _closedList, {
      writable: true,
      value: new Set()
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _openList, {
      writable: true,
      value: new Set()
    });
    // LinkedHashSet is used in the original implementation.
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _nodes, {
      writable: true,
      value: []
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _neighborConstraints, {
      writable: true,
      value: []
    });
    // Cache
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _isRandom, {
      writable: true,
      value: true
    });
    var _iterator = _createForOfIteratorHelper(_this._pro.constraints()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var c = _step.value;
        _classPrivateFieldGet(_assertThisInitialized(_this), _nodes).push(new CrispSRS3.TreeNode(c));
        _classPrivateFieldGet(_assertThisInitialized(_this), _neighborConstraints).push(null);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return _this;
  }
  _createClass(CrispSRS3, [{
    key: "name",
    value: function name() {
      return 'SRS 3 for Crisp CSPs';
    }
  }, {
    key: "exec",
    value: function exec() {
      var vcs = this._pro.violatingConstraints();
      var c_stars = new Set();
      var _iterator2 = _createForOfIteratorHelper(vcs),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var c = _step2.value;
          var tnc = _classPrivateFieldGet(this, _nodes)[c.index()];
          c_stars.add(tnc);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (_classPrivateMethodGet(this, _srs, _srs2).call(this, c_stars)) {
        return true;
      }
      return c_stars.length === 0;
    }

    /**
     * Sets the randomness of the algorithm.
     * Enabling randomness reduces the risk of falling into a local solution, but makes the solution unrepeatable.
     * @param flag If true, randomness is enabled.
     */
  }, {
    key: "setRandomness",
    value: function setRandomness(flag) {
      _classPrivateFieldSet(this, _isRandom, flag);
    }
  }]);
  return CrispSRS3;
}(_solver.Solver);
exports.CrispSRS3 = CrispSRS3;
function _getNeighborConstraints2(c) {
  var index = c.index();
  if (_classPrivateFieldGet(this, _neighborConstraints)[index] === null) {
    _classPrivateFieldGet(this, _neighborConstraints)[index] = c.neighbors();
  }
  return _classPrivateFieldGet(this, _neighborConstraints)[index];
}
function _repair2(c0) {
  this._debugOutput('repair');
  var canList = new _assignmentList.AssignmentList();
  var maxDiff = 0;
  var _iterator5 = _createForOfIteratorHelper(c0),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var v = _step5.value;
      var v_val = v.value(); // Save the value

      var nowVio = 0;
      var _iterator6 = _createForOfIteratorHelper(v),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var c = _step6.value;
          nowVio += 1 - c.isSatisfied();
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      var _iterator7 = _createForOfIteratorHelper(v.domain()),
        _step7;
      try {
        out: for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var d = _step7.value;
          if (v_val === d) continue;
          v.assign(d);
          if (c0.isSatisfied() !== 1) continue; // Assuming c0 improvement

          var diff = nowVio;
          var _iterator8 = _createForOfIteratorHelper(v),
            _step8;
          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var n = _step8.value;
              diff -= 1 - n.isSatisfied();
              if (diff < maxDiff) continue out; // If the improvement is less than the previous improvement, try the next variable.
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
          if (diff > maxDiff) {
            // An assignment that are better than ever before is found.
            maxDiff = diff;
            canList.clear();
            canList.addVariable(v, d);
          } else if (maxDiff !== 0) {
            // An assignments that can be improved to the same level as before is found.
            canList.addVariable(v, d);
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      v.assign(v_val); // Restore the value
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  if (canList.size() > 0) {
    var e = _classPrivateFieldGet(this, _isRandom) ? canList.random() : canList.at(0);
    e.apply();
    this._debugOutput('\t' + e);
    return true;
  }
  return false;
}
function _shrink2(node, c_stars) {
  var temp = [];
  var cur = node;
  while (true) {
    // This procedure is originally a recursive call, but converted to a loop
    cur = cur.parent();
    temp.length = 0;
    cur.getDescendants(temp);
    cur.clear();
    var _iterator9 = _createForOfIteratorHelper(c_stars),
      _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var n = _step9.value;
        _classPrivateFieldGet(this, _openList).delete(n);
        _classPrivateFieldGet(this, _closedList).delete(n);
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
    if (c_stars.delete(cur)) {
      break;
    }
    _classPrivateFieldGet(this, _openList).add(cur);
    if (cur.parent() !== null && !_classPrivateMethodGet(this, _repair, _repair2).call(this, cur.parent().getObject())) {
      break;
    }
  }
}
function _spread2(node) {
  this._debugOutput('spread');
  _classPrivateFieldGet(this, _closedList).add(node);
  var _iterator10 = _createForOfIteratorHelper(_classPrivateMethodGet(this, _getNeighborConstraints, _getNeighborConstraints2).call(this, node.getObject())),
    _step10;
  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var c = _step10.value;
      var tnc = _classPrivateFieldGet(this, _nodes)[c.index()];
      if (!_classPrivateFieldGet(this, _closedList).has(tnc) && !_classPrivateFieldGet(this, _openList).has(tnc)) {
        // For constraints that are not included in Open or Closed
        tnc.clear(); // Because of its reuse, it may have had children when it was used before.
        node.add(tnc);
        _classPrivateFieldGet(this, _openList).add(tnc);
      }
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }
}
function _srs2(c_stars) {
  this._debugOutput('srs');
  var endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
  var iterCount = 0;
  _classPrivateFieldGet(this, _closedList).clear();
  _classPrivateFieldGet(this, _openList).clear();
  var _iterator11 = _createForOfIteratorHelper(c_stars),
    _step11;
  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var n = _step11.value;
      _classPrivateFieldGet(this, _openList).add(n);
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }
  while (c_stars.size && _classPrivateFieldGet(this, _openList).size) {
    var _this$_targetDeg;
    if (((_this$_targetDeg = this._targetDeg) !== null && _this$_targetDeg !== void 0 ? _this$_targetDeg : 1) <= this._pro.satisfiedConstraintRate()) {
      // Success if violation rate improves from specified
      this._debugOutput('stop: current degree is above the target');
      return true;
    }
    if (this._iterLimit && this._iterLimit < iterCount++) {
      // Failure if repeated a specified number
      this._debugOutput('stop: number of iterations has reached the limit');
      return false;
    }
    if (endTime < Date.now()) {
      // Failure if time limit is exceeded
      this._debugOutput('stop: time limit has been reached');
      return false;
    }
    var node = _classPrivateFieldGet(this, _openList).values().next().value;
    _classPrivateFieldGet(this, _openList).delete(node);
    if (_classPrivateMethodGet(this, _repair, _repair2).call(this, node.getObject())) {
      if (!c_stars.delete(node)) {
        // If the repaired node is included in C* (to be deleted)
        if (node.parent() !== null && _classPrivateMethodGet(this, _repair, _repair2).call(this, node.parent().getObject())) {
          // When its improvement leads to the improvement of its parents
          _classPrivateMethodGet(this, _shrink, _shrink2).call(this, node, c_stars);
        } else {
          _classPrivateMethodGet(this, _spread, _spread2).call(this, node);
        }
      }
    } else {
      // In case of repair failure
      _classPrivateMethodGet(this, _spread, _spread2).call(this, node);
    }
  }
  return false;
}
{
  var _children = /*#__PURE__*/new WeakMap();
  var _parent = /*#__PURE__*/new WeakMap();
  var _obj = /*#__PURE__*/new WeakMap();
  var TreeNode = /*#__PURE__*/function () {
    function TreeNode(obj) {
      _classCallCheck(this, TreeNode);
      _classPrivateFieldInitSpec(this, _children, {
        writable: true,
        value: []
      });
      _classPrivateFieldInitSpec(this, _parent, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _obj, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldSet(this, _obj, obj);
    }
    _createClass(TreeNode, [{
      key: "add",
      value: function add(tn) {
        _classPrivateFieldSet(tn, _parent, this);
        _classPrivateFieldGet(this, _children).push(tn);
      }
    }, {
      key: "clear",
      value: function clear() {
        var _iterator3 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _children)),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var tn = _step3.value;
            _classPrivateFieldSet(tn, _parent, null);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        _classPrivateFieldGet(this, _children).length = 0;
      }
    }, {
      key: "getDescendants",
      value: function getDescendants(tns) {
        tns.push(this);
        var _iterator4 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _children)),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var tn = _step4.value;
            tn.getDescendants(tns);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    }, {
      key: "getObject",
      value: function getObject() {
        return _classPrivateFieldGet(this, _obj);
      }
    }, {
      key: "parent",
      value: function parent() {
        return _classPrivateFieldGet(this, _parent);
      }
    }]);
    return TreeNode;
  }();
  CrispSRS3.TreeNode = TreeNode;
}
},{"../../util/assignment-list.js":"../src/util/assignment-list.js","../solver.js":"../src/solver/solver.js"}],"n-queens.js":[function(require,module,exports) {
"use strict";

var _problemCrisp = require("../src/problem/problem-crisp.js");
var _nQueens = require("../src/model/n-queens.js");
var _forwardChecking = require("../src/solver/crisp/forward-checking.js");
var _maxForwardChecking = require("../src/solver/crisp/max-forward-checking.js");
var _localChanges = require("../src/solver/crisp/local-changes.js");
var _localChangesEx = require("../src/solver/crisp/local-changes-ex.js");
var _breakout = require("../src/solver/crisp/breakout.js");
var _genet = require("../src/solver/crisp/genet.js");
var _crispSrs = require("../src/solver/crisp/crisp-srs3.js");
var COUNT = 1; // Interaction count
var QUEEN_NUM = 20; // Number of queens

document.addEventListener('DOMContentLoaded', function () {
  var output = document.getElementById('output');
  var log = function log(e) {
    return output.value += "".concat(e, "\n");
  };
  var sum_time = 0;
  var sum_rate = 0;
  for (var i = 0; i < COUNT; ++i) {
    var nq = new _nQueens.N_queens(QUEEN_NUM);
    var p = nq.createProblem(new _problemCrisp.CrispProblem());
    var t = Date.now(); // Start time measurement

    // const s = new ForwardChecking(p);
    // const s = new MaxForwardChecking(p);
    // const s = new LocalChanges(p);
    // const s = new LocalChangesEx(p);
    // const s = new Breakout(p);
    // const s = new GENET(p);
    var s = new _crispSrs.CrispSRS3(p);
    // s.setTargetRate(null);
    s.setTimeLimit(10000);
    s.setDebugOutput(log);
    var res = s.solve();
    var ct = Date.now() - t; // Stop time measurement
    var cr = p.satisfiedConstraintRate();
    log("solver: ".concat(s.name(), "   ").concat(res ? 'success' : 'failure'));
    log("time: ".concat(ct, "   rate: ").concat(cr));
    nq.setDebugOutput(log);
    nq.printResult(p);
    sum_time += ct;
    sum_rate += cr;
  }
  log("average time: ".concat(sum_time / COUNT, "   average rate: ").concat(sum_rate / COUNT));
});
},{"../src/problem/problem-crisp.js":"../src/problem/problem-crisp.js","../src/model/n-queens.js":"../src/model/n-queens.js","../src/solver/crisp/forward-checking.js":"../src/solver/crisp/forward-checking.js","../src/solver/crisp/max-forward-checking.js":"../src/solver/crisp/max-forward-checking.js","../src/solver/crisp/local-changes.js":"../src/solver/crisp/local-changes.js","../src/solver/crisp/local-changes-ex.js":"../src/solver/crisp/local-changes-ex.js","../src/solver/crisp/breakout.js":"../src/solver/crisp/breakout.js","../src/solver/crisp/genet.js":"../src/solver/crisp/genet.js","../src/solver/crisp/crisp-srs3.js":"../src/solver/crisp/crisp-srs3.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63598" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","n-queens.js"], null)
//# sourceMappingURL=/n-queens.a1d03028.js.map