import React from 'react'

import HiveEditor, { BaseNode, HiveProvider, withEditor, NodePanel } from 'react-hive-flow'
import { merge } from 'lodash';
import 'react-hive-flow/dist/index.css'
import './index.css';

const App = () => {
  let [ nodes, setNodes ] = React.useState([
    {
      id: "1",
      type: "baseNode",
      data: {
        label: "Test",
        status: "DOING"
      },
      position: {
        x: 300, 
        y: 300
      }
    }
  ])
  let [ links, setLinks ] = React.useState([])

  return (
    <HiveProvider store={{
      nodes: nodes,
      links: links,
      onNodeAdd: (node) => setNodes(nodes.concat([node])),
      onLinkAdd: (link) => setLinks(links.concat([link])),
      onNodeUpdate: (id, node) => {
        console.log("Update", id, node)
        let ix = nodes.map((x) => x.id).indexOf(id)
        let n = nodes.slice()
        n[ix] = merge(n[ix], node)     
        setNodes(n)
      },
      direction: "vertical",
      statusColors: {
        unfinished: 'gray',
        doing: '#d4faf4',
        complete: 'green',

      },
  }}>
    <HiveEditor 
      modalBody={(NodeType, node, editor) => {
        return (
          <div className="hive-modal">
            <NodeType.modal node={node} />
            <div>
              <div>Join</div>
            </div>
          </div>
        )
      }}

    />
    <NodePanel />
    </HiveProvider>)
}

export default App
