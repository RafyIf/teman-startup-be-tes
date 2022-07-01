import http from 'http'
import app from './app'

http.createServer(app).listen(process.env.PORT || 8080, () => {
  console.log(`service running port:\x1b[33m${process.env.PORT || 8080}\x1b[0m`)
})
