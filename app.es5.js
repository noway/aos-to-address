'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _preact = preact,
    h = _preact.h,
    render = _preact.render,
    Component = _preact.Component;
/** @jsx h */

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

var AppState = function () {
	function AppState() {
		_classCallCheck(this, AppState);

		this.lockIPv6 = false;
	}

	_createClass(AppState, [{
		key: 'forceIPv6',
		set: function set(bool) {
			this._forceIPv6 = bool;
			this.aos = this.aos;
		},
		get: function get() {
			return this._forceIPv6;
		}
	}, {
		key: 'aos',
		set: function set(str) {
			this._aos = str;
			this.lockIPv6 = false;

			var match = null;
			try {
				match = str.match(/^aos:\/\/(.+?)(:\d{1,5})?(:0\.7[56])?$/i)[1];
			} catch (e) {
				return;
			}

			if (match.match(/^(\d+)$/) != null) {
				var int = bigInt(match, 10);
				this.lockIPv6 = Util.getSigBytesCount(int) > 4;
				this._ip = ipaddr.fromByteArray(Util.int2bytesLE(int, this.forceIPv6 || this.lockIPv6 ? 16 : 4)).toString();
			} else {
				var addr = null;
				try {
					addr = ipaddr.parse(match);
				} catch (e) {
					return;
				}
				this.lockIPv6 = addr.kind() == 'ipv6' && !addr.isIPv4MappedAddress();

				this._ip = addr.kind() == 'ipv6' && addr.isIPv4MappedAddress() ? addr.toIPv4Address().toString() : addr.toString();
			}
		},
		get: function get() {
			return this._aos;
		}
	}, {
		key: 'ip',
		set: function set(str) {
			this._ip = str;
			this.lockIPv6 = false;

			var addr = null;
			try {
				addr = ipaddr.parse(str);
			} catch (e) {
				return;
			}

			this.lockIPv6 = addr.kind() == 'ipv6' && !addr.isIPv4MappedAddress();

			this._aos = "aos://" + Util.LEbytes2int(addr.toByteArray()).toString(10);
		},
		get: function get() {
			return this._ip;
		}
	}]);

	return AppState;
}();

var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.state = new AppState();
		return _this;
	}

	App.prototype.render = function render(_ref, _ref2) {
		var ip = _ref2.ip,
		    aos = _ref2.aos,
		    forceIPv6 = _ref2.forceIPv6,
		    lockIPv6 = _ref2.lockIPv6;

		_objectDestructuringEmpty(_ref);

		return h(
			'form',
			{ 'class': '' },
			h(TextBox, {
				title: 'AOS address',
				ph: 'aos://16777343',
				value: aos,
				onInput: this.linkState('aos') }),
			h(TextBox, {
				title: forceIPv6 || lockIPv6 ? 'IPv6' : 'IP',
				ph: '127.0.0.1',
				value: ip,
				onInput: this.linkState('ip') }),
			h(CheckBox, {
				title: 'Force IPv6',
				value: forceIPv6 || lockIPv6,
				disabled: lockIPv6,
				onChange: this.linkState('forceIPv6') })
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
		var title = _ref3.title,
		    ph = _ref3.ph,
		    value = _ref3.value,
		    onInput = _ref3.onInput;

		return h(
			'div',
			{ 'class': 'form-group' },
			h(
				'label',
				{ 'for': Util.mangle(title) },
				title
			),
			h('input', { type: 'text',
				id: Util.mangle(title), 'class': 'form-control',
				placeholder: ph, value: value,
				onInput: onInput,
				autocomplete: 'off',
				autocorrect: 'off',
				autocapitalize: 'off',
				spellcheck: false })
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
		var title = _ref4.title,
		    value = _ref4.value,
		    disabled = _ref4.disabled,
		    onChange = _ref4.onChange;

		return h(
			'div',
			{ 'class': 'form-group' },
			h(
				'label',
				{ 'class': 'checkbox-inline' },
				h('input', { type: 'checkbox',
					id: Util.mangle(title),
					checked: value, disabled: disabled,
					onChange: onChange }),
				title
			)
		);
	};

	return CheckBox;
}(Component);

render(h(App, null), document.getElementById('main'));

