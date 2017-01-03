let { h, render, Component } = preact;
/** @jsx h */

class Util {
	static LEbytes2int(b) {
		let result = bigInt();
		for (let i = b.length - 1; i >= 0; i--) {
			let cur = bigInt(b[i]).times(bigInt(2).pow(i*8));
			result = result.add(cur);
		}
		return result;
	}
	static int2bytesLE(int, times) {
		let result = [];
		for (let i = 0; i < times; i++) {
			result.push(int.mod(256).valueOf());
			int = int.divide(256);
		}
		return result;
	}
	static getSigBytesCount(int) {
		let count = 0;
		while (int > 0) {
			int = int.shiftRight(8);
			count++;
		}
		return count;
	}
	static mangle(str) {
		return str.replace(/[^A-Za-z0-9]/g, '-')
	}
}

class AppState {
	constructor() {
		this.lockIPv6 = false;
	}
	set forceIPv6(bool) {
		this._forceIPv6 = bool;
		this.aos = this.aos;
	}
	get forceIPv6() {
		return this._forceIPv6
	}
	set aos(str) {
		this._aos = str
		this.lockIPv6 = false;

		let match = null;
		try{
			match = str.match(/^aos:\/\/(.+?)(:\d{1,5})?(:0\.7[56])?$/i)[1]
		}
		catch(e) { return }

		if (match.match(/^(\d+)$/) != null) {
			let int = bigInt(match, 10)
			this.lockIPv6 = Util.getSigBytesCount(int) > 4;
			this._ip = ipaddr.fromByteArray(Util.int2bytesLE(int, this.forceIPv6 || this.lockIPv6 ? 16 : 4)).toString();
		}
		else {
			let addr = null;
			try {
				addr = ipaddr.parse(match);
			}
			catch (e) { return }
			this.lockIPv6 = addr.kind() == 'ipv6' && !addr.isIPv4MappedAddress();

			this._ip = (addr.kind() == 'ipv6' && addr.isIPv4MappedAddress()) ? addr.toIPv4Address().toString() : addr.toString();

		}

	}
	get aos() {
		return this._aos
	}
	set ip(str) {
		this._ip = str

		let addr = null;
		try {
			addr = ipaddr.parse(str);
		}
		catch (e) { return }

		this._aos =  "aos://" + Util.LEbytes2int(addr.toByteArray()).toString(10)
	}
	get ip() {
		return this._ip
	}
}

class App extends Component {
	constructor() {
        super(); 
		this.state = new AppState
	}

	render({}, { ip, aos, forceIPv6, lockIPv6 }) {
		return (

			<form class="">
				<TextBox title="AOS address" ph="aos://16777343" value={ aos } onInput={ this.linkState('aos') }/>
				<TextBox title={ forceIPv6 || lockIPv6 ? 'IPv6' : 'IP' } ph="127.0.0.1" value={ ip } onInput={ this.linkState('ip') }/>
				<CheckBox title="Force IPv6 " value={ forceIPv6 || lockIPv6 } disabled={ lockIPv6 } onChange={ this.linkState('forceIPv6') }/>
			</form>
		);
	}
}


class TextBox extends Component {
	render({ title, ph, value, onInput }) {
		return (<div class="form-group">
				<label for={ Util.mangle(title) }>{ title }</label>
				<input type="text" 
					id={ Util.mangle(title) } class="form-control" 
					placeholder={ ph } value={ value } 
					onInput={ onInput } 
					autocomplete="off" 
					autocorrect="off" 
					autocapitalize="off" 
					spellcheck="false" />
			</div>);
	}
}


class CheckBox extends Component {
	render({ title, value, disabled, onChange }) {
		return (<div class="form-group">
				<label class="checkbox-inline"><input type="checkbox" 
					id={ Util.mangle(title) } 
					checked={ value } disabled={ disabled } 
					onChange={ onChange }/>{ title }</label>
			</div>);
	}
}


render(<App />, document.getElementById('main'))
