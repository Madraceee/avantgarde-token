import React, { FC, useState } from 'react';
import Link from 'next/link';
import store, { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearAddress } from '@/redux/wallet/walletSLice';


const Navbar: FC =  ()=>{

    const address = useSelector((state:RootState)=>state.wallet.address)
    const dispatch = useDispatch();
    const [accountOptions,setAccountOptions] = useState<boolean>(false);
    const [sideOptions,setSideOptions] = useState<boolean>(false)
    return (
        <div className='text-highlight text-2xl font-semibold h-20 border-b-4 '>
            <div className='flex flex-row justify-between px-8 py-5'> 
                <ul className={'flex flex-col z-10 md:block md:bg-inherit md:text-highlight '+ (sideOptions?"bg-highlight text-textColor top:0" : "")}>
                    <li className={"md:border-b-0 "+(sideOptions? "block border-b-2": "")}>
                        <button className='md:hidden my-auto' onClick={()=>setSideOptions(!sideOptions)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                        </button>
                    </li>
                    <li className={'navBarBtn '+(sideOptions? "inline-block w-56 py-1 border-b-2" : "hidden")}><button><Link href="./Balance">Balance</Link></button></li>
                    <li className={'navBarBtn '+(sideOptions? "inline-block w-56 py-1 border-b-2" : "hidden")}><button><Link href="./SendTransaction">Send</Link></button></li>
                    <li className={'navBarBtn '+(sideOptions? "inline-block w-56 py-1 border-b-2" : "hidden")}><button><Link href="./Mint">Mint</Link></button></li>
                </ul>
                <div className='max-w-xs text-right group rounded-md overflow-hidden' onMouseEnter={()=>setAccountOptions(true)} onMouseLeave={()=>setAccountOptions(false)}>
                    <h3 className='block px-4 lg:px-8 pb-2 group-hover:bg-highlight group-hover:text-textColor group-hover:border-b-2'><button onClick={()=>console.log(store.getState()) } >Account</button></h3>
                    {accountOptions && <h3 className='px-8 break-words py-2 bg-highlight text-textColor border-b-2'>Address:{address}</h3> }
                    {accountOptions && <h3 className='px-8 bg-highlight text-textColor py-2'><button onClick={()=>dispatch(clearAddress())}>Log Out</button></h3> }
                </div>
            
            </div>
        </div>
    );
}

export default Navbar