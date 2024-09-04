import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import "./AddTreeDogElement.css";
import AddPicture from "../../../images/add_picture.png";

export default function AddDogTreeElement({ obj = { name: "", photo: "" }, onUpdate, name, isFilled }) {
    console.log(obj, name, "isFilled",)
    const [localObj, setLocalObject] = useState(obj);
    const [userId, setUserId] = useState(null);
    const [nameSuggestions, setNameSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('UserId');
        if (storedUserId) {
            setUserId(storedUserId);
        }

        const fetchData = async () => {
            if (storedUserId) {
                try {
                    const response = await axios.get(`http://apiproject-prod.us-east-1.elasticbeanstalk.com/api/DogDetails/users-with-dogs/${storedUserId}`);
                    const dogNames = response.data.dogs.map(dog => ({ id: dog.id, name: dog.name }));
                    console.log('Dog Names:', dogNames);
                    setNameSuggestions(dogNames);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setFilteredSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef]);

    const handleSelectSuggestion = async (suggestion) => {
        const updatedObject = { ...localObj, id: suggestion.id, name: suggestion.name };

        try {
            const response = await axios.get(`http://apiproject-prod.us-east-1.elasticbeanstalk.com/api/DogDetails/dog-with-ancestors/${suggestion.id}`);
            if (response.data) {
                const ancestorsData = {
                    father: response.data.father || { id: null, name: "", photo: "" },
                    mother: response.data.mother || { id: null, name: "", photo: "" },
                };
                onUpdate({ ...updatedObject, ...ancestorsData });
            }
        } catch (error) {
            console.error('Error fetching ancestors:', error);
        }

        setLocalObject(updatedObject);
        setFilteredSuggestions([]);
    };

    const handleChangeName = (e) => {
        const updatedObject = { ...localObj, name: e.target.value };
        setLocalObject(updatedObject);
        onUpdate(updatedObject);

        if (Array.isArray(nameSuggestions)) {
            const filtered = nameSuggestions.filter(dog =>
                dog.name.toLowerCase().startsWith(e.target.value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        }
    };

    const handleFocus = () => {
        setFilteredSuggestions(nameSuggestions);
    };

    return (
        <div className="DogElement" ref={inputRef}>
            {name}
            <div className="AddPicture">
                <img className="AddPictureLogo" src={obj?.photo ? obj?.photo : AddPicture}
                    alt="Add Picture" />
            </div>
            <input
                type="text"
                className="Input"
                placeholder="Кличка"
                value={localObj?.name || obj?.name || ""}
                onChange={handleChangeName}
                onFocus={handleFocus}
            />
            <ul className="SuggestionsList">
                {filteredSuggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                        {suggestion.name}
                    </li>
                ))}
            </ul>
        </div>
    );

}

