const RV_PREFIXES = new Set(["rv", "rv32", "rv64"]);

export function normalizeExtensionParts(raw) {
	return raw
		.split("_")
		.map(normalizeExtensionToken)
		.filter((part) => part.length > 0 && !RV_PREFIXES.has(part));
}

export function normalizeExtensionToken(token) {
	return token.trim().toLowerCase();
}
