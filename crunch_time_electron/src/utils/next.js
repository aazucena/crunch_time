import $ from 'jquery'

const next = async(name, props = {}, transIn=1000, transOut=3000) => {
    let _root = $('#app')
    _root.fadeOut(transIn)
    let page = (await import(`../pages/${name}.js`)).default
    let element = await page(props)
    let page_element = `${element}`
		_root.hide().html(page_element).fadeIn(transOut)
}

export default next