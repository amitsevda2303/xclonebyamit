import './App.css';
import FirstPage from './components/Auth/FirstPage';
import {BrowserRouter, Route,Routes} from "react-router-dom"

function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route expact path='/' element={<FirstPage/>}/>
      </Routes>
     {/* <FirstPage/> */}
    </div>
    </BrowserRouter>
    
  );
}

export default App;
