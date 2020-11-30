export const mapStatus = (links, nodes) => {
    nodes = nodes.slice()
    for(var i = 0; i < nodes.length; i++){
      let node = nodes[i];
      let _links = links.filter((a) => a.source == node.id);

      let linkStatus = _links.map((x) => {
        return nodes.filter((b) => b.id == x.target)[0].data.status || "UNFINISHED";
      })

      if(linkStatus.filter((a) => a != 'COMPLETE').length > 0){

        _links.map((x, ix) => {
          let lix = links.map((x) => x.id).indexOf(x.id)
          links[lix].animated = linkStatus[ix] == "UNFINISHED";
        })
        nodes[i].data.status = 'BLOCKED'
        nodes[i].style = {background: 'red'}
      }else if(linkStatus.filter((a) => a != 'COMPLETE').length == 0 && node.data.status != 'COMPLETE'){
        _links.map((x, ix) => {
          let lix = links.map((x) => x.id).indexOf(x.id)
          links[lix].animated = linkStatus[ix] == "UNFINISHED";
        })
        nodes[i].data.status = 'UNFINISHED'
        nodes[i].style = {background: 'orange'}
      }else{
        nodes[i].style = {background: 'green'}
      }
      nodes[i].style = {
        ...nodes[i].style,
        borderRadius: 7
      }
    }
    return links.slice().concat(nodes)
}
