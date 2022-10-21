import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDropdownToggle from '../../hooks/useDropdownToggle';

function Message({ photo, messageBody, recieved, created }) {
    const [optionDropdown, setOptionDropdown, optionDropdownRef] = useDropdownToggle(false, {
        outClickClose: true,
    });

    return (
        <li className="pb-12">
            <div className={`msg flex gap-3 ${recieved ? 'flex-row-reverse' : ''}`}>
                {/* img */}
                <div className="flex-shrink-0 w-[32px] h-[32px] rounded-full overflow-hidden">
                    <img className="w-full" src={photo} alt="user" />
                </div>
                {/* msg body */}
                <div
                    className={`basis-[60%] flex gap-3 relative msg-body ${
                        recieved ? 'flex-row-reverse received mr-3' : 'ml-3'
                    }`}
                >
                    <div className={`rounded-xl p-3 ${recieved ? 'bg-gray-300' : 'bg-blue'}`}>
                        <p className={`${recieved ? 'text-dark-500' : 'text-white'}`}>{messageBody}</p>
                    </div>
                    {/* options */}
                    <div className="relative">
                        <div className="relative">
                            <button
                                className="text-[16px] text-dark-400"
                                type="button"
                                onClick={setOptionDropdown.toggle}
                            >
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                            <div
                                className={`dropdown min-w-[100px] ${optionDropdown ? 'active' : ''}`}
                                ref={optionDropdownRef}
                            >
                                <ul>
                                    <li>
                                        <button className="dropdown-item" type="button">
                                            Copy
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" type="button">
                                            Save
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" type="button">
                                            Forward
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" type="button">
                                            Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`msg-date w-[max-content] ${recieved ? 'translate-x-[-100%]' : ''}`}>
                            <span className="text-[10px] text-dark-400">{created}</span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default Message;
