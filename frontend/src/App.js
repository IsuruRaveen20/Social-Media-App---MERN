
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/home/Home'
import Auth from './pages/Auth/Auth';
import Profile from './pages/profile/Profile'

function App() {
  const result = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={result?<Navigate to='home'/>:<Navigate to='auth'/>}/>
          <Route path="/home" element={result?<Home/>:<Navigate to='../auth'/>}/>
          <Route path="/auth" element={result?<Navigate to='../home'/>:<Auth/>}/>

          <Route path='/profile/:id' element={result? <Profile/> : <Navigate to='../auth'/> } />
        </Routes>
    </div>
  );
}

export default App;
