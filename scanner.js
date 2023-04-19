const nmap = require('./scanners/nmap');
const nikto = require('./scanners/nikto');
const openvas = require('./scanners/openvas');
const sqlite3 = require('sqlite3');
const { writeLog } = require('./logger');

const db = new sqlite3.Database(':memory:');

function initializeDatabase(callback) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS findings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tool TEXT NOT NULL,
      target TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      finding TEXT NOT NULL
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
      return callback(err);
    }
    callback(null);
  });
}

async function performSecurityScans(target, selectedScanners) {
  console.log(`Performing security scans for target: ${target}`);
  writeLog(`Performing security scans for target: ${target}`);

  const scannerFunctions = {
    Nmap: nmap.nmapScan,
    Nikto: nikto.niktoScan,
    OpenVAS: openvas.openvasScan,
  };

  function runScanner(scannerName) {
    return new Promise((resolve, reject) => {
      scannerFunctions[scannerName](target, (err, results) => {
        if (err) {
          writeLog(`Error running ${scannerName} scan: ${err.message}`);
          console.error(`Error running ${scannerName} scan:`, err.message);
          reject(err);
        } else {
          storeFindings(scannerName, target, results);
          writeLog(`${scannerName} scan completed.`);
          console.log(`${scannerName} scan completed.`);
          resolve();
        }
      });
    });
  }

  const selectedScannerPromises = selectedScanners.map((scannerName) => runScanner(scannerName));

  try {
    await Promise.all(selectedScannerPromises);
    writeLog('All scans completed.');
    console.log('All scans completed.');
    // Generate the PDF report
    generatePDFReport(target);
  } catch (error) {
    writeLog(`An error occurred during the scan: ${error.message}`);
    console.error('An error occurred during the scan:', error.message);
  }
}


function storeFindings(tool, target, results) {
  const timestamp = new Date().toISOString();

  results.findings.forEach((finding) => {
    const insertQuery = `
      INSERT INTO findings (tool, target, timestamp, finding)
      VALUES (?, ?, ?, ?);
    `;

    db.run(insertQuery, [tool, target, timestamp, finding], (err) => {
      if (err) {
        writeLog(`Error inserting ${tool} finding: ${err.message}`);
        console.error(`Error inserting ${tool} finding:`, err.message);
      }
    });
  });
}


function generatePDFReport(target, callback) {
  // ... Implement the generatePDFReport function, as provided earlier ...
}

module.exports = {
  initializeDatabase,
  performSecurityScans,
  generatePDFReport,
};
