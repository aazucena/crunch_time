import moment from "moment/moment";

const countdown = async(props) => {
	let time = moment(props.time).format('mm:ss')
	return `<div class='container' id="countdown">
		<div class='header'>
			<div class='title'>${time}</div>
		</div>
	</div>`
};

export default countdown;
