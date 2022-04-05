copiar los datos de confirguración 
import{iniatialize}...
import{child, get, getDatebase, ref, set} from "firebase/database";

const firebaseConfig={
    apiKey: "...."
    authDomain:"..."
    ...
};

const app= iniatializeApp(firebaseConfig);
const db=getDatebase(app);


// guardar información:
function storeFavorites(favorites){
    set(ref(db,"read/"),read);
    set(ref(db,"reading/"),reading);
    set(ref(db,"wanted/"),wanted);
}
async function getFavorites(favorites){
    const dbRef= ref(db);
    try{
        const snapshot =await get(child(dbRef,`read/`));
        
    }
