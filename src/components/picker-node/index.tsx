import React from 'react';

import {
  TextField,
  List,
  ListItem
} from '@material-ui/core';

import { 
  Clear,
  Add,
  Done,
  Visibility
} from '@material-ui/icons';

import NodeWrapper from '../node-wrapper';

import { HiveMapNode, HiveEditorProps, withEditor } from '../../context';
import styles from './styles.module.css';

export const type = "pickerNode"

export interface PickerNodeModalProps {
  editor: HiveEditorProps
  node: HiveMapNode
  updateNode: Function;

}

export const modal = withEditor((props: PickerNodeModalProps) => {
  let selectionNodes = props.editor.links.filter((a) => a.source == props.node.id).map((x) => {
    return props.editor.nodes.filter((a) => a.id == x.target)[0]
  })

  return (
    <List>
        {selectionNodes.map((x) => 
          x.type == 'productNode' && (
            <ListItem button onClick={() => {
              if(props.node && props.node.id){
                console.log(props.node)
                  props.editor.updateNode!(props.node.id, (node : HiveMapNode) => {
                    node.data.picked = x;
                    return node;
                
                  })
              }
            }}>{props.node && props.node.data && props.node.data.picked && props.node.data.picked.id == x.id && <Done />}{x.data.label}</ListItem>
        ))}
    </List>
        
  );
})

export interface PickerNodeProps {
  id: string;
  editor: HiveEditorProps
}

function PickerNode(props : PickerNodeProps){
  const [ menuOpen, openMenu ] = React.useState(false)

  console.log(props)
  let node = (props.editor && props.editor.nodes || []).filter((a) => a.id == props.id)[0]

  return (

    <NodeWrapper {...props}>
      <div className={styles['base-node']}>      
          {node && node.data.picked ? [
            <img src={node && node.data && node.data.picked.data.img} />,
            <div className={styles.productInfo}>
              <div >
                {node && node.data && node.data.picked.data.label}
              </div>
              <div>
                ${node && node.data && node.data.picked.data.price}
              </div>
            </div>
          ] : (
            <div>Awaiting selection</div>
          )}
      </div>
    </NodeWrapper>
  );
}

export const node = withEditor(PickerNode)
