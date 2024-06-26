import React, { useState, useEffect} from "react";
import Dog from "./DogModel";
import "./Tree.css";
import DogTreeElement from "../GlobalComponents/DogTreeElement";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { date } from "yup";


const Tree = () => {

  const {userId} = useParams();
  const navigate = useNavigate();

  const [dog, setDog] = useState(new Dog("Lucky", "Rosa", "John","Pyshunka",  "Jula","Bobik", "Kokosik"));

  useEffect(() => {
    const fetchData = async () => { 
        try {
            const response = await axios.get(`https://wq9h4qjf-5254.euw.devtunnels.ms/api/DogDetails/dog-with-parents/${userId}`); 
            console.log('Response:', response);
            const dogData = response.data
            setDog(prevState => ({...prevState, father:dogData.father, mother:dogData.mother.name}))
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchData(); 
}, [userId, navigate]);


    return (
      <div className="Tree">
        <div className="Parents">
          <div className="TreeElement">
            <DogTreeElement name="Батько" dog={dog.father} ></DogTreeElement>
          </div>
          <div className="TreeElement">
            <DogTreeElement name="Матір" dog={dog.mother}></DogTreeElement>
          </div>
        </div>
        <div className="Ancestors">
          <div className="TreeElement">
            <DogTreeElement name="Бабуся" dog={dog.grandmaMa}></DogTreeElement>
            <DogTreeElement name="Дідусь" dog={dog.grandmaFa}></DogTreeElement>
          </div>
          <div className="TreeElement">
            <DogTreeElement name="Бабуся" dog={dog.grandadMa}></DogTreeElement>
            <DogTreeElement name="Дідусь" dog={dog.grandadFa}></DogTreeElement>
          </div>
        </div>
      </div>
    );
  };


export default Tree;
