import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Dexie from 'dexie';
import { useLiveQuery } from "dexie-react-hooks";
import AddPicture from "../../images/add_picture.png";
import PedigreeLoader from './PedigreeLoader';
import "./AddDogNode.scss"

const db = new Dexie('PedigreeDatabase');
db.version(1).stores({
    pedigrees: '++id,name,photo,familyposition,father,mother'
});

class Dog {
    constructor(id, name, photo, familyposition, father = null, mother = null) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.familyposition = familyposition;
        this.father = father;
        this.mother = mother;
    }
}

const viewAllData = async () => {
    const allPedigrees = await db.pedigrees.toArray();
    console.log('All Pedigrees:', allPedigrees);
};


const DogTreeElement = ({ name, requiredPosition, dogNames }) => {
    const [dogName, setDogName] = useState('');
    const [dogPhoto, setDogPhoto] = useState(AddPicture);
    const pedigreeLoader = new PedigreeLoader();
    const fileInputRef = useRef(null);

    const dogData = useLiveQuery(async () => {
        if (requiredPosition) {
            return await db.pedigrees
                .where('familyposition')
                .equals(requiredPosition)
                .first();
        }
        return null;
    });

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
            const data = await pedigreeLoader.fetchPedigree(dogId, requiredPosition);
        }
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

    return (
        <div className="TreeElementDogNode">
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
                <input className="Input"
                    list="dog-names"
                    value={dogName}
                    onChange={handleNameChange}
                    placeholder="Enter or select a dog name"
                />
                <datalist id="dog-names">
                <p>Кличка собаки</p>
                    {dogNames.map(dog => (
                        <option key={dog.id} value={dog.name} data-id={dog.id}>{dog.name}</option>
                    ))}
                </datalist>
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

const DogTreeNode = ({ dog, dogNames }) => {

    const DogTree = () => (
        <div className="TreeContainer">
            <div className="Tree">
                <div className="Parents">
                    <div className="TreeElement">
                        <DogTreeElement
                            name="Тато"
                            dog={dog.father}
                            requiredPosition="father"
                            dogNames={dogNames}
                        />
                    </div>
                    <div className="TreeElement">
                        <DogTreeElement
                            name="Мама"
                            dog={dog.mother}
                            requiredPosition="mother"
                            dogNames={dogNames}
                        />
                    </div>
                </div>
                <div className="Ancestors">
                    <div className="TreeElement">
                        <DogTreeElement
                            name="Бабуся (Тато)"
                            dog={dog.father?.mother}
                            requiredPosition="grandmother(father)"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Дідусь (Тато)"
                            dog={dog.father?.father}
                            requiredPosition="grandfather(father)"
                            dogNames={dogNames}
                        />
                    </div>
                    <div className="TreeElement">
                        <DogTreeElement
                            name="Бабуся (Мама)"
                            dog={dog.mother?.mother}
                            requiredPosition="grandmother(mother)"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Дідусь (Мама)"
                            dog={dog.mother?.father}
                            requiredPosition="grandfather(mother)"
                            dogNames={dogNames}
                        />
                    </div>
                </div>
                <div className="ThirdGeneration">
                    <div className="TreeElementThirdGeneration">
                        <DogTreeElement
                            name="Прабабуся (Бабуся)"
                            dog={dog.mother?.mother?.mother}
                            requiredPosition="great-grandmother(grandmother(father))"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Прадідусь (Бабуся)"
                            dog={dog.mother?.mother?.father}
                            requiredPosition="great-grandfather(grandmother(father))"
                            dogNames={dogNames}
                        />
                    </div>
                    <div className="TreeElementThirdGeneration">
                        <DogTreeElement
                            name="Прабабуся (Дідусь)"
                            dog={dog.father?.mother?.mother}
                            requiredPosition="great-grandmother(grandfather(father))"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Прадідусь (Дідусь)"
                            dog={dog.father?.mother?.father}
                            requiredPosition="great-grandfather(grandfather(father))"
                            dogNames={dogNames}
                        />
                    </div>

                    <div className="TreeElementThirdGeneration">
                        <DogTreeElement
                            name="Прабабуся (Бабуся)"
                            dog={dog.mother?.mother?.mother}
                            requiredPosition="great-grandmother(grandmother(mother))"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Прадідусь (Бабуся)"
                            dog={dog.mother?.mother?.father}
                            requiredPosition="great-grandfather(grandmother(mother))"
                            dogNames={dogNames}
                        />
                    </div>
                    <div className="TreeElementThirdGeneration">
                        <DogTreeElement
                            name="Прабабуся (Дідусь)"
                            dog={dog.father?.mother?.mother}
                            requiredPosition="great-grandmother(grandfather(mother))"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Прадідусь (Дідусь)"
                            dog={dog.father?.mother?.father}
                            requiredPosition="great-grandfather(grandfather(mother))"
                            dogNames={dogNames}
                        />
                    </div>
                </div>


                <div className="FourGeneration">
                    <div className="TreeElementFourGeneration">
                        <DogTreeElement
                            name="Прапрабабуся (Прабабуся)"
                            dog={dog.mother?.mother?.mother}
                            requiredPosition="great-grandmother(great-grandmother(grandmother(father)))"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Прапрадідусь (Прабабуся)"
                            dog={dog.mother?.mother?.father}
                            requiredPosition="great-grandfather(great-grandmother(grandmother(father)))"
                            dogNames={dogNames}
                        />
                    </div>
                    <div className="TreeElementFourGeneration">
                        <DogTreeElement
                            name="Прапрабабуся (Прадідусь)"
                            dog={dog.father?.mother?.mother}
                            requiredPosition="great-grandmother(great-grandfather(grandmother(father)))"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Прапрадідусь (Прадідусь)"
                            dog={dog.father?.mother?.father}
                            requiredPosition="great-grandfather(great-grandfather(grandmother(father)))"
                            dogNames={dogNames}
                        />
                    </div>

                    <div className="TreeElementFourGeneration">
                        <DogTreeElement
                            name="Прапрапрабабуся (Прабабуся)"
                            dog={dog.mother?.mother?.mother?.mother}
                            requiredPosition="great-grandmother(great-grandmother(grandfather(father)))"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Прапрапрадідусь (Прабабуся)"
                            dog={dog.mother?.mother?.mother?.father}
                            requiredPosition="great-grandfather(great-grandmother(grandfather(father)))"
                            dogNames={dogNames}
                        />
                    </div>
                    <div className="TreeElementFourGeneration">
                        <DogTreeElement
                            name="Прапрапрабабуся (Прадідусь)"
                            dog={dog.father?.mother?.mother?.mother}
                            requiredPosition="great-grandmother(great-grandfather(grandfather(father)))"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Прапрапрадідусь (Прадідусь)"
                            dog={dog.father?.mother?.mother?.father}
                            requiredPosition="great-grandfather(great-grandfather(grandfather(father)))"
                            dogNames={dogNames}
                        />
                    </div>

                    <div className="TreeElementFourGeneration">
                        <DogTreeElement
                            name="Прапрабабуся (Прабабуся)"
                            dog={dog.mother?.mother?.mother}
                            requiredPosition="great-grandmother(great-grandmother(grandmother(mother)))"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Прапрадідусь (Прабабуся)"
                            dog={dog.mother?.mother?.father}
                            requiredPosition="great-grandfather(great-grandmother(grandmother(mother)))"
                            dogNames={dogNames}
                        />
                    </div>
                    <div className="TreeElementFourGeneration">
                        <DogTreeElement
                            name="Прапрабабуся (Прадідусь)"
                            dog={dog.father?.mother?.mother}
                            requiredPosition="great-grandmother(great-grandfather(grandmother(mother)))"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Прапрадідусь (Прадідусь)"
                            dog={dog.father?.mother?.father}
                            requiredPosition="great-grandfather(great-grandfather(grandmother(mother)))"
                            dogNames={dogNames}
                        />
                    </div>

                    <div className="TreeElementFourGeneration">
                        <DogTreeElement
                            name="Прапрабабуся (Прабабуся)"
                            dog={dog.mother?.mother?.mother}
                            requiredPosition="great-grandmother(great-grandmother(grandfather(mother)))"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Прапрадідусь (Прабабуся)"
                            dog={dog.mother?.mother?.father}
                            requiredPosition="great-grandfather(great-grandmother(grandfather(mother)))"
                            dogNames={dogNames}
                        />
                    </div>
                    <div className="TreeElementFourGeneration">
                        <DogTreeElement
                            name="Прапрабабуся (Прадідусь)"
                            dog={dog.father?.mother?.mother}
                            requiredPosition="great-grandmother(great-grandfather(grandfather(mother)))"
                            dogNames={dogNames}
                        />
                        <DogTreeElement
                            name="Прапрадідусь (Прадідусь)"
                            dog={dog.father?.mother?.father}
                            requiredPosition="great-grandfather(great-grandfather(grandfather(mother)))"
                            dogNames={dogNames}
                        />
                    </div>

                </div>
            </div>
        </div>
    );

    return <DogTree dog={dog} />;
};

const App = () => {
    const [dogNames, setDogNames] = useState([]);
    const puppy = new Dog(7, 'Puppy', 'https://img.freepik.com/free-photo/close-up-face-brown-puppy-with-blue-eyes_23-2149230675.jpg', 'puppy');

    useEffect(() => {
        const fetchDogNames = async () => {
            const storedUserId = localStorage.getItem('UserId');
            const response = await axios.get(`http://apiproject-prod.us-east-1.elasticbeanstalk.com/api/DogDetails/users-with-dogs/${storedUserId}`);
            const dogNames = response.data.dogs.map(dog => ({ id: dog.id, name: dog.name }));
            setDogNames(dogNames);
            console.log(response.data);
        };

        fetchDogNames();
    }, []);

    const clearStore = async () => {
        await db.pedigrees.clear();
        console.log('Store cleared.');
    };

    const addAllDogsToDatabase = async () => {

    };

    useEffect(() => {
        console.log('Initializing database...');
        const initializeDatabase = async () => {
            await clearStore();
            await addAllDogsToDatabase();
        };

        initializeDatabase().catch(error => console.error('Error initializing database:', error));
    }, []);

    return (
        <div>
            <DogTreeNode dog={puppy} dogNames={dogNames} />
            {/* <button onClick={viewAllData}>View All Data in Console</button> */}

        </div>
    );
};

export default App;
