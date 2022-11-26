import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

async function sendMessage(messageRoomPath, senderId, photoURL, body) {
    // message schema
    const messageDoc = {
        messageBody: body,
        senderId,
        photoURL,
        created: serverTimestamp(),
    };

    try {
        // send message and update last updated
        addDoc(collection(db, messageRoomPath, 'messages'), messageDoc);
        updateDoc(doc(db, messageRoomPath), {
            lastUpdated: serverTimestamp(),
        });
    } catch (error) {
        console.log(error);
    }
}

// eslint-disable-next-line import/prefer-default-export
export { sendMessage };
