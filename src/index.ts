import express from 'express'
import colors from 'colors'
import { getConnectionManager, ConnectionManager, Connection } from 'typeorm'
import { Client } from './entities/Client'
import { Banker } from './entities/Banker'
import { Transaction } from './entities/Transaction'
import { createClientRoute } from './routes/create_client'
import { createBankerRoute } from './routes/create_banker'
import { createTransactionRouter } from './routes/create_transaction'
import { connectBankerToClientRouter } from './routes/connect_banker_to_client'
import {getAllClients} from './routes/get_all_clients'
import dotenv from "dotenv"

dotenv.config()
colors.enable();

const app = express()

const main = async () => {
  const connectionManager = getConnectionManager()
  const connection = connectionManager.create({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Client, Banker, Transaction],
    synchronize: true
  })

  try {
    await connection.connect()
    console.log('Connected to database'.blue)

    app.use(express.json())
    app.use(createClientRoute)
    app.use(createBankerRoute)
    app.use(createTransactionRouter)
    app.use(connectBankerToClientRouter)
    app.use(getAllClients)

    app.listen(8080, () => {
      console.log('Now running on port 8080')
    })
  } catch (e) {
    console.error(e.error)
    throw new Error(e)
  }
}

main()

module.exports = app