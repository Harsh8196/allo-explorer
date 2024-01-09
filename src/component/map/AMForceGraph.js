"use client"
import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import ForceGraph2D  from 'react-force-graph-2d';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useRecoilState, useRecoilValue } from "recoil"
import { styled } from '@/stitches.config';
import { rnodeId, rpool } from "./state"

const StyledAutoSizer = styled(AutoSizer, {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

const MIN_ZOOM = 3;

const NODE_R = 5;

function AMForceGraph({stitchesTheme,poolDetails}){

    // const poolDetails = useRecoilValue(rpool)

    const fgRef = useRef();
 
    const images = useRef(new Map());
  
    const mapGraphData = useMemo(() => {
      return {
        nodes: poolDetails.nodes.map((x) => ({ ...x })),
        links: poolDetails.links.map((x) => ({ ...x }))
    }
    }, [poolDetails]);

    const [selectedNode, setSelectedNode] = useRecoilState(rnodeId)
  
    useEffect(() => {

      mapGraphData.nodes.forEach(async node => {
        const path = (node).img;
        if (path && !images.current.has(path)) {
          const img = new Image();
          img.src = path;
          images.current.set(path, img);
        }
      });
    }, [mapGraphData]);
  
    const linkColor = useCallback(
      (edge) => {
        let color = stitchesTheme.colors.mapLink.value;
        // console.log('selectedNode',edge)
        if(selectedNode !== ''){
          //console.log("edge.source.id",edge.target.id,selectedNode)
          color = stitchesTheme.colors.mapLinkDim.value;
          if(edge.source.link === "gives" && edge.source.id == selectedNode && edge.status === "Accepted"){
              color =  stitchesTheme.colors.mapReceiveLink.value;
            }
            if(edge.source.link === "gives" && edge.source.id == selectedNode && edge.status === "Pending"){
              color =  stitchesTheme.colors.mapReceiveLinkPending.value;
            }
            if(edge.target.link === "receives" && edge.target.id == selectedNode && edge.status === "Accepted"){
              color =  stitchesTheme.colors.mapGiveLink.value;
            }
            if(edge.target.link === "receives" && edge.target.id == selectedNode && edge.status === "Pending"){
              color =  stitchesTheme.colors.mapGiveLinkPending.value;
            }
            if(edge.source.id === "MicroGrantStrategy"){
                color = stitchesTheme.colors.mapLink.value;
            }
        }
        return color;
      },
      [selectedNode]
    );
  
    const linkDirectionalParticleWidth = useCallback((edge) => {
      //const cal = Math.max(0.1, edge.source.val / 10);
      
      if((selectedNode === edge.target.id || selectedNode === edge.source.id) && edge.source.id !== "MicroGrantStrategy")  {
      return (edge.target.ratio)*MIN_ZOOM * NODE_R * 2;
      }
      return 0
    }, [selectedNode]);
  
    const getWidth = useCallback((edge) => {
        if(edge.source.id !== "MicroGrantStrategy") return (edge.target.ratio) * MIN_ZOOM * NODE_R * 2;
        return 0.7
    }, []);
  
    const getCurvature = useCallback((edge) => {
      return 0.1;
    }, []);
  
    const isLinkVisible = useCallback((edge) => {
     
      return 1;
    }, []);
  
    const isNodeVisible = useCallback((node) => {
      
      return 1;
    }, []);
  
    const nodeCanvasObject = useCallback(
      (node, canvas) => {
  
      //console.log('node', node);
        const nid = node.id;
  
        const radius = NODE_R;
        const width = node.ratio * NODE_R;
  
        let strokeColor = selectedNode === nid ? stitchesTheme.colors.mapNodeFade.value : stitchesTheme.colors.mapNode.value;
      
      if(node.status === '') strokeColor = stitchesTheme.colors.mapNode.value
      else if (node.status === 'Accepted') strokeColor = stitchesTheme.colors.mapNodeAccepted.value
      else if (node.status === 'Pending') strokeColor=stitchesTheme.colors.mapNodePending.value
  
      if (nid === selectedNode)
        strokeColor = stitchesTheme.colors.mapNodeHighlight.value;
      if (selectedNode === nid) {
        const inNode = node.link === "gives" ? true:false
        const outNode = node.link === "recevies" ? true:false
        const both = node.link === "both" ? true:false
        if (inNode) strokeColor = stitchesTheme.colors.mapGive.value;
        if (outNode) strokeColor = stitchesTheme.colors.mapReceive.value;
        // if (both)
        //   strokeColor = stitchesTheme.colors.mapCirculate.value;
      }
  
        canvas.beginPath();
        canvas.arc(node.x, node.y, radius + 0.5 * width, 0, 2 * Math.PI);
        canvas.strokeStyle = strokeColor;
        canvas.lineWidth = width;
        canvas.stroke();
        canvas.closePath();
  
        canvas.save();
        canvas.beginPath();
        canvas.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        canvas.fillStyle = stitchesTheme.colors.mapNode.value;
        canvas.fill();
        canvas.clip();
  
        const img = images.current.get(node.img);
        if (img) {
          try {
            canvas.drawImage(
              img,
              node.x - radius,
              node.y - radius,
              radius * 2,
              radius * 2
            );
          } catch (error) {
            // console.error(error);
            // nothing.
          }
        }
  
        canvas.restore();
      },
      [stitchesTheme,selectedNode]
    );
  
    const onNodeClick = useCallback((node) => {
    //  console.log('onNodeClick', node);
     if (selectedNode === node.id) {
      setSelectedNode('');
    } else {
      setSelectedNode(node.id);
    }

    }, []);
  
    const onBackgroundClick = useCallback(() => {
      // console.log('onBackgroundClick');
      setSelectedNode('')
    }, []);


    if(mapGraphData.nodes.length>0){
        return (
            <StyledAutoSizer>
            {({height,width})=>(
                <ForceGraph2D
                    ref={fgRef}
                    backgroundColor={stitchesTheme.colors.background.value}
                    graphData={mapGraphData}
                    height={height}
                    width={width}
                    nodeRelSize={NODE_R}
                    nodeCanvasObject={nodeCanvasObject}
                    onNodeClick={onNodeClick}
                    onBackgroundClick={onBackgroundClick}
                    onLinkClick={onBackgroundClick}
                    nodeVisibility={isNodeVisible}
                    linkVisibility={isLinkVisible}
                    linkColor={linkColor}
                    linkDirectionalParticleWidth={linkDirectionalParticleWidth}
                    linkWidth={getWidth}
                    linkCurvature={getCurvature}
                    linkDirectionalParticles={4}
                    minZoom={MIN_ZOOM}
                />
                )}
            </StyledAutoSizer>
            
                  
          );
    }
  
    

}

export default AMForceGraph