import { useContract } from '@/hooks/contract';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';

function Balance() {

  const {balance,getBalance} = useContract();
  const [address,setAddress] = useState("");
  const accountAddress = useSelector(state=>state.wallet.address);

  useEffect(()=>{
    if(accountAddress===""){
      Router.push("./");
    }
  },[accountAddress]);


  return (
    <div className='background text-xl'>
      <Navbar />
      <div className="w-full grid place-items-center text-center">
        <div>
          <div className='flex flex-col mt-36 py-10 justify-center'>
            <div>
              <input placeholder='Enter address' 
                    className='block px-2 rounded-lg sm:w-80 md:w-96 md:inline-block md:rounded-r-none lg:w-address' 
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
              />
              <button className='text-textColor bg-highlight mt-2 rounded-lg px-5 md:rounded-l-none' onClick={()=>setAddress(accountAddress)}>Account Address</button>
            </div>            
            <button className='text-textColor bg-highlight rounded-lg mt-5 min-w-xl mx-auto' onClick={()=> getBalance(address)}>
              <span className='px-5 max-w-xl'>Check Balance</span>
            </button>
          </div>
          <h3 className='text-highlight text-3xl'>{balance} Tokens</h3>
        </div>        
      </div>
    </div>
  )
}

export default Balance
