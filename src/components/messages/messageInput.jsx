import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useDropdownToggle from '../../hooks/useDropdownToggle';

const MessageInput = React.forwardRef(({ onSubmit, disabled }, ref) => {
    const [optionDropdown, setOptionDropdown, optionDropdownRef] = useDropdownToggle(false, {
        outClickClose: true,
    });

    const emojis = [
        '😀',
        '😄',
        '😁',
        '😆',
        '😅',
        '🤣',
        '😂',
        '🙂',
        '🙃',
        '🫠',
        '😉',
        '😊',
        '😇',
        '🥰',
        '🤩',
        '🤑',
        '😜',
        '😋',
        '🤐',
        '🤐',
    ];

    function addEmoji(emoji) {
        ref.current.value += emoji;
    }

    return (
        <form className="px-5 flex items-center gap-3" onSubmit={onSubmit}>
            <input
                className="px-3 py-3 border border-[#e9e9ef] outline-0 bg-[rgba(233,_233,_239,_.4)] text-dark-500
                 placeholder:text-dark-500 rounded min-w-[230px] flex-1"
                type="text"
                placeholder="Enter your message"
                ref={ref}
            />

            <div className="h-[40px] relative">
                <button
                    className="bg-white-500 px-3 text-[16px] block leading-[40px] rounded text-dark-400"
                    type="button"
                    onClick={setOptionDropdown.toggle}
                >
                    <FontAwesomeIcon icon={faFaceSmile} />
                </button>
                <div
                    className={`dropdown top-auto bottom-[calc(100%_+_10px)] min-w-[160px] 
                    ${optionDropdown ? 'active' : ''}`}
                    ref={optionDropdownRef}
                >
                    <div className="grid grid-cols-4">
                        {emojis.map((emoji) => (
                            <span
                                className="inline-block h-[40px] text-center text-[20px] 
                            leading-[40px] hover:bg-white-500 cursor-pointer"
                                onClick={() => {
                                    addEmoji(emoji);
                                }}
                            >
                                {emoji}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

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
    );
});

export default MessageInput;
