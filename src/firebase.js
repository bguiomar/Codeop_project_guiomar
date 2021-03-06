// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, get, remove } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdASuUuXt49FsfnqibF74M4g-ZUFhpD60",
  authDomain: "guioread.firebaseapp.com",
  databaseURL:
    "https://guioread-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "guioread",
  storageBucket: "guioread.appspot.com",
  messagingSenderId: "848800526328",
  appId: "1:848800526328:web:d0bafe9b59c5f5b24f300d",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to add a new book in read, reading or wanted
// dataset = read, reading or wanted
export function addBook(id, dataset, book) {
  // ruta: dataset + '/' + id
  set(ref(db, dataset + "/" + id), book);
}

// Get all books in read, reading, or wanted
export async function getBooks(dataset) {
  const dbRef = ref(db, dataset);
  try {
    //función get comentada por Germi
    const snapshot = await get(dbRef);
    //información de la web
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getABook(id, dataset) {
  const dbRef = ref(db, dataset + "/" + id);
  try {
    //función get comentada por Germi
    const snapshot = await get(dbRef);
    //información de la web
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}

// Remove a book from a dateset
export async function removeBook(id, dataset) {
  const dbRef = ref(db, dataset + "/" + id);
  remove(dbRef);
}
