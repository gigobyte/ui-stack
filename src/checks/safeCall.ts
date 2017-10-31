const safeCall = (fn?: Function, ...args) => {
    try {
        if (fn && typeof fn === 'function') {
            return fn(...args)
        }
    } catch {}
}

export default safeCall