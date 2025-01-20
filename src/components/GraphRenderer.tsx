// src/components/GraphRenderer.tsx

import React, { useRef, useState } from 'react';
import ReactFlow, { Background, Node, Edge, ReactFlowProvider } from 'reactflow';
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

// import { EdgeProps, getBezierPath } from 'reactflow';

// const CustomEdge: React.FC<EdgeProps> = ({
//     id,
//     sourceX,
//     sourceY,
//     targetX,
//     targetY,
//     style,
//     markerEnd,
//     data,
// }) => {
//     // Define the edge path
//     const [edgePath] = getBezierPath({
//         sourceX,
//         sourceY,
//         targetX,
//         targetY,
//     });

//     // Determine color and thickness based on custom data
//     const strokeColor = data?.color || 'black'; // Default color
//     const strokeWidth = data?.thickness || 2; // Default thickness

//     return (
//         <g>
//             <path
//                 id={id}
//                 style={style}
//                 className="react-flow__edge-path"
//                 d={edgePath}
//                 markerEnd={markerEnd}
//                 stroke={strokeColor}
//                 strokeWidth={strokeWidth}
//                 fill="none"
//             />
//         </g>
//     );
// };

const level1 = {
    nodes: [
        { id: '1', data: { label: 'Wu-Tang Clan' }, position: { x: 300, y: 0 }, style: { stroke: 'red' } },
        { id: '2', data: { label: 'RZA' }, position: { x: 200, y: 100 }, style: { stroke: 'purple' } },
        { id: '3', data: { label: 'GZA' }, position: { x: 400, y: 100 }, style: { stroke: 'purple' } },
        { id: '4', data: { label: 'Method Man' }, position: { x: 100, y: 200 }, style: { stroke: 'green' } },
        { id: '5', data: { label: 'Ghostface Killah' }, position: { x: 300, y: 200 }, style: { stroke: 'green' } },
        { id: '6', data: { label: 'Raekwon' }, position: { x: 500, y: 200 }, style: { stroke: 'green' } },
    ],
    edges: [
        { id: 'e1-2', source: '1', target: '2', type: 'custom', style: { stroke: 'purple', strokeWidth: 5 }, animated: true },
        { id: 'e1-3', source: '1', target: '3', type: 'custom', style: { stroke: 'orange', strokeWidth: 3 }, animated: true },
        { id: 'e2-4', source: '2', target: '4', type: 'custom', style: { stroke: 'green', strokeWidth: 7 }, animated: false },
        { id: 'e2-5', source: '2', target: '5', type: 'custom', style: { stroke: 'red', strokeWidth: 6 }, animated: false },
        { id: 'e3-6', source: '3', target: '6', type: 'custom', style: { stroke: 'blue', strokeWidth: 4 }, animated: true },
    ],
};

const level2 = {
    nodes: [
        { id: '1', data: { label: 'Wu-Tang Clan' }, position: { x: 300, y: 0 } },
        { id: '2', data: { label: 'RZA' }, position: { x: 200, y: 100 }, style: { stroke: 'purple' } },
        { id: '3', data: { label: 'GZA' }, position: { x: 400, y: 100 }, style: { stroke: 'purple' } },
        { id: '4', data: { label: 'Method Man' }, position: { x: 100, y: 200 }, style: { stroke: 'green' } },
        { id: '5', data: { label: 'Ghostface Killah' }, position: { x: 300, y: 200 }, style: { stroke: 'green' } },
        { id: '6', data: { label: 'Raekwon' }, position: { x: 500, y: 200 }, style: { stroke: 'green' } },
        { id: '7', data: { label: 'Inspectah Deck' }, position: { x: 150, y: 300 }, style: { stroke: 'yellow' } },
        { id: '8', data: { label: 'U-God' }, position: { x: 300, y: 300 }, style: { stroke: 'yellow' } },
        { id: '9', data: { label: 'Ol\' Dirty Bastard' }, position: { x: 450, y: 300 }, style: { stroke: 'yellow' } },
    ],
    edges: [
        { id: 'e1-2', source: '1', target: '2', type: 'custom', style: { stroke: 'purple', strokeWidth: 3 }, animated: true },
        { id: 'e1-3', source: '1', target: '3', type: 'custom', style: { stroke: 'red', strokeWidth: 4 }, animated: true },
        { id: 'e2-4', source: '2', target: '4', type: 'custom', style: { stroke: 'green', strokeWidth: 3 }, animated: false },
        { id: 'e2-5', source: '2', target: '5', type: 'custom', style: { stroke: 'blue', strokeWidth: 6 }, animated: false },
        { id: 'e3-6', source: '3', target: '6', type: 'custom', style: { stroke: 'orange', strokeWidth: 3 }, animated: true },
        { id: 'e4-7', source: '4', target: '7', type: 'custom', style: { stroke: 'yellow', strokeWidth: 3 }, animated: false },
        { id: 'e5-8', source: '5', target: '8', type: 'custom', style: { stroke: 'green', strokeWidth: 7 }, animated: false },
        { id: 'e6-9', source: '6', target: '9', type: 'custom', style: { stroke: 'blue', strokeWidth: 3 }, animated: true },
    ],
};

