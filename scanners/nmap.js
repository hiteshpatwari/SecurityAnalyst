import { exec } from 'child_process';

function nmapScan(target, callback) {
  const command = `nmap -sV ${target}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Nmap: ${error.message}`);
      return callback(error, null);
    }

    if (stderr) {
      console.error(`Nmap stderr: ${stderr}`);
      return callback(new Error(stderr), null);
    }

    // Parse stdout and convert it to JSON or another structured format
    const results = parseNmapOutput(stdout);

    callback(null, results);
  });
}

function parseNmapOutput(output) {
  const lines = output.trim().split('\n');
  const results = [];
  let currentHost = {};

  lines.forEach((line) => {
    if (line.startsWith('Nmap scan report for')) {
      currentHost = {
        host: line.replace('Nmap scan report for', '').trim(),
        ports: [],
      };
    } else if (line.startsWith('Host is up')) {
      currentHost.status = 'up';
    } else if (line.startsWith('Host is down')) {
      currentHost.status = 'down';
    } else if (line.match(/^\d+\/(tcp|udp)/)) {
      const portInfo = line.split(/\s+/);
      currentHost.ports.push({
        port: parseInt(portInfo[0].split('/')[0]),
        protocol: portInfo[0].split('/')[1],
        state: portInfo[1],
        service: portInfo[2],
        version: portInfo[4] ? portInfo.slice(4).join(' ') : '',
      });
    } else if (line.startsWith('Nmap done')) {
      results.push(currentHost);
    }
  });

  return results;
}


module.exports = {
  nmapScan,
};
