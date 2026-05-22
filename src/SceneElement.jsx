import { Group, Rect, Circle, RegularPolygon, Line, Text } from 'react-konva'
import { ELEMENT_TYPES } from './elementTypes'

const STROKE = '#1f2937'
const STROKE_WIDTH = 1
const LABEL_FONT_SIZE = 12
const LABEL_WIDTH = 100

function renderShape(config, color) {
  const common = { fill: color, stroke: STROKE, strokeWidth: STROKE_WIDTH }

  switch (config.shape) {
    case 'rect':
      return (
        <Rect
          {...common}
          width={config.width}
          height={config.height}
          offsetX={config.width / 2}
          offsetY={config.height / 2}
          cornerRadius={4}
        />
      )
    case 'circle':
      return <Circle {...common} radius={config.radius} />
    case 'triangle':
      return <RegularPolygon {...common} sides={3} radius={config.radius} />
    case 'impact':
      return (
        <Line
          {...common}
          points={config.points}
          closed
          lineJoin="miter"
        />
      )
    default:
      return null
  }
}


function shapeHalfHeight(config) {
  if (config.shape === 'rect') return config.height / 2
  return config.radius
}

function setCursor(e, cursor) {
  const stage = e.target.getStage()
  if (stage) stage.container().style.cursor = cursor
}

function SceneElement({ element, onDragEnd }) {
  const config = ELEMENT_TYPES[element.type]
  if (!config) return null

  const handleDragEnd = (e) => {
    setCursor(e, 'grab')
    onDragEnd(element.id, e.target.x(), e.target.y())
  }

  return (
    <Group
      x={element.x}
      y={element.y}
      rotation={element.rotation}
      draggable
      onMouseEnter={(e) => setCursor(e, 'grab')}
      onMouseLeave={(e) => setCursor(e, 'default')}
      onDragStart={(e) => setCursor(e, 'grabbing')}
      onDragEnd={handleDragEnd}
    >
      {renderShape(config, element.color)}
      <Text
        text={element.label}
        fontSize={LABEL_FONT_SIZE}
        fill={STROKE}
        width={LABEL_WIDTH}
        offsetX={LABEL_WIDTH / 2}
        y={shapeHalfHeight(config) + 4}
        align="center"
        listening={false}
      />
    </Group>
  )
}

export default SceneElement
