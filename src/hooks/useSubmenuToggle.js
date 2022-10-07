import { useState } from 'react';

function useSubmenuToggle(init = false, duration = 300) {
    const [value, setValue] = useState(init);

    function dropDownToggle(event) {
        const targetBtn = event.currentTarget;
        const dropDownMenu = targetBtn.nextElementSibling;
        const dropDownState = dropDownMenu.getAttribute('data-state') === 'visible';
        setValue((v) => !v);
        dropDownMenu.setAttribute('data-state', `${dropDownState ? 'hidden' : 'visible'}`);
        dropDownMenu.style.display = 'block';
        dropDownMenu.style.transition = `height ${duration}ms ease`;

        if (dropDownState) {
            dropDownMenu.style.height = '';
        } else {
            dropDownMenu.style.height = `${dropDownMenu.scrollHeight}px`;
        }

        setTimeout(() => {
            dropDownMenu.style.display = '';
            targetBtn.style.pointerEvents = '';
        }, duration);
    }

    return [
        value,
        {
            setValue,
            toggle: dropDownToggle,
            get: () => value,
        },
    ];
}

export default useSubmenuToggle;
