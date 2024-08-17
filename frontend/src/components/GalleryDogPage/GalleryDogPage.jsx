import React, { useState, useEffect } from 'react';
import { TiEdit } from "react-icons/ti";
import axios from 'axios';
import './GalleryDogPage.scss';
import EditGalleryDogPage from '../EditGalleryDogPage/EditGalleryDogPage';

const GalleryDogPage = ({ dogId }) => {
    const [dogPhotos, setDogPhotos] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);

    useEffect(() => {
        fetchDogPhotos();
    }, [dogId]);

    const fetchDogPhotos = async () => {
        try {
            const response = await axios.get(`https://8gq2pvcg-5254.euw.devtunnels.ms/api/DogDetails/album-dog/${dogId}`);
            console.log('Response:', response.data);
            setDogPhotos(response.data.photos);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditClick = () => {
        setShowEditPopup(true);
    };

    const handleClosePopup = () => {
        setShowEditPopup(false);
        fetchDogPhotos(); 
    };

    return (
        <div className="gallery_dog_page">
            <div className="edit_icon_container" onClick={handleEditClick}>
                <TiEdit className="edit_icon" />
                <span className='button_return_text'>Редагувати</span>
            </div>

            {dogPhotos.length > 0 ? (
                dogPhotos.map((photo, index) => (
                    <div key={index} className="dog_photo_container">
                        <img className="dog_photo" src={photo.photo} alt={`Dog ${index + 1}`} />
                    </div>
                ))
            ) : (
                <p>Фотографій немає</p>
            )}

            {showEditPopup && (
                <EditGalleryDogPage dogPhotos={dogPhotos} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default GalleryDogPage;
