import { SerialPort } from 'serialport'
import arrow_path from '../assets/images/arrow.svg'

let arrow = (
	`<svg class="arrow" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
		<path d=\"M480 696 280 497h400L480 696Z" />
	</svg>`
)
let loading_dots = 0;
const instructions = async(props) => {
	let button = await SerialPort.list().then((ports, err) => {
		if (err || ports.length <= 0 || !ports.some((port) => port.path === "COM4")) {
			let dots = new Array(loading_dots).fill('.').join('')
			loading_dots = (loading_dots + 1) % 4
			return `<div id="play-button" class='button disabled' disabled=true>Searching for Alarm Clock${dots}<div>`
		} else {
			return `<div id="play-button" class='button'>Play</div>`
		}
		
	})
	let footer = await SerialPort.list().then((ports, err) => {
		if (err || ports.length <= 0 || !ports.some((port) => port.path === "COM4")) {
			return ``
		} else {
			let ele = `<div class="footer">
				<div class="arduino-buttons">
					<div class="arduino-button" id="arduino-button-5">${arrow}</div>
					<div class="arduino-button" id="arduino-button-4">${arrow}</div>
					<div class="arduino-button" id="arduino-button-3">${arrow}</div>
					<div class="arduino-button" id="arduino-button-2">${arrow}</div>
				</div>
			</div>`
			return `\n${ele}`
		}
		
	})


	return `<div class='container' id="instructions">
		<div class='header'>
			<div class='title'>Instructions</div>
		</div>
		<div class='body'>
			<div id="instructions" class="list">
				<span class="list-item">1. Plug in the Alarm Clock to the USB Dock</span>
				<span class="list-item">2. Press play</span>
				<span class="list-item">3. Watch for the 4 color patterns on the screen</span>
				<span class="list-item">4. Lay down on the "bed"</span>
				<span class="list-item">5. Wait for the alarm to ring to start the round</span>
				<span class="list-item">6. When the alarm sounds, go to the alarm clock</span>
				<span class="list-item">7. Input the right combinations based on the colors, and the buttons on the alarm</span>
				<span class="list-item">8. If you win, you will start to play again in a next round with an increased difficulty</span>
				<span class="list-item">9. If you lose, the game will display the results including number of rounds completed & best time</span>
				<span class="list-item">10. Have fun!</span>
			</div>
			${button}
		</div>${footer}
	</div>`
};

export default instructions;
