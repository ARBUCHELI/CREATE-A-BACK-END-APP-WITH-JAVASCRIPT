const express = require('express')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const cors = require('cors')
const apiRouter = require('./api/api')
const path = require('path');

const app = express()
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(errorhandler())
app.use(cors())
app.use('/api', apiRouter);
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})

module.exports = app