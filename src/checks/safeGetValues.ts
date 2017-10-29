const safeGetValues = (object: Object): any => {
    try {
        return Object.values(object)
    } catch {}
}

export default safeGetValues