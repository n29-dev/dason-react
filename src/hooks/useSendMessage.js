import { useDispatch, useSelector } from 'react-redux';
import { createPeer } from '../components/chats/helpers';
import { sendMessage } from '../components/messages/helpers';
import { toggleChatsTab } from '../features/chatsTab/chatsTabSlice';
import { removeContact, setCurrentActiveChatMessageRoomPath } from '../features/users/usersSlice';

function useSendMessage(messageInputRef) {
    const { currentActiveChat, currentUser } = useSelector((store) => store.users);
    const { uid: currentActiveChatId, messageRoomPath } = currentActiveChat;
    const { uid: currentUserId, photoURL } = currentUser;
    const dispatch = useDispatch();

    // async function for sending messages
    const sendMessageFunc = async () => {
        const messageBody = messageInputRef.current.value;
        messageInputRef.current.value = '';

        if (messageBody.trim() === '') {
            return;
        }

        if (messageRoomPath) {
            sendMessage(messageRoomPath, currentUserId, photoURL, messageBody);
        } else {
            const messageRoomPath = await createPeer(currentUserId, currentActiveChatId);
            setCurrentActiveChatMessageRoomPath(messageRoomPath);
            // remove contact
            dispatch(removeContact(currentActiveChatId));

            await sendMessage(messageRoomPath, currentUserId, photoURL, messageBody);
            dispatch(toggleChatsTab('chat'));
        }
    };

    return sendMessageFunc;
}

export default useSendMessage;
