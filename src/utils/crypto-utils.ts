// Browser Crypto API wrapper utilities

/**
 * Check if the Crypto API is available in the current environment
 */
export function isCryptoAvailable(): boolean {
  // Check for browser environment
  if (typeof window !== 'undefined' && 
      typeof window.crypto !== 'undefined' && 
      typeof window.crypto.getRandomValues === 'function') {
    return true;
  }
  
  // Check for Node.js environment
  if (typeof globalThis !== 'undefined' && 
      typeof globalThis.crypto !== 'undefined' &&
      typeof globalThis.crypto.getRandomValues === 'function') {
    return true;
  }
  
  return false;
}

/**
 * Check if crypto.randomUUID() is available
 */
export function isRandomUUIDAvailable(): boolean {
  if (typeof window !== 'undefined' && typeof window.crypto?.randomUUID === 'function') {
    return true;
  }
  
  if (typeof globalThis !== 'undefined' && typeof globalThis.crypto?.randomUUID === 'function') {
    return true;
  }
  
  return false;
}

/**
 * Get the crypto object (browser or Node.js)
 */
function getCrypto(): Crypto {
  if (typeof window !== 'undefined' && window.crypto) {
    return window.crypto;
  }
  
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto;
  }
  
  throw new Error('Crypto API is not available in this environment. Please use HTTPS.');
}

/**
 * Generate secure random bytes using crypto.getRandomValues()
 * @param length Number of bytes to generate
 * @returns Uint8Array of random bytes
 * @throws Error if Crypto API is not available
 */
export function getRandomBytes(length: number): Uint8Array {
  const crypto = getCrypto();
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

/**
 * Generate a UUID v4 using crypto.randomUUID() with fallback
 * @returns UUID v4 string
 * @throws Error if Crypto API is not available
 */
export function generateRandomUUID(): string {
  const crypto = getCrypto();
  
  // Use native crypto.randomUUID() if available
  if (isRandomUUIDAvailable()) {
    return crypto.randomUUID();
  }
  
  // Fallback: generate UUID v4 manually using getRandomValues
  const bytes = getRandomBytes(16);
  
  // Set version (4) and variant (RFC4122) bits
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant RFC4122
  
  // Convert to hex string with hyphens
  const hex = Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}
