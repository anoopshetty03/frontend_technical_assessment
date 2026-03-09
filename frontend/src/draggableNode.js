// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "80px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        backgroundColor: "#e9ecef",
        color: "#495057",
        border: "1px solid #dee2e6",
        justifyContent: "center",
        flexDirection: "column",
        fontWeight: "500",
      }}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
