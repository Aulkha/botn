// Import Virtual Storage
import "https://deno.land/x/xhr@0.1.1/mod.ts";
import { installGlobals } from "https://deno.land/x/virtualstorage@0.1.0/mod.ts";
installGlobals();

// Import Firebase
import firebase from "https://cdn.skypack.dev/firebase@8.7.0/app";
import "https://cdn.skypack.dev/firebase@8.7.0/auth";
import "https://cdn.skypack.dev/firebase@8.7.0/firestore";

// Import oak
import {
    Application
  } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { virtualStorage } from "https://deno.land/x/virtualstorage@0.1.0/middleware.ts";

// Initialize Firebase
const firebaseConfig = JSON.parse(Deno.env.get("FIREBASE_CONFIG"));
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.db(firebaseApp);
const auth = firebase.auth(firebaseApp);

const router = new Router()

router.get("/territory", async (ctx) => {
    const querySnapshot = await db.collection("territory").get()
    console.log(querySnapshot)
    ctx.response.body = querySnapshot.docs.map((doc) => doc.data());
    ctx.response.type = "json";
})

const app = new Application();
app.use(virtualStorage());

app.use(async (ctx, next) => {
    const signedInUid = ctx.cookies.get("LOGGED_IN_UID");
    const signedInUser = signedInUid != null ? users.get(signedInUid) : undefined;
    if (!signedInUid || !signedInUser || !auth.currentUser) {
      const creds = await auth.signInWithEmailAndPassword("rakha.tblt@gmail.com", "jGWmpg82vjArtZ");
      const { user } = creds;
      if (user) {
        users.set(user.uid, user);
        ctx.cookies.set("LOGGED_IN_UID", user.uid);
      } else if (signedInUser && signedInUid.uid !== auth.currentUser?.uid) {
        await auth.updateCurrentUser(signedInUser);
      }
    }
    return next();
});

// Routers
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });