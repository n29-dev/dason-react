import { useSelector } from 'react-redux';

function ChatListItem({ photoUrl, username, clickHandler, uid }) {
    const messages = useSelector((store) => store.messages[uid]);

    return (
        <li className="hover:cursor-pointer" onClick={clickHandler}>
            <div className="flex items-start gap-4 px-6 py-4 hover:bg-[#1c85ed12]">
                <div className="shrink-0 rounded-full relative">
                    <img className="w-10 h-10 block rounded-full" src={photoUrl} alt="" />
                    <span
                        className="w-[10px] h-[10px] inline-block bg-success rounded-full
                     absolute bottom-[3px] left-[-5px] border-[2px] border-[#fff]"
                    ></span>
                </div>
                <div>
                    <h5 className="text-dark-500 font-medium text-[14px] leading-[20px]">{username}</h5>
                    {messages ? <p>{messages[messages.length - 1].messageBody}</p> : <p>Say 'hi !' to your friend</p>}
                </div>
            </div>
        </li>
    );
}

export default ChatListItem;
