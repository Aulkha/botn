// Import Firebase
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const authRoute = (router, auth) => {
    
    router.post("/signin", (ctx) => {
        const req = new Map(ctx.request.body);
        ctx.assert(req || req.email || req.password, 400);

        signInWithEmailAndPassword(auth, req.email, req.password)
            .then((creds) => {
                ctx.status = 200;
                ctx.response.body = {
                    success: true,
                    creds: creds
                };
            })
            .catch((error) => {
                ctx.status = 401;
                ctx.response.body = {
                    success: false,
                    error: error
                };
            })
    })

}

export default authRoute;