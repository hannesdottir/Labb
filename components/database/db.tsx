import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'krokad';

interface Row {
  id: number;
  value: string;
  intValue: number;
}

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
   const result = await db.runAsync('INSERT INTO testtable (value) VALUES (?)', name);
   console.log('Data inserted successfully');
   console.log('Inserted data:', result.lastInsertRowId);
}

export async function FetchDataFromDatabase(): Promise<Row[]> {
  //Ändra ovan från Row till annat om annat läggs till i databasen!!
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const allRows = (await db.getAllAsync('SELECT * FROM testtable')) as Row[];
console.log(allRows)
  // No need for type assertion here as the return type is Promise<Row[]>
  return allRows; // Return the fetched data as an array of Row objects
}
  
export async function deleteFromDatabase(id: number) {
  console.log('Entering deleteFromDatabase function');

  try {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    console.log('Database opened successfully');

    // Delete the data
    const result = await db.runAsync('DELETE FROM testtable WHERE id = ?', [id]);
    console.log('Data deleted successfully');
    console.log('Number of rows deleted:', result.changes);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}

export async function updateName(id: number, newName: string) {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  await db.runAsync('UPDATE testtable SET value = ? WHERE id = ?', [newName, id]);
}