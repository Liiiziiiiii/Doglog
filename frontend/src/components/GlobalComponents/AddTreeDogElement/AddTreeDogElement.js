import "./AddTreeDogElement.css"
import AddPicture from "../../../images/add_picture.png"
import Dog from "../../Tree/DogModel";
import { useState } from "react";


export default function AddDogTreeElement({obj, onUpdate, name} ) {
    const [localObj, setLocalObject] = useState(obj)

    const handleChangeName = (e) =>{
        const updatedObject = {...localObj, name: e.target.value}
        setLocalObject(updatedObject)
        onUpdate(updatedObject);
    }

    const handleChangeId = (e) =>{
        const updatedObject = {...localObj, id: e.target.value}
        setLocalObject(updatedObject)
        onUpdate(updatedObject);
    }


  return (
    <div className="DogElement">
      {name}
      <div
        className="AddPicture"
      >
        <img className="AddPictureLogo" src={AddPicture}  />
      </div>
      <input type="text" className="Input" placeholder="Кличка" value={localObj.name} onChange={handleChangeName}/>
      <input type="text" className="IdInput" placeholder="Посилання на собаку" value={localObj.id} onChange={handleChangeId} />
    </div>
  );
}
