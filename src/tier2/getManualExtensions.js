import fs from 'fs';
import path from 'path';
import { normalizeExtensionToken } from './tierTwoUtils.js';

export function getManualExtensions(srcDir) {
    const extensions = new Set();
    const adocFiles = [];

    function findAdoc(dir) {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (file !== '.git' && file !== 'images') {
                    findAdoc(fullPath);
                }
            } else if (fullPath.endsWith('.adoc')) {
                adocFiles.push(fullPath);
            }
        }
    }

    findAdoc(srcDir);

    const regex = /(?:ext|extlink):([a-zA-Z0-9_]+)\[\]/gi;

    for (const file of adocFiles) {
        const content = fs.readFileSync(file, 'utf8');
        let match;
        while ((match = regex.exec(content)) !== null) {
            extensions.add(normalizeExtensionToken(match[1]));
        }
    }

    return Array.from(extensions).sort();
}
