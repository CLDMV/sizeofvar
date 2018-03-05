
const sizeofvar = require('../sizeofvar.js');

function test(obname, ob) {
	console.log('=== '+obname+' ===');
	if (argv.v) {
		console.log(ob);
	}
	var l = sizeof2(ob);
	// for some reason some variables will return lower values during process.memoryUsage if ran a 2nd time.
	l = sizeof2(ob);
	console.log(obname+' [sizeof2]: '+l);
	l = sizeofvar(ob);
	console.log(obname+' [sizeofvar]: '+l);
}

function sizeof2(o) {
	// populate the memory usage so we don't end up counting that memory footprint
	process.memoryUsage();
	
	var tt = JSON.stringify(o);
	var t = JSON.parse(tt);
	
	gc();
	process.memoryUsage();

	// Wierd Shit happening here. Have to set it 4 times for some reason. The 2nd time makes sense.
	// As it would create a new variable. But the last 2 make no sense.
	var start_memory = process.memoryUsage().heapUsed;
	start_memory = process.memoryUsage().heapUsed;
	start_memory = process.memoryUsage().heapUsed;
	start_memory = process.memoryUsage().heapUsed;

	t = JSON.parse(tt);
	
	return (process.memoryUsage().heapUsed - start_memory);
}

const yargs = require('yargs');
const argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command('test', 'Which test to run')
    .example('$0 object', 'Runs the test specified')
	.demandCommand(1, 'You need at least one command before moving on')
	.option('verbose', {
		alias: 'v',
		default: false
	})
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright 2018 - Catalyzed Motivation Inc')
    .argv;
	
if (typeof argv._ != "undefined" && argv._ != '') {
	var vars = require('./sizeofvar/test-'+argv._+'.js');
	Object.entries(vars).forEach(([key, o]) => {
		test(key,o);
	});
}