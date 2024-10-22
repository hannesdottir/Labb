import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'krokad';

export async function insertName(name: string) {
  console.log('Entering insertName function');

  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  console.log('Database opened successfully');

  //Ensure the table exists
  await db.execAsync(`
   PRAGMA journal_mode = WAL;
   CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
  `);
  console.log('Table created successfully');

  //Insert the name
  const result = await db.runAsync('INSERT INTO test (name) VALUES (?)', name);
  console.log('Name inserted successfully');
  console.log('Inserted name:', result.lastInsertRowId);
}