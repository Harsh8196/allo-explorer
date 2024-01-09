import { useEffect, useState } from "react"
import moment from "moment"


export default function Recipientlist({ poolData }) {

    const [rsMetadata, setMeataData] = useState({})

    useEffect(() => {
        if (poolData.nodes.length > 0) {
            let metaData = {}
        for (const ms of poolData.nodes[0].microGrantRecipients) {
            if (ms.metadataPointer !== null) {
                fetch(`https://ipfs.io/ipfs/${ms.metadataPointer}`)
                .then(res=>res.json())
                .then(result => {
                    metaData[ms.recipientId] = result.name
                }).catch(err=>{
                    metaData[ms.recipientId] = ""
                })
            } else {
                metaData[ms.recipientId] = ""
            }

        }

        setMeataData(metaData)
        }

    }, [poolData])

    const getMetaData = async () => {
        let metaData = {}
        for (const ms of poolData.nodes[0].microGrantRecipients) {
            if (ms.metadataPointer !== null) {
                try {
                    const response = await fetch(`https://ipfs.io/ipfs/${ms.metadataPointer}`)
                    const result = await response.json()
                    metaData[ms.recipientId] = result.name
                    // console.log('result', result)
                } catch (error) {
                    metaData[ms.recipientId] = ""
                }
            } else {
                metaData[ms.recipientId] = ""
            }

        }

        setMeataData(metaData)
    }

    const statusRow = (status) => {
        if (status === "Accepted") {
            return (
                <div className="p-accept-row-bd border border-1 border-success rounded text-center">
                    <span className="p-accept-row"> Accepted</span>
                </div>
            )
        } else {
            return (
                <div className="p-pending-row-bd border border-1 border-danger rounded text-center">
                    <span className="p-pending-row"> Pending</span>
                </div>
            )
        }
    }

    const Rows = () => {
        return (
            poolData.nodes.map(node => {
                return (
                    node.microGrantRecipients.map((mr,index) => {
                        const URL = window.location.origin + '/application/'+poolData.nodes[0].poolId+'/' + mr.recipientId
                        const requestedAmount = (mr.requestedAmount/poolData.generalInfo[0].tokenDecimal) +' '+ poolData.generalInfo[0].tokenSymbol
                        return (
                            <tr key={index}>
                                <td><a href={URL} className="text-decoration-none d-inline-block text-truncate p-rs-id">{mr.recipientId}</a></td>
                                <td ><span className="text-secondary text-medium d-inline-block text-truncate p-rs-ad">{mr.recipientAddress}</span></td>
                                <td className="text-secondary text-medium">{rsMetadata[mr.recipientId]}</td>
                                <td>{requestedAmount}</td>
                                <td className="text-secondary text-medium">{moment(new Date(mr.blockTimestamp)).format('DD-MM-YYYY HH:mm:ss')}</td>
                                <td>{statusRow(mr.status)}
                                </td>
                            </tr>
                        )
                    })
                )
            })
        )
    }
    return (
        <div className="row ps-4 pe-4  d-flex justify-content-evenly fw-medium">
            <div className="card shadow mb-2 rounded ">
                <div className="card-body text-start">
                    <div className="mb-3 row">
                        <div className="text-secondary fw-bolder">List Of Recipients</div>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr className="table-light border border-1">
                                    <th scope="col" className="text-secondary fw-bold text-uppercase">ID</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase">Recipient Address</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase ">Name</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase ">Requested Amount</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase ">Timestamp</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase ">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Rows />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}