import type { OutputFormat } from '../types';
import { downloadAsText, downloadAsJSON } from '../utils/file-export';

interface FormatControlsProps {
  format: OutputFormat;
  onFormatChange: (format: OutputFormat) => void;
  autoCopy: boolean;
  onAutoCopyChange: (autoCopy: boolean) => void;
  uuids: string[];
}

export function FormatControls({
  format,
  onFormatChange,
  autoCopy,
  onAutoCopyChange,
  uuids
}: FormatControlsProps) {
  
  const handleDownloadText = () => {
    if (uuids.length > 0) {
      downloadAsText(uuids);
    }
  };

  const handleDownloadJSON = () => {
    if (uuids.length > 0) {
      downloadAsJSON(uuids);
    }
  };

  return (
    <div className="format-controls">
      <div className="format-options">
        <h4>Format Options</h4>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={format.hyphens}
            onChange={(e) => onFormatChange({ ...format, hyphens: e.target.checked })}
            aria-label="Include hyphens"
          />
          <span>Include hyphens</span>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={format.uppercase}
            onChange={(e) => onFormatChange({ ...format, uppercase: e.target.checked })}
            aria-label="Uppercase"
          />
          <span>Uppercase</span>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={format.multiline}
            onChange={(e) => onFormatChange({ ...format, multiline: e.target.checked })}
            aria-label="Multiline output"
          />
          <span>Multiline output</span>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={autoCopy}
            onChange={(e) => onAutoCopyChange(e.target.checked)}
            aria-label="Auto-copy on generate"
          />
          <span>Auto-copy on generate</span>
        </label>
      </div>

      <div className="download-options">
        <h4>Download</h4>
        <button
          onClick={handleDownloadText}
          disabled={uuids.length === 0}
          className="download-btn"
          aria-label="Download as TXT"
        >
          Download TXT
        </button>
        <button
          onClick={handleDownloadJSON}
          disabled={uuids.length === 0}
          className="download-btn"
          aria-label="Download as JSON"
        >
          Download JSON
        </button>
      </div>
    </div>
  );
}
