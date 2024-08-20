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
        const response = await axios.get(`https://h4572thw-5254.euw.devtunnels.ms/api/DogDetails/dog-with-parents/${dogId}`);
        setDog(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [dogId, navigate]);

  return (
    <div className="Tree">
      {dog ? (
        <div>
          <div className="Parents">
            <div className="TreeElement">
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
            <div className="TreeElement">
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
            <div className="TreeElement">
              {dog.grandmaMa ? (
                <DogTreeElement name="Бабуся (Мати)" dog={dog.grandmaMa} />
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
              {dog.grandadMa ? (
                <DogTreeElement name="Дідусь (Мати)" dog={dog.grandadMa} />
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
            <div className="TreeElement">
              {dog.grandmaFa ? (
                <DogTreeElement name="Бабуся (Батько)" dog={dog.grandmaFa} />
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
              {dog.grandadFa ? (
                <DogTreeElement name="Дідусь (Батько)" dog={dog.grandadFa} />
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
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Tree;
