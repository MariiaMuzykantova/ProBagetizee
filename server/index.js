import express from 'express'
import next from 'next'
import { urlencoded, json } from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import router from './router'
import { initialiseAuthentication } from './auth'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port = 3000

nextApp.prepare().then(() => {
  const app = express()

  // Serve the static files from the React app
  app.use(express.static(path.join(__dirname, 'pro-bagetizee/build')))

  app.get('/projects', (req, res) => {
    res.status(200).json({ hello: 'Hello, from the back-end world!' })
    var list = ["item1", "item2", "item3"]
    res.json(list)
    console.log('Sent list of items')
   } )

  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(cookieParser())

  app.use(passport.initialize())

  router(app)
  initialiseAuthentication(app)
  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on localhost:${port}`)
  })
})
