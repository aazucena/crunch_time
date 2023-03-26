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

import './assets/styles/_index.sass';

import render from './utils/render.js';
import next from './utils/next.js';
import update from './utils/update.js';
import { randomInteger, combinations } from './utils/index.js';
import { retrieveSound } from './utils/music.js';

import { Howl } from 'howler';
import $ from 'jquery';
import moment from 'moment';

let _root = $('#app')
let body = $('body')
let round = 5
let timeSpeed = 1000

let color_codes = {
  '5': 'red', 
  '6': 'green', 
  '7': 'blue', 
  '8': 'yellow', 
}

let alarm_jukebox = [
  {
    name: 'outlast',
    duration: '00:02:17'
  },
  {
    name: 'metal_gear_solid',
    duration: '00:14:14'
  },
  {
    name: 'mission_impossible',
    duration: '00:03:27'
  },
  {
    name: 'mr_x',
    duration: '00:02:17'
  },
  {
    name: 'persona_5',
    duration: '00:01:57'
  },
  {
    name: 'spongebob_1',
    duration: '00:00:32'
  },
  {
    name: 'spongebob_2',
    duration: '00:02:07'
  },
  {
    name: 'super_mario_64',
    duration: '00:00:53'
  },
  {
    name: 'undertale',
    duration: '00:15:48'
  },
  {
    name: 'left_4_dead',
    duration: '00:01:11'
  },
  {
    name: 'yakety_sax',
    duration: '00:04:34'
  },
]


let round_settings = {
  1: {
    countdown: 60,
    timeouts: {
      game_page: 18000
    },
  },
  2: {
    countdown: 45,
    timeouts: {
      game_page: 18000
    },
  },
  3: {
    countdown: 30,
    timeouts: {
      game_page: 18000
    },
  },
  4: {
    countdown: 15,
    timeouts: {
      game_page: 18000
    },
  },
  5: {
    countdown: 12,
    timeouts: {
      game_page: 10000
    },
  },
  6: {
    countdown: 10,
    timeouts: {
      game_page: 10000
    },
  },
  7: {
    countdown: 7,
    timeouts: {
      game_page: 10000
    },
  },
  8: {
    countdown: 5,
    timeouts: {
      game_page: 10000
    },
  },
  9: {
    countdown: 2,
    timeouts: {
      game_page: 10000
    },
  },
  10: {
    countdown: 1,
    timeouts: {
      game_page: 10000
    },
  },
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
  next('instructions')
  
  let interval = setInterval(() => {

      update('instructions').then(() => {
        if (!$("#play-button").hasClass('disabled')) {
          $("#play-button").on('click', () => {
            RoundPage()
            clearInterval(interval)
        })
        }
      })
  }, 1000)
  
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
  let settings = round_settings[round]
  next('status', { title: "Remember the combinations!" })
  
  setTimeout(() => {
    _root.hide()
    PatternsPage()
  }, 4000)

  setTimeout(() => {
    StartGamePage()
  }, settings.timeouts.game_page)

}


const PatternsPage = () => {
  let combs = combinations(Object.keys(color_codes))
  combination = combs[randomInteger(0, combs.length)]
  // console.log("🚀 ~ file: renderer.js:88 ~ setTimeout ~ combination:", combination)

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

const StartGamePage = () => {
  next('status', { title: 'Go to your bed, and sleep'})
  setTimeout(() => {
    TimerPage()
  }, 6000)
}

const TimerPage = async() => {
  next('timer')
  let start = moment()
  setTimeout(() => {
    body.css({ 'background-color': '#262626', color: '#ffe449', transition: 'background-color color 1s ease-in-out',  })
  }, 1000)
  let music = await retrieveSound('lullaby')
  // console.log("🚀 ~ file: renderer.js:153 ~ TimerPage ~ music:", music)
  var sound = new Howl({
    src: [music],
    loop: true,
    html5: true,
  })
  sound.play()
  let interval = setInterval(() => {
    update('timer')
    let diff = moment().diff(start, 'seconds')
    // console.log("🚀 ~ file: renderer.js:164 ~ interval ~ diff:", diff)
    if (diff > 60) {
      let rand = randomInteger(0, 100000)
      let randomCheck = rand % 2 === 0 
      // console.log("🚀 ~ file: renderer.js:167 ~ interval ~ randomCheck:", randomCheck, rand)
      if (randomCheck) {
        console.log("STOP")
        sound.stop()
        body.css({ 'background-color': 'transparent', color: 'black', transition: 'none',  })
        CountdownPage()
        clearInterval(interval)
      }
    }
  }, 1000)
}

const CountdownPage = async() => {
  let settings = round_settings[round]
  let jukebox = alarm_jukebox.filter((music) => {
    let [hours, minutes, seconds] = music.duration.split(':').map((n) => Number(n)) 
    let duration = ((hours*60)+minutes*60)+seconds
    return duration >= settings.countdown
  })
  let music_src = jukebox[randomInteger(0, jukebox.length)]
  let music = await retrieveSound(music_src.name)
  var sound = new Howl({
    src: [music],
    loop: true,
    html5: true,
  })
  sound.play()
  let start = settings.countdown >= 60 ? moment().hours(0).minutes(1).seconds(0) : moment().hours(0).minutes(0).seconds(settings.countdown)
  update('countdown', { time: start })
  let counter = settings.countdown
  
  body.css({ 'background-color': 'red', color: 'black', transition: 'none',  })
  let interval = setInterval(() => {
    update('countdown', { time: start })
    if (counter < 0) {
      sound.stop()
      _root.hide()
      body.css({ 'background-color': 'transparent', color: 'black', transition: 'none',  })
      clearInterval(interval)
    } else {
      if (moment(start).seconds() >= 0) {
        start = moment(start).subtract(1, 'seconds')
      }
      counter--
    }

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