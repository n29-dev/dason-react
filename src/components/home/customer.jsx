import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDropdownToggle from '../../hooks/useDropdownToggle';

function Customer({ name, img, email }) {
    const [optionDropdown, setOptionDropdown, optionDropdownRef] = useDropdownToggle(false, {
        outClickClose: true,
    });
    return (
        <div className="flex items-center gap-6 mb-6 px-[20px]">
            <div className="w-[48px] h-[48px] flex-shrink-0 rounded-full overflow-hidden">
                <img className="block" src={img} alt="user" />
            </div>
            <div className="flex-1 flex items-center justify-between">
                <div>
                    <h4 className="text-[15px] leading-[18px] font-medium text-dark-600 mb-1">{name}</h4>
                    <span>{email}</span>
                </div>
                <div className="relative">
                    <button className="text-[22px] text-dark-600" type="button" onClick={setOptionDropdown.toggle}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                    <div className={`dropdown ${optionDropdown ? 'active' : ''}`} ref={optionDropdownRef}>
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
            </div>
        </div>
    );
}

export default Customer;
