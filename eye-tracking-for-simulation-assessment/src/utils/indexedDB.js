import { openDB } from 'idb'

const db = openDB('records-db', 1, {
  upgrade(db) {
    const store = db.createObjectStore('records', { keyPath: 'id', autoIncrement: true })
    store.createIndex('simulation_idx', 'simulation')
    store.createIndex('sync_idx', 'sync')
  },
})

export async function getRecords() {
  return (await db).getAll('records')
}

export async function getLocalRecords() {
  const store = (await db).transaction('records').objectStore('records')
  return await store.index('sync_idx').getAll(0)
}

export async function getRecordsBySimulation(name) {
  const store = (await db).transaction('records').objectStore('records')
  return await store.index('simulation_idx').getAll(name)
}

export async function insertRecord(record) {
  (await db).put('records', record)
}

export async function deleteRecord(id) {
  (await db).delete('records', id)
}

export async function syncRecord(key) {
  const transaction = (await db).transaction('records', 'readwrite')
  const store = transaction.objectStore('records')
  const record = await store.get(key)
  record.sync = 1
  await store.put(record)
  await transaction.done
}