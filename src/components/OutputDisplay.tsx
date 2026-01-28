import { useState } from 'react';
import { copyToClipboard } from '../utils/clipboard';
import type { OutputFormat } from '../types';
import { applyFormat } from '../utils/format-utils';

interface OutputDisplayProps {
  uuids: string[];
  format: OutputFormat;
}

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export function OutputDisplay({ uuids, format }: OutputDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopy = async (uuid: string, index: number) => {
    const formatted = applyFormat(uuid, format);
    const success = await copyToClipboard(formatted);
    
    if (success) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleCopyAll = async () => {
    const formatted = uuids.map(uuid => applyFormat(uuid, format));
    const text = format.multiline ? formatted.join('\n') : formatted.join(', ');
    const success = await copyToClipboard(text);
    
    if (success) {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  if (uuids.length === 0) {
    return (
      <div className="output-display empty-state">
        <div className="empty-state-content">
          <div className="empty-state-icon">🔑</div>
          <h3>No UUIDs Generated Yet</h3>
          <p>Select a UUID version and click "Generate" to create UUIDs.</p>
          <p className="empty-state-hint">Generated UUIDs will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="output-display">
      <div className="output-header">
        <h3>Generated UUIDs ({uuids.length})</h3>
        <button 
          onClick={handleCopyAll}
          className="copy-all-btn"
          aria-label="Copy all UUIDs"
        >
          {copiedAll ? (
            <>
              <CheckIcon /> Copied!
            </>
          ) : (
            <>
              <CopyIcon /> Copy All
            </>
          )}
        </button>
      </div>
      
      <div className="uuid-list">
        {uuids.map((uuid, index) => {
          const formatted = applyFormat(uuid, format);
          return (
            <div key={index} className="uuid-item">
              <code className="uuid-text">{formatted}</code>
              <button
                onClick={() => handleCopy(uuid, index)}
                className="copy-btn"
                aria-label={`Copy UUID ${index + 1}`}
              >
                {copiedIndex === index ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
