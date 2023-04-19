import { exec } from 'child_process';

function openvasScan(target, callback) {
  // Replace the container_name with the name you used when running the OpenVAS container
  const command = `docker exec openvas omp -u admin -w admin -T "${target}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing OpenVAS: ${error.message}`);
      return callback(error, null);
    }

    if (stderr) {
      console.error(`OpenVAS stderr: ${stderr}`);
      return callback(new Error(stderr), null);
    }

    const results = parseOpenvasOutput(stdout);
    callback(null, results);
  });
}

function parseOpenvasOutput(output) {
  const lines = output.trim().split('\n');
  const results = {
    target: '',
    findings: [],
  };

  lines.forEach((line, index) => {
    if (index === 0) {
      results.target = line.trim();
    } else if (line.startsWith('Vulnerability')) {
      const finding = line.slice('Vulnerability'.length).trim();
      results.findings.push(finding);
    }
  });

  return results;
}


module.exports = {
  openvasScan,
};
