
import { useRecoilValue } from "recoil"
import { rpool } from "../map/state"
import { useEffect, useState } from "react"

function OverviewCard () {

    const poolDetails = useRecoilValue(rpool)
    const [totalPool,setTotalPool] = useState('')
    const [totalApplications,setTotalApplications] = useState('')
    const [totalAccepted,setTotalAccepted] = useState('')
    const [totalPending,setTotalPending] = useState('')

    useEffect(()=>{
        // console.log('OverViewCard',poolDetails)
        if(poolDetails.generalInfo.length > 0) {
            const generalInfo = poolDetails.generalInfo[0]
            setTotalPool(generalInfo.totalPool);
            setTotalApplications(generalInfo.totalApplications);
            setTotalAccepted(generalInfo.totalAccepted);
            setTotalPending(generalInfo.totalPending);
        }
    },[poolDetails])

    return(
        <div className="row d-flex justify-content-evenly text-center fw-medium">
          <div className="col-lg-2 col-md-11 col-sm-11 col-11 m-1 card p-2 border border-0 shadow ">
            <div className="row justify-content-center">
              <div className="h-icon rounded-circle h-total-pool-bd">
                <i className="bi bi-basket-fill fs-3 h-total-pool"></i>
              </div>
              <span className="text-secondary m-1">Total Pool</span>
            </div>
            <div className="row">
              <span className="h-total-pool">{totalPool}</span>
            </div>
          </div>
          <div className="col-lg-2 col-md-11 col-sm-11 col-11 m-1 card p-2 border border-0 shadow ">
            <div className="row justify-content-center">
              <div className="h-icon rounded-circle h-total-application-bd">
                <i className="bi bi-file-earmark-medical-fill fs-3 h-total-application"></i>
              </div>
              <span className="text-secondary m-1">Total Application</span>
            </div>
            <div className="row">
              <span className="h-total-application">{totalApplications}</span>
            </div>
          </div>
          <div className="col-lg-2 col-md-11 col-sm-11 col-11 m-1 card p-2 border border-0 shadow ">
            <div className="row justify-content-center">
              <div className="h-icon rounded-circle h-total-accepted-bd">
                <i className="bi bi-journal-check fs-3 h-total-accepted"></i>
              </div>
              <span className="text-secondary m-1">Accepted Application</span>
            </div>
            <div className="row">
              <span className="h-total-accepted">{totalAccepted}</span>
            </div>
          </div>
          <div className="col-lg-2 col-md-11 col-sm-11 col-11 m-1 card p-2 border border-0 shadow ">
            <div className="row justify-content-center">
              <div className="h-icon rounded-circle h-total-pending-bd">
                <i className="bi bi-file-text-fill fs-3 h-total-pending"></i>
              </div>
              <span className="text-secondary m-1">Pending Application</span>
            </div>
            <div className="row">
              <span className="h-total-pending">{totalPending}</span>
            </div>
          </div>
          <div className="col-lg-2 col-md-11 col-sm-11 col-11 m-1 card p-2 border border-0 shadow ">
            <div className="row justify-content-center">
              <div className="h-icon rounded-circle h-application-strategy-bd">
                <i className="bi bi-currency-exchange fs-3 h-application-strategy"></i>
              </div>
              <span className="text-secondary m-1">Strategy</span>
            </div>
            <div className="row">
              <span className="h-application-strategy">MicroGrant</span>
            </div>
          </div>
        </div>
    )

}


export default OverviewCard