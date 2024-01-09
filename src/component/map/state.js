"use client"
import { selector, atom } from "recoil"

export const rpoolId = atom({
  key: "rpoolId",
  default: ""
})

export const apipoolDetails = atom({
  key: 'apipoolDetails',
  default: []
})

export const apipoolPageDetails = atom({
  key: 'apipoolPageDetails',
  default: []
})

export const rpool = atom({
  key: "rpool",
  default: { "nodes": [], "links": [], "generalInfo": [] }
})

export const rpoolPage = atom({
  key: "rpoolPage",
  default: { "nodes": [], "generalInfo": [] }
})

export const rnodeId = atom({
  key: "rnodeId",
  default: ''
})

export const rApplicationId = atom({
  key: "rapplicationId",
  default:''
})

export const rPoolId = atom({
  key: "rPoolId",
  default:''
})

export const rApplication = atom({
  key: "rApplication",
  default:{"generalInfo":[],"allocated":[],"distributed":[],"pieData":[],"application":[]}
})

export const rpoolDetails = selector({
  key: 'rpoolDetails',
  get: async ({ get }) => {
    const poolDetails = get(apipoolDetails)
    if (poolDetails.length > 0) {
      let poolNodes = []
      let poolLinks = []
      let totalPool = 0
      let totalPoolApplications = 0
      let totalPoolApplicationsAccepted = 0
      let totalPoolApplicationsPending = 0

      poolNodes.push(
        {
          "id": "MicroGrantStrategy",
          "name": "MicroGrantStrategy",
          "totalValue": 1,
          "val": "0.5",
          "status": "",
          "img": "https://ui-avatars.com/api/?name=MicroGrantStrategy",
          "link": "",
          "ratio": "0.5",
          "ispool": "",
          "metadataPointer": ""
        }
      )

      for (const mg of poolDetails) {

        if (mg.microGrantRecipients.length > 0 && ((mg.pool.amount) / 10e17) > 0) {

          let nodeObject = {}
          let decimal = 10e17
         
          // console.log(mg)
          nodeObject.id = mg.poolId
          // console.log(`https://ipfs.io/ipfs/${mg.pool.metadataPointer}`)
          
          if(mg.pool.tokenMetadata.decimals){
            decimal =  Math.pow(10,mg.pool.tokenMetadata.decimals)
           
          }

          totalPool += 1

          nodeObject.name = mg.poolId
          nodeObject.metadataPointer = mg.pool.metadataPointer
          nodeObject.totalValue = (mg.pool.amount) / decimal
          nodeObject.val = 1
          nodeObject.status = ""
          nodeObject.ispool = "1"
          nodeObject.img = "https://ui-avatars.com/api/?name=" + nodeObject.name
          nodeObject.link = "gives"
          nodeObject.ratio = 1
          nodeObject.totalApplications = mg.microGrantRecipients.length
          nodeObject.approvalThreshold = mg.approvalThreshold
          nodeObject.allocationStartTime = mg.allocationStartTime
          nodeObject.allocationEndTime = mg.allocationEndTime
          nodeObject.tokenSymbol = mg.pool.tokenMetadata.symbol === null ? "ETH" : mg.pool.tokenMetadata.symbol


          poolNodes.push(nodeObject)

          poolLinks.push({
            "source": "MicroGrantStrategy",
            "target": mg.poolId,
            "val": ""
          })



          for (const rs of mg.microGrantRecipients) {
            
            totalPoolApplications += 1

            if (rs.status === "Accepted") {

              totalPoolApplicationsAccepted += 1

            } else if (rs.status === "Pending") {

              totalPoolApplicationsPending += 1

            }
            if(((rs.requestedAmount / decimal) / nodeObject.totalValue) <= 1){
            poolNodes.push({
              "id": rs.recipientId,
              "name": rs.recipientId,
              "totalValue": (rs.requestedAmount) / decimal,
              "val": ((rs.requestedAmount / decimal) / nodeObject.totalValue).toFixed(2),
              "status": rs.status,
              "img": "https://ui-avatars.com/api/?name=" + rs.recipientId,
              "link": "receives",
              "ratio": ((rs.requestedAmount / decimal) / nodeObject.totalValue).toFixed(2),
              "ispool": "0",
              "metadataPointer": rs.metadataPointer,
              "poolId": nodeObject.id,
              "tokenSymbol": mg.pool.tokenMetadata.symbol === null ? "ETH" : mg.pool.tokenMetadata.symbol
            })

            poolLinks.push({
              "source": nodeObject.id,
              "target": rs.recipientId,
              "value": (rs.requestedAmount / decimal),
              "status":rs.status
            })
          }
          }
        }

      }
      // console.log("poolNodes", poolNodes)
      // console.log("poolLinks", poolLinks)
      return {
        "nodes": poolNodes, "links": poolLinks,
        "generalInfo": [{
          "totalPool": totalPool,
          "totalApplications": totalPoolApplications,
          "totalAccepted": totalPoolApplicationsAccepted,
          "totalPending": totalPoolApplicationsPending
        }]
      }
    } else {
      return { "nodes": [], "links": [], "generalInfo": [] }
    }
  }
})

