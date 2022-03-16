import next from 'next'
import express, { Application, Request, Response } from 'express'
import 'dotenv/config'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server: Application = express();
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })
  // server.get('/', (res: Response) => {
  //   res.send('Hello World')
  // })
  server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    )
  })
})