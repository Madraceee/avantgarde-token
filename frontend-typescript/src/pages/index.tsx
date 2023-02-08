import Head from 'next/head'
import type { RootState } from '@/redux/store'
import { Menu } from './Menu'
import { useSelector } from 'react-redux'
import ConnectWallet from './ConnectWallet'



export default function Home() {

  const address = useSelector((state: RootState)=>state.wallet.address);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="AvantGarde Token" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {address !== undefined ? (!address && <ConnectWallet />) : null}
      {address !== undefined ? (address && <Menu />) : null}
    </>
  )
}
