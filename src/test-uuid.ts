// Quick manual test for UUID generation
import { generateV1, generateV3, generateV4, generateV5, generateV7, generateNil, generateGUID, generateBulk } from './lib/uuid-generator';
import { PredefinedNamespace } from './lib/constants';

console.log('=== UUID Generation Test ===\n');

console.log('UUID v1:', generateV1());
console.log('UUID v3:', generateV3(PredefinedNamespace.DNS, 'example.com'));
console.log('UUID v4:', generateV4());
console.log('UUID v5:', generateV5(PredefinedNamespace.URL, 'https://example.com'));
console.log('UUID v7:', generateV7());
console.log('Nil UUID:', generateNil());
console.log('GUID:', generateGUID());

console.log('\n=== Bulk Generation Test ===\n');
const bulkV4 = generateBulk(4, 5);
console.log('5 UUID v4s:', bulkV4);

// Check uniqueness
const uniqueSet = new Set(bulkV4);
console.log('All unique?', uniqueSet.size === bulkV4.length);
