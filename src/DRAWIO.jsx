import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Line } from "react-konva";
import "./App.css"; // For some basic CSS (optional)

const SHAPE_TYPES = {
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  SQUARE: "square",
};

const DrawIoClone = () => {
  const [shapes, setShapes] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);

  // Function to add new shapes to the canvas
  const addShape = (type) => {
    const newShape = {
      id: `shape_${shapes.length + 1}`,
      type: type,
      x: Math.random() * 500,
      y: Math.random() * 500,
      width: type === SHAPE_TYPES.SQUARE ? 100 : type === SHAPE_TYPES.RECTANGLE ? 150 : 100,
      height: type === SHAPE_TYPES.SQUARE || type === SHAPE_TYPES.RECTANGLE ? 100 : 100,
      radius: type === SHAPE_TYPES.CIRCLE ? 50 : null,
    };
    setShapes([...shapes, newShape]);
  };

  // Function to add a new line
  const addLine = () => {
    const newLine = {
      id: `line_${lines.length + 1}`,
      startX: 150,
      startY: 150,
      endX: 300,
      endY: 300,
    };
    setLines([...lines, newLine]);
  };

  // Function to handle shape dragging
  const handleDragEnd = (e, id) => {
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === id) {
        return { ...shape, x: e.target.x(), y: e.target.y() };
      }
      return shape;
    });
    setShapes(updatedShapes);
  };

  // Function to handle line handle dragging
  const handleLineDrag = (e, lineId, point) => {
    const updatedLines = lines.map((line) => {
      if (line.id === lineId) {
        return {
          ...line,
          [point]: { x: e.target.x(), y: e.target.y() },
        };
      }
      return line;
    });
    setLines(updatedLines);
  };

  return (
    <div className="app">
      {/* Sidebar with shape options */}
      <div className="toolbar">
        <h2>Toolbar</h2>
        <button onClick={() => addShape(SHAPE_TYPES.RECTANGLE)}>Rectangle</button>
        <button onClick={() => addShape(SHAPE_TYPES.SQUARE)}>Square</button>
        <button onClick={() => addShape(SHAPE_TYPES.CIRCLE)}>Circle</button>
        <button onClick={addLine}>Add Line</button>
      </div>

      {/* Drawing canvas */}
      <Stage
        width={window.innerWidth - 200} // Adjust width to accommodate toolbar
        height={window.innerHeight}
        style={{ border: "1px solid grey", marginLeft: "200px" }}
      >
        <Layer>
          {/* Draw shapes */}
          {shapes.map((shape, i) => {
            if (shape.type === SHAPE_TYPES.RECTANGLE || shape.type === SHAPE_TYPES.SQUARE) {
              return (
                <Rect
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  fill="lightblue"
                  draggable
                  onDragEnd={(e) => handleDragEnd(e, shape.id)}
                  stroke="black"
                  strokeWidth={2}
                />
              );
            } else if (shape.type === SHAPE_TYPES.CIRCLE) {
              return (
                <Circle
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius}
                  fill="lightgreen"
                  draggable
                  onDragEnd={(e) => handleDragEnd(e, shape.id)}
                  stroke="black"
                  strokeWidth={2}
                />
              );
            }
            return null;
          })}

          {/* Draw Lines with Handles */}
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              <Line
                points={[
                  line.startX.x || line.startX, line.startX.y || line.startY, // Starting point
                  line.endX.x || line.endX, line.endX.y || line.endY, // Ending point
                ]}
                stroke="black"
                strokeWidth={2}
              />

              {/* Start handle for the line */}
              <Circle
                x={line.startX.x || line.startX}
                y={line.startX.y || line.startY}
                radius={8}
                fill="red"
                draggable
                onDragMove={(e) => handleLineDrag(e, line.id, "startX")}
              />

              {/* End handle for the line */}
              <Circle
                x={line.endX.x || line.endX}
                y={line.endX.y || line.endY}
                radius={8}
                fill="blue"
                draggable
                onDragMove={(e) => handleLineDrag(e, line.id, "endX")}
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawIoClone;
