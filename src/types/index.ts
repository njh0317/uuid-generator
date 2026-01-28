// Core UUID types and interfaces

export type UUIDVersion = 1 | 3 | 4 | 5 | 7 | 'nil' | 'guid';

export type UUIDVariant = 'RFC4122' | 'Reserved' | 'Microsoft' | 'Future';

export type PredefinedNamespace = 'DNS' | 'URL' | 'OID' | 'X500';

export interface OutputFormat {
  hyphens: boolean;
  uppercase: boolean;
  multiline: boolean;
}

export interface GenerationOptions {
  version: UUIDVersion;
  count: number;
  namespace?: string;
  name?: string;
}

export interface UUIDAnalysis {
  uuid: string;
  isValid: boolean;
  version?: number;
  variant?: UUIDVariant;
  timestamp?: Date;
  isRandomBased?: boolean;
  isNameBased?: boolean;
  hashAlgorithm?: 'MD5' | 'SHA-1';
}

export interface ValidationResult {
  isValid: boolean;
  version?: number;
  variant?: UUIDVariant;
  errors: string[];
}

export interface ConversionOptions {
  addHyphens?: boolean;
  removeHyphens?: boolean;
  toUpperCase?: boolean;
  toLowerCase?: boolean;
}
