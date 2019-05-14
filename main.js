#!/usr/local/bin/node

const LogForm = require('logform');
const Winston = require('winston');

const ApplicationLogStandard = { //RFC 5424
	levels: {
		emerg: 0,
		alert: 1,
		crit: 2,
		error: 3,
		warn: 4,
		note: 5,
		info: 6,
		debug: 7
	},
	colors: {
		emerg: 'bold underline red',
		alert: 'bold underline red',
		crit: 'bold red',
		error: 'red',
		warn: 'yellow',
		note: 'magenta',
		info: 'blue',
		debug: 'green'
	}
};
const LogFormat_Console = LogForm.format.combine(
	LogForm.format.colorize({
		all: true,
		colors: ApplicationLogStandard.colors
	}),
	LogForm.format.simple()
	//LogForm.format.padLevels(),
);
const LogFormat_File = LogForm.format.combine(
	LogForm.format.timestamp(/*{alias: 'at'}*/),
	LogForm.format.printf((info) => {
		return `${info.timestamp} ${info.process?info.process+':':''}${info.module?info.module+':':''}${info.file?info.file+':':""}${info.function?info.function+':':''}${info.level}: ${info.message}${(info.meta)?' '+info.meta:''}`;
	})
);
const Logger = Winston.createLogger({
	level: 'debug',
	levels: ApplicationLogStandard.levels,
	transports: [
		new Winston.transports.Console({
			level: 'debug',
			format: LogFormat_Console,
			stderrLevels: ['emerg','alert','crit','error','warn','note','info','debug'],
			warnLevels: ['warn','note']
		}),
		new Winston.transports.File({
			level: 'debug',
			format: LogFormat_File,
			eol: '\n',
			filename: 'log_debug.log',
			maxsize: 1048576,
			maxFiles: 4
		})
	]
});
Logger.log('debug','Yo.');
Logger.log('info','Yo.');
Logger.log('note','Yo.');
Logger.log('warn','Yo.');
Logger.log('error','Yo.');
Logger.log('crit','Yo.');
Logger.log('alert','Yo.');
Logger.log('emerg','Yo.');
Logger.log({level: 'debug', message: 'Yo 2', process: process.argv0, module: 'JS_Sandbox', file: __filename, function: 'main execution block'});
Logger.log({level: 'info', message: 'Yo 2', process: process.argv0, module: 'JS_Sandbox', file: __filename, function: 'main execution block'});
Logger.log({level: 'note', message: 'Yo 2', process: process.argv0, module: 'JS_Sandbox', file: __filename, function: 'main execution block'});
Logger.log({level: 'warn', message: 'Yo 2', process: process.argv0, module: 'JS_Sandbox', file: __filename, function: 'main execution block'});
Logger.log({level: 'error', message: 'Yo 2', process: process.argv0, module: 'JS_Sandbox', file: __filename, function: 'main execution block'});
Logger.log({level: 'crit', message: 'Yo 2', process: process.argv0, module: 'JS_Sandbox', file: __filename, function: 'main execution block'});
Logger.log({level: 'alert', message: 'Yo 2', process: process.argv0, module: 'JS_Sandbox', file: __filename, function: 'main execution block'});
Logger.log({level: 'emerg', message: 'Yo 2', process: process.argv0, module: 'JS_Sandbox', file: __filename, function: 'main execution block'});


const Utility = require('util');
var presplit_time = Date.now();
var postsplit_time = Date.now();
presplit_time = Date.now();
for(var i = 0; i < 1000000; i++){
	console.log(Utility.format('This is %d.', i));
}
postsplit_time = Date.now();
var utility_format_split = postsplit_time - presplit_time;
presplit_time = Date.now();
for(var i = 0; i < 1000000; i++){
	console.log('This is '+i+'.');
}
postsplit_time = Date.now();
var concatenation_split = postsplit_time - presplit_time;
presplit_time = Date.now();
for(var i = 0; i < 1000000; i++){
	console.log(`This is ${i}.`);
}
postsplit_time = Date.now();
var template_split = postsplit_time - presplit_time;

console.log('utility split: %d\nconcatenation split: %d\ntemplate split: %d', utility_format_split, concatenation_split, template_split);
