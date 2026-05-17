import { describe, it, expect } from 'vitest';
import { crossReference } from '../src/tier2/crossReference.js';
import { getJsonExtensions } from '../src/tier2/getJsonExtensions.js';
import { getManualExtensions } from '../src/tier2/getManualExtensions.js';

describe('Tier 2 Tasks', () => {
    it('crossReference compares and generates a valid result', () => {
        const jsonExts = ['a', 'b', 'c', 'd'];
        const manualExts = ['c', 'd', 'e', 'f'];

        const result = crossReference(jsonExts, manualExts);

        expect(result.matched).toEqual(['c', 'd']);
        expect(result.JsonOnlyExtension).toEqual(['a', 'b']);
        expect(result.ManualOnlyExtension).toEqual(['e', 'f']);
        expect(result.summary).toBe('2 matched, 2 in JSON only, 2 in manual only');
    });

    it('getJsonExtensions is exported and is a function', () => {
        expect(typeof getJsonExtensions).toBe('function');
    });
    
    it('getManualExtensions is exported and is a function', () => {
        expect(typeof getManualExtensions).toBe('function');
    });
});
