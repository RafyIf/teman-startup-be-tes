import express from 'express'
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import errorMiddleware from './utils/error'
import * as endpoints from './components'

class App {
  public server: express.Application

  private swaggerFile: any = process.cwd() + '/swagger/swagger.json'
  private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8')
  private customCss: any = fs.readFileSync(
    process.cwd() + '/swagger/swagger.css',
    'utf8',
  )
  private swaggerDocument = JSON.parse(this.swaggerData)

  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
    this.swaggerDocs()
    this.server.use(errorMiddleware)
  }

  swaggerDocs() {
    this.server.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerDocument, null, null, this.customCss),
    )
  }

  middlewares() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use('/api/orders', endpoints.orders)
  }
}

export default new App().server
