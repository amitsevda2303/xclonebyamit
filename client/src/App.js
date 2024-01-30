  import './App.css';
  import FirstPage from './components/Auth/FirstPage';
  import {BrowserRouter, Route,Routes} from "react-router-dom"
  import Modal from './components/Auth/Modal';
  import LoginModal from './components/Auth/LoginModal';
  import Homepage from './pages/Homepage';
  import { useEffect, useState } from 'react';
  import AsideBar from './components/AsideBar/AsideBar';

  function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
      const authToken = localStorage.getItem('authToken');
      setToken(authToken);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    

    
    return (
      <BrowserRouter>

      
      <div className="App">
          {token && <AsideBar/>}
        <Routes>
          <Route path='/' element={<FirstPage/>}/>
          <Route path='/home' element={<Homepage/>}/>
          <Route path="/i/flow/signup" element={<Modal/>}/>
          <Route path='/i/flow/login' element={<LoginModal/>}/>
        </Routes>
      </div>
      
      </BrowserRouter>
    );
  }

  export default App;
