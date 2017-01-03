"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _preact = preact;
var h = _preact.h;
var render = _preact.render;
var Component = _preact.Component; // import { ... } from 'preact';
/** @jsx h */

var LEbytes2int = function LEbytes2int(b) {
	var result = bigInt();
	for (var i = b.length - 1; i >= 0; i--) {
		var cur = bigInt(b[i]).times(bigInt(2).pow(i * 8));
		result = result.add(cur);
	}
	return result;
};
var int2bytesLE = function int2bytesLE(int, times) {
	var result = [];
	for (var i = 0; i < times; i++) {
		result.push(int.mod(256).valueOf());
		int = int.divide(256);
	}
	return result;
};
var getSigBytesCount = function getSigBytesCount(int) {
	var count = 0;
	while (int > 0) {
		int = int.shiftRight(8);
		count++;
	}
	return count;
};
var mangle = function mangle(str) {
	return str.replace(/[^A-Za-z0-9]/g, '-');
};

var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		_classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = new (function () {
			function State() {
				_classCallCheck(this, State);

				this.lockIPv6 = false;
			}

			_createClass(State, [{
				key: "forceIPv6",
				set: function set(bool) {
					this._forceIPv6 = bool;
					this.aos = this.aos;
				},
				get: function get() {
					return this._forceIPv6;
				}
			}, {
				key: "aos",
				set: function set(str) {
					this._aos = str;
					this.lockIPv6 = false;

					var match = null;
					try {
						match = str.match(/^aos:\/\/(.+?)(:0\.7[56])?$/)[1];
					} catch (e) {
						return;
					}

					if (match.match(/^(\d+)$/) != null) {
						var int = bigInt(match, 10);
						this.lockIPv6 = getSigBytesCount(int) > 4;
						this._ip = ipaddr.fromByteArray(int2bytesLE(int, this.forceIPv6 || this.lockIPv6 ? 16 : 4)).toString();
					} else {
						var addr = null;
						try {
							addr = ipaddr.parse(match);
						} catch (e) {
							return;
						}
						this._ip = addr.toString();
					}
				},
				get: function get() {
					return this._aos;
				}
			}, {
				key: "ip",
				set: function set(str) {
					this._ip = str;

					var addr = null;
					try {
						addr = ipaddr.parse(str);
					} catch (e) {
						return;
					}

					this._aos = "aos://" + LEbytes2int(addr.toByteArray()).toString(10);
				},
				get: function get() {
					return this._ip;
				}
			}]);

			return State;
		}())(), _temp), _possibleConstructorReturn(_this, _ret);
	}

	App.prototype.render = function render(_ref, _ref2) {
		var ip = _ref2.ip;
		var aos = _ref2.aos;
		var forceIPv6 = _ref2.forceIPv6;
		var lockIPv6 = _ref2.lockIPv6;

		_objectDestructuringEmpty(_ref);

		return h(
			"form",
			{ "class": "" },
			h(TextBox, { title: "AOS address", ph: "aos://16777343", value: aos, onInput: this.linkState('aos') }),
			h(TextBox, { title: forceIPv6 || lockIPv6 ? 'IPv6' : 'IP', ph: "127.0.0.1", value: ip, onInput: this.linkState('ip') }),
			h(CheckBox, { title: "Force IPv6 ", value: forceIPv6 || lockIPv6, disabled: lockIPv6, onChange: this.linkState('forceIPv6') })
		);
	};

	return App;
}(Component);

var TextBox = function (_Component2) {
	_inherits(TextBox, _Component2);

	function TextBox() {
		_classCallCheck(this, TextBox);

		return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
	}

	TextBox.prototype.render = function render(_ref3) {
		var title = _ref3.title;
		var ph = _ref3.ph;
		var value = _ref3.value;
		var onInput = _ref3.onInput;

		return h(
			"div",
			{ "class": "form-group" },
			h(
				"label",
				{ "for": mangle(title) },
				title
			),
			h("input", { type: "text", id: mangle(title), "class": "form-control", placeholder: ph, value: value, onInput: onInput })
		);
	};

	return TextBox;
}(Component);

var CheckBox = function (_Component3) {
	_inherits(CheckBox, _Component3);

	function CheckBox() {
		_classCallCheck(this, CheckBox);

		return _possibleConstructorReturn(this, _Component3.apply(this, arguments));
	}

	CheckBox.prototype.render = function render(_ref4) {
		var title = _ref4.title;
		var value = _ref4.value;
		var disabled = _ref4.disabled;
		var onChange = _ref4.onChange;

		return h(
			"div",
			{ "class": "form-group" },
			h(
				"label",
				{ "for": mangle(title) },
				title
			),
			h("input", { type: "checkbox", id: mangle(title), checked: value, disabled: disabled, onChange: onChange })
		);
	};

	return CheckBox;
}(Component);

render(h(App, null), document.getElementById('main'));
//# sourceURL=pen.js