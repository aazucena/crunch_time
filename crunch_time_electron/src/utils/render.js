


const render = async(name, props = {} = {}) => {
    let page = (await import(`../pages/${name}.js`)).default
    let element = await page(props)
    return `${element}`
}

export default render