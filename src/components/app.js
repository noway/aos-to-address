import { h, Component } from 'preact';
import { useState } from 'preact/hooks';

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
}

export default function App(props) {
	const [ip, setIp] = useState()
	const [aos, setAos] = useState()
	const [forceIPv6, setForceIPv6] = useState()
	const [lockIPv6, setLockIPv6] = useState()

	const handleSetForceIPv6 = (forceIPv6) => {
		setForceIPv6(forceIPv6)
		handleSetAos(aos, forceIPv6)
	};

	const handleSetAos = (str, forceIPv6) => {
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
			ip = ipaddr.fromByteArray(Util.int2bytesLE(int, forceIPv6 || lockIPv6 ? 16 : 4)).toString();
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

		setLockIPv6(lockIPv6)
		setIp(ip)
		setAos(aos)
	};

	const handleSetIp = (str) => {
		let ip = str;
		let lockIPv6 = false;
		let addr = null;

		try {
			addr = ipaddr.parse(str);
		}
		catch (e) { return }

		lockIPv6 = addr.kind() == 'ipv6' && !addr.isIPv4MappedAddress();

		let aos =  "aos://" + Util.LEbytes2int(addr.toByteArray()).toString(10)

		setLockIPv6(lockIPv6)
		setIp(ip)
		setAos(aos)
	};

	const handleClick = (e) => {
		e.preventDefault();

		fetch('https://ipinfo.io', {
			headers: {
				Accept: 'application/json',
			}
		}).then((res) => res.json()).then((json) => {
			setIp(json.ip)
		});
	}

	return (
		<div class="container">
		  <div class="header clearfix">
		    <h3 class="text-muted">AOS ⇔ Address</h3>
		  </div>

		  <div class="jumbotron" id="main">
				<form class="">
					<TextBox
						id="aos-address"
						title="AOS address"
						ph="aos://16777343"
						value={ aos }
						onInput={(e) => handleSetAos(e.target.value, forceIPv6)}/>
					<TextBox
						id="ip"
						title={ forceIPv6 || lockIPv6 ? 'IPv6' : 'IP' }
						ph="127.0.0.1"
						value={ ip }
						onInput={(e) => handleSetIp(e.target.value)}
						leftButton="My IP"
						onClick={ handleClick }/>

					<CheckBox
						id="force-ipv6"
						title="Force IPv6"
						value={ forceIPv6 || lockIPv6 }
						disabled={ lockIPv6 }
						onChange={(e) => handleSetForceIPv6(e.target.checked)}/>
				</form>
		  </div>

		  <footer class="footer">
		    <p>&copy; Way, No 2017-2019</p>
		  </footer>
		</div>
	);
}

function TextBox({ id, title, ph, value, onInput, leftButton, onClick }) {
	return (<div class="form-group">
		<label for={ id }>{ title }</label>
		<div class={ leftButton ? "input-group" : ""}>
			<input type="text"
				id={ id }
				class="form-control"
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

function CheckBox({ id, title, value, disabled, onChange }) {
	return (
		<div class="form-group">
			<label class="checkbox-inline"><input type="checkbox"
				id={ id }
				checked={ value } disabled={ disabled }
				onChange={ onChange }/>{ title }
			</label>
		</div>
	);
}
