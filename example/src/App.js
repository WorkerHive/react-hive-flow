import React from 'react'

import HiveEditor from 'react-hive-flow'
import 'react-hive-flow/dist/index.css'
import './index.css';

const App = () => {
  let [ nodes, setNodes ] = React.useState([])
  let [ links, setLinks ] = React.useState([])

  return <HiveEditor 
      direction="horizontal"
      nodes={nodes}
    links={links}
    modalBody={(NodeType, node, editor) => {
      return (
      <div className="hive-modal">
        <NodeType.modal node={node} />
        <div>
          <div>Join</div>
        </div>
      </div>)
    }}
      onNodeChange={(nodes) => setNodes(nodes)}
      onLinkChange={(links) => setLinks(links)}
    />
}

export default App
