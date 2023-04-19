const { ipcRenderer } = require('electron');

const scanProgress = document.getElementById('scan-progress');
const scanStatus = document.getElementById('scan-status');

document.getElementById('startScan').addEventListener('click', (event) => {
  const target = document.getElementById('target').value;
  const nikto = document.getElementById('nikto').checked;
  const openvas = document.getElementById('openvas').checked;

  if (!target) {
    alert('Please enter a target URL.');
    return;
  }

  if (!nikto && !openvas) {
    alert('Please select at least one type of scan.');
    return;
  }
  event.preventDefault();

  if (!target) {
    alert('Please enter a target URL.');
    return;
  }

  ipcRenderer.send('start-scan', target, { nikto, openvas });
  scanProgress.style.display = 'block';
  scanStatus.textContent = 'Starting scan...';
});

ipcRenderer.on('scan-progress', (event, progress) => {
  const progressBar = scanProgress.querySelector('.progress');
  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute('aria-valuenow', progress);
});

ipcRenderer.on('scan-status', (event, status) => {
  scanStatus.textContent = status;
});

ipcRenderer.on('scan-complete', () => {
  scanProgress.classList.add('d-none');
  scanStatus.textContent = '';
  alert('Scan complete! The report has been generated and saved as a PDF.');
});

ipcRenderer.on('scan-error', (event, errorMessage) => {
  alert(`An error occurred during the scan: ${errorMessage}`);
});
