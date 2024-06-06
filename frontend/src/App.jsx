import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MyAccount from "./components/MyAccount/MyAccount";
import ObjectDog from "./components/ObjectDog/ObjectDog";
import AddDog from "./components/AddDog/AddDog";
import Footer from "./components/kjn/Footer";
import "./normalize.scss";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <MyAccount />
          <ObjectDog />
          <AddDog></AddDog>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
