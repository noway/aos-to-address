import { h, Component } from 'preact';
import linkState from 'linkstate';

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

export default class App extends Component {
	constructor() {
    super();
		this.handleClick = this.handleClick.bind(this);
	}

	setForceIPv6 = (forceIPv6) => {
		this.setState({ forceIPv6 }, () => {
			this.setAos(this.state.aos)			
		})
	};

	setAos = (str) => {
		let aos = str;
		let lockIPv6 = false;
		let ip;
		let match = null;

		try {
			match = str.match(/^aos:\/\/(.+?)(:\d{1,5})?(:0\.7[56])?$/i)[1]
		}
		catch (e) { return }

		if (match.match(/^(\d+)$/) != null) {
			let int = bigInt(match, 10)

			lockIPv6 = Util.getSigBytesCount(int) > 4;
			ip = ipaddr.fromByteArray(Util.int2bytesLE(int, this.state.forceIPv6 || lockIPv6 ? 16 : 4)).toString();
		}
		else {
			let addr = null;
			try {
				addr = ipaddr.parse(match);
			}
			catch (e) { return }

			lockIPv6 = addr.kind() == 'ipv6' && !addr.isIPv4MappedAddress();
			ip = (addr.kind() == 'ipv6' && addr.isIPv4MappedAddress()) ? addr.toIPv4Address().toString() : addr.toString();
		}

		this.setState({ lockIPv6, ip, aos })
	};

	setIp = (str) => {
		let ip = str;
		let lockIPv6 = false;
		let addr = null;

		try {
			addr = ipaddr.parse(str);
		}
		catch (e) { return }

		lockIPv6 = addr.kind() == 'ipv6' && !addr.isIPv4MappedAddress();

		let aos =  "aos://" + Util.LEbytes2int(addr.toByteArray()).toString(10)

		this.setState({ lockIPv6, ip, aos })
	};

	handleClick(e) {
		e.preventDefault();

		fetch('https://ipinfo.io', {
			headers: {
				Accept: 'application/json',
			}
		}).then((res) => res.json()).then((json) => {
			this.setIp(json.ip)
		});
	}

	render({}, { ip, aos, forceIPv6, lockIPv6 }) {
		return (
			<div class="container">
			  <div class="header clearfix">
			    <h3 class="text-muted">AOS ⇔ Address</h3>
			  </div>

			  <div class="jumbotron" id="main">
					<form class="">
						<TextBox 
							title="AOS address" 
							ph="aos://16777343" 
							value={ aos } 
							onInput={(e) => this.setAos(e.target.value)}/>
						<TextBox 
							title={ forceIPv6 || lockIPv6 ? 'IPv6' : 'IP' } 
							ph="127.0.0.1" 
							value={ ip } 
							onInput={(e) => this.setIp(e.target.value)}
							leftButton="My IP"
							onClick={ this.handleClick }/>

						<CheckBox 
							title="Force IPv6" 
							value={ forceIPv6 || lockIPv6 } 
							disabled={ lockIPv6 } 
							onChange={(e) => this.setForceIPv6(e.target.checked)}/>
					</form>
			  </div>

			  <footer class="footer">
			    <p>&copy; Way, No 2017</p>
			  </footer>
			</div>
		);
	}
}


class TextBox extends Component {
	render({ title, ph, value, onInput, leftButton, onClick }) {
		return (<div class="form-group">
			<label for={ Util.mangle(title) }>{ title }</label>

			<div class={ leftButton ? "input-group" : ""}>
				<input type="text"
					id={ Util.mangle(title) } class="form-control"
					placeholder={ ph } value={ value }
					onInput={ onInput }
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck={ false } />
				{
					leftButton ?
					<span class="input-group-btn">
						<button class="btn btn-default" type="button" onClick={ onClick }>{ leftButton }</button>
					</span>
					:
					<span/>
				}
			</div>
		</div>);
	}
}


class CheckBox extends Component {
	render({ title, value, disabled, onChange }) {
		return (
			<div class="form-group">
				<label class="checkbox-inline"><input type="checkbox" 
					id={ Util.mangle(title) } 
					checked={ value } disabled={ disabled } 
					onChange={ onChange }/>{ title }
				</label>
			</div>
		);
	}
}

