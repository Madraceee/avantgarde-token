import store from '@/redux/store'
import '@/styles/output.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import ContractProvider from '@/hooks/contract'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ContractProvider>
        <Component {...pageProps} />
      </ContractProvider>      
    </Provider>
    
  )
}
