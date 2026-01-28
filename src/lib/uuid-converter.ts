import type { ConversionOptions } from '../types';
import { addHyphens, removeHyphens, toUpperCase, toLowerCase } from '../utils/format-utils';

/**
 * Toggle hyphens in UUID (add if missing, remove if present)
 */
export function toggleHyphens(uuid: string): string {
  if (uuid.includes('-')) {
    return removeHyphens(uuid);
  } else {
    return addHyphens(uuid);
  }
}

/**
 * Convert UUID case (toggle between upper and lower)
 */
export function toggleCase(uuid: string): string {
  // Check if UUID is mostly uppercase
  const uppercaseCount = (uuid.match(/[A-F]/g) || []).length;
  const lowercaseCount = (uuid.match(/[a-f]/g) || []).length;
  
  if (uppercaseCount > lowercaseCount) {
    return toLowerCase(uuid);
  } else {
    return toUpperCase(uuid);
  }
}

/**
 * Convert a single UUID with specified options
 */
export function convertUUID(uuid: string, options: ConversionOptions): string {
  let result = uuid.trim();
  
  if (options.addHyphens) {
    result = addHyphens(result);
  }
  
  if (options.removeHyphens) {
    result = removeHyphens(result);
  }
  
  if (options.toUpperCase) {
    result = toUpperCase(result);
  }
  
  if (options.toLowerCase) {
    result = toLowerCase(result);
  }
  
  return result;
}

/**
 * Convert multiple UUIDs in bulk
 */
export function convertBulk(uuids: string[], options: ConversionOptions): string[] {
  return uuids.map(uuid => convertUUID(uuid, options));
}
