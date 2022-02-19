// Import Firebase
import { getDocs, collection, doc, getDoc, setDoc, addDoc, updateDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

// Import Modules
import { error, getReq } from "../modules/server-module.js";

const war = (router, db) => {

    router.get("/", async (ctx) => {
        const querySnapshot = await getDocs(collection(db, "war"));
        const res = {};

        querySnapshot.forEach((document) => {
            res[document.id] = document.data();
        })

        ctx.response.body = res;
    });
    router.post("/", async (ctx) => {
        const req = await getReq(ctx);

        try {
            const addedDoc = await addDoc(collection(db, "war"), {
                name: req.name,
                belligerents: req.belligerents,
                ongoing: true,
                score: {
                    aggressors: 0,
                    defenders: 0
                },
                time: {
                    start: Timestamp.now(),
                    end: null
                },
                victor: null
            });

            const addedDocID = addDoc.id;
            const addWarToNation = async (nation) => {
                await setDoc(doc(db, "nation", nation, "wars", addedDocID), {
                    name: req.name,
                    belligerents: req.belligerents,
                    ongoing: true
                });
            };
            req.belligerents.aggressors.forEach(addWarToNation);
            req.belligerents.defenders.forEach(addWarToNation);

            ctx.response.body = { "success": true, "doc": addedDoc };
        } catch (err) {
            error(ctx, err);
        }
    });

    router.get("/:id", async (ctx) => {
        try {
            const querySnapshot = await getDoc(doc(db, "wars", ctx?.params?.id))
            const document = querySnapshot.data();

            ctx.response.body = { document };
        } catch (err){
            error(ctx, err);
        }
    });
    router.patch("/:id", async (ctx) => {
        const req = await getReq(ctx);
        const id = ctx?.params?.id;

        try {
            const docRef = doc(db, "war", id);
            await updateDoc(docRef, req);

            if (req.name || req.belligerents || req.ongoing) {
                const document = await getDoc(docRef).data()
                const updateWarToNation = async (nation) => {
                    await updateDoc(doc(db, "nation", nation, id), {
                        name: document.name,
                        belligerents: document.belligerents,
                        ongoing: document.ongoing
                    });
                };
                document.belligerents.aggressors.forEach(updateWarToNation);
                document.belligerents.defenders.forEach(updateWarToNation);
            }

            ctx.response.body = { "success": true, "doc": document };
        } catch (err){
            error(ctx, err);
        }
    });


    router.get("/:id/battle", async (ctx) => {
        try {
            const querySnapshot = await getDocs(collection(db, "war", ctx?.params?.id, "battle"));
            const res = {};

            querySnapshot.forEach((document) => {
                res[document.id] = document.data();
            });

            ctx.response.body = res;
        } catch (err){
            error(ctx, err);
        }
    });
    /*
    router.post("/:id/battle", async (ctx) => {
        const req = await getReq(ctx);

        try {
            const addedDoc = await setDoc()
        } catch (err){
            error(ctx, err);
        }
    });*/

}

export default war;