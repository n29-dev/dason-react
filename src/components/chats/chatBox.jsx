/* eslint-disable react/jsx-no-bind */
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact, setCurrentActiveChatMessageRoomPath } from '../../features/users/usersSlice';
import useDropdownToggle from '../../hooks/useDropdownToggle';
import * as Images from '../../images';
import { sendMessage } from '../messages/actions';
import MessageInput from '../messages/messageInput';
import MessageList from '../messages/messageList';
import { createPeer } from './actions';

function ChatBox() {
    const [optionDropdown, setOptionDropdown, optionDropdownRef] = useDropdownToggle(false, {
        outClickClose: true,
    });
    const dispatch = useDispatch();

    const { currentUser, currentActiveChat } = useSelector((store) => store.users);

    const {
        displayName: activeChatDisplayName,
        uid: currentActiveChatId,
        messages: activeChatMessages,
        messageRoomPath,
    } = currentActiveChat;

    const { displayName: currentUserDisplayName, uid: currentUserId } = currentUser;

    // send message
    const messageInputRef = useRef();

    // if current active chat is not peer
    async function sendUserMessage(event) {
        event.preventDefault();

        const messageBody = messageInputRef.current.value;
        // if messageBody only contains space return
        if (messageBody.trim() === '') {
            console.log(messageBody);
            return;
        }

        if (messageRoomPath) {
            sendMessage(messageRoomPath, currentUserId, messageBody);
        } else {
            const messageRoomPath = await createPeer(currentUserId, currentActiveChatId);
            setCurrentActiveChatMessageRoomPath(messageRoomPath);

            sendMessage(messageRoomPath, currentUserId, messageBody);
            // set message list for current active chat
            dispatch(removeContact(currentActiveChatId));
        }

        messageInputRef.current.value = '';
    }

    return (
        <div className="h-full relative">
            <div className="px-6 py-4 flex justify-between border-b border-[#e9e9ef]">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                        <img className="block w-12 h-12 rounded-full" src={Images.UserAvatar} alt="" />
                    </div>
                    <div>
                        <h5 className="text-[16px] font-medium text-dark-600 flex items-center gap-[6px]">
                            <span>{activeChatDisplayName || currentUserDisplayName}</span>
                            <span
                                className="align-top w-[6px] h-[6px]
                 bg-success inline-block rounded"
                            ></span>
                        </h5>
                        <p>Available</p>
                    </div>
                </div>
                <div className="relative">
                    <button className="text-[16px] text-dark-400" type="button" onClick={setOptionDropdown.toggle}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                    <div className={`dropdown ${optionDropdown ? 'active' : ''}`} ref={optionDropdownRef}>
                        <ul>
                            <li>
                                <button className="dropdown-item" type="button">
                                    Profile
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    Edit
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    Add Contact
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    Setting
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="h-[calc(100%_-_71px)] overflow-x-hidden overflow-y-scroll pt-8">
                {activeChatMessages ? (
                    <MessageList msglist={activeChatMessages} currentUserId={currentUserId} />
                ) : (
                    <div className="pt-[100px] flex items-center justify-center">
                        <div>
                            <h2 className="text-[20px] text-dark-500">
                                Say Hi to your friends <span className="shake">✋</span>
                            </h2>
                        </div>
                    </div>
                )}
            </div>
            <div className="absolute bottom-0 w-full pb-[20px] bg-[#fff]">
                <MessageInput
                    onSubmit={(event) => {
                        sendUserMessage(event);
                    }}
                    ref={messageInputRef}
                    disabled={currentActiveChatId === currentUserId}
                />
            </div>
        </div>
    );
}

export default ChatBox;
