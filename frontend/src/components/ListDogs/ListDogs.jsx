import React, { useState, useEffect } from 'react';
import search from "../../images/search.png";
import go_back from "../../images/go_back.png";
import photo_dog from "../../images/photo_dog.png";
import './ListDogs.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListDogs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [breed, setBreed] = useState('');
    const [ksy, setKsy] = useState(0);
    const [wool, setWool] = useState('default');
    const [originalUserData, setOriginalUserData] = useState([]);
    const [filteredUserData, setFilteredUserData] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchNameUser, setSearchNameUser] = useState('');
    const [ageFilter, setAgeFilter] = useState('default');
    const [puppiesFilter, setPuppiesFilter] = useState('default');

    useEffect(() => {
        if (location.state) {
            if (location.state.breed) {
                setBreed(location.state.breed);
            }
            if (location.state.ksy) {
                setKsy(location.state.ksy);
            }
        }
    }, [location.state]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://cdq2m359-5254.euw.devtunnels.ms/swagger/index.html/api/Dog/GetDogByBreed/${breed}`);
                console.log("Response data: ", response.data);

                setOriginalUserData(response.data);
                setFilteredUserData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [breed, ksy]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAccountClick = () => {
        const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        if (loggedIn) {
            const userId = localStorage.getItem('UserId');
            navigate(`/myaccount/${userId}`);
        } else {
            navigate('/login');
        }
    };

    const handleDogPage = (dogId) => {
        navigate(`/dogpageview/${dogId}`);
    };

    const handleFurTypeChange = (e) => {
        setWool(e.target.value);
    };

    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
    };

    const handleSearchNameUserChange = (e) => {
        setSearchNameUser(e.target.value);
    };

    const handleAgeFilterChange = (e) => {
        setAgeFilter(e.target.value);
    };

    const handlePuppiesFilterChange = (e) => {
        setPuppiesFilter(e.target.value);
    };

    const ageCategory = (age) => {
        if (age < 1) return 'less_than_year';
        if (age >= 1 && age <= 5) return '1_5_years';
        if (age >= 6 && age <= 10) return '6_10_years';
        if (age > 10) return 'more_than_10_years';
        return 'default';
    };

    const isNumeric = (value) => {
        return !isNaN(value) && !isNaN(parseFloat(value));
    };
    const filteredData = filteredUserData
    .filter(dog =>
        (
            (dog.name && dog.name.toLowerCase().includes(searchName.toLowerCase())) ||
            (dog.ksy.toString().includes(searchName))
            (dog.chip.toString().includes(searchName))
        ) &&
        (dog.userName && dog.userName.toLowerCase().includes(searchNameUser.toLowerCase())) &&
        (ageFilter === 'default' || ageCategory(dog.age) === ageFilter) &&
        (puppiesFilter === 'default' || (puppiesFilter === 'available' ? dog.puppies : !dog.puppies)) &&
        (wool === 'default' || dog.wool === wool)
    )
    .sort((a, b) => {
        if (isNumeric(searchName)) {
            return a.ksy - b.ksy;
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    return (
        <div className="">
            <div className='nav_filters_dogs'>
                <button className='button_return' onClick={handleGoBack}>
                    <img className='go_back_img' src={go_back} alt='go back img' />
                    <span className='button_return_text'>Повернутись</span>
                </button>

                <div className='name_of_breed_header'>{breed}</div>
                <i className="bi bi-person-circle" onClick={handleAccountClick}></i>
            </div>
            <div className='filters_dogs'>
                <div className="container_fur">
                    <select id="filter_fur" onChange={handleFurTypeChange} value={wool}>
                        <option value="default" className="option-default">Шерсть</option>
                        <option value="Короткошерстий" className="option-short">Короткошерстий</option>
                        <option value="Жорсткошерстий" className="option-hard">Жорсткошерстий</option>
                        <option value="Довгошерстий" className="option-long">Довгошерстий</option>
                    </select>
                </div>
                <div className="conteiner_child">
                    <select id="filter_child" onChange={handlePuppiesFilterChange} value={puppiesFilter}>
                        <option value="default">Наявність цуценят</option>
                        <option value="available">Наявні</option>
                        <option value="sold_no_dogs">Продані/немає</option>
                    </select>
                </div>
                <div className="conteiner_age">
                    <select id="filter_age" onChange={handleAgeFilterChange} value={ageFilter}>
                        <option value="default">Вік</option>
                        <option value="less_than_year">до 1 року</option>
                        <option value="1_5_years">1-5 років</option>
                        <option value="6_10_years">6-10 років</option>
                        <option value="more_than_10_years">Більше 10 років</option>
                    </select>
                </div>
                <div className="search_container_1">
                    <input type="text" id="search_input" placeholder="Введіть кличку собаки або ксу" value={searchName} onChange={handleSearchNameChange} />
                    <img className='search_dogs_name' src={search} alt='search' />
                </div>
                <div className="search_container_2">
                    <input type="text" id="search_input" placeholder="Введіть ім'я власника" value={searchNameUser} onChange={handleSearchNameUserChange} />
                    <img className='search_dogs_owner_name' src={search} alt='search' />
                </div>
            </div>
            <div className="items-container">
                {filteredData.map((item, idx) => (
                    <div key={`items-${idx}`} className="work-section-info">
                        <img className='photo_dog_details' src={item.photo} alt='Photo dog' />

                        <div className='details_dogs'>
                            <div className='name_dog_details'>{item.name}</div>
                            <div className='breed_dog_details'>
                                <span className='label'>Стать:</span>
                                <span className='value'>{item.sex}</span>
                            </div>
                            <div className='breed_dog_details'>
                                <span className='label'>КСУ:</span>
                                <span className='value'>{item.ksy}</span>
                            </div>
                            <div className='breed_dog_details'>
                                <span className='label'>Чіп:</span>
                                <span className='value'>{item.chip}</span>
                            </div>
                            <div className='breed_dog_details'>
                                <span className='label'>Шерсть:</span>
                                <span className='value'>{item.wool}</span>
                            </div>
                            <div className='breed_dog_details'>
                                <span className='label'>Вік:</span>
                                <span className='value'>{item.age}</span>
                            </div>
                            <div className='breed_dog_details'>
                                <span className='label'>Наявність цуценят:</span>
                                <span className='value'>{item.puppies === null ? 'Немає' : item.puppies ? 'Наявні' : 'Немає цуценят'}</span>
                            </div>
                            <div className='breed_dog_details'>
                                <span className='label'>Ім'я розплідника:</span>
                                <span className='value'>{item.userName}</span>
                            </div>
                            <div className='breed_dog_details'>
                                <span className='label'>Дата народження:</span>
                                <span className='value'>{item.dateBirth ? new Date(item.dateBirth).toLocaleDateString() : 'Невідомо'}</span>
                            </div>
                        </div>
                        <div className="next-button">
                        <button className='button_learn_more' onClick={() => handleDogPage(item.id)}>Дізнатись більше</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListDogs;
