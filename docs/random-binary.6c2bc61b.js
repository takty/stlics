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
},{"./variable.js":"../src/problem/variable.js","./domain-ranged.js":"../src/problem/domain-ranged.js","./domain-arbitrary.js":"../src/problem/domain-arbitrary.js","./constraint.js":"../src/problem/constraint.js","./constraint-1.js":"../src/problem/constraint-1.js","./constraint-2.js":"../src/problem/constraint-2.js","./constraint-3.js":"../src/problem/constraint-3.js"}],"../src/model/beta.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Beta = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
var Beta = /*#__PURE__*/function () {
  function Beta() {
    _classCallCheck(this, Beta);
  }
  _createClass(Beta, null, [{
    key: "random",
    value: function random(a, b) {
      var T = _classStaticPrivateMethodGet(Beta, Beta, _gamma).call(Beta, a);
      return T / (T + _classStaticPrivateMethodGet(Beta, Beta, _gamma).call(Beta, b));
    }
  }]);
  return Beta;
}();
exports.Beta = Beta;
function _gamma(a) {
  var t, x, y, u, r;
  if (a > 1) {
    t = Math.sqrt(2 * a - 1);
    do {
      do {
        do {
          do {
            x = Math.random();
            y = 2 * Math.random() - 1;
          } while (x * x + y * y >= 1 || x === 0);
          y = y / x;
          x = t * y + a - 1;
        } while (x <= 0);
        u = (a - 1) * Math.log(x / (a - 1)) - t * y;
      } while (u <= -50);
    } while ((1 + y * y) * Math.exp(u) <= Math.random());
  } else {
    t = Math.E / (a + Math.E);
    do {
      if (Math.random() < t) {
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
    } while (Math.random() >= y);
  }
  return x;
}
},{}],"../src/model/model.js":[function(require,module,exports) {
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
},{}],"../src/model/random-binary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RandomBinary = void 0;
var _relationFuzzy = require("../problem/relation-fuzzy.js");
var _beta = require("./beta.js");
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
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } } /**
                                                                                                                                                                                                                                                                    * Sample implementation of a random binary problem.
                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                                                                                                                                    */
