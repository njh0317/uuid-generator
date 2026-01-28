import type { ValidationResult, UUIDVariant } from '../types';

// UUID format regex patterns
const UUID_WITH_HYPHENS = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const UUID_WITHOUT_HYPHENS = /^[0-9a-f]{32}$/i;

/**
 * Validate UUID format (with or without hyphens)
 */
export function isValidUUIDFormat(uuid: string): boolean {
  return UUID_WITH_HYPHENS.test(uuid) || UUID_WITHOUT_HYPHENS.test(uuid);
}

/**
 * Normalize UUID to hyphenated format
 */
function normalizeUUID(uuid: string): string {
  const cleaned = uuid.replace(/-/g, '');
  if (cleaned.length !== 32) {
    return uuid;
  }
  return `${cleaned.slice(0, 8)}-${cleaned.slice(8, 12)}-${cleaned.slice(12, 16)}-${cleaned.slice(16, 20)}-${cleaned.slice(20, 32)}`;
}

/**
 * Extract version from UUID string
 */
export function extractVersion(uuid: string): number | null {
  if (!isValidUUIDFormat(uuid)) {
    return null;
  }
  
  const normalized = normalizeUUID(uuid);
  const versionChar = normalized.charAt(14); // Position of version digit
  const version = parseInt(versionChar, 16);
  
  // Valid UUID versions are 1-8, but we support 1,3,4,5,7
  if (version >= 0 && version <= 8) {
    return version;
  }
  
  return null;
}

/**
 * Extract variant from UUID string
 */
export function extractVariant(uuid: string): UUIDVariant | null {
  if (!isValidUUIDFormat(uuid)) {
    return null;
  }
  
  const normalized = normalizeUUID(uuid);
  const variantChar = normalized.charAt(19); // Position of variant digit
  const variantBits = parseInt(variantChar, 16);
  
  // Check variant bits (top 3 bits of the variant field)
  if ((variantBits & 0x8) === 0) {
    return 'Reserved'; // 0xxx
  } else if ((variantBits & 0xC) === 0x8) {
    return 'RFC4122'; // 10xx
  } else if ((variantBits & 0xE) === 0xC) {
    return 'Microsoft'; // 110x
  } else {
    return 'Future'; // 111x
  }
}

/**
 * Validate a single UUID and return detailed results
 */
export function validateUUID(uuid: string): ValidationResult {
  const errors: string[] = [];
  
  if (!uuid || uuid.trim() === '') {
    errors.push('UUID is empty');
    return { isValid: false, errors };
  }
  
  const trimmed = uuid.trim();
  
  if (!isValidUUIDFormat(trimmed)) {
    errors.push('Invalid UUID format. Expected format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    return { isValid: false, errors };
  }
  
  const version = extractVersion(trimmed);
  const variant = extractVariant(trimmed);
  
  if (version === null) {
    errors.push('Unable to extract version');
  }
  
  if (variant === null) {
    errors.push('Unable to extract variant');
  }
  
  return {
    isValid: errors.length === 0,
    version: version ?? undefined,
    variant: variant ?? undefined,
    errors
  };
}

/**
 * Validate multiple UUIDs in bulk
 */
export function validateBulk(uuids: string[]): ValidationResult[] {
  return uuids.map(uuid => validateUUID(uuid));
}
