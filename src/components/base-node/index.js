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

import { withEditor } from '../../context';
import NodeWrapper from '../node-wrapper';

import styles from './styles.module.css';

export const type = "baseNode"

export const modal = withEditor((props) => {
  return (
      <TextField 
        fullWidth
        onChange={(e) => {
          props.editor.updateNode(props.node.id, (node) => {
            node.data.label = e.target.value;
            return node;
          })
        }}
        value={props.node.data.label}
        label="Description" 
        rows={6} 
        multiline />
  );
})


function BaseNode(props){
  const [ menuOpen, openMenu ] = React.useState(false)

  let node = (props.editor && props.editor.nodes || []).filter((a) => a.id == props.id)
  return (
    <NodeWrapper {...props}>
      <textarea
        key={props.id + 'textarea'}
        rows={4}
        placeholder="Node description"
        value={node.length > 0 ? node[0].data.label : ""}
        onChange={(e) => {
          //update node value in context
          props.editor.updateNode(props.id, (node) => {
            node.data.label = e.target.value;
            return node;
          })
        }} />
      <div className={styles['base-node__info']}>
        {/* Render assigned people */}
      </div>
    </NodeWrapper>
  );
}

export const node = withEditor(BaseNode)
