/* eslint-disable no-shadow */
import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

// function create peer
async function createPeer(currentUserId, peerUserId) {
    // update user peers
    async function updateUserPeers(userId, peerId, messageRoomPath) {
        // get user doc
        const userDocRef = doc(db, 'users', `${userId}`);
        try {
            let userDoc = await getDoc(userDocRef);
            userDoc = userDoc.data();

            // update user doc with new peer data
            updateDoc(userDocRef, {
                peers: [{ peerId, messageRoomPath }, ...userDoc.peers],
            });
        } catch (error) {
            console.log(error);
        }
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

export { createPeer };
