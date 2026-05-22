import { useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { ELEMENT_TYPES, ELEMENT_TYPE_LIST } from './elementTypes';
import SceneElement from './SceneElement';

const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 600;

export default function App() {
    const [elements, setElements] = useState([]);
    const [showJson, setShowJson] = useState(false);

    function addElement(type) {
        const { label, color } = ELEMENT_TYPES[type];
        const offset = (elements.length % 8) * 18;
        const newElement = {
            id: crypto.randomUUID(),
            type,
            x: STAGE_WIDTH / 2 - 72 + offset,
            y: STAGE_HEIGHT / 2 - 72 + offset,
            rotation: 0,
            color,
            label,
        };
        setElements((prev) => [...prev, newElement]);
    }

    function updateElementPosition(id, x, y) {
        setElements((prev) =>
            prev.map((el) => (el.id === id ? { ...el, x, y } : el)),
        );
    }

    function clearScene() {
        setElements([]);
    }

    function downloadJson() {
        const json = JSON.stringify(elements, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'escena.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    return (
        <div className="app-shell">
            <header className="app-header">
                <div>
                    <h1>Croquis de accidente</h1>
                    <p className="muted">Elementos en la escena: {elements.length}</p>
                </div>
                <div className="header-actions">
                    <button
                        type="button"
                        className="button secondary"
                        onClick={() => setShowJson((v) => !v)}
                    >
                        {showJson ? 'Ocultar JSON' : 'Ver JSON'}
                    </button>
                    <button type="button" className="button" onClick={downloadJson}>
                        Descargar JSON
                    </button>
                    <button
                        type="button"
                        className="button danger"
                        onClick={clearScene}
                        disabled={elements.length === 0}
                    >
                        Limpiar escena
                    </button>
                </div>
            </header>

            <main>
                <div className="palette">
                    {ELEMENT_TYPE_LIST.map((type) => (
                        <button
                            key={type}
                            type="button"
                            className="button secondary"
                            onClick={() => addElement(type)}
                        >
                            + {ELEMENT_TYPES[type].label}
                        </button>
                    ))}
                </div>

                <div className="stage-wrapper">
                    <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
                        <Layer>
                            {elements.length === 0 && (
                                <Text
                                    text="Añade elementos conlos botones de arriba y arrástralos por el lienzo."
                                    fontSize={14}
                                    fill="#94a3b8"
                                    width={STAGE_WIDTH}
                                    y={STAGE_HEIGHT / 2 - 7}
                                    align="center"
                                    listening={false}
                                />
                            )}
                            {elements.map((el) => (
                                <SceneElement
                                    key={el.id}
                                    element={el}
                                    onDragEnd={updateElementPosition}
                                />
                            ))}
                        </Layer>
                    </Stage>
                </div>

                {showJson && (
                    <pre className="json-view">
                        {JSON.stringify(elements, null, 2)}
                    </pre>
                )}
            </main>
        </div>
    );
}
