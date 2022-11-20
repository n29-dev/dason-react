import ChatListItem from './chatListItem';

function ChatList({ chatList, itemClickHandler }) {
    return (
        <ul>
            {chatList.map((chatItem) => {
                const { displayName, uid, photoURL } = chatItem;
                return (
                    <ChatListItem
                        photoUrl={photoURL}
                        username={displayName}
                        clickHandler={() => {
                            itemClickHandler(uid);
                        }}
                        key={uid}
                        uid={uid}
                    />
                );
            })}
        </ul>
    );
}

export default ChatList;
