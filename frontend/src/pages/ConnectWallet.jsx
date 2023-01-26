import React, { useEffect } from 'react'
import { getNewProvider, getNewSigner } from '@/redux/walletSlice'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store';
import Router from 'next/router';

function ConnectWallet() {

  const address = useSelector(state=>state.wallet.address);
  const dispatch = useDispatch();


  useEffect(()=>{
    if(address.length!==0){
      Router.push("./Menu");
    }
    else{
      Router.push("./");
    }
  },[address]);

  useEffect(()=>{
    dispatch(getNewProvider());
  },[]);

  return (
    <div className="background flex flex-col justify-center">
        <h1 className='text-3xl mx-auto'>Connect to your metamask wallet</h1>
        <div >   
            <button className='block bg-orange-500 mx-auto my-5 rounded-md' onClick={()=>{
              dispatch(getNewSigner());
              }}>
              <span className='p-5 text-2xl'>Connect</span>
            </button> 
        </div>
            
    </div>
  )
}

export default ConnectWallet
