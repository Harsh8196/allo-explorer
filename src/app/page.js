"use client"
import dynamic from "next/dynamic"
import { Loading } from "@/component/Loading"
import { useEffect} from "react"
import { ThemeContext } from "@/component/theming/ThemeProvider"
import { rpool, rpoolDetails } from "@/component/map/state"
import { useRecoilState, useRecoilValue } from "recoil"
import { risLoading } from "@/component/chain/state"
import OverviewCard from "@/component/overviewdetails/OverviewCard"
import Homepagefilter from "@/component/filters/Homepagefilter"

export default function Home() {

  const [pool, setPool] = useRecoilState(rpool)
  const poolDetails = useRecoilValue(rpoolDetails)
  const [isLoading, setIsLoading] = useRecoilState(risLoading)
  
  useEffect(() => {
      setPool(poolDetails)
  }, [poolDetails])

  useEffect(()=>{
    if(pool.nodes.length > 0){
      setIsLoading(true)
    } 
  },[pool])

  const AMForceGraphDynamic = dynamic(() => import("../component/map/AMForceGraph"), { ssr: false })

  return (
    <div>
      <Loading />
      <div hidden={!isLoading}>
      <div className="row mt-2 d-flex justify-content-evenly text-center fw-medium">
        <OverviewCard />
        <div className="row d-flex m-1 ms-5 mt-2 fw-medium">
          <div className="col-11 col-lg-3 col-md-12 col-sm-11">
              <Homepagefilter/>
          </div>
          <div className="col-11 col-lg-9 col-md-12 col-sm-11">
            <div className="row m-1 mt-1 border border-1 rounded" style={{ "height": "88vh", "position": "relative" }}>
              <ThemeContext.Consumer>
                {({ stitchesTheme }) => <AMForceGraphDynamic stitchesTheme={stitchesTheme} poolDetails={pool} />}
              </ThemeContext.Consumer>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