var _size = /*#__PURE__*/new WeakMap();
var _den = /*#__PURE__*/new WeakMap();
var _t = /*#__PURE__*/new WeakMap();
var _sig = /*#__PURE__*/new WeakMap();
var _getRelationTable = /*#__PURE__*/new WeakSet();
var RandomBinary = /*#__PURE__*/function (_Model) {
  _inherits(RandomBinary, _Model);
  var _super = _createSuper(RandomBinary);
  function RandomBinary(varCount, density, aveTightness) {
    var _this;
    var domainSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    _classCallCheck(this, RandomBinary);
    _this = _super.call(this);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _getRelationTable);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _size, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _den, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _t, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _sig, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _size, varCount);
    _classPrivateFieldSet(_assertThisInitialized(_this), _den, density);
    _classPrivateFieldSet(_assertThisInitialized(_this), _t, aveTightness);
    _classPrivateFieldSet(_assertThisInitialized(_this), _sig, domainSize !== null && domainSize !== void 0 ? domainSize : varCount);
    return _this;
  }
  _createClass(RandomBinary, [{
    key: "getVariableCount",
    value: function getVariableCount() {
      return _classPrivateFieldGet(this, _size);
    }
  }, {
    key: "setVariableCount",
    value: function setVariableCount(count) {
      _classPrivateFieldSet(this, _size, count);
    }
  }, {
    key: "getDensity",
    value: function getDensity() {
      return _classPrivateFieldGet(this, _den);
    }
  }, {
    key: "setDensity",
    value: function setDensity(density) {
      _classPrivateFieldSet(this, _den, density);
    }
  }, {
    key: "getAverageTightness",
    value: function getAverageTightness() {
      return _classPrivateFieldGet(this, _t);
    }
  }, {
    key: "setAverageTightness",
    value: function setAverageTightness(tightness) {
      _classPrivateFieldSet(this, _t, tightness);
    }
  }, {
    key: "getDomainSize",
    value: function getDomainSize() {
      return _classPrivateFieldGet(this, _sig);
    }
  }, {
    key: "setDomainSize",
    value: function setDomainSize(size) {
      _classPrivateFieldSet(this, _sig, size);
    }
  }, {
    key: "isFuzzy",
    value: function isFuzzy() {
      return true;
    }
  }, {
    key: "createProblem",
    value: function createProblem(p) {
      var r = _classPrivateFieldGet(this, _den) * ((_classPrivateFieldGet(this, _size) * _classPrivateFieldGet(this, _size) - _classPrivateFieldGet(this, _size)) / 2) | 0;
      var vs = [];
      for (var i = 0; i < _classPrivateFieldGet(this, _size); ++i) {
        vs.push(p.createVariable({
          domain: p.createDomain({
            min: 0,
            max: _classPrivateFieldGet(this, _sig) - 1
          }),
          value: 0
        }));
      }
      while (p.constraintSize() < r) {
        var _i = RandomBinary.nextInt(_classPrivateFieldGet(this, _size));
        var j = RandomBinary.nextInt(_classPrivateFieldGet(this, _size));
        if (_i !== j) {
          var temp = p.constraintsBetween(vs[_i], vs[j]);
          if (0 === temp.length) {
            p.createConstraint({
              relation: new TableRelation(_classPrivateMethodGet(this, _getRelationTable, _getRelationTable2).call(this)),
              variables: [vs[_i], vs[j]]
            });
          }
        }
      }
      return p;
    }
  }], [{
    key: "nextInt",
    value: function nextInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }]);
  return RandomBinary;
}(_model.Model);
exports.RandomBinary = RandomBinary;
function _getRelationTable2() {
  var table = [];
  for (var i = 0; i < _classPrivateFieldGet(this, _sig); ++i) {
    table.push(new Array(_classPrivateFieldGet(this, _sig)));
  }
  for (var _i2 = 0; _i2 < _classPrivateFieldGet(this, _sig); ++_i2) {
    for (var j = 0; j < _classPrivateFieldGet(this, _sig); ++j) {
      var q = _classPrivateFieldGet(this, _t) === 0 ? Number.MAX_VALUE : (1 - _classPrivateFieldGet(this, _t)) / _classPrivateFieldGet(this, _t);
      table[_i2][j] = _beta.Beta.random(1, q);
    }
  }
  return table;
}
var _table = /*#__PURE__*/new WeakMap();
var TableRelation = /*#__PURE__*/function (_FuzzyRelation) {
  _inherits(TableRelation, _FuzzyRelation);
  var _super2 = _createSuper(TableRelation);
  function TableRelation(table) {
    var _this2;
    _classCallCheck(this, TableRelation);
    _this2 = _super2.call(this);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this2), _table, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(_assertThisInitialized(_this2), _table, table);
    return _this2;
  }
  _createClass(TableRelation, [{
    key: "satisfactionDegree",
    value: function satisfactionDegree(value1, value2) {
      return _classPrivateFieldGet(this, _table)[value1][value2];
    }
  }]);
  return TableRelation;
}(_relationFuzzy.FuzzyRelation);
},{"../problem/relation-fuzzy.js":"../src/problem/relation-fuzzy.js","./beta.js":"../src/model/beta.js","./model.js":"../src/model/model.js"}],"../src/util/assignment.js":[function(require,module,exports) {
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
},{}],"../src/solver/fuzzy/fuzzy-forward-checking.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FuzzyForwardChecking = void 0;
var _constraint = require("../../problem/constraint.js");
var _assignmentList = require("../../util/assignment-list.js");
var _domainPruner = require("../../util/domain-pruner.js");
var _solver = require("../solver.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } } /**
                                                                                                                                                                                                                                                                    * This class implements the forward checking method for fuzzy CSP.
                                                                                                                                                                                                                                                                    * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
                                                                                                                                                                                                                                                                    * Each variable must have its own domain because it hides domain elements as branch pruning.
                                                                                                                                                                                                                                                                    * Forward checking is also performed for problems with polynomial constraints.
                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                                                                                                                                    */
var _vars = /*#__PURE__*/new WeakMap();
var _sol = /*#__PURE__*/new WeakMap();
var _relCons = /*#__PURE__*/new WeakMap();
var _solWorstDeg = /*#__PURE__*/new WeakMap();
var _iterCount = /*#__PURE__*/new WeakMap();
var _endTime = /*#__PURE__*/new WeakMap();
var _useMRV = /*#__PURE__*/new WeakMap();
var _degInc = /*#__PURE__*/new WeakMap();
var _sequence = /*#__PURE__*/new WeakMap();
var _unaryCons = /*#__PURE__*/new WeakMap();
var _checkedCons = /*#__PURE__*/new WeakMap();
var _pruneIntensively = /*#__PURE__*/new WeakMap();
var _initializeRelatedConstraintTable = /*#__PURE__*/new WeakSet();
var _getConstraintsBetween = /*#__PURE__*/new WeakSet();
var _pruneUnaryConstraints = /*#__PURE__*/new WeakSet();
var _checkForwardConsistency = /*#__PURE__*/new WeakSet();
var _checkForwardConsistency3 = /*#__PURE__*/new WeakSet();
var _checkForwardConsistency5 = /*#__PURE__*/new WeakSet();
var _checkForwardConsistencyN = /*#__PURE__*/new WeakSet();
var _checkForward = /*#__PURE__*/new WeakSet();
var _checkBackwardConsistency = /*#__PURE__*/new WeakSet();
var _refresh = /*#__PURE__*/new WeakSet();
var _indexOfVariableWithMRV = /*#__PURE__*/new WeakSet();
var _branch = /*#__PURE__*/new WeakSet();
var _branchLast = /*#__PURE__*/new WeakSet();
var FuzzyForwardChecking = /*#__PURE__*/function (_Solver) {
  _inherits(FuzzyForwardChecking, _Solver);
  var _super = _createSuper(FuzzyForwardChecking);
  /**
   * Generates the solver given a fuzzy constraint satisfaction problem.
   * @param p A fuzzy problem.
   * @param worstSatisfactionDegree Worst satisfaction degree.
   */
  function FuzzyForwardChecking(p) {
    var _this;
    var worstSatisfactionDegree = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    _classCallCheck(this, FuzzyForwardChecking);
    _this = _super.call(this, p);
    // Performs search on the last variable.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _branchLast);
    // Performs search one variable at a time.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _branch);
    // Returns the index of the smallest domain variable.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _indexOfVariableWithMRV);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _refresh);
    // Checks to see if the current variable assignment makes the degree of the past variable worse than the current worst degree.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _checkBackwardConsistency);
    // Checks for possible assignment to a future variable from the current variable assignment.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _checkForward);
    // In the case of polynomial constraints and when there are four or more unassigned variables, all combinations of assignments of unassigned variables are examined and pruned.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _checkForwardConsistencyN);
    // Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there are three unassigned variables in the scope of the constraint).
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _checkForwardConsistency5);
    // Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there are two unassigned variables in the scope of the constraint).
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _checkForwardConsistency3);
    // Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there is one unassigned variable in the scope of the constraint).
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _checkForwardConsistency);
    // Prune elements of the domain that make the unary constraint worse than the current worst degree.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _pruneUnaryConstraints);
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
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _solWorstDeg, {
      writable: true,
      value: 0
    });
    // Degree of existing solutions (no need to find a solution less than this).
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _iterCount, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _endTime, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _useMRV, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _degInc, {
      writable: true,
      value: 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _sequence, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _unaryCons, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _checkedCons, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _pruneIntensively, {
      writable: true,
      value: false
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _vars, _toConsumableArray(_this._pro.variables()));
    _classPrivateFieldSet(_assertThisInitialized(_this), _sequence, new Array(_this._pro.variableSize()));
    _classPrivateMethodGet(_assertThisInitialized(_this), _initializeRelatedConstraintTable, _initializeRelatedConstraintTable2).call(_assertThisInitialized(_this));
    _classPrivateFieldSet(_assertThisInitialized(_this), _checkedCons, new Array(_this._pro.constraintSize()));
    var temp = [];
    var _iterator = _createForOfIteratorHelper(_this._pro.constraints()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var c = _step.value;
        if (c.size() === 1) temp.push(c);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    _classPrivateFieldSet(_assertThisInitialized(_this), _unaryCons, [].concat(temp)); // To make it even if it is empty.
    if (worstSatisfactionDegree) {
      _classPrivateFieldSet(_assertThisInitialized(_this), _solWorstDeg, worstSatisfactionDegree);
    }
    return _this;
  }
  _createClass(FuzzyForwardChecking, [{
    key: "name",
    value: function name() {
      return 'Forward Checking for Fuzzy CSPs';
    }
  }, {
    key: "exec",
    value:
    // Do search.
    function exec() {
      _classPrivateFieldSet(this, _endTime, this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit);
      _classPrivateFieldSet(this, _iterCount, 0);
      var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _v = _step2.value;
          _v.solverObject = new _domainPruner.DomainPruner(_v.domain().size()); // Generation of domain pruners.
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this._pro.clearAllVariables();
      if (!_classPrivateMethodGet(this, _pruneUnaryConstraints, _pruneUnaryConstraints2).call(this)) return false; // Since _worstSatisfactionDegree_ has been updated, call this function.

      var success = false;
      while (true) {
        var bc = _classPrivateMethodGet(this, _branch, _branch2).call(this, 0);
        if (bc === FuzzyForwardChecking.TERMINATE) {
          var _this$iterCount5, _this$iterCount6;
          if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount5 = _classPrivateFieldGet(this, _iterCount), _this$iterCount6 = _this$iterCount5++, _this$iterCount5)), _this$iterCount6)) {
            this._debugOutput('stop: number of iterations has reached the limit');
            break;
          }
          if (_classPrivateFieldGet(this, _endTime) < Date.now()) {
            this._debugOutput('stop: time limit has been reached');
            break;
          }
        }
        if (_classPrivateFieldGet(this, _sol).isEmpty()) {
          break;
        }
        this._debugOutput("\tfound a solution: ".concat(_classPrivateFieldGet(this, _solWorstDeg)));
        if (this.foundSolution(_classPrivateFieldGet(this, _sol), _classPrivateFieldGet(this, _solWorstDeg))) {
          // Call hook
          success = true;
          break;
        }
        if (this._targetDeg === null) {
          // Degree not specified
          success = true;
          _classPrivateFieldSet(this, _solWorstDeg, _classPrivateFieldGet(this, _solWorstDeg) + _classPrivateFieldGet(this, _degInc)); // Find the next solution within the limit.
        } else if (this._targetDeg <= _classPrivateFieldGet(this, _solWorstDeg)) {
          // The current degree exceeded the specified degree.
          this._debugOutput('stop: current degree is above the target');
          success = true;
          break;
        }
        var _iterator3 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var v = _step3.value;
            v.solverObject.revealAll();
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      _classPrivateFieldGet(this, _sol).apply();
      var _iterator4 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _v2 = _step4.value;
          _v2.solverObject = null;
        } // Delete branch pruner
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return success;
    }

    /**
     * Constraint satisfaction degree is set as an achievement goal that serves as a condition for stopping the solver.
     * The solver stops as successful when the specified degree is reached or exceeded.
     * The default (unset) is 0.8.
     * @param rate Degree. null indicates not set.
     */
  }, {
    key: "setTargetRate",
    value: function setTargetRate() {
      var rate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this._targetDeg = rate;
      if (this._targetDeg === null) {
        _classPrivateFieldSet(this, _solWorstDeg, 0);
      } else {
        // Find the worstSatisfactionDegree_ that is slightly smaller than the targetDegree_.
        var e = Number.MIN_VALUE;
        _classPrivateFieldSet(this, _solWorstDeg, this._targetDeg - e);
        while (_classPrivateFieldGet(this, _solWorstDeg) >= this._targetDeg) {
          e *= 10;
          _classPrivateFieldSet(this, _solWorstDeg, this._targetDeg - e);
        }
      }
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

    /**
     * If a solution is found and the search continues, it specifies how much the worst constraint satisfaction degree should be increased.
     * @param degree Increasing constraint satisfaction degree.
     */
  }, {
    key: "setIncrementStepOfWorstSatisfactionDegree",
    value: function setIncrementStepOfWorstSatisfactionDegree(degree) {
      _classPrivateFieldSet(this, _degInc, degree);
    }

    /**
     * Specifies whether or not to intensively prune branches when the problem contains 3- or n-ary constraints.
     * Depending on the problem, intensive pruning may increase processing time.
     * Default is false.
     * @param flag Whether or not to intensively prune branches.
     */
  }, {
    key: "setIntensivePruning",
    value: function setIntensivePruning(flag) {
      _classPrivateFieldSet(this, _pruneIntensively, flag);
    }
  }]);
  return FuzzyForwardChecking;
}(_solver.Solver);
exports.FuzzyForwardChecking = FuzzyForwardChecking;
function _initializeRelatedConstraintTable2() {
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
function _getConstraintsBetween2(vi_index, vj_index) {
  if (vi_index < vj_index) {
    return _classPrivateFieldGet(this, _relCons)[vj_index][vi_index];
  }
  return _classPrivateFieldGet(this, _relCons)[vi_index][vj_index];
}
function _pruneUnaryConstraints2() {
  var _iterator5 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _unaryCons)),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var c = _step5.value;
      var v = c.at(0);
      var orgVal = v.value(); // Save the value.
      var d = v.domain();
      var dc = v.solverObject;
      for (var i = 0, n = d.size(); i < n; ++i) {
        v.assign(d.at(i));
        if (c.satisfactionDegree() <= _classPrivateFieldGet(this, _solWorstDeg)) {
          dc.hide(i, -1); // Here's a branch pruning!
        }
      }

      v.assign(orgVal); // Restore the value.
      if (dc.isEmpty()) return false;
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return true;
}
function _checkForwardConsistency2(level, vi, c) {
  var di = vi.domain();
  var dci = vi.solverObject;
  for (var i = 0, n = di.size(); i < n; ++i) {
    if (dci.isValueHidden(i)) continue;
    vi.assign(di.at(i));
    if (c.satisfactionDegree() <= _classPrivateFieldGet(this, _solWorstDeg)) {
      // It is not a solution when it is 'smaller than or equals'.
      dci.hide(i, level); // Here's a branch pruning!
    }
  }

  vi.clear();
  return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
}
function _checkForwardConsistency4(level, vi, c) {
  var di = vi.domain();
  var dci = vi.solverObject;
  var vj = null;
  var _iterator6 = _createForOfIteratorHelper(c),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var v = _step6.value;
      if (v.isEmpty() && v !== vi) {
        v, _readOnlyError("vj");
        break;
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  var dj = vj.domain();
  var dcj = vj.solverObject;
  loop_i: for (var i = 0, ni = di.size(); i < ni; ++i) {
    if (dci.isValueHidden(i)) continue;
    vi.assign(di.at(i)); // Tentative assignment to vi
    for (var j = 0, nj = dj.size(); j < nj; ++j) {
      if (dcj.isValueHidden(j)) continue;
      vj.assign(dj.at(j)); // Tentative assignment to vj
      var s = c.satisfactionDegree();
      if (s > _classPrivateFieldGet(this, _solWorstDeg)) continue loop_i; // Tentative assignment to vi was OK -> next tentative assignment.
    }

    dci.hide(i, level); // It is not a solution when it is 'smaller than or equals'.
  }

  vj.clear();
  vi.clear();
  return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
}
function _checkForwardConsistency6(level, vi, c) {
  var di = vi.domain();
  var dci = vi.solverObject;
  var vj = null;
  var vk = null;
  var _iterator7 = _createForOfIteratorHelper(c),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var v = _step7.value;
      if (v.isEmpty() && v !== vi) {
        if (vj === null) {
          vj = v;
        } else {
          vk = v;
          break;
        }
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  var dj = vj.domain();
  var dk = vk.domain();
  var dcj = vj.solverObject;
  var dck = vk.solverObject;
  loop_i: for (var i = 0, ni = di.size(); i < ni; ++i) {
    if (dci.isValueHidden(i)) continue;
    vi.assign(di.at(i)); // Tentative assignment to vi
    for (var j = 0, nj = dj.size(); j < nj; ++j) {
      if (dcj.isValueHidden(j)) continue;
      vj.assign(dj.at(j)); // Tentative assignment to vj
      for (var k = 0, nk = dk.size(); k < nk; ++k) {
        if (dck.isValueHidden(k)) continue;
        vk.assign(dk.at(k)); // Tentative assignment to vk
        var s = c.satisfactionDegree();
        if (s > _classPrivateFieldGet(this, _solWorstDeg)) continue loop_i; // Tentative assignment to vi was OK -> next tentative assignment.
      }
    }

    dci.hide(i, level); // It is not a solution when it is 'smaller than or equals'.
  }

  vk.clear();
  vj.clear();
  vi.clear();
  return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
}
function _checkForwardConsistencyN2(level, vi, c, emptySize) {
  var di = vi.domain();
  var dci = vi.solverObject;
  var emp = new Array(emptySize - 1);
  var j = 0;
  var _iterator8 = _createForOfIteratorHelper(c),
    _step8;
  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var _v3 = _step8.value;
      if (_v3.isEmpty() && _v3 !== vi) emp[j++] = _v3;
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  var indexes = new Array(emp.length);
  loop_i: for (var i = 0, n = di.size(); i < n; ++i) {
    if (dci.isValueHidden(i)) continue;
    vi.assign(di.at(i)); // Tentative assignment to vi
    indexes.fill(0);
    comLoop: while (true) {
      var hidden = false;
      for (var k = 0; k < emp.length; ++k) {
        var dk = emp[k].domain();
        var dck = emp[k].solverObject;
        if (dck.isValueHidden(indexes[k])) {
          hidden = true;
          break;
        }
        emp[k].assign(dk.at(indexes[k]));
      }
      if (!hidden) {
        var s = c.satisfactionDegree();
        if (s > _classPrivateFieldGet(this, _solWorstDeg)) continue loop_i; // Tentative assignment to vi was OK -> next tentative assignment.
      }

      for (var _k = 0; _k < emp.length; ++_k) {
        indexes[_k] += 1;
        if (indexes[_k] < emp[_k].domain().size()) break;
        indexes[_k] = 0;
        if (_k === emp.length - 1) break comLoop;
      }
    }
    dci.hide(i, level);
  }
  for (var _i = 0, _emp = emp; _i < _emp.length; _i++) {
    var v = _emp[_i];
    v.clear();
  }
  vi.clear();
  return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
}
function _checkForward2(level, index) {
  var _iterator9 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var v_i = _step9.value;
      if (!v_i.isEmpty()) continue; // If it is a past or present variable.

      var cs = _classPrivateMethodGet(this, _getConstraintsBetween, _getConstraintsBetween2).call(this, index, v_i.index());
      var _iterator10 = _createForOfIteratorHelper(cs),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var c = _step10.value;
          var emptySize = c.emptyVariableSize();
          if (emptySize === 1) {
            if (!_classPrivateMethodGet(this, _checkForwardConsistency, _checkForwardConsistency2).call(this, level, v_i, c)) return false;
          } else if (_classPrivateFieldGet(this, _pruneIntensively)) {
            // Depends on options
            if (emptySize === 2) {
              if (!_classPrivateMethodGet(this, _checkForwardConsistency3, _checkForwardConsistency4).call(this, level, v_i, c)) return false;
            } else if (emptySize === 3) {
              if (!_classPrivateMethodGet(this, _checkForwardConsistency5, _checkForwardConsistency6).call(this, level, v_i, c)) return false;
            } else if (emptySize > 3) {
              if (!_classPrivateMethodGet(this, _checkForwardConsistencyN, _checkForwardConsistencyN2).call(this, level, v_i, c, emptySize)) return false;
            }
          }
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
  return true;
}
function _checkBackwardConsistency2(vc) {
  _classPrivateFieldGet(this, _checkedCons).fill(false); // Reuse.

  for (var i = 0; i < _classPrivateFieldGet(this, _vars).length; ++i) {
    // Find past variables.
    var vi = _classPrivateFieldGet(this, _vars)[i];
    if (vi === vc || vi.isEmpty()) continue; // If it is a future variable or a present variable.
    var cs = _classPrivateMethodGet(this, _getConstraintsBetween, _getConstraintsBetween2).call(this, vc.index(), i);
    var _iterator11 = _createForOfIteratorHelper(cs),
      _step11;
    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var c = _step11.value;
        if (_classPrivateFieldGet(this, _checkedCons)[c.index()]) continue; // Because of the possibility of duplication in polynomial constraints
        var s = c.satisfactionDegree();
        if (s !== _constraint.Constraint.UNDEFINED && s <= _classPrivateFieldGet(this, _solWorstDeg)) {
          // It is not a solution when it is 'smaller than or equals'.
          return false;
        }
        _classPrivateFieldGet(this, _checkedCons)[c.index()] = true;
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
  }
  return true;
}
function _refresh2() {
  for (var i = 0; i < _classPrivateFieldGet(this, _sequence).length; ++i) {
    var index_vi = _classPrivateFieldGet(this, _sequence)[i].index();
    for (var j = i + 1; j < _classPrivateFieldGet(this, _sequence).length; ++j) {
      var vj = _classPrivateFieldGet(this, _sequence)[j];
      var cs = _classPrivateMethodGet(this, _getConstraintsBetween, _getConstraintsBetween2).call(this, index_vi, vj.index());
      var _iterator12 = _createForOfIteratorHelper(cs),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var c = _step12.value;
          var orgVal = vj.value();
          var dj = vj.domain();
          var dcj = vj.solverObject;
          for (var k = 0, n = dj.size(); k < n; ++k) {
            if (dcj.isValueHidden(k)) continue;
            vj.assign(dj.at(k));
            if (c.satisfactionDegree() <= _classPrivateFieldGet(this, _solWorstDeg)) {
              dcj.hide(k, i); // Here's a branch pruning!
            }
          }

          vj.assign(orgVal);
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
    }
  }
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
  var bc = FuzzyForwardChecking.CONTINUE;
  var vc_index = _classPrivateFieldGet(this, _useMRV) ? _classPrivateMethodGet(this, _indexOfVariableWithMRV, _indexOfVariableWithMRV2).call(this) : level;
  var vc = _classPrivateFieldGet(this, _vars)[vc_index];
  var d = vc.domain();
  var dc = vc.solverObject;
  _classPrivateFieldGet(this, _sequence)[level] = vc;
  for (var i = 0, n = d.size(); i < n; ++i) {
    var _this$iterCount, _this$iterCount2;
    if (dc.isValueHidden(i)) continue;
    if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount = _classPrivateFieldGet(this, _iterCount), _this$iterCount2 = _this$iterCount++, _this$iterCount)), _this$iterCount2) || _classPrivateFieldGet(this, _endTime) < Date.now()) {
      bc = FuzzyForwardChecking.TERMINATE; // Search terminated due to restrictions.
      break;
    }
    vc.assign(d.at(i));
    var _iterator13 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
      _step13;
    try {
      for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
        var v = _step13.value;
        v.solverObject.reveal(level);
      }
    } catch (err) {
      _iterator13.e(err);
    } finally {
      _iterator13.f();
    }
    if (!_classPrivateMethodGet(this, _checkBackwardConsistency, _checkBackwardConsistency2).call(this, vc)) continue;
    if (!_classPrivateMethodGet(this, _checkForward, _checkForward2).call(this, level, vc_index)) continue;
    var nextLevel = level + 1;
    bc = nextLevel === _classPrivateFieldGet(this, _vars).length - 1 ? _classPrivateMethodGet(this, _branchLast, _branchLast2).call(this, nextLevel) : _classPrivateMethodGet(this, _branch, _branch2).call(this, nextLevel);
    if (bc === FuzzyForwardChecking.TERMINATE) break;
  }
  if (bc === FuzzyForwardChecking.CONTINUE) {
    // When searching back to the parent, undo the branch pruning here.
    var _iterator14 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
      _step14;
    try {
      for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
        var _v4 = _step14.value;
        _v4.solverObject.reveal(level);
      }
    } catch (err) {
      _iterator14.e(err);
    } finally {
      _iterator14.f();
    }
  }
  vc.clear();
  return bc;
}
function _branchLast2(level) {
  var bc = FuzzyForwardChecking.CONTINUE;
  var vc = _classPrivateFieldGet(this, _vars)[_classPrivateFieldGet(this, _useMRV) ? _classPrivateMethodGet(this, _indexOfVariableWithMRV, _indexOfVariableWithMRV2).call(this) : level];
  var d = vc.domain();
  var dc = vc.solverObject;
  _classPrivateFieldGet(this, _sequence)[level] = vc;
  for (var i = 0, n = d.size(); i < n; ++i) {
    var _this$iterCount3, _this$iterCount4;
    if (dc.isValueHidden(i)) continue;
    if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount3 = _classPrivateFieldGet(this, _iterCount), _this$iterCount4 = _this$iterCount3++, _this$iterCount3)), _this$iterCount4) || _classPrivateFieldGet(this, _endTime) < Date.now()) {
      bc = FuzzyForwardChecking.TERMINATE; // Search terminated due to restrictions.
      break;
    }
    vc.assign(d.at(i));
    var deg = this._pro.worstSatisfactionDegree();
    if (deg > _classPrivateFieldGet(this, _solWorstDeg)) {
      // A new solution is assumed when 'greater than'.
      _classPrivateFieldSet(this, _solWorstDeg, deg);
      _classPrivateFieldGet(this, _sol).setProblem(this._pro);
      bc = FuzzyForwardChecking.TERMINATE;
      if (this._targetDeg !== null && this._targetDeg <= _classPrivateFieldGet(this, _solWorstDeg)) {
        // Search ends when target is reached
        break;
      }
      _classPrivateMethodGet(this, _pruneUnaryConstraints, _pruneUnaryConstraints2).call(this);
      _classPrivateMethodGet(this, _refresh, _refresh2).call(this);
    }
  }
  vc.clear();
  return bc;
}
_defineProperty(FuzzyForwardChecking, "CONTINUE", 0);
_defineProperty(FuzzyForwardChecking, "TERMINATE", 1);
},{"../../problem/constraint.js":"../src/problem/constraint.js","../../util/assignment-list.js":"../src/util/assignment-list.js","../../util/domain-pruner.js":"../src/util/domain-pruner.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/fuzzy/fuzzy-forward-checking-bc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FuzzyForwardCheckingBc = void 0;
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } } /**
                                                                                                                                                                                                                                                                    * This class implements the forward checking method for fuzzy CSPs that contain only binary constraints.
                                                                                                                                                                                                                                                                    * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                                                                                                                                    */
