import React, { useState} from 'react';
import AddPicture from "../../images/add_picture.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlusIcon from "../../images/plus_icon.png"

import "./DogTreeElement"

const DogTreeElement = ({ name, dog }) => {
  if (!dog) return null;
  const [isAditionalInfoOpen, setIsAditionalInfoOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(0)

  const handleAdditionalInfoClick=()=>{
    setIsAditionalInfoOpen(true)
  }

  return (
    <div className="DogTreeElement">
      <h3>{name}</h3>
      <img 
        src={dog.photo ? dog.photo : AddPicture} 
        alt={dog.name || "Dog"} 
        className="AddPicture" 
      />
      <p>{dog.name}</p>

      <div onClick={handleAdditionalInfoClick} className='isAditionalInfoButton'>
          <img className='isAditionalInfoButton' src={PlusIcon}/>
      </div>

      {isAditionalInfoOpen 
      ? <div className='aditionalInfoWrapper'>
          <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
              isClearable
          />
          <div className='aditionalInfoInputWrapper'>
              <p>Екстер'єр:</p>
              <input className='aditionalInfoInput'>
              </input>
          </div>
          <div className='aditionalInfoInputWrapper'>
              <p>Дипломи:</p>
              <input className='aditionalInfoInput'>
              </input>
          </div>
          <div className='aditionalInfoInputWrapper'>
              <p>Власник:</p>
              <input className='aditionalInfoInput'>
              </input>
          </div>
          
      </div> : 
      <>
      </>
      }
    </div>
  );
};

export default DogTreeElement;
