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

import { mapStatus } from './style';
import styles from './styles.module.css'

const uuid = require('uuid')

const onLoad = (reactFlowInst) => {
  console.debug('=> React Flow loaded')
  reactFlowInst.fitView();
}

export default function HiveEditor(props) {

  const [ exploring, setExploring ] = React.useState(null)

  const updateNode = (id, node_func) => {
    let n = props.nodes.slice()
    let ix = n.map((x) => x.id).indexOf(id) 
    if(ix > -1){
      n[ix] = node_func(n[ix])
      _setNodes(n)
    }
  }

  const _setNodes = (nodes) => {
    if(props.onNodeChange){
      props.onNodeChange(nodes)
    }
  }

  const _setLinks = (links) => {
    if(props.onLinkChange){
      props.onLinkChange(links)
    }
  }

  const addChild = (parent_id) => {
    let parent_node = props.nodes.filter((a) => a.id == parent_id)
    if(parent_node && parent_node.length > 0){
      let newPos = {
        x: parent_node[0].position.x,
        y: parent_node[0].position.y + 100
      }

      let node = addNode('baseNode', newPos)
      let link = addLink(parent_id, node.id)
    }
  }
 
  const addLink = (parent, target) => {
    let link = {
      id: uuid.v4(),
      source: parent,
      target: target
    }
    _setLinks(props.links.concat([link]))
    return link
  }


  const addNode = (type, position) => {
        let id = uuid.v4()
        let node = {
          type: type || 'baseNode',
          id: id,
          position: position,
          data: {
            label: ""
          }
        }
        let n = props.nodes.slice();
        n.push(node)
        _setNodes(n)
        
        return node;
  }

  const onElementsRemove = (elementsToRemove) => {
    let _nodes = elementsToRemove.filter((a) => a.source == null)
    let _links = elementsToRemove.filter((a) => a.source != null)
    _nodes = props.nodes.filter((a) => _nodes.map((x) => x.id).indexOf(a.id) < 0);
    _links = props.links.filter((a) => _links.map((x) => x.id).indexOf(a.id) < 0)
    _setNodes(_nodes)
    _setLinks(_links)
  }

  const onConnect = (params) => {
    addLink(params.source, params.target)
  }

  const onNodeDrag = (event, node) => {
    updateNode(node.id, (_node) => {
      _node.position = node.position
      return _node
    })
  }

  const joinNode = (node_id) => {
    if(props.onJoinNode){
      props.onJoinNode((user) => {
        updateNode(node_id, (node) => {
          if(!node.members) node.members = []
          if(node.members && !node.members.indexOf(user) > -1)node.members.push(user)
          return node;
        })
      })
    }
  }

  const exploreNode = (node_id) => {
    let node = props.nodes.filter((a) => a.id == node_id)[0]
    console.debug('=> Explore Node', node)
    setExploring(node)
  }

  let editor = {
      nodes: props.nodes,
      links: props.links,
      direction: props.direction || "vertical",
      exploring: exploring,
      exploreNode: exploreNode,
      nodeTypes: props.nodeTypes,
      updateNode: updateNode,
      joinNode: joinNode,
      addNode: addNode,
      addLink: addLink,
      addChild: addChild
  }
  return (
    <EditorContext.Provider value={editor}>
      <ControlHeader />
      <ReactFlow
        elements={mapStatus(props.links, props.nodes)}
        nodeTypes={{
          baseNode: BaseNode.node,
          productNode: ProductNode.node,
          pickerNode: PickerNode.node,
          collectorNode: CollectorNode.node,
          ...(props.nodeTypes || []).map((x) => x.node)
        }}
        onLoad={onLoad}
        onNodeDragStart={onNodeDrag}
        onNodeDragStop={onNodeDrag}
        onNodeDrag={onNodeDrag}
        onElementsRemove={onElementsRemove}
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
          props.nodeTypes || []
        ).concat([BaseNode, ProductNode, PickerNode, CollectorNode])
        .filter((a) => exploring.type == a.type)
          .map((X) => props.modalBody ? props.modalBody(X, exploring, editor) : <X.modal node={exploring} />)[0]
        }
    </ControlModal>
  </EditorContext.Provider>
  )
}
