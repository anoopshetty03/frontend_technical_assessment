// textNode.js
import { useState, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";

const extractVariables = (text) => {
  // Regex pattern to match variables inside {{ }}
  const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = new Set();
  let match;
  while ((match = variableRegex.exec(text)) !== null) {
    // match[0] -> full match (example: "{{name}}")
    // match[1] -> captured variable name  (example: "name")
    variables.add(match[1]);
  }
  return [...variables];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef(null);
  const rulerRef = useRef(null);
  const [nodeWidth, setNodeWidth] = useState(220);

  const variables = extractVariables(currText);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  useEffect(() => {
    // Auto-resize height
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${ta.scrollHeight}px`;
    }

    // Auto-resize width
    const ruler = rulerRef.current;
    if (ruler) {
      const maxLineWidth = Math.max(
        ...currText.split("\n").map((line) => {
          ruler.textContent = line || " ";
          return ruler.offsetWidth;
        })
      );
      setNodeWidth(Math.min(Math.max(220, maxLineWidth + 40), 500));
    }
  }, [currText]);

  return (
    <div
      style={{
        width: nodeWidth,
        border: "1px solid #dee2e6",
        borderRadius: 8,
        backgroundColor: "#fff",
        padding: 10,
        boxSizing: "border-box",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "width 0.1s ease",
        position: "relative",
      }}
    >
      {/* Hidden ruler for width measurement */}
      <span
        ref={rulerRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre",
          fontFamily: "monospace",
          fontSize: 12,
          lineHeight: 1.4,
          padding: 4,
          pointerEvents: "none",
        }}
      />

      <div style={{ fontWeight: "bold", color: "#495057", marginBottom: 6 }}>
        Text
      </div>

      <textarea
        ref={textareaRef}
        value={currText}
        onChange={handleTextChange}
        rows={1}
        style={{
          width: "100%",
          border: "1px solid #ced4da",
          borderRadius: 4,
          padding: 4,
          fontFamily: "monospace",
          fontSize: 12,
          boxSizing: "border-box",
          resize: "none",
          overflow: "hidden",
          lineHeight: 1.4,
          display: "block",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: "50%",
          background: "#007bff",
          border: "2px solid #fff",
          width: 8,
          height: 8,
        }}
      />

      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: 44 + index * 22,
            background: "#007bff",
            border: "2px solid #fff",
            width: 8,
            height: 8,
          }}
        />
      ))}

      {variables.length > 0 && (
        <div style={{ marginTop: 6, paddingLeft: 4 }}>
          {variables.map((variable) => (
            <div
              key={variable}
              style={{
                fontSize: 10,
                color: "#6c757d",
                marginTop: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              ↳ {variable}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
