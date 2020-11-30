import React from 'react';

import {
  Add,
  Done,
  Clear,
  Create,
  Visibility
} from '@material-ui/icons';

import Tappable from 'react-tappable';

import { withEditor } from '../../context';
import { Handle } from '@thetechcompany/react-flow-renderer';

import styles from './styles.module.css';

function NodeWrapper(props){

  const nodeMenu = [
    {
      icon: <Add />,
      action: () => {
        var node = props.editor.addNode('baseNode', {
          x: props.xPos,
          y: props.yPos + 100
        })
        let link = props.editor.addLink(props.id, node.id)
      }
    },
    {
      icon: (props.data && props.data.status != 'COMPLETE') ? <Done /> : <Clear />,
      action: () => {
        props.editor.updateNode(props.id, (node) => {
          let n = Object.assign({}, node)
          n.data.status = (props.data.status != 'COMPLETE'? 'COMPLETE'  : "UNFINISHED");
          return n;
        })
      }
    },
    {
      icon: <Create />,
      action: () => {
        props.editor.exploreNode(props.id)
      }
    }
  ]

  return (
    <div className={styles.nodeWrapper}>
      <Handle 
        type="target"
        position="top"
        style={{background: "#555"}} />
      
        <div className={styles.nodeWrapperInner}>

          {props.children}

          {props.selected && (
            <div className={styles.nodeMenu}>
              {nodeMenu.map((x) => (
                <Tappable onTap={x.action} component={'div'}>{x.icon}</Tappable>
              ))}
            </div>
          )}
        </div>
      
      <Handle 
        type="source"
        position="bottom" />
    </div>
  );
}

export default withEditor(NodeWrapper)
