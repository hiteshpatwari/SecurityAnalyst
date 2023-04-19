import { exec } from 'child_process';

function niktoScan(target, callback) {
  const command = `docker run --rm frapsoft/nikto -h ${target}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Nikto: ${error.message}`);
      return callback(error, null);
    }

    if (stderr) {
      console.error(`Nikto stderr: ${stderr}`);
      return callback(new Error(stderr), null);
    }

    const results = parseNiktoOutput(stdout);
    callback(null, results);
  });
}

function parseNiktoOutput(output) {
  const lines = output.trim().split('\n');
  const results = {
    target: '',
    findings: [],
  };

  lines.forEach((line) => {
    if (line.startsWith('- Target IP:')) {
      results.target = line.replace('- Target IP:', '').trim();
    } else if (line.startsWith('+ ')) {
      const finding = line.slice(1).trim();
      results.findings.push(finding);
    }
  });

  return results;
}


module.exports = {
  niktoScan,
};
