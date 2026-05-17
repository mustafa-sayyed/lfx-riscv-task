import path from "path";
import { crossReference } from "./crossReference.js";
import { getJsonExtensions } from "./getJsonExtensions.js";
import { getManualExtensions } from "./getManualExtensions.js";

const srcDir = path.resolve("./src/tier2/src");

const jsonExts = getJsonExtensions();
const manualExts = getManualExtensions(srcDir);
const result = crossReference(jsonExts, manualExts);

console.log(
	"\n".repeat(2) +
		"=".repeat(20) +
		"  RISC-V Extension Cross-Reference with ISA Manual  " +
		"=".repeat(20) +
		"\n".repeat(2),
);
console.log(result.summary);

if (result.JsonOnlyExtension.length) {
	console.log("\nExtensions in JSON but NOT in manual:");
	console.log(result.JsonOnlyExtension.join(", "));
}

if (result.ManualOnlyExtension.length) {
	console.log("\nExtensions in manual but NOT in JSON:");
	console.log(result.ManualOnlyExtension.join(", "));
}

console.log("\n".repeat(2) + "=".repeat(80) + "\n".repeat(2));

