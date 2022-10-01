function SubMenu({ children, toggle }) {
    return (
        <ul className="sidebar-submenu pt-1" data-state={!toggle ? 'hidden' : 'visible'}>
            {children}
        </ul>
    );
}

export default SubMenu;
