import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';

import Auth from './Components/Auth';
import Dashboard from './Components/Dashboard';

function App() {
  return (
   <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='Registration' element={<Registration/>}/>
      <Route path='dash' element={<Auth><Dashboard/></Auth>}/>
    </Routes>
   </>
  );
}

export default App;
