/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-bind */
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { UploadProfile } from '../../images';
import { updateUserProfile } from '../auth/helpers';
import { getDownloadUrl, uploadFile } from '../helpers';
import Button from '../helpers/button';
import FileDropzone from '../helpers/fileDropzone';

function UploadProfilePic({ closeModal }) {
    const { displayName, email, uid } = useSelector((store) => store.users.currentUser);
    const { currentUser } = useSelector((store) => store.users);
    console.log(currentUser);

    // store and upload pic
    const [files, setFiles] = useState([]);

    function onDrop(acceptedFiles) {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
    }

    const submitBtnRef = useRef();

    async function uploadHandler(event) {
        event.preventDefault();

        if (!files[0]) {
            return;
        }

        const notificationId = toast.loading('..Uploading');
        submitBtnRef.current.disabled = true;

        const ext = files[0].name.match(/\.[0-9a-z]+$/i)[0];
        const uploadResult = await uploadFile(`users/profile_photo/${uid}${ext}`, files[0]);

        // if upload not successfull
        if (!uploadResult) {
            toast('Upload Failed', {
                id: notificationId,
            });

            submitBtnRef.current.disabled = false;

            return;
        }

        const downloadURL = await getDownloadUrl(uploadResult.metadata.fullPath);

        // if download url generaton is not successful
        if (!downloadURL) {
            toast('Upload Failed', {
                id: notificationId,
            });
            submitBtnRef.current.disabled = false;

            return;
        }

        toast('Upload Successful', {
            id: notificationId,
        });

        updateUserProfile({
            photoURL: downloadURL,
        });

        closeModal();
    }

    return (
        <div>
            <h2 className="text-[24px] text-dark-600 mb-[60px]">Upload Your Profile Pic</h2>
            <div className="flex items-center mb-[80px]">
                {/* profile pic */}
                <div className="flex justify-center flex-1 border-r border-[#dddddd]">
                    <img
                        className="w-[200px] h-[200px] rounded-full object-cover"
                        src={files[0]?.preview || UploadProfile}
                        alt=""
                    />
                </div>
                {/* name and details */}
                <div className="flex justify-center flex-1 pl-6">
                    <div>
                        <h3 className="text-[20px] text-dark-600 mb-4">
                            <span className="font-semibold underline mr-1">Username:</span>
                            <span>{displayName}</span>
                        </h3>
                        <p className="text-[20px] text-dark-600">
                            <span className="font-semibold underline mr-1">Email:</span>
                            <span className="font-normal">{email}</span>
                        </p>
                    </div>
                </div>
            </div>
            <form onSubmit={uploadHandler}>
                <FileDropzone
                    classes="h-[180px] mb-5"
                    onDrop={onDrop}
                    accept={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
                />
                <Button
                    type="submit"
                    Icon={() => <FontAwesomeIcon icon={faCloudArrowUp} />}
                    text="Upload"
                    ref={submitBtnRef}
                />
            </form>
        </div>
    );
}

export default UploadProfilePic;
