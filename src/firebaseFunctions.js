import { collection, addDoc } from "firebase/firestore/lite";

// import db from the firebase config we created
import { db } from "./firebaseConfig";

//function for handling push to collection, you can specify the collection name in "collectionName" and data in "data"
async function pushToCollection(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export default pushToCollection;
