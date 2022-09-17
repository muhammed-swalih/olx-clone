import React, { useContext, useEffect } from 'react';
import './App.css';

import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Components/Create/Create';
import {BrowserRouter as Router ,Route ,Routes} from 'react-router-dom'


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { authContext, firebaseContext } from './Context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import ViewPost from './Pages/ViewPost'

function App() {
  const {setUser,setUserId} = useContext(authContext)
  
  useEffect(()=>{
    onAuthStateChanged(auth ,(user)=>{
      setUser(user.displayName)
      setUserId(user.uid)
    })
  },[])
  return (
  <div>
     
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>} ></Route>
                <Route  path='/signup' element={<Signup/>} ></Route>
                <Route  path='/login' element={<Login/>}></Route>
                <Route  path='/create' element={<Create/>}></Route>
                <Route  path='/view' element={<ViewPost/>}></Route>
            </Routes>
        </Router>   
      
  </div>
    
  );
}

export default App;
