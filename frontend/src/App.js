import './App.css';
import { CreateAccount } from './components/CreateAccount';
import LogIn from './components/LogIn/LogIn';
import MyAccount from './components/MyAccount/MyAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes >
        <Route exact path="/" element={<LogIn />} />
        <Route exact path="/register" element={<CreateAccount />} />
        <Route exact path="/myaccount" element={<MyAccount />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
