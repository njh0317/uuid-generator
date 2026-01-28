import { generateRandomUUID, getRandomBytes } from '../utils/crypto-utils';
import { NIL_UUID, UUID_EPOCH } from './constants';
import { isValidUUIDFormat } from './uuid-validator';
import CryptoJS from 'crypto-js';

/**
 * Generate UUID v1 (Timestamp + MAC based)
 * Uses current timestamp and random node ID
 */
export function generateV1(): string {
  // Get current timestamp in 100-nanosecond intervals since UUID epoch
  const now = Date.now();
  const timestamp = (now - UUID_EPOCH) * 10000; // Convert ms to 100-ns intervals
  
  // Split timestamp into components (60 bits total)
  const timeLow = (timestamp & 0xffffffff) >>> 0;
  const timeMid = ((timestamp / 0x100000000) & 0xffff) >>> 0;
  const timeHigh = ((timestamp / 0x1000000000000) & 0x0fff) >>> 0;
  
  // Generate random clock sequence (14 bits)
  const clockSeq = getRandomBytes(2);
  const clockSeqLow = clockSeq[1];
  const clockSeqHigh = clockSeq[0] & 0x3f; // 6 bits
  
  // Generate random node ID (48 bits) - using random instead of MAC address
  const node = getRandomBytes(6);
  node[0] |= 0x01; // Set multicast bit to indicate random node
  
  // Format UUID v1
  const timeLowHex = timeLow.toString(16).padStart(8, '0');
  const timeMidHex = timeMid.toString(16).padStart(4, '0');
  const timeHighHex = ((timeHigh & 0x0fff) | 0x1000).toString(16).padStart(4, '0'); // Version 1
  const clockSeqHighHex = ((clockSeqHigh & 0x3f) | 0x80).toString(16).padStart(2, '0'); // Variant RFC4122
  const clockSeqLowHex = clockSeqLow.toString(16).padStart(2, '0');
  const nodeHex = Array.from(node).map(b => b.toString(16).padStart(2, '0')).join('');
  
  return `${timeLowHex}-${timeMidHex}-${timeHighHex}-${clockSeqHighHex}${clockSeqLowHex}-${nodeHex}`;
}

/**
 * Generate UUID v4 (Random)
 * Uses crypto.randomUUID() or crypto.getRandomValues()
 */
export function generateV4(): string {
  return generateRandomUUID();
}

/**
 * Generate GUID (alias for UUID v4, Windows/.NET compatible)
 */
export function generateGUID(): string {
  return generateV4();
}

/**
 * Convert UUID string to byte array
 */
function uuidToBytes(uuid: string): number[] {
  const hex = uuid.replace(/-/g, '');
  const bytes: number[] = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return bytes;
}

/**
 * Convert byte array to UUID string
 */
