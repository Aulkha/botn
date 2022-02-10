// Import Firebase
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

const territory = (router, db) => {

    router.get("/map", async (ctx) => {
        const querySnapshot = await getDocs(collection(db, "territory"));
        const response = new Map();
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            response.set(doc.id, {
                name: docData.name,
                occupant: doc.occupant
            });
        });
        console.log(response);
        ctx.response.body = response;
    })

};

export default territory;