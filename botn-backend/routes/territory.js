import { Router, Status } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import firebase from "https://cdn.skypack.dev/firebase;

const firebaseConfig = JSON.parse(Deno.env.get("FIREBASE_CONFIG"));
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(firebaseApp);

const router = new Router()

router.get("/territory", async (ctx) => {
    const querySnapshot = await db.collection("territory").get()
    console.log(querySnapshot)
    ctx.response.body = querySnapshot.docs.map((doc) => doc.data());
    ctx.response.type = "json";
})

module.exports = router;