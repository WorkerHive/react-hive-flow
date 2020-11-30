import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@material-ui/core';

import { withEditor } from '../../context';

import styles from './styles.module.css';

function ControlModal(props){

  const controlMenu = [
    {
      label: "Join",
      action: () => {
        props.editor.joinNode(props.selected.id)
      }
    },
    {
      label: "Due Date",
      action: () => {
        
      }
    },
    {
      label: "Checklist",
      action: () => {
      }
    }
  ]

  return (
    <Dialog 
      fullWidth 
      open={props.open} 
      onClose={props.onClose}>
      <DialogTitle>{props.selected && props.selected.data.label}</DialogTitle>
      <DialogContent>
        <div className={styles.controlModal}>
              {props.children(props.selected)} 
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button 
          color="primary"
          variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default withEditor(ControlModal)
