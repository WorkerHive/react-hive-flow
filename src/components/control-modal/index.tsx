import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@material-ui/core';

import { HiveEditorProps, HiveMapNode, withEditor } from '../../context';

import styles from './styles.module.css';

export interface ControlModalProps {
  editor: HiveEditorProps
  selected: HiveMapNode;
  open: boolean;
  children:any;
  onClose: (e:React.MouseEvent) => void;
}

function ControlModal(props : ControlModalProps){

  const controlMenu = [
    {
      label: "Join",
      action: () => {
        props.editor.joinNode!(props.selected.id)
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
