import { createContext,useCallback,useContext,useEffect,useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {AvantgardeToken__factory} from "../contract/factories/AvantgardeToken__factory";
import {AvantgardeToken} from "../contract/AvantgardeToken";
import { ethers } from "ethers";
import { contractAddress } from "@/constants/contractAddress";


type contractInterface = {
    getBalance: (accountToBeChecked: string) => Promise<void>,
    balance : String,
    mint: (amount : string) => Promise<void>,
    setBalanceOnDiffPage: () => void,
    sendTokens: (receiverAddress : string,amount:string) => Promise<void>
}

const contractContext = createContext<contractInterface>({} as contractInterface);

const ContractProvider = ({children} : any) => {

    const signer = useSelector((state : RootState) => state.wallet.signer);
    const provider = useSelector((state: RootState) => state.wallet.provider);
    const address = useSelector((state : RootState) => state.wallet.address);

    const [balance,setBalance] = useState<String>("0");
    const [erc20,setERC20] = useState<AvantgardeToken>({} as AvantgardeToken);
    const [erc20_rw,setERC20_rw] = useState<AvantgardeToken>({} as AvantgardeToken);
    
    useEffect(()=>{
        if(address.length!==0){
            setERC20(AvantgardeToken__factory.connect(contractAddress.toString(),provider));
            setERC20_rw(AvantgardeToken__factory.connect(contractAddress.toString(),signer));
        }
        else{
            setERC20({} as AvantgardeToken);
            setERC20_rw({} as AvantgardeToken);
            setBalance("0");
        }
    },[address]);

    const checkAccount = ( accountAddress:string ) : boolean =>{
        return ethers.utils.isAddress(accountAddress);
    }

    const getBalance = useCallback(async(accountToBeChecked:string)=>{
        console.log("detect-network",await signer.getAddress())
        if(checkAccount(accountToBeChecked)){

            erc20.balanceOf(accountToBeChecked)
                .then((response : ethers.BigNumber)=>{
                    setBalance(ethers.utils.formatEther(response));
                })
                .catch(err=>console.log("Balance error:",err));
            console.log(balance)
        }
        else{
            window.alert("Wrong Address");
        }
    },[]);

    const setBalanceOnDiffPage = useCallback(()=>{
        setBalance("0");
    },[]);

    const mint = useCallback(async (amount: string) =>{
        if(Number.isNaN(parseFloat(amount))===true){
            window.alert("Enter a valid amount");
        }
        else{
            const power: ethers.BigNumber = ethers.BigNumber.from("1000000000000000000");
            const amountBigNumber = ethers.BigNumber.from(amount).mul(power);
            
            erc20_rw?.mintForAddress(address ,amountBigNumber)
                .then(response => console.log("Success",response));
        }
    },[]);

    const sendTokens = useCallback(async(receiverAddress : string,amount:string)=>{
        
        if(Number.isNaN(parseFloat(amount)===null)){
            window.alert("Enter a valid number");
            return;
        }

        const power : ethers.BigNumber = ethers.BigNumber.from("1000000000000000000");
        const amountBigNumber : ethers.BigNumber = ethers.BigNumber.from(amount).mul(power);

        if(checkAccount(receiverAddress)){
            erc20_rw.transfer(receiverAddress,amountBigNumber)
                .then(response => console.log(response))
                .catch(err=>{
                    console.log(err.error.data.message);
                    window.alert(err.error.data.message);
                });
        }
        else{
            window.alert("Wrong address");
        }

    },[]);

    return(
        <contractContext.Provider value={{balance,getBalance,mint,setBalanceOnDiffPage,sendTokens}}>
            {children}
        </contractContext.Provider>
    );

};

export function useContract(){
    return useContext(contractContext);
};

export default ContractProvider;
