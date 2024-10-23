import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Dexie from 'dexie';
import { breeds } from '../listDogName';
import { useLiveQuery } from "dexie-react-hooks";
import AddPicture from "../../images/add_picture.png";
import PedigreeLoader from './PedigreeLoader';
import "./AddDogNode.scss"
import SearchIcon from '@mui/icons-material/Search';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlusIcon from "../../images/plus_icon.png"
import TextField from '@mui/material/TextField';

const db = new Dexie('PedigreeDatabase');
db.version(1).stores({
    pedigrees: '++id,name,photo,familyposition,father,mother'
});

const DogTreeElement = ({ name, requiredPosition, dogNames, openModal }) => {
    const [dogName, setDogName] = useState('');
    const [dogPhoto, setDogPhoto] = useState(AddPicture);
    const pedigreeLoader = new PedigreeLoader();
    const fileInputRef = useRef(null);
    const [showList, setShowList] = useState(false);
    const [viewOption, setViewOption] = useState('myDogs'); 
    const [ownerSearchTerm, setOwnerSearchTerm] = useState(''); 
    const [breedSearchTerm, setBreedSearchTerm] = useState(''); 
    const [selectedBreed, setSelectedBreed] = useState(breeds[0]); 
    const [selectedOwner, setSelectedOwner] = useState('');
    const [allDogs, setAllDogs] = useState([]);
    const dropdownRef = useRef(null); 
    const [isAditionalInfoOpen, setIsAditionalInfoOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(0)
  
    const handleAdditionalInfoClick=()=>{
      setIsAditionalInfoOpen(!isAditionalInfoOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowList(false); 
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const fetchDogsByBreed = async (breed) => {
            try {
                const response = await axios.get(`http://apiproject-prod.us-east-1.elasticbeanstalk.com/api/Dog/GetDogByBreed/${breed}`);
                console.log(response);
                setAllDogs(response.data);
            } catch (error) {
                console.error("Error fetching dogs by breed:", error);
            }
        };

        if (viewOption === 'allDogs' && selectedBreed) {
            fetchDogsByBreed(selectedBreed);
        }
    }, [viewOption, selectedBreed]);

    const dogData = useLiveQuery(async () => {
        if (requiredPosition) {
            return await db.pedigrees
                .where('familyposition')
                .equals(requiredPosition)
                .first();
        }
        return null;
    }, [requiredPosition]);

    useEffect(() => {
        if (dogData) {
            setDogName(dogData.name);
            setDogPhoto(dogData.photo || AddPicture);
        }
    }, [dogData]);

    const handleNameChange = async (e) => {
        const selectedName = e.target.value;
        setDogName(selectedName);

        const selectedDog = dogNames.find(dog => dog.name === selectedName);
        if (selectedDog) {
            const dogId = selectedDog.id;
            await pedigreeLoader.fetchPedigree(dogId, requiredPosition);
        }
    };

    const handleDogSelect = (dog) => {
        setDogName(dog.name);
        handleNameChange({ target: { value: dog.name } });
        setShowList(false);
    };

    const handleMyDogs = () => {
        setViewOption('myDogs');
    };

    const handleViewAllDogs = () => {
        setViewOption('allDogs');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setDogPhoto(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleInputFocus = () => {
        setShowList(true);
    };

    const handleCloseList = () => {
        setTimeout(() => {
            setShowList(true);
        }, 1900);
    };

    const handleOwnerSearch = (e) => {
        setOwnerSearchTerm(e.target.value.toLowerCase());
    };

    const handleBreedChange = (e) => {
        setSelectedBreed(e.target.value);
    };

    const sortedMyDogs = dogNames
        .filter(dog => {
            const nameMatch = dog.name && dog.name.toLowerCase().includes(dogName.toLowerCase());
            const ukpmsMatch = dog.ukpms && dog.ukpms.toLowerCase().includes(dogName.toLowerCase());
            return nameMatch || ukpmsMatch; // Фільтруємо по імені або по ukpms
        })
        .sort((a, b) => {
            const nameA = a.name ? a.name.toLowerCase() : ''; // Перевірка на null/undefined
            const nameB = b.name ? b.name.toLowerCase() : '';

            const nameComparison = nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
            if (nameComparison !== 0) {
                return nameComparison;
            }

            const ukpmsA = a.ukpms ? a.ukpms : ''; // Перевірка на null/undefined
            const ukpmsB = b.ukpms ? b.ukpms : '';

            return ukpmsA.localeCompare(ukpmsB, undefined, { numeric: true, sensitivity: 'base' });
        });


    const sortedAllDogs = allDogs
        .filter(dog => {
            const nameMatch = dog.name && dog.name.toLowerCase().includes(dogName.toLowerCase());
            const ukpmsMatch = dog.ukpms && dog.ukpms.toLowerCase().includes(dogName.toLowerCase());
            return nameMatch || ukpmsMatch; // Фільтруємо по імені або по ukpms
        })
        .sort((a, b) => {
            const nameA = a.name ? a.name.toLowerCase() : ''; // Перевірка на null/undefined
            const nameB = b.name ? b.name.toLowerCase() : '';

            const nameComparison = nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
            if (nameComparison !== 0) {
                return nameComparison;
            }

            const ukpmsA = a.ukpms ? a.ukpms : ''; // Перевірка на null/undefined
            const ukpmsB = b.ukpms ? b.ukpms : '';

            return ukpmsA.localeCompare(ukpmsB, undefined, { numeric: true, sensitivity: 'base' });
        });


    return (
        <div className="TreeElementDogNode" ref={dropdownRef}>
            <div className='dogInfo'>
                <p>{name}</p>
                <img
                    src={dogPhoto}
                    alt={dogName || 'No photo'}
                    className="DogPhoto"
                    onClick={handleImageClick}
                />
            </div>

            <div className='dogInfo'>
                <input
                    className="Input"
                    list="dog-names"
                    value={dogName}
                    onChange={handleNameChange}
                    onFocus={handleInputFocus}
                    onBlur={handleCloseList}
                    placeholder="Enter or select a dog name"
                />

                {showList && sortedMyDogs.length > 0 && (
                    <ul className="dog-names-list">
                        <div className="button-container">
                            <button
                                className={`btnFilter ${viewOption === 'myDogs' ? 'active' : ''}`}
                                onClick={handleMyDogs}
                            >
                                Мої собаки
                            </button>
                            <button
                                className={`btnFilter ${viewOption === 'allDogs' ? 'active' : ''}`}
                                onClick={handleViewAllDogs}
                            >
                                Вся база
                            </button>
                        </div>

                        {viewOption === 'myDogs' && (
                            sortedMyDogs.length > 0 ? (
                                sortedMyDogs.map(dog => (
                                    <li key={dog.id} onClick={() => handleDogSelect(dog)}>
                                        <img src={dog.photo} alt={dog.name} />
                                        <div className="dog-info">
                                            <p className="name">{dog.name}</p>
                                            <p>{formatDate(dog.dateBirth)}</p>
                                            <p>{dog.ukpms}</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>Собак даної породи немає</p>
                            )
                        )}

                        {viewOption === 'allDogs' && (
                            <>
                                <div className="filter-container">
                                    <select
                                        id="breed_dog"
                                        name="breed"
                                        className="filterbreed"
                                        value={selectedBreed}
                                        onChange={handleBreedChange}
                                    >
                                        {breeds.map((breed, index) => (
                                            <option key={index} value={breed}>
                                                {breed}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="input-container">
                                        <SearchIcon fontSize="small" />
                                        <input
                                            type="text"
                                            className="filterInput"
                                            placeholder="Пошук власника..."
                                            value={ownerSearchTerm}
                                            onChange={handleOwnerSearch}
                                        />
                                    </div>
                                </div>

                                {sortedAllDogs.length > 0 ? (
                                    sortedAllDogs.map(dog => (
                                        <li key={dog.id} onClick={() => handleDogSelect(dog)}>
                                            <img src={dog.photo} alt={dog.name} />
                                            <div className="dog-info">
                                                <p className="name">{dog.name}</p>
                                                <p>{formatDate(dog.dateBirth)}</p>
                                                <p>{dog.ukpms}</p>
                                                <p>{dog.userName} {dog.userSurname}</p>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p>Собак даної породи немає</p>
                                )}

                            </>
                        )}
                    </ul>
                )}
                <div onClick={handleAdditionalInfoClick} className='isAditionalInfoButton'>
                            <img className='isAditionalInfoButtonImage' src={PlusIcon}/>
                        </div>

                        {isAditionalInfoOpen 
                        ? <div className='aditionalInfoWrapper'>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Оберіть дату"
                                isClearable
                                className='aditionalInfoDataPicker'
                            />
                            <div className='aditionalInfoInputWrapper'>
                                <p>Екстер'єр:</p>
                                <input 
                                    className='aditionalInfoInput' 
                                    type="text" 
                                    placeholder="  Екстер'єр"
                                />
                            </div>
                            <div className='aditionalInfoInputWrapper'>
                                <p>Дипломи:</p>
                                <input 
                                    className='aditionalInfoInput' 
                                    type="text"
                                    placeholder="  Дипломи"
                                />
                            </div>
                            <div className='aditionalInfoInputWrapper'>
                                <p>Власник:</p>
                                <input 
                                    className='aditionalInfoInput' 
                                    type="text" 
                                    placeholder="  Власник"
                                />
                            </div>
                            
                        </div> : 
                        <>
                        </>
                    }

            </div>

            <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />
        </div>
    );
};


export default DogTreeElement;


