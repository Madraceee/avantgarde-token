import { useContract } from '@/hooks/contract';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Router from 'next/router';

function SendTransaction() {

  const {sendTokens,setBalanceOnDiffPage} = useContract();

  const [address,setAddress] = useState("");
  const [amount,setAmount] = useState(0);

  const accountAddress = useSelector(state=>state.wallet.address);
  useEffect(()=>{
    if(accountAddress===""){
      Router.push("./");
    }
  },[accountAddress]);

  useEffect(()=>{
    setBalanceOnDiffPage();
  },[]);

  return (
    <div className='background'>
      <Navbar />
      <div className='my-36 grid place-items-center'>
        <div className='flex flex-col w-80 md:w-96'>
          <input placeholder='Enter address' className='py-3 px-3 rounded-t-md border-b-2 border-black' value={address} onChange={(e)=>setAddress(e.target.value)}/>
          <input placeholder='Enter Amount to be sent' className='py-3 px-3 rounded-b-md' value={amount===0? "" : amount} onChange={(e)=>setAmount(e.target.value)}/>
          <button className='mt-5 bg-highlight text-textColor w-44 mx-auto rounded-md' onClick={()=>sendTokens(address,amount)}>Send Tokens</button>
        </div>
      </div>
      
    </div>
  )
}

export default SendTransaction
