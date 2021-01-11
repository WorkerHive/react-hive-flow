import React from 'react';
const { withContext } = require('with-context')

export interface HiveEditorProps {
  direction?: string;
  nodes: Array<HiveMapNode>;
  links: Array<HiveMapLink>;
  updateNode?: Function;
  nodeTypes?: Array<HiveMapNodeType>;
  statusColors?: Record<string, any>;
  addNode?: (type: string, position: HiveMapPosition) => HiveMapNode;
  addLink?: (source: string, target: string) => HiveMapLink;
  onNodeUpdate?: Function;
  onLinkAdd?: Function;
  onNodeAdd?: Function;
  onLinkRemove?: Function;
  onNodeRemove?: Function;
  onElementsRemove?: Function;
  exploreNode?: (id: string) => void
  joinNode?: (id: string) => void;
}

export interface HiveMapNode {
  id: string;
  type: string;
  data: any;
  style?: any;
  position: HiveMapPosition;
  members?: Array<string>
}

export interface HiveMapNodeType {
  type: string;
  label?: string;
  node: React.FC;
  modal: React.FC;
}

export interface HiveMapLink {
  id: string;
  source: string;
  target: string;
}

export interface HiveMapPosition{
  x: number;
  y: number;
}

export const EditorContext = React.createContext<HiveEditorProps>({
  nodes: [],
  links: []
})

export const withEditor = withContext(EditorContext, 'editor')
