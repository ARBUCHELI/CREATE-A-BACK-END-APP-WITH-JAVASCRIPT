const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');

const app = express()
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));

module.exports = app

const PORT = process.env.PORT || 4001

app.get('/strips', (req, res) => {
  db.all('SELECT * FROM Strip', (err, rows) => {
    if (err) {
      return res.status(500).send({ error: 'Database error' });
    }
    res.send({ strips: rows });
  });
});

app.post('/strips', (req, res) => {
  const { head, body, background, bubbleType } = req. body.strip || {};

  if (!head || !body || !background || !bubbleType) {
    return res.status(400).send({
      error: 'Missing required fields. Need: head, body, background, bubbleType'
    });
  }

  const stripData = {
    head: req.body.strip.head,
    body: req.body.strip.body,
    background: req.body.strip.background,
    bubble_type: req.body.strip.bubbleType,
    bubble_text: req.body.strip.bubbleText || '',
    caption: req.body.strip.caption || ''
  };

  db.run(
    `INSERT INTO Strip (
      head, 
      body, 
      background, 
      bubble_type, 
      bubble_text, 
      caption
    ) VALUES (
      $head, 
      $body, 
      $background, 
      $bubble_type, 
      $bubble_text, 
      $caption
    )`,
    {
      $head: stripData.head,
      $body: stripData.body,
      $background: stripData.background,
      $bubble_type: stripData.bubble_type,
      $bubble_text: stripData.bubble_text,
      $caption: stripData.caption
    },
    function(err) {
      if (err) {
        return res.status(500).send({ error: 'Database error' });
      }

      db.get(
        'SELECT * FROM Strip WHERE id = $id',
        { $id: this.lastID },
        (err, row) => {
          if (err) {
            return res.status(500).send({ error: 'Database error' });
          }
          
          res.status(201).send({ strip: row });
        }
      );
    }
  );
})

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});