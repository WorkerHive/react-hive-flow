import React from 'react';
import { withContext } from 'with-context';

export const EditorContext = React.createContext({
  nodes: [],
  links: []
})

export const withEditor = withContext(EditorContext, 'editor')
