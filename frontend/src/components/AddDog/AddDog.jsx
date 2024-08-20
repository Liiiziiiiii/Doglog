import React, { useState, useEffect } from "react";
import "./AddDog.scss";
import add_photo_icon from "../../images/add_photo_icon.png";
import Header from "../Header/Header";
import FooterReg from "../Footer/Footer";
import axios from "axios";
import AddDogTreeElement from "../GlobalComponents/AddTreeDogElement/AddTreeDogElement";
import { breeds } from '../listDogName';

const AddDog = ({ dog }) => {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    wool: "",
    dateBirth: "",
    sex: "",
    growth: 0,
    weight: 0,
    chip: "",
    mother: {
      name: "",
    },
    father: {
      name: "",
    },
  });

  useEffect(() => {
    if (dog) {
      setFormData(dog);
    }
  }, [dog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (updateObj) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updateObj,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "https://h4572thw-5254.euw.devtunnels.ms/api/Dog",
        formData
      );
      console.log("Response:", response);
      if (response.status === 201) {
        console.log("Added successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <Header />
      <div className="modal_add_dog">
        <form onSubmit={handleSubmit}>
          <div className="form_dog">
            <div className="image_dog">
              <button className="photo_dog">
                <img
                  className="add_photo_icon_dog"
                  src={add_photo_icon}
                  alt="add_photo_icon"
                />
              </button>
              <input type="file" accept="image/*" />
            </div>

            <div className="form_fields">
              <div className="firstDataCloumn">
                <div>
                  <input
                    className="basicInput"
                    placeholder="Кличка:"
                    type="text"
                    id="name_dog"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="wool_container">

                  <div className="wrapper">
                    <label htmlFor="breed_dog" className="gender_dog">
                      Порода:
                    </label>
                    <select
                      id="breed_dog"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                    >
                      <option value="">Виберіть породу</option>
                      {breeds.map((breed, index) => (
                        <option key={index} value={breed}>
                          {breed}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="wool_container">
                  <div className="wrapper">
                    <label className="gender_dog">Шерсть:</label>
                    <select
                      id="wool"
                      name="wool"
                      value={formData.wool}
                      onChange={handleChange}
                    >
                      <option value="">Виберіть шерсть</option>
                      <option value="short">Короткошерстий</option>
                      <option value="hard">Жорсткошерстий</option>
                      <option value="long">Довгошерстий</option>
                    </select>
                  </div>
                </div>
                <div>
                  <input
                    className="basicInput"
                    placeholder="Дата народження:"
                    type="date"
                    id="dob_dog"
                    name="dateBirth"
                    value={formData.dateBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="secondDataCloumn">
                <div className="wrapper">
                  <label className="gender_dog">Стать:</label>
                  <select
                    id="sex"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                  >
                    <option value="">Виберіть стать</option>
                    <option value="male">Чоловіча</option>
                    <option value="female">Жіноча</option>
                  </select>
                </div>
                <div className="wrapper">
                  <label className="height_dog">Зріст:</label>
                  <input
                    type="number"
                    id="height_dog"
                    name="growth"
                    placeholder="Введіть ріст в см"
                    value={formData.growth}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="wrapper">
                  <label className="weight_dog">Вага:</label>
                  <input
                    type="number"
                    id="weight_dog"
                    name="weight"
                    placeholder="Введіть вагу в кг"
                    value={formData.weight}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="wrapper">
                  <label className="number_dog">Чіп:</label>
                  <input
                    type="number"
                    id="number_dog"
                    name="chip"
                    placeholder="Введіть номер чипу (необов'язково)"
                    value={formData.chip}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="submit_button">
            Save
          </button>
        </form>
      </div>

      <div className="Tree">
        <div className="Parents">
          <div className="TreeElement">
            <AddDogTreeElement
              name="Батько"
              obj={formData.father}
              onUpdate={handleUpdate}
            />
          </div>
          <div className="TreeElement">
            <AddDogTreeElement
              name="Матір"
              obj={formData.mother}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
        <div className="Ancestors">
          <div className="TreeElement">
            <AddDogTreeElement
              name="Бабуся"
              obj={formData}
              onUpdate={handleUpdate}
            />
            <AddDogTreeElement
              name="Дідусь"
              obj={formData}
              onUpdate={handleUpdate}
            />
          </div>
          <div className="TreeElement">
            <AddDogTreeElement
              name="Бабуся"
              obj={formData}
              onUpdate={handleUpdate}
            />
            <AddDogTreeElement
              name="Дідусь"
              obj={formData}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
      <FooterReg />
    </>
  );
};

export default AddDog;
