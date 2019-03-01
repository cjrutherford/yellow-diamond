const bunyan = require("bunyan");
const bFormat = require("bunyan-format");
const path = require('path');


module.exports = (name = "standard logger", fileName = 'access.log', period = '1w', count = 3, level = 'debug', mode = 'long') => {
    const formatOut = bFormat({ outputMode:  mode});
    
    const log = bunyan.createLogger({
      name: name,
      streams: [
        {
          type: "rotating-file",
          path: path.join('../logs/', fileName),
          period: period,
          count: count
        },
        {
          stream: formatOut
        }
      ],
      serializers: bunyan.stdSerializers,
      level: level
    });
    return log;
}