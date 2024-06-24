import React, { useState } from "react";
import Dog from "./DogModel";
import "./Tree.css";
import AddPicture from "../../images/add_picture.png"


const Tree = ({ dog }) => {
  const [currentDog, setCurrentDog] = useState(dog);

  const addParent = (parentType, name) => {
    const newParent = new Dog(name);
    const updatedDog = { ...currentDog };
    updatedDog.parents[parentType] = newParent;
    setCurrentDog(updatedDog);
  };

  const renderDog = (dog, depth = 0) => {
    if (!dog) return null;

    return (
      <div className="Tree">
        <div className="TreeObject">Name: {dog.name} <img src={AddPicture}/></div>
        <div className="ObjectPair">
          <div>
          
          Father:{" "}
            {dog.parents.father ? dog.parents.father.name : "Add Father"}
          <div
            className="TreeObject"
            onClick={() => addParent("father", prompt("Father's name"))}
          >
            <img className="" src={AddPicture}/>
          </div>
          </div>
          
          <div>
          Mother:{" "}
              {dog.parents.mother ? dog.parents.mother.name : "Add Mother"}
            <div
              className="TreeObject"
              onClick={() => addParent("mother", prompt("Mother's name"))}
            >
              <img src={AddPicture}/>
            </div>
          </div>
        </div>

        {renderDog(dog.parents.father, depth + 1)}
        {renderDog(dog.parents.mother, depth + 1)}
      </div>
    );
  };

  return <div>{renderDog(currentDog)}</div>;
};

export default Tree;
