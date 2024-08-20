import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DogPage.scss';
import go_back from "../../images/go_back.png";
import add_photo_icon from "../../images/add_photo_icon.png";
import { FaRegCopy } from "react-icons/fa6";
import Header from '../Header/Header';
import OwnerDogPage from '../OwnerDogPage/OwnerDogPage';
import GalleryDogPage from '../GalleryDogPage/GalleryDogPage';
import PuppiesDogPage from '../PuppiesDogPage/PuppiesDogPage';
import Tree from '../Tree/Tree';
import edit_img from "../../images/edit_account.png";


const DogPage = () => {
    const { dogId } = useParams();
    const [datadog, setDogData] = useState(null);
    const [url, setUrl] = useState('');
    const [activePage, setActivePage] = useState('');
    const [showOwnerPage, setShowOwnerPage] = useState(false);
    const [showAlbumPage, setShowAlbumPage] = useState(false);
    const [showPuppiesPage, setShowPuppiesPage] = useState(false);
    const [showTree, setShowTree] = useState(true);



    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://h4572thw-5254.euw.devtunnels.ms/api/Dog/${dogId}`);
                console.log('Response:', response.data);
                setDogData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [dogId]);

    function copyLink() {
        var linkOutput = document.getElementById("urlInput");

        if (url) {
            linkOutput.value = url.trim();
            linkOutput.select();
            document.execCommand("copy");
            alert("Посилання скопійовано!");
        } else {
            alert("Будь ласка, зачекайте, поки URL-адреса не буде завантажена.");
        }
    }

    const handleShowTree= () => {
        setActivePage('tree');
        setShowTree(true);
        setShowPuppiesPage(false);
        setShowAlbumPage(false);
        setShowOwnerPage(false);
    };

    const handleShowOwnerPage = () => {
        setActivePage('owner');
        setShowOwnerPage(true);
        setShowAlbumPage(false);
        setShowPuppiesPage(false);
        setShowTree(false);
    };

    const handleShowAlbumPage = () => {
        setActivePage('album');
        setShowAlbumPage(true);
        setShowOwnerPage(false);
        setShowPuppiesPage(false);
        setShowTree(false);

    };

    const handleShowPuppiesPage = () => {
        setActivePage('puppies');
        setShowPuppiesPage(true);
        setShowAlbumPage(false);
        setShowOwnerPage(false);
        setShowTree(false);

    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="dog_page">
            <Header />

            <div className='dog-page-container'>
                <button className='dog-page-back-button'>
                    <img className='go_back_img' src={go_back} onClick={handleGoBack} alt='go back img' />
                    <span className='button_return_text'>Повернутись</span>
                </button>
                <div className='dog-page-url-section'>
                    <input
                        type="text"
                        id="urlInput"
                        placeholder="URL-адреса"
                        value={url}
                        readOnly
                        className='dog-page-url-input'
                    />
                    <FaRegCopy className='icon-copy' onClick={copyLink} />
                </div>
            </div>

            <div className='main_dog_container_container background_rectangle_dog_page'>
                {datadog ? (
                    <>
                        <div className='dog_info_container'>
                            <div className="image_dog_page">
                                <img className='photo_dog_page' src={datadog.photo || add_photo_icon} alt="photo_dog_page" />
                            </div>
                            <div className='dog_page_fields'>
                                <div className='dog_field_name'>
                                    <span className='name_dog'>{datadog.name}</span>
                                </div>
                                <div className='dog_field'>
                                    <label className='text_dog_detail'>Порода:</label>
                                    <span className='text_dog_detail'>{datadog.breed}</span>
                                </div>
                                <div className='dog_field'>
                                    <label className='text_dog_detail'>Вік:</label>
                                    <span className='text_dog_detail'>{datadog.age}</span>
                                </div>
                                <div className='dog_field'>
                                    <label className='text_dog_detail'>Стать:</label>
                                    <span className='text_dog_detail'>{datadog.sex}</span>
                                </div>
                                <div className='dog_field'>
                                    <label className='text_dog_detail'>Шерсть:</label>
                                    <span className='text_dog_detail'>{datadog.wool}</span>
                                </div>
                                <div className='dog_field'>
                                    <label className='text_dog_detail'>Ріст:</label>
                                    <span className='text_dog_detail'>{datadog.growth}</span>
                                </div>
                                <div className='dog_field'>
                                    <label className="text_dog_detail">Вага:</label>
                                    <span className='text_dog_detail'>{datadog.weight}</span>
                                </div>
                                <div className='dog_field'>
                                    <label className="text_dog_detail">КСУ:</label>
                                    <span className='text_dog_detail'>{datadog.ksy}</span>
                                </div>
                            </div>

                            <div>
                                <button className='button_edit_dog_data'>
                                    <span className='button_edit_text'>Редагувати</span>
                                    <img className='edit_img' src={edit_img} alt='edit button' />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <div className='dog_page_buttons'>
                <button className={`dog_page_details_button ${activePage === 'tree' ? 'active' : ''}`} onClick={handleShowTree}>Родослівна</button>
                <button className={`dog_page_details_button ${activePage === 'puppies' ? 'active' : ''}`} onClick={handleShowPuppiesPage}>Цуценята</button>
                <button className={`dog_page_details_button ${activePage === 'album' ? 'active' : ''}`} onClick={handleShowAlbumPage}>Галерея</button>
                <button className={`dog_page_details_button ${activePage === 'owner' ? 'active' : ''}`} onClick={handleShowOwnerPage}>Власник</button>
            </div>

            {showTree && (
                <div className='owner_info_section'>
                    <Tree dogId={dogId} />
                </div>
            )}

            {showOwnerPage && (
                <div className='owner_info_section'>
                    <OwnerDogPage dogId={dogId} />
                </div>
            )}

            {showAlbumPage && (
                <div className='owner_info_section'>
                    <GalleryDogPage dogId={dogId} />
                </div>
            )}

            {showPuppiesPage && (
                <div className='owner_info_section'>
                    <PuppiesDogPage dogId={dogId} />
                </div>
            )}

        </div>
    );
};

export default DogPage;
