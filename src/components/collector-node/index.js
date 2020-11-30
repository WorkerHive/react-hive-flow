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

import { withEditor } from '../../context';
import NodeWrapper from '../node-wrapper';
import styles from './styles.module.css';

export const type = "collectorNode"

export const modal = withEditor((props) => {
  let selectionNodes = props.editor.links.filter((a) => a.source == props.node.id).map((x) => {
    return props.editor.nodes.filter((a) => a.id == x.target)[0]
  })

  return (
    <List>
        {selectionNodes.map((x) => {
          console.log(x)
          return (
            <ListItem button onClick={() => {
              /*              if(props.node && props.node.id){
                console.log(props.node)
                  props.editor.updateNode(props.node.id, (node) => {
                    node.data.picked = x;
                    return node;
                
                  })
              }*/
            }}>
              {x.data.picked != null ? x.data.picked.data.label : x.data.label}
              {x.data.picked != null ? x.data.picked.data.price : ''}
             </ListItem>
          )
        })}
      <ListItem>
        ${((selectionNodes).map((x) => x.data && x.data.picked ?  x.data.picked.data.price : 0).concat([0])).reduce((a,b) => parseFloat(a)+parseFloat(b))}
      </ListItem>
    </List>
        
  );
})


function CollectorNode(props){
  const [ menuOpen, openMenu ] = React.useState(false)


  let node = (props.editor && props.editor.nodes || []).filter((a) => a.id == props.id)[0]

  return (
    <NodeWrapper {...props}> 
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
            <div>Collecting Info...</div>
          )}
    </NodeWrapper>
  );
}

export const node = withEditor(CollectorNode)
