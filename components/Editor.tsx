import { useState } from 'react'
import MonacoEditor from '@monaco-editor/react'

interface EditorProps {
  language: string
  value: string
  onChange: (value: string | undefined) => void
}

export default function Editor({ language, value, onChange }: EditorProps) {
  const [isEditorReady, setIsEditorReady] = useState(false)

  const handleEditorDidMount = () => {
    setIsEditorReady(true)
  }

  return (
    <div className="h-[600px] rounded-lg overflow-hidden border border-gray-800">
      <MonacoEditor
        height="100%"
        language={language}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          automaticLayout: true,
          padding: { top: 16 },
        }}
      />
    </div>
  )
}
