import { useState } from 'react';
import { validateBulk } from '../lib/uuid-validator';
import { analyze } from '../lib/uuid-analyzer';
import type { ValidationResult, UUIDAnalysis } from '../types';

export function ValidatorAnalyzerPanel() {
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<UUIDAnalysis | null>(null);

  const handleValidate = () => {
    const uuids = input
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (uuids.length === 0) {
      setResults([]);
      setSelectedAnalysis(null);
      return;
    }

    const validationResults = validateBulk(uuids);
    setResults(validationResults);
    setSelectedAnalysis(null);
  };

  const handleAnalyze = (uuid: string) => {
    const analysis = analyze(uuid);
    setSelectedAnalysis(analysis);
  };

  return (
    <div className="validator-analyzer-panel">
      <h2>UUID Validator & Analyzer</h2>
      <p className="panel-description">
        Validate multiple UUIDs at once or click on any UUID to see detailed analysis.
      </p>

      <div className="validator-form">
        <div className="form-group">
          <label htmlFor="uuid-input">Enter UUIDs (one per line):</label>
          <textarea
            id="uuid-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&#10;xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            rows={10}
            aria-label="Enter UUIDs to validate"
          />
        </div>

        <button
          onClick={handleValidate}
          className="validate-btn"
          aria-label="Validate UUIDs"
        >
          Validate
        </button>
      </div>

      <div className="results-container">
        {results.length > 0 && (
          <div className="validation-results">
            <h3>Validation Results ({results.length} UUID{results.length > 1 ? 's' : ''})</h3>
            {results.map((result, index) => {
              const uuid = input.split('\n')[index]?.trim();
              return (
                <div
                  key={index}
                  className={`validation-result ${result.isValid ? 'valid' : 'invalid'} ${selectedAnalysis?.uuid === uuid ? 'selected' : ''}`}
                  onClick={() => result.isValid && uuid && handleAnalyze(uuid)}
                  style={{ cursor: result.isValid ? 'pointer' : 'default' }}
                >
                  <div className="result-header">
                    <span className="result-status">
                      {result.isValid ? '✓ Valid' : '✗ Invalid'}
                    </span>
                    {result.isValid && (
                      <span className="analyze-hint">Click to analyze →</span>
                    )}
                  </div>
                  
                  {result.isValid ? (
                    <div className="result-details">
                      <code className="uuid-display">{uuid}</code>
                      <p><strong>Version:</strong> {result.version ?? 'Unknown'}</p>
                      <p><strong>Variant:</strong> {result.variant ?? 'Unknown'}</p>
                    </div>
                  ) : (
                    <div className="result-errors">
                      <code className="uuid-display error">{uuid}</code>
                      {result.errors.map((error, i) => (
                        <p key={i} className="error-text">{error}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {selectedAnalysis && (
          <div className="analysis-results">
            <h3>Detailed Analysis</h3>
            
            {!selectedAnalysis.isValid ? (
              <div className="alert alert-error" role="alert">
                ✗ Invalid UUID format
              </div>
            ) : (
              <div className="analysis-details">
                <div className="detail-row">
                  <span className="detail-label">UUID:</span>
                  <code className="detail-value">{selectedAnalysis.uuid}</code>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Version:</span>
                  <span className="detail-value">{selectedAnalysis.version ?? 'Unknown'}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Variant:</span>
                  <span className="detail-value">{selectedAnalysis.variant ?? 'Unknown'}</span>
                </div>

                {selectedAnalysis.timestamp && (
                  <div className="detail-row">
                    <span className="detail-label">Timestamp:</span>
                    <span className="detail-value">{selectedAnalysis.timestamp.toISOString()}</span>
                  </div>
                )}

                {selectedAnalysis.isRandomBased !== undefined && (
                  <div className="detail-row">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">
                      {selectedAnalysis.isRandomBased ? 'Random-based' : 
                       selectedAnalysis.isNameBased ? 'Name-based' : 'Other'}
                    </span>
                  </div>
                )}

                {selectedAnalysis.hashAlgorithm && (
                  <div className="detail-row">
                    <span className="detail-label">Hash Algorithm:</span>
                    <span className="detail-value">{selectedAnalysis.hashAlgorithm}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
