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
        let pos = {
          x: props.editor.direction == "horizontal" ? props.xPos + 300 : props.xPos,
          y: props.editor.direction == "horizontal" ? props.yPos : props.yPos + 100
        }
        var node = props.editor.addNode('baseNode', pos)
        let link = props.editor.addLink(props.id, node.id)
      }
    },
    {
      icon: (props.data && props.data.status != 'COMPLETE') ? <Done /> : <Clear />,
      action: () => {
        props.editor.updateNode(props.id, (node) => {
    
          return {
            data: {
              status:(props.data.status != 'COMPLETE'? 'COMPLETE'  : "UNFINISHED") 
            }
          };
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

  let node = props.editor.nodes.filter((a) => a.id == props.id)[0] || {}
  let status = (node.data && node.data.status) || "NEW"
  let color = props.editor.statusColors[status.toLowerCase()]

  return (
    <div style={{background: color || 'gray', pointerEvents: node.id ? 'all' : 'none'}} className={styles.nodeWrapper}>
      
      {node.id && <Handle 
        className={styles[`react-flow__handle-${props.editor.direction == "horizontal" ? 'left' : 'top'}`]}
        type="target"
        position={props.editor.direction == "horizontal" ? "left" : "top"}
        style={{background: "#555"}} />}
      
        <div className={styles.nodeWrapperInner}>

          {props.children}

          {props.selected && (
            <div className={styles.nodeMenu}>
              {nodeMenu.map((x, ix) => (
                <Tappable key={ix} onTap={x.action} component={'div'}>{x.icon}</Tappable>
              ))}
            </div>
          )}
        </div>
        <div className={styles.nodeTeam}>
            {node.members && node.members.map((x) => (
            <img src={`https://avatars.dicebear.com/api/avataaars/${x}.svg`} />
          ))}
        </div>
      {node.id && <Handle 
        className={styles[`react-flow__handle-${props.editor.direction == "horizontal" ? "right" : "bottom"}`]}
        type="source"
        position={props.editor.direction == "horizontal" ? "right" : "bottom"} />}
    </div>
  );
}

export default withEditor(NodeWrapper)
