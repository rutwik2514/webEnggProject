import React from "react";
import Navbar from "../Elements/Navbars/Navbar";
import Header from "../Elements/Headers/Header";
import Feautres from "../Elements/feautres/Feautres";
import Homepagesignup from "../Elements/Homepagesignup/Homepagesignup";
import Footer from "../Elements/footer/footer";
function homepage() {
  return (
    <>
        <div className="gradient__bg">
          {/* Renders Components of Homepage before login */}
          <Navbar />
          <Header />
          <Feautres />
          <Homepagesignup />
          <Footer />
        </div>
    </>
  );
}

export default homepage;
{
}
