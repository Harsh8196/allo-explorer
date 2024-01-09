import { useEffect, useState } from "react"
import moment from "moment"
import { getNetworks } from "@/utility/networks"
import { rchainId } from "../chain/state"
import { useRecoilValue } from "recoil"

const Networks = getNetworks()

export default function Distributionlist({ applicationData }) {

    const [name, setName] = useState('')
    const [isDataAvailable, setIsDataAvailable] = useState(true)
    const chainId = useRecoilValue(rchainId)

    useEffect(() => {
        if (applicationData.distributed.length > 0) {
            if (applicationData.distributed[0].poolMetadataPointer !== null) {
                fetch(`https://ipfs.io/ipfs/${applicationData.distributed[0].poolMetadataPointer}`)
                .then(res=>res.json())
                .then(result=>{
                    setName(result.name)
                })
                .catch(err=>{
                    setName("")
                })

            } else {
                setName("")
            }
           
            setIsDataAvailable(false)
        } else {
            setIsDataAvailable(true)
        }

    }, [applicationData])

    // const getMetaData = async () => {
    //     if (applicationData.distributed[0].poolMetadataPointer !== null) {
    //         try {
    //             const response = await fetch(`https://ipfs.io/ipfs/${applicationData.distributed[0].poolMetadataPointer}`)
    //             const result = await response.json()
    //             setName(result.name)
    //         } catch (error) {
    //             setName("")
    //         }
    //     } else {
    //         setName("")
    //     }
    // }

    const Rows = () => {
        return (
            applicationData.distributed.map((dl,index) => {
                const getExplorerURL = Networks[chainId].explorer
                const txURL = getExplorerURL + 'tx/' + dl.transactionHash
                const rsIdURL = getExplorerURL + 'address/' + dl.recipientId
                const rsAdURL = getExplorerURL + 'address/' + dl.recipientAddress
                const rsSender = getExplorerURL + 'address/' + dl.sender
                const contractAddress = getExplorerURL + 'address/' + dl.contractAddress
                const amount = (dl.amount/dl.tokenDecimal) + ' ' +dl.tokenSymbol
                return (
                    <tr key={index}>
                        <td><a href={txURL} className="text-decoration-none d-inline-block text-truncate a-rs-ds-id">{dl.transactionHash}</a></td>
                        <td ><a href={rsIdURL} className="text-secondary text-decoration-none text-medium d-inline-block text-truncate a-rs-ds-ad">{dl.recipientId}</a></td>
                        <td ><a href={rsAdURL} className="text-secondary text-decoration-none text-medium d-inline-block text-truncate a-rs-ds-ad">{dl.recipientAddress}</a></td>
                        <td className="text-secondary text-medium">{name}</td>
                        <td><a href={rsSender} className="text-secondary text-decoration-none text-medium d-inline-block text-truncate a-rs-ds-ad">{dl.sender}</a></td>
                        <td className="text-secondary text-medium">{dl.contractName}</td>
                        <td><a href={contractAddress} className="text-secondary text-decoration-none text-medium d-inline-block text-truncate a-rs-ds-ad">{dl.contractAddress}</a></td>
                        <td className="text-secondary text-medium">{amount}</td>
                        <td className="text-secondary text-medium">{moment(new Date(dl.blockTimestamp)).format('DD-MM-YYYY HH:mm:ss')}</td>
                        <td className="text-secondary text-medium">{dl.poolId}</td>
                    </tr>
                )
            })
        )
    }
    return (
        <div className="row ps-4 pe-4  d-flex justify-content-evenly fw-medium">
            <div className="card shadow mb-2 rounded ">
                <div className="card-body text-start">
                    <div className="mb-3 row">
                        <div className="text-secondary fw-bolder">Distribution Transaction Logs</div>
                    </div>
                    <div className="text-danger" hidden={!isDataAvailable}>No Transaction Found</div>
                    <div className="table-responsive" hidden={isDataAvailable}>
                        <table className="table">
                            <thead>
                                <tr className="table-light border border-1">
                                    <th scope="col" className="text-secondary fw-bold text-uppercase">Hash</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase">Recipient Id</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase">Recipient Address</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase ">Name</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase ">Sender Address</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase ">Contract Name</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase ">Contract Address</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase ">Amount</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase ">Timestamp</th>
                                    <th scope="col" className="text-secondary fw-bold text-uppercase ">Pool</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Rows/>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}