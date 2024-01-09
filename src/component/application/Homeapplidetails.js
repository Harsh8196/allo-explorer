import { useEffect,useState } from "react"

export default function Homeapplicationdetails({applicationDetails}) {
    const [applicationName,setApplicationName] = useState('')
    const [url,setURL] = useState()
    const [requestedAmount,setRequestedAmount] = useState('')
    const [distibutedAmount,setDistibutedAmount] = useState('')

    useEffect(()=>{
        fetch(`https://ipfs.io/ipfs/${applicationDetails.metadataPointer}`)
        .then(res=>res.json())
        .then(result=>{
            setApplicationName(result.name)  
        }).catch(err=>{
            setApplicationName("")
        })
        // getMetaData()
        setURL(`${window.location.origin}/application/${applicationDetails.applicationId}`)
        setRequestedAmount(`${applicationDetails.totalRequestedAmount} ${applicationDetails.tokenSymbol}`)
        setDistibutedAmount(`${applicationDetails.totalDistributedAmount} ${applicationDetails.tokenSymbol}`)
    },[applicationDetails])

    // const getMetaData = async() => {
    //     try {
    //             const response = await fetch(`https://ipfs.io/ipfs/${applicationDetails.metadataPointer}`)
    //             const result = await response.json()
    //             setApplicationName(result.name)
    //             // console.log('result',result)
    //           } catch (error) {
    //             setApplicationName("")
    //           }
    // }
    return(
        <div className="card shadow mb-5 rounded">
                <div className="card-header text-start">
                  Details
                </div>
                <div className="card-body text-start">
                  <div className="row mb-1 align-items-center">
                    <label for="applicationname" className="col-sm-5 col-form-label">Name</label>
                    <div className="col-sm-7">
                      <span className="form-control-plaintext text-wrap">{applicationName}</span>
                    </div>
                  </div>
                  <div className="row mb-1">
                    <label for="totalpool" className="col-sm-5 col-form-label">Total Pool</label>
                    <div className="col-sm-7">
                      <input type="text" readOnly className="form-control-plaintext" id="totalpool" value={applicationDetails.poolCount} />
                    </div>
                  </div>
                  <div className="row mb-1">
                    <label for="requested" className="col-sm-5 col-form-label">Requested</label>
                    <div className="col-sm-7">
                      <input type="text" readOnly className="form-control-plaintext" id="requested" value={requestedAmount} />
                    </div>
                  </div>
                  <div className="row mb-1">
                    <label for="distributed" className="col-sm-5 col-form-label">Distributed</label>
                    <div className="col-sm-7">
                      <input type="text" readOnly className="form-control-plaintext" id="distributed" value={distibutedAmount} />
                    </div>
                  </div>
                  <div className="row mb-1">
                    <label for="status" className="col-sm-5 col-form-label">Status</label>
                    <div className="col-sm-7">
                      <input type="text" readOnly className="form-control-plaintext" id="status" value={applicationDetails.status} />
                    </div>
                  </div>
                  <div className="row mb-1">
                    <a href={url} className="btn btn-dark">More Details</a>
                  </div>
                </div>
              </div>
    )
}