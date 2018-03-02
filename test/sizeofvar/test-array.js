
	function makestring(string_length) {
		var text = [];
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < string_length; i++) {
			text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
		}

		return text.join('');
	}
	
	const vars = {
		x1: [],
		x2: [1],
		x3: [1,2],
		x4: [1,2,3],
		x5: [1,2,3,4],
		x6: [1,2,3,4,5],
		x7: [1,2,3,4,5,7],
		x8: [1,2,3,4,5,7,8],
		x9: [1,2,3,4,5,7,8,9],
		x10: [1,2,3,4,5,7,8,9,0],
		x11: ["a"],
		x12: ["a","b"],
		x13: ["a","b","c"],
		x14: ["a","b","c","d"],
		x15: ["a","b","c","d","e"],
		x16: ["",makestring(8),makestring(9),makestring(16),makestring(17)],
		x17: [makestring(24),makestring(8),makestring(9),makestring(16),makestring(17)],
		x18: [true],
		x19: [true,false],
		x20: [true,false,false],
		x21: [true,makestring(24),24,makestring(8),2147483647],
		x22: [true,makestring(24),24,makestring(8),2147483648]
	}
	module.exports = vars;