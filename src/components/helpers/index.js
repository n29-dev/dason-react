import { getDocs } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';

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

// function for uploading files
async function uploadFile(filePath, file) {
    const fileRef = ref(storage, filePath);
    let uploadResult;

    try {
        uploadResult = await uploadBytes(fileRef, file);
    } catch (error) {
        console.log(error);
    }

    return uploadResult;
}

export { getAllDocs, uploadFile };
