import './App.css'
import { useState } from 'react'
import * as SDK from './sdk/index'

function App() {

    const [contractAddress, setContractAddress] = useState('')
    const [tokenId, setTokenId] = useState('')
    const [nftSvg, setNFTSvg] = useState('')
    const connectWallet = async () => {
        try {
            const { ethereum } = window
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x138d4' }]
            })
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            if (accounts.length > 0) {
                getToken()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // 读取nft图片
    const getToken = async () => {
        try {
            const result = await SDK.GET_NFT_URI(contractAddress, tokenId)
            // Decode metadata in json format through base64
            const str = JSON.parse(atob(result.split(",")[1]))
            console.log(str)
            setNFTSvg(str.image)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="App">
            <div className='box'>
                <label>nft contract address:</label>
                <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
            </div>
            
            <div className='box'>
                <label>nft token id:</label>
                <input value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
            </div>

            <div>
                <button onClick={connectWallet}>Connect Wallet</button>
            </div>


            <div className='nft'>
                {
                    nftSvg ? <img src={nftSvg} alt="" width={242} height={402} /> : null
                }
            </div>
        </div>
    )
}

export default App
