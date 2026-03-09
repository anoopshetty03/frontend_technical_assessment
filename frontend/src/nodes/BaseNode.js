// BaseNode.js - Abstraction for creating reusable node components

import React, { useState } from "react";
import { Handle, Position } from "reactflow";

/**
 * Configuration object structure for nodes:
 * {
 *   title: string - Display title of the node
 *   width: number - Custom width (default: 200)
 *   height: number - Custom height (default: 80)
 *   fields: Array<{
 *     key: string - State key
 *     label: string - Display label
 *     type: 'text' | 'select' | 'textarea' - Input type
 *     default: any - Default value
 *     options?: Array<{label, value}> - For select fields
 *   }>
 *   handles: Array<{
 *     id: string - Handle ID (appended to node id)
 *     type: 'source' | 'target' - Handle type
 *     position: Position enum - Handle position
 *     label?: string - Optional label
 *     top?: number - Optional custom vertical position
 *   }>
 *   color?: string - Background color
 *   description?: string - Optional description text
 * }
 */

/**
 * Creates a node component from a configuration object
 * @param {Object} config - Node configuration
 * @returns {React.Component} - A node component
 */
export const createNode = (config) => {
  return ({ id, data }) => {
    const [fieldValues, setFieldValues] = useState(() => {
      const initial = {};
      config.fields?.forEach((field) => {
        initial[field.key] = data?.[field.key] ?? field.default ?? "";
      });
      return initial;
    });

    const handleFieldChange = (key, value) => {
      setFieldValues((prev) => ({ ...prev, [key]: value }));
    };

    const width = config.width || 200;
    const height = config.height || 80;
    const bgColor = config.color || "#ffffff";

    return (
      <div
        style={{
          width,
          height,
          border: "1px solid black",
          backgroundColor: bgColor,
          borderRadius: "4px",
          padding: "8px",
          fontSize: "12px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title */}
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
          {config.title}
        </div>

        {/* Description */}
        {config.description && (
          <div style={{ fontSize: "10px", color: "#666", marginBottom: "4px" }}>
            {config.description}
          </div>
        )}

        {/* Fields */}
        {config.fields && config.fields.length > 0 && (
          <div style={{ flex: 1, overflow: "auto" }}>
            {config.fields.map((field) => (
              <FormField
                key={field.key}
                field={field}
                value={fieldValues[field.key]}
                onChange={(value) => handleFieldChange(field.key, value)}
              />
            ))}
          </div>
        )}

        {/* Input Handles (targets) */}
        {config.handles
          ?.filter((h) => h.type === "target")
          .map((handle) => (
            <Handle
              key={`${id}-${handle.id}`}
              type="target"
              position={handle.position}
              id={`${id}-${handle.id}`}
              style={handle.top !== undefined ? { top: `${handle.top}%` } : {}}
            />
          ))}

        {/* Output Handles (sources) */}
        {config.handles
          ?.filter((h) => h.type === "source")
          .map((handle) => (
            <Handle
              key={`${id}-${handle.id}`}
              type="source"
              position={handle.position}
              id={`${id}-${handle.id}`}
              style={handle.top !== undefined ? { top: `${handle.top}%` } : {}}
            />
          ))}
      </div>
    );
  };
};

/**
 * Reusable form field component
 */
const FormField = ({ field, value, onChange }) => {
  switch (field.type) {
    case "text":
      return (
        <div style={{ marginBottom: "4px" }}>
          <label>
            {field.label}:{" "}
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              style={{ width: "100px" }}
            />
          </label>
        </div>
      );

    case "textarea":
      return (
        <div style={{ marginBottom: "4px" }}>
          <label>
            {field.label}:{" "}
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              style={{ width: "100%", height: "40px", fontSize: "10px" }}
              rows="2"
            />
          </label>
        </div>
      );

    case "select":
      return (
        <div style={{ marginBottom: "4px" }}>
          <label>
            {field.label}:{" "}
            <select value={value} onChange={(e) => onChange(e.target.value)}>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      );

    case "number":
      return (
        <div style={{ marginBottom: "4px" }}>
          <label>
            {field.label}:{" "}
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              style={{ width: "60px" }}
            />
          </label>
        </div>
      );

    default:
      return null;
  }
};
