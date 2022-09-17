
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import {db} from '../../firebase'
import react from 'react';
import {useState,useContext} from 'react'
import { firebaseContext } from '../../Context';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { useNavigate } from 'react-router';





export default function Signup() {

  const navigate = useNavigate();
  const {
    firebase,
    auth,
    
  } = useContext(firebaseContext)
  const [userName,setUserName] = useState('');
  const [email,setEmail]= useState('');
  const [password,setPassword] = useState('')
  const [phone,setPhone] = useState('')
  
  const handleSubmit =  (e) =>{
      e.preventDefault();
      console.log(firebase);
       createUserWithEmailAndPassword(auth,email,password).then((result)=>{
            addDoc(collection(db, 'user'),{
            id : result.user.uid,
            username : userName,
            phone : phone,
            created : Timestamp.now()
          }).then((res)=>{
            console.log('data succesfully added');
          }).catch((error)=>{
            alert(error.message);
          })
         }).then(()=>{
           updateProfile(auth.currentUser,{
              displayName : userName
           }).then((res)=>{
             console.log('displayName updated!');
           }).catch((error)=>{
             alert(error.message)
           })
         }).then(()=>{
            navigate('/login',{replace:true})
         })
         
      }
     
  
  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button onClick={handleSubmit}>Signup</button>
        </form>
        <a onClick={()=>{
          navigate('/login')
        }}>Login</a>
      </div>
    </div>
  );
}
