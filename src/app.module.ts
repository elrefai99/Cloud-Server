import { Application } from 'express'
import AuthRouter from './APP/Auth/auth.module'

export default (app: Application) => {
  app.use('/api/auth', AuthRouter)
}
