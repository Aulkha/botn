// Import Firebase
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const authRoute = (router, auth) => {
    
    router.post("/signin", async (ctx) => {
        console.log("User Signing In");
        console.log(await ctx.request.body().value);
        ctx.status = 200;
        ctx.response.body = await ctx.request.body().value;
        /*
        const req = ctx.request.body().value;
        const type = ctx.request.body().type;
        console.log("1");
        ctx.assert(type === "json" && req.email && req.password, 400);
        console.log("2");
        console.log(req.email, req.password);

        signInWithEmailAndPassword(auth, req.email, req.password)
            .then((creds) => {
                console.log("User Signed In");
                ctx.status = 200;
                ctx.response.body = {
                    success: true,
                    creds: creds
                };
            })
            .catch((error) => {
                console.log(error);
                ctx.status = 401;
            })
        */
    })

}

export default authRoute;