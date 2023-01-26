import { useContract } from '@/hooks/contract';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Router from 'next/router';

function Mint() {

  const {mint,setBalanceOnDiffPage} = useContract();
  const [amount,setAmount] = useState("");

  const accountAddress = useSelector(state=>state.wallet.address);

  useEffect(()=>{
    setBalanceOnDiffPage();
  },[]);

  useEffect(()=>{
    if(accountAddress===""){
      Router.push("./");
    }
  },[accountAddress]);



  return (
    <div className='background'>
      <Navbar />
      <div className='grid place-items-center my-36'>
        <div className='flex flex-col'>
          <input placeholder='Enter no of tokens to mint' className='w-80 text-xl rounded-md text-center' onChange={(e)=>setAmount(e.target.value)}/>
          <button className='mx-auto my-2 bg-highlight text-textColor p-2 rounded-md' onClick={()=>mint(amount)}>Mint tokens</button>
        </div>
      </div>
        
    </div>
  )
}

export default Mint
