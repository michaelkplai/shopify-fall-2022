import express from 'express'
import bodyParser from 'body-parser'

import { OpenWeatherWeatherApi } from './implementations/OpenWeatherWeatherApi'
import { SimpleInventoryValidator } from './implementations/SimpleInventoryValidator'
import { SqliteInventoryRepository } from './implementations/SqliteInventoryRepository'
import { createInventory } from './usecases/createInventory'
import { getInventory } from './usecases/getInventory'
import { listInventory } from './usecases/listInventory'

// Construct implementations classes for dependency injection
const weatherApi = new OpenWeatherWeatherApi()
const invValidator = new SimpleInventoryValidator()
const invRepo = new SqliteInventoryRepository()

async function main() {
  const PORT = process.env.PORT || 3000

  const app = express()
  app.use(bodyParser.json())

  // Connect to db
  await invRepo.open()

  // API Routes
  app.post('/v1/inventory', async (req, res) => {
    const [inventory, validationErrors, serverError] = await createInventory(
      invRepo,
      invValidator,
      req.body
    )

    if (serverError) {
      return res.status(500).json({ serverError: true })
    }

    if (validationErrors) {
      return res.status(400).json({ validationErrors })
    }

    return res.status(201).json({ inventory })
  })

  app.get('/v1/inventory', async (req, res) => {
    const [inventories, serverError] = await listInventory(
      invRepo,
      invValidator,
      { deleted: false }
    )

    if (serverError) {
      return res.status(500).json({ serverError: true })
    }

    return res.status(200).json({ inventories })
  })

  app.get('/v1/inventory/deleted', async (req, res) => {
    const [inventories, serverError] = await listInventory(
      invRepo,
      invValidator,
      { deleted: true }
    )

    if (serverError) {
      return res.status(500).json({ serverError: true })
    }

    return res.status(200).json({ inventories })
  })

  app.get('/v1/inventory/:id', async (req, res) => {
    const [inventory, validationErrors, serverError] = await getInventory(
      invRepo,
      invValidator,
      { id: req.params.id }
    )

    if (serverError) {
      return res.status(500).json({ serverError: true })
    }

    if (validationErrors) {
      return res.status(400).json({ validationErrors })
    }

    if (!inventory) {
      return res.status(404).json({ notFound: true })
    }

    return res.status(200).json({ inventory })
  })

  // app.patch('/v1/inventory/:id')

  // app.delete('/v1/inventory/:id')

  // app.post('/v1/inventory/:id/deleted')

  app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
  })
}

main().catch(console.error)

process.on('SIGINT', async () => {
  await invRepo.close()
})
