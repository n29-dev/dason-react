import * as Images from '../../images';
import ChatListItem from './chatListItem';

function ChatList({ chatList, itemClickHandler }) {
    return (
        <ul>
            {chatList.map((chatItem) => {
                const { displayName, uid } = chatItem;
                return (
                    <ChatListItem
                        photoUrl={Images.UserAvatar}
                        username={displayName}
                        clickHandler={() => {
                            itemClickHandler(uid);
                        }}
                        key={uid}
                    />
                );
            })}
        </ul>
    );
}

export default ChatList;
