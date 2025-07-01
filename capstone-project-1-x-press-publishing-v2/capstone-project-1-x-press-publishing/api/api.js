const express = require('express')
const apiRouter = express.Router()
const artistsRouter = require('./artists.js')
const seriesRouter = require('./series.js')

module.exports = apiRouter

apiRouter.use('/artists', artistsRouter)
apiRouter.use('/series', seriesRouter)
