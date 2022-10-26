import React from 'react';

const Button = React.forwardRef(({ link, type, Icon, text, classes }, ref) => {
    if (link) {
        return (
            <a
                className={`py-2 px-3 text-[13px] text-white bg-blue inline-block rounded ${classes || ''}`}
                href={link}
                ref={ref}
            >
                {Icon && (
                    <span className="inline-block mr-2">
                        <Icon />
                    </span>
                )}
                <span>{text}</span>
            </a>
        );
    }

    return (
        <button
            className={`py-2 px-3 text-[13px] text-white bg-blue inline-block rounded ${classes || ''}`}
            // eslint-disable-next-line react/button-has-type
            type={type || 'button'}
            ref={ref}
        >
            {Icon && (
                <span className="inline-block mr-2">
                    <Icon />
                </span>
            )}
            <span>{text}</span>
        </button>
    );
});

export default Button;
