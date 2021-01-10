import React from 'react';

import {Paper, Typography} from '@material-ui/core';
import { HiveEditorProps, HiveMapNodeType, withEditor } from '../../context';

import styles from './styles.module.css';

export interface NodePanelProps {
    editor: HiveEditorProps    
}

function NodePanel(props : NodePanelProps){

    const onDragStart = (event: any, nodeType : any) => {
        console.log('drag start ', nodeType)
        if(event){
            event.dataTransfer.setData('application/reactflow', nodeType)
            event.dataTransfer.effectAllowed = 'move'
        }
    }
    console.log("PROPS", props.editor)
    return (
        <Paper 
            className={styles['node-panel']}>
            <Typography variant="h6">Available Nodes</Typography>
            {(props.editor.nodeTypes!).map((x : HiveMapNodeType) => ({node: x.node, label: x.type, type: x.type})).map((X) => (
        <div 
            draggable
            className={styles.dndnode} 
            onDragStart={event => onDragStart(event, X.label)}>
                <X.node  />
        </div>
            ))}
        </Paper>
    )
}

export default withEditor(NodePanel)