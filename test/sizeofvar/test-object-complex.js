
	const vars = {
		x1: {
			cmd: "auth",
			username:"username",
			password:"testpassword"
		},
		x2: {
			cmd: "auth",
			username:"username",
			password:"testpassword",
			sub: {
				cmd: "auth",
				username:"username",
				password:"testpassword",		
			}
		},
		x3: {
			test1: true
		},
		x4: {
			test1: {}
		},
		x5: {
			test1: {
				test2: ''
			}
		},
		x6: {
			test1: {
				test2: {
					test3: ''
				}
			}
		},
		x7: {
			test1: {
				test2: {
					test3: 'abcdefgh'
				}
			}
		},
		x8: {
			test1: {
				test2: {
					test3: 'abcdefgh'
				}
			},
			test14: {
				test2: {
					test3: 'abcdefgh'
				}
			}
		},
		x9: {
			a: "orange",
			b: "banana",
			c: "apple"
		},
		x10: {
			a: "orange",
			b: "banana",
			c: "apple",
			d: 0,
			e: 2147483648,
			f: true,
			g: false,
			h: [],
			i: [1,2,3,4,5],
			j: {},
			k: {
				test1: true
			},
		}
	}

	module.exports = vars;
