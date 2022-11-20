import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const focusedStyle = {
    borderColor: '#2196f3',
};

const acceptStyle = {
    borderColor: '#00e676',
};

const rejectStyle = {
    borderColor: '#ff1744',
};

function FileDropzone({ text, classes, ...args }) {
    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
        ...args,
    });

    const style = useMemo(
        () => ({
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    return (
        <div
            className={`${
                classes || ''
            } flex flex-col items-center justify-center p-5 border border-dashed border-dark-300 rounded-sm
             bg-[#fafafa] outline-none transition-[border_250ms_ease-in-out]`}
            {...getRootProps({ style })}
        >
            <input {...getInputProps()} />
            <p className="text-dark-500 ">{text || "Drag 'n' drop your file here, or click to select file"}</p>
        </div>
    );
}

export default FileDropzone;
