export const safeCall = (fn?: Function, ...args) => {
  try {
    if (fn && typeof fn === 'function') {
      return fn(...args)
    }
  } catch {}
}

export const safeGet = (object: Object, ...path: string[]): any => {
  return path.reduce((value, getter) => {
    try {
      if (!value) {
        return value
      }

      return value[getter]
    } catch {}
  }, object)
}

export const safeGetValues = (object: Object): any => {
  try {
    return Object.values(object)
  } catch {}
}

export const safeRequire = (window: Window, requiredPackage: string): any => {
  try {
    return window['require'] && window['require'](requiredPackage)
  } catch {}
}
