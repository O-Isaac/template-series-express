import { Express } from 'express'
import glob from 'glob'
import path from 'path'
import kleur from 'kleur'

const prefix = kleur.bold().green('[ROUTER]')

export default async function loadRoutes(app: Express): Promise<boolean> {
  console.log(prefix, 'Loading routers....')

  const pathRoutes = process.env.TS_NODE_DEV
    ? 'src/routes/**/*.{ts,js}'
    : 'server/routes/**/*.{ts,js}'

  glob(pathRoutes, (err, matches) => {
    if (err) {
      return console.log(prefix, kleur.red(err?.message || 'Unknow error!'))
    }

    matches.forEach(async (match) => {
      try {
        const filePath = path.join(process.cwd(), match)
        const fileRoute = await import(filePath)
        const route = fileRoute.default

        if (!route.path) throw Error("The route doesn't have path!")
        if (!route.router) throw Error("The route doesn't have controller")

        app.use(route.path, route.router)

        console.log(
          prefix,
          kleur.green('✔ ' + route.path + ' loaded sucessfully')
        )
      } catch (err: unknown) {
        const fileName = match.split('/').pop()?.replace('.js', '')
        const error = err as Error

        console.log(
          prefix,
          kleur.red('✘ the route ' + fileName + 'is not loaded error:'),
          error.message
        )
      }
    })
  })

  return true
}
