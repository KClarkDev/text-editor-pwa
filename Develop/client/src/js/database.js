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
    const db = await initdb();
    const tx = db.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    await store.add(content);
    await tx.done;
    console.log("Content added to the database");
  } catch (error) {
    console.error("putDb not implemented");
  }
};

// Function to get all content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const content = await store.getAll();
    await tx.done;
    return content;
  } catch (error) {
    console.error("getDb not implemented");
  }
};

initdb();
