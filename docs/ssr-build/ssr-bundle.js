module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/aos-to-address/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// CONCATENATED MODULE: ../node_modules/linkstate/dist/linkstate.es.js
function dlv(obj, key, def, p) {
	p = 0;
	key = key.split ? key.split('.') : key;
	while (obj && p < key.length) {
		obj = obj[key[p++]];
	}
	return obj === undefined ? def : obj;
}

/** Create an Event handler function that sets a given state property.
 *	@param {Component} component	The component whose state should be updated
 *	@param {string} key				A dot-notated key path to update in the component's state
 *	@param {string} eventPath		A dot-notated key path to the value that should be retrieved from the Event or component
 *	@returns {function} linkedStateHandler
 */
function linkState(component, key, eventPath) {
	var path = key.split('.'),
	    cache = component.__lsc || (component.__lsc = {});

	return cache[key + eventPath] || (cache[key + eventPath] = function (e) {
		var t = e && e.target || this,
		    state = {},
		    obj = state,
		    v = typeof eventPath === 'string' ? dlv(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e,
		    i = 0;
		for (; i < path.length - 1; i++) {
			obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
		}
		obj[path[i]] = v;
		component.setState(state);
	});
}

/* harmony default export */ var linkstate_es = (linkState);
//# sourceMappingURL=linkstate.es.js.map
// CONCATENATED MODULE: ./components/app.js


function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Util = function () {
	function Util() {
		_classCallCheck(this, Util);
	}

	Util.LEbytes2int = function LEbytes2int(b) {
		var result = bigInt();
		for (var i = b.length - 1; i >= 0; i--) {
			var cur = bigInt(b[i]).times(bigInt(2).pow(i * 8));
			result = result.add(cur);
		}
		return result;
	};

	Util.int2bytesLE = function int2bytesLE(int, times) {
		var result = [];
		for (var i = 0; i < times; i++) {
			result.push(int.mod(256).valueOf());
			int = int.divide(256);
		}
		return result;
	};

	Util.getSigBytesCount = function getSigBytesCount(int) {
		var count = 0;
		while (int > 0) {
			int = int.shiftRight(8);
			count++;
		}
		return count;
	};

	Util.mangle = function mangle(str) {
		return str.replace(/[^A-Za-z0-9]/g, '-');
	};

	return Util;
}();

var _ref3 = Object(preact_min["h"])(
	'div',
	{ 'class': 'header clearfix' },
	Object(preact_min["h"])(
		'h3',
		{ 'class': 'text-muted' },
		'AOS \u21D4 Address'
	)
);

var _ref4 = Object(preact_min["h"])(
	'footer',
	{ 'class': 'footer' },
	Object(preact_min["h"])(
		'p',
		null,
		'\xA9 Way, No 2017-2019'
	)
);

var app_App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.setForceIPv6 = function (forceIPv6) {
			_this.setState({ forceIPv6: forceIPv6 }, function () {
				_this.setAos(_this.state.aos);
			});
		};

		_this.setAos = function (str) {
			var aos = str;
			var lockIPv6 = false;
			var ip = void 0;
			var match = null;

			try {
				match = str.match(/^aos:\/\/(.+?)(:\d{1,5})?(:0\.7[56])?$/i)[1];
			} catch (e) {
				return;
			}

			if (match.match(/^(\d+)$/) != null) {
				var int = bigInt(match, 10);

				lockIPv6 = Util.getSigBytesCount(int) > 4;
				ip = ipaddr.fromByteArray(Util.int2bytesLE(int, _this.state.forceIPv6 || lockIPv6 ? 16 : 4)).toString();
			} else {
				var addr = null;
				try {
					addr = ipaddr.parse(match);
				} catch (e) {
					return;
				}

				lockIPv6 = addr.kind() == 'ipv6' && !addr.isIPv4MappedAddress();
				ip = addr.kind() == 'ipv6' && addr.isIPv4MappedAddress() ? addr.toIPv4Address().toString() : addr.toString();
			}

			_this.setState({ lockIPv6: lockIPv6, ip: ip, aos: aos });
		};

		_this.setIp = function (str) {
			var ip = str;
			var lockIPv6 = false;
			var addr = null;

			try {
				addr = ipaddr.parse(str);
			} catch (e) {
				return;
			}

			lockIPv6 = addr.kind() == 'ipv6' && !addr.isIPv4MappedAddress();

			var aos = "aos://" + Util.LEbytes2int(addr.toByteArray()).toString(10);

			_this.setState({ lockIPv6: lockIPv6, ip: ip, aos: aos });
		};

		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	App.prototype.handleClick = function handleClick(e) {
		var _this2 = this;

		e.preventDefault();

		fetch('https://ipinfo.io', {
			headers: {
				Accept: 'application/json'
			}
		}).then(function (res) {
			return res.json();
		}).then(function (json) {
			_this2.setIp(json.ip);
		});
	};

	App.prototype.render = function render(_ref, _ref2) {
		var _this3 = this;

		var ip = _ref2.ip,
		    aos = _ref2.aos,
		    forceIPv6 = _ref2.forceIPv6,
		    lockIPv6 = _ref2.lockIPv6;

		_objectDestructuringEmpty(_ref);

		return Object(preact_min["h"])(
			'div',
			{ 'class': 'container' },
			_ref3,
			Object(preact_min["h"])(
				'div',
				{ 'class': 'jumbotron', id: 'main' },
				Object(preact_min["h"])(
					'form',
					{ 'class': '' },
					Object(preact_min["h"])(app_TextBox, {
						title: 'AOS address',
						ph: 'aos://16777343',
						value: aos,
						onInput: function onInput(e) {
							return _this3.setAos(e.target.value);
						} }),
					Object(preact_min["h"])(app_TextBox, {
						title: forceIPv6 || lockIPv6 ? 'IPv6' : 'IP',
						ph: '127.0.0.1',
						value: ip,
						onInput: function onInput(e) {
							return _this3.setIp(e.target.value);
						},
						leftButton: 'My IP',
						onClick: this.handleClick }),
					Object(preact_min["h"])(app_CheckBox, {
						title: 'Force IPv6',
						value: forceIPv6 || lockIPv6,
						disabled: lockIPv6,
						onChange: function onChange(e) {
							return _this3.setForceIPv6(e.target.checked);
						} })
				)
			),
			_ref4
		);
	};

	return App;
}(preact_min["Component"]);



