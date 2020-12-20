
  const addChild = (parent_id) => {
    let parent_node = props.editor.nodes.filter((a) => a.id == parent_id)
    if(parent_node && parent_node.length > 0){
      let newPos = {
        x: parent_node[0].position.x,
        y: parent_node[0].position.y + 100
      }

      let node = addNode('baseNode', newPos)
      let link = addLink(parent_id, node.id)
    }
  }
 
  const addLink = (parent, target) => {
    let link = {
      id: uuid.v4(),
      source: parent,
      target: target
    }
    
    if(props.onLinkAdd) props.onLinkAdd(link)
    //_setLinks(props.links.concat([link]))

    return link
  }


  const addNode = (type, position) => {
        let id = uuid.v4()
        let node = {
          type: type || 'baseNode',
          id: id,
          position: position,
          data: {
            label: ""
          }
        }
        let n = props.editor.nodes.slice();
        n.push(node)

        if(props.onNodeAdd) props.onNodeAdd(node)
        //_setNodes(n)
        
        return node;
  }

