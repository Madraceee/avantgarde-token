import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { abi,contractAddress } from "@/constants/contractConstants";
import { ethers } from "ethers";

const contractContext = createContext();

const ContractProvider = ({ children }) => {
    const signer = useSelector(state=>state.wallet.signer);
    const provider = useSelector(state=>state.wallet.provider);
    const address = useSelector(state=>state.wallet.address);

   


    const [balance,setBalance] = useState("0");
    const [erc20,setERC20] = useState(null);
    const [erc20_rw,setERC20_rw] = useState(null);

    useEffect(()=>{
        if(address.length!==0){
            setERC20(new ethers.Contract(contractAddress,abi,provider));
            setERC20_rw(new ethers.Contract(contractAddress,abi,signer));
        }
        else{
            setERC20(null);
            setERC20_rw(null);
            setBalance("0");
        }
        
    },[address])


    const checkAccount =(accountAddress)=>{
        return ethers.utils.isAddress(accountAddress);
    };

    const getBalance = useCallback(async (accountToBeChecked)=>{
        if(checkAccount(accountToBeChecked)===true){
            erc20.balanceOf(accountToBeChecked)
                .then((response) =>{
                    setBalance(ethers.utils.formatEther(response))
                })
                .catch(err=>console.log("Balance error:",err));
        }
        else{
            window.alert("Wrong address");
        }
        
    });

    const setBalanceOnDiffPage = useCallback( ()=>{
        setBalance("0");
    })

    const mint = useCallback(async (amount)=>{
        
        if(Number.isNaN(parseFloat(amount))===true){
            window.alert("Enter a valid number")
        }
        else{
            const power = ethers.BigNumber.from("1000000000000000000");
            const amountBigNumber = ethers.BigNumber.from(amount).mul(power)
            erc20_rw.mintForAddress(address,amountBigNumber)
                .then(response=>console.log("Success",response))
                .catch(err=>window.alert(err.code));
        }

        
        
    });

    const sendTokens = useCallback(async(receiverAddress,amount)=>{

        if(Number.isNaN(parseFloat(amount))===true){
            window.alert("Enter a valid number")
            return
        }

        const power = ethers.BigNumber.from("1000000000000000000");
        const amountBigNumber = ethers.BigNumber.from(amount).mul(power)

        if(checkAccount(receiverAddress)===true){
            erc20_rw.transfer(receiverAddress,amountBigNumber)
            .then(response=>console.log(response))
            .catch(err=>{
                console.log(err.error.data.message);
                window.alert(err.error.data.message);    
            });
        }
        else{
            window.alert("Wrong address");
        }
    })


    return (
        <contractContext.Provider value={{balance,getBalance,mint,sendTokens,setBalanceOnDiffPage}}>
        {children}
        </contractContext.Provider>
    );
};

export function useContract() {
  return useContext(contractContext);
}

export default ContractProvider