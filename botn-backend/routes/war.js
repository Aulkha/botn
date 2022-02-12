// Import Firebase
import { getDocs, collection, doc, getDoc, setDoc,  addDoc, updateDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

// Import Modules
import { error, getReq } from "../modules/server-module.js";

const war = (router, db) => {

    router.get("/", async (ctx) => {
        const querySnapshot = await getDocs(collection(db, "war"));
        const res = {};
        querySnapshot.forEach((document) => {
            res[document.id] = document.data();
        })

        ctx.response.body = { "success": true, "doc": res };
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

            const addWarToNation = async (nation) => {
                await setDoc(doc(db, "nation", nation, "wars", addedDoc.id), {
                    name: req.name,
                    belligerents: req.belligerents,
                    ongoing: true
                });
            }
            req.belligerents.aggressors.forEach(addWarToNation);
            req.belligerents.defenders.forEach(addWarToNation);
        } catch (err) {
            error(ctx, err);
        }
    });

}

export default war;