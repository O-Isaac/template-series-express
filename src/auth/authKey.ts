import { Request, Response, NextFunction } from 'express'

// TODO: Get apiKeys from database
const authKeys: string[] = ['d41d8cd98f00b204e9800998ecf8427e']

export default function authKey(req: Request, res: Response, n: NextFunction) {
  const query = req.query
  const apiKey = query.apiKey ? query.apiKey : false ?? false

  if (!apiKey) {
    return res.json({
      status: 403,
      message: 'You not provided a api key'
    })
  }

  if (!authKeys.includes(apiKey as string)) {
    return res.json({
      status: 403,
      message: 'Invalid api key'
    })
  }

  return n()
}
