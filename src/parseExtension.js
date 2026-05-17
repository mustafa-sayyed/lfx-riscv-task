import instructions from "./instr_dict.json" with { type: "json" };

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

const extensionGroup = groupInstructionsByExtension(instructions);

// Print extension group data with count and example mnemonic
console.log(
	"\n".repeat(3) +
		"=".repeat(20) +
		"  Extension Group with count and example  " +
		"=".repeat(20) +
		"\n".repeat(3),
);
for (const ext of extensionGroup) {
	console.log(
		`${ext.name} | ${ext.count} instruction | e.g. ${ext.example}`,
	);
}
console.log("\n".repeat(3) + "=".repeat(80));








// Task:
// Identify and list any instructions that belong to more than one extension
export function findMultiExtensionInstructions(instructions) {
	return Object.entries(instructions).reduce(
		(acc, [mnemonic, instruction]) => {
			if (instruction.extension.length > 1) {
				acc.push({
					instructionName: mnemonic,
					extensionCount: instruction.extension.length,
				});
			}

			return acc;
		},
		[],
	);

}

const multiExtensionInstructions = findMultiExtensionInstructions(instructions);

console.log(
	"\n".repeat(3) +
		"=".repeat(20) +
		"  Instruction belongs to more than one Extension  " +
		"=".repeat(20) +
		"\n".repeat(3),
);
for (const instr of multiExtensionInstructions) {
	console.log(`${instr.instructionName} belongs to ${instr.extensionCount} extensions`);
}
console.log("\n".repeat(3) + "=".repeat(80));
