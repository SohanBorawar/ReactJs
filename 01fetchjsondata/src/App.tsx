import React, { useState } from 'react';
import './App.css'
import Card from './component/Card/Card'
import Header from './component/Header/Header'
import fetchData from './util';
import { FC } from 'react';
function App () {
  const [data, setData] = useState([]);

  if(data.length === 0){
    fetchData().then(responseData => setData(responseData));
  }

  return (
    <>
      <Header/>
      <div className='card_container'>
        {
          data.map((cardDetails) => {
            return <Card details={cardDetails} />
          })
        }
      </div>
    </>
  );
}

export default App
