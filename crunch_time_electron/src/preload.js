// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { SerialPort } = require('serialport')

window.addEventListener('DOMContentLoaded', () => {
    // const replaceText = (selector, text) => {
    //   const element = document.getElementById(selector)
    //   if (element) element.innerText = text
    // }
  
    // for (const type of ['chrome', 'node', 'electron']) {
    //   replaceText(`${type}-version`, process.versions[type])
    // }
    // document.getElementById('serialport-version').innerText = require('serialport/package').version

    // let port = new SerialPort({
    //   path: `COM4`,
    //   baudRate: 9600,
    //   autoOpen: false,
    // }, )
    // port.open(function (err) {
    //   if (err) {
    //     return console.log('Error opening port: ', err.message)
    //   }
    
    //   // Because there's no callback to write, write errors will be emitted on the port:
    // })
    
    // let value = '0'

    // const button = document.querySelector("#start")
    // button.addEventListener('click', () => {
    //   value = value === '0' ? '1' : '0'
    //   console.log("🚀 ~ file: preload.js:35 ~ button.addEventListener ~ value:", value)
    //   port.write(Buffer.from(value))
    // })
    // console.log("🚀 ~ file: preload.js:22 ~ window.addEventListener ~ port:", port)
  })  