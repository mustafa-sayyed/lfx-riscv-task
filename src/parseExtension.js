import instructions from "./instr_dict.json" with { type: "json" };

// Task:
// Parse all instruction entries and group them by their extension tag(s)
// Print a summary table showing each extension tag, its instruction count, and one example mnemonic

const extensionList = Object.entries(instructions).reduce(
	(acc, [mnemonic, instruction]) => {
		for (const extension of instruction.extension) {
			let isMnemonicExist = false;

			isMnemonicExist = acc.some((data) => data?.name === extension);

			if (isMnemonicExist) {
				acc = acc.map((data) => {
					if (data?.name === extension) {
						return {
							count: data.count++,
							...data,
						};
					}
					return data;
				});
			} else {
				acc.push({
					name: extension,
					count: 1,
					example: mnemonic,
				});
			}
		}

		return acc;
	},
	[],
);

// Print extension group data with count and example mnemonic
console.log(
	"\n".repeat(3) +
		"=".repeat(20) +
		"  Extension Group with count and example  " +
		"=".repeat(20) +
		"\n".repeat(3),
);
for (const ext of extensionList) {
	console.log(
		`${ext?.name} | ${ext?.count} instruction | e.g. ${ext?.example}`,
	);
}
console.log("\n".repeat(3) + "=".repeat(80));







// Task:
// Identify and list any instructions that belong to more than one extension

const multiExtensionInstruction = Object.entries(
	instructions,
).reduce((acc, [mnemonic, instruction]) => {
	if (instruction.extension.length > 1) {
		acc.push({
			instructionName: mnemonic,
			extensionCount: instruction.extension.length,
		});
	}

	return acc;
}, []);


console.log(
	"\n".repeat(3) +
		"=".repeat(20) +
		"  Instruction belongs to more than one Extension  " +
		"=".repeat(20) +
		"\n".repeat(3),
);
for (const instr of multiExtensionInstruction) {
	console.log(
		`${instr.instructionName} belongs to ${instr.extensionCount}`,
	);
}
console.log("\n".repeat(3) + "=".repeat(80));

