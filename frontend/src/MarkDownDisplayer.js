import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkDownDisplayer = ({ markdownContent }) => {
  return (
    <ReactMarkdown>{markdownContent}</ReactMarkdown>
  );
};

export default MarkDownDisplayer;