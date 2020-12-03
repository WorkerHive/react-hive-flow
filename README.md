# react-hive-flow

> Hive Flow maker for React

[![NPM](https://img.shields.io/npm/v/react-hive-flow.svg)](https://www.npmjs.com/package/react-hive-flow) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-hive-flow
```

## Dev

```
cd react-hive-flow

yarn start

cd react-hive-flow/example

yarn start

```

## Usage


### Editor

```jsx
import React, { Component } from 'react'

import HiveEditor from 'react-hive-flow'
import 'react-hive-flow/dist/index.css'

class Example extends Component {
  render() {
    return <HiveEditor
              direction={"vertical" || "horizontal"}
              nodes={[
                {
                  id: 'unique key',
                  data: {
                    label: 'Label'
                  },
                  position: {
                    x: Int,
                    y: Int
                  }
                }
              ]}
              links={[{
                id: 'unique key 2',
                source: 'node_id',
                target: 'node_id',
                animated: Boolean
              }]}
              modalBody={(NodeType, node, editor) => {
                <div>
                  <NodeType.modal node={node}/>
                  {/* misc jsx */}
                </div>
              }}
              onJoinNode={(cb) => {
                cb(user_id)
              }}
              onNodeChange={(nodes) => {
                //new state of nodes
              }}
              onLinkChange={(links) => {
                //new state of links
              }} />
  }
}
```

### Editor

```
  let editor = {
      nodes: props.nodes,
      links: props.links,
      exploring: exploring,
      exploreNode: (id) => opens node in modal for editing 
      nodeTypes: {nodeKey: Node},
      updateNode: (id, node_func) => runs node_func(node) from id, expects
modifications to be made in the function and then the new value for node
returned,
      joinNode: (id) => join members of node,
      addNode: (type, position) => nodeKey and position object,
      addLink: (from, to) => add link,
      addChild: (parent_id) => add base node as child of parent
  }
```

### Nodes

```

import React from 'react';

export const type = 'nodeKey'  

export function modal(props){
  //props.node
  //props.editor
}

export function node(props){
  //props.node
  //props.editor
}

```

## License

MIT © [balbatross](https://github.com/balbatross)