var _ref6 = Object(preact_min["h"])('span', null);

var app_TextBox = function (_Component2) {
	_inherits(TextBox, _Component2);

	function TextBox() {
		_classCallCheck(this, TextBox);

		return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
	}

	TextBox.prototype.render = function render(_ref5) {
		var title = _ref5.title,
		    ph = _ref5.ph,
		    value = _ref5.value,
		    onInput = _ref5.onInput,
		    leftButton = _ref5.leftButton,
		    onClick = _ref5.onClick;

		return Object(preact_min["h"])(
			'div',
			{ 'class': 'form-group' },
			Object(preact_min["h"])(
				'label',
				{ 'for': Util.mangle(title) },
				title
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': leftButton ? "input-group" : "" },
				Object(preact_min["h"])('input', { type: 'text',
					id: Util.mangle(title), 'class': 'form-control',
					placeholder: ph, value: value,
					onInput: onInput,
					autocomplete: 'off',
					autocorrect: 'off',
					autocapitalize: 'off',
					spellcheck: false }),
				leftButton ? Object(preact_min["h"])(
					'span',
					{ 'class': 'input-group-btn' },
					Object(preact_min["h"])(
						'button',
						{ 'class': 'btn btn-default', type: 'button', onClick: onClick },
						leftButton
					)
				) : _ref6
			)
		);
	};

	return TextBox;
}(preact_min["Component"]);

