// Import Firebase
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

// Import Modules
import { error, getReq } from "../modules/server-module.js";

const authRoute = (router, auth) => {
    
    router.post("/signin", async (ctx) => {
        const req = getReq(ctx);

        await setPersistence(auth, browserSessionPersistence)
        try {
            const certs = await signInWithEmailAndPassword(auth, req.email, req.password)
            ctx.response.body = {
                "success": true,
                "certs": certs
            };
        } catch (err) {
            error(ctx, err);
        }
    })
    router.post("/signout", async (ctx) => {
        await signOut(auth).catch((error) => {
            console.error(error);
            ctx.throw(400);
        });
        ctx.response.body = "Signout Successful";
    })

}

export default authRoute;