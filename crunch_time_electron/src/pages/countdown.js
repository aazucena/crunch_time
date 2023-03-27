import moment from "moment/moment";

const countdown = async(props) => {
	let time = moment(props.time).format('mm:ss')
    let status = (props?.status && props?.status !== null) ? `\n<div class="status">${props.status}</div>` : ''
	return `<div class='container' id="countdown">
		<div class='header'>
			<div class='title'>${time}</div>${status}
		</div>
	</div>`
};

export default countdown;
