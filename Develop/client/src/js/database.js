import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Function to add content to the database
export const putDb = async (content) => {
  try {
    const db = await openDB("jate", 1);
    const tx = db.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ value: content, id: 1 });
    await request;
    console.log("Content added to the database");
  } catch (error) {
    console.error("Error adding content to the database:", error);
  }
};

// Function to get all content from the database
export const getDb = async () => {
  try {
    const db = await openDb("jate", 1);
    const tx = db.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const content = store.getAll();
    await content;
  } catch (error) {
    console.error("Could not get content from the database:", error);
  }
};

initdb();
