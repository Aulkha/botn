// Import Firebase
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const authRoute = (router, auth) => {
    
    router.post("/signin", async (ctx) => {
        console.log("User Signing In");
        const reqBody = await ctx.request.body();
        const req = await reqBody.value;
        const type = await reqBody.type;
        console.log("1");
        ctx.assert(type === "json" && req.email && req.password, 403);
        console.log("2");
        console.log(req.email, req.password);

        await setPersistence(auth, browserSessionPersistence)
        const certs = await signInWithEmailAndPassword(auth, req.email, req.password).catch((error) => {
            console.error(error);
            ctx.throw(400);
        });
        ctx.response.body = {
            "success": true,
            "certs": certs
        };
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