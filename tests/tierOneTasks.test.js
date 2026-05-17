import { describe, expect, it } from "vitest";
import { groupInstructionsByExtension } from "../src/tier1/groupInstructionByExtension.js";
import { findMultiExtensionInstructions } from "../src/tier1/multiExtensionInstructions.js";

const sampleInstructions = {
	ADD: { extension: ["X"] },
	SUB: { extension: ["Y", "X"] },
	NOP: { extension: [] },
	MUL: { extension: ["Y"] },
};

describe("Tier 1 Tasks", () => {
	it("groups instructions by extension", () => {
		const grouped = groupInstructionsByExtension(sampleInstructions);
		const byName = Object.fromEntries(grouped.map((g) => [g.name, g]));

		expect(byName.X.count).toBe(2);
		expect(["ADD", "SUB"]).toContain(byName.X.example);
		expect(byName.Y.count).toBe(2);
		expect(["SUB", "MUL"]).toContain(byName.Y.example);
	});

	it("finds instructions with multiple extensions", () => {
		const multi = findMultiExtensionInstructions(sampleInstructions);

		expect(multi).toHaveLength(1);
		expect(multi[0]).toEqual({
			instructionName: "SUB",
			extensionCount: 2,
		});
	});
});
