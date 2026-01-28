import { useState } from 'react';
import { validateBulk } from '../lib/uuid-validator';
import type { ValidationResult } from '../types';

export function ValidatorPanel() {
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<ValidationResult[]>([]);

  const handleValidate = () => {
    const uuids = input
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (uuids.length === 0) {
      setResults([]);
      return;
    }

    const validationResults = validateBulk(uuids);
    setResults(validationResults);
  };

  return (
    <div className="validator-panel">
      <h2>UUID Validator</h2>

      <div className="validator-form">
        <div className="form-group">
          <label htmlFor="uuid-input">Enter UUIDs (one per line):</label>
          <textarea
            id="uuid-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
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

      {results.length > 0 && (
        <div className="validation-results">
          <h3>Validation Results</h3>
          {results.map((result, index) => (
            <div
              key={index}
              className={`validation-result ${result.isValid ? 'valid' : 'invalid'}`}
            >
              <div className="result-header">
                <span className="result-status">
                  {result.isValid ? '✓ Valid' : '✗ Invalid'}
                </span>
              </div>
              
              {result.isValid ? (
                <div className="result-details">
                  <p><strong>Version:</strong> {result.version ?? 'Unknown'}</p>
                  <p><strong>Variant:</strong> {result.variant ?? 'Unknown'}</p>
                </div>
              ) : (
                <div className="result-errors">
                  {result.errors.map((error, i) => (
                    <p key={i} className="error-text">{error}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
