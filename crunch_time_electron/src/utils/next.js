import $ from 'jquery'

const next = async(name, props = {} = {}) => {
    let _root = $('#app')
    _root.fadeOut(1000)
    let page = (await import(`../pages/${name}.js`)).default
    let element = await page(props)
    let page_element = `${element}`
		_root.hide().html(page_element).fadeIn(3000)
}

export default next