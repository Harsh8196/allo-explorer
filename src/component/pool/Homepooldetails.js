import { useEffect, useState } from "react"
import moment from "moment"

export default function Homepooldetails({ poolDetails }) {
    const [poolName, setPoolName] = useState('')
    const [poolAmount, setPoolAmount] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [url, setURL] = useState()

    useEffect(() => {
        setPoolAmount(`${poolDetails.totalValue} ${poolDetails.tokenSymbol}`)
        setStartTime(moment(new Date(poolDetails.allocationStartTime * 1000)).format('DD-MM-YYYY HH:mm'))
        setEndTime(moment(new Date(poolDetails.allocationEndTime * 1000)).format('DD-MM-YYYY HH:mm'))
        setURL(`${window.location.origin}/pool/${poolDetails.id}`)
        fetch(`https://ipfs.io/ipfs/${poolDetails.metadataPointer}`)
            .then((res) => res.json())
            .then((result) => {
                setPoolName(result.name)
            })
            .catch((err) => {
                setPoolName("")
            })
        // getMetaData()
    }, [poolDetails])

    // const getMetaData = async () => {
    //     try {
    //         const response = await fetch(`https://ipfs.io/ipfs/${poolDetails.metadataPointer}`)
    //         const result = await response.json()
    //         setPoolName(result.name)
    //         // console.log('result',result)
    //     } catch (error) {
    //         setPoolName("")
    //     }
    // }
    return (
        <div className="card shadow mb-5 rounded">
            <div className="card-header text-start">
                Details
            </div>
            <div className="card-body text-start">
                <div className="row mb-1 align-items-center">
                    <label for="poolname" className="col-sm-5 col-form-label">Name</label>
                    <div className="col-sm-7">
                        <span type="text" className="form-control-plaintext text-wrap" >{poolName}</span>
                    </div>
                </div>
                <div className="row mb-1">
                    <label for="poolAmount" className="col-sm-5 col-form-label">Amount</label>
                    <div className="col-sm-7">
                        <input type="text" readOnly className="form-control-plaintext" id="poolAmount" value={poolAmount} />
                    </div>
                </div>
                <div className="row mb-1">
                    <label for="application" className="col-sm-5 col-form-label">Application</label>
                    <div className="col-sm-7">
                        <input type="text" readOnly className="form-control-plaintext" id="application" value={poolDetails.totalApplications} />
                    </div>
                </div>
                <div className="row mb-1">
                    <label for="approval" className="col-sm-5 col-form-label">Approval Threshold</label>
                    <div className="col-sm-7">
                        <input type="text" readOnly className="form-control-plaintext" id="approval" value={poolDetails.approvalThreshold} />
                    </div>
                </div>
                <div className="row mb-1">
                    <label for="startTime" className="col-sm-5 col-form-label">Start Time</label>
                    <div className="col-sm-7">
                        <input type="text" readOnly className="form-control-plaintext" id="startTime" value={startTime} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="endTime" className="col-sm-5 col-form-label">End Time</label>
                    <div className="col-sm-7">
                        <input type="text" readOnly className="form-control-plaintext" id="endTime" value={endTime} />
                    </div>
                </div>
                <div className="row mb-1">
                    <a href={url} className="btn btn-dark">More Details</a>
                </div>
            </div>
        </div>
    )
}