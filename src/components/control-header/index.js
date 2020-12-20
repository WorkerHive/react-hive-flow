import React from 'react';
import {
  Menu,
  MenuItem
} from '@material-ui/core';

import { withEditor } from '../../context';

import styles from './styles.module.css';

function ControlHeader(props){
  const [ anchorEl, setAnchor ] = React.useState(null)
  const [selectedMenu, setSelected ] = React.useState(null)
console.log(props.editor)
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
      menu: (props.editor.nodeTypes || []).map((x) => ({label: x.type, type: x.type})).map((x) => (
        <MenuItem className={styles.dropdownMenuItem} onClick={() => props.editor.addNode(x.type, {x: 300, y: 300})}>{x.label}</MenuItem>
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
        <div onClick={(e) => {
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
