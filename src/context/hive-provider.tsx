import React from 'react';
import * as BaseNode from '../components/base-node'
import { EditorContext, HiveMapPosition, HiveEditorProps } from '.';
import { v4 as uuidv4} from 'uuid';

export interface HiveProviderProps {
    store: any;
    children: any;
}


export const HiveProvider : React.FC<HiveProviderProps> = (props) => {

    let nodeTypes = (props.store.nodeTypes || []).concat([BaseNode])
    let editor = {
        ...props.store,
        nodeTypes: nodeTypes
    }

    editor.addLink = (parent : string, target : string) => {
        let link = {
          id: uuidv4(),
          source: parent,
          target: target
        }
        
        if(editor.onLinkAdd) editor.onLinkAdd(link)
    
        return link
    }

    editor.addNode = (type : string, position : HiveMapPosition) => {
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

    editor.updateNode = (id : string, node_func : Function) => {
        let n = editor.nodes.slice()
        let ix = n.map((x : any) => x.id).indexOf(id) 
        if(ix > -1){
            let updated = node_func(n[ix])
            if(editor.onNodeUpdate) editor.onNodeUpdate(id, updated)
        }
    }

    editor.onElementsRemove =  (elementsToRemove : any) => {
        let _nodes = elementsToRemove.filter((a : any) => a.source == null)
        let _links = elementsToRemove.filter((a : any) => a.source != null)
    
        if(_nodes.length > 0 && editor.onNodeRemove) editor.onNodeRemove(_nodes)
        if(_links.length > 0 && editor.onLinkRemove) editor.onLinkRemove(_links)
    
      }

    return (
        <EditorContext.Provider value={editor}>
            {props.children}
        </EditorContext.Provider>
    )
}


