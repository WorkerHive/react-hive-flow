import React from 'react';

import {
  Add,
  Done,
  Clear,
  Create,
  Visibility
} from '@material-ui/icons';
import { HiveEditorProps, HiveMapNode, withEditor } from '../../context';
import { Handle, Position } from '@thetechcompany/react-flow-renderer';

import styles from './styles.module.css';

const Tappable = require('react-tappable');

export interface NodeWrapperProps {
  editor: HiveEditorProps;
  id: string;
  xPos: number;
  yPos: number;
  data: any;
  selected: any;
  children: any;
}

function NodeWrapper(props : NodeWrapperProps){

  const nodeMenu = [
    {
      icon: <Add />,
      action: () => {
        let pos = {
          x: props.editor.direction == "horizontal" ? props.xPos + 300 : props.xPos,
          y: props.editor.direction == "horizontal" ? props.yPos : props.yPos + 100
        }
        var node = props.editor.addNode!('baseNode', pos)
        let link = props.editor.addLink!(props.id, node.id)
      }
    },
    {
      icon: (props.data && props.data.status != 'COMPLETE') ? <Done /> : <Clear />,
      action: () => {
        props.editor.updateNode!(props.id, (node : HiveMapNode) => {
    
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
        props.editor.exploreNode!(props.id)
      }
    }
  ]

  let node : HiveMapNode | null = props.editor.nodes.filter((a : HiveMapNode) => a.id == props.id)[0] || {} 
  let status = (node && node.data && node.data.status) || "NEW"
  let color = props.editor.statusColors![status.toLowerCase()]

  return (
    <div style={{background: color || 'gray', pointerEvents: node && node.id ? 'all' : 'none'}} className={styles.nodeWrapper}>
      
      {node && node.id && <Handle 
        className={styles[`react-flow__handle-${props.editor.direction == "horizontal" ? 'left' : 'top'}`]}
        type="target"
        position={props.editor.direction == "horizontal" ? Position.Left  : Position.Top}
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
            {node.members && node.members.map((x : any) => (
            <img src={`https://avatars.dicebear.com/api/avataaars/${x}.svg`} />
          ))}
        </div>
      {node && node.id && <Handle 
        className={styles[`react-flow__handle-${props.editor.direction == "horizontal" ? "right" : "bottom"}`]}
        type="source"
        position={props.editor.direction == "horizontal" ? Position.Right : Position.Bottom} />}
    </div>
  );
}

export default withEditor(NodeWrapper)
