// Import Virtual Storage
import "https://deno.land/x/xhr@0.1.1/mod.ts";
import { installGlobals } from "https://deno.land/x/virtualstorage@0.1.0/mod.ts";
installGlobals();

// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

// Import oak
import { Application, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { virtualStorage } from "https://deno.land/x/virtualstorage@0.1.0/middleware.ts";

// Initialize Firebase
const firebaseConfig = JSON.parse(Deno.env.get("FIREBASE_CONFIG"));
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Middlewares
const app = new Application();

// Logger
app.use(async (ctx, next) => {
    await next();
    console.log(`${ctx.request.method} ${ctx.request.url}`);
});

// Router Middlewares
// Territory Route
const territoryRouter = new Router();
import territory from "./routes/territory.js";
territory(territoryRouter, db);

// Auth Route
const authRouter = new Router();
import authRoute from "./routes/auth.js";
authRoute(authRouter, auth);

const appRouter = new Router();
appRouter.use("/territory", territoryRouter.routes(), territoryRouter.allowedMethods());
appRouter.use("/auth", authRouter.routes(), authRouter.allowedMethods());

app.use(appRouter.routes());
await app.listen({ port: 8000 });