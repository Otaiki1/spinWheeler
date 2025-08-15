import { collection, addDoc } from "firebase/firestore/lite";

import { db } from "./firebaseConfig";

async function pushToCollection(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export default pushToCollection;
