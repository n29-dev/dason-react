import { useState } from 'react';

function useDropdownToggle(init = false, duration = 500) {
    const [value, setValue] = useState(init);

    function dropDownToggle(event) {
        const targetBtn = event.currentTarget;
        const dropDownMenu = targetBtn.nextElementSibling;
        const dropDownState = dropDownMenu.getAttribute('data-state') === 'visible';
        setValue((v) => !v);

        dropDownMenu.setAttribute('data-state', `${dropDownState ? 'hidden' : 'visible'}`);
        targetBtn.style.pointerEvents = 'none';
        dropDownMenu.style.display = 'block';

        let maxHeight = dropDownMenu.offsetHeight;
        let height = maxHeight / 100;

        const interval = setInterval(() => {
            const condition = dropDownState ? maxHeight <= 0 : height >= maxHeight;

            if (condition) {
                clearInterval(interval);
                dropDownMenu.style.height = '';
                dropDownMenu.style.display = '';
                targetBtn.style.pointerEvents = '';
                return;
            }

            if (dropDownState) {
                dropDownMenu.style.height = `${maxHeight.toFixed()}px`;
                maxHeight -= height;
            } else {
                dropDownMenu.style.height = `${height.toFixed()}px`;
                height += maxHeight / 100;
            }
        }, (duration / 1000) * 10);
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

export default useDropdownToggle;
