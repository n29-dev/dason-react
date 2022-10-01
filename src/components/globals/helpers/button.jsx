function Button({ link, Icon, text }) {
    if (link) {
        return (
            <a className="py-2 px-3 text-[13px] text-white bg-blue inline-block rounded" href={link}>
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
        <button className="py-2 px-3 text-[13px] text-white bg-blue inline-block rounded" type="button">
            {Icon && (
                <span className="inline-block mr-2">
                    <Icon />
                </span>
            )}
            <span>{text}</span>
        </button>
    );
}

export default Button;
