import React, { useState } from 'react'
import Balance from './Balance';
import SendTransaction from './SendTransaction';
import Mint from './Mint';
import Navbar from './components/Navbar';

function Menu() {
   
  return (
    <div className='background absolute'>
      <Navbar />
    </div>  
    
  )
}

export default Menu
