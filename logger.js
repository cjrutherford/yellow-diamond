const bunyan = require("bunyan");
const bFormat = require("bunyan-format");

var formatOut = bFormat({ outputMode: "long" });

const log = bunyan.createLogger({
  name: "NodeBook",
  streams: [
    {
      type: "rotating-file",
      path: "logs/access.log",
      period: "1w",
      count: 3
    },
    {
      stream: formatOut
    }
  ],
  serializers: bunyan.stdSerializers,
  level: "debug"
});

module.exports = log;
