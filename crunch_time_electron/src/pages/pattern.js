
const pattern = async(props) => {
	
	let arrow = (
		`<svg id="arrow-${props?.id ?? 'none'}" class="arrow" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
			<path d=\"M480 696 280 497h400L480 696Z" />
		</svg>`
	)
	console.log("🚀 ~ file: pattern.js:9 ~ pattern ~ arrow:", arrow)
	return `<div class='container' id="pattern">
		<div class='header'>
			<div class='title'>${arrow}</div>
		</div>
	</div>
</div>`
};

export default pattern;
