import type { UUIDAnalysis } from '../types';
import { isValidUUIDFormat, extractVersion, extractVariant } from './uuid-validator';
import { UUID_EPOCH } from './constants';

/**
 * Extract timestamp from UUID v1
 */
export function extractV1Timestamp(uuid: string): Date | null {
  const version = extractVersion(uuid);
  if (version !== 1) {
    return null;
  }
  
  const normalized = uuid.replace(/-/g, '');
  
  // Extract timestamp components
  const timeLow = parseInt(normalized.slice(0, 8), 16);
  const timeMid = parseInt(normalized.slice(8, 12), 16);
  const timeHigh = parseInt(normalized.slice(12, 16), 16) & 0x0fff;
  
  // Combine into 60-bit timestamp (100-nanosecond intervals since UUID epoch)
  const timestamp = (timeHigh * 0x100000000 * 0x10000) + (timeMid * 0x100000000) + timeLow;
  
  // Convert to milliseconds and add UUID epoch
  const milliseconds = Math.floor(timestamp / 10000);
  const date = new Date(UUID_EPOCH + milliseconds);
  
  return date;
}

/**
 * Extract timestamp from UUID v7
 */
export function extractV7Timestamp(uuid: string): Date | null {
  const version = extractVersion(uuid);
  if (version !== 7) {
    return null;
  }
  
  const normalized = uuid.replace(/-/g, '');
  
  // Extract first 48 bits (6 bytes) as Unix timestamp in milliseconds
  const timestampHex = normalized.slice(0, 12);
  const timestamp = parseInt(timestampHex, 16);
  
  return new Date(timestamp);
}

/**
 * Check if UUID is random-based (v4, v7)
 */
export function isRandomBased(uuid: string): boolean {
  const version = extractVersion(uuid);
  return version === 4 || version === 7;
}

/**
 * Check if UUID is name-based (v3, v5)
 */
export function isNameBased(uuid: string): boolean {
  const version = extractVersion(uuid);
  return version === 3 || version === 5;
}

/**
 * Analyze a UUID and return detailed information
 */
export function analyze(uuid: string): UUIDAnalysis {
  if (!isValidUUIDFormat(uuid)) {
    return {
      uuid,
      isValid: false
    };
  }
  
  const version = extractVersion(uuid);
  const variant = extractVariant(uuid);
  
  const analysis: UUIDAnalysis = {
    uuid,
    isValid: true,
    version: version ?? undefined,
    variant: variant ?? undefined,
    isRandomBased: version ? isRandomBased(uuid) : undefined,
    isNameBased: version ? isNameBased(uuid) : undefined
  };
  
  // Extract timestamp for v1 and v7
  if (version === 1) {
    analysis.timestamp = extractV1Timestamp(uuid) ?? undefined;
  } else if (version === 7) {
    analysis.timestamp = extractV7Timestamp(uuid) ?? undefined;
  }
  
  // Identify hash algorithm for name-based UUIDs
  if (version === 3) {
    analysis.hashAlgorithm = 'MD5';
  } else if (version === 5) {
    analysis.hashAlgorithm = 'SHA-1';
  }
  
  return analysis;
}
