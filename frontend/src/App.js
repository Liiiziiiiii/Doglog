import './App.css';
import { CreateAccount } from './components/CreateAccount';
import LogIn from './components/LogIn/LogIn';
import MyAccount from './components/MyAccount/MyAccount';
import AddDog from './components/AddDog/AddDog';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tree from './components/Tree/Tree';
import Dog from './components/Tree/DogModel';

const rootDog = new Dog("Lucky")

function App() {
  return (
    <div className="App">
      <Router>
        <Routes >
        <Route exact path="/" element={<LogIn />} />
        <Route exact path="/register" element={<CreateAccount />} />
        <Route exact path="/myaccount/:userId" element={<MyAccount />} />
        <Route exact path="/addDog" element={<AddDog />} />
        <Route exact path="/tree/:userId" element={<Tree dog={rootDog}/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
