import instrDict from '../instr_dict.json' with { type: 'json' };
import { normalizeExtensionParts } from './tierTwoUtils.js';

export function getJsonExtensions() {
    const data = instrDict;
    const extensions = new Set();

    for (const key in data) {
        if (data[key].extension) {
            data[key].extension.forEach(ext => {
                const parts = normalizeExtensionParts(ext);
                parts.forEach(part => extensions.add(part));
            });
        }
    }

    return Array.from(extensions).sort();
}
