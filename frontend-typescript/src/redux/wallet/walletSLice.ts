import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JsonRpcProvider, Provider } from "@ethersproject/providers";
import { ethers, Signer } from "ethers";
import store from "../store";


export type walletState = {
    address : String ,
    signer : Signer,
    provider: JsonRpcProvider,
    error : String | undefined
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

    if(provider === null){
        window.alert("No wallet found");
        return rejectWithValue("No wallet found");
    }
    else{
        // const walletAddress = await  window.ethereum?.request<String | undefined>({method: "eth_requestAccounts"})
        const signer : Signer = provider.getSigner();
        const signerAddress = await signer.getAddress();

        return {
            signer,
            signerAddress
        }
    }

});

export const getNewProvider = createAsyncThunk("provider/getNewProvider",async ( _ ,{rejectWithValue}) => {
    
    // console.log("hi")
    
    // const result = await ethers.utils.fetchJson("https://localhost:8545", '{ "id": 42, "jsonrpc": "2.0", "method": "eth_chainId", "params": [ ] }')
    // console.log(result);

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
