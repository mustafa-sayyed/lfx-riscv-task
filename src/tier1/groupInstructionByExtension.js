// Task:
// Parse all instruction entries and group them by their extension tag(s)
// Print a summary table showing each extension tag, its instruction count, and one example mnemonic

export function groupInstructionsByExtension(instructions) {
	const extensionsMap = new Map();

	for (const [mnemonic, instruction] of Object.entries(instructions)) {
		const extensions =
			Array.isArray(instruction.extension) ? instruction.extension : [];

		for (const ext of extensions) {
			if (!extensionsMap.has(ext)) {
				extensionsMap.set(ext, { name: ext, count: 1, example: mnemonic });
			} else {
				const existing = extensionsMap.get(ext);
				extensionsMap.set(ext, { ...existing, count: existing.count + 1 });
			}
		}
	}

	return Array.from(extensionsMap.values());
}
