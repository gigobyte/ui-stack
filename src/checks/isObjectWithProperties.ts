const isObjectWithProperties = (object: any, props: string[]) => {
    return object && props.every(x => Object.getOwnPropertyNames(object).includes(x))
}

export default isObjectWithProperties