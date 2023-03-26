import $ from 'jquery'

const update = async(name, props = {} = {}) => {
    let _root = $('#app')
    let page = (await import(`../pages/${name}.js`)).default
    let page_element = `${page(props)}`
    _root.html(page_element)
}

export default update