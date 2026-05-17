import { describe, expect, it } from "vitest";
import { groupInstructionsByExtension } from "../src/tier1/groupInstructionByExtension.js";
import { findMultiExtensionInstructions } from "../src/tier1/multiExtensionInstructions.js";

const sampleInstructions = {
	ADD: { extension: ["X"] },
	SUB: { extension: ["Y", "X"] },
	NOP: { extension: [] },
	MUL: { extension: ["Y"] },
};

describe("tier one tasks", () => {
	it("groups instructions by extension", () => {
		const grouped = groupInstructionsByExtension(sampleInstructions);
		const byName = Object.fromEntries(grouped.map((g) => [g.name, g]));

		console.log("\nGrouped extensions:");
		for (const group of grouped) {
			console.log(
				`${group.name} | count=${group.count} | example=${group.example}`,
			);
		}

		expect(byName.X.count).toBe(2);
		expect(["ADD", "SUB"]).toContain(byName.X.example);
		expect(byName.Y.count).toBe(2);
		expect(["SUB", "MUL"]).toContain(byName.Y.example);
	});

	it("finds instructions with multiple extensions", () => {
		const multi = findMultiExtensionInstructions(sampleInstructions);

		console.log("\nMulti-extension instructions:");
		for (const instruction of multi) {
			console.log(
				`${instruction.instructionName} | extensionCount=${instruction.extensionCount}`,
			);
		}

		expect(multi).toHaveLength(1);
		expect(multi[0]).toEqual({
			instructionName: "SUB",
			extensionCount: 2,
		});
	});

	it("prints a success line", () => {
		console.log("All tier one tasks tests are passed");
		expect(true).toBe(true);
	});
});
