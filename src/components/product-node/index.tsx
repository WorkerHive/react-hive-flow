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
import { HiveEditorProps, withEditor } from '../../context';
import styles from './styles.module.css';

export const type = "productNode"

export interface ProductNodeModalProps {
  node: any;
  editor: HiveEditorProps;
}

export const modal = withEditor((props: ProductNodeModalProps) => {
  return [
    <TextField
      onChange={(e) => {
        props.editor.updateNode(props.node.id, (node: any) => {
          node.data.label = e.target.value;
          return node;
        })
      }}
      value={props.node.data.label}
        fullWidth
        label="Product Name"  />,
    <TextField
      onChange={(e) => {
        props.editor.updateNode(props.node.id, (node: any) => {
          node.data.price = e.target.value;
          return node;
        })  
      }}
      value={props.node.data.price}
        fullWidth
        label="Product Price" />,
    <TextField
      onChange={(e) => {
        props.editor.updateNode(props.node.id, (node: any) => {
          node.data.img = e.target.value
          return node;
        })
      }}
      value={props.node.data.img}
        fullWidth
        label="Product Image" />
  ];
})

export interface ProductNodeProps {
  editor: HiveEditorProps;
  id: any;
}

function ProductNode(props : ProductNodeProps){
  const [ menuOpen, openMenu ] = React.useState(false)

  let node = (props.editor && props.editor.nodes || []).filter((a: any) => a.id == props.id)[0]

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
