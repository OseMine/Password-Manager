const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

// Register Start
app.post('/register/start', (req, res) => {
  // Implementiere den Code zur Generierung der Challenge und der öffentlichen Schlüsseloptionen für die Registrierung
  // Speichere die Challenge und sende die öffentlichen Schlüsseloptionen an den Client zurück
});

// Register Finish
app.post('/register/finish', (req, res) => {
  // Implementiere den Code zur Überprüfung der Registrierungsantwort des Clients
  // Speichere den öffentlichen Schlüssel und verknüpfe ihn mit dem Benutzer
});

// Login Start
app.post('/login/start', (req, res) => {
  // Implementiere den Code zur Generierung der Challenge und der Benutzercredential-ID für den Anmeldevorgang
  // Sende die Challenge und die Benutzercredential-ID an den Client zurück
});

// Login Finish
app.post('/login/finish', (req, res) => {
  // Implementiere den Code zur Überprüfung der Anmeldeantwort des Clients
  // Führe die Authentifizierung durch und sende eine Antwort an den Client zurück
});

// Stammverzeichnis
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  

// Starte den Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
