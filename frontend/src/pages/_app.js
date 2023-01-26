import '@/styles/output.css'
import ContractProvider from '@/hooks/contract'
import { createContext } from 'react'
import { Provider } from 'react-redux'
import store from '@/redux/store'

// export const TempContext = createContext()

export default function App({ Component, pageProps }) {
  

  return (
    <Provider store={store}>
      <ContractProvider>
        <Component {...pageProps} />
      </ContractProvider>      
    </Provider>
  )  
}
