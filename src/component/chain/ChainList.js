"use client"
import { getNetworks } from '@/utility/networks';
import { rchainId } from './state';
import { selector } from 'recoil';

const Networks = getNetworks()
export const rchainList = selector({
    key:"rchainList",
    get:({get})=>{
        const selectedChain = get(rchainId)
        // console.log("Selection Changed")
        return(
            Object.keys(Networks).map((chain,index)=>{
                return (
                    <option key={index} value={chain} selected={Networks[chain].name === Networks[selectedChain].name}>{Networks[chain].name}</option>
                )
            })
        )
    }   
})