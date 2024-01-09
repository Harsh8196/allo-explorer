import { useRecoilState, useRecoilValue } from "recoil";
import { rnodeId, rpool } from "../map/state";
import Homepooldetails from "../pool/Homepooldetails";
import Homeapplicationdetails from "../application/Homeapplidetails";
import { useEffect, useState } from "react";

function Homepagefilter() {

    const [selectedNode, setSelectedNode] = useRecoilState(rnodeId)
    const pooldetails = useRecoilValue(rpool)
    const [nodeOptions, setNodeOptions] = useState()
    const [nodeInformation, setNodeInformation] = useState()

    useEffect(()=>{
        if(pooldetails.nodes.length > 0) {
            setNodeOptions(NodeOptions)
        }

    },[pooldetails])

    useEffect(()=>{
        // console.log("Node",selectedNode)
        if(selectedNode !== ""){
            setNodeOptions(NodeOptions)
            getNodeDeatils()
        }

    },[selectedNode])


    function NodeOptions(){
        return (
            pooldetails.nodes.map((node, index) => {

                if (node.ispool === "1")
                    return (
                        <option key={index} value={node.name} selected={selectedNode === node.id}>Pool - {node.id}</option>
                    )
                else if (node.ispool === "0")
                    return (
                        <option key={index} value={node.name} selected={selectedNode === node.id}>Application - {node.id}</option>
                    )
            })
        )
    }

    function setPoolDeatils(poolDeatils){
        return(
            <Homepooldetails poolDetails={poolDeatils}/>
        )
    }

    function setApplicationDetails(applicationDetails){
        return(
            <Homeapplicationdetails applicationDetails={applicationDetails}/>
        )
    }

    function getNodeDeatils(){
        const selectedNodeDetails = pooldetails.nodes.filter(node => {return node.id === selectedNode})
        // console.log("selectedNodeDetails", selectedNodeDetails)
        if(selectedNodeDetails[0].ispool === "1"){
            setNodeInformation(setPoolDeatils(selectedNodeDetails[0]))
        }else if(selectedNodeDetails[0].ispool === "0"){

           let totalRequestedAmount = 0
           let totalDistributedAmount = 0 
           let status = ''
           let metadataPointer = ''
           let poolCount = 0
           let tokenSymbol
           const getAllPool = pooldetails.links.filter(link => {return link.target === selectedNode})
           getAllPool.forEach(pool => {
                const nodeData = pooldetails.nodes.filter(node => {return node.id === selectedNode && node.poolId === pool.source})
                // console.log('value',parseFloat(nodeData[0].totalValue))
                const value = parseFloat(nodeData[0].totalValue)
                totalRequestedAmount = totalRequestedAmount + value
                if(nodeData[0].status === "Accepted"){
                    totalDistributedAmount = totalDistributedAmount + value
                }
                status = nodeData[0].status
                metadataPointer = nodeData[0].metadataPointer
                tokenSymbol = nodeData[0].tokenSymbol
           })
           poolCount = getAllPool.length
           if(getAllPool.length > 1){
            status = "Mixed"
           }
           setNodeInformation(setApplicationDetails({
            "applicationId":selectedNode,
            "metadataPointer":metadataPointer,
            "totalRequestedAmount":totalRequestedAmount.toFixed(8),
            "totalDistributedAmount":totalDistributedAmount.toFixed(8),
            "status":status,
            "poolCount":poolCount,
            "tokenSymbol":tokenSymbol
           }))
        }
    }

    const onNodeSelection = (e) => {
        // console.log(e.target.value)
        setSelectedNode(e.target.value)

    }

    return (
        <div className="row mt-2">
        <div className="card shadow mb-3 rounded">
            <div className="card-header text-start">
                Filter
            </div>
            <div className="card-body text-start">
                <div className="mb-3">
                    <label htmlFor="inputState" className="form-label">Select Strategy</label>
                    <select id="inputState" className="form-select">
                        <option selected>MicroGrant</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputState" className="form-label">Select Pool</label>
                    <select id="inputState" className="form-select" onChange={onNodeSelection}>
                        <option selected></option>
                        {nodeOptions}
                    </select>
                </div>
            </div>
        </div>
        {
            nodeInformation
        }    
        </div>
    )

}

export default Homepagefilter