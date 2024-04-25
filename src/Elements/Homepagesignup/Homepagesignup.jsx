import React from 'react'

function Homepagesignup() {
  function handleClick(){
    window.location.href = 'register'
  }
  return (
    <>
    <div className="cta pb-5" >
    <div className="cta-content">
      <h3>Register Today & start exploring the endless possibilities.</h3>
    </div>
    <div className="cta-btn">
      <button type="button" onClick={handleClick}>Get Started</button>
    </div>
  </div>
    </>
  )
}

export default Homepagesignup