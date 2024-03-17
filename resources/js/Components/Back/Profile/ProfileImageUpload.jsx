import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const ProfileImageUpload = ({ user }) => {
    const { data, setData, post } = useForm({
        avatar: user.image ? user.image : null,
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    const [buttonText, setButtonText] = useState(() => user.image ? 'Update Image' : 'Upload Image');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('avatar', file);

        // Preview image
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('avatar', data.avatar);
        post('/profile/upload', formData).then(() => {
            setButtonText('Update Image'); 
        });
    };

    return (
        <form onSubmit={submit} className="max-w-md mx-auto bg-gray-800 text-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                {previewUrl && <img src={previewUrl} alt="Preview" className="max-w-md mx-auto mb-4" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
                {!previewUrl && user.image && <img src={`storage/images/${user.image}`} alt="User Avatar" className="max-w-md mx-auto mb-4" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
                <input type="file" onChange={handleImageChange} className="block w-full text-center border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            <div className="text-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{buttonText}</button>
            </div>
        </form>
    );
};

export default ProfileImageUpload;
