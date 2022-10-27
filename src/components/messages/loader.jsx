/* eslint-disable react/destructuring-assignment */
import React from 'react';

function MessageSkeleton({ index, classes }) {
    const recieved = index % 2 === 0;
    return (
        <li className={`${classes || 'pb-2'}`}>
            <div className={`msg flex gap-3 ${recieved ? 'flex-row-reverse' : ''}`}>
                <div
                    className="flex-shrink-0 w-[32px] h-[32px] rounded-full
                 overflow-hidden bg-gray-200 skeleton"
                ></div>
                <div
                    className={`basis-[60%] flex gap-3 relative skeleton ${
                        recieved ? 'flex-row-reverse received mr-3' : 'ml-3'
                    }`}
                >
                    <div className="rounded-xl p-3 bg-gray-200 skeleton">
                        <p className="h-[20px] bg-gray-200 w-[150px]"></p>
                    </div>
                </div>
            </div>
        </li>
    );
}

function MessagesLoader({ messages, classes }) {
    return (
        <ul>
            {messages.map((el, index) => (
                <MessageSkeleton index={index} classes={classes} key={Math.random() * Math.random()} />
            ))}
        </ul>
    );
}

export default MessagesLoader;
