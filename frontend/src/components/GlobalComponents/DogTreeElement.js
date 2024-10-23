import React, { useState} from 'react';
import AddPicture from "../../images/add_picture.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlusIcon from "../../images/plus_icon.png"
import TextField from '@mui/material/TextField';

import "./DogTreeElement"
import "./DogTreeElementAddition.css"

const DogTreeElement = ({ name, dog }) => {
  if (!dog) return null;
  const [isAditionalInfoOpen, setIsAditionalInfoOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(0)

  const handleAdditionalInfoClick=()=>{
    setIsAditionalInfoOpen(!isAditionalInfoOpen)
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
          <img className='isAditionalInfoButtonImage' src={PlusIcon}/>
      </div>

      {isAditionalInfoOpen 
      ? <div className='aditionalInfoWrapper'>
          <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Оберіть дату"
              isClearable
              className='aditionalInfoDataPicker'
          />
          <div className='aditionalInfoInputWrapper'>
              <p>Екстер'єр:</p>
              <input 
                  className='aditionalInfoInput' 
                  type="text" 
                  placeholder="Екстер'єр"
              />
          </div>
          <div className='aditionalInfoInputWrapper'>
              <p>Дипломи:</p>
              <input 
                  className='aditionalInfoInput' 
                  type="file"
              />
          </div>
          <div className='aditionalInfoInputWrapper'>
              <p>Власник:</p>
              <input 
                  className='aditionalInfoInput' 
                  type="text" 
                  placeholder="Власник"
              />
          </div>
          
      </div> : 
      <>
      </>
}

    </div>
  );
};

export default DogTreeElement;
