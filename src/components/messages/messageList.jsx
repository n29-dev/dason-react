/* eslint-disable import/no-unresolved */
import CustomterAvatar1 from 'Images/users/avatar-2.jpg';
import Message from './message';

function MessageList({ msglist, currentUserId }) {
    return (
        <div>
            <ul className="px-4">
                {msglist.map((msg) => {
                    const { senderId, messageBody, created } = msg;
                    return (
                        <Message
                            photo={CustomterAvatar1}
                            messageBody={messageBody}
                            recieved={currentUserId !== senderId}
                            created={created}
                            key={Math.random() * Math.random()}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default MessageList;
