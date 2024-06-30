import React, { useState } from "react";
import Dog from "./DogModel";
import "./Tree.css";
import DogTreeElement from "../GlobalComponents/DogTreeElement";

const Tree = () => {

  const [dog, setDog] = useState(new Dog("Lucky", "Rosa", "John","Pyshunka",  "Jula","Bobik", "Kokosik"));

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
