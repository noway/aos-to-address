/* global bigInt, ipaddr */
import { h } from 'preact'
import { useState, useCallback } from 'preact/hooks'

class Util {
  static LEbytes2int (b) {
    let result = bigInt()
    for (let i = b.length - 1; i >= 0; i--) {
      const cur = bigInt(b[i]).times(bigInt(2).pow(i * 8))
      result = result.add(cur)
    }
    return result
  }

  static int2bytesLE (int, times) {
    const result = []
    for (let i = 0; i < times; i++) {
      result.push(int.mod(256).valueOf())
      int = int.divide(256)
    }
    return result
  }

  static getSigBytesCount (int) {
    let count = 0
    while (int > 0) {
      int = int.shiftRight(8)
      count++
    }
    return count
  }
}

export default function App () {
  const [ip, setIp] = useState()
  const [aos, setAos] = useState()
  const [forceIPv6, setForceIPv6] = useState()
  const [lockIPv6, setLockIPv6] = useState()

  const handleSetAos = useCallback((str, forceIPv6) => {
    const aos = str
    let lockIPv6 = false
    let ip
    let match = null

    try {
      match = str.match(/^aos:\/\/(.+?)(:\d{1,5})?(:0\.7[56])?$/i)[1]
    } catch (e) { return }

    if (match.match(/^(\d+)$/) != null) {
      const int = bigInt(match, 10)

      lockIPv6 = Util.getSigBytesCount(int) > 4
      ip = ipaddr.fromByteArray(Util.int2bytesLE(int, forceIPv6 || lockIPv6 ? 16 : 4)).toString()
    } else {
      let addr = null
      try {
        addr = ipaddr.parse(match)
      } catch (e) { return }

      lockIPv6 = addr.kind() === 'ipv6' && !addr.isIPv4MappedAddress()
      ip = (addr.kind() === 'ipv6' && addr.isIPv4MappedAddress()) ? addr.toIPv4Address().toString() : addr.toString()
    }

    setLockIPv6(lockIPv6)
    setIp(ip)
    setAos(aos)
  }, [])

  const onSetAos = useCallback((e) => {
    handleSetAos(e.target.value, forceIPv6)
  }, [forceIPv6, handleSetAos])

  const handleSetIp = useCallback((str) => {
    const ip = str
    let lockIPv6 = false
    let addr = null

    try {
      addr = ipaddr.parse(str)
    } catch (e) { return }

    lockIPv6 = addr.kind() === 'ipv6' && !addr.isIPv4MappedAddress()

    const aos = 'aos://' + Util.LEbytes2int(addr.toByteArray()).toString(10)

    setLockIPv6(lockIPv6)
    setIp(ip)
    setAos(aos)
  }, [])

  const onSetIp = useCallback((e) => {
    handleSetIp(e.target.value)
  }, [handleSetIp])

  const onSetForceIPv6 = useCallback((e) => {
    const forceIPv6 = e.target.checked
    setForceIPv6(forceIPv6)
    handleSetAos(aos, forceIPv6)
  }, [aos, handleSetAos])

  const onClick = useCallback((e) => {
    e.preventDefault()

    fetch('https://ipinfo.io', {
      headers: {
        Accept: 'application/json'
      }
    }).then((res) => res.json()).then((json) => {
      handleSetIp(json.ip)
    })
  }, [handleSetIp])

  return (
    <div class='container'>
      <div class='header clearfix'>
        <h3 class='text-muted'>AOS ⇔ Address</h3>
      </div>
      <div class='jumbotron' id='main'>
        <form>
          <TextBox
            id='aos-address'
            title='AOS address'
            placeholder='aos://16777343'
            value={aos}
            onInput={onSetAos} />
          <TextBox
            id='ip'
            title={forceIPv6 || lockIPv6 ? 'IPv6' : 'IP'}
            placeholder='127.0.0.1'
            value={ip}
            onInput={onSetIp}
            leftButton='My IP'
            onClick={onClick} />
          <CheckBox
            id='force-ipv6'
            title='Force IPv6'
            value={forceIPv6 || lockIPv6}
            disabled={lockIPv6}
            onChange={onSetForceIPv6} />
        </form>
      </div>
      <footer class='footer'>
        <p>&copy; Way, No 2017-2020</p>
      </footer>
    </div>
  )
}

function TextBox ({ id, title, placeholder, value, onInput, leftButton, onClick }) {
  return (<div class='form-group'>
    <label for={id}>{title}</label>
    <div class={leftButton ? 'input-group' : ''}>
      <input type='text'
        id={id}
        class='form-control'
        placeholder={placeholder}
        value={value}
        onInput={onInput}
        autocomplete='off'
        autocorrect='off'
        autocapitalize='off'
        spellcheck={false} />
      {
        leftButton
          ? <span class='input-group-btn'>
            <button class='btn btn-default' type='button' onClick={onClick}>{leftButton}</button>
          </span>
          : null
      }
    </div>
  </div>)
}

function CheckBox ({ id, title, value, disabled, onChange }) {
  return (
    <div class='form-group'>
      <label class='checkbox-inline'><input type='checkbox'
        id={id}
        checked={value} disabled={disabled}
        onChange={onChange} />{title}
      </label>
    </div>
  )
}
