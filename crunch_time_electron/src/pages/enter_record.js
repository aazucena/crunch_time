const start = async(props) =>
    `<div class='container' id="enter_record">
		<div class='header'>
			<div class='title'>Enter your name to the leaderboard?</div>
		</div>
		<div class='body'>
			<form class="form" id="leaderboard-form">
				<input type="text" class="input" id="leaderboard-name-input" name="leaderboard-name" value="" placeholder="Enter your name" />
				<div class="buttons"> 
					<div id="submit-button" class='button disabled'>Submit</div>
					<div id="skip-button" class='button'>Skip</div>
				</div>
			</form>
		</div>
	</div>`;

export default start;
