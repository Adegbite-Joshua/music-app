// src/components/GraphRenderer.tsx

import React, { useState } from 'react';
import ReactFlow, { Background, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

// Define the shape of the data for nodes and edges
interface GraphData {
    nodes: Node[];
    edges: Edge[];
}

// Define the shape of the levelData object
interface LevelData {
    [key: string]: GraphData;
}


// src/data/graphLevels.js

export const level1 = {
    nodes: [
        { id: '1', data: { label: 'Wu-Tang Clan' }, position: { x: 300, y: 0 } },
        { id: '2', data: { label: 'RZA' }, position: { x: 200, y: 100 } },
        { id: '3', data: { label: 'GZA' }, position: { x: 400, y: 100 } },
        { id: '4', data: { label: 'Method Man' }, position: { x: 100, y: 200 } },
        { id: '5', data: { label: 'Ghostface Killah' }, position: { x: 300, y: 200 } },
        { id: '6', data: { label: 'Raekwon' }, position: { x: 500, y: 200 } },
    ],
    edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: false },
        { id: 'e2-5', source: '2', target: '5', animated: false },
        { id: 'e3-6', source: '3', target: '6', animated: true },
    ],
};

const level2 = {
    nodes: [
        { id: '1', data: { label: 'Wu-Tang Clan' }, position: { x: 300, y: 0 } },
        { id: '2', data: { label: 'RZA' }, position: { x: 200, y: 100 } },
        { id: '3', data: { label: 'GZA' }, position: { x: 400, y: 100 } },
        { id: '4', data: { label: 'Method Man' }, position: { x: 100, y: 200 } },
        { id: '5', data: { label: 'Ghostface Killah' }, position: { x: 300, y: 200 } },
        { id: '6', data: { label: 'Raekwon' }, position: { x: 500, y: 200 } },
        { id: '7', data: { label: 'Inspectah Deck' }, position: { x: 150, y: 300 } },
        { id: '8', data: { label: 'U-God' }, position: { x: 300, y: 300 } },
        { id: '9', data: { label: 'Ol\' Dirty Bastard' }, position: { x: 450, y: 300 } },
    ],
    edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: false },
        { id: 'e2-5', source: '2', target: '5', animated: false },
        { id: 'e3-6', source: '3', target: '6', animated: true },
        { id: 'e4-7', source: '4', target: '7', animated: false },
        { id: 'e5-8', source: '5', target: '8', animated: false },
        { id: 'e6-9', source: '6', target: '9', animated: true },
    ],
};
const level3 = {
    nodes: [
        { id: '1', data: { label: 'Wu-Tang Clan' }, position: { x: 300, y: 0 }, source: true },
        { id: '2', data: { label: 'RZA' }, position: { x: 200, y: 100 } },
        { id: '3', data: { label: 'GZA' }, position: { x: 400, y: 100 } },
        { id: '4', data: { label: 'Method Man' }, position: { x: 100, y: 200 } },
        { id: '5', data: { label: 'Ghostface Killah' }, position: { x: 300, y: 200 } },
        { id: '6', data: { label: 'Raekwon' }, position: { x: 500, y: 200 } },
        { id: '7', data: { label: 'Inspectah Deck' }, position: { x: 150, y: 300 } },
        { id: '8', data: { label: 'U-God' }, position: { x: 300, y: 300 } },
        { id: '9', data: { label: 'Ol\' Dirty Bastard' }, position: { x: 450, y: 300 } },
        { id: '10', data: { label: 'Cappadonna' }, position: { x: 100, y: 400 } },
        { id: '11', data: { label: 'Streetlife' }, position: { x: 300, y: 400 } },
    ],
    edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: false },
        { id: 'e2-5', source: '2', target: '5', animated: false },
        { id: 'e3-6', source: '3', target: '6', animated: true },
        { id: 'e4-7', source: '4', target: '7', animated: false },
        { id: 'e5-8', source: '5', target: '8', animated: false },
        { id: 'e6-9', source: '6', target: '9', animated: true },
        { id: 'e7-10', source: '7', target: '10', animated: false },
        { id: 'e8-11', source: '8', target: '11', animated: true },
    ],
};

export const levelData = { level1, level2, level3 };

const GraphRenderer: React.FC = () => {
    const [currentLevel, setCurrentLevel] = useState<string>('level1');

    // Safely access levelData with type inference
    const { nodes, edges } = (levelData as LevelData)[currentLevel];

    const handleLevelChange = (level: string) => setCurrentLevel(level);

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <div style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                <h1 style={{ textAlign: 'center' }}>Graph Visualization</h1>
                <button onClick={() => handleLevelChange('level1')} className="btn">
                    Level 1
                </button>
                <button onClick={() => handleLevelChange('level2')} className="btn">
                    Level 2
                </button>
                <button onClick={() => handleLevelChange('level3')} className="btn">
                    Level 3
                </button>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                zoomOnPinch={false}
                zoomOnScroll={false}
                zoomOnDoubleClick={false}
                style={{ border: '1px solid #ccc', borderRadius: '8px' }}
            >
                <Background />
                {/* <Controls /> */}
            </ReactFlow>
        </div>
    );
};

export default GraphRenderer;
