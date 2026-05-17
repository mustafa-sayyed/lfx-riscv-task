// Task:
// Identify and list any instructions that belong to more than one extension

export function findMultiExtensionInstructions(instructions) {
	return Object.entries(instructions).reduce((acc, [mnemonic, instruction]) => {
		if (instruction.extension.length > 1) {
			acc.push({
				instructionName: mnemonic,
				extensionCount: instruction.extension.length,
			});
		}

		return acc;
	}, []);
}
