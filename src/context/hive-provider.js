import React from 'react';
import * as BaseNode from '../components/base-node'
import { EditorContext } from './';
import { v4 as uuidv4} from 'uuid';

export default function HiveProvider(props){

    let nodeTypes = (props.store.nodeTypes || []).concat([BaseNode])
    let editor = {
        ...props.store,
        nodeTypes: nodeTypes
    }

    editor.addLink = (parent, target) => {
        let link = {
          id: uuidv4(),
          source: parent,
          target: target
        }
        
        if(editor.onLinkAdd) editor.onLinkAdd(link)
    
        return link
    }

    editor.addNode = (type, position) => {
        let id = uuidv4()
        let node = {
          type: type || 'baseNode',
          id: id,
          position: position,
          data: {
            label: ""
          }
        }
        let n = editor.nodes.slice();
        n.push(node)

        if(editor.onNodeAdd) editor.onNodeAdd(node)
        
        return node;
    }

    editor.updateNode = (id, node_func) => {
        let n = editor.nodes.slice()
        let ix = n.map((x) => x.id).indexOf(id) 
        if(ix > -1){
            let updated = node_func(n[ix])
            if(editor.onNodeUpdate) editor.onNodeUpdate(id, updated)
        }
    }

    editor.onElementsRemove =  (elementsToRemove) => {
        let _nodes = elementsToRemove.filter((a) => a.source == null)
        let _links = elementsToRemove.filter((a) => a.source != null)
    
        if(_nodes.length > 0 && editor.onNodeRemove) props.onNodeRemove(_nodes)
        if(_links.length > 0 && editor.onLinkRemove) props.onLinkRemove(_links)
    
      }

    return (
        <EditorContext.Provider value={editor}>
            {props.children}
        </EditorContext.Provider>
    )
}


