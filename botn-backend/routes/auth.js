// Import Firebase
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const authRoute = (router, auth) => {
    
    router.post("/signin", async (ctx) => {
        console.log("User Signing In");
        const reqBody = await ctx.request.body();
        const req = await reqBody.value;
        const type = await reqBody.type;
        console.log("1");
        ctx.assert(type === "json" && req.email && req.password, 400);
        console.log("2");
        console.log(req.email, req.password);

        await signInWithEmailAndPassword(auth, req.email, req.password).catch((error) => console.log(error));
        ctx.response.body = {
            "success": true,
            "creds": creds
        };
    })

}

export default authRoute;