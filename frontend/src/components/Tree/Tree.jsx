import React, { useState, useEffect } from "react";
import "./Tree.css";
import { useNavigate, useParams } from "react-router-dom";
import AddPicture from "../../images/add_picture.png";
import axios from 'axios';
import DogTreeElement from "../GlobalComponents/DogTreeElement";
const Tree = () => {
  const { dogId } = useParams();
  const navigate = useNavigate();

  const [dog, setDog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://apiproject-prod.us-east-1.elasticbeanstalk.com/api/DogDetails/dog-with-ancestors/${dogId}`);
        setDog(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [dogId, navigate]);

  return (
    <div className="TreeContainer">
      <div className="TreeDog">
        {dog ? (
          <div>
            <div className="Parents">
              <div className="TreeElementDog">
                {dog.father ? (
                  <DogTreeElement name="Батько" dog={dog.father} />
                ) : (
                  <div>
                    <p>Батько не визначений</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
              </div>
              <div className="TreeElementDog">
                {dog.mother ? (
                  <DogTreeElement name="Матір" dog={dog.mother} />
                ) : (
                  <div>
                    <p>Матір не визначена</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="Ancestors">

              <div className="TreeElementDog">
                {dog.father?.mother ? (
                  <DogTreeElement name="Бабуся (Батько)" dog={dog.father.mother} />
                ) : (
                  <div>
                    <p>Бабуся (Батько) не визначена</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
                {dog.father?.father ? (
                  <DogTreeElement name="Дідусь (Батько)" dog={dog.father.father} />
                ) : (
                  <div>
                    <p>Дідусь (Батько) не визначений</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
              </div>

              <div className="TreeElementDog">
                {dog.mother?.mother ? (
                  <DogTreeElement name="Бабуся (Мати)" dog={dog.mother.mother} />
                ) : (
                  <div>
                    <p>Бабуся (Мати) не визначена</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
                {dog.mother?.father ? (
                  <DogTreeElement name="Дідусь (Мати)" dog={dog.mother.father} />
                ) : (
                  <div>
                    <p>Дідусь (Мати) не визначений</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="ThirdGeneration">

              <div className="TreeElementThirdGeneration">
                {dog.father?.mother?.mother ? (
                  <DogTreeElement name="Прабабуся (Бабуся)" dog={dog.father?.mother?.mother} />
                ) : (
                  <div>
                    <p>Прабабуся (Бабуся) не визначена</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
                {dog.father?.mother?.father ? (
                  <DogTreeElement name="Прадідусь (Бабуся)" dog={dog.father?.mother?.father} />
                ) : (
                  <div>
                    <p>Прадідусь (Бабуся) не визначений</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
              </div>

              <div className="TreeElementThirdGeneration">
                {dog.father?.mother?.mother ? (
                  <DogTreeElement name="Прабабуся (Дідусь)" dog={dog.father?.father?.mother} />
                ) : (
                  <div>
                    <p>Прабабуся (Дідусь) не визначена</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
                {dog.father?.father?.father ? (
                  <DogTreeElement name="Прадідусь (Дідусь)" dog={dog.father?.father?.father} />
                ) : (
                  <div>
                    <p>Прадідусь (Дідусь) не визначений</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
              </div>

              <div className="TreeElementThirdGeneration">
                {dog.mother?.mother?.mother ? (
                  <DogTreeElement name="Прабабуся (Бабуся)" dog={dog.mother?.mother?.mother} />
                ) : (
                  <div>
                    <p>Прабабуся (Бабуся) не визначена</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
                {dog.mother?.mother?.father ? (
                  <DogTreeElement name="Прадідусь (Бабуся)" dog={dog.mother?.mother?.father} />
                ) : (
                  <div>
                    <p>Прадідусь (Бабуся) не визначений</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
              </div>

              <div className="TreeElementThirdGeneration">
                {dog.mother?.father?.mother ? (
                  <DogTreeElement name="Прабабуся (Дідусь)" dog={dog.mother?.father?.mother} />
                ) : (
                  <div>
                    <p>Прабабуся (Дідусь) не визначена</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
                {dog.mother?.father?.father ? (
                  <DogTreeElement name="Прадідусь (Дідусь)" dog={dog.mother?.father?.father} />
                ) : (
                  <div>
                    <p>Прадідусь (Дідусь) не визначений</p>
                    <img
                      src={AddPicture}
                      alt="Placeholder"
                      className="DogPhoto"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="TreeElementThirdGeneratio">

            </div>

          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>

  );
};

export default Tree;
