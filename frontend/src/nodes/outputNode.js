// outputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div
      style={{
        width: 200,
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        padding: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        style={{
          background: "#007bff",
          border: "2px solid #ffffff",
          width: "8px",
          height: "8px",
        }}
      />
      <div
        style={{ fontWeight: "bold", marginBottom: "8px", color: "#495057" }}
      >
        <span>Output</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: 1,
        }}
      >
        <div style={{ fontSize: "11px", color: "#6c757d", fontWeight: "500" }}>
          Name:
        </div>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          style={{
            width: "100%",
            padding: "4px 6px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            fontSize: "11px",
            boxSizing: "border-box",
          }}
        />
        <div style={{ fontSize: "11px", color: "#6c757d", fontWeight: "500" }}>
          Type:
        </div>
        <select
          value={outputType}
          onChange={handleTypeChange}
          style={{
            width: "100%",
            padding: "4px 6px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            fontSize: "11px",
            boxSizing: "border-box",
          }}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </div>
  );
};
