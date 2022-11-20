/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-bind */
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import useDropdownToggle from '../../hooks/useDropdownToggle';
import useSendMessage from '../../hooks/useSendMessage';
import * as Images from '../../images';
import MessagesLoader from '../messages/loader';
import MessageInput from '../messages/messageInput';
import MessageList from '../messages/messageList';

function ChatBox() {
    const [optionDropdown, setOptionDropdown, optionDropdownRef] = useDropdownToggle(false, {
        outClickClose: true,
    });

    const { currentUser, currentActiveChat } = useSelector((store) => store.users);

    const {
        displayName: activeChatDisplayName,
        uid: currentActiveChatId,
        messages: activeChatMessages,
        photoURL,
    } = currentActiveChat;

    const { loading } = useSelector((store) => store.messages);

    const { displayName: currentUserDisplayName, uid: currentUserId } = currentUser;

    // send message
    const messageInputRef = useRef();

    const sendMessage = useSendMessage(messageInputRef);

    return (
        <div className="h-full relative">
            <div className="px-6 py-4 flex justify-between border-b border-[#e9e9ef]">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                        <img className="block w-12 h-12 rounded-full" src={photoURL || Images.UserAvatar} alt="" />
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
                {loading ? (
                    <MessagesLoader times={Array(7).fill('a')} />
                ) : (
                    <>
                        {activeChatMessages?.length ? (
                            <MessageList msglist={activeChatMessages} currentUserId={currentUserId} />
                        ) : (
                            <div className="pb-[80px] h-full flex items-center justify-center">
                                <div>
                                    <div className="w-[200px] h-auto mb-[15px]">
                                        <img src={Images.sendFriendsMessageIlus} alt="" />
                                    </div>
                                    <h2 className="text-[15px] text-dark-500">
                                        Say Hi to {activeChatDisplayName || 'your friends'}{' '}
                                        <span className="shake">✋</span>
                                    </h2>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="absolute bottom-0 w-full pb-[20px] bg-[#fff]">
                <MessageInput
                    onSubmit={(event) => {
                        event.preventDefault();
                        sendMessage();
                    }}
                    ref={messageInputRef}
                    disabled={currentActiveChatId === currentUserId}
                />
            </div>
        </div>
    );
}

export default ChatBox;
