  import './App.css';
  import FirstPage from './components/Auth/FirstPage';
  import { Route,Routes} from "react-router-dom"
  import Modal from './components/Auth/Modal';
  import LoginModal from './components/Auth/LoginModal';
  import Homepage from './pages/Homepage';

  function App() {  
    return (
      <div className="appContainer">
          <div className='contentContainer'>
        <Routes>
          <Route path='/' element={<FirstPage/>}/>
          <Route path='/home' element={<Homepage/>}/>
          <Route path="/i/flow/signup" element={<Modal/>}/>
          <Route path='/i/flow/login' element={<LoginModal/>}/>
        </Routes>
          </div>
      </div>
    );
  }

  export default App;