const level3 = {
    nodes: [
        { id: '1', data: { label: 'Wu-Tang Clan' }, position: { x: 300, y: 0 }, source: true },
        { id: '2', data: { label: 'RZA' }, position: { x: 200, y: 100 }, style: { stroke: 'purple' } },
        { id: '3', data: { label: 'GZA' }, position: { x: 400, y: 100 }, style: { stroke: 'purple' } },
        { id: '4', data: { label: 'Method Man' }, position: { x: 100, y: 200 }, style: { stroke: 'green' } },
        { id: '5', data: { label: 'Ghostface Killah' }, position: { x: 300, y: 200 }, style: { stroke: 'green' } },
        { id: '6', data: { label: 'Raekwon' }, position: { x: 500, y: 200 }, style: { stroke: 'green' } },
        { id: '7', data: { label: 'Inspectah Deck' }, position: { x: 150, y: 300 }, style: { stroke: 'yellow' } },
        { id: '8', data: { label: 'U-God' }, position: { x: 300, y: 300 }, style: { stroke: 'yellow' } },
        { id: '9', data: { label: 'Ol\' Dirty Bastard' }, position: { x: 450, y: 300 }, style: { stroke: 'yellow' } },
        { id: '10', data: { label: 'Cappadonna' }, position: { x: 100, y: 400 }, style: { stroke: 'pink' } },
        { id: '11', data: { label: 'Streetlife' }, position: { x: 300, y: 400 }, style: { stroke: 'pink' } },
    ],
    edges: [
        { id: 'e1-2', source: '1', target: '2', type: 'custom', style: { stroke: 'purple', strokeWidth: 3 }, animated: true },
        { id: 'e1-3', source: '1', target: '3', type: 'custom', style: { stroke: 'blue', strokeWidth: 3 }, animated: true },
        { id: 'e2-4', source: '2', target: '4', type: 'custom', style: { stroke: 'green', strokeWidth: 3 }, animated: false },
        { id: 'e2-5', source: '2', target: '5', type: 'custom', style: { stroke: 'orange', strokeWidth: 5 }, animated: false },
        { id: 'e3-6', source: '3', target: '6', type: 'custom', style: { stroke: 'blue', strokeWidth: 3 }, animated: true },
        { id: 'e4-7', source: '4', target: '7', type: 'custom', style: { stroke: 'yellow', strokeWidth: 3 }, animated: false },
        { id: 'e5-8', source: '5', target: '8', type: 'custom', style: { stroke: 'green', strokeWidth: 3 }, animated: false },
        { id: 'e6-9', source: '6', target: '9', type: 'custom', style: { stroke: 'orange', strokeWidth: 7 }, animated: true },
        { id: 'e7-10', source: '7', target: '10', type: 'custom', style: { stroke: 'pink', strokeWidth: 4 }, animated: false },
        { id: 'e8-11', source: '8', target: '11', type: 'custom', style: { stroke: 'pink', strokeWidth: 2 }, animated: true },
    ],
};


export const levelData = { level1, level2, level3 };

const GraphRenderer: React.FC = () => {
    const [currentLevel, setCurrentLevel] = useState<string>('level1');

    // Safely access levelData with type inference
    const { nodes, edges } = (levelData as LevelData)[currentLevel];

    const handleLevelChange = (level: string) => setCurrentLevel(level);

    const reactFlowWrapper = useRef(null); // Reference to the ReactFlow wrapper

    const onLoad = (reactFlowInstance: any) => {
        reactFlowInstance.fitView(); // Ensure the graph fits within the container
    };

    // const { fitView } = useReactFlow(); // Get the fitView method from ReactFlow

    // useEffect(() => {
    //     fitView();
    // }, [currentLevel, fitView]);
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <h1 style={{ textAlign: 'center' }} className='text-4xl font-bold'>Graph Visualization</h1>
            <div className='flex gap-3 p-3 items-center justify-center border'>
                <button onClick={() => handleLevelChange('level1')} className="p-2 outline-none border-none bg-blue-500 hover:bg-blue-600">
                    Level 1
                </button>
                <button onClick={() => handleLevelChange('level2')} className="p-2 outline-none border-none bg-blue-500 hover:bg-blue-600">
                    Level 2
                </button>
                <button onClick={() => handleLevelChange('level3')} className="p-2 outline-none border-none bg-blue-500 hover:bg-blue-600">
                    Level 3
                </button>
            </div>
            <div className="flex justify-center">
                <div style={{ width: '500px ', height: '500px' }} ref={reactFlowWrapper}>
                    <ReactFlowProvider>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            fitView
                            onLoad={onLoad} // On load, fit the view to the container
                            zoomOnPinch={false}
                            zoomOnScroll={false}
                            zoomOnDoubleClick={false}
                            // edgeTypes={{ custom: CustomEdge }}
                            nodesDraggable={false} // Disable node dragging
                            nodesConnectable={false} // Disable node connections
                            elementsSelectable={false} // Disable element selection
                            // panOnDrag={false} // Disable panning // Disable panning
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                width: '100%', // Full width of the parent container
                                height: '100%', // Full height of the parent container
                                overflow: 'hidden', // Prevents overflow
                            }}           >
                            <Background />
                            {/* <Controls /> */}
                        </ReactFlow>

                    </ReactFlowProvider>

                </div>
            </div>
        </div>
    );
};

export default GraphRenderer;
