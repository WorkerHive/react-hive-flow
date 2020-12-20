import React from 'react';

import {Paper, Typography} from '@material-ui/core';
import { withEditor } from '../../context';

import styles from './styles.module.css';

function NodePanel(props){

    const onDragStart = (event, nodeType) => {
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
            {(props.editor.nodeTypes || []).map((x) => ({node: x.node, label: x.type, type: x.type})).map((X) => (
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