/* eslint-disable import/no-unresolved */
import { faBell, faClock, faMoon } from '@fortawesome/free-regular-svg-icons';
import {
    faAngleDown,
    faArrowRight,
    faBars,
    faGear,
    faLock,
    faMagnifyingGlass,
    faRightFromBracket,
    // eslint-disable-next-line prettier/prettier
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gitBucket from 'Images/brands/bitbucket.png';
import dribbleIcon from 'Images/brands/dribbble.png';
import dropBoxIcon from 'Images/brands/dropbox.png';
import githubIcon from 'Images/brands/github.png';
import mailchimpIcon from 'Images/brands/mail_chimp.png';
import slackIcon from 'Images/brands/slack.png';
import germanFlag from 'Images/flags/germany.jpg';
import italianFlag from 'Images/flags/italy.jpg';
import russianFlag from 'Images/flags/russia.jpg';
import spainFlag from 'Images/flags/spain.jpg';
import usFlag from 'Images/flags/us.jpg';
import GridIcon from 'Images/grid-icon.svg';
import Logo from 'Images/logo-sm.svg';
import UserAvatar from 'Images/users/avatar-1.jpg';
import userAvatar3 from 'Images/users/avatar-3.jpg';
import useToggle from '../../hooks/useToggle';

function Header() {
    const [languageDropdown, setLanguageDropdown] = useToggle();
    const [appsDropdown, setAppsDropdown] = useToggle();
    const [notificationDropdown, setNotificationDropdown] = useToggle();
    const [profileDropdown, setProfileDropdown] = useToggle();
    return (
        <header className="px-6 bg-blue col-start-1 col-end-3 shadow-[0_0.2rem_0.5rem_rgba(18,_38,_63,_.3)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-20">
                    <div>
                        <a className="inline-flex items-center gap-[5px] text-white h-[70px]" href="#">
                            <span className="w-6 h-6 inline-block">
                                <Logo />
                            </span>
                            <span className="font-bold text-lg uppercase">Dason</span>
                        </a>
                    </div>
                    <div>
                        <button className="p-2 text-white h-[70px]" type="button">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                    <div className="bg-[#f3f3f91a] h-10 w-[220px] relative py-1 pl-4 pr-8 rounded-md flex items-center">
                        <input
                            className="outline-none border-none bg-transparent text-white
                             placeholder:text-white font-normal w-full"
                            type="text"
                            placeholder="Search..."
                        />
                        <button
                            className="text-white bg-blue rounded-sm h-[34px]
                             w-[34px] text-[13px] absolute right-1 top-1"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="relative">
                        <button
                            className={`py-1 px-[10px] h-[70px] ${languageDropdown && 'bg-[#ffffff0d]'}`}
                            type="button"
                            onClick={setLanguageDropdown.toggle}
                        >
                            <img className="w-6 align-middle" src={usFlag} alt="" />
                        </button>
                        <div
                            className={`h-dropdown bg-white p-1 rounded min-w-[160px] 
                        absolute top-full shadow-[0_0.25rem_0.75rem_rgba(18,38,63,.08)] right-0
                        invisible opacity-0 translate-y-5 transition-all duration-200 ${languageDropdown && 'active'}`}
                        >
                            <ul>
                                <li className="px-4 py-1 hover:bg-white-400">
                                    <img className="w-[18px] inline-block mr-[6px]" src={usFlag} alt="" />
                                    <span className="text-[13px] text-[#2b3940]">USA</span>
                                </li>

                                <li className="px-4 py-1 hover:bg-white-400">
                                    <img className="w-[18px] inline-block mr-[6px]" src={germanFlag} alt="" />
                                    <span className="text-[13px] text-[#2b3940]">Germany</span>
                                </li>
                                <li className="px-4 py-1 hover:bg-white-400">
                                    <img className="w-[18px] inline-block mr-[6px]" src={italianFlag} alt="" />
                                    <span className="text-[13px] text-[#2b3940]">Italy</span>
                                </li>
                                <li className="px-4 py-1 hover:bg-white-400">
                                    <img className="w-[18px] inline-block mr-[6px]" src={spainFlag} alt="" />
                                    <span className="text-[13px] text-[#2b3940]">Spain</span>
                                </li>
                                <li className="px-4 py-1 hover:bg-white-400">
                                    <img className="w-[18px] inline-block mr-[6px]" src={russianFlag} alt="" />
                                    <span className="text-[13px] text-[#2b3940]">Russia</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button className="py-1 px-[10px] h-[70px] text-white-500 text-xl" type="button">
                            <FontAwesomeIcon icon={faMoon} />
                        </button>
                    </div>
                    <div className="relative">
                        <button
                            className={`py-1 px-[10px] h-[70px] text-white-500 text-xl ${
                                appsDropdown && 'bg-[#ffffff0d]'
                            }`}
                            type="button"
                            onClick={setAppsDropdown.toggle}
                        >
                            <GridIcon />
                        </button>
                        <div
                            className={`h-dropdown bg-white p-1 rounded min-w-[310px] 
                        absolute top-full shadow-[0_0.25rem_0.75rem_rgba(18,38,63,.08)] right-0
                        invisible opacity-0 translate-y-5 transition-all duration-200 ${appsDropdown && 'active'}`}
                        >
                            <div className="grid grid-cols-3 p-2">
                                <div className="text-center py-4 hover:bg-[#f8f9fa]">
                                    <img className="h-6 mb-2 mx-auto" src={githubIcon} alt="" />
                                    <span className="text-[13px]">GitHub</span>
                                </div>
                                <div className="text-center py-4 hover:bg-[#f8f9fa]">
                                    <img className="h-6 mb-2 mx-auto" src={gitBucket} alt="" />
                                    <span className="text-[13px]">GitBucket</span>
                                </div>
                                <div className="text-center py-4 hover:bg-[#f8f9fa]">
                                    <img className="h-6 mb-2 mx-auto" src={dribbleIcon} alt="" />
                                    <span className="text-[13px]">Dribble</span>
                                </div>
                                <div className="text-center py-4 hover:bg-[#f8f9fa]">
                                    <img className="h-6 mb-2 mx-auto" src={dropBoxIcon} alt="" />
                                    <span className="text-[13px]">Dropbox</span>
                                </div>
                                <div className="text-center py-4 hover:bg-[#f8f9fa]">
                                    <img className="h-6 mb-2 mx-auto" src={mailchimpIcon} alt="" />
                                    <span className="text-[13px]">Mailchimp</span>
                                </div>
                                <div className="text-center py-4 hover:bg-[#f8f9fa]">
                                    <img className="h-6 mb-2 mx-auto" src={slackIcon} alt="" />
                                    <span className="text-[13px]">Slack</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <button
                            className={`py-1 px-[10px] h-[70px] text-white-500 text-xl ${
                                notificationDropdown && 'bg-[#ffffff0d]'
                            }`}
                            type="button"
                            onClick={setNotificationDropdown.toggle}
                        >
                            <FontAwesomeIcon icon={faBell} />
                        </button>
                        <div
                            className={`h-dropdown bg-white p-1 rounded min-w-[320px] 
                        absolute top-full shadow-[0_0.25rem_0.75rem_rgba(18,38,63,.08)] right-0
                        invisible opacity-0 translate-y-5 transition-all duration-200 ${
                            notificationDropdown && 'active'
                        }`}
                        >
                            <div>
                                <div className="flex items-center justify-between p-4">
                                    <p className="text-[13px] text-dark-500 font-semibold">Notifications</p>
                                    <span className="text-[11px] text-dark-300 underline">Unread (3)</span>
                                </div>
                                <div className="max-h-[230px] overflow-x-hidden overflow-y-scroll">
                                    <div className="flex items-start gap-4 px-4 py-3">
                                        <div>
                                            <img className="w-8 h-8 rounded-full" src={userAvatar3} alt="" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold mb-1 text-dark-500">James Lemire</p>
                                            <p className="text-[13px] mb-1 text-dark-300">
                                                It will seem like simplified English.
                                            </p>
                                            <p className="text-[13px] text-dark-300">
                                                <span className="inline-block mr-1">
                                                    <FontAwesomeIcon icon={faClock} />
                                                </span>
                                                1 hours ago
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 px-4 py-3">
                                        <div>
                                            <img className="w-8 h-8 rounded-full" src={userAvatar3} alt="" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold mb-1 text-dark-500">James Lemire</p>
                                            <p className="text-[13px] mb-1 text-dark-300">
                                                It will seem like simplified English.
                                            </p>
                                            <p className="text-[13px] text-dark-300">
                                                <span className="inline-block mr-1">
                                                    <FontAwesomeIcon icon={faClock} />
                                                </span>
                                                1 hours ago
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 px-4 py-3">
                                        <div>
                                            <img className="w-8 h-8 rounded-full" src={userAvatar3} alt="" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold mb-1 text-dark-500">James Lemire</p>
                                            <p className="text-[13px] mb-1 text-dark-300">
                                                It will seem like simplified English.
                                            </p>
                                            <p className="text-[13px] text-dark-300">
                                                <span className="inline-block mr-1">
                                                    <FontAwesomeIcon icon={faClock} />
                                                </span>
                                                1 hours ago
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 px-4 py-3">
                                        <div>
                                            <img className="w-8 h-8 rounded-full" src={userAvatar3} alt="" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold mb-1 text-dark-500">James Lemire</p>
                                            <p className="text-[13px] mb-1 text-dark-300">
                                                It will seem like simplified English.
                                            </p>
                                            <p className="text-[13px] text-dark-300">
                                                <span className="inline-block mr-1">
                                                    <FontAwesomeIcon icon={faClock} />
                                                </span>
                                                1 hours ago
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 px-4 py-3">
                                        <div>
                                            <img className="w-8 h-8 rounded-full" src={userAvatar3} alt="" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold mb-1 text-dark-500">James Lemire</p>
                                            <p className="text-[13px] mb-1 text-dark-300">
                                                It will seem like simplified English.
                                            </p>
                                            <p className="text-[13px] text-dark-300">
                                                <span className="inline-block mr-1">
                                                    <FontAwesomeIcon icon={faClock} />
                                                </span>
                                                1 hours ago
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="text-blue text-[14px] p-3" type="button">
                                        View More
                                        <span className="inline-block ml-1">
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="py-1 px-[10px] h-[70px] text-white-500 text-xl" type="button">
                            <FontAwesomeIcon icon={faGear} />
                        </button>
                    </div>
                    <div className="dropdown relative">
                        <button
                            className="flex items-center bg-[#ffffff0a] p-3 border-l-2 border-r-2 
                            border-[#ffffff40] gap-2 text-white-500 h-[70px]"
                            type="button"
                            onClick={setProfileDropdown.toggle}
                        >
                            <img className="w-9 h-9 rounded-full border-2 border-[#ffffff40]" src={UserAvatar} alt="" />
                            <span>Paul K.</span>
                            <span>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                        </button>
                        <div
                            className={`h-dropdown bg-white p-1 rounded min-w-[160px] 
                        absolute top-full shadow-[0_0.25rem_0.75rem_rgba(18,38,63,.08)] right-0
                        invisible opacity-0 translate-y-5 transition-all duration-200 ${profileDropdown && 'active'}`}
                        >
                            <ul>
                                <li>
                                    <a className="block text-dark-600  px-4 py-2 hover:bg-white-300" href="#">
                                        <span className="text-[14px] inline-block mr-[6px] align-middle">
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                        <span className="text-[14px] text-dark-500 align-middle">Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="block text-dark-600  px-4 py-2 hover:bg-white-300 mb-1" href="#">
                                        <span className="text-[14px] inline-block mr-[6px] align-middle">
                                            <FontAwesomeIcon icon={faLock} />
                                        </span>
                                        <span className="text-[14px] text-dark-500 align-middle">Lock Screen</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="block text-dark-600  px-4 py-3
                                         hover:bg-white-300 mt-1 border-t border-[#e9e9ef]"
                                        href="#"
                                    >
                                        <span className="text-[14px] inline-block mr-[6px] align-middle">
                                            <FontAwesomeIcon icon={faRightFromBracket} />
                                        </span>
                                        <span className="text-[14px] text-dark-500 align-middle">Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
