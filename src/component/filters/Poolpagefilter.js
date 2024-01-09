import { useRecoilState, useRecoilValue } from "recoil";
import { rnodeId, rpool, apipoolPageDetails, apipoolDetails, rpoolDetails } from "../map/state";
import { useEffect, useState } from "react";
import { risLoading, rchainId, risLoadingContainer, risFilterChanged } from "../chain/state";

export default function Poolpagefilter() {

    const [poolForFilter, setPoolForFilter] = useRecoilState(rpool)
    const [selectedNode, setSelectedNode] = useRecoilState(rnodeId)
    const pooldetailsForFilter = useRecoilValue(rpoolDetails)
    const chainId = useRecoilValue(rchainId)
    const [nodeOptions, setNodeOptions] = useState()
    const [isLoading, setIsLoading] = useRecoilState(risLoading)
    const [isLoadingContainer, setIsLoadingContainer] = useRecoilState(risLoadingContainer)
    const [poolDetails, setPoolDeatils] = useRecoilState(apipoolPageDetails)
    const [isFilterChanged, setIsFilterChanged] = useRecoilState(risFilterChanged)

    useEffect(() => {
        setPoolForFilter(pooldetailsForFilter)
    }, [pooldetailsForFilter])

    useEffect(() => {
        if (poolForFilter.nodes.length > 0) {
            setNodeOptions(NodeOptions)
            setIsLoading(true)
        }

    }, [poolForFilter])

    useEffect(() => {
        // console.log("Node", selectedNode)
        if (selectedNode !== "") {
            getPoolDetails()
            NodeOptions()
        }

    }, [selectedNode])


    function NodeOptions() {
        return (
            pooldetailsForFilter.nodes.map((node, index) => {

                if (node.ispool === "1")
                    return (
                        <option key={index} value={node.name} selected={selectedNode === node.id}>Pool - {node.id}</option>
                    )
            })
        )
    }

    const onNodeSelection = async (e) => {
        // console.log(e.target.value)
        setSelectedNode(e.target.value)
        setIsFilterChanged(true)
        setIsLoadingContainer(false)

    }

    const getPoolDetails = async function () {
        const response = await fetch(`${window.location.origin}/api/pool`, {
            method: "POST",
            body: JSON.stringify({ "chainId": chainId.toString(), "poolId": selectedNode.toString() })
        })
        const result = await response.json()
        setPoolDeatils(result.poolDetails)
        // console.log("pool details",result.poolDetails)
    }

    return (
        <div hidden={!isLoading}>
            <div className="row ps-4 pe-2 mt-2 d-flex justify-content-between">
                <div className="col-lg-5 col-md-11 col-sm-11 col-11 m-1">
                    <div className="row mb-1">
                        <label htmlFor="Strategy" className="col-sm-4 col-form-label fw-bolder text-secondary">Strategy</label>
                        <div className="col-sm-8">
                            <select id="Strategy" className="form-select">
                                <option selected>MicroGrant</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-11 col-sm-11 col-11 m-1">
                    <div className="row mb-1">
                        <label htmlFor="pool" className="col-sm-4 col-form-label fw-bolder text-secondary">Select Pool</label>
                        <div className="col-sm-8">
                            <select id="pool" className="form-select" onChange={onNodeSelection}>
                                <option selected>Select Pool</option>
                                <NodeOptions />
                            </select>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}