var app_CheckBox = function (_Component3) {
	_inherits(CheckBox, _Component3);

	function CheckBox() {
		_classCallCheck(this, CheckBox);

		return _possibleConstructorReturn(this, _Component3.apply(this, arguments));
	}

	CheckBox.prototype.render = function render(_ref7) {
		var title = _ref7.title,
		    value = _ref7.value,
		    disabled = _ref7.disabled,
		    onChange = _ref7.onChange;

		return Object(preact_min["h"])(
			'div',
			{ 'class': 'form-group' },
			Object(preact_min["h"])(
				'label',
				{ 'class': 'checkbox-inline' },
				Object(preact_min["h"])('input', { type: 'checkbox',
					id: Util.mangle(title),
					checked: value, disabled: disabled,
					onChange: onChange }),
				title
			)
		);
	};

	return CheckBox;
}(preact_min["Component"]);
// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = W;for (i = arguments.length; i-- > 2;) {
      P.push(arguments[i]);
    }t && null != t.children && (P.length || P.push(t.children), delete t.children);while (P.length) {
      if ((o = P.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        P.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
    }var a = new T();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(e, t) {
    null != e && ("function" == typeof e ? e(t) : e.current = t);
  }function o(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
  }function i() {
    var e;while (e = V.pop()) {
      e.__d && x(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function c(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function s(e, t, o, r, i) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n(o, null), n(r, e);else if ("class" !== t || i) {
      if ("style" === t) {
        if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
          if ("string" != typeof o) for (var l in o) {
            l in r || (e.style[l] = "");
          }for (var l in r) {
            e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
      }
    } else e.className = r || "";
  }function _(e) {
    return this.__l[e.type](M.event && M.event(e) || e);
  }function f() {
    var e;while (e = A.shift()) {
      M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));var l = h(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
  }function h(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return N(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
    }var p = i.firstChild,
        s = i.__preactattr_,
        _ = t.children;if (null == s) {
      s = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        s[f[d].name] = f[d].value;
      }
    }return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
  }function m(e, t, n, o, r) {
    var i,
        a,
        u,
        c,
        s,
        _ = e.childNodes,
        f = [],
        d = {},
        m = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      c = t[C], s = null;var k = c.key;if (null != k) m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);else if (b < g) for (i = b; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], c, r)) {
          s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;break;
        }
      }s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
    }if (m) for (var C in d) {
      void 0 !== d[C] && v(d[C], !1);
    }while (b <= g) {
      void 0 !== (s = f[g--]) && v(s, !1);
    }
  }function v(e, t) {
    var o = e._component;o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
  }function b(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;v(e, !0), e = t;
    }
  }function y(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
    }
  }function g(e, t, n) {
    var o,
        r = F.length;e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);while (r--) {
      if (F[r].constructor === e) return o.__b = F[r].__b, F.splice(r, 1), o;
    }return o;
  }function w(e, t, n) {
    return this.constructor(e, n);
  }function C(e, t, o, i, l) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
  }function x(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          c = e.props,
          p = e.state,
          s = e.context,
          _ = e.__p || c,
          h = e.__s || p,
          m = e.__c || s,
          b = e.base,
          y = e.__b,
          w = b || y,
          N = e._component,
          U = !1,
          S = m;if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));var L,
            T,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = u(i);l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
        } else a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));if (w && T !== w && l !== N) {
          var D = w.parentNode;D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
        }if (L && k(L), e.base = T, T && !r) {
          var E = e,
              V = e;while (V = V.__u) {
            (E = V).base = T;
          }T._component = E, T._componentConstructor = E.constructor;
        }
      }!b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || f();
    }
  }function N(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        c = a,
        p = u(t);while (r && !c && (r = r.__u)) {
      c = r.constructor === t.nodeName;
    }return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
  }function k(e) {
    M.beforeUnmount && M.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var o = e._component;o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
  }function U(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function S(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }function L() {
    return {};
  }var T = function T() {},
      M = {},
      P = [],
      W = [],
      D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      V = [],
      A = [],
      H = 0,
      R = !1,
      B = !1,
      F = [];t(U.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), x(this, 2);
    }, render: function render() {} });var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M }; true ? module.exports = j : self.preact = j;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map