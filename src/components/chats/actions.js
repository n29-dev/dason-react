/* eslint-disable no-shadow */
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

// function for getting all docs from a collection
async function getAllDocs(colRef) {
    const querySnapshot = await getDocs(colRef);

    return querySnapshot.docs.map((doc) => doc.data());
}

// function create peer
async function createPeer(currentUserId, peerUserId) {
    // update user peers
    async function updateUserPeers(userId, peerId, messageRoomPath) {
        // get user doc
        const userDocRef = doc(db, 'users', `${userId}`);
        let userDoc = await getDoc(userDocRef);
        userDoc = userDoc.data();

        // update user doc with new peer data
        updateDoc(userDocRef, {
            peers: [{ peerId, messageRoomPath }, ...userDoc.peers],
        });
    }

    // top level variable for storing messageId
    const messageRoom = doc(collection(db, 'messages'));

    try {
        // create new chat room for storing peer chats
        await setDoc(messageRoom, {
            lastUpdated: serverTimestamp(),
        });

        updateUserPeers(currentUserId, peerUserId, messageRoom.path);
        updateUserPeers(peerUserId, currentUserId, messageRoom.path);
        // console log erros
    } catch (error) {
        console.log(error);
    }

    return messageRoom.path;
}

export { getAllDocs, createPeer };
