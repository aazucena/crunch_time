


const render = async(name, props = {} = {}) => {
    let page = (await import(`../pages/${name}.js`)).default
    return `${page(props)}`
}

export default render