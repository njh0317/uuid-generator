import { useState } from 'react';
import { analyze } from '../lib/uuid-analyzer';
import type { UUIDAnalysis } from '../types';

export function AnalyzerPanel() {
  const [input, setInput] = useState<string>('');
  const [analysis, setAnalysis] = useState<UUIDAnalysis | null>(null);

  const handleAnalyze = () => {
    const uuid = input.trim();
    
    if (!uuid) {
      setAnalysis(null);
      return;
    }

    const result = analyze(uuid);
    setAnalysis(result);
  };

  return (
    <div className="analyzer-panel">
      <h2>UUID Analyzer</h2>

      <div className="analyzer-form">
        <div className="form-group">
          <label htmlFor="uuid-analyze-input">Enter UUID:</label>
          <input
            id="uuid-analyze-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            aria-label="Enter UUID to analyze"
          />
        </div>

        <button
          onClick={handleAnalyze}
          className="analyze-btn"
          aria-label="Analyze UUID"
        >
          Analyze
        </button>
      </div>

      {analysis && (
        <div className="analysis-results">
          <h3>Analysis Results</h3>
          
          {!analysis.isValid ? (
            <div className="alert alert-error" role="alert">
              ✗ Invalid UUID format
            </div>
          ) : (
            <div className="analysis-details">
              <div className="detail-row">
                <span className="detail-label">UUID:</span>
                <code className="detail-value">{analysis.uuid}</code>
              </div>

              <div className="detail-row">
                <span className="detail-label">Version:</span>
                <span className="detail-value">{analysis.version ?? 'Unknown'}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Variant:</span>
                <span className="detail-value">{analysis.variant ?? 'Unknown'}</span>
              </div>

              {analysis.timestamp && (
                <div className="detail-row">
                  <span className="detail-label">Timestamp:</span>
                  <span className="detail-value">{analysis.timestamp.toISOString()}</span>
                </div>
              )}

              {analysis.isRandomBased !== undefined && (
                <div className="detail-row">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">
                    {analysis.isRandomBased ? 'Random-based' : 
                     analysis.isNameBased ? 'Name-based' : 'Other'}
                  </span>
                </div>
              )}

              {analysis.hashAlgorithm && (
                <div className="detail-row">
                  <span className="detail-label">Hash Algorithm:</span>
                  <span className="detail-value">{analysis.hashAlgorithm}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
