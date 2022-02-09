// Import Firebase
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

const territory = (router, db) => {

    router.get("/", async (ctx) => {
        const querySnapshot = await getDocs(collection(db, "territory"));
        const response = {};
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            const docObj = {
                "id": doc.id
            };
            Object.assign(docObj, doc.data);
            Object.assign(response, docObj)
        });
        ctx.response.body = response;
    })

};

export { territory };