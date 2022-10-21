import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setContactList } from '../features/contacts/contactsSlice';
import { setCurrentUser } from '../features/currentUser/currentUserSlice';
import { setPeerMessageList } from '../features/messages/messagesSlice';
import { setPeersList } from '../features/peers/peersSlice';
import { db } from '../firebase';
import useFilterUsers from '../hooks/useFilterUsers';

function MessageObserver({ children }) {
    const dispatch = useDispatch();
    const filterUsers = useFilterUsers();

    const { currentUser, allUsers } = useSelector((store) => store);
    const { uid, peers: currentUserPeers } = currentUser;

    // filter users and peers
    function filterPeersAndContacts(currentUser, allUsers) {
        const [peerList, contactList] = filterUsers(currentUser, allUsers);
        dispatch(setContactList(contactList));
        dispatch(setPeersList(peerList));
    }

    // fetch peer messages
    async function getPeerMessages(peer) {
        const messagesRef = collection(db, peer.messageRoomPath, 'messages');
        // const q = query(messagesRef, orderBy('desc'), limit(15));

        try {
            const messageQuery = await getDocs(messagesRef);
            // if any docs exist
            if (messageQuery.docs.length > 0) {
                const peerMessages = messageQuery.docs.map((messageDoc) => {
                    const message = messageDoc.data();
                    console.log(message);

                    return {
                        created: message.created?.seconds || new Date().getSeconds(),
                        messageBody: message.messageBody,
                        messageSenderId: message.messageSenderId,
                    };
                });

                dispatch(setPeerMessageList({ peerId: peer.peerId, messageList: peerMessages }));
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

    // listen for changes on user document
    useEffect(() => {
        const unSubs = onSnapshot(doc(db, 'users', `${uid}`), (doc) => {
            const updatedUser = doc.data();

            if (updatedUser.peers.length !== currentUserPeers.length) {
                setCurrentUser({ peers: updatedUser.peers });
                filterPeersAndContacts(updatedUser, allUsers);
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
