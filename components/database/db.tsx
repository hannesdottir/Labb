import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'krokad';

export async function insertIntoDatabase(name: string) {
  console.log('Entering insertName function');

  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  console.log('Database opened successfully');

  //Ensure the table exists
  await db.execAsync(`
   PRAGMA journal_mode = WAL;
   CREATE TABLE IF NOT EXISTS testtable (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL);
  `);
  console.log('Table created successfully');

   // Insert the data
   const result = await db.runAsync('INSERT INTO test (value) VALUES (?)', name);
   console.log('Data inserted successfully');
   console.log('Inserted data:', result.lastInsertRowId);

  //Fetch data
  const allRows = await db.getAllAsync('SELECT * FROM test');
  for (const row of allRows) {
  console.log(allRows);
}

}

  