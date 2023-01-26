import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { getSigner,getProvider } from "@/transactions/transactions";
import store from "./store";
import { ethers } from "ethers";

const initialState = {
    address : "",
    signer: {},
    provider: {}
}

export const getNewSigner = createAsyncThunk('signer/getNewSigner',async ()=>{
    
    const reduxStore = store.getState();
    const provider = reduxStore.wallet.provider;
    
    if(Object.keys(provider).length === 0){
        window.alert("No wallet found");
        throw new Error("No wallet found");
    }
    else{
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const address = await signer.getAddress();

        return {
            signer,
            address
        };
    }
    
    
})

export const getNewProvider = createAsyncThunk('provider/getNewProvider',async ()=>{
    try{
        //If metamask is not there, then throw error
        if(!window.ethereum){
            throw new walletError("Install metamask");
        }

        // Connecting to metamask provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork()
        if(chainId === 31337){
            return provider;
        }
        else{
            window.alert("Change to localhost network");
        }

    }
    catch(err){
        console.error(err.message);
    }
})

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers:{
        clearAddress: (state)=>{
            state.address = "",
            state.signer = {}
        }
    },
    extraReducers: builder => {
        builder.addCase(getNewSigner.fulfilled,(state,action)=>{
            state.signer = action.payload.signer;
            state.address = action.payload.address;
        })
        builder.addCase(getNewSigner.rejected,(state,action)=>{
            state.signer = {};
        })
        builder.addCase(getNewProvider.fulfilled,(state,action)=>{
            if(action.payload!==undefined){
                state.provider = action.payload;
            }
            
        })
        builder.addCase(getNewProvider.rejected,(state)=>{
            state.provider = {};
        })
    }
})

export default walletSlice.reducer;
export const {clearAddress} = walletSlice.actions;