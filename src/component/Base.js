"use client"
import Link from 'next/link';
import { rchainId ,risLoading} from './chain/state';
import { rchainList } from './chain/ChainList';
import { apipoolDetails } from './map/state';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';



function Base() {

    const [chainId,SetChainId] = useRecoilState(rchainId)
    const [poolDetails,setPoolDeatils]= useRecoilState(apipoolDetails)
    const [isLoading,setIsLoading] = useRecoilState(risLoading)

    useEffect(()=>{
        getPoolDetails(chainId)
    },[chainId])

    const getPoolDetails = async function(chainId){
        setIsLoading(false)
        const response = await fetch(`${window.location.origin}/api/pool`,{
                            method:"POST",
                            body:JSON.stringify({"chainId":chainId.toString(),"poolId":""})
                        })
        const result = await response.json()
        setPoolDeatils(result.poolDetails)
        // console.log("pool details",result.poolDetails)
    }

    const onChainSelection = async (e)=>{
        // console.log(e.target.value)
        SetChainId(e.target.value)
        //await getPoolDetails(e.target.value)
    }

    const ChainList = function() {
        const chainList = useRecoilValue(rchainList)
        return chainList
    }

    return (
        <nav className="navbar navbar-expand-lg header1 sticky-top" >
            <div className="container-fluid">
                <Link className="navbar-brand text-white" href='/'>Allo Explorer</Link>
                <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-list text-white"></i>
                </button>
                <div className="collapse navbar-collapse flex" id="navbarToggler">
                    <ul className="navbar-nav col-10 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-white" aria-current="page" href='/pool'>Pool</Link>
                        </li>
                    </ul>
                    <select className="form-select" onChange={onChainSelection}>
                        <ChainList/>
                    </select>
                </div>
            </div>
        </nav>
    )
}

export default Base