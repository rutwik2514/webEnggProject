import React from 'react';
import Feature from './Feautre';

const featuresData = [
  {
    title: 'AI Prediction Model',
  },
  {
    title: 'True to real trading',
  },
  {
    title: 'Build and test your strategies',
  },
  {
    title: 'Get to know your trading platform',
  },
];

const Features = () => (
  <div className="d-flex justify-content-space-around" style={{width: '100vw'}} id="features ">
    <div className="">
      <h3 className="gradient__text col-md-7" style = {{ fontSize : '30px', paddingLeft : '2vw'}}>The Future is Now and You Just Need to Realize It. Step into Future Today. & Make it Happen.</h3>
    </div>
    <div className=" d-flex col-md-5" >
      {featuresData.map((item, index) => (
        <Feature title={item.title}key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
