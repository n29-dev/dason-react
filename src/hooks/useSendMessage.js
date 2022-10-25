import { useDispatch, useSelector } from 'react-redux';
import { createPeer } from '../components/chats/actions';
import { sendMessage } from '../components/messages/actions';
import { removeContact, setCurrentActiveChatMessageRoomPath } from '../features/users/usersSlice';

function useSendMessage(messageInputRef) {
    const { currentActiveChat, currentUser } = useSelector((store) => store.users);
    const { uid: currentActiveChatId, messageRoomPath } = currentActiveChat;
    const { uid: currentUserId } = currentUser;
    const dispatch = useDispatch();

    // async function for sending messages
    const sendMessageFunc = async () => {
        const messageBody = messageInputRef.current.value;
        messageInputRef.current.value = '';

        if (messageBody.trim() === '') {
            return;
        }

        if (messageRoomPath) {
            sendMessage(messageRoomPath, currentUserId, messageBody);
        } else {
            const messageRoomPath = await createPeer(currentUserId, currentActiveChatId);
            setCurrentActiveChatMessageRoomPath(messageRoomPath);
            // remove contact
            dispatch(removeContact(currentActiveChatId));
            sendMessage(messageRoomPath, currentUserId, messageBody);
        }
    };

    return sendMessageFunc;
}

export default useSendMessage;
