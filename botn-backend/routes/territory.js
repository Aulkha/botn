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
        const res = {};
        querySnapshot.forEach((document) => {
            const docData = document.data();
            res[document.id] = {
                "name": docData.name,
                "occupant": docData.occupant
            };
        });
        console.log(res);
        ctx.response.body = res;
    })

    router.get("/:id", async (ctx) => {
        const querySnapshot = await getDoc(await doc(db, "territory", ctx?.params?.id));
        const document = querySnapshot.data();
        const res = document;
        console.log(document);
        if (document.currentBattle && document.currentBattle !== null) {
            console.log(res.currentBattle);
            console.log(document.currentBattle.data());
            res.currentBattle = document.currentBattle.data();
        }

        ctx.response.body = res;
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