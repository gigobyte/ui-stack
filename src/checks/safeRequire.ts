const safeRequire = (window: Window, requiredPackage: string): any => {
    try {
        return window['require'] && window['require'](requiredPackage)
    } catch {}
}

export default safeRequire