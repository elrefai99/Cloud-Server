import express, { Application, Request, Response } from 'express'
import SystemSetupUtils from './Utils/SystemSetup.utils'
import { connect } from 'mongoose'
import { configDotEnv } from './Config/env/env'
import appModule from './app.module'
configDotEnv()

const app: Application = express()

SystemSetupUtils(app)

appModule(app)

app.use('*', async (_req: Request, res: Response) => {
  res.status(404).send('This is not the API route you are looking for')
})
connect(process.env.mongoDB as string).then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Server & Database of cloud is running in:', process.env.ServerLink)
  })
}).catch((err: any) => {
  console.log(err)
})
