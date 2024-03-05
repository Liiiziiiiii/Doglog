import './App.css';
import { CreateAccount } from './components/CreateAccount';
import MyAcc from './components/MyAcc/MyAcc';
import MyAccount from './components/MyAccount/MyAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes >
        <Route exact path="/" element={<MyAcc />} />
        <Route exact path="/register" element={<CreateAccount />} />
        <Route exact path="/myaccount" element={<MyAccount />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
