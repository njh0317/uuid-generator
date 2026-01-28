// RFC 4122 predefined namespace UUIDs

export enum PredefinedNamespace {
  DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
  OID = '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
  X500 = '6ba7b814-9dad-11d1-80b4-00c04fd430c8'
}

// UUID epoch: October 15, 1582 (in 100-nanosecond intervals)
export const UUID_EPOCH = Date.UTC(1582, 9, 15, 0, 0, 0, 0);

// Nil UUID constant
export const NIL_UUID = '00000000-0000-0000-0000-000000000000';
