// Import Firebase
import { getDocs, collection, doc, getDoc, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

// Import Modules
import { error, getReq } from "../modules/server-module.js";

const territory = (router, db) => {

    router.post("/", async (ctx) => {
        const req = await getReq(ctx);

        try {
            const addedDoc = await addDoc(collection(db, "territory"), {
                name: req.name,
                occupant: req.occupant,
                gameLink: req.gameLink,
                currentBattle: null
            })

            ctx.response.body = { "success": true, "doc": addedDoc };
        } catch (err){
            error(ctx, err);
        }
    })

    router.get("/map", async (ctx) => {
        const querySnapshot = await getDocs(collection(db, "territory"));
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
        const querySnapshot = await getDoc(doc(db, "territory", ctx?.params?.id));
        const document = querySnapshot.data();
        const res = document;

        if (document.currentBattle !== null) {
            const currentBattleDoc = await getDoc(document.currentBattle);
            res.currentBattle = currentBattleDoc.data();
        }

        ctx.response.body = res;
    })
    router.patch("/:id", async (ctx) => {
        const req = await getReq(ctx);

        try {
            const updatedDoc = await updateDoc(await doc(db, "territory", ctx?.params?.id), req);
            ctx.response.body = { "success": true, "doc": updatedDoc };
        } catch (err){
            error(ctx, err);
        }
    })

};

export default territory;