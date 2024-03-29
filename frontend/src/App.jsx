import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MyAccount from './components/MyAccount/MyAccount';
import ObjectDog from './components/ObjectDog/ObjectDog';
import MyAcc from './components/MyAcc/MyAcc';
import CreateAccount from './components/CreateAccount/CreateAccount';
import FooterReg from './components/FooterReg/FooterReg';
import ObjectDogElem from './components/ObjectDog/ObjectDogElem';
import Footer from './components/Footer/Footer';
import './normalize.scss';
import './App.scss'


const App = () => {

    return (
        <div className='App'>
            {/* <Header/>
            <CreateAccount/>
            <MyAcc/>
            <AddDog/>
            <FooterReg/> */}

        <Router>
            {/* <Routes>
            <Route path="/" element={<MyAcc />} />
            <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
        <FooterReg /> */}
            <div>
                <Header />
                <MyAccount />
                <ObjectDog />
            </div>
            <Footer />
        </Router>
        </div>
    );
}

export default App;
