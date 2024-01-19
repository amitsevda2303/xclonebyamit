import './App.css';
import FirstPage from './components/Auth/FirstPage';
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Modal from './components/Auth/Modal';

function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
    <FirstPage/>
      <Routes>
        <Route path="/i/flow" element={<Modal/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
