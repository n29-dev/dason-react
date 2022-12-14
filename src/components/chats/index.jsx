/* eslint-disable react/jsx-no-bind */
import { faEllipsis, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { batch, useDispatch, useSelector } from 'react-redux';
import { toggleChatsTab } from '../../features/chatsTab/chatsTabSlice';
import { setCurrentActiveChat, setCurrentActiveChatMessage } from '../../features/users/usersSlice';
import useDropdownToggle from '../../hooks/useDropdownToggle';
import { setCookie } from '../../lib/cookie';
import Layout from '../partials/layout';
import ChatBox from './chatBox';
import ChatList from './chatList';

function Chats() {
    const [optionDropdown, setOptionDropdown, optionDropdownRef] = useDropdownToggle(false, {
        outClickClose: true,
    });

    const dispatch = useDispatch();

    // tab state
    // const [activeTab, setActiveTab] = useState('chat');
    const { open: activeTab } = useSelector((store) => store.chatsTab);

    const { currentUser, contacts, peers } = useSelector((store) => store.users);
    const { messages } = useSelector((store) => store);
    const { displayName, uid, photoURL } = currentUser;

    // create new peer from contact
    function chatItemHandler(userId) {
        batch(() => {
            dispatch(setCurrentActiveChat(userId));
            dispatch(setCurrentActiveChatMessage(messages[userId]));
        });
        setCookie({ name: 'activeChatUser', value: userId, expires: 10 });
    }

    return (
        <Layout>
            <div>
                {/* breadcrumbs / title */}
                <div className="flex justify-between items-center mb-5 col-start-1 col-end-3">
                    <h1 className="text-[18px] font-semibold text-dark-500"> Chats</h1>
                    <ul className="breadcrumb flex gap-3">
                        <li className="text-[13px] text-dark-500">Dashboard</li>
                        <li className="text-[13px] text-dark-400">Chats</li>
                    </ul>
                </div>
                <div className="grid grid-cols-[30%,_70%] gap-2 h-full">
                    <div className="component-default p-0 h-[calc(100vh_-_145px)]">
                        <div className="px-6 py-4 flex justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    <img className="block w-12 h-12 rounded-full" src={photoURL} alt="" />
                                </div>
                                <div>
                                    <h5 className="text-[16px] font-medium text-dark-600 flex items-center gap-[6px]">
                                        <span>{displayName}</span>
                                        <span
                                            className="align-top w-[6px] h-[6px]
                                         bg-success inline-block rounded"
                                        ></span>
                                    </h5>
                                    <p>Available</p>
                                </div>
                            </div>
                            <div className="relative">
                                <button
                                    className="text-[16px] text-dark-400"
                                    type="button"
                                    onClick={setOptionDropdown.toggle}
                                >
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
                        <div className="border-t border-[#e9e9ef] p-4">
                            <div
                                className="h-[35px] flex items-center justify-between gap-3 
                            border border-[#e9e9ef] px-4"
                            >
                                <button className="text-[13px] text-dark-500 bg-transparent" type="button">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                                <input
                                    className="outline-none border-none bg-transparent text-dark-500
                             placeholder:text-dark-500 flex-1"
                                    type="text"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                        <div className="h-[calc(100%_-_132px)]">
                            <div className="bg-[#f4f5f8] p-1 flex">
                                <button
                                    className={`leading-[20px] py-2 flex-1 rounded-md ${
                                        activeTab === 'chat' ? 'bg-blue text-white' : 'bg-transparent text-dark-500'
                                    }`}
                                    type="button"
                                    onClick={() => {
                                        dispatch(toggleChatsTab('chat'));
                                    }}
                                >
                                    Chat
                                </button>
                                <button
                                    type="button"
                                    className={`leading-[20px] py-2 flex-1 rounded-md ${
                                        activeTab === 'contact' ? 'bg-blue text-white' : 'bg-transparent text-dark-500'
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleChatsTab('contact'));
                                    }}
                                >
                                    Contact
                                </button>
                            </div>
                            <div
                                className={`h-[calc(100%_-_40px)] overflow-x-hidden overflow-y-scroll ${
                                    activeTab === 'chat' ? '' : 'hidden'
                                }`}
                            >
                                <ChatList chatList={peers} currentUserId={uid} itemClickHandler={chatItemHandler} />
                            </div>
                            <div
                                className={`h-[calc(100%_-_40px)] overflow-x-hidden overflow-y-scroll ${
                                    activeTab === 'contact' ? '' : 'hidden'
                                }`}
                            >
                                <ChatList chatList={contacts} currentUserId={uid} itemClickHandler={chatItemHandler} />
                            </div>
                        </div>
                    </div>
                    <div className="component-default p-0 h-[calc(100vh_-_145px)]">
                        <ChatBox />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Chats;
