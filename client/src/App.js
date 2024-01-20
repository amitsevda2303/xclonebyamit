import './App.css';
import FirstPage from './components/Auth/FirstPage';
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Modal from './components/Auth/Modal';
import Context from './context/Context';
import LoginModal from './components/Auth/LoginModal';

function App() {
  return (
    <Context>

    <BrowserRouter>
    <div className="App">
    <FirstPage/>
      <Routes>
        <Route path="/i/flow/signup" element={<Modal/>}/>
        <Route path='/i/flow/login' element={<LoginModal/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    
    </Context>
  );
}

export default App;
