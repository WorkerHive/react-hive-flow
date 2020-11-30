import React from 'react';

import {
  TextField
} from '@material-ui/core';

import { 
  Clear,
  Add,
  Done,
  Visibility
} from '@material-ui/icons';

import NodeWrapper from '../node-wrapper';
import { withEditor } from '../../context';
import styles from './styles.module.css';

export const type = "productNode"

export const modal = withEditor((props) => {
  return [
    <TextField
      onChange={(e) => {
        props.editor.updateNode(props.node.id, (node) => {
          node.data.label = e.target.value;
          return node;
        })
      }}
      value={props.node.data.label}
        fullWidth
        label="Product Name"  />,
    <TextField
      onChange={(e) => {
        props.editor.updateNode(props.node.id, (node) => {
          node.data.price = e.target.value;
          return node;
        })  
      }}
      value={props.node.data.price}
        fullWidth
        label="Product Price" />,
    <TextField
      onChange={(e) => {
        props.editor.updateNode(props.node.id, (node) => {
          node.data.img = e.target.value
          return node;
        })
      }}
      value={props.node.data.img}
        fullWidth
        label="Product Image" />
  ];
})


function ProductNode(props){
  const [ menuOpen, openMenu ] = React.useState(false)

  let node = (props.editor && props.editor.nodes || []).filter((a) => a.id == props.id)[0]

  return (
    <NodeWrapper {...props}>
      <div onClick={() => openMenu(!menuOpen)} className={styles['base-node']} > 
        <img src={node && node.data && node.data.img} />
        <div className={styles.productInfo}>
          <div >
            {node && node.data && node.data.label}
          </div>
          <div>
            ${node && node.data && node.data.price}
          </div>
        </div>
    </div>
    </NodeWrapper>
  );
}

export const node = withEditor(ProductNode)
