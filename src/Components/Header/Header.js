import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { authContext, firebaseContext } from '../../Context';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router';
function Header() {
  const {user} = useContext(authContext)
  const navigate = useNavigate();

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">

          {user ? (
            <>
              <span>{user}</span>
            </>
          ):(
            <>
              <span onClick={()=>{
                navigate('/login',{replace:true})
              }}>login</span>
              
            </>
          )}
         
         <hr />
        </div>
        <span className='logout' onClick={()=>{
          signOut(auth).then(()=>{
            //signout successfully
            navigate('/signup',{replace:true})
          }).catch((error)=>{
            console.log(error.message);
          })
        }}>{user && 'Logout'}</span>
        
        <div className="sellMenu" onClick={()=>{
          navigate('/create')
        }}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