function bytesToUuid(bytes: number[]): string {
  const hex = bytes.map(b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

/**
 * Generate UUID v3 (Namespace + MD5)
 */
export function generateV3(namespace: string, name: string): string {
  if (!isValidUUIDFormat(namespace)) {
    throw new Error('Invalid namespace UUID format');
  }
  
  // Convert namespace UUID to bytes
  const namespaceBytes = uuidToBytes(namespace);
  
  // Convert name to UTF-8 bytes
  const nameBytes = Array.from(new TextEncoder().encode(name));
  
  // Concatenate namespace + name
  const data = [...namespaceBytes, ...nameBytes];
  
  // Compute MD5 hash
  const wordArray = CryptoJS.lib.WordArray.create(new Uint8Array(data));
  const hash = CryptoJS.MD5(wordArray);
  
  // Convert hash to bytes
  const hashBytes: number[] = [];
  for (let i = 0; i < 4; i++) {
    const word = hash.words[i];
    hashBytes.push((word >>> 24) & 0xff);
    hashBytes.push((word >>> 16) & 0xff);
    hashBytes.push((word >>> 8) & 0xff);
    hashBytes.push(word & 0xff);
  }
  
  // Set version (3) and variant (RFC4122) bits
  hashBytes[6] = (hashBytes[6] & 0x0f) | 0x30; // Version 3
  hashBytes[8] = (hashBytes[8] & 0x3f) | 0x80; // Variant RFC4122
  
  return bytesToUuid(hashBytes);
}

/**
 * Generate UUID v5 (Namespace + SHA-1)
 */
export function generateV5(namespace: string, name: string): string {
  if (!isValidUUIDFormat(namespace)) {
    throw new Error('Invalid namespace UUID format');
  }
  
  // Convert namespace UUID to bytes
  const namespaceBytes = uuidToBytes(namespace);
  
  // Convert name to UTF-8 bytes
  const nameBytes = Array.from(new TextEncoder().encode(name));
  
  // Concatenate namespace + name
  const data = [...namespaceBytes, ...nameBytes];
  
  // Compute SHA-1 hash
  const wordArray = CryptoJS.lib.WordArray.create(new Uint8Array(data));
  const hash = CryptoJS.SHA1(wordArray);
  
  // Convert hash to bytes (take first 16 bytes)
  const hashBytes: number[] = [];
  for (let i = 0; i < 4; i++) {
    const word = hash.words[i];
    hashBytes.push((word >>> 24) & 0xff);
    hashBytes.push((word >>> 16) & 0xff);
    hashBytes.push((word >>> 8) & 0xff);
    hashBytes.push(word & 0xff);
  }
  
  // Set version (5) and variant (RFC4122) bits
  hashBytes[6] = (hashBytes[6] & 0x0f) | 0x50; // Version 5
  hashBytes[8] = (hashBytes[8] & 0x3f) | 0x80; // Variant RFC4122
  
  return bytesToUuid(hashBytes);
}

/**
 * Generate UUID v7 (Time-ordered)
 * Uses Unix timestamp in milliseconds + random bits
 */
export function generateV7(): string {
  // Get Unix timestamp in milliseconds (48 bits)
  const timestamp = Date.now();
  
  // Generate 10 random bytes (80 bits, we'll use 74 bits)
  const randomBytes = getRandomBytes(10);
  
  // Create 16-byte array for UUID
  const bytes = new Uint8Array(16);
  
  // timestamp (48 bits = 6 bytes)
  bytes[0] = (timestamp / 0x10000000000) & 0xff;
  bytes[1] = (timestamp / 0x100000000) & 0xff;
  bytes[2] = (timestamp / 0x1000000) & 0xff;
  bytes[3] = (timestamp / 0x10000) & 0xff;
  bytes[4] = (timestamp / 0x100) & 0xff;
  bytes[5] = timestamp & 0xff;
  
  // version (4 bits) + random_a (12 bits)
  bytes[6] = 0x70 | (randomBytes[0] & 0x0f); // Version 7
  bytes[7] = randomBytes[1];
  
  // variant (2 bits) + random_b (62 bits)
  bytes[8] = 0x80 | (randomBytes[2] & 0x3f); // Variant RFC4122
  bytes[9] = randomBytes[3];
  bytes[10] = randomBytes[4];
  bytes[11] = randomBytes[5];
  bytes[12] = randomBytes[6];
  bytes[13] = randomBytes[7];
  bytes[14] = randomBytes[8];
  bytes[15] = randomBytes[9];
  
  // Convert to hex string with hyphens
  const hex = Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

/**
 * Generate Nil UUID (all zeros)
 */
export function generateNil(): string {
  return NIL_UUID;
}

/**
 * Generate multiple UUIDs in bulk
 */
export function generateBulk(
  version: 1 | 3 | 4 | 5 | 7 | 'nil' | 'guid',
  count: number,
  namespace?: string,
  name?: string
): string[] {
  if (count < 1 || count > 100) {
    throw new Error('Count must be between 1 and 100');
  }
  
  const uuids: string[] = [];
  const uuidSet = new Set<string>();
  
  for (let i = 0; i < count; i++) {
    let uuid: string;
    
    switch (version) {
      case 1:
        uuid = generateV1();
        break;
      case 3:
        if (!namespace || !name) {
          throw new Error('Namespace and name are required for UUID v3');
        }
        // For bulk generation, append index to name to ensure uniqueness
        uuid = generateV3(namespace, `${name}-${i}`);
        break;
      case 4:
        uuid = generateV4();
        break;
      case 5:
        if (!namespace || !name) {
          throw new Error('Namespace and name are required for UUID v5');
        }
        // For bulk generation, append index to name to ensure uniqueness
        uuid = generateV5(namespace, `${name}-${i}`);
        break;
      case 7:
        uuid = generateV7();
        break;
      case 'nil':
        uuid = generateNil();
        break;
      case 'guid':
        uuid = generateGUID();
        break;
      default:
        throw new Error(`Unsupported UUID version: ${version}`);
    }
    
    // Ensure uniqueness (except for nil UUID)
    if (version !== 'nil') {
      while (uuidSet.has(uuid)) {
        // Regenerate if duplicate (very rare for v4/v7)
        uuid = version === 4 || version === 'guid' ? generateV4() : generateV7();
      }
      uuidSet.add(uuid);
    }
    
    uuids.push(uuid);
  }
  
  return uuids;
}
