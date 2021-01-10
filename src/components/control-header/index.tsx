import React from 'react';
import {
  Menu,
  MenuItem
} from '@material-ui/core';

import { HiveMapNodeType, HiveEditorProps, withEditor } from '../../context';

import styles from './styles.module.css';

export interface ControlHeaderProps {
  editor: HiveEditorProps;
}

function ControlHeader(props : ControlHeaderProps){
  const [ anchorEl, setAnchor ] = React.useState<any>()
  const [selectedMenu, setSelected ] = React.useState<any>()

  const controlOptions = [ 
    {
      name: "View",
      menu: (
        <div>
        </div>
      )
    },
    {
      name: "Select",
      menu: (
        <div>
        </div>
      )
    },
    {
      name: "Add",
      menu: (props.editor.nodeTypes!).map((x : HiveMapNodeType) => ({label: x.type, type: x.type})).map((x : any) => (
        <MenuItem className={styles.dropdownMenuItem} onClick={() => props.editor.addNode!(x.type, {x: 300, y: 300})}>{x.label}</MenuItem>
      ))
    },
    {
      name: "Object",
      menu: (
        <div>
        </div>
      )}
  ]

  return (
    <div className={styles.controlHeader}>
      {controlOptions.map((x) => (
        <div onClick={(e : React.MouseEvent) => {
          setAnchor(e.currentTarget)
          setSelected(x)
        }}>
          {x.name}

        </div>
      ))}

        <Menu
          className={styles.dropdownMenu}
            keepMounted
            anchorEl={anchorEl}
            open={selectedMenu != null} 
            onClose={() => {
              setSelected(null)
            }}>
            {selectedMenu && selectedMenu.menu}
          </Menu>
    </div>
  );
}

export default withEditor(ControlHeader)
