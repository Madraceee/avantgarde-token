import { Provider, useSelector, } from 'react-redux'
import ConnectWallet from './ConnectWallet'
import Menu from './Menu'


export default function Home() {
  const address = useSelector(state=>state.wallet.address);
  return (
    <>
    {!address && <ConnectWallet />}
    {address && <Menu />}
    </>
  )
}
