import { collection, doc, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPeerMessageList } from '../features/messages/messagesSlice';
import { setCurrentActiveChatMessage, setCurrentUserPeers, setPeersAndContacts } from '../features/users/usersSlice';
import { db } from '../firebase';

function MessageObserver({ children }) {
    const dispatch = useDispatch();

    const { currentUser, currentActiveChat } = useSelector((store) => store.users);
    const { uid: currentUserId, peers: currentUserPeers } = currentUser;
    console.log(currentUserPeers);
    const { uid: currentActiveChatId } = currentActiveChat;

    // fetch peer messages
    async function getPeerMessages(peer) {
        const messagesRef = collection(db, peer.messageRoomPath, 'messages');
        const q = query(messagesRef, orderBy('created', 'desc'), limit(15));

        try {
            const messageQuery = await getDocs(q);
            // if any docs exist
            if (messageQuery.docs.length > 0) {
                const peerMessages = messageQuery.docs.map((messageDoc) => {
                    const message = messageDoc.data();

                    return {
                        created: message.created?.seconds || new Date().getSeconds(),
                        messageBody: message.messageBody,
                        senderId: message.senderId,
                    };
                });

                peerMessages.reverse();
                dispatch(setPeerMessageList({ peerId: peer.peerId, messageList: peerMessages }));

                // set current active chat messages
                if (currentActiveChatId && peer.peerId === currentActiveChatId) {
                    dispatch(setCurrentActiveChatMessage(peerMessages));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    function observeMessageRooms(currentUserPeers) {
        currentUserPeers.map((peer) =>
            onSnapshot(doc(db, peer.messageRoomPath), () => {
                getPeerMessages(peer);
            })
        );
    }

    // listen for changes on current user document
    useEffect(() => {
        const unSubs = onSnapshot(doc(db, 'users', `${currentUserId}`), (doc) => {
            const updatedUser = doc.data();

            if (updatedUser.peers.length !== currentUserPeers.length) {
                setCurrentUserPeers(updatedUser.peers);
                setPeersAndContacts();
                observeMessageRooms(updatedUser.peers);
            }
        });

        return unSubs;
    }, []);

    useEffect(() => {
        observeMessageRooms(currentUserPeers);
    }, []);

    return children;
}

export default MessageObserver;
