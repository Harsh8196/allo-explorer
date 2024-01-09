import moment, { now } from "moment"
import { useEffect, useState } from "react"
import { getNetworks } from "@/utility/networks"
import { rchainId } from "../chain/state"
import { useRecoilValue } from "recoil"

const Networks = getNetworks()
export default function ApplicationSideCardDetails({ isHidden, applicationData }) {

    const [requestedAmount, setRequestedAmount] = useState('')
    const [status, setStatus] = useState('')
    const [approvalCount, setApprovalCount] = useState('')
    const [approvalThreshold, setApprovalThreshold] = useState('')
    const [arialValue, setArialValue] = useState()
    const [arialWidth, setArialWidth] = useState('')
    const [poolId, setPoolId] = useState('')
    const [poolIdURL, setPoolIdURL] = useState('')
    const [applicationId, setApplicationId] = useState('')
    const [applicationURL, setApplicationURL] = useState('')
    const [poolTimeStamp, setPoolTimeStamp] = useState('')
    const [applicationTimestamp, setApplicationTimestamp] = useState('')
    const chainId = useRecoilValue(rchainId)

    useEffect(() => {

        if (applicationData.application.length > 0) {
            setRequestedAmount(applicationData.application[0].requestedAmount + ' ' + applicationData.application[0].tokenSymbol)
            setStatus(applicationData.application[0].status)
            setApprovalCount(applicationData.application[0].approval)
            setApprovalThreshold(applicationData.application[0].approvalThreshold)
            setArialValue((applicationData.application[0].approval / applicationData.application[0].approvalThreshold) * 100)
            setArialWidth(((applicationData.application[0].approval / applicationData.application[0].approvalThreshold) * 100) + '%')
            setPoolId(applicationData.application[0].poolId)
            setApplicationId(applicationData.application[0].applicationId)
            setPoolIdURL(`${window.location.origin}/pool/${poolId}`)
            setApplicationTimestamp(moment(new Date(now())).diff(moment(new Date(applicationData.application[0].applicationTimestamp)), 'days'))
            setPoolTimeStamp(moment(new Date(now())).diff(moment(new Date(applicationData.application[0].poolCreatedTimestamp)), 'days'))
            setApplicationURL(window.location.href)

        }

    }, [applicationData])

    const statusRow = (status) => {
        if (status === "Accepted") {
            return (
                <div className="p-accept-row-bd border border-1 border-success rounded text-center">
                    <span className="p-accept-row p-1"> Accepted</span>
                </div>
            )
        } else {
            return (
                <div className="p-pending-row-bd border border-1 border-danger rounded text-center">
                    <span className="p-pending-row p-1"> Pending</span>
                </div>
            )
        }
    }

    const AllocatedRows = () => {
        return (
            applicationData.application.map(al => {
                return(
                    al.allocatedTimestamp.map(t => {
                        return(
                            <>
                            <li className="d-flex align-items-center justify-content-between">
                                <div className="ms-1 vr text-secondary"></div>
                            </li>
                            <li className="d-flex align-items-center flex-row">
                                <div className="col-sm-1">
                                    <i className="a-icon fs-5 bi bi-arrow-up-circle text-success"></i>
                                </div>
                                <div className="d-flex col-sm-8">
                                    <a className="a-font-size text-decoration-none text-truncate d-inline-block a-activity">{t.sender}</a>
                                    <span className="ms-1 a-font-size text-secondary">Approved the application</span>
                                </div>
                                <div className="col-sm-2">
                                    <span className="ms-1 a-font-size text-secondary">{moment(new Date(now())).diff(moment(new Date(t.blockTimestamp)), 'days')}d ago</span>
                                </div>
                            </li>
                            </>
                        )
                    })
                )
            })
        )
    }
    const DistributedRows = () => {
        return (
            applicationData.application.map(dl => {
                return(
                    dl.distributedTimestamp.map(t => {
                        const getExplorerURL = Networks[chainId].explorer
                        const txURL = getExplorerURL+'tx/' +t.transactionHash
                        return(
                            <>
                            <li className="d-flex align-items-center justify-content-between">
                                <div className="ms-1 vr text-secondary"></div>
                            </li>
                            <li className="d-flex align-items-center flex-row">
                                <div className="col-sm-1">
                                    <i className="a-icon fs-5 bi bi-check-circle-fill text-primary"></i>
                                </div>
                                <div className="d-flex col-sm-8">
                                    <a href={txURL} className="a-font-size text-decoration-none">{((t.amount)/10e17)+ dl.tokenSymbol}</a>
                                    <span className="ms-1 a-font-size text-secondary text-truncate d-inline-block">Distributed To {t.recipientAddress}</span>
                                </div>
                                <div className="col-sm-2">
                                    <span className="ms-1 a-font-size text-secondary">{moment(new Date(now())).diff(moment(new Date(t.blockTimestamp)), 'days')}d ago</span>
                                </div>
                            </li>
                            </>
                        )
                    })
                )
            })
        )
    }

    return (
        <div className="col-lg-4 col-md-11 col-sm-11 col-11 p-3" hidden={isHidden}>
            <div className="row mb-1">
                <div className="card shadow mb-2 rounded">
                    <div className="card-body text-start">
                        <div className="mb-3 row">
                            <div className="text-secondary fw-bolder">Details</div>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-sm-6">
                                <div className="fw-ligh text-secondary">
                                    Requested Amount
                                </div>
                                <div className="d-flex flex-row mt-2 align-items-center">
                                    <div className="p-icon p-total-pool-bd">
                                        <i className="bi bi-cash-coin fs-5 p-total-pool"></i>
                                    </div>
                                    <span className="text-secondary fw-bolder ms-3">{requestedAmount}</span>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="fw-light text-secondary">
                                    Application Status
                                </div>
                                <div className="d-flex flex-row mt-2 align-items-center">
                                    {statusRow(status)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-sm-4">
                            <div className="fw-light text-secondary">
                                Approval
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="progress" role="progressbar" aria-valuenow={arialValue} aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar" style={{ "width": arialWidth }}></div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span> {approvalCount} </span>
                                <span> {approvalThreshold} </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row mb-1">
                <div className="card shadow mb-3 rounded a-card-size">
                    <div className="card-body text-start overflow-y-auto">
                        <div className="mb-3 row">
                            <div className="text-secondary fw-bolder">Activity Log</div>
                        </div>
                        <ul role="list" className="mt-4">
                            <li className="d-flex align-items-center flex-row">
                                <div className="col-sm-1">
                                    <i className="a-icon fs-6 border border-2 border-secondary-subtle"></i>
                                </div>
                                <div className="col-sm-8">
                                    <a href={poolIdURL} className="a-font-size text-decoration-none">PoolId {poolId}</a>
                                    <span className="ms-1 a-font-size text-secondary">Created</span>
                                </div>
                                <div className="col-sm-2">
                                    <span className="ms-1 a-font-size text-secondary">{poolTimeStamp}d ago</span>
                                </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                                <div className="ms-1 vr text-secondary"></div>
                            </li>
                            <li className="d-flex align-items-center flex-row">
                                <div className="col-sm-1">
                                    <i className="a-icon fs-6 border border-2 border-secondary-subtle"></i>
                                </div>
                                <div className="d-flex col-sm-8">
                                    <a href={applicationURL} className="a-font-size text-decoration-none text-truncate d-inline-block a-activity">{applicationId}</a>
                                    <span className="ms-1 a-font-size text-secondary">Application Submitted</span>
                                </div>
                                <div className="col-sm-2">
                                    <span className="ms-1 a-font-size text-secondary">{applicationTimestamp}d ago</span>
                                </div>
                            </li>
                            <AllocatedRows/>
                            <DistributedRows/>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}