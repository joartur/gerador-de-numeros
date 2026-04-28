interface StartButtonsProps {
  onManual: () => void;
  onAuto: () => void;
  onBingo: () => void;
}

export default function StartButtons({ onManual, onAuto, onBingo }: StartButtonsProps) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      width: "100%",
      maxWidth: "100%",
      padding: "0 1rem",
      boxSizing: "border-box",
    }}>
      <button
        onClick={onManual}
        style={{
          width: "100%",
          padding: "1rem",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "1.125rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        }}
      >
        🎲 Modo Manual
      </button>
      <button
        onClick={onAuto}
        style={{
          width: "100%",
          padding: "1rem",
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "1.125rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        }}
      >
        🤖 Modo Automático
      </button>
      <button
        onClick={onBingo}
        style={{
          width: "100%",
          padding: "1rem",
          backgroundColor: "#f59e0b",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "1.125rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        }}
      >
        🎯 Modo BINGO
      </button>
    </div>
  );
}