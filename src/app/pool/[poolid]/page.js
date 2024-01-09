"use client"
import moment from "moment"
import { rpoolPage, rpoolDetailsPool,rnodeId } from "@/component/map/state"
import { useRecoilState, useRecoilValue } from "recoil"
import { useEffect, useState } from "react"
import { Loading, LoadingContainer } from "@/component/Loading"
import AMPie from "@/component/pie/AMPie"
import Poolpagefilter from "@/component/filters/Poolpagefilter"
import { risLoading,risLoadingContainer,risFilterChanged } from "@/component/chain/state"
import Recipientlist from "@/component/tables/Recipients"

function Pool({params}) {

    const [selectedNode, setSelectedNode] = useRecoilState(rnodeId)
    const [pool, setPool] = useRecoilState(rpoolPage)
    const poolDetails = useRecoilValue(rpoolDetailsPool)
    const [isLoading, setIsLoading] = useRecoilState(risLoading)
    const [isLoadingContainer, setIsLoadingContainer] = useRecoilState(risLoadingContainer)
    const [isFilterChanged, setIsFilterChanged] = useRecoilState(risFilterChanged)
    const [name,setName] = useState('')
    const [description, setDescription] = useState('')
    const [url,setURL] = useState('')
    const [pageDetails,setPageDetails] = useState({
        "profileId":'',
        "allocationStartTime":'',
        "allocationEndTime":'',
        "approvalThreshold":0,
        "maxRequestedAmount":0,
        "totalPool":0,
        "totalDistributedAmount":0,
        "totalApplications":0,
        "totalAccepted":0,
        "totalPending":0
    })

    useEffect(()=>{
        if(params.poolid !== ""){
            setSelectedNode(params.poolid)
        }

    },[])



    useEffect(() => {
        setPool(poolDetails)
    }, [poolDetails])
  
    useEffect(()=>{
      if(pool.nodes.length > 0){
        getMetaData()
        setPageDetails({
        "profileId":pool.nodes[0].pool.profile.profileId,
        "allocationStartTime":moment(new Date(pool.nodes[0].allocationStartTime *1000)).format('DD-MM-YYYY HH:mm:ss'),
        "allocationEndTime":moment(new Date(pool.nodes[0].allocationEndTime *1000)).format('DD-MM-YYYY HH:mm:ss'),
        "approvalThreshold":pool.nodes[0].approvalThreshold,
        "maxRequestedAmount":(pool.nodes[0].maxRequestedAmount/10e17) +' '+pool.generalInfo[0].tokenSymbol ,
        "totalPool":pool.generalInfo[0].totalPool +' '+pool.generalInfo[0].tokenSymbol,
        "totalDistributedAmount":pool.generalInfo[0].totalDistributedAmount +' '+pool.generalInfo[0].tokenSymbol,
        "totalApplications":pool.generalInfo[0].totalApplications,
        "totalAccepted":pool.generalInfo[0].totalAccepted,
        "totalPending":pool.generalInfo[0].totalPending  
        })
        
      } 
    },[pool])

    const getMetaData = async() => {
        try {
                const response = await fetch(`https://ipfs.io/ipfs/${pool.nodes[0].pool.metadataPointer}`)
                const result = await response.json()
                setName(result.name)
                setDescription(result.description)
                setURL(result.website)
                // console.log('result',result)
                setIsLoadingContainer(true)
                setIsFilterChanged(false)
              } catch (error) {
                setName("")
                setDescription("")
                setURL("")
                setIsLoadingContainer(true)
                setIsFilterChanged(false)
              }
            }

    const data = [
        {
            "id": "Accepted",
            "label": "Accepted",
            "value": pageDetails.totalAccepted,
            "color": "hsl(193, 70%, 50%)"
        },
        {
            "id": "Pending",
            "label": "Pending",
            "value": pageDetails.totalPending,
            "color": "hsl(5, 70%, 50%)"
        }
    ]

    return (
        <div>
            <Loading />
            <Poolpagefilter />
            <LoadingContainer />
            <div hidden={isFilterChanged}>
                <div className="row ps-4 pe-4  d-flex justify-content-evenly" >
                    <div className="col-lg-8 col-md-11 col-sm-11 col-11 p-1">
                        <div className="mb-1 row">
                            <span className="fs-3 text-start">{name}</span>
                        </div>
                        <div className="row mb-1 p-2">
                            <div>
                                <span className="fs-6 text-secondary fw-bolder"> Website:</span>
                                <a className="ms-1" href={url}>{url}</a>
                            </div>
                            <div className="mt-1">
                                <span className="fs-6 text-secondary fw-bolder"> Profile:</span>
                                <span className="ms-1 text-secondary fw-medium p-font-size">{pageDetails.profileId}</span>
                            </div>
                            <div className="row justify-content-between mt-1">
                                <div className="col-lg-6 col-sm-11 col-md-11 col-11">
                                    <div className="row">
                                        <div className="col-6">
                                            <span className="fs-6 text-secondary fw-bolder"> Start Time:</span>
                                        </div>
                                        <div className="col-6">
                                            <span className="ms-1 text-secondary fw-medium p-font-size">{pageDetails.allocationStartTime}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-11 col-md-11 col-11">
                                    <div className="row">
                                        <div className="col-6">
                                            <span className="fs-6 text-secondary fw-bolder"> End Time:</span>
                                        </div>
                                        <div className="col-6">
                                            <span className="ms-1 text-secondary fw-medium p-font-size">{pageDetails.allocationEndTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between mt-1">
                                <div className="col-lg-6 col-sm-11 col-md-11 col-11">
                                    <div className="row">
                                        <div className="col-6">
                                            <span className="fs-6 text-secondary fw-bolder">Approval Threshold:</span>
                                        </div>
                                        <div className="col-6">
                                            <span className="ms-1 text-secondary fw-medium p-font-size">{pageDetails.approvalThreshold}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-11 col-md-11 col-11">
                                    <div className="row">
                                        <div className="col-6">
                                            <span className="fs-6 text-secondary fw-bolder">Max Requested Amount:</span>
                                        </div>
                                        <div className="col-6">
                                            <span className="ms-1 text-secondary fw-medium p-font-size">{pageDetails.maxRequestedAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow p-60vh mt-4 me-1">
                                <div className="card-body overflow-y-auto">
                                <p className="text-start mt-2 text-secondary fw-medium text-wrap p-font-size">{description} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-11 col-sm-11 col-11 p-3">
                        <div className="row mb-1">
                            <div className="card shadow mb-2 rounded">
                                <div className="card-body text-start">
                                    <div className="mb-3 row">
                                        <div className="text-secondary fw-bolder">Statistics</div>
                                    </div>
                                    <div className="mb-3 row">
                                        <div className="col-sm-6">
                                            <div className="fw-ligh text-secondary">
                                                Pool Amount
                                            </div>
                                            <div className="d-flex flex-row mt-2 align-items-center">
                                                <div className="p-icon p-total-pool-bd">
                                                    <i className="bi bi-cash-coin fs-5 p-total-pool"></i>
                                                </div>
                                                <span className="text-secondary fw-bolder ms-3">{pageDetails.totalPool}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="fw-light text-secondary">
                                                Distributed Amount
                                            </div>
                                            <div className="d-flex flex-row mt-2 align-items-center">
                                                <div className="p-icon p-total-distibuted-bd">
                                                    <i className="bi bi-diagram-2-fill fs-5 p-total-distibuted"></i>
                                                </div>
                                                <span className="text-secondary fw-bolder ms-3">{pageDetails.totalDistributedAmount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="card shadow mb-3 rounded">
                                <div className="card-body text-start">
                                    <div className="mb-3 row">
                                        <div className="text-secondary fw-bolder">Application Status (Total: {pageDetails.totalApplications})</div>
                                    </div>
                                    <div style={{ "height": "40vh" }}>
                                        <AMPie data={data} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Recipientlist poolData={pool}/>
            </div>
        </div>

    )
}

export default Pool