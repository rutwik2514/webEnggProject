import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  function handleRegisterClick(){
    window.location.href = 'register'
  }
  function handleClickLogin(){
    window.location.href = 'login'
  }
  function handlePredictionClick(){
    window.location.href = 'login'
  }

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <h3 style = {{color: 'white', paddingRight : '1vw',fontSize:'2.5rem',paddingLeft:'0.1rem',fontWeight:'bolder'}} id = 'logo'>PaperMarket</h3>
        </div>
        <div className="navbar-links_container">
        </div>
      </div>
      <div className="navbar-sign">
        <button type="button" onClick={handleClickLogin} className = 'mx-4' style={{borderRadius:'1.4rem',backgroundColor:'#5c11ac',color:'#efbdf4',fontWeight:'bold'}}>Login</button>
      </div>
      <div className="navbar-sign">
        <button type="button" onClick={handleRegisterClick} style={{borderRadius:'1.4rem',backgroundColor:'#5c11ac',color:'#efbdf4',fontWeight:'bold'}} >Sign up</button>
      </div>
      <div className="navbar-sign">
        <button type="button" onClick={handlePredictionClick} className = 'mx-4' style={{borderRadius:'1.4rem',backgroundColor:'#5c11ac',color:'#efbdf4',fontWeight:'bold'}}>Prediction Game</button>
      </div>
      {/* <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <p><a href="#home">Home</a></p>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            <p>Sign in</p>
            <button type="button">Sign up</button>
          </div>
        </div>
        )}
      </div> */}
    </div>
  );
};

export default Navbar;
