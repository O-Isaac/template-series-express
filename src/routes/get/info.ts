import { Router, Request, Response } from 'express'
import authKey from '../../auth/authKey'
const router = Router()

router.get('/info', [authKey], (req: Request, res: Response): Response => {
  const object = {
    staus: 200,
    message: 'ok',
    version: 1.0,
    services: 'up'
  }

  return res.json(object)
})

router.get('/users', async (req: Request, res: Response): Promise<Response> => {
  const users: string[] = ['JOHN DOE']

  const respones = {
    status: 200,
    message: 'ok',
    users
  }

  return res.json(respones)
})

export default {
  path: '/api/v1',
  router
}
