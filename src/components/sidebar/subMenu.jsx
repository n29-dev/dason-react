function SubMenu({ children, toggle }) {
    return (
        <ul className="sidebar-submenu" data-state={!toggle ? 'hidden' : 'visible'}>
            {children}
        </ul>
    );
}

export default SubMenu;
