import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CreateAccount } from './components/CreateAccount';
import LogIn from './components/LogIn/LogIn';
import MyAccount from './components/MyAccount/MyAccount';
import AddDog from './components/AddDog/AddDog';
import TreeProvider from './components/Tree/TreeProvider';
import ListDogs from './components/ListDogs/ListDogs';
import ListNameDogs from './components/ListNameDogs/ListNameDogs';
import EditUserData from './components/EditUserData/EditUserData';
import PrivateRoutes from './components/PrivateRoutes';
import DogPage from './components/DogPage/DogPage';
import OwnerDogPage from './components/OwnerDogPage/OwnerDogPage';
import DogProfileView from './components/DogProfileView/DogProfileView';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/myaccount/:userId" element={<MyAccount />} />
            <Route exact path="/addDog" element={<AddDog />} />
            <Route exact path="/tree" element={<TreeProvider />} />
            <Route exact path="/list-dog" element={<ListDogs />} />
            <Route exact path="/list-name-dog" element={<ListNameDogs />} />
          </Route>
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/register" element={<CreateAccount />} />
          <Route path="/" element={<ListNameDogs />} />
          <Route path="/dogs/:breed" element={<ListDogs />} />
          <Route exact path="/edit-user-data/:userId" element={<EditUserData />} />
          <Route exact path="/dogpage/:dogId" element={<DogPage />} />
          <Route exact path="/ownerdogpage" element={<OwnerDogPage />} />
          <Route exact path="/dogpageview/:dogId" element={<DogProfileView />} />

        </Routes>
    </div>
  );
}

export default App;
