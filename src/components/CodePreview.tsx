import React from 'react';

interface CodePreviewProps {
  code: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ code }) => (
  <div className="p-4 bg-gray-50 rounded border overflow-auto">
    <pre className="whitespace-pre-wrap">
      <code>{code}</code>
    </pre>
  </div>
);

export default CodePreview;