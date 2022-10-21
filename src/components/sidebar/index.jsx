/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-unresolved */
import { faComment, faEnvelope, faFileLines } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubmenuToggle from '../../hooks/useSubmenuToggle';
import * as Images from '../../images';
import Button from '../globals/helpers/button';
import MenuItem from './menuItems';
import SubMenu from './subMenu';

// dropdown buttons
let dropdownBtns = [];

// keeps only one dropdown open
function keepOneOpen(event) {
    const { x, y } = event;
    // eslint-disable-next-line no-unused-vars
    let clickedBtn;

    dropdownBtns.forEach((btn) => {
        const { left, right, bottom, top } = btn.getBoundingClientRect();
        if (x >= left && x <= right && y >= top && y <= bottom) {
            clickedBtn = btn;
        }
    });

    if (clickedBtn) {
        dropdownBtns.forEach((btn) => {
            if (!clickedBtn.isSameNode(btn) && btn.classList.contains('active')) {
                btn.click();
            }
        });
    }
}
// closes all dropdowns
function closeAll() {
    dropdownBtns.forEach((btn) => {
        if (btn.nextElementSibling.getAttribute('data-state') === 'visible') {
            btn.click();
        }
    });
}

function Sidebar({ open }) {
    const [appsDropdown, appsDropdownToggle] = useSubmenuToggle();
    const [chatsDropdown, chatsDropdownToggle] = useSubmenuToggle();
    const sidebarRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        dropdownBtns = sidebarRef.current.querySelectorAll('.dropdown-btn');
        sidebarRef.current.addEventListener('click', keepOneOpen);
    }, []);

    return (
        <aside
            className={`shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_.1)] z-10 col-start-1 col-end-2 ${
                open ? 'overflow-x-hidden overflow-y-scroll' : ''
            }`}
        >
            <div
                className="w-[250px] pt-[10px] pb-[30px]"
                ref={sidebarRef}
                id="sidebar"
                data-state={open ? 'open' : 'collapsed'}
            >
                <div>
                    <div>
                        <h3 className="text-[12px] text-dark-500 py-4 px-5 font-medium menu-catagory-title">Menu</h3>
                        <ul className="menu-items">
                            <MenuItem
                                Icon={Images.houseIcon}
                                text="Dashboard"
                                badge="9+"
                                navigateHandler={() => {
                                    navigate('/');
                                }}
                            />
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[12px] text-dark-500 py-4 px-5 font-medium menu-catagory-title">Apps</h3>
                        <ul className="menu-items">
                            <MenuItem
                                Icon={Images.cartIcon}
                                text="Ecommerce"
                                dropdownHandler={open ? appsDropdownToggle : null}
                            >
                                <SubMenu toggle={appsDropdown}>
                                    <MenuItem text="Products" />
                                    <MenuItem text="Product Detail" />
                                    <MenuItem text="Order" />
                                    <MenuItem text="Customer" />
                                    <MenuItem text="Cart" />
                                    <MenuItem text="Checkout" />
                                    <MenuItem text="Shop" />
                                    <MenuItem text="Add Product" />
                                    <MenuItem text="Seller" />
                                    <MenuItem text="Seller Details" />
                                </SubMenu>
                            </MenuItem>
                            <MenuItem
                                Icon={() => <FontAwesomeIcon icon={faComment} />}
                                text="Chat"
                                navigateHandler={() => {
                                    navigate('/chats');
                                }}
                            />
                            <MenuItem
                                Icon={() => <FontAwesomeIcon icon={faEnvelope} />}
                                text="Email"
                                dropdownHandler={open ? chatsDropdownToggle : null}
                            >
                                <SubMenu toggle={chatsDropdown}>
                                    <MenuItem text="Inbox" />
                                    <MenuItem text="Read Email" />
                                </SubMenu>
                            </MenuItem>
                            <MenuItem Icon={Images.calendarIcon} text="Calender" />
                            <MenuItem Icon={Images.contactIcon} text="Contacts" />
                            <MenuItem Icon={Images.newspaperIcon} text="Tasks" />
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[12px] text-dark-500 py-4 px-5 font-medium menu-catagory-title">Pages</h3>
                        <ul className="menu-items">
                            <MenuItem Icon={Images.lockIcon} text="Authentication" />
                            <MenuItem Icon={() => <FontAwesomeIcon icon={faFileLines} />} text="Pages" />
                            <MenuItem Icon={Images.layoutIcon} text="Horizontal" />
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[12px] text-dark-500 py-4 px-5 font-medium menu-catagory-title">
                            Components
                        </h3>
                        <ul className="menu-items">
                            <MenuItem Icon={Images.giftIcon} text="Extended" />
                            <MenuItem Icon={() => <FontAwesomeIcon icon={faFileLines} />} text="Pages" />
                            <MenuItem Icon={Images.boxIcon} text="Forms" />
                            <MenuItem Icon={Images.layoutIcon} text="Horizontal" />
                            <MenuItem Icon={Images.knobsIcon} text="Tables" />
                            <MenuItem Icon={Images.chartsIcon} text="Charts" />
                            <MenuItem Icon={Images.cpuIcon} text="Icons" />
                            <MenuItem Icon={Images.mapsIcon} text="Maps" />
                            <MenuItem Icon={Images.shareIcon} text="Multilevel" />
                        </ul>
                    </div>
                    <div className="mx-6 mt-12 promotion-box">
                        <div className="bg-[#e8f2fd] text-center p-[20px] rounded-sm">
                            <img className="inline-block" src={Images.giftBox} alt="" />
                            <div className="mt-4">
                                <h5 className="text-[16px] text-blue font-semibold">Unlimited Access</h5>
                                <p className="text-[13px] mb-4 text-dark-500">
                                    Upgrade your plan from a Free trial, to select ‘Business Plan’.
                                </p>
                                <Button text="Upgrade Now" link="#" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;

export { closeAll };
// eslint-disable-next-line prettier/prettier
