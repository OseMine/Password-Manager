const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = new sqlite3.Database('database.db');

// Funktion zum Überprüfen des Passworts beim Login
function checkPassword(username, password, callback) {
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      return callback(err);
    }
    if (!row) {
      return callback(null, false); // Benutzer nicht gefunden
    }
    bcrypt.compare(password, row.password, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result); // Ergebnis der Passwortüberprüfung zurückgeben
    });
  });
}

// Funktion zur Registrierung eines neuen Benutzers
function registerUser(username, password, callback) {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return callback(err);
    }
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], callback);
  });
}

module.exports = {
  checkPassword,
  registerUser
};
