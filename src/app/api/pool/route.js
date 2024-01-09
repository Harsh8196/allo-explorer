import itiriri from "itiriri";
import { graphqlEndpoint } from "@/utility/networks";
import { NextResponse } from "next/server";
import {request} from "graphql-request";
import { qPoolDetails,qGetAllPoolByChainId } from "@/component/map/queries";

// To handle a GET request to /api
export async function POST(req,res) {
  // Do whatever you want
  let query,queryParameters,isWithPoolId
  const data = await req.json();

  if(data.poolId !== ""){
    query = qPoolDetails
    queryParameters = data
    isWithPoolId = true
  } else {
    query = qGetAllPoolByChainId
    queryParameters = {"chainId": data.chainId.toString()}
    isWithPoolId = false
  }
  const response = await request(graphqlEndpoint,query,queryParameters)
  let poolDetails = []
  if(!isWithPoolId) {

    poolDetails = response.microGrants
  }
  else {
    // console.log(response)
    poolDetails.push(response.microGrant)
  }

  return NextResponse.json({ "poolDetails": poolDetails }, { status: 200 });
}


