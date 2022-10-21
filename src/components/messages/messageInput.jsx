import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const MessageInput = React.forwardRef(({ onSend, disabled }, ref) => (
    <div className="px-5 flex items-center gap-5">
        <input
            className="px-3 py-3 border border-[#e9e9ef] outline-0 bg-[rgba(233,_233,_239,_.4)] text-dark-500
                 placeholder:text-dark-500 rounded min-w-[230px] flex-1"
            type="text"
            placeholder="Enter your message"
            ref={ref}
        />
        <button
            className="py-3 pl-8 text-[13px] text-right text-white bg-blue inline-block rounded"
            type="button"
            onClick={onSend}
            disabled={disabled}
        >
            Send
            <span className="inline-block mx-5">
                <FontAwesomeIcon icon={faPaperPlane} />
            </span>
        </button>
    </div>
));

export default MessageInput;
