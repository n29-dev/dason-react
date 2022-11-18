import { useEffect, useRef } from 'react';

function Modal({ children, classes, onOutsideClick }) {
    const modalWrapperRef = useRef();

    function outsideClickHandler(event) {
        if (event.currentTarget.isSameNode(event.target)) {
            onOutsideClick();
        }
    }

    useEffect(() => {
        if (onOutsideClick) {
            modalWrapperRef.current.addEventListener('click', outsideClickHandler);
        }
    }, []);

    return (
        <div
            className="fixed w-full h-full bg-[#000000bd] flex items-center 
        justify-center left-0 right-0 top-0 bottom-0 z-[999]"
            ref={modalWrapperRef}
        >
            <div className={`bg-white rounded-md p-6 ${classes || ''}`}>{children}</div>
        </div>
    );
}

export default Modal;
