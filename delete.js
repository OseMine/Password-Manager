const fs = require('fs');
const path = require('path');

// Pfade zur Daten-Datei und Verzeichnis
const userDataPath = require('electron').app.getPath('userData');
const dataFilePath = path.join(userDataPath, 'electron-store.json');

// Lösche die Daten-Datei
fs.unlinkSync(dataFilePath);
