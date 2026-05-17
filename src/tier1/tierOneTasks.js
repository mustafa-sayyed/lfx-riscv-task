import instructions from "../instr_dict.json" with { type: "json" };
import { groupInstructionsByExtension } from "./groupInstructionByExtension.js";
import { findMultiExtensionInstructions } from "./multiExtensionInstructions.js";


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
	console.log(`${ext.name} | ${ext.count} instruction | e.g. ${ext.example}`);
}
console.log("\n".repeat(3) + "=".repeat(80));






const multiExtensionInstructions = findMultiExtensionInstructions(instructions);

// Print instructions that belong to more than one extension
console.log(
	"\n".repeat(3) +
		"=".repeat(20) +
		"  Instruction belongs to more than one Extension  " +
		"=".repeat(20) +
		"\n".repeat(3),
);
for (const instr of multiExtensionInstructions) {
	console.log(
		`${instr.instructionName} belongs to ${instr.extensionCount} extensions`,
	);
}
console.log("\n".repeat(3) + "=".repeat(80));
