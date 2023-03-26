import $ from 'jquery'

const update = async(name, props = {} = {}) => {
    let _root = $('#app')
    let page = (await import(`../pages/${name}.js`)).default
    let element = await page(props)
    let page_element = `${element}`
    _root.html(page_element)
}

export default update