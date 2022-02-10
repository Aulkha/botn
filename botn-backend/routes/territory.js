// Import Firebase
import { getDocs, collection, doc, getDoc, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

const error = (err, ctx) => {
    console.error(err);
    ctx.response.status = 400;
    ctx.response.body = { "message": err };
}

const territory = (router, db) => {

    router.post("/", async (ctx) => {
        const reqBody = await ctx.body();
        const req = await reqBody.value;
        ctx.assert(reqBody.type === "json", 400);

        try {
            const addedDoc = await addDoc(await collection(db, "territory"), {
                name: req.name,
                occupant: req.occupant,
                gameLink: req.gameLink,
                currentBattle: null
            })

            ctx.response.body = { addedDoc };
        } catch (err){
            error(err, ctx);
        }
    })

    router.get("/map", async (ctx) => {
        const querySnapshot = await getDocs(await collection(db, "territory"));
        const response = {};
        querySnapshot.forEach((document) => {
            const docData = document.data();
            response[document.id] = {
                "name": docData.name,
                "occupant": docData.occupant
            };
        });
        console.log(response);
        ctx.response.body = response;
    })

    router.get("/:id", async (ctx) => {
        const querySnapshot = await getDoc(await doc(db, "territory", ctx?.params?.id));
        const document = querySnapshot.data();
        if (document.currentBattle !== null) {
            document.currentBattle = document.currentBattle.data();
        }

        ctx.response.body = document;
    })
    router.patch("/:id", async (ctx) => {
        const reqBody = await ctx.body();
        const req = await reqBody.value;
        ctx.assert(reqBody.type === "json", 400);

        try {
            const updatedDoc = await updateDoc(await doc(db, "territory", ctx?.params?.id), req)
            ctx.response.body = { updatedDoc };
        } catch (err){
            error(err, ctx);
        }
    })

};

export default territory;