var _vars = /*#__PURE__*/new WeakMap();
var _sol = /*#__PURE__*/new WeakMap();
var _relCons = /*#__PURE__*/new WeakMap();
var _solWorstDeg = /*#__PURE__*/new WeakMap();
var _iterCount = /*#__PURE__*/new WeakMap();
var _endTime = /*#__PURE__*/new WeakMap();
var _useMRV = /*#__PURE__*/new WeakMap();
var _degInc = /*#__PURE__*/new WeakMap();
var _initializeRelatedConstraintTable = /*#__PURE__*/new WeakSet();
var _getConstraintsBetween = /*#__PURE__*/new WeakSet();
var _checkForwardConsistency = /*#__PURE__*/new WeakSet();
var _checkForward = /*#__PURE__*/new WeakSet();
var _indexOfVariableWithMRV = /*#__PURE__*/new WeakSet();
var _branch = /*#__PURE__*/new WeakSet();
var _branchLast = /*#__PURE__*/new WeakSet();
var FuzzyForwardCheckingBc = /*#__PURE__*/function (_Solver) {
  _inherits(FuzzyForwardCheckingBc, _Solver);
  var _super = _createSuper(FuzzyForwardCheckingBc);
  /**
   * Generates the solver given a fuzzy constraint satisfaction problem.
   * @param p A fuzzy problem.
   * @param worstSatisfactionDegree Worst satisfaction degree.
   */
  function FuzzyForwardCheckingBc(p) {
    var _this;
    var worstSatisfactionDegree = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    _classCallCheck(this, FuzzyForwardCheckingBc);
    _this = _super.call(this, p);
    // Performs search on the last variable.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _branchLast);
    // Performs search one variable at a time.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _branch);
    // Returns the index of the smallest domain variable.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _indexOfVariableWithMRV);
    // Checks for possible assignment to a future variable from the current variable assignment.
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _checkForward);
    // Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there is one unassigned variable in the scope of the constraint).
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _checkForwardConsistency);
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
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _solWorstDeg, {
      writable: true,
      value: 0
    });
    // Degree of existing solutions (no need to find a solution less than this).
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _iterCount, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _endTime, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _useMRV, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _degInc, {
      writable: true,
      value: 0
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _vars, _toConsumableArray(_this._pro.variables()));
    _classPrivateMethodGet(_assertThisInitialized(_this), _initializeRelatedConstraintTable, _initializeRelatedConstraintTable2).call(_assertThisInitialized(_this));
    _classPrivateFieldSet(_assertThisInitialized(_this), _solWorstDeg, Math.max(0, p.worstSatisfactionDegree()));
    if (worstSatisfactionDegree) {
      _classPrivateFieldSet(_assertThisInitialized(_this), _solWorstDeg, worstSatisfactionDegree);
    }
    return _this;
  }
  _createClass(FuzzyForwardCheckingBc, [{
    key: "name",
    value: function name() {
      return 'Forward Checking for Fuzzy CSPs of Binary Constraints';
    }
  }, {
    key: "foundSolution",
    value: function foundSolution() {
      return false;
    }
  }, {
    key: "exec",
    value:
    // Do search.
    function exec() {
      _classPrivateFieldSet(this, _endTime, this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit);
      _classPrivateFieldSet(this, _iterCount, 0);
      var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _v = _step.value;
          _v.solverObject = new _domainPruner.DomainPruner(_v.domain().size()); // Generation of domain pruners.
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this._pro.clearAllVariables();
      var sol = new _assignmentList.AssignmentList();
      var success = false;
      while (true) {
        var bc = _classPrivateMethodGet(this, _branch, _branch2).call(this, 0);
        if (bc === FuzzyForwardCheckingBc.TERMINATE) {
          var _this$iterCount5, _this$iterCount6;
          if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount5 = _classPrivateFieldGet(this, _iterCount), _this$iterCount6 = _this$iterCount5++, _this$iterCount5)), _this$iterCount6)) {
            this._debugOutput('stop: number of iterations has reached the limit');
            break;
          }
          if (_classPrivateFieldGet(this, _endTime) < Date.now()) {
            this._debugOutput('stop: time limit has been reached');
            break;
          }
        }
        if (_classPrivateFieldGet(this, _sol).isEmpty()) {
          break;
        }
        sol.setAssignmentList(_classPrivateFieldGet(this, _sol));
        _classPrivateFieldGet(this, _sol).clear(); // Clear it so that if the solution is not found in the next search, it will be known.

        this._debugOutput("\tfound a solution: ".concat(_classPrivateFieldGet(this, _solWorstDeg)));
        if (this.foundSolution(sol, _classPrivateFieldGet(this, _solWorstDeg))) {
          // Call hook
          success = true;
          break;
        }
        if (this._targetDeg === null) {
          // Degree not specified
          success = true;
          if (_classPrivateFieldGet(this, _solWorstDeg) + _classPrivateFieldGet(this, _degInc) > 1) break;
          _classPrivateFieldSet(this, _solWorstDeg, _classPrivateFieldGet(this, _solWorstDeg) + (_classPrivateFieldGet(this, _solWorstDeg) + _classPrivateFieldGet(this, _degInc) > 1 ? 0 : _classPrivateFieldGet(this, _degInc))); // Find the next solution within the limit.
        } else if (this._targetDeg <= _classPrivateFieldGet(this, _solWorstDeg)) {
          // The current degree exceeded the specified degree.
          this._debugOutput("stop: current degree is above the target");
          success = true;
          break;
        }
        var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var v = _step2.value;
            v.solverObject.revealAll();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      sol.apply();
      var _iterator3 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _v2 = _step3.value;
          _v2.solverObject = null;
        } // Delete branch pruner
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return success;
    }

    /**
     * Constraint satisfaction degree is set as an achievement goal that serves as a condition for stopping the solver.
     * The solver stops as successful when the specified degree is reached or exceeded.
     * The default (unset) is 0.8.
     * @param rate Degree. null indicates not set.
     */
  }, {
    key: "setTargetRate",
    value: function setTargetRate() {
      var rate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this._targetDeg = rate;
      if (this._targetDeg === null) {
        _classPrivateFieldSet(this, _solWorstDeg, 0);
      } else {
        // Find the worstSatisfactionDegree_ that is slightly smaller than the targetDegree_.
        var e = Number.MIN_VALUE;
        _classPrivateFieldSet(this, _solWorstDeg, this._targetDeg - e);
        while (_classPrivateFieldGet(this, _solWorstDeg) >= this._targetDeg) {
          e *= 10;
          _classPrivateFieldSet(this, _solWorstDeg, this._targetDeg - e);
        }
      }
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

    /**
     * If a solution is found and the search continues, it specifies how much the worst constraint satisfaction degree should be increased.
     * @param degree Increasing constraint satisfaction degree.
     */
  }, {
    key: "setIncrementStepOfWorstSatisfactionDegree",
    value: function setIncrementStepOfWorstSatisfactionDegree(degree) {
      _classPrivateFieldSet(this, _degInc, degree);
    }
  }]);
  return FuzzyForwardCheckingBc;
}(_solver.Solver);
exports.FuzzyForwardCheckingBc = FuzzyForwardCheckingBc;
function _initializeRelatedConstraintTable2() {
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
function _getConstraintsBetween2(vi_index, vj_index) {
  if (vi_index < vj_index) {
    return _classPrivateFieldGet(this, _relCons)[vj_index][vi_index];
  }
  return _classPrivateFieldGet(this, _relCons)[vi_index][vj_index];
}
function _checkForwardConsistency2(level, vi, c) {
  var di = vi.domain();
  var dci = vi.solverObject;
  for (var i = 0, n = di.size(); i < n; ++i) {
    if (dci.isValueHidden(i)) continue;
    vi.assign(di.at(i));
    if (c.satisfactionDegree() <= _classPrivateFieldGet(this, _solWorstDeg)) {
      // It is not a solution when it is 'smaller than or equals'.
      dci.hide(i, level); // Here's a branch pruning!
    }
  }

  vi.clear();
  return !dci.isEmpty(); // Succeeds if the domain di of the future variable vi is not empty.
}
function _checkForward2(level, index) {
  var _iterator4 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var v_i = _step4.value;
      if (!v_i.isEmpty()) continue; // If it is a past or present variable.

      var cs = _classPrivateMethodGet(this, _getConstraintsBetween, _getConstraintsBetween2).call(this, index, v_i.index());
      var _iterator5 = _createForOfIteratorHelper(cs),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var c = _step5.value;
          if (c.size() === 2) {
            // If it is a binary constraint.
            if (!_classPrivateMethodGet(this, _checkForwardConsistency, _checkForwardConsistency2).call(this, level, v_i, c)) return false;
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
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
  var bc = FuzzyForwardCheckingBc.CONTINUE;
  var vc_index = _classPrivateFieldGet(this, _useMRV) ? _classPrivateMethodGet(this, _indexOfVariableWithMRV, _indexOfVariableWithMRV2).call(this) : level;
  var vc = _classPrivateFieldGet(this, _vars)[vc_index];
  var d = vc.domain();
  var dc = vc.solverObject;
  for (var i = 0, n = d.size(); i < n; ++i) {
    var _this$iterCount, _this$iterCount2;
    if (dc.isValueHidden(i)) continue;
    if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount = _classPrivateFieldGet(this, _iterCount), _this$iterCount2 = _this$iterCount++, _this$iterCount)), _this$iterCount2) || _classPrivateFieldGet(this, _endTime) < Date.now()) {
      bc = FuzzyForwardCheckingBc.TERMINATE; // Search terminated due to restrictions.
      break;
    }
    vc.assign(d.at(i));
    var _iterator6 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var v = _step6.value;
        v.solverObject.reveal(level);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    if (!_classPrivateMethodGet(this, _checkForward, _checkForward2).call(this, level, vc_index)) continue;
    var nextLevel = level + 1;
    bc = nextLevel === _classPrivateFieldGet(this, _vars).length - 1 ? _classPrivateMethodGet(this, _branchLast, _branchLast2).call(this, nextLevel) : _classPrivateMethodGet(this, _branch, _branch2).call(this, nextLevel);
    if (bc === FuzzyForwardCheckingBc.TERMINATE) break;
  }
  if (bc === FuzzyForwardCheckingBc.CONTINUE) {
    // When searching back to the parent, undo the branch pruning here.
    var _iterator7 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _vars)),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var _v3 = _step7.value;
        _v3.solverObject.reveal(level);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  }
  vc.clear();
  return bc;
}
function _branchLast2(level) {
  var bc = FuzzyForwardCheckingBc.CONTINUE;
  var vc = _classPrivateFieldGet(this, _vars)[_classPrivateFieldGet(this, _useMRV) ? _classPrivateMethodGet(this, _indexOfVariableWithMRV, _indexOfVariableWithMRV2).call(this) : level];
  var d = vc.domain();
  var dc = vc.solverObject;
  for (var i = 0, n = d.size(); i < n; ++i) {
    var _this$iterCount3, _this$iterCount4;
    if (dc.isValueHidden(i)) continue;
    if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount3 = _classPrivateFieldGet(this, _iterCount), _this$iterCount4 = _this$iterCount3++, _this$iterCount3)), _this$iterCount4) || _classPrivateFieldGet(this, _endTime) < Date.now()) {
      bc = FuzzyForwardCheckingBc.TERMINATE; // Search terminated due to restrictions.
      break;
    }
    vc.assign(d.at(i));
    var deg = this._pro.worstSatisfactionDegree();
    if (deg > _classPrivateFieldGet(this, _solWorstDeg)) {
      // A new solution is assumed when 'greater than'.
      _classPrivateFieldSet(this, _solWorstDeg, deg);
      _classPrivateFieldGet(this, _sol).setProblem(this._pro);
      bc = FuzzyForwardCheckingBc.TERMINATE; // Search terminated due to restrictions.
      if (this._targetDeg !== null && this._targetDeg <= _classPrivateFieldGet(this, _solWorstDeg)) {
        // Search ends when target is reached
        break;
      }
    }
  }
  vc.clear();
  return bc;
}
_defineProperty(FuzzyForwardCheckingBc, "CONTINUE", 0);
_defineProperty(FuzzyForwardCheckingBc, "TERMINATE", 1);
},{"../../util/assignment-list.js":"../src/util/assignment-list.js","../../util/domain-pruner.js":"../src/util/domain-pruner.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/fuzzy/flexible-local-changes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlexibleLocalChanges = void 0;
var _constraint = require("../../problem/constraint.js");
var _assignmentList = require("../../util/assignment-list.js");
var _solver = require("../solver.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; } /**
                                                                                                                                                                                    * A class that implements the flexible local changes method.
                                                                                                                                                                                    *
                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                                                    */
var _lt = /*#__PURE__*/new WeakMap();
var _lb = /*#__PURE__*/new WeakMap();
var _iterCount = /*#__PURE__*/new WeakMap();
var _endTime = /*#__PURE__*/new WeakMap();
var _globalReturn = /*#__PURE__*/new WeakMap();
var _choose = /*#__PURE__*/new WeakSet();
var _computeHighestAndLowestConsistencyDegree = /*#__PURE__*/new WeakSet();
var _flcRepair = /*#__PURE__*/new WeakSet();
var _flcVariable = /*#__PURE__*/new WeakSet();
var _flcVariables = /*#__PURE__*/new WeakSet();
var _initTest = /*#__PURE__*/new WeakSet();
var _testX = /*#__PURE__*/new WeakSet();
var _testX3 = /*#__PURE__*/new WeakSet();
var FlexibleLocalChanges = /*#__PURE__*/function (_Solver) {
  _inherits(FlexibleLocalChanges, _Solver);
  var _super = _createSuper(FlexibleLocalChanges);
  function FlexibleLocalChanges(p) {
    var _this;
    _classCallCheck(this, FlexibleLocalChanges);
    _this = _super.call(this, p);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _testX3);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _testX);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _initTest);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _flcVariables);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _flcVariable);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _flcRepair);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _computeHighestAndLowestConsistencyDegree);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _choose);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _lt, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _lb, {
      writable: true,
      value: void 0
    });
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
    _classPrivateMethodGet(_assertThisInitialized(_this), _computeHighestAndLowestConsistencyDegree, _computeHighestAndLowestConsistencyDegree2).call(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(FlexibleLocalChanges, [{
    key: "name",
    value: function name() {
      return 'Flexible Local Changes';
    }
  }, {
    key: "exec",
    value: function exec() {
      _classPrivateFieldSet(this, _endTime, this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit);
      _classPrivateFieldSet(this, _iterCount, 0);
      _classPrivateFieldSet(this, _globalReturn, -1);
      var wsd = this._pro.worstSatisfactionDegree();
      if (this._pro.emptyVariableSize() === 0) {
        this._pro.clearAllVariables();
      }
      var X1 = new Set();
      var X2 = new Set(); // Currently assigned variables.
      var X3 = new Set(); // Currently unassigned variables.
      var _iterator = _createForOfIteratorHelper(this._pro.variables()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;
          (!v.isEmpty() ? X2 : X3).add(v);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var cr = new Set();
      var initCons = _classPrivateMethodGet(this, _initTest, _initTest2).call(this, X2, cr);
      var rc;
      var initSol = null;
      if (X3.size === 0) {
        rc = initCons;
        initSol = _assignmentList.AssignmentList.fromVariables(X2);
      } else {
        rc = _classPrivateFieldGet(this, _lb);
      }
      var X3p = _classStaticPrivateMethodGet(FlexibleLocalChanges, FlexibleLocalChanges, _setPlusSet).call(FlexibleLocalChanges, _classPrivateMethodGet(this, _choose, _choose2).call(this, X2, cr), X3);
      var X2p = _classStaticPrivateMethodGet(FlexibleLocalChanges, FlexibleLocalChanges, _setMinusSet).call(FlexibleLocalChanges, X2, X3p);
      var result = _classPrivateMethodGet(this, _flcVariables, _flcVariables2).call(this, X1, X2p, X3p, _classPrivateFieldGet(this, _lt), _classPrivateFieldGet(this, _lt), rc);
      if (result < rc) {
        if (initSol !== null) {
          initSol.apply();
        }
      }
      result = this._pro.worstSatisfactionDegree();
      return result > wsd && result > 0 && (_classPrivateFieldGet(this, _globalReturn) !== 0 || this._targetDeg === null);
    }
  }]);
  return FlexibleLocalChanges;
}(_solver.Solver);
exports.FlexibleLocalChanges = FlexibleLocalChanges;
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
function _choose2(x2, cr) {
  var res = new Map();
  var _iterator4 = _createForOfIteratorHelper(cr),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var c = _step4.value;
      if (!c.isDefined()) {
        continue;
      }
      var _iterator6 = _createForOfIteratorHelper(c),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var v = _step6.value;
          if (!res.has(v)) {
            res.set(v, 1);
          } else {
            res.set(v, res.get(v) + 1);
          }
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
  var vs = _toConsumableArray(x2);
  vs.sort(function (o1, o2) {
    var res1 = 0;
    var res2 = 0;
    if (res.has(o1)) res1 = res.get(o1);
    if (res.has(o2)) res2 = res.get(o2);
    if (res1 < res2) return 1;
    if (res1 > res2) return -1;
    return 0;
  });
  var ret = new Set();
  var _iterator5 = _createForOfIteratorHelper(vs),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _v = _step5.value;
      var remain = false;
      var _iterator7 = _createForOfIteratorHelper(cr),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _c = _step7.value;
          if (_c.isDefined()) {
            remain = true;
            break;
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      if (!remain) break;
      _v.clear();
      ret.add(_v);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return ret;
}
function _computeHighestAndLowestConsistencyDegree2() {
  var low = 1;
  var high = 0;
  var _iterator8 = _createForOfIteratorHelper(this._pro.variables()),
    _step8;
  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var v = _step8.value;
      var _iterator9 = _createForOfIteratorHelper(v),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var c = _step9.value;
          var l = c.lowestConsistencyDegree();
          var h = c.highestConsistencyDegree();
          if (l < low) low = l;
          if (h > high) high = h;
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  _classPrivateFieldSet(this, _lb, low);
  _classPrivateFieldSet(this, _lt, high);
}
function _flcRepair2(X1, X2, xi, consX1xi, consX12, cr, rc) {
  var X3p = _classPrivateMethodGet(this, _choose, _choose2).call(this, X2, cr);
  var X1p = _classStaticPrivateMethodGet(FlexibleLocalChanges, FlexibleLocalChanges, _setPlusElement).call(FlexibleLocalChanges, X1, xi);
  var X2p = _classStaticPrivateMethodGet(FlexibleLocalChanges, FlexibleLocalChanges, _setMinusSet).call(FlexibleLocalChanges, X2, X3p);
  return _classPrivateMethodGet(this, _flcVariables, _flcVariables2).call(this, X1p, X2p, X3p, consX1xi, Math.min(consX12, consX1xi), rc);
}
function _flcVariable2(X1, X2, xi, consX1, consX12, rc) {
  var bestCons = _classPrivateFieldGet(this, _lb);
  if (xi.domain().size() === 0) {
    return bestCons;
  }
  var bestX2 = _assignmentList.AssignmentList.fromVariables(X2);
  var bestDij = xi.domain().at(0);
  var x2Store = _assignmentList.AssignmentList.fromVariables(X2);
  for (var j = 0; j < xi.domain().size() && bestCons < consX12; ++j) {
    var dij = xi.domain().at(j);
    xi.assign(dij);
    var consX1_xi = Math.min(consX1, _classPrivateMethodGet(this, _testX, _testX2).call(this, X1, xi, bestCons, rc));
    if (consX1_xi > Math.max(bestCons, rc)) {
      var crNew = new Set();
      var consX12_xi = Math.min(Math.min(consX1_xi, consX12), _classPrivateMethodGet(this, _testX3, _testX4).call(this, X1, X2, xi, consX1_xi, consX12, crNew));
      if (consX12_xi > bestCons) {
        bestCons = consX12_xi;
        bestDij = dij;
        bestX2 = _assignmentList.AssignmentList.fromVariables(X2);
      }
      if (crNew.size) {
        var repairCons = _classPrivateMethodGet(this, _flcRepair, _flcRepair2).call(this, X1, X2, xi, consX1_xi, consX12, crNew, Math.max(rc, bestCons));
        if (_classPrivateFieldGet(this, _globalReturn) !== -1) {
          return bestCons;
        }
        if (repairCons > bestCons) {
          bestCons = repairCons;
          bestDij = dij;
          bestX2 = _assignmentList.AssignmentList.fromVariables(X2);
        }
        x2Store.apply();
      }
    }
  }
  bestX2.apply();
  xi.assign(bestDij);
  return bestCons;
}
function _flcVariables2(X1, X2, X3, consX1, consX12, rc) {
  var _this$iterCount, _this$iterCount2;
  this._debugOutput("X1 ".concat(X1.size, ", X2' ").concat(X2.size, ", X3' ").concat(X3.size));
  if (this._targetDeg !== null && this._targetDeg <= this._pro.worstSatisfactionDegree()) {
    // Success if the degree improves from specified
    this._debugOutput('stop: current degree is above the target');
    _classPrivateFieldSet(this, _globalReturn, 1);
    return consX12;
  }
  if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount = _classPrivateFieldGet(this, _iterCount), _this$iterCount2 = _this$iterCount++, _this$iterCount)), _this$iterCount2)) {
    // Failure if repeated a specified number
    this._debugOutput('stop: number of iterations has reached the limit');
    _classPrivateFieldSet(this, _globalReturn, 0);
    return consX12;
  }
  if (_classPrivateFieldGet(this, _endTime) < Date.now()) {
    // Failure if time limit is exceeded
    this._debugOutput('stop: time limit has been reached');
    _classPrivateFieldSet(this, _globalReturn, 0);
    return consX12;
  }
  if (X3.size === 0) {
    return consX12;
  }
  var xi = X3.values().next().value;
  var consX12xi = _classPrivateMethodGet(this, _flcVariable, _flcVariable2).call(this, X1, X2, xi, consX1, consX12, rc);
  if (_classPrivateFieldGet(this, _globalReturn) !== -1) {
    return consX12;
  }
  if (consX12xi < rc) {
    return _classPrivateFieldGet(this, _lb);
  }
  X2 = _classStaticPrivateMethodGet(FlexibleLocalChanges, FlexibleLocalChanges, _setPlusElement).call(FlexibleLocalChanges, X2, xi);
  X3 = _classStaticPrivateMethodGet(FlexibleLocalChanges, FlexibleLocalChanges, _setMinusElement).call(FlexibleLocalChanges, X3, xi);
  return _classPrivateMethodGet(this, _flcVariables, _flcVariables2).call(this, X1, X2, X3, consX1, consX12xi, rc);
}
function _initTest2(X, cr) {
  var cs = new Set();
  var _iterator10 = _createForOfIteratorHelper(X),
    _step10;
  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var v = _step10.value;
      var _iterator13 = _createForOfIteratorHelper(v),
        _step13;
      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var c = _step13.value;
          cs.add(c); // All variables in X have been assigned.
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }
  var ret = 1;
  var _iterator11 = _createForOfIteratorHelper(cs),
    _step11;
  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var _c2 = _step11.value;
      var sd = _c2.satisfactionDegree();
      if (sd === _constraint.Constraint.UNDEFINED) continue;
      if (sd < ret) ret = sd;
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }
  var _iterator12 = _createForOfIteratorHelper(this._pro.constraints()),
    _step12;
  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      var _c3 = _step12.value;
      var cd = _c3.lowestConsistencyDegree();
      if (cd < _classPrivateFieldGet(this, _lt)) cr.add(_c3);
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }
  return ret;
}
function _testX2(X1, xi, bestCons, rc) {
  var cd = 1;
  var cs = new Set();
  var _iterator14 = _createForOfIteratorHelper(X1),
    _step14;
  try {
    for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
      var v = _step14.value;
      var temp = this._pro.constraintsBetween(v, xi);
      var _iterator16 = _createForOfIteratorHelper(temp),
        _step16;
      try {
        for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
          var c = _step16.value;
          cs.add(c);
        }
      } catch (err) {
        _iterator16.e(err);
      } finally {
        _iterator16.f();
      }
    }
  } catch (err) {
    _iterator14.e(err);
  } finally {
    _iterator14.f();
  }
  var _iterator15 = _createForOfIteratorHelper(cs),
    _step15;
  try {
    for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
      var _c4 = _step15.value;
      var d = _c4.satisfactionDegree();
      if (d === _constraint.Constraint.UNDEFINED) continue;
      if (d < cd) cd = d;
      if (cd <= bestCons || cd <= rc) return cd; // If it is determined that a better solution than the current solution cannot be obtained
    }
  } catch (err) {
    _iterator15.e(err);
  } finally {
    _iterator15.f();
  }
  return cd;
}
function _testX4(X1, X2, xi, consX1xi, consX12, cr) {
  var csd = 1;
  var cs = new Set();
  var _iterator17 = _createForOfIteratorHelper(X1),
    _step17;
  try {
    for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
      var v = _step17.value;
      var temp = this._pro.constraintsBetween(v, xi);
      var _iterator21 = _createForOfIteratorHelper(temp),
        _step21;
      try {
        for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
          var c = _step21.value;
          cs.add(c);
        }
      } catch (err) {
        _iterator21.e(err);
      } finally {
        _iterator21.f();
      }
    }
  } catch (err) {
    _iterator17.e(err);
  } finally {
    _iterator17.f();
  }
  var _iterator18 = _createForOfIteratorHelper(X2),
    _step18;
  try {
    for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
      var _v2 = _step18.value;
      var _temp = this._pro.constraintsBetween(_v2, xi);
      var _iterator22 = _createForOfIteratorHelper(_temp),
        _step22;
      try {
        for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
          var _c5 = _step22.value;
          cs.add(_c5);
        }
      } catch (err) {
        _iterator22.e(err);
      } finally {
        _iterator22.f();
      }
    }
  } catch (err) {
    _iterator18.e(err);
  } finally {
    _iterator18.f();
  }
  var _iterator19 = _createForOfIteratorHelper(cs),
    _step19;
  try {
    for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
      var _c6 = _step19.value;
      var sd = _c6.satisfactionDegree();
      if (sd === _constraint.Constraint.UNDEFINED) continue;
      if (sd < csd) csd = sd;
    }
  } catch (err) {
    _iterator19.e(err);
  } finally {
    _iterator19.f();
  }
  var _iterator20 = _createForOfIteratorHelper(cs),
    _step20;
  try {
    for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
      var _c7 = _step20.value;
      var _sd = _c7.satisfactionDegree();
      if (_sd === _constraint.Constraint.UNDEFINED) continue;
      if (_sd < consX1xi || _sd < consX12) cr.add(_c7);
    }
  } catch (err) {
    _iterator20.e(err);
  } finally {
    _iterator20.f();
  }
  return csd;
}
},{"../../problem/constraint.js":"../src/problem/constraint.js","../../util/assignment-list.js":"../src/util/assignment-list.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/fuzzy/flexible-local-changes-ex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlexibleLocalChangesEx = void 0;
var _constraint = require("../../problem/constraint.js");
var _assignmentList = require("../../util/assignment-list.js");
var _solver = require("../solver.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; } /**
                                                                                                                                                                                    * A class that implements the flexible local changes method.
                                                                                                                                                                                    * The implementation is optimized by converting recursive calls to loops.
                                                                                                                                                                                    *
                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                    * @version 2023-04-11
                                                                                                                                                                                    */
var _lt = /*#__PURE__*/new WeakMap();
var _lb = /*#__PURE__*/new WeakMap();
var _iterCount = /*#__PURE__*/new WeakMap();
var _endTime = /*#__PURE__*/new WeakMap();
var _globalReturn = /*#__PURE__*/new WeakMap();
var _choose = /*#__PURE__*/new WeakSet();
var _computeHighestAndLowestConsistencyDegree = /*#__PURE__*/new WeakSet();
var _flcRepair = /*#__PURE__*/new WeakSet();
var _flcVariable = /*#__PURE__*/new WeakSet();
var _flcVariables = /*#__PURE__*/new WeakSet();
var _initTest = /*#__PURE__*/new WeakSet();
var _testX = /*#__PURE__*/new WeakSet();
var _testX3 = /*#__PURE__*/new WeakSet();
var FlexibleLocalChangesEx = /*#__PURE__*/function (_Solver) {
  _inherits(FlexibleLocalChangesEx, _Solver);
  var _super = _createSuper(FlexibleLocalChangesEx);
  function FlexibleLocalChangesEx(p) {
    var _this;
    _classCallCheck(this, FlexibleLocalChangesEx);
    _this = _super.call(this, p);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _testX3);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _testX);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _initTest);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _flcVariables);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _flcVariable);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _flcRepair);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _computeHighestAndLowestConsistencyDegree);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _choose);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _lt, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _lb, {
      writable: true,
      value: void 0
    });
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
    _classPrivateMethodGet(_assertThisInitialized(_this), _computeHighestAndLowestConsistencyDegree, _computeHighestAndLowestConsistencyDegree2).call(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(FlexibleLocalChangesEx, [{
    key: "name",
    value: function name() {
      return 'Flexible Local Changes Ex';
    }
  }, {
    key: "exec",
    value: function exec() {
      _classPrivateFieldSet(this, _endTime, this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit);
      _classPrivateFieldSet(this, _iterCount, 0);
      _classPrivateFieldSet(this, _globalReturn, -1);
      var wsd = this._pro.worstSatisfactionDegree();
      if (this._pro.emptyVariableSize() === 0) {
        this._pro.clearAllVariables();
      }
      var X1 = new Set();
      var X2 = new Set(); // Currently assigned variables.
      var X3 = new Set(); // Currently unassigned variables.
      var _iterator = _createForOfIteratorHelper(this._pro.variables()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;
          (!v.isEmpty() ? X2 : X3).add(v);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var cr = new Set();
      var initCons = _classPrivateMethodGet(this, _initTest, _initTest2).call(this, X2, cr);
      var rc;
      var initSol = null;
      if (X3.size === 0) {
        rc = initCons;
        initSol = _assignmentList.AssignmentList.fromVariables(X2);
      } else {
        rc = _classPrivateFieldGet(this, _lb);
      }
      var X3p = _classStaticPrivateMethodGet(FlexibleLocalChangesEx, FlexibleLocalChangesEx, _setPlusSet).call(FlexibleLocalChangesEx, _classPrivateMethodGet(this, _choose, _choose2).call(this, X2, cr), X3);
      var X2p = _classStaticPrivateMethodGet(FlexibleLocalChangesEx, FlexibleLocalChangesEx, _setMinusSet).call(FlexibleLocalChangesEx, X2, X3p);
      var result = _classPrivateMethodGet(this, _flcVariables, _flcVariables2).call(this, X1, X2p, X3p, _classPrivateFieldGet(this, _lt), _classPrivateFieldGet(this, _lt), rc);
      if (result < rc) {
        if (initSol !== null) {
          initSol.apply();
        }
      }
      result = this._pro.worstSatisfactionDegree();
      return result > wsd && result > 0 && (_classPrivateFieldGet(this, _globalReturn) !== 0 || this._targetDeg === null);
    }
  }]);
  return FlexibleLocalChangesEx;
}(_solver.Solver);
exports.FlexibleLocalChangesEx = FlexibleLocalChangesEx;
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
function _choose2(x2, cr) {
  var res = new Map();
  var _iterator4 = _createForOfIteratorHelper(cr),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var c = _step4.value;
      if (!c.isDefined()) {
        continue;
      }
      var _iterator6 = _createForOfIteratorHelper(c),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var v = _step6.value;
          if (!res.has(v)) {
            res.set(v, 1);
          } else {
            res.set(v, res.get(v) + 1);
          }
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
  var vs = _toConsumableArray(x2);
  vs.sort(function (o1, o2) {
    var res1 = 0;
    var res2 = 0;
    if (res.has(o1)) res1 = res.get(o1);
    if (res.has(o2)) res2 = res.get(o2);
    if (res1 < res2) return 1;
    if (res1 > res2) return -1;
    return 0;
  });
  var ret = new Set();
  var _iterator5 = _createForOfIteratorHelper(vs),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _v = _step5.value;
      var remain = false;
      var _iterator7 = _createForOfIteratorHelper(cr),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _c = _step7.value;
          if (_c.isDefined()) {
            remain = true;
            break;
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      if (!remain) break;
      _v.clear();
      ret.add(_v);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return ret;
}
function _computeHighestAndLowestConsistencyDegree2() {
  var low = 1;
  var high = 0;
  var _iterator8 = _createForOfIteratorHelper(this._pro.variables()),
    _step8;
  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var v = _step8.value;
      var _iterator9 = _createForOfIteratorHelper(v),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var c = _step9.value;
          var l = c.lowestConsistencyDegree();
          var h = c.highestConsistencyDegree();
          if (l < low) low = l;
          if (h > high) high = h;
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  _classPrivateFieldSet(this, _lb, low);
  _classPrivateFieldSet(this, _lt, high);
}
function _flcRepair2(X1, X2, xi, consX1xi, consX12, cr, rc) {
  var X3p = _classPrivateMethodGet(this, _choose, _choose2).call(this, X2, cr);
  var X1p = _classStaticPrivateMethodGet(FlexibleLocalChangesEx, FlexibleLocalChangesEx, _setPlusElement).call(FlexibleLocalChangesEx, X1, xi);
  var X2p = _classStaticPrivateMethodGet(FlexibleLocalChangesEx, FlexibleLocalChangesEx, _setMinusSet).call(FlexibleLocalChangesEx, X2, X3p);
  return _classPrivateMethodGet(this, _flcVariables, _flcVariables2).call(this, X1p, X2p, X3p, consX1xi, Math.min(consX12, consX1xi), rc);
}
function _flcVariable2(X1, X2, xi, consX1, consX12, rc) {
  var bestCons = _classPrivateFieldGet(this, _lb);
  if (xi.domain().size() === 0) {
    return bestCons;
  }
  var bestX2 = _assignmentList.AssignmentList.fromVariables(X2);
  var bestDij = xi.domain().at(0);
  var x2Store = _assignmentList.AssignmentList.fromVariables(X2);
  for (var j = 0; j < xi.domain().size() && bestCons < consX12; ++j) {
    var dij = xi.domain().at(j);
    xi.assign(dij);
    var consX1_xi = Math.min(consX1, _classPrivateMethodGet(this, _testX, _testX2).call(this, X1, xi, bestCons, rc));
    if (consX1_xi > Math.max(bestCons, rc)) {
      var crNew = new Set();
      var consX12_xi = Math.min(Math.min(consX1_xi, consX12), _classPrivateMethodGet(this, _testX3, _testX4).call(this, X1, X2, xi, consX1_xi, consX12, crNew));
      if (consX12_xi > bestCons) {
        bestCons = consX12_xi;
        bestDij = dij;
        bestX2 = _assignmentList.AssignmentList.fromVariables(X2);
      }
      if (crNew.size) {
        var repairCons = _classPrivateMethodGet(this, _flcRepair, _flcRepair2).call(this, X1, X2, xi, consX1_xi, consX12, crNew, Math.max(rc, bestCons));
        if (_classPrivateFieldGet(this, _globalReturn) !== -1) {
          return bestCons;
        }
        if (repairCons > bestCons) {
          bestCons = repairCons;
          bestDij = dij;
          bestX2 = _assignmentList.AssignmentList.fromVariables(X2);
        }
        x2Store.apply();
      }
    }
  }
  bestX2.apply();
  xi.assign(bestDij);
  return bestCons;
}
function _flcVariables2(X1, X2, X3, consX1, consX12, rc) {
  X2 = new Set(X2); // Clone
  X3 = new Set(X3); // Clone

  while (true) {
    var _this$iterCount, _this$iterCount2;
    this._debugOutput("X1 ".concat(X1.size, ", X2' ").concat(X2.size, ", X3' ").concat(X3.size));
    if (this._targetDeg !== null && this._targetDeg <= this._pro.worstSatisfactionDegree()) {
      // Success if the degree improves from specified
      this._debugOutput('stop: current degree is above the target');
      _classPrivateFieldSet(this, _globalReturn, 1);
      return consX12;
    }
    if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount = _classPrivateFieldGet(this, _iterCount), _this$iterCount2 = _this$iterCount++, _this$iterCount)), _this$iterCount2)) {
      // Failure if repeated a specified number
      this._debugOutput('stop: number of iterations has reached the limit');
      _classPrivateFieldSet(this, _globalReturn, 0);
      return consX12;
    }
    if (_classPrivateFieldGet(this, _endTime) < Date.now()) {
      // Failure if time limit is exceeded
      this._debugOutput('stop: time limit has been reached');
      _classPrivateFieldSet(this, _globalReturn, 0);
      return consX12;
    }
    if (X3.size === 0) {
      return consX12;
    }
    var xi = X3.values().next().value;
    var consX12xi = _classPrivateMethodGet(this, _flcVariable, _flcVariable2).call(this, X1, X2, xi, consX1, consX12, rc);
    if (_classPrivateFieldGet(this, _globalReturn) !== -1) {
      return consX12;
    }
    if (consX12xi < rc) {
      return _classPrivateFieldGet(this, _lb);
    }
    X2.add(xi);
    X3.delete(xi);
    consX12 = consX12xi;
  }
}
function _initTest2(X, cr) {
  var cs = new Set();
  var _iterator10 = _createForOfIteratorHelper(X),
    _step10;
  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var v = _step10.value;
      var _iterator13 = _createForOfIteratorHelper(v),
        _step13;
      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var c = _step13.value;
          cs.add(c); // All variables in X have been assigned.
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }
  var ret = 1;
  var _iterator11 = _createForOfIteratorHelper(cs),
    _step11;
  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var _c2 = _step11.value;
      var sd = _c2.satisfactionDegree();
      if (sd === _constraint.Constraint.UNDEFINED) continue;
      if (sd < ret) ret = sd;
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }
  var _iterator12 = _createForOfIteratorHelper(this._pro.constraints()),
    _step12;
  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      var _c3 = _step12.value;
      var cd = _c3.lowestConsistencyDegree();
      if (cd < _classPrivateFieldGet(this, _lt)) cr.add(_c3);
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }
  return ret;
}
function _testX2(X1, xi, bestCons, rc) {
  var cd = 1;
  var cs = new Set();
  var _iterator14 = _createForOfIteratorHelper(X1),
    _step14;
  try {
    for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
      var v = _step14.value;
      var temp = this._pro.constraintsBetween(v, xi);
      var _iterator16 = _createForOfIteratorHelper(temp),
        _step16;
      try {
        for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
          var c = _step16.value;
          cs.add(c);
        }
      } catch (err) {
        _iterator16.e(err);
      } finally {
        _iterator16.f();
      }
    }
  } catch (err) {
    _iterator14.e(err);
  } finally {
    _iterator14.f();
  }
  var _iterator15 = _createForOfIteratorHelper(cs),
    _step15;
  try {
    for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
      var _c4 = _step15.value;
      var d = _c4.satisfactionDegree();
      if (d === _constraint.Constraint.UNDEFINED) continue;
      if (d < cd) cd = d;
      if (cd <= bestCons || cd <= rc) return cd; // If it is determined that a better solution than the current solution cannot be obtained
    }
  } catch (err) {
    _iterator15.e(err);
  } finally {
    _iterator15.f();
  }
  return cd;
}
function _testX4(X1, X2, xi, consX1xi, consX12, cr) {
  var csd = 1;
  var cs = new Set();
  var _iterator17 = _createForOfIteratorHelper(X1),
    _step17;
  try {
    for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
      var v = _step17.value;
      var temp = this._pro.constraintsBetween(v, xi);
      var _iterator21 = _createForOfIteratorHelper(temp),
        _step21;
      try {
        for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
          var c = _step21.value;
          cs.add(c);
        }
      } catch (err) {
        _iterator21.e(err);
      } finally {
        _iterator21.f();
      }
    }
  } catch (err) {
    _iterator17.e(err);
  } finally {
    _iterator17.f();
  }
  var _iterator18 = _createForOfIteratorHelper(X2),
    _step18;
  try {
    for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
      var _v2 = _step18.value;
      var _temp = this._pro.constraintsBetween(_v2, xi);
      var _iterator22 = _createForOfIteratorHelper(_temp),
        _step22;
      try {
        for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
          var _c5 = _step22.value;
          cs.add(_c5);
        }
      } catch (err) {
        _iterator22.e(err);
      } finally {
        _iterator22.f();
      }
    }
  } catch (err) {
    _iterator18.e(err);
  } finally {
    _iterator18.f();
  }
  var _iterator19 = _createForOfIteratorHelper(cs),
    _step19;
  try {
    for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
      var _c6 = _step19.value;
      var sd = _c6.satisfactionDegree();
      if (sd === _constraint.Constraint.UNDEFINED) continue;
      if (sd < csd) csd = sd;
    }
  } catch (err) {
    _iterator19.e(err);
  } finally {
    _iterator19.f();
  }
  var _iterator20 = _createForOfIteratorHelper(cs),
    _step20;
  try {
    for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
      var _c7 = _step20.value;
      var _sd = _c7.satisfactionDegree();
      if (_sd === _constraint.Constraint.UNDEFINED) continue;
      if (_sd < consX1xi || _sd < consX12) cr.add(_c7);
    }
  } catch (err) {
    _iterator20.e(err);
  } finally {
    _iterator20.f();
  }
  return csd;
}
},{"../../problem/constraint.js":"../src/problem/constraint.js","../../util/assignment-list.js":"../src/util/assignment-list.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/fuzzy/fuzzy-breakout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FuzzyBreakout = void 0;
var _assignmentList = require("../../util/assignment-list.js");
var _solver = require("../solver.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
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
                                                                                                                                                                                                                                                                    * Class implements a solver using the breakout method for fuzzy CSP.
                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                                                                                                                                    */
var _weights = /*#__PURE__*/new WeakMap();
var _lastSolDeg = /*#__PURE__*/new WeakMap();
var _isRandom = /*#__PURE__*/new WeakMap();
var _findCandidates = /*#__PURE__*/new WeakSet();
var _listWorstVariables = /*#__PURE__*/new WeakSet();
var FuzzyBreakout = /*#__PURE__*/function (_Solver) {
  _inherits(FuzzyBreakout, _Solver);
  var _super = _createSuper(FuzzyBreakout);
  function FuzzyBreakout(p) {
    var _this;
    _classCallCheck(this, FuzzyBreakout);
    _this = _super.call(this, p);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _listWorstVariables);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _findCandidates);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _weights, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _lastSolDeg, {
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
  _createClass(FuzzyBreakout, [{
    key: "name",
    value: function name() {
      return 'Fuzzy Breakout';
    }
  }, {
    key: "foundSolution",
    value: function foundSolution() {
      return false;
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
      var deg = this._pro.worstSatisfactionDegree();
      var canList = new _assignmentList.AssignmentList();
      var sol = new _assignmentList.AssignmentList();
      while (true) {
        var _this$_pro$constraint = this._pro.constraintsWithWorstSatisfactionDegree(),
          _this$_pro$constraint2 = _slicedToArray(_this$_pro$constraint, 2),
          vc = _this$_pro$constraint2[0],
          wsd = _this$_pro$constraint2[1];
        if (this._targetDeg !== null && this._targetDeg <= wsd) {
          // Success if the degree improves from specified
          this._debugOutput('stop: current degree is above the target');
          return true;
        }
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
        this._debugOutput('worst satisfaction degree: ' + wsd);
        if (_classPrivateFieldGet(this, _lastSolDeg) < wsd) {
          sol.setProblem(this._pro);
          _classPrivateFieldSet(this, _lastSolDeg, wsd);
          if (foundSolution(sol, _classPrivateFieldGet(this, _lastSolDeg))) {
            // Call hook
            return true;
          }
        }
        _classPrivateMethodGet(this, _findCandidates, _findCandidates2).call(this, _classPrivateMethodGet(this, _listWorstVariables, _listWorstVariables2).call(this, vc), canList);
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
      if (this._targetDeg === null && deg < this._pro.worstSatisfactionDegree()) return true;
      return false;
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
  return FuzzyBreakout;
}(_solver.Solver);
exports.FuzzyBreakout = FuzzyBreakout;
function _findCandidates2(worstVars, canList) {
  var maxDiff = 0;
  var _iterator3 = _createForOfIteratorHelper(worstVars),
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
          nowVio += (1 - c.satisfactionDegree()) * _classPrivateFieldGet(this, _weights)[c.index()];
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
              diff -= (1 - _c.satisfactionDegree()) * _classPrivateFieldGet(this, _weights)[_c.index()];
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
function _listWorstVariables2(worstCons) {
  var wvs = new Set();
  var _iterator7 = _createForOfIteratorHelper(worstCons),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var c = _step7.value;
      var _iterator8 = _createForOfIteratorHelper(c),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var v = _step8.value;
          wvs.add(v);
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
  return Array.from(wvs);
}
},{"../../util/assignment-list.js":"../src/util/assignment-list.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/fuzzy/fuzzy-genet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FuzzyGENET = void 0;
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
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } } /**
                                                                                                                                                                                                                                                                    * This class implements fuzzy GENET.
                                                                                                                                                                                                                                                                    * CSPs and FCSPs (but only Binary (F)CSPs) is supported.
                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                                                                                                                                    */
var _clusters = /*#__PURE__*/new WeakMap();
var _connections = /*#__PURE__*/new WeakMap();
var _worstSatisfactionDegree = /*#__PURE__*/new WeakMap();
var _createNetwork = /*#__PURE__*/new WeakSet();
var _shuffle = /*#__PURE__*/new WeakSet();
var FuzzyGENET = /*#__PURE__*/function (_Solver) {
  _inherits(FuzzyGENET, _Solver);
  var _super = _createSuper(FuzzyGENET);
  function FuzzyGENET(p) {
    var _this;
    var worstSatisfactionDegree = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    _classCallCheck(this, FuzzyGENET);
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
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _worstSatisfactionDegree, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _worstSatisfactionDegree, worstSatisfactionDegree);
    return _this;
  }
  _createClass(FuzzyGENET, [{
    key: "name",
    value: function name() {
      return 'Fuzzy GENET';
    }
  }, {
    key: "exec",
    value: function exec() {
      if (!_classPrivateMethodGet(this, _createNetwork, _createNetwork2).call(this, _classPrivateFieldGet(this, _worstSatisfactionDegree))) {
        throw new Exception();
      }
      var endTime = this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit;
      var iterCount = 0;
      var sol = new _assignmentList.AssignmentList();
      var order = [];
      for (var i = 0; i < _classPrivateFieldGet(this, _clusters).length; ++i) {
        order.push(i);
      }
      var cur = this._pro.worstSatisfactionDegree();
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
          continue;
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
          var d = this._pro.worstSatisfactionDegree();
          if (cur < d) {
            // If it's a better assignment than ever, save it.
            cur = d;
            this._debugOutput("worst satisfaction degree: ".concat(d));
            sol.setProblem(this._pro);
            if (this.foundSolution(sol, d)) {
              // Call hook
              success = true;
              break;
            }
            if (this._targetDeg === null) {
              // Satisfaction degree is not specified.
              success = true;
            } else if (this._targetDeg <= cur) {
              // Satisfaction degree is specified.
              this._debugOutput('stop: current degree is above the target');
              success = true;
              break;
            }
          }
        }
      }
      sol.apply();
      return success;
    }
  }], [{
    key: "nextInt",
    value: function nextInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }]);
  return FuzzyGENET;
}(_solver.Solver);
exports.FuzzyGENET = FuzzyGENET;
function _createNetwork2(worstDeg) {
  this._debugOutput('network creation start');
  var cons = [];
  var _iterator7 = _createForOfIteratorHelper(this._pro.variables()),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var v = _step7.value;
      if (v.domain().size() === 0) return false;
      _classPrivateFieldGet(this, _clusters).push(new FuzzyGENET.Cluster(v));
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
          if (c.satisfactionDegree() <= worstDeg) {
            cons.push(new FuzzyGENET.Connection(c, cl.get(i)));
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
            if (c.satisfactionDegree() <= worstDeg) {
              cons.push(new FuzzyGENET.Connection(c, cl_f.get(_i2), cl_s.get(j)));
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
    var j = FuzzyGENET.nextInt(i);
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
  FuzzyGENET.Cluster = Cluster;
  var _c = /*#__PURE__*/new WeakMap();
  var _first = /*#__PURE__*/new WeakMap();
  var _second = /*#__PURE__*/new WeakMap();
  var Connection = /*#__PURE__*/function () {
    // Direct reference (read) allowed.

    // Order of neurons must be the same as the order of variables that the constraint has.
    function Connection(c, first) {
      var second = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      _classCallCheck(this, Connection);
      _classPrivateFieldInitSpec(this, _c, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _first, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _second, {
        writable: true,
        value: void 0
      });
      _defineProperty(this, "_weight", void 0);
      this._weight = c.satisfactionDegree() - 1;
      _classPrivateFieldSet(this, _c, c);
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
        if (_classPrivateFieldGet(this, _c).size() === 1) {
          this._weight += _classPrivateFieldGet(this, _c).fuzzyRelation().satisfactionDegree(_classPrivateFieldGet(this, _first)._value) - 1;
        } else {
          this._weight += _classPrivateFieldGet(this, _c).fuzzyRelation().satisfactionDegree(_classPrivateFieldGet(this, _first)._value, _classPrivateFieldGet(this, _second)._value) - 1;
        }
      }
    }]);
    return Connection;
  }();
  FuzzyGENET.Connection = Connection;
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
  FuzzyGENET.Neuron = Neuron;
}
},{"../../util/assignment-list.js":"../src/util/assignment-list.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/fuzzy/srs3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SRS3 = void 0;
var _constraint = require("../../problem/constraint.js");
var _assignmentList = require("../../util/assignment-list.js");
var _solver = require("../solver.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; } /**
                                                                                                                                                    * This class implements the SRS algorithm.
                                                                                                                                                    *
                                                                                                                                                    * @author Takuto Yanagida
                                                                                                                                                    * @version 2023-04-16
                                                                                                                                                    */
var _closedList = /*#__PURE__*/new WeakMap();
var _openList = /*#__PURE__*/new WeakMap();
var _nodes = /*#__PURE__*/new WeakMap();
var _neighborConstraints = /*#__PURE__*/new WeakMap();
var _c_stars = /*#__PURE__*/new WeakMap();
var _iterCount = /*#__PURE__*/new WeakMap();
var _endTime = /*#__PURE__*/new WeakMap();
var _isRandom = /*#__PURE__*/new WeakMap();
var _getNeighborConstraints = /*#__PURE__*/new WeakSet();
var _repair = /*#__PURE__*/new WeakSet();
var _shrink = /*#__PURE__*/new WeakSet();
var _spread = /*#__PURE__*/new WeakSet();
var _srs = /*#__PURE__*/new WeakSet();
var SRS3 = /*#__PURE__*/function (_Solver) {
  _inherits(SRS3, _Solver);
  var _super = _createSuper(SRS3);
  function SRS3(p) {
    var _this;
    _classCallCheck(this, SRS3);
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
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _c_stars, {
      writable: true,
      value: new Set()
    });
    // ArrayList is used in the original implementation.
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _iterCount, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _endTime, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _isRandom, {
      writable: true,
      value: true
    });
    var _iterator = _createForOfIteratorHelper(_this._pro.constraints()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var c = _step.value;
        _classPrivateFieldGet(_assertThisInitialized(_this), _nodes).push(new SRS3.TreeNode(c));
        _classPrivateFieldGet(_assertThisInitialized(_this), _neighborConstraints).push(null);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return _this;
  }
  _createClass(SRS3, [{
    key: "name",
    value: function name() {
      return 'SRS 3';
    }
  }, {
    key: "foundSolution",
    value: function foundSolution(solution, worstDegree) {
      return false;
    }
  }, {
    key: "exec",
    value: function exec() {
      _classPrivateFieldSet(this, _endTime, this._timeLimit === null ? Number.MAX_VALUE : Date.now() + this._timeLimit);
      _classPrivateFieldSet(this, _iterCount, 0);
      if (this._targetDeg && this._targetDeg <= this._pro.worstSatisfactionDegree()) {
        return true;
      }
      var sol = new _assignmentList.AssignmentList();
      var success = false;
      while (true) {
        var ret = _classPrivateMethodGet(this, _srs, _srs2).call(this);
        if (!ret || _classPrivateFieldGet(this, _c_stars).size) {
          break;
        }
        var solutionWorstDeg = this._pro.worstSatisfactionDegree();
        this._debugOutput("\tfound a solution: ".concat(solutionWorstDeg, "\t").concat(this._targetDeg));
        sol.setProblem(this._pro);
        if (this.foundSolution(sol, solutionWorstDeg)) {
          // Call hook
          success = true;
          break;
        }
        if (this._targetDeg === null) {
          // Satisfaction degree is not specified
          success = true;
        } else if (this._targetDeg <= solutionWorstDeg) {
          // The current degree exceeded the specified degree.
          this._debugOutput('stop: current degree is above the target');
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
     */
  }, {
    key: "setRandomness",
    value: function setRandomness(flag) {
      _classPrivateFieldSet(this, _isRandom, flag);
    }
  }]);
  return SRS3;
}(_solver.Solver);
exports.SRS3 = SRS3;
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
  var minDeg0 = c0.satisfactionDegree(); // Target c0 should certainly be an improvement over this.
  var min = this._pro.worstSatisfactionDegree(); // Lower bound of neighborhood constraints.
  var maxDeg0 = c0.satisfactionDegree(); // Satisfaction degree of target c0 for the most improvement so far.

  // If a candidate satisfying the condition is stronger than the previous candidates,
  // it is replaced, and if no candidate is found until the end, it fails.
  var _iterator4 = _createForOfIteratorHelper(c0),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var v = _step4.value;
      var v_val = v.value(); // Save the value
      var _iterator5 = _createForOfIteratorHelper(v.domain()),
        _step5;
      try {
        out: for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var d = _step5.value;
          if (v_val === d) continue;
          v.assign(d);
          var deg0 = c0.satisfactionDegree();
          // If target c0 cannot be improved, the assignment is rejected.
          if (minDeg0 > deg0 || maxDeg0 - deg0 > SRS3.REPAIR_THRESHOLD) continue;
          var _iterator6 = _createForOfIteratorHelper(v),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var c = _step6.value;
              if (c === c0) continue;
              var deg = c.satisfactionDegree();
              // If one of the neighborhood constraints c is less than or equal to the worst, the assignment is rejected.
              if (deg !== _constraint.Constraint.UNDEFINED && deg < min) continue out;
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
          if (deg0 > maxDeg0) {
            maxDeg0 = deg0;
            canList.clear();
          }
          canList.addVariable(v, d);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      v.assign(v_val); // Restore the value
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  if (canList.size() > 0) {
    var e = _classPrivateFieldGet(this, _isRandom) ? canList.random() : canList.at(0);
    this._debugOutput(e);
    e.apply();
    this._debugOutput('\t' + e);
    return true;
  }
  return false;
}
function _shrink2(node) {
  this._debugOutput('shrink');
  var removeCStar = false;
  while (true) {
    node = node.parent();
    if (_classPrivateFieldGet(this, _c_stars).delete(node)) {
      removeCStar = true;
      break;
    }
    if (!_classPrivateMethodGet(this, _repair, _repair2).call(this, node.parent().getObject())) break;
  }
  var temp = [];
  node.getDescendants(temp); // temp contains node.

  for (var _i = 0, _temp = temp; _i < _temp.length; _i++) {
    var n = _temp[_i];
    n.clear(); // Prepare for reuse
    _classPrivateFieldGet(this, _openList).delete(n);
    _classPrivateFieldGet(this, _closedList).delete(n);
  }
  if (!removeCStar) {
    _classPrivateFieldGet(this, _openList).add(node);
  }
}
function _spread2(node) {
  this._debugOutput('spread');
  _classPrivateFieldGet(this, _closedList).add(node);
  var _iterator7 = _createForOfIteratorHelper(_classPrivateMethodGet(this, _getNeighborConstraints, _getNeighborConstraints2).call(this, node.getObject())),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var c = _step7.value;
      var cn = _classPrivateFieldGet(this, _nodes)[c.index()];
      if (!_classPrivateFieldGet(this, _closedList).has(cn) && !_classPrivateFieldGet(this, _openList).has(cn)) {
        // For constraints that are not included in Open or Closed.
        node.add(cn);
        _classPrivateFieldGet(this, _openList).add(cn);
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
}
function _srs2() {
  this._debugOutput('srs');
  var _this$_pro$constraint = this._pro.constraintsWithWorstSatisfactionDegree(),
    _this$_pro$constraint2 = _slicedToArray(_this$_pro$constraint, 1),
    wsdcs = _this$_pro$constraint2[0];
  var _iterator8 = _createForOfIteratorHelper(wsdcs),
    _step8;
  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var c = _step8.value;
      var cn = _classPrivateFieldGet(this, _nodes)[c.index()];
      cn.setParent(null);
      _classPrivateFieldGet(this, _c_stars).add(cn);
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  _classPrivateFieldGet(this, _closedList).clear();
  _classPrivateFieldGet(this, _openList).clear();
  var _iterator9 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _c_stars)),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var n = _step9.value;
      _classPrivateFieldGet(this, _openList).add(n);
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  while (_classPrivateFieldGet(this, _c_stars).size && _classPrivateFieldGet(this, _openList).size) {
    var _this$iterCount, _this$iterCount2;
    if (this._iterLimit && this._iterLimit < (_classPrivateFieldSet(this, _iterCount, (_this$iterCount = _classPrivateFieldGet(this, _iterCount), _this$iterCount2 = _this$iterCount++, _this$iterCount)), _this$iterCount2)) {
      // Failure if repeated a specified number
      this._debugOutput('stop: number of iterations has reached the limit');
      return false;
    }
    if (_classPrivateFieldGet(this, _endTime) < Date.now()) {
      // Failure if time limit is exceeded
      this._debugOutput('stop: time limit has been reached');
      return false;
    }
    var node = _classPrivateFieldGet(this, _openList).values().next().value;
    _classPrivateFieldGet(this, _openList).delete(node);
    if (_classPrivateMethodGet(this, _repair, _repair2).call(this, node.getObject())) {
      if (_classPrivateFieldGet(this, _c_stars).delete(node)) continue; // If the repaired node is included in C* (to be deleted)
      if (_classPrivateMethodGet(this, _repair, _repair2).call(this, node.parent().getObject())) {
        _classPrivateMethodGet(this, _shrink, _shrink2).call(this, node); // When its improvement leads to the improvement of its parents
        continue;
      }
    }
    _classPrivateMethodGet(this, _spread, _spread2).call(this, node);
  }
  return true;
}
// Threshold for adopting a candidate assignment at repair time (should be 0 if strictly following SRS 3)
_defineProperty(SRS3, "REPAIR_THRESHOLD", 0);
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
        var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _children)),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var tn = _step2.value;
            _classPrivateFieldSet(tn, _parent, null);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        _classPrivateFieldGet(this, _children).length = 0;
      }
    }, {
      key: "getDescendants",
      value: function getDescendants(tns) {
        tns.push(this);
        var _iterator3 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _children)),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var tn = _step3.value;
            tn.getDescendants(tns);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
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
    }, {
      key: "setParent",
      value: function setParent(p) {
        _classPrivateFieldSet(this, _parent, p);
      }
    }]);
    return TreeNode;
  }();
  SRS3.TreeNode = TreeNode;
}
},{"../../problem/constraint.js":"../src/problem/constraint.js","../../util/assignment-list.js":"../src/util/assignment-list.js","../solver.js":"../src/solver/solver.js"}],"../src/solver/filter/post-stabilization.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostStabilization = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Class of post-stabilization.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */
var PostStabilization = /*#__PURE__*/function () {
  function PostStabilization() {
    _classCallCheck(this, PostStabilization);
  }
  _createClass(PostStabilization, null, [{
    key: "apply",
    value: function apply(p, orig) {
      this._debugOutput('start post-stabilization');
      var stabilized;
      var count = 0;
      do {
        this._debugOutput('post-stabilization: count ' + count++);
        stabilized = false;
        var C_min = p.worstSatisfactionDegree();
        var vars = p.variables();
        for (var i = 0; i < vars.length; ++i) {
          var v = vars[i];
          var org = v.value();
          var a = orig.get(i);
          if (org === a.value()) continue;
          a.apply(); // Try to assign the original.
          if (p.worstSatisfactionDegree() >= C_min) {
            stabilized = true;
          } else {
            v.assign(org); // Restore.
          }
        }
      } while (stabilized);
      this._debugOutput('finish post-stabilization');
      return true;
    }
  }]);
  return PostStabilization;
}();
exports.PostStabilization = PostStabilization;
},{}],"../src/solver/fuzzy/srs3-pf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SRS3_PF = void 0;
var _assignmentList = require("../../util/assignment-list.js");
var _postStabilization = require("../filter/post-stabilization.js");
var _srs = require("./srs3.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
                                                                                                                                                                                                                      * This class implements the SRS algorithm with PF.
                                                                                                                                                                                                                      *
                                                                                                                                                                                                                      * @author Takuto Yanagida
                                                                                                                                                                                                                      * @version 2023-04-16
                                                                                                                                                                                                                      */
var SRS3_PF = /*#__PURE__*/function (_SRS) {
  _inherits(SRS3_PF, _SRS);
  var _super = _createSuper(SRS3_PF);
  function SRS3_PF(p) {
    _classCallCheck(this, SRS3_PF);
    return _super.call(this, p);
  }
  _createClass(SRS3_PF, [{
    key: "name",
    value: function name() {
      return 'SRS 3 + PF';
    }
  }, {
    key: "exec",
    value: function exec() {
      var deg = 0;
      var uvs = 0;
      if (this._debug) {
        deg = this._pro.worstSatisfactionDegree();
        uvs = this._pro.emptyVariableSize();
      }
      var al = new _assignmentList.AssignmentList();
      al.setProblem(this._pro);
      var res = _get(_getPrototypeOf(SRS3_PF.prototype), "exec", this).call(this);
      if (res) {
        _postStabilization.PostStabilization.apply(this._pro, al);
      }
      this._debugOutput("result: ".concat(res ? 'success' : 'failure'));
      this._debugOutput("satisfaction degree: ".concat(deg, " -> ").concat(this._pro.worstSatisfactionDegree()));
      this._debugOutput("unassigned size: ".concat(uvs, " -> ").concat(this._pro.emptyVariableSize()));
      return res;
    }
  }]);
  return SRS3_PF;
}(_srs.SRS3);
exports.SRS3_PF = SRS3_PF;
},{"../../util/assignment-list.js":"../src/util/assignment-list.js","../filter/post-stabilization.js":"../src/solver/filter/post-stabilization.js","./srs3.js":"../src/solver/fuzzy/srs3.js"}],"random-binary.js":[function(require,module,exports) {
"use strict";

var _problem = require("../src/problem/problem.js");
var _randomBinary = require("../src/model/random-binary.js");
var _fuzzyForwardChecking = require("../src/solver/fuzzy/fuzzy-forward-checking.js");
var _fuzzyForwardCheckingBc = require("../src/solver/fuzzy/fuzzy-forward-checking-bc.js");
var _flexibleLocalChanges = require("../src/solver/fuzzy/flexible-local-changes.js");
var _flexibleLocalChangesEx = require("../src/solver/fuzzy/flexible-local-changes-ex.js");
var _fuzzyBreakout = require("../src/solver/fuzzy/fuzzy-breakout.js");
var _fuzzyGenet = require("../src/solver/fuzzy/fuzzy-genet.js");
var _srs = require("../src/solver/fuzzy/srs3.js");
var _srs3Pf = require("../src/solver/fuzzy/srs3-pf.js");
var COUNT = 1; // Interaction count
var VAR_NUM = 10; // Number of variables
var DENSITY = 0.5;
var AVE_TIGHTNESS = 0.5;
document.addEventListener('DOMContentLoaded', function () {
  var output = document.getElementById('output');
  var log = function log(e) {
    return output.value += "".concat(e, "\n");
  };
  var sum_time = 0;
  var sum_degree = 0;
  for (var i = 0; i < COUNT; ++i) {
    var rp = new _randomBinary.RandomBinary(VAR_NUM, DENSITY, AVE_TIGHTNESS);
    var p = rp.createProblem(new _problem.Problem());
    var t = Date.now(); // Start time measurement

    // const s = new FuzzyForwardChecking(p);
    // const s = new FuzzyForwardCheckingBc(p);
    // const s = new FlexibleLocalChanges(p);
    // const s = new FlexibleLocalChangesEx(p);
    var s = new _fuzzyBreakout.FuzzyBreakout(p);
    // const s = new FuzzyGENET(p);
    // const s = new SRS3(p);
    // const s = new SRS3_PF(p);
    // s.setTargetRate(null);
    s.setTimeLimit(10000);
    s.setDebugOutput(log);
    var res = s.solve();
    var ct = Date.now() - t; // Stop time measurement
    var cd = p.worstSatisfactionDegree();
    log("solver: ".concat(s.name(), "   ").concat(res ? 'success' : 'failure'));
    log("trial: ".concat(i + 1, "   time: ").concat(ct, "   degree: ").concat(cd));
    sum_time += ct;
    sum_degree += cd;
  }
  log("average time: ".concat(sum_time / COUNT, "   average degree: ").concat(sum_degree / COUNT));
});
},{"../src/problem/problem.js":"../src/problem/problem.js","../src/model/random-binary.js":"../src/model/random-binary.js","../src/solver/fuzzy/fuzzy-forward-checking.js":"../src/solver/fuzzy/fuzzy-forward-checking.js","../src/solver/fuzzy/fuzzy-forward-checking-bc.js":"../src/solver/fuzzy/fuzzy-forward-checking-bc.js","../src/solver/fuzzy/flexible-local-changes.js":"../src/solver/fuzzy/flexible-local-changes.js","../src/solver/fuzzy/flexible-local-changes-ex.js":"../src/solver/fuzzy/flexible-local-changes-ex.js","../src/solver/fuzzy/fuzzy-breakout.js":"../src/solver/fuzzy/fuzzy-breakout.js","../src/solver/fuzzy/fuzzy-genet.js":"../src/solver/fuzzy/fuzzy-genet.js","../src/solver/fuzzy/srs3.js":"../src/solver/fuzzy/srs3.js","../src/solver/fuzzy/srs3-pf.js":"../src/solver/fuzzy/srs3-pf.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","random-binary.js"], null)
//# sourceMappingURL=/random-binary.6c2bc61b.js.map