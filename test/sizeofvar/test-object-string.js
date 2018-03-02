
	function makestring(string_length) {
		var text = [];
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < string_length; i++) {
			text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
		}

		return text.join('');
	}
	
	const vars = {
		x1: {
			test: ""
		},
		x2: {
			test: makestring(8)
		},
		x3: {
			test: makestring(9)
		},
		x4: {
			test: makestring(16)
		},
		x5: {
			test: makestring(17)
		},
		x6: {
			test: makestring(24)
		},
		x7: {
			test: makestring(25)
		},
		x8: {
			test: makestring(32)
		},
		x9: {
			test: makestring(33)
		},
		x10: {
			test: makestring(40)
		},
		x11: {
			test: makestring(41)
		}
	}

	module.exports = vars;
