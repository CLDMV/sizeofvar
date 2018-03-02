	
	function makestring(string_length) {
		var text = [];
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < string_length; i++) {
			text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
		}

		return text.join('');
	}
	const vars = {
		x1: "",
		x2: makestring(8),
		x3: makestring(9),
		x4: makestring(16),
		x5: makestring(17),
		x6: makestring(24),
		x7: makestring(25),
		x8: makestring(32),
		x9: makestring(33),
		x10: makestring(40),
		x11: makestring(41),
	}

	module.exports = vars;