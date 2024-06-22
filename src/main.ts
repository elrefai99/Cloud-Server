import 'dotenv/config'
import express, { Application, Request, Response } from 'express'
import SystemSetupUtils from './Utils/SystemSetup.utils'

const app: Application = express()

SystemSetupUtils(app)

app.use('*', async (_req: Request, res: Response) => {
  res.status(404).send('This is not the API route you are looking for')
})
app.listen(process.env.PORT, () => {
  console.log('Server of cloud is running in:', process.env.ServerLink)
})
