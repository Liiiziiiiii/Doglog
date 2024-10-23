import React, { useState} from 'react';
import AddPicture from "../../images/add_picture.png";

import "./DogTreeElement"
import "./DogTreeElementAddition.css"

const DogTreeElement = ({ name, dog }) => {
  if (!dog) return null;

  return (
    <div className="DogTreeElement">
      <h3>{name}</h3>
      <img 
        src={dog.photo ? dog.photo : AddPicture} 
        alt={dog.name || "Dog"} 
        className="AddPicture" 
      />
      <p>{dog.name}</p>
      <div className='aditionalInfoWrapper' style={{backgroundColor:"#C1CEB4", height: "150px", width:"200px"}}>
      <div className='aditionalInfoInputWrapper'>
          <p>{dog?.exterior}</p>
      </div>
      <div className='aditionalInfoInputWrapper'>
          <p>{dog?.diplomas}</p>
      </div>
      <div className='aditionalInfoInputWrapper'>
          <p>{dog?.owner}</p>
      </div>
    </div> 
    </div>
  );
};

export default DogTreeElement;
