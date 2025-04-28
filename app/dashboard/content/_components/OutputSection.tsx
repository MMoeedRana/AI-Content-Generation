import dynamic from 'next/dynamic';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';

// Dynamically import the Editor component to disable SSR
const Editor = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Editor), {
  ssr: false,
});

interface Props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: Props) {
  const editorRef = useRef<any>(null);  // Provide an initial value as `null` for the reference

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(aiOutput);
    }
  }, [aiOutput]);

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button className="flex gap-2"
        onClick={()=>navigator.clipboard.writeText(aiOutput)}
        >
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>
      <div className="editor-container">
        <Editor
          ref={editorRef}
          initialValue="Your result will appear here"
          initialEditType="wysiwyg"
          height="600px"
          useCommandShortcut={true}
        />
      </div>
    </div>
  );
}

export default OutputSection
