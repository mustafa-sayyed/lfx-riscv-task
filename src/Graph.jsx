import { useMemo, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import instructions from './instr_dict.json';
import { normalizeExtensionParts } from './tier2/tierTwoUtils.js';

const HIGHLIGHT_COLOR = '#f97316';

function buildGraph(selectedNodeId) {
    const nodeSet = new Set();
    const edgeCounts = new Map();
    const instructionList = Object.values(instructions).slice(0, 100);

    for (const instruction of instructionList) {
        const rawExts = Array.isArray(instruction.extension)
            ? instruction.extension
            : [];
        const normalized = new Set();

        for (const ext of rawExts) {
            for (const part of normalizeExtensionParts(ext)) {
                normalized.add(part);
            }
        }

        const tokens = Array.from(normalized);
        for (const token of tokens) {
            nodeSet.add(token);
        }

        for (let i = 0; i < tokens.length; i += 1) {
            for (let j = i + 1; j < tokens.length; j += 1) {
                const a = tokens[i];
                const b = tokens[j];
                const key = a < b ? `${a}|${b}` : `${b}|${a}`;
                edgeCounts.set(key, (edgeCounts.get(key) || 0) + 1);
            }
        }
    }

    const nodes = Array.from(nodeSet)
        .sort()
        .map((id, index) => {
            const angle = index * 0.55;
            const radius = 100 * Math.sqrt(index + 1);
            return {
                id,
                data: { label: id.toUpperCase() },
                position: {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius
                },
                style: selectedNodeId === id
                    ? {
                        border: `2px solid ${HIGHLIGHT_COLOR}`,
                        boxShadow: `0 0 0 6px rgba(249, 115, 22, 0.12)`
                    }
                    : undefined
            };
        });

    const edges = Array.from(edgeCounts.entries()).map(([key, count]) => {
        const [source, target] = key.split('|');
        const width = Math.min(1 + count / 4, 5);
        const isHighlighted = selectedNodeId
            ? source === selectedNodeId || target === selectedNodeId
            : false;
        return {
            id: `e-${source}-${target}`,
            source,
            target,
            type: 'smoothstep',
            label: String(count),
            style: {
                strokeWidth: width,
                stroke: isHighlighted ? HIGHLIGHT_COLOR : undefined,
                opacity: selectedNodeId && !isHighlighted ? 0.2 : 1
            }
        };
    });

    return {
        nodes,
        edges,
        nodeCount: nodes.length,
        edgeCount: edges.length,
        instructionCount: instructionList.length
    };
}

export default function Graph() {
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const graph = useMemo(
        () => buildGraph(selectedNodeId),
        [selectedNodeId]
    );

    return (
        <div className="app">
            <header className="hero">
                <p className="eyebrow">RISC-V ISA Extension Graph</p>
                <h1>Shared Instruction Topology</h1>
                <p className="lede">
                    Each node is an extension. A link means two extensions share at least one
                    instruction. Edge labels show the shared instruction count.
                </p>
                <div className="stats">
                    <div>
                        <span className="stat-label">Instructions</span>
                        <span className="stat-value">{graph.instructionCount}</span>
                    </div>
                    <div>
                        <span className="stat-label">Extensions</span>
                        <span className="stat-value">{graph.nodeCount}</span>
                    </div>
                    <div>
                        <span className="stat-label">Connections</span>
                        <span className="stat-value">{graph.edgeCount}</span>
                    </div>
                </div>
            </header>

            <section className="graph-panel">
                <ReactFlow
                    nodes={graph.nodes}
                    edges={graph.edges}
                    fitView
                    minZoom={0.2}
                    maxZoom={1.8}
                    onNodeClick={(_, node) => {
                        setSelectedNodeId(node.id);
                    }}
                    onPaneClick={() => {
                        setSelectedNodeId(null);
                    }}
                >
                    <Background gap={20} size={1} />
                    <MiniMap zoomable pannable />
                    <Controls />
                </ReactFlow>
            </section>
        </div>
    );
}
