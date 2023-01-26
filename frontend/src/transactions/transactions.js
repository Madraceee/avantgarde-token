import { ethers } from "ethers";

class walletError extends Error{
    constructor(message){
        super(message);
        this.name = "wallet Error"
    }
}

export const getProvider = ()=>{
    try{
        //If metamask is not there, then throw error
        if(!window.ethereum){
            throw new walletError("Install metamask");
        }

        // Connecting to metamask provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        return provider;
    }
    catch(err){
        console.error(err.message);
    }
}


export const getSigner = async (provider) =>{
    await provider.send("eth_requestAccounts",[]);
    const signer = provider.getSigner();
    return signer;
}


