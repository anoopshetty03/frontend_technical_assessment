// llmNode.js

import { Handle, Position } from "reactflow";

export const LLMNode = ({ id, data }) => {
  return (
    <div
      style={{
        width: 200,
        height: 80,
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        padding: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{
          top: `${100 / 3}%`,
          background: "#007bff",
          border: "2px solid #ffffff",
          width: "8px",
          height: "8px",
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{
          top: `${200 / 3}%`,
          background: "#007bff",
          border: "2px solid #ffffff",
          width: "8px",
          height: "8px",
        }}
      />
      <div
        style={{ fontWeight: "bold", marginBottom: "4px", color: "#495057" }}
      >
        <span>LLM</span>
      </div>
      <div style={{ fontSize: "12px", color: "#6c757d", textAlign: "center" }}>
        <span>This is a LLM.</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
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
