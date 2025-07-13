import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { handleQueryChange } from "../../slices/QuerySlice";

export default function QueryEditor() {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const { tabs, activeKey } = useSelector((state) => state.query);

  let activeTab = tabs.find((item) => item.key == activeKey);

  const handleChange = (value) => {
    dispatch(handleQueryChange({ key: activeKey, query: value }));
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    setTimeout(() => editor.focus(), 0);
  };

  useEffect(() => {
    if (editorRef.current) {
      setTimeout(() => editorRef.current.focus(), 0);
    }
  }, [activeKey]);
  
  return (
    <Editor
      height="100%"
      defaultLanguage="sql"
      value={activeTab["query"]}
      onChange={handleChange}
      onMount={handleEditorDidMount}
      theme="vs-light"
      options={{
        fontSize: 13,
        minimap: { enabled: false },
        lineNumbersMinChars: 3,
        padding: { top: 6 },
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
    />
  );
}
