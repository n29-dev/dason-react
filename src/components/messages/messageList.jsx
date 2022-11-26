/* eslint-disable import/no-unresolved */
import CustomterAvatar1 from 'Images/users/avatar-2.jpg';
import Message from './message';

function MessageList({ msglist, currentUserId }) {
    return (
        <div>
            <ul className="px-4">
                {msglist.map((msg) => {
                    const { senderId, messageBody, created, photoURL } = msg;
                    const date = new Date(created * 1000);

                    return (
                        <Message
                            photo={photoURL || CustomterAvatar1}
                            messageBody={messageBody}
                            recieved={currentUserId !== senderId}
                            created={date.toDateString()}
                            key={Math.random() * Math.random()}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default MessageList;
