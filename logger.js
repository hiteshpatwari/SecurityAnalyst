const electronLog = require('electron-log');

function writeLog(logMessage) {
  console.log(`Writing log: ${logMessage} to file: ${logFile}`);
  electronLog.info(logMessage);
}

module.exports = {
  writeLog,
};
