import { AppDispatch, RootState } from '@/redux/store';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { getNewProvider, getNewSigner } from '@/redux/wallet/walletSLice';

const ConnectWallet: FC =  ()=>{


    const address = useSelector((state : RootState) => state.wallet.address);
    const dispatch = useDispatch<AppDispatch>();

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
        <div className='background flex flex-col justify-center'>
            <h1 className='text-3xl mx-auto'>Connect to your metamask wallet</h1>
            <div>
                <button className='block bg-orange-500 mx-auto my-5 rounded-md' onClick={()=>dispatch(getNewSigner())}>
                    <span className='p-5 text-2xl' >Connect</span>
                </button>
            </div>
            
        </div>
    );
}


export default ConnectWallet