export const rpoolDetailsPool = selector({
  key: 'rpoolDetailsPool',
  get: ({ get }) => {
    const poolDetails = get(apipoolPageDetails)

    if (poolDetails.length > 0) {
      const poolNodes = poolDetails
      // console.log("pool", poolDetails)

      let totalPool = 0
      let totalDistributedAmount = 0
      let totalPoolApplications = 0
      let totalPoolApplicationsAccepted = 0
      let totalPoolApplicationsPending = 0
      let tokenSymbol = "ETH"
      let decimal = 10e17

      for (const mg of poolDetails) {

        if(mg.pool.tokenMetadata.decimals){
          decimal = Math.pow(10,mg.pool.tokenMetadata.decimals)
        }

        totalPool = (mg.pool.amount) / decimal
        tokenSymbol = mg.pool.tokenMetadata.symbol === null ? "ETH" : mg.pool.tokenMetadata.symbol

        if (mg.microGrantRecipients.length > 0) {

          for (const rs of mg.microGrantRecipients) {

            totalPoolApplications += 1

            if (rs.status === "Accepted") {

              totalPoolApplicationsAccepted += 1

            } else if (rs.status === "Pending") {

              totalPoolApplicationsPending += 1

            }
          }

          for (const ds of mg.distributeds) {
            totalDistributedAmount += (ds.amount / decimal)
          }
        }

      }
      // console.log("poolNodes", poolNodes)
      return {
        "nodes": poolNodes,
        "generalInfo": [{
          "totalPool": totalPool,
          "totalDistributedAmount": totalDistributedAmount,
          "totalApplications": totalPoolApplications,
          "totalAccepted": totalPoolApplicationsAccepted,
          "totalPending": totalPoolApplicationsPending,
          "tokenSymbol": tokenSymbol,
          "tokenDecimal":decimal
        }]
      }
    } else {
      return { "nodes": [], "generalInfo": [] }
    }
  }
})

