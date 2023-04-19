const { app, BrowserWindow, ipcMain } = require('electron');
const { performSecurityScans } = require('./scanner');
const { writeLog } = require('./logger');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('start-scan', async (event, { target, selectedScanners }) => {
  try {
    writeLog(`Starting scan for ${target}`);
    const scanResults = await performSecurityScans(target, selectedScanners);
    return { success: true, message: 'Scan completed successfully.', results: scanResults };
  } catch (error) {
    return { success: false, message: error.message };
  }
});


ipcMain.handle('generate-pdf-report', (event, target) => {
  scanner.generatePDFReport(target, (err) => {
    if (err) {
      return { success: false, error: err.message };
    }
    return { success: true };
  });
});