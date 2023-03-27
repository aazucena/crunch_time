import tableify from "tableify";


const end = async(props) => {
	let header = props?.data.length <= 0 ? '' 
		: `\n<div class='header'>
			<div class='title'>Leaderboard</div>
			</div>`
	let table = tableify(props?.data ?? {})
	console.log("🚀 ~ file: end.js:7 ~ end ~ table:", table)
	return `<div class='container' id="exit">${header}
		<div class="body">
			${table}
			<div class="buttons"> 
				<div id="play-again-button" class='button'>Play Again</div>
				<div id="exit-button" class='button'>Exit</div>
			</div>
		</div>
	</div>`
};

export default end;
