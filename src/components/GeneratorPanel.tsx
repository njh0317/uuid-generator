import { useState, useEffect } from 'react';
import type { UUIDVersion, OutputFormat } from '../types';
import { generateBulk } from '../lib/uuid-generator';
import { PredefinedNamespace } from '../lib/constants';
import { isCryptoAvailable } from '../utils/crypto-utils';
import { copyToClipboard } from '../utils/clipboard';
import { applyFormat, formatMultipleUUIDs } from '../utils/format-utils';
import { OutputDisplay } from './OutputDisplay';
import { FormatControls } from './FormatControls';
import { NamespaceInput } from './NamespaceInput';

export function GeneratorPanel() {
  const [version, setVersion] = useState<UUIDVersion>(4);
  const [quantity, setQuantity] = useState<number>(1);
  const [namespace, setNamespace] = useState<string>(PredefinedNamespace.DNS);
  const [name, setName] = useState<string>('');
  const [uuids, setUuids] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [cryptoAvailable, setCryptoAvailable] = useState<boolean>(true);
  
  const [format, setFormat] = useState<OutputFormat>({
    hyphens: true,
    uppercase: false,
    multiline: true
  });
  const [autoCopy, setAutoCopy] = useState<boolean>(false);

  useEffect(() => {
    setCryptoAvailable(isCryptoAvailable());
  }, []);

  const needsNamespace = version === 3 || version === 5;

  const handleGenerate = async () => {
    setError('');
    
    if (!cryptoAvailable) {
      setError('Crypto API is not available. Please use HTTPS.');
      return;
    }

    if (quantity < 1 || quantity > 100) {
      setError('Quantity must be between 1 and 100');
      return;
    }

    if (needsNamespace && !name.trim()) {
      setError('Name is required for UUID v3 and v5');
      return;
    }

    try {
      // Convert string version to number if needed
      let versionToUse: 1 | 3 | 4 | 5 | 7 | 'nil' | 'guid' = version;
      if (typeof version === 'string' && !isNaN(Number(version))) {
        versionToUse = Number(version) as 1 | 3 | 4 | 5 | 7;
      }
      
      const generated = generateBulk(
        versionToUse,
        quantity,
        needsNamespace ? namespace : undefined,
        needsNamespace ? name : undefined
      );
      
      setUuids(generated);

      // Auto-copy if enabled
      if (autoCopy && generated.length > 0) {
        const text = formatMultipleUUIDs(generated, format);
        await copyToClipboard(text);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate UUIDs');
    }
  };

  return (
    <div className="generator-panel two-column-layout">
      <div className="left-panel">
        <h2>UUID Generator</h2>

        {!cryptoAvailable && (
          <div className="alert alert-warning" role="alert">
            ⚠️ Crypto API is not available. Please use HTTPS for secure UUID generation.
          </div>
        )}

        <div className="generator-form">
          <div className="form-group">
            <label htmlFor="version-select">UUID Version:</label>
            <select
              id="version-select"
              value={version}
              onChange={(e) => setVersion(e.target.value as UUIDVersion)}
              aria-label="Select UUID version"
            >
              <option value={1}>UUID v1 (Timestamp + MAC)</option>
              <option value={3}>UUID v3 (Namespace + MD5)</option>
              <option value={4}>UUID v4 (Random)</option>
              <option value={5}>UUID v5 (Namespace + SHA-1)</option>
              <option value={7}>UUID v7 (Time-ordered)</option>
              <option value="nil">Nil UUID</option>
              <option value="guid">GUID (Windows/.NET)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantity-input">Quantity (1-100):</label>
            <input
              id="quantity-input"
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              aria-label="Number of UUIDs to generate"
            />
          </div>

          {needsNamespace && (
            <NamespaceInput
              namespace={namespace}
              name={name}
              onNamespaceChange={setNamespace}
              onNameChange={setName}
            />
          )}

          <button
            onClick={handleGenerate}
            className="generate-btn"
            disabled={!cryptoAvailable}
            aria-label="Generate UUIDs"
          >
            Generate
          </button>

          {error && (
            <div className="error-message" role="alert">{error}</div>
          )}
        </div>

        <FormatControls
          format={format}
          onFormatChange={setFormat}
          autoCopy={autoCopy}
          onAutoCopyChange={setAutoCopy}
          uuids={uuids}
        />
      </div>

      <div className="right-panel">
        <OutputDisplay uuids={uuids} format={format} />
      </div>
    </div>
  );
}
