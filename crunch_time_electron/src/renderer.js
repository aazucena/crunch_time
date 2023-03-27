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

import leaderboard from './assets/data/data.json'

import render from './utils/render.js';
import next from './utils/next.js';
import update from './utils/update.js';
import { randomInteger, combinations } from './utils/index.js';
import { retrieveSound } from './utils/music.js';
import { SerialPort } from 'serialport'
import  { ReadlineParser } from '@serialport/parser-readline'
import fs from 'fs'


import { Howl } from 'howler';
import $ from 'jquery';
import moment from 'moment';
import lodash from 'lodash';

let _root = $('#app')
let body = $('body')
let round = 1
let timeSpeed = 1000

let records = leaderboard.records

let state = '';

let color_codes = {
  "5": 'red', 
  "4": 'green', 
  "3": 'blue', 
  "2": 'yellow', 
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

let inputs = []

let record = {
  rounds: 1,
}

const port = new SerialPort({
  path: 'COM4',
  baudRate: 9600,
  autoOpen: false,
})

port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }
})

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', (data) => {
  switch(state) {
    case 'instructions':
      if (!isNaN(Number(data))) {
        let color = color_codes[data]
        $(`#arduino-button-${data}`).css({ 'background-color': color })
        setTimeout(() => {
          $(`#arduino-button-${data}`).css({ 'background-color': 'rgba(170 ,170 ,170, 25%)' })
        }, 100)
      }
      break
    case 'countdown':
      if (!isNaN(Number(data))) {
        if (inputs.length < 4) {
          console.log(data)
          inputs.push(data)
          console.log("🚀 ~ file: renderer.js:210 ~ parser.on ~ inputs:", inputs)
        } else {
          inputs = []
          console.log("🚀 ~ file: renderer.js:210 ~ parser.on ~ inputs:", inputs)
        }
      }
      break
    default:
      break
  }
})

const StartPage = () => {
  state = 'start'
  render('start').then((page) => {
    _root.hide().html(page).fadeIn(3000)
    $("#start-button").on('click', () => {
      InstructionsPage()
    })
  })
}

StartPage()
const InstructionsPage = () => {
  state = 'instructions'
  let isDisabled = $("#play-button").hasClass('.disabled')
  if (isDisabled === true) {
    next('instructions')
    let interval = setInterval(() => {

        update('instructions').then(() => {
          if (!$("#play-button").hasClass('.disabled')) {
            $("#play-button").on('click', () => {
              RoundPage()
              clearInterval(interval)
            })
          }
        })
    }, 1000)
  } else {
    next('instructions').then(() => {
        $("#play-button").on('click', () => {
          RoundPage()
        })
    })
  }
  
}

const RoundPage = () => {
  state = 'round'
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
  let settings = round >= 10 ? round_settings[10] : round_settings[round]
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
  state = 'patterns'
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

const StartGamePage = () => {
  state = 'start_game'
  next('status', { title: 'Go to your bed, and sleep'})
  setTimeout(() => {
    TimerPage()
  }, 6000)
}

const TimerPage = async() => {
  state = 'timer'
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
        sound.stop()
        body.css({ 'background-color': 'transparent', color: 'black', transition: 'none',  })
        CountdownPage()
        clearInterval(interval)
      }
    }
  }, 1000)
}

const CountdownPage = async() => {
  state = 'countdown'
  let settings = round >= 10 ? round_settings[10] : round_settings[round]
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
  let status = null
  
  body.css({ 'background-color': 'red', color: 'black', transition: 'none',  })
  let interval = setInterval(() => {
    update('countdown', { time: start, status })
    if (inputs.length >= 4) {
      let compareCheck = lodash.isEqual(inputs, combination)
      console.log(inputs, combination)
      if (compareCheck === true) {
        sound.stop()
        _root.hide()
        body.css({ 'background-color': 'transparent', color: 'black', transition: 'none',  })
        inputs = []
        WinnerPage()
        clearInterval(interval)
      } else {
        status = 'Your combination is wrong'
        inputs = []
        setTimeout(() => {
          status = null
          $('.status').html('')
        }, 2000)
      }
    } else if (counter < 0) {
      sound.stop()
      _root.hide()
      body.css({ 'background-color': 'transparent', color: 'black', transition: 'none',  })
      LoserPage()
      clearInterval(interval)
    } else {
      if (moment(start).seconds() >= 0) {
        start = moment(start).subtract(1, 'seconds')
      }
      counter--
    }
  }, 1000)
}

const WinnerPage = async() => {
  state = 'winner'
  body.css({ 'background-color': '#EA6A45', color: 'black', transition: 'background-color color 1s ease-in-out',  })
  next('status', { title: `You won!` }).then(() => {
    setTimeout(() => {
      next('status', { title: `Onto the next round!` }).then(() => {
        round++
        record.rounds = round
        setTimeout(() => {
          RoundPage()
        }, 12000)
      })
    }, 6000)
  })
}

const LoserPage = async() => {
  state = 'loser'
  body.css({ 'background-color': '#EA6A45', color: 'black', transition: 'background-color color 1s ease-in-out',  })
  next('status', { title: `You lost...` }).then(() => {
    setTimeout(() => {
      _root.fadeOut(1000)
      LeaderboardFormPage()
    }, 6000)
  })
}

const LeaderboardFormPage = async() => {
  state = 'leaderboard_form'
  setTimeout(() => {
    next('enter_record').then(() => {

      let name = $('#leaderboard-name-input').val()
      $('#leaderboard-name-input').on('change', (event) => {
        if (name !== "") {
          $('#submit-button').addClass('disabled')
        } else {
          name = $('#leaderboard-name-input').val()
          $('#submit-button').removeClass('disabled')
        }
      })
      $('#submit-button').on('click', () => {
        if (!["",null,undefined].includes(name)) {
          _root.fadeOut(1000)
          let item = {
            name: name,
            ...record,
          }
          records = [...records, item]
          console.log("🚀 ~ file: renderer.js:480 ~ $ ~ records:", records)
          fs.writeFileSync('./assets/data/data.json', JSON.stringify({ records }, null, 2))
          LeaderboardPage()
        }
      })
      $('#skip-button').on('click', () => {
        _root.fadeOut(1000)
        LeaderboardPage()
      })
    })
  }, 1000)
}

const LeaderboardPage = async() => {
  state = 'end'
  setTimeout(() => {
    next('end', { data: records }).then(() => {
      $('#play-again-button').on('click', () => {
          _root.fadeOut(1000)
          round = 1
          record.rounds = 1
          RoundPage()
      })
      $('#exit-button').on('click', () => {
        _root.fadeOut(1000)
        round = 1
        record.rounds = 1
        StartPage()
      })
    })
  }, 1000)
  
}
