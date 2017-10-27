const safeGet = (object: Object, ...path: string[]): any => {
    return path.reduce((value, getter) => {
        try {
            if (!value) {
                return value
            }
    
            return value[getter]
        } catch {}
    }, object)
}

export default safeGet