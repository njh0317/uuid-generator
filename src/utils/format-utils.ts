import type { OutputFormat } from '../types';

/**
 * Add hyphens to UUID string
 */
export function addHyphens(uuid: string): string {
  const cleaned = uuid.replace(/-/g, '');
  if (cleaned.length !== 32) {
    return uuid; // Return as-is if invalid length
  }
  return `${cleaned.slice(0, 8)}-${cleaned.slice(8, 12)}-${cleaned.slice(12, 16)}-${cleaned.slice(16, 20)}-${cleaned.slice(20, 32)}`;
}

/**
 * Remove hyphens from UUID string
 */
export function removeHyphens(uuid: string): string {
  return uuid.replace(/-/g, '');
}

/**
 * Convert UUID to uppercase
 */
export function toUpperCase(uuid: string): string {
  return uuid.toUpperCase();
}

/**
 * Convert UUID to lowercase
 */
export function toLowerCase(uuid: string): string {
  return uuid.toLowerCase();
}

/**
 * Apply format options to a single UUID
 */
export function applyFormat(uuid: string, format: OutputFormat): string {
  let result = uuid;
  
  // Apply hyphen formatting
  if (format.hyphens && !result.includes('-')) {
    result = addHyphens(result);
  } else if (!format.hyphens && result.includes('-')) {
    result = removeHyphens(result);
  }
  
  // Apply case formatting
  if (format.uppercase) {
    result = toUpperCase(result);
  } else {
    result = toLowerCase(result);
  }
  
  return result;
}

/**
 * Format multiple UUIDs with single-line or multi-line output
 */
export function formatMultipleUUIDs(uuids: string[], format: OutputFormat): string {
  const formatted = uuids.map(uuid => applyFormat(uuid, format));
  
  if (format.multiline) {
    return formatted.join('\n');
  } else {
    return formatted.join(', ');
  }
}
