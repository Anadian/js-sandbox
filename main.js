#!/usr/local/bin/node

const ApplicationLogStandard = require('./application-log-standard.js');
const LogForm = require('logform');
const Winston = require('winston');

//Constants
const FILENAME = 'main.js';
const MODULE_NAME = 'JSSandbox';
var PROCESS_NAME = '';
if(require.main === module){
	PROCESS_NAME = 'js-sandbox';
} else{
	PROCESS_NAME = process.argv0;
}
	const LogFormat_Console = LogForm.format.combine(
		LogForm.format.colorize({
			all: true,
			colors: ApplicationLogStandard.colors
		}),
		/*LogForm.format.metadata({
			fillExcept: [
				'level',
				'message',
				'process',
				'module',
				'file',
				'function'
			]
		}),*/
		LogForm.format.splat(),
		LogForm.format.printf((info) => {
			return `${info.level}: ${info.message}`;
		})
		//LogForm.format.simple()
		//LogForm.format.padLevels(),
	);
	const LogFormat_File = LogForm.format.combine(
		//ApplicationLogStandard.DefaultPropertiesFormat(),
		LogForm.format.timestamp(/*{alias: 'at'}*/),
		LogForm.format.splat(),
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
var test_object = {
	a: {
		b: {
			c: {
				d: [],
				e: 'string'
			},
			f: 1
		},
		g: ['yo','dog',1]
	},
	h: true
};
Logger.log('debug','test_object: %o', test_object);
Logger.log('info','test_object: %o', test_object);
Logger.log('note','test_object: %o', test_object);
Logger.log('warn','test_object: %o', test_object);
Logger.log('error','test_object: %o', test_object);
Logger.log('crit','test_object: %o', test_object);
Logger.log('alert','test_object: %o', test_object);
Logger.log('emerg','test_object: %o', test_object);

