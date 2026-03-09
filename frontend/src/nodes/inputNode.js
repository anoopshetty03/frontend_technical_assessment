// inputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
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
      <div
        style={{ fontWeight: "bold", marginBottom: "8px", color: "#495057" }}
      >
        <span>Input</span>
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
          value={inputType}
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
          <option value="File">File</option>
        </select>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        style={{
          background: "#007bff",
          border: "2px solid #ffffff",
          width: "8px",
          height: "8px",
        }}
      />
    </div>
  );
};
