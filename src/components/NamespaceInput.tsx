import { useState } from 'react';
import { PredefinedNamespace } from '../lib/constants';
import { isValidUUIDFormat } from '../lib/uuid-validator';

interface NamespaceInputProps {
  namespace: string;
  name: string;
  onNamespaceChange: (namespace: string) => void;
  onNameChange: (name: string) => void;
}

export function NamespaceInput({
  namespace,
  name,
  onNamespaceChange,
  onNameChange
}: NamespaceInputProps) {
  const [useCustom, setUseCustom] = useState(false);
  const [validationError, setValidationError] = useState<string>('');

  const handleNamespaceTypeChange = (custom: boolean) => {
    setUseCustom(custom);
    setValidationError('');
    
    if (!custom) {
      // Reset to DNS namespace when switching to predefined
      onNamespaceChange(PredefinedNamespace.DNS);
    }
  };

  const handleCustomNamespaceChange = (value: string) => {
    onNamespaceChange(value);
    
    // Validate custom namespace
    if (value && !isValidUUIDFormat(value)) {
      setValidationError('Invalid UUID format');
    } else {
      setValidationError('');
    }
  };

  return (
    <div className="namespace-input">
      <div className="namespace-type-selector">
        <label className="radio-label">
          <input
            type="radio"
            checked={!useCustom}
            onChange={() => handleNamespaceTypeChange(false)}
            aria-label="Use predefined namespace"
          />
          <span>Predefined Namespace</span>
        </label>
        
        <label className="radio-label">
          <input
            type="radio"
            checked={useCustom}
            onChange={() => handleNamespaceTypeChange(true)}
            aria-label="Use custom namespace"
          />
          <span>Custom Namespace</span>
        </label>
      </div>

      {!useCustom ? (
        <div className="form-group">
          <label htmlFor="predefined-namespace">Namespace:</label>
          <select
            id="predefined-namespace"
            value={namespace}
            onChange={(e) => onNamespaceChange(e.target.value)}
            aria-label="Select predefined namespace"
          >
            <option value={PredefinedNamespace.DNS}>DNS ({PredefinedNamespace.DNS})</option>
            <option value={PredefinedNamespace.URL}>URL ({PredefinedNamespace.URL})</option>
            <option value={PredefinedNamespace.OID}>OID ({PredefinedNamespace.OID})</option>
            <option value={PredefinedNamespace.X500}>X500 ({PredefinedNamespace.X500})</option>
          </select>
        </div>
      ) : (
        <div className="form-group">
          <label htmlFor="custom-namespace">Custom Namespace UUID:</label>
          <input
            id="custom-namespace"
            type="text"
            value={namespace}
            onChange={(e) => handleCustomNamespaceChange(e.target.value)}
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            aria-label="Enter custom namespace UUID"
            aria-invalid={!!validationError}
          />
          {validationError && (
            <span className="error-message" role="alert">{validationError}</span>
          )}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name-input">Name:</label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter name (e.g., example.com)"
          aria-label="Enter name for UUID generation"
        />
      </div>
    </div>
  );
}
