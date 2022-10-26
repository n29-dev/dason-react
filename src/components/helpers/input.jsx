function Input({ Icon, classes, ...props }) {
    return (
        <div className={`flex gap-5 items-center bg-white py-3 px-5 border border-[#ced4da] rounded ${classes}`}>
            <label className="text-[16px] flex-shrink-0 text-dark-600">
                <Icon />
            </label>
            <input className="border-0 outline-0 flex-1 text-dark-600 placeholder:text-dark-600" {...props} />
        </div>
    );
}

export default Input;
