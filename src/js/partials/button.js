const Button = {
	button: '<button id="myButton">Oh yes, press me!</button>',
	attachEl: () => {
		$('#myButton').on('click',
			() => {
				console.log('Oh yeah, right there!!!');
			}
		)
	}
};

export default Button;