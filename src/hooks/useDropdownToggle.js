import { useEffect, useRef, useState } from 'react';

function useDropdownToggle(init = false, options = {}) {
    const [value, setValue] = useState(init);
    const dropdownRef = useRef();

    const toggle = (event) => {
        if (event) {
            event.preventDefault();
        }
        setValue((v) => !v);
    };

    const findClick = (event) => {
        event.preventDefault();
        // const { current: currentElement } = options.element;
        const { current: currentElement } = dropdownRef;
        if (
            currentElement.contains(event.target) ||
            currentElement.isSameNode(event.target) ||
            currentElement.previousElementSibling.contains(event.target) ||
            currentElement.previousElementSibling.isSameNode(event.target)
        ) {
            return;
        }
        toggle();
    };

    useEffect(() => {
        if (options.outClickClose && value) {
            window.addEventListener('click', findClick);
        }
        return () => {
            window.removeEventListener('click', findClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    if (options.outClickClose) {
        return [
            value,
            {
                setValue,
                toggle,
            },
            dropdownRef,
        ];
    }

    return [
        value,
        {
            setValue,
            toggle,
        },
    ];
}

export default useDropdownToggle;
