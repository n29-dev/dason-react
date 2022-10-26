import { getDocs } from 'firebase/firestore';

// function for getting all docs from a collection
async function getAllDocs(colRef) {
    let querySnapshot;
    try {
        querySnapshot = await getDocs(colRef);
    } catch (error) {
        console.log(error);
    }

    return querySnapshot.docs.map((doc) => doc.data());
}

export { getAllDocs };
