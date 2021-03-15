import { openDB } from 'idb'

// initialize DB
const db = openDB('records-db', 1, {
  upgrade(db) {
    const store = db.createObjectStore('records', { keyPath: 'id', autoIncrement: true })
    store.createIndex('simulation_idx', 'simulation')
    store.createIndex('uid_idx', 'uid')
  },
})

/**
 * 
 * @returns all local records
 */
export async function getRecords() {
  return (await db).getAll('records')
}

/**
 * 
 * @returns records that have not been uploaded
 */
export async function getUnsyncedRecords() {
  return (await db).getAllFromIndex('records', 'uid_idx', '')
}

/**
 * 
 * @returns records that have been uploaded
 */
export async function getSyncedRecords() {
  return (await db).getAllFromIndex('records', 'uid_idx', IDBKeyRange.lowerBound('', true))
}

/**
 * 
 * @param {String} name record of specified name
 * @returns 
 */
export async function getRecordsBySimulation(name) {
  return (await db).getAllFromIndex('records', 'simulation_idx', name)
}

/**
 * insert record into db
 * 
 * @param {*} record 
 */
export async function insertRecord(record) {
  (await db).put('records', record)
}

/**
 * 
 * @param {Number} id delete record by id
 */
export async function deleteRecord(id) {
  (await db).delete('records', id)
}

/**
 * mark a record as synced
 * 
 * @param {Number} key 
 * @param {Number} uid 
 */
export async function syncRecord(key, uid) {
  const transaction = (await db).transaction('records', 'readwrite')
  const store = transaction.objectStore('records')
  const record = await store.get(key)
  record.uid = uid
  await store.put(record)
  await transaction.done
}