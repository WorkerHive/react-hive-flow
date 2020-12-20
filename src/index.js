import React from 'react'
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background
} from '@thetechcompany/react-flow-renderer';

import { EditorContext } from './context';

//Controls
import ControlHeader from './components/control-header';
import ControlModal from './components/control-modal';

//Node Declaration
import * as BaseNode from './components/base-node';
import * as PickerNode from './components/picker-node';
import * as ProductNode from './components/product-node';
import * as CollectorNode from './components/collector-node';

import { withEditor } from './context';
import HiveProvider from './context/hive-provider';
import NodeWrapper from './components/node-wrapper';
import NodePanel from './components/node-panel'

import { v4 as uuidv4 } from 'uuid';
import { mapStatus } from './style';
import styles from './styles.module.css'

const uuid = require('uuid')


export {
  NodePanel,
  NodeWrapper,
  withEditor,
  HiveProvider,
  BaseNode
}


function HiveEditor(props) {

  const [ exploring, setExploring ] = React.useState(null)
  const [ reactFlowInst, setFlowInst ] = React.useState(null)

  const onLoad = (reactFlowInst) => {
    console.debug('=> React Flow loaded')
    reactFlowInst.fitView();
    setFlowInst(reactFlowInst)
  }

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();
    console.log(event.dataTransfer)
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInst.project({ x: event.clientX, y: event.clientY - 40 });

    const newNode = {
      id: uuidv4(),
      type,
      position,
      data: { label: `${type} node` },
    };

    console.log(newNode, type)
    if(props.editor.onNodeAdd) props.editor.onNodeAdd(newNode);
  };

  
  const onConnect = (params) => {
    props.editor.addLink(params.source, params.target)
  }

  const onNodeDrag = (event, node) => {
    console.log("Node drag", event, node)
    props.editor.updateNode(node.id, (oldNode) => {
      return {position: node.position};
    })
  }

  const joinNode = (node_id) => {
    if(props.onJoinNode){
      props.onJoinNode((user) => {
        props.editor.updateNode(node_id, (node) => {
          let members = node.members || [];
          if(!members.indexOf(user) > -1)members.push(user)
          return {members};
        })
      })
    }
  }

  const getNodeTypes = () => {

    let propNodes = {};
    
    let nodeTypes = props.editor.nodeTypes || [];
    for(var i = 0; i < nodeTypes.length; i++){
      propNodes[nodeTypes[i].type] = nodeTypes[i].node;
    }
    

    return Object.assign({}, propNodes)
  }



  return (
    <div style={{flex: 1, display: 'flex', position: 'relative'}}>
      <ReactFlow
        elements={props.editor.links.concat(props.editor.nodes)}
        nodeTypes={getNodeTypes()}
        onLoad={onLoad}
        onNodeDragStart={onNodeDrag}
        onNodeDragStop={onNodeDrag}
        onElementsRemove={props.editor.onElementsRemove}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        snapToGrid={props.snapToGrid || true}
        snapGrid={[15, 15]}>
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            if (n.type === 'default') return '#1a192b';
            return '#eee';
          }}
          nodeColor={(n) => {
            if(props.statusColors && props.statusColors[n.data.status.toLowerCase()]) return props.statusColors[n.data.status.toLowerCase()]; 
            if(n.style?.background) return n.style.background;
            return '#fff';
          }}
          nodeBorderRadius={2} />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
      <ControlModal 
        onClose={() => setExploring(null)}
        open={exploring != null} 
        selected={exploring}>
        {(node) => 
        exploring != null && (
          editor.nodeTypes || []
        )
        .filter((a) => exploring.type == a.type)
          .map((X) => props.modalBody ? props.modalBody(X, exploring, editor) : <X.modal node={exploring} />)[0]
        }
    </ControlModal>
  </div>
  )
}

export default withEditor(HiveEditor)
