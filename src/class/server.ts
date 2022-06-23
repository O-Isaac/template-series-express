import { PrismaClient } from '@prisma/client'
import express, { Express } from 'express'
import kleur from 'kleur'
import loadRoutes from '../handler/routes'

const prefix = kleur.bold().blue('[SERVER]')

interface ServerProps {
  port: number
}

export default class Server {
  server: Express = express()
  prisma: PrismaClient = new PrismaClient()

  port = 3000

  constructor(props: ServerProps) {
    const { port } = props
    this.port = port
    this.init()
  }

  private async startHandlers() {
    await loadRoutes(this.server)
  }

  private async startServer() {
    return this.server.listen(this.port, () => {
      console.log(prefix, 'Server started in port 3000')
    })
  }

  public async init() {
    await this.startHandlers()
    await this.startServer()
  }

  get database() {
    return this.prisma
  }
}
