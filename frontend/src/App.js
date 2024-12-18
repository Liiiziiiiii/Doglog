import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CreateAccount } from './components/CreateAccount';
import LogIn from './components/LogIn/LogIn';
import MyAccount from './components/MyAccount/MyAccount';
import AddDog from './components/AddDog/AddDog';
import Tree from './components/Tree/Tree';
import ListDogs from './components/ListDogs/ListDogs';
import ListNameDogs from './components/ListNameDogs/ListNameDogs';
import EditUserData from './components/EditUserData/EditUserData';
import DogPage from './components/DogPage/DogPage';
import OwnerDogPage from './components/OwnerDogPage/OwnerDogPage';
import DogProfileView from './components/DogProfileView/DogProfileView';
import AddDogNode from './components/DogTree/AddDogNode';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/myaccount/:userId" element={<MyAccount />} />
          <Route exact path="/add" element={<AddDogNode />} />
          <Route exact path="/addDog" element={<AddDog />} />
          <Route exact path="/tree/:dogId" element={<Tree />} />
          <Route exact path="/list-dog" element={<ListDogs />} />
          <Route exact path="/list-name-dog" element={<ListNameDogs />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/register" element={<CreateAccount />} />
          <Route path="/" element={<ListNameDogs />} />
          <Route path="/dogs/:breed" element={<ListDogs />} />
          <Route exact path="/edit-user-data/:userId" element={<EditUserData />} />
          <Route exact path="/dogpage/:dogId" element={<DogPage />} />
          <Route exact path="/ownerdogpage" element={<OwnerDogPage />} />
          <Route exact path="/dogpageview/:dogId" element={<DogProfileView />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;