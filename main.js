const { app, BrowserWindow } = require('electron');
const bcrypt = require('bcrypt');
const Store = require('electron-store');
const store = new Store();

// Funktion zum Überprüfen des Passworts beim Login
function checkPassword(password) {
  const hashedPassword = store.get('password');
  return bcrypt.compareSync(password, hashedPassword);
}

// Funktion zum Speichern eines neuen Passworts
function savePassword(password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  store.set('password', hashedPassword);
}

// Erstelle das Hauptfenster
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Lade deine HTML-Datei
  mainWindow.loadFile('index.html');

  // Weitere Logik für das Fenster hier...

  // Beispiel für den Aufruf der sicheren Funktionen beim Login
  mainWindow.webContents.on('login', (event, password) => {
    if (checkPassword(password)) {
      // Das Passwort ist korrekt, führe die gewünschte Aktion aus (z.B. öffne die Hauptansicht)
      mainWindow.loadFile('main.html');
    } else {
      // Das Passwort ist falsch, zeige eine Fehlermeldung an
      event.preventDefault(); // Verhindere das Laden der Hauptansicht
      mainWindow.webContents.send('login-failed');
    }
  });

  // Beispiel für den Aufruf der sicheren Funktion zum Speichern des Passworts
  mainWindow.webContents.on('save-password', (event, password) => {
    savePassword(password);
    // Bestätigungsnachricht oder andere Aktionen nach dem Speichern des Passworts
    mainWindow.webContents.send('password-saved');
  });

  // Weitere Event Listener und Logik hier...

}

// App-Ready-Event
app.whenReady().then(() => {
  createWindow();

  // Weitere Logik nach dem Erstellen des Fensters hier...

});

// Beende die App, wenn alle Fenster geschlossen sind (außer auf macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Reaktiviere die App, wenn sie im Dock angeklickt wird (nur macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
