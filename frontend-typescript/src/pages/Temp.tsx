import  React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNewProvider } from '@/redux/wallet/walletSLice';
import { AppDispatch, RootState } from '@/redux/store';

export function Temp () {

    const wallet = useSelector((state : RootState) => state.wallet.provider)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(getNewProvider());
    },[]);


    return (
        <div>
            <h3>Hi</h3>
            <button onClick={()=>console.log(wallet)}>Provider</button>
            <button>Address</button>
        </div>
    );
}
