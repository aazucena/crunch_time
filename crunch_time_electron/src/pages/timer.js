import moment from "moment/moment";

const timer = (props) => {
	let time = moment().format('h:mm:ss A')
	return `<div class='container' id="timer">
		<div class='header'>
			<div class='title'>${time}</div>
		</div>
	</div>`
};

export default timer;
