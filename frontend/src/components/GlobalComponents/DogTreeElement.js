import "./DogTreeElement.css"
import AddPicture from "../../images/add_picture.png"
import { useState } from "react";
import Dog from "../Tree/DogModel";


export default function DogTreeElement(props) {

  return (
    <div className="DogElement">
      {props.name}
      <div
        className="AddPicture"
        onClick={() => addParent("father", prompt("Ім'я батька"), Dog)}
      >
        <img className="AddPictureLogo" src={AddPicture} alt="Додати батька" />
      </div>
      Кличка: {props.dog ? props.dog : ""}
    </div>
  );
}
