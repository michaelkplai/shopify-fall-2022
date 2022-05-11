import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'

import { City, cityMeta, isValidCity } from '../entities/City'

import { Inventory } from '../entities/Inventory'
import {
  CreateInventoryInput,
  DeleteInventoryInput,
  GetInventoryInput,
  ListInventoryInput,
  UndeleteInventoryInput,
  UpdateInventoryInput
} from '../interfaces/InventoryInputs'
import { InventoryRepository } from '../interfaces/InventoryRepository'

export interface SqliteInventory {
  id: number
  name: string
  stock: number
  city: string
  deleted: number
  deletion_comment: string
}

function isSqliteInventory(row: any): row is SqliteInventory {
  return (
    typeof row === 'object' &&
    typeof row.id === 'number' &&
    typeof row.name === 'string' &&
    typeof row.stock === 'number' &&
    typeof row.city === 'string' &&
    typeof row.deleted === 'number' &&
    typeof row.deletion_comment === 'string'
  )
}

export class SqliteInventoryRepository implements InventoryRepository {
  private db!: Database<sqlite3.Database, sqlite3.Statement>

  async open(): Promise<void> {
    try {
      this.db = await open({
        filename: './db.sqlite',
        driver: sqlite3.Database
      })
      await this.db.run(`CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        stock INTEGER NOT NULL,
        city TEXT NOT NULL,
        deleted INTEGER NOT NULL,
        deletion_comment TEXT NULL
      );`)
    } catch (e) {
      console.error('Something went wrong opening the database', e)
      throw e
    }
  }

  async create(
    input: CreateInventoryInput
  ): Promise<[Inventory | null, boolean]> {
    try {
      const res = await this.db.run(
        `INSERT INTO inventory(name, stock, city, deleted, deletion_comment)
        VALUES (?, ?, ?, 0, '');`,
        [input.name, input.stock, input.city]
      )

      const id = res.lastID
      if (id === undefined) {
        console.error('Something went wrong creating the inventory')
        return [null, true]
      }

      const [inventory, serverError] = await this.fetch({ id: id.toString() })
      if (serverError || !inventory) {
        console.error(
          'Something went wrong fetching the newly created inventory'
        )
        return [null, true]
      }

      return [inventory, false]
    } catch (e) {
      console.error('Something went wrong creating the inventory', e)
      return [null, true]
    }
  }

  update(input: UpdateInventoryInput): Promise<[Inventory | null, boolean]> {
    throw new Error('Method not implemented.')
  }

  async fetch(input: GetInventoryInput): Promise<[Inventory | null, boolean]> {
    try {
      const row = await this.db.get(
        `SELECT * FROM inventory WHERE id = ?`,
        input.id
      )

      if (!row) return [null, false]

      const inventory = this.adapt(row)
      if (!inventory) {
        console.error('Something went wrong adapting the inventory')
        return [null, true]
      }

      return [inventory, false]
    } catch (e) {
      console.error('Something went wrong fetching the inventory', e)
      return [null, true]
    }
  }

  async list(input: ListInventoryInput): Promise<[Inventory[], boolean]> {
    const deleted = input.deleted ? 1 : 0

    try {
      const rows = await this.db.all(
        `SELECT * FROM inventory WHERE deleted = ?`,
        deleted
      )

      const adaptedRows = rows.map(this.adapt)
      if (adaptedRows.includes(null)) {
        return [[], true]
      }

      // Guarenteed to only contain Inventory objects since otherwise we return above
      return [adaptedRows as Inventory[], false]
    } catch (e) {
      console.error('Something went wrong listing the inventory', e)
      return [[], true]
    }

    throw new Error('Method not implemented.')
  }

  async delete(
    input: DeleteInventoryInput
  ): Promise<[Inventory | null, boolean]> {
    // Rough outline
    // 1. Update an inventory
    // 2. Return if it does not exist
    // 3. If it does exist fetch and return, if fails return serverError

    let rowsChanged = 0

    try {
      const res = await this.db.run(
        `
      UPDATE inventory
      SET deleted = ?, deletion_comment = ?
      WHERE id = ?;`,
        [1, input.deletionMessage, input.id]
      )

      rowsChanged = res.changes || 0
    } catch (e) {
      console.error('Something went wrong deleting the inventory', e)
      return [null, true]
    }

    if (rowsChanged < 1) {
      return [null, false]
    }

    const [inventory, serverError] = await this.fetch({ id: input.id })
    if (serverError || !inventory) {
      console.error('Something went wrong fetching the newly deleted inventory')
      return [null, true]
    }

    return [inventory, false]
  }

  restore(input: UndeleteInventoryInput): Promise<[Inventory | null, boolean]> {
    throw new Error('Method not implemented.')
  }

  async close() {
    try {
      await this.db.close()
    } catch (e) {
      console.error('Something went wrong closing the database', e)
      throw e
    }
  }

  private adapt(row: any): Inventory | null {
    if (!isSqliteInventory(row) || !isValidCity(row.city)) {
      return null
    }

    const inv: Inventory = {
      id: row.id.toString(),
      name: row.name,
      stock: row.stock,
      city: row.city,
      deleted: !!row.deleted,
      deletionComment: row.deletion_comment,
      cityName: cityMeta[row.city].prettyName
    }

    return inv
  }
}
