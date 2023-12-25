import React, { useRef } from 'react';

import Button from '@mui/material/Button';

import Editor from '@monaco-editor/react';

const CodeEditor = ({ callbackOnEditorContent }) => {

  // A reference variable for the editor
  const editorRef = useRef(null);

  // Gets executed when the editor is added
  function handleEditorMount(editor, monaco) {
    editorRef.current = editor;
  }

  // Retrieves the contents of the editor via the reference variable
  function retrieveEditorContent() {
    // Execute a callback function using the editor's content. This callback may be implemented as an HTTP request, database operation etc.
    callbackOnEditorContent(editorRef.current.getValue());
  }

  return (
    <div>
      <Editor height="20vh" defaultLanguage="javascript" defaultValue="// Add your solution here" onMount={handleEditorMount}/>
      <Button variant="outlined" onClick={retrieveEditorContent}>Submit</Button>
    </div>
  );
};

export default CodeEditor;