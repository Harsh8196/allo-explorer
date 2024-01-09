import { getNetworks } from "@/utility/networks"
import { rchainId } from "../chain/state"
import { rApplication,rApplicationId } from "../map/state"
import { useRecoilValue } from "recoil"
import { useEffect,useState } from "react"

const Networks = getNetworks()

export function ApplicationDetailsFull({ isHidden }) {
    const [name,setName] = useState('')
    const [description, setDescription] = useState('')
    const [recipientAddress, setRecipientAddress] = useState('')
    const [applicationURL,setApplicationURL] = useState('')
    const [recipientURL,setRecipientURL] = useState('')
    const chainId = useRecoilValue(rchainId)
    const applicationId = useRecoilValue(rApplicationId)
    const applicationDetails = useRecoilValue(rApplication)
    

    useEffect(()=>{
        if(applicationDetails.generalInfo.length > 0){
            const getExplorerURL = Networks[chainId].explorer
            setRecipientAddress(applicationDetails.generalInfo[0].recipientAddress)
            setApplicationURL(`${getExplorerURL}/address/${applicationDetails.generalInfo[0].blockHash}`)
            setRecipientURL(`${getExplorerURL}/address/${applicationDetails.generalInfo[0].recipientAddress}`)

            getMetaData()
        }
    },[applicationDetails])

    const getMetaData = async() => {
        try {
                const response = await fetch(`https://ipfs.io/ipfs/${applicationDetails.generalInfo[0].applicationMetaData}`)
                const result = await response.json()
                setName(result.name)
                setDescription(result.description)
                // console.log('result',result)
              } catch (error) {
                setName("")
                setDescription("")
              }
            }

    return (
        <div className="col-lg-12 col-md-11 col-sm-11 col-11 p-3" hidden={isHidden}>
            <div className="mb-1 row">
                <span className="fs-3 text-start"> {name}</span>
            </div>
            <div className="row mb-1 p-2">
                <div className="text-secondary fw-bolder col-sm-3 a-font-size"> ApplicationID</div>
                <div className="ms-1 text-secondary fw-medium col-sm-8 a-font-size">{applicationId}
                    <a className="ms-2 bi bi-box-arrow-up-right a-font-size" href={applicationURL}></a>
                </div>
                <div className="text-secondary fw-bolder col-sm-3 a-font-size"> Recipient Address:</div>
                <div className="ms-1 text-secondary fw-medium col-sm-8 a-font-size">{recipientAddress}
                    <a className="ms-2 bi bi-box-arrow-up-right a-font-size" href={recipientURL}></a>
                </div>
                <div className="card shadow border border-0">
                    <p className="text-start mt-4 text-secondary fw-medium text-wrap mb-3"> {description}</p>
                </div>
            </div>
        </div>
    )
}
export function ApplicationDetails({ isHidden }) {
    const [name,setName] = useState('')
    const [description, setDescription] = useState('')
    const [recipientAddress, setRecipientAddress] = useState('')
    const [applicationURL,setApplicationURL] = useState('')
    const [recipientURL,setRecipientURL] = useState('')
    const chainId = useRecoilValue(rchainId)
    const applicationId = useRecoilValue(rApplicationId)
    const applicationDetails = useRecoilValue(rApplication)
    

    useEffect(()=>{
        if(applicationDetails.generalInfo.length > 0){
            const getExplorerURL = Networks[chainId].explorer
            setRecipientAddress(applicationDetails.generalInfo[0].recipientAddress)
            setApplicationURL(`${getExplorerURL}/address/${applicationDetails.generalInfo[0].blockHash}`)
            setRecipientURL(`${getExplorerURL}/address/${applicationDetails.generalInfo[0].recipientAddress}`)

            getMetaData()
        }
    },[applicationDetails])

    const getMetaData = async() => {
        try {
                const response = await fetch(`https://ipfs.io/ipfs/${applicationDetails.generalInfo[0].applicationMetaData}`)
                const result = await response.json()
                setName(result.name)
                setDescription(result.description)
                // console.log('result',result)
              } catch (error) {
                setName("")
                setDescription("")
              }
            }
    return (
        <div className="col-lg-8 col-md-11 col-sm-11 col-11 p-1" hidden={isHidden}>
            <div className="mb-1 row">
                <span className="fs-3 text-start"> {name}</span>
            </div>
            <div className="row mb-1 p-2">
                <div className="text-secondary fw-bolder col-sm-3 a-font-size"> ApplicationID</div>
                <div className="ms-1 text-secondary fw-medium col-sm-8 a-font-size">{applicationId}
                    <a className="ms-2 bi bi-box-arrow-up-right a-font-size" href={applicationURL}></a>
                </div>
                <div className="text-secondary fw-bolder col-sm-3 a-font-size"> Recipient Address:</div>
                <div className="ms-1 text-secondary fw-medium col-sm-8 a-font-size">{recipientAddress}
                    <a className="ms-2 bi bi-box-arrow-up-right a-font-size" href={recipientURL}></a>
                </div>
                <div className="card shadow border border-0 a-52vh">
                    <div className="card-body overflow-y-auto">
                    <p className="text-start mt-4 text-secondary fw-medium text-wrap">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}