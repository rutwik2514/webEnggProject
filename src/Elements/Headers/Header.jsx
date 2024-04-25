import React from "react";
import StockImage from '../../Assets/stock.svg'

const Header = () => (
  <div className="header section__padding" id="home" style={{paddingBottom: '9rem' , paddingTop: '2rem'}}>
    <div className="header-content p-5">
      <h1 className="gradient__text">Skill up and practice zero-risk trading on our free PaperMarket account.</h1>
      <p>
      New to trading and a bit hesitant? Our PaperMarket account is the perfect way to explore all of our instruments and test your trading strategies using entirely virtual funds - with none of the risk.
      </p>
    </div>

    <div className="header-image">
      <img src={StockImage} alt="" />
    </div>
  </div>
);

export default Header;
