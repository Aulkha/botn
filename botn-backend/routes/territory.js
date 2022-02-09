// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

// Import oak
import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";

// Initialize Firebase
const firebaseConfig = JSON.parse(Deno.env.get("FIREBASE_CONFIG"));
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = "BotN REST API";
    ctx.response.type = "string";
})

router.get("/territory", async (ctx) => {
    const querySnapshot = await getDocs(collection(db, "territory"));
    const response = {};
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        const docObj = {
            "id": doc.id
        };
        Object.assign(docObj, doc.data);
        Object.assign(response, docObj)
    });
    ctx.response.body = response;
})

export { router };