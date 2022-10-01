import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MenuItem({ text, Icon, children, badge, dropdownHandler }) {
    return (
        <li>
            <button
                className={`px-6 py-3 text-dark-400 flex items-center text-[13px] w-full
            relative hover:bg-white-400 hover:text-blue ${dropdownHandler?.get() && 'active'}`}
                type="button"
                onClick={dropdownHandler?.toggle || undefined}
            >
                {/* icon */}
                {Icon && (
                    <span className="inline-block w-[18px] mr-2 text-dark-400 text-[16px]">
                        <Icon />
                    </span>
                )}
                <span>{text}</span>
                {/* badge */}
                {badge && (
                    <span
                        className="bg-[#34c38f40] text-[10px] font-medium py-[2px] px-[6px] 
                text-[#34c38f] rounded-lg absolute right-6 top-[50%] translate-y-[-50%]"
                    >
                        {badge}
                    </span>
                )}
                {/* dropdown icon */}
                {dropdownHandler && (
                    <span className="absolute right-6 top-[50%] translate-y-[-50%]">
                        <FontAwesomeIcon icon={faAngleRight} />
                    </span>
                )}
            </button>
            {children}
        </li>
    );
}

export default MenuItem;
