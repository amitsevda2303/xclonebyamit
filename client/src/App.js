  import './App.css';
  import FirstPage from './components/Auth/FirstPage';
  import { Route,Routes} from "react-router-dom"
  import Modal from './components/Auth/Modal';
  import LoginModal from './components/Auth/LoginModal';
  import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './components/Home/EditProfile';
import Logout from './components/Auth/Logout';
import Badpage from './pages/BadPage';

  function App() {  
    return (
      <div className="appContainer">
          <div className='contentContainer'>
        <Routes>
          <Route path='/' element={<FirstPage/>}/>
          <Route path='/home' element={<Homepage/>}/>
          <Route path='/:id' element={<ProfilePage/>}/>
          <Route path="/i/flow/signup" element={<Modal/>}/>
          <Route path='/i/flow/login' element={<LoginModal/>}/>
          <Route path="/:id/edit" element={<EditProfile/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path='*' element={<Badpage/>}/>
        </Routes>
          </div>
      </div>
    );
  }

  export default App;
