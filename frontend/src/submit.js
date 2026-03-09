// submit.js

export const SubmitButton = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "15px",
      }}
    >
      <button
        type="submit"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#0056b3";
          e.target.style.transform = "translateY(-1px)";
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#007bff";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        }}
        onFocus={(e) => {
          e.target.style.outline = "none";
          e.target.style.boxShadow = "0 0 0 3px rgba(0, 123, 255, 0.25)";
        }}
      >
        Submit
      </button>
    </div>
  );
};
