import React from 'react';
import AddPicture from "../../images/add_picture.png";
import "./DogTreeElement"

const DogTreeElement = ({ name, dog }) => {
  if (!dog) return null;

  //console.log("Dog photo URL:", dog.photo);

  return (
    <div className="DogTreeElement">
      <h3>{name}</h3>
      <img 
        src={dog.photo ? dog.photo : AddPicture} 
        alt={dog.name || "Dog"} 
        className="AddPicture" 
      />
      <p>{dog.name}</p>
    </div>
  );
};

export default DogTreeElement;
