/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './styles/_index.sass';

import render from './utils/render.js';
import next from './utils/next.js';
import update from './utils/update.js';
import { randomInteger, combinations } from './utils/index.js';

import $ from 'jquery'

let _root = $('#app')
let body = $('body')
let round = 1
let timeSpeed = 1000

let color_codes = {
  '5': 'red', 
  '6': 'green', 
  '7': 'blue', 
  '8': 'yellow', 
}

let combination = []

const StartPage = () => {
  
  render('start').then((page) => {
    _root.hide().html(page).fadeIn(3000)
    $("#start-button").on('click', () => {
      InstructionsPage()
    })
  })
}

StartPage()
const InstructionsPage = () => {
  next('instructions').then(() => {
    $("#play-button").on('click', () => {
      RoundPage()
    })
  })
}

const RoundPage = () => {
  body.css({ 'background-color': 'transparent', transition: 'background-color 1s ease-in-out' })
  next('status', { title: `Round #${round}` })
  setTimeout(() => {
    _root.fadeOut(1000)
  }, 3000)

  setTimeout(() => {
    GamePage()
  }, 6000)
}

const GamePage = () => {
  next('status', { title: "Remember the combinations!" })
  
  setTimeout(() => {
    _root.hide()
    PatternsPage()
  }, 4000)

  setTimeout(() => {
    TimerPage()
  }, 18000)

}


const PatternsPage = () => {
  let combs = combinations(Object.keys(color_codes))
  combination = combs[randomInteger(0, combs.length)]
  console.log("🚀 ~ file: renderer.js:88 ~ setTimeout ~ combination:", combination)

  let run = () => {
    combination.forEach((code, i) => {
      let color = color_codes[code]
      setTimeout(() => {
  
        body.css({ 'background-color': color, transition: 'background-color 0.5s linear' })
        
        setTimeout(() => {
  
          body.css({ 'background-color': 'transparent', transition: 'background-color 0.5s linear' })
        }, timeSpeed/2)
      }, timeSpeed*(i+1))
    })
    body.css({ 'background-color': 'transparent', transition: 'background-color 1s ease-in-out' })
  }

  if (round < 4) {
    new Array(2).fill(null).forEach((_, i) => {
      setTimeout(() => {
        _root.hide()
        run()
      }, 8000*(i))
      setTimeout(() => {
        if (i < 1) {
          _root.show()
          next('status', { title: "Again, remember the combinations!" })
        }
      }, 3500*(i+1))
    })
  } else {
    run()
  }
}

const TimerPage = () => {
  next('timer')
  let interval = setInterval(() => {
    update('timer')
  }, 1000)
}



// console.log('👋 This message is being logged by "renderer.js", included via webpack');

// const { SerialPort } = require('serialport')
// const tableify = require('tableify')

// async function listSerialPorts() {
//   await SerialPort.list().then((ports, err) => {
//     if(err) {
//       document.getElementById('error').textContent = err.message
//       return
//     } else {
//       document.getElementById('error').textContent = ''
//     }

//     if (ports.length === 0) {
//       document.getElementById('error').textContent = 'No ports discovered'
//     }
//     if (ports) {
//         let tableHTML = tableify(ports)
//         document.getElementById('ports').innerHTML = tableHTML
//     }
//   })
// }

// function listPorts() {
//   listSerialPorts();
//   setTimeout(listPorts, 2000);
// }

// // Set a timeout that will check for new serialPorts every 2 seconds.
// // This timeout reschedules itself.
// setTimeout(listPorts, 2000);

// listSerialPorts()