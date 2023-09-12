import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const saveContentToDb = async (content) => {
  try {
    const dbName = 'jate';
    const dbVersion = 1;

    // Open the database
    const db = await openDB(dbName, dbVersion);

    // Create a transaction and access the object store
    const text = db.transaction(dbName, 'readwrite');
    const store = text.objectStore(dbName);

    // Put the content into the database
    await store.put({ jate: content });

    // Commit the transaction
    await text.done;

    console.log('Data successfully saved to the database');
  } catch (error) {
    console.error('Error saving data to the database:', error);
    throw new Error('Failed to save data to the database');
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const dbName = 'jate';
    const dbVersion = 1;

    // Open the database
    const jateDB = await openDB(dbName, dbVersion);

    // Create a transaction and access the object store
    const text = jateDB.transaction(dbName, 'readonly');
    const store = text.objectStore(dbName);

    // Get data from the database
    const request = store.get(1);

    // Get confirmation of the request.
    const result = await request;

    if (result) {
      console.log('Data successfully retrieved from the database:', result.value);
      return result.value;
    } else {
      console.log('No data found in the database');
      return null; // Return null or handle the case where no data is found
    }
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
    throw new Error('Failed to retrieve data from the database');
  }
};


initdb();
