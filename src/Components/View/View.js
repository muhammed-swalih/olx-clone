import React from 'react';
import './View.css';
import {useContext,useState,useEffect} from 'react'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { authContext } from '../../Context';




function View() {

  const [userDetails,setUserDetails] = useState()
  const item =  JSON.parse(localStorage.getItem('products'))
  const { userId} = useContext(authContext)
  useEffect(()=>{
    const colRef = collection(db,'user')
    const q =  query(colRef,where('id','==',userId))
    onSnapshot(q,(snapshot)=>{
      snapshot.docs.forEach((doc)=>{
        setUserDetails({...doc.data()})
      })
    })
  },[])
  
 
 console.log(userDetails);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={item.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {item.prize} </p>
          <span>{item.name}</span>
          <p>{item.category}</p>
          <span>{item.created}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails ? userDetails.username : 'loading...'}</p>
          <p>{userDetails ? userDetails.phone : 'loading...'}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
