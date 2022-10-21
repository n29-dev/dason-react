import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const MessageInput = React.forwardRef(({ onSubmit, disabled }, ref) => (
    <form className="px-5 flex items-center gap-5" onSubmit={onSubmit}>
        <input
            className="px-3 py-3 border border-[#e9e9ef] outline-0 bg-[rgba(233,_233,_239,_.4)] text-dark-500
                 placeholder:text-dark-500 rounded min-w-[230px] flex-1"
            type="text"
            placeholder="Enter your message"
            ref={ref}
        />
        <button
            className="py-3 pl-8 text-[13px] text-right text-white bg-blue inline-block rounded"
            type="submit"
            disabled={disabled}
        >
            Send
            <span className="inline-block mx-5">
                <FontAwesomeIcon icon={faPaperPlane} />
            </span>
        </button>
    </form>
));

export default MessageInput;
