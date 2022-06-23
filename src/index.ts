import Server from './class/server'

const server = new Server({ port: 3000 })
const database = server.database

export { database, server }
