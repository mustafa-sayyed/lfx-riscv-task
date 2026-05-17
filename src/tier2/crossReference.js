export function crossReference(jsonExts, manualExts) {
    const jsonSet = new Set(jsonExts);
    const manualSet = new Set(manualExts);

    const JsonOnlyExtension = [];
    for (const ext of jsonExts) {
        if (!manualSet.has(ext)) {
            JsonOnlyExtension.push(ext);
        }
    }

    const ManualOnlyExtension = [];
    for (const ext of manualExts) {
        if (!jsonSet.has(ext)) {
            ManualOnlyExtension.push(ext);
        }
    }

    const matchedCount = jsonExts.length - JsonOnlyExtension.length;

    return {
        matched: jsonExts.filter(e => manualSet.has(e)),
        JsonOnlyExtension,
        ManualOnlyExtension,
        summary: `${matchedCount} matched, ${JsonOnlyExtension.length} in JSON only, ${ManualOnlyExtension.length} in manual only`
    };
}
