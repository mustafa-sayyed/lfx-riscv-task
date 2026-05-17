# RISC-V LFX Mentorship Task

This repo is my submission for the LFX RISC-V Mentorship Coding Challenge.

## What this project does

- Parses the instruction from the instr_dict.json.
- Groups instructions by extension tags, prints counts and an example mnemonic.
- Detects instructions that belong to more than one extension.
- Scans the RISC-V ISA Manual AsciiDoc sources and cross-references extension names with instr_dict.json.
- Reports extensions only in JSON, only in the manual (AsciiDoc Sources), and a match summary.

## Project layout

- src/instr_dict.json: Instruction from [riscv-extensions-landscape](https://github.com/rpsene/riscv-extensions-landscape).
- src/tier1/: Tier 1 tasks.
- src/tier2/: Tier 2 tasks.
- src/tier2/src/: Snapshot of the [riscv-isa-manual](https://github.com/riscv/riscv-isa-manual) AsciiDoc sources.
- tests/: unit tests for Tier 1 and Tier 2 (used Vitest).

## Requirements

- Node.js 20.20.0+
- npm 10.8.2+

## Install

```bash
git clone https://github.com/mustafa-sayyed/lfx-riscv-task.git
```

```bash
cd lfx-riscv-task
```

```bash
npm install
```

## Run the tasks

Tier 1:

```bash
npm run tier:1
```

Tier 2:

```bash
npm run tier:2
```

Run tests:

```bash
npm test
```
```bash
npm tier:1:test
```
```bash
npm tier:2:test
```

## Sample output

Tier 1:

```text
====================  Extension Group with count and example  ====================

rv_i | 37 instruction | e.g. add
rv_zba | 3 instruction | e.g. sh1add
rv_v | 627 instruction | e.g. vaadd_vv

====================  Instruction belongs to more than one Extension  ====================

aes64ks1i belongs to 4 extensions
andn belongs to 5 extensions
sha512sig0 belongs to 3 extensions
```

Tier 2:

```text
====================  RISC-V Extension Cross-Reference with ISA Manual  ====================

56 matched, 20 in JSON only, 103 in manual only

Extensions in JSON but NOT in manual:
s, sdext, ssctr, system, u, zbp, zibi, zicbo, ...

Extensions in manual but NOT in JSON:
b, e, g, j, n, p, sh, sm, ss, sv, zca, zcd, zce, ...
```

## Design notes and assumptions

- JSON extensions are normalized by splitting on '_' and removing rv/rv32/rv64 prefixes, then lowercasing.
- Manual extensions are extracted from AsciiDoc macros of the form ext:Zba[] or extlink:Zicsr[].
- The ISA manual sources are vendored under src/tier2/src to keep the project self-contained.

## Scripts

- `npm run tier:1`: Run Tier 1 for parsing and grouping.
- `npm run tier:2`: Run Tier 2 for cross-reference extensions.
- `npm run test`: Run all tests.
- `npm run tier:1:test`: Run Tier 1 tests only.
- `npm run tier:2:test`: Run Tier 2 tests only.

## References

- RISC-V Extensions Landscape: https://github.com/rpsene/riscv-extensions-landscape
- RISC-V ISA Manual: https://github.com/riscv/riscv-isa-manual