export const rapplicationDetails = selector({
  key: 'rapplicationDetails',
  get: ({ get }) => {
    const applicationId = get(rApplicationId)
    const poolId = get(rpoolId)
    const allPoolDetails = get(apipoolDetails)
    const allNodeDetails = get(rpoolDetails)
    let filteredNodeDeatils = []
    let allocatedArray = []
    let distributedArray = []
    let pieData = []
    let applicationArray = []
    let applicationObject = {}
    let totalPool = 0
    let totalRequestedAmount = 0
    let totalDistributedAmount = 0
    let applicationMetaData = ''
    let recipientAddress = ''
    let blockHash = ''
    let tokenSymbol = ''
    let decimal = 10e17

    if(applicationId !== "" && poolId !== "" && allNodeDetails.nodes.length > 0){

      filteredNodeDeatils = allPoolDetails.filter(nodeDeatils => {return nodeDeatils.poolId === poolId})

    }
    else if(applicationId !== "" && poolId === "" && allNodeDetails.nodes.length > 0) {

      let allPoolByRId = allNodeDetails.links.filter(nodeDeatils => {return nodeDeatils.target === applicationId})
      allPoolByRId.forEach(nodeDeatils => {
        let filteredPoolById = allPoolDetails.filter(node => {return node.poolId === nodeDeatils.source})
        filteredNodeDeatils.push(filteredPoolById[0])
      })

    } else {
      return {"generalInfo":[],"allocated":[],"distributed":[],"pieData":[],"application":[]}
    }
    totalPool = filteredNodeDeatils.length
    // console.log('microGrantRecipients',filteredNodeDeatils)
    filteredNodeDeatils.forEach(nodeDeatils => {
      if(nodeDeatils.pool.tokenMetadata.decimals){
        decimal = Math.pow(10,nodeDeatils.pool.tokenMetadata.decimals)
      }
      let microGrantRecipients = nodeDeatils.microGrantRecipients.filter(microGrantRecipients => 
        {
          return microGrantRecipients.recipientId === applicationId
        })

      microGrantRecipients.forEach(recipient => {
        totalRequestedAmount += (recipient.requestedAmount)/decimal
        applicationMetaData = recipient.metadataPointer
        recipientAddress = recipient.recipientAddress
        blockHash = recipient.blockHash

        applicationObject.requestedAmount = (recipient.requestedAmount)/decimal
        applicationObject.status = recipient.status
        applicationObject.approvalThreshold = nodeDeatils.approvalThreshold
        applicationObject.poolCreatedTimestamp = nodeDeatils.blockTimestamp
        applicationObject.applicationTimestamp = recipient.blockTimestamp
        applicationObject.poolId = nodeDeatils.poolId
        applicationObject.applicationId = recipient.recipientId

        tokenSymbol = nodeDeatils.pool.tokenMetadata.symbol === null ? "ETH" : nodeDeatils.pool.tokenMetadata.symbol
        let label = `Pool-${nodeDeatils.poolId} (${tokenSymbol})`
        let pie = {
          "id": 'Pool-'+nodeDeatils.poolId,
          "label":label,
          "value":(recipient.requestedAmount)/decimal,
          "poolId":nodeDeatils.poolId
        }
        pieData.push(pie)
      })

      let allocated = nodeDeatils.allocateds.filter(allocatedDetails => 
        {
          return allocatedDetails.recipientId === applicationId && allocatedDetails.status === "2" 
        })

        applicationObject.approval = allocated.length
        let allocatedTimestamp = []

        allocated.forEach(allocation => {
          let allocationObject = JSON.parse(JSON.stringify(allocation))
          allocationObject.poolId = nodeDeatils.poolId
          allocationObject.tokenSymbol = nodeDeatils.pool.tokenMetadata.symbol === null ? "ETH" : nodeDeatils.pool.tokenMetadata.symbol
          allocationObject.poolMetadataPointer = nodeDeatils.pool.metadataPointer
          allocatedArray.push(allocationObject)
          allocatedTimestamp.push({
            "sender": allocation.sender,
            "blockTimestamp": allocation.blockTimestamp
          })
        })

        applicationObject.allocatedTimestamp = allocatedTimestamp
      
      let distributed = nodeDeatils.distributeds.filter(distributedDetails => 
        {
          return distributedDetails.recipientId === applicationId
        })

        let distributedTimestamp = []

        distributed.forEach(distribution => {
          totalDistributedAmount += (distribution.amount)/decimal
          let distributionObject = JSON.parse(JSON.stringify(distribution))
          distributionObject.poolId = nodeDeatils.poolId
          distributionObject.tokenSymbol = nodeDeatils.pool.tokenMetadata.symbol === null ? "ETH" : nodeDeatils.pool.tokenMetadata.symbol
          distributionObject.tokenDecimal = decimal
          distributionObject.poolMetadataPointer = nodeDeatils.pool.metadataPointer
          distributedArray.push(distributionObject)
          distributedTimestamp.push({
            "amount": distribution.amount,
            "blockTimestamp": distribution.blockTimestamp,
            "recipientAddress":distribution.recipientAddress,
            "transactionHash":distribution.transactionHash
          })
        })

        applicationObject.distributedTimestamp = distributedTimestamp
        applicationObject.tokenSymbol = tokenSymbol

    })
    if(totalPool === 1){
      applicationArray.push(applicationObject)
    }
    return {"generalInfo":[{
      "totalPool":totalPool,
      "totalRequestedAmount":totalRequestedAmount.toFixed(6),
      "totalDistributedAmount":totalDistributedAmount.toFixed(6),
      "applicationMetaData":applicationMetaData,
      "recipientAddress":recipientAddress,
      "blockHash":blockHash,
      "tokenSymbol":tokenSymbol
    }],"allocated":allocatedArray,"distributed":distributedArray,"pieData":pieData,"application":applicationArray}
  }
})