import { useState } from 'react';
import { convertBulk } from '../lib/uuid-converter';
import type { ConversionOptions } from '../types';

export function ConverterPanel() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [options, setOptions] = useState<ConversionOptions>({
    addHyphens: false,
    removeHyphens: false,
    toUpperCase: false,
    toLowerCase: false
  });

  const handleConvert = () => {
    const uuids = input
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (uuids.length === 0) {
      setOutput('');
      return;
    }

    const converted = convertBulk(uuids, options);
    setOutput(converted.join('\n'));
  };

  const handleOptionChange = (key: keyof ConversionOptions, value: boolean) => {
    const newOptions = { ...options, [key]: value };
    
    // Ensure mutually exclusive options
    if (key === 'addHyphens' && value) {
      newOptions.removeHyphens = false;
    } else if (key === 'removeHyphens' && value) {
      newOptions.addHyphens = false;
    } else if (key === 'toUpperCase' && value) {
      newOptions.toLowerCase = false;
    } else if (key === 'toLowerCase' && value) {
      newOptions.toUpperCase = false;
    }
    
    setOptions(newOptions);
  };

  return (
    <div className="converter-panel">
      <h2>UUID Converter</h2>

      <div className="converter-form">
        <div className="form-group">
          <label htmlFor="uuid-convert-input">Enter UUIDs (one per line):</label>
          <textarea
            id="uuid-convert-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            rows={10}
            aria-label="Enter UUIDs to convert"
          />
        </div>

        <div className="conversion-options">
          <h4>Conversion Options</h4>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.addHyphens || false}
              onChange={(e) => handleOptionChange('addHyphens', e.target.checked)}
              aria-label="Add hyphens"
            />
            <span>Add hyphens</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.removeHyphens || false}
              onChange={(e) => handleOptionChange('removeHyphens', e.target.checked)}
              aria-label="Remove hyphens"
            />
            <span>Remove hyphens</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.toUpperCase || false}
              onChange={(e) => handleOptionChange('toUpperCase', e.target.checked)}
              aria-label="Convert to uppercase"
            />
            <span>Uppercase</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.toLowerCase || false}
              onChange={(e) => handleOptionChange('toLowerCase', e.target.checked)}
              aria-label="Convert to lowercase"
            />
            <span>Lowercase</span>
          </label>
        </div>

        <button
          onClick={handleConvert}
          className="convert-btn"
          aria-label="Convert UUIDs"
          style={{ marginBottom: 'var(--spacing-lg)' }}
        >
          Convert
        </button>

        {output && (
          <div className="form-group">
            <label htmlFor="uuid-convert-output">Converted UUIDs:</label>
            <textarea
              id="uuid-convert-output"
              value={output}
              readOnly
              rows={10}
              aria-label="Converted UUIDs output"
            />
          </div>
        )}
      </div>
    </div>
  );
}
