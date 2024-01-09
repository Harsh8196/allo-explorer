import React from 'react';
import { gql,request,GraphQLClient, rawRequest } from 'graphql-request'
import { graphqlEndpoint } from '@/utility/networks';

//const graphQLClient = new GraphQLClient(graphqlEndpoint)

export const qPoolDetails = gql`
    query getMicroGrantsRecipientsQuery($chainId: String!, $poolId: String!) {
        microGrant(chainId: $chainId, poolId: $poolId){
        poolId
        chainId
        strategy
        allocationStartTime
        allocationEndTime
        approvalThreshold
        maxRequestedAmount
        blockTimestamp
        useRegistryAnchor
        pool {
            strategy
            strategyName
            tokenMetadata
            token
            amount
            metadataPointer
            profile {
            profileId
            name
            }
        }
        allocateds {
            recipientId
            sender
            contractAddress
            contractName
            chainId
            status
            blockTimestamp
            transactionHash
        }
        distributeds {
            recipientId
            recipientAddress
            amount
            sender
            contractName
            contractAddress
            transactionHash
            blockNumber
            blockTimestamp
            chainId
        }
        microGrantRecipients {
            recipientId
            recipientAddress
            requestedAmount
            metadataPointer
            blockTimestamp
            isUsingRegistryAnchor
            status
            blockHash
        }
        }
    }
`;

export const qGetAllPoolByChainId = gql`
query getMicroGrantsRecipientsQuery($chainId:String!) {
    microGrants(condition: {chainId:$chainId}) {
      poolId
      chainId
      strategy
      allocationStartTime
      allocationEndTime
      approvalThreshold
      maxRequestedAmount
      blockTimestamp
      useRegistryAnchor
      pool {
        strategy
        strategyName
        tokenMetadata
        token
        amount
        metadataPointer
        profile {
          profileId
          name
        }
      }
      allocateds {
        recipientId
        sender
        contractAddress
        contractName
        chainId
        status
        blockTimestamp
        transactionHash
      }
      distributeds {
        recipientId
        recipientAddress
        amount
        sender
        contractName
        contractAddress
        transactionHash
        blockNumber
        blockTimestamp
        chainId
      }
      microGrantRecipients {
        recipientId
        recipientAddress
        requestedAmount
        metadataPointer
        blockTimestamp
        isUsingRegistryAnchor
        status
        blockHash
      }
    }
  }
`
