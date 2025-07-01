const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS Artist', (error) => {
        if (error) {
        console.error('Error dropping table:', error);
        return;
        }

        db.run(`CREATE TABLE Artist (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT NOT NULL,
        date_of_birth TEXT NOT NULL,
        biography TEXT NOT NULL,
        is_currently_employed INTEGER NOT NULL DEFAULT 1
        )`, (error) => {
        if (error) console.error('Error creating table:', error);
        });
    });

    db.run('DROP TABLE IF EXISTS Series', (error) => {
        if (error) {
        console.error('Error dropping table:', error);
        return;
        }

        db.run(`CREATE TABLE Series (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL
        )`, (error) => {
        if (error) console.error('Error creating table:', error);
        });
    });

    db.run('DROP TABLE IF EXISTS Issue', (error) => {
        if (error) {
        console.error('Error dropping table:', error);
        return;
        }

        db.run(`CREATE TABLE Issue (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        issue_number INTEGER NOT NULL,
        publication_date TEXT NOT NULL,
        artist_id INTEGER NOT NULL,
        series_id INTEGER NOT NULL,
        FOREIGN KEY (artist_id) REFERENCES Artist(id),
        FOREIGN KEY (series_id) REFERENCES Series(id)
        )`, (error) => {
        if (error) console.error('Error creating table:', error);
        });
    });
});

