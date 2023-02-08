import React,{ FC,useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
import { useContract } from "@/hooks/contract";


const Balance: FC =  ()=>{


    const {balance,getBalance} = useContract();
    const [address,setAddress] = useState<string>("");
    const accountAddress = useSelector((state: RootState)=>state.wallet.address);

    

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
                  <button className='text-textColor bg-highlight mt-2 rounded-lg px-5 md:rounded-l-none' onClick={()=>setAddress(accountAddress.toString())}>Account Address</button>
                </div>            
                <button className='text-textColor bg-highlight rounded-lg mt-5 min-w-xl mx-auto' onClick={()=>getBalance(address)}>
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