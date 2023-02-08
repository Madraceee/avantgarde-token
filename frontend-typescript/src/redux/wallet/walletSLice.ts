import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JsonRpcProvider, Provider } from "@ethersproject/providers";
import { ethers, Signer } from "ethers";
import store from "../store";


export type walletState = {
    address : string ,
    signer : Signer,
    provider: JsonRpcProvider,
    error : string | undefined
}

const initialState : walletState = {
    address: "",
    signer: {} as Signer,
    provider: {} as JsonRpcProvider ,
    error: ""
}


export const getNewSigner = createAsyncThunk("signer/getNewSigner",async (_,{rejectWithValue})=>{

    const reduxStore = store.getState();
    const provider = reduxStore.wallet.provider;

    if(Object.keys(provider).length === 0){
        window.alert("No wallet found");
        return rejectWithValue("No wallet found");
    }
    else{
        await provider.send("eth_requestAccounts", []);
        const signer : Signer = provider.getSigner();
        const signerAddress = await signer.getAddress();

        console.log(signer)

        return {
            signer,
            signerAddress
        }
    }

});

export const getNewProvider = createAsyncThunk("provider/getNewProvider",async ( _ ,{rejectWithValue}) => {
    
    const provider: Provider | null = new ethers.providers.Web3Provider(window.ethereum,"any");
    if(provider){
        const chainID = await window.ethereum?.request({method:'eth_chainId'});
        if(chainID!=="0x7a69"){
            window.alert("Change to localhost");
            return rejectWithValue("Wrong chain Id");
        }
        console.log(provider)
        return provider;
    }
    else{
        return rejectWithValue("No Provider");
    }
})


const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        clearAddress : (state)=>{
            state.address = "";
            state.signer = {} as Signer;
        }
    },
    extraReducers : builder =>{
        builder.addCase(getNewProvider.fulfilled,(state,action)=>{
            state.provider = action.payload;
        });
        builder.addCase(getNewProvider.rejected,(state,action)=>{
            state.provider = {} as JsonRpcProvider;
            state.signer = {} as Signer;
            state.error = action.error.message;
        });
        builder.addCase(getNewSigner.fulfilled,(state,action)=>{
            state.signer = action.payload.signer;
            state.address = action.payload.signerAddress;
        })
    }
    
})


export default walletSlice.reducer;
export const { clearAddress } = walletSlice.actions;
