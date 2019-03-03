const bunyan = require('bunyan');
const bFormat = require('bunyan-format');

var formatOut = bFormat({ outputMode: 'long' });

const log = bunyan.createLogger({
	name: 'Yellow Diamond',
	streams: [
		{
			type: 'rotating-file',
			path: 'logs/diamond.log',
			period: '1w',
			count: 3,
		},
		{
			stream: formatOut,
		},
	],
	serializers: bunyan.stdSerializers,
	level: 'debug',
});

module.exports = log;
