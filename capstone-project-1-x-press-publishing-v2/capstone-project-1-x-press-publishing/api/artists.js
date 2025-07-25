const express = require('express')
const sqlite3 = require('sqlite3');

const artistsRouter = express.Router()

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

artistsRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Artist WHERE Artist.is_currently_employed = 1', (err, artists) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({artists: artists});
        }
    })
});

artistsRouter.param('artistId', (req, res, next, artistId) => {
    const sql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';
    const values = {$artistId: artistId};
    db.get(sql, values, (error, artist) => {
        if (error) {
            next(error);
            } else if (artist) {
                req.artist = artist;
                next();
            } else {
                res.sendStatus(404);
            }
    });
});

artistsRouter.get('/:artistId', (req, res) => {
    res.status(200).json({ artist: req.artist });
});

artistsRouter.post('/', (req, res, next) => {
    const name = req.body.artist.name;
    const dateOfBirth = req.body.artist.dateOfBirth;
    const biography = req.body.artist.biography;

    if (!name || !dateOfBirth || !biography) {
        return res.sendStatus(400);
    }

    const isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed === 0 ? 0 : 1;


    const sql = `INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed) 
                VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)`;
    
    const values = {
        $name: name,
        $dateOfBirth: dateOfBirth,
        $biography: biography,
        $isCurrentlyEmployed: isCurrentlyEmployed
    };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM Artist WHERE Artist.id = ${this.lastID}`, (error, artist) => {
        if (error) {
          next(error);
        } else {
          res.status(201).json({ artist: artist });
        }
      });
    }
  });
});

artistsRouter.put('/:artistId', (req, res, next) => {
  const { name, dateOfBirth, biography, isCurrentlyEmployed } = req.body.artist;
  const artistId = req.params.artistId;

  if (!name || !dateOfBirth || !biography || isCurrentlyEmployed === undefined) {
    return res.sendStatus(400); 
  }

  const sql = `UPDATE Artist SET 
                name = $name, 
                date_of_birth = $dateOfBirth, 
                biography = $biography, 
                is_currently_employed = $isCurrentlyEmployed 
              WHERE Artist.id = $artistId`;
  
  const values = {
    $name: name,
    $dateOfBirth: dateOfBirth,
    $biography: biography,
    $isCurrentlyEmployed: isCurrentlyEmployed,
    $artistId: artistId
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM Artist WHERE id = ${artistId}`, (err, artist) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json({ artist: artist });
        }
      });
    }
  });
});

artistsRouter.delete('/:artistId', (req, res, next) => {
  const artistId = req.params.artistId;
  
  const sql = `UPDATE Artist 
               SET is_currently_employed = 0 
               WHERE Artist.id = $artistId`;
  
  const values = { $artistId: artistId };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM Artist WHERE id = ${artistId}`, (err, artist) => {
        if (err) {
          next(err);
        } else if (!artist) {
          res.sendStatus(404); 
        } else {
          res.status(200).json({ artist: artist });
        }
      });
    }
  });
});

module.exports = artistsRouter