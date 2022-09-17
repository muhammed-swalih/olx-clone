import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { firebaseContext } from '../../Context';


import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {
    firbase,
    auth
  } = useContext(firebaseContext)
  const navigate = useNavigate();

  const handleLogin = (e) => {
      e.preventDefault();

      signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        const user = userCredential.user;
      }).then(()=>{
        navigate('/',{replace:true})
      }).catch((error)=>{
       alert(error.message);
      })
  }


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleLogin}>Login</button>
        </form>
        <a onClick={()=>{
          navigate('/signup')
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
