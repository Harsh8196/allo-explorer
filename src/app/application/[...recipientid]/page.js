"use client"
import { rApplication, rapplicationDetails, rApplicationId, rpoolId } from "@/component/map/state"
import { useRecoilState, useRecoilValue } from "recoil"
import { useEffect, useState } from "react"
import { Loading } from "@/component/Loading"
import dynamic from "next/dynamic"
import ApplicationSideCardDetails from "@/component/application/ApplicationSideCardDetails"
import { ApplicationDetailsFull, ApplicationDetails } from "@/component/application/ApplicationDetails"
import { risLoading } from "@/component/chain/state"
import Allocationlist from "@/component/tables/Allocation"
import Distributionlist from "@/component/tables/Distribution"

function RecipientDetails({ params }) {

    const [application, setApplication] = useRecoilState(rApplication)
    const [applicationId, setApplicationId] = useRecoilState(rApplicationId)
    const [poolId, setPoolId] = useRecoilState(rpoolId)
    const applicationDetails = useRecoilValue(rapplicationDetails)
    const [isLoading, setIsLoading] = useRecoilState(risLoading)
    const [isFromPool, setIsFromPool] = useState(false)
    const [pieData, setPieData] = useState([])
    const [totalRequestedAmount, setTotalRequestedAmount] = useState('')
    const [totalDistributedAmount, setTotalDistributedAmount] = useState('')
    const [totalPool, setTotalPool] = useState('')
    const [isDataAvailable, setIsDataAvailable] = useState(false)

    useEffect(() => {

        if (params.recipientid.length > 1) {
            setIsFromPool(false)
            setPoolId(params.recipientid[0])
            setApplicationId(params.recipientid[1])
        } else {
            setIsFromPool(true)
            setApplicationId(params.recipientid[0])
        }

    }, [])

    useEffect(() => {
        if (applicationDetails.generalInfo.length > 0) {
            setApplication(applicationDetails)
        }
    }, [applicationDetails])

    useEffect(() => {

        // console.log("Application", application)
        setPieData(application.pieData)
        if (application.generalInfo.length > 0) {
            setTotalRequestedAmount(application.generalInfo[0].totalRequestedAmount + ' ' + application.generalInfo[0].tokenSymbol)
            setTotalDistributedAmount(application.generalInfo[0].totalDistributedAmount + ' ' + application.generalInfo[0].tokenSymbol)
            setTotalPool(application.generalInfo[0].totalPool)
            setIsLoading(true)
            if (application.pieData.length > 0) {
                setIsDataAvailable(true)
            } else {
                setIsDataAvailable(false)
            }

        }
    }, [application])

    const AMPieDynamic = dynamic(() => import("../../../component/pie/AMPie"), { ssr: false })

    return (
        <div>
            <Loading />
            <div className="text-danger fs-4" hidden={!isLoading || isDataAvailable}>No Information Found for this application.</div>
            <div hidden={!isLoading || !isDataAvailable}>
                <div className="row ps-4 pe-4  d-flex justify-content-evenly">
                    <ApplicationDetailsFull isHidden={!isFromPool} />
                    <ApplicationDetails isHidden={isFromPool} />
                    <ApplicationSideCardDetails isHidden={isFromPool} applicationData={application} />
                </div>
                <div hidden={!isFromPool}>
                    <div className="row ps-4 pe-4  d-flex justify-content-evenly fw-medium" >
                        <div className="row mb-1 p-2 mt-1">
                            <div className="card shadow mb-3 rounded">
                                <div className="card-body text-start">
                                    <div className="mb-3 row">
                                        <div className="text-secondary fw-bolder">Statistics</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-8 col-md-11 col-sm-11 col-11">
                                            <div style={{ "height": "40vh" }}>
                                                <AMPieDynamic data={pieData}/>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-11 col-sm-11 col-11">
                                            <div className="row mb-2">
                                                <div className="card border border-0 a-pool-d-card-bg">
                                                    <div className="row g-0 align-items-center">
                                                        <div className="col-sm-2 p-1">
                                                            <div className="a-icon-pool-card bd-gray-800">
                                                                <i className="bi bi-arrow-up-right fs-5 text-success"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-10 p-1">
                                                            <div className="card-body text-start">
                                                                <div className="a-font-size text-secondary fw-bold opacity-50">Total Requested Amount</div>
                                                                <div className="fs-6 text-secondary fw-bold">{totalRequestedAmount}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="card border border-0 a-pool-d-card-bg">
                                                    <div className="row g-0 align-items-center">
                                                        <div className="col-sm-2 p-1">
                                                            <div className="a-icon-pool-card bd-gray-800">
                                                                <i className="bi bi-arrow-down-up fs-5 text-danger"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-10 p-1">
                                                            <div className="card-body text-start">
                                                                <div className="a-font-size text-secondary fw-bold opacity-50">Total Distributed Amount</div>
                                                                <div className="fs-6 text-secondary fw-bold">{totalDistributedAmount}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="card border border-0 a-pool-d-card-bg">
                                                    <div className="row g-0 align-items-center">
                                                        <div className="col-sm-2 p-1">
                                                            <div className="a-icon-pool-card bd-gray-800">
                                                                <i className="bi bi-boxes fs-5 text-light"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-10 p-1">
                                                            <div className="card-body text-start">
                                                                <div className="a-font-size text-secondary fw-bold opacity-50">Total Pool</div>
                                                                <div className="fs-6 text-secondary fw-bold">{totalPool}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Allocationlist applicationData={application} />
                <Distributionlist applicationData={application} />
            </div>
        </div>

    )
}

export default RecipientDetails