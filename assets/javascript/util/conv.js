export function toStr (orig) {
  if (typeof orig === 'undefined' || orig === null) {
    return ''
  }
  return '' + orig
}

export function toFiniteFloat (orig) {
  if (typeof orig === 'string') {
    orig = parseFloat(orig)
  }

  const ok = typeof orig === 'number' && isFinite(orig)
  return ok ? orig : 0.0
}

export function toBool (orig) {
  return !!orig
}
