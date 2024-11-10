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
        const response = await axios.get(`https://cdq2m359-5254.euw.devtunnels.ms/api/DogDetails/dog-with-ancestors/${dogId}`);
        setDog(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [dogId, navigate]);

  return (
    <div className="TreeContainer">
      {dog ? (
        <>
          <div className="GenerationColumn">
            <div className="TreeElementDog">
              {dog.father ? (
                <DogTreeElement name="Батько" dog={dog.father} />
              ) : (
                <div>
                  <p>Батько не визначений</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
            <div className="TreeElementDog">
              {dog.mother ? (
                <DogTreeElement name="Матір" dog={dog.mother} />
              ) : (
                <div>
                  <p>Матір не визначена</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
          </div>
          <div className="GenerationColumn">
            <div className="TreeElementDog">
              {dog.father?.father ? (
                <DogTreeElement name="Дід (Батько)" dog={dog.father.father} />
              ) : (
                <div>
                  <p>Дід (Батько) не визначений</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
            <div className="TreeElementDog">
              {dog.father?.mother ? (
                <DogTreeElement name="Баба (Батько)" dog={dog.father.mother} />
              ) : (
                <div>
                  <p>Баба (Батько) не визначена</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
            <div className="TreeElementDog">
              {dog.mother?.father ? (
                <DogTreeElement name="Дід (Мати)" dog={dog.mother.father} />
              ) : (
                <div>
                  <p>Дід (Мати) не визначений</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
            <div className="TreeElementDog">
              {dog.mother?.mother ? (
                <DogTreeElement name="Баба (Мати)" dog={dog.mother.mother} />
              ) : (
                <div>
                  <p>Баба (Мати) не визначена</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
          </div>
          <div className="GenerationColumn">
            <div className="TreeElementDog">
              {dog.father?.father?.father ? (
                <DogTreeElement name="Прадід (Дід Батько)" dog={dog.father.father.father} />
              ) : (
                <div>
                  <p>Прадід (Дід Батько) не визначений</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
            <div className="TreeElementDog">
              {dog.father?.father?.mother ? (
                <DogTreeElement name="Прабаба (Дід Батько)" dog={dog.father.father.mother} />
              ) : (
                <div>
                  <p>Прабаба (Дід Батько) не визначена</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
            <div className="TreeElementDog">
              {dog.father?.mother?.father ? (
                <DogTreeElement name="Прадід (Баба Батько)" dog={dog.father.mother.father} />
              ) : (
                <div>
                  <p>Прадід (Баба Батько) не визначений</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
            <div className="TreeElementDog">
              {dog.father?.mother?.mother ? (
                <DogTreeElement name="Прабаба (Баба Батько)" dog={dog.father.mother.mother} />
              ) : (
                <div>
                  <p>Прабаба (Баба Батько) не визначена</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
            <div className="TreeElementDog">
              {dog.mother?.father?.father ? (
                <DogTreeElement name="Прадід (Дід Мати)" dog={dog.mother.father.father} />
              ) : (
                <div>
                  <p>Прадід (Дід Мати) не визначений</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
            <div className="TreeElementDog">
              {dog.mother?.father?.mother ? (
                <DogTreeElement name="Прабаба (Дід Мати)" dog={dog.mother.father.mother} />
              ) : (
                <div>
                  <p>Прабаба (Дід Мати) не визначена</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
            <div className="TreeElementDog">
              {dog.mother?.mother?.father ? (
                <DogTreeElement name="Прадід (Баба Мати)" dog={dog.mother.mother.father} />
              ) : (
                <div>
                  <p>Прадід (Баба Мати) не визначений</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
            <div className="TreeElementDog">
              {dog.mother?.mother?.mother ? (
                <DogTreeElement name="Прабаба (Баба Мати)" dog={dog.mother.mother.mother} />
              ) : (
                <div>
                  <p>Прабаба (Баба Мати) не визначена</p>
                  <img src={AddPicture} alt="Placeholder" className="DogPhoto" />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Tree;
