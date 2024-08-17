import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditGalleryDogPage.scss';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';

const EditGalleryDogPage = ({ dogPhotos, onClose }) => {
    const { dogId } = useParams();

    const [photos, setPhotos] = useState(dogPhotos);
    const [newPhoto, setNewPhoto] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPhoto(reader.result);
                setSelectedFileName(file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddPhoto = async () => {
        if (newPhoto) {
            try {
                const response = await axios.post('https://8gq2pvcg-5254.euw.devtunnels.ms/api/DogAlbum', {
                    photo: newPhoto,
                    dogId: dogId
                });
                console.log('Photo added:', response.data);
                setPhotos([...photos, response.data]);
                setNewPhoto(null);
                setSelectedFileName('');
            } catch (error) {
                console.error('Error adding photo:', error);
            }
        }
    };

    const handleDeletePhoto = async (photoId) => {
        try {
            await axios.delete(`https://lpwfmjjv-5254.euw.devtunnels.ms/api/DogAlbum/${photoId}`);
            setPhotos(photos.filter(photo => photo.id !== photoId));
            console.log("photoId- ", photoId);
        } catch (error) {
            console.error('Error deleting photo:', error);
            console.log("photoId- ", photoId);
        }
    };

    return (
        <div className="edit_gallery_dog_page">
            <div className="edit_gallery_dog_page_content">
                <IoMdClose className="close_icon" onClick={onClose} />
                <h2>Edit Photos</h2>
                <div className="photos_container">
                    {photos.map((photo, index) => (
                        <div key={index} className="photo_edit_container">
                            <img src={photo.photo} alt={`Dog ${index + 1}`} className="photo_edit" />
                            <button className='delete_btn' onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
                        </div>
                    ))}
                </div>
                <div className='btn_container'>
                    <input type="file" id="fileInput" className="add_photo_input" onChange={handleFileChange} />
                    <label htmlFor="fileInput" className="custom_file_input_label">Add photo</label>
                    <div className="file_name_display">{selectedFileName}</div>
                    <button onClick={handleAddPhoto} className="save_button">Save Photo</button>
                </div>
            </div>
        </div>
    );
};

export default EditGalleryDogPage;
