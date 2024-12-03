import { ethers } from 'ethers'
import NFT_ABI from './abi/stake_nft.abi.json'

const NFT_FACTORY_ADDRESS = '0x4F382327b1e8f36576Eba5dfED5ec41A3d2eC6e1'

export const getProvider = () => {
    let ethereum = window.ethereum
    return new ethers.BrowserProvider(ethereum)
}

export const GET_NFT_URI = async (contractAddress, tokenId) => {
    try {
        const provider = getProvider()
        const contract = new ethers.Contract(contractAddress || NFT_FACTORY_ADDRESS, NFT_ABI, await provider.getSigner())
        const result = await contract.tokenURI(tokenId)
        return Promise.resolve(result)
    } catch (error) {
        return Promise.reject(error)
    }
}
