import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from 'clipboard-copy';
import './Editor.css';

const MarkdownEditor = () => {
  const [markdownContent, setMarkdownContent] = useState(
    localStorage.getItem('markdownContent') || '# Hello, Markdown!'
  );
  const [darkMode, setDarkMode] = useState(false);

  const handleMarkdownChange = (e) => {
    const newMarkdownContent = e.target.value;
    setMarkdownContent(newMarkdownContent);
    localStorage.setItem('markdownContent', newMarkdownContent);
  };

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
    console.log(`Current Theme: ${!darkMode ? 'Dark' : 'Light'}`);
  };

  const handleCopyCode = () => {
    copy(markdownContent);
    alert('Code copied to clipboard!');
  };

  const handleClearCode = () => {
    setMarkdownContent('');
    localStorage.removeItem('markdownContent');
  };

  useEffect(() => {
  }, [markdownContent, darkMode]);

  return (
    <div className={`editor-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className={`editor ${darkMode ? 'yellow-text' : ''}`}>
        <div className="editor-buttons-top">
          <button onClick={handleCopyCode}>Copy</button>
          <button onClick={handleClearCode}>Clear</button>
        </div>
        <textarea
          value={markdownContent}
          onChange={handleMarkdownChange}
          className={`textarea ${darkMode ? 'dark-text' : 'light-text'}`}
        />
      </div>

      <div className="preview">
        <ReactMarkdown
          components={{
            code: ({ node, inline, className, children, ...props }) => (
              <SyntaxHighlighter style={tomorrow} language={className || 'text'}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ),
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>

      <button onClick={toggleTheme} className="toggle-button">
        Toggle Theme
      </button>
    </div>
  );
};

export default MarkdownEditor;
