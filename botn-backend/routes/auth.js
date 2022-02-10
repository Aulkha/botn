// Import Firebase
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const authRoute = (router, auth) => {
    
    router.post("/signin", (ctx) => {
        console.log("User Signing In");
        const req = ctx.request.body;
        console.log("1");
        ctx.assert(req || req.email || req.password, 400);
        console.log("2");

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
                ctx.response.body = {
                    success: false,
                    error: error
                };
            })
    })

}

export default authRoute;