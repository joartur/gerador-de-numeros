<<<<<<< HEAD
// src/app/components/StartButtons.tsx
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
=======
interface StartButtonsProps {
  onManual: () => void;
  onAuto: () => void;
}

export default function StartButtons({ onManual, onAuto }: StartButtonsProps) {
  return (
    <div
      className="gn-start-buttons"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        margin: "54px 0 40px 0",
        width: "100%",
      }}
    >
      <button
        type="button"
        className="gn-start-btn"
        style={{
          padding: "1.2rem 0",
          background: "linear-gradient(90deg,#3b82f6 0%, #06b6d4 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          fontSize: 22,
          fontWeight: 700,
          cursor: "pointer",
          width: 300,
          maxWidth: "100%",
          boxShadow: "0 2px 12px #0001",
          letterSpacing: "0.5px",
          transition: "background 0.2s",
        }}
        onClick={onManual}
      >
        Sortear Manualmente
      </button>
      <button
        type="button"
        className="gn-start-btn"
        style={{
          padding: "1.2rem 0",
          background: "linear-gradient(90deg,#22d3ee 0%, #3b82f6 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          fontSize: 22,
          fontWeight: 700,
          cursor: "pointer",
          width: 300,
          maxWidth: "100%",
          boxShadow: "0 2px 12px #0001",
          letterSpacing: "0.5px",
          transition: "background 0.2s",
        }}
        onClick={onAuto}
      >
        Sortear Automaticamente
      </button>
      <style>{`
        @media (min-width: 1200px) {
          .gn-start-buttons {
            flex-direction: row !important;
            justify-content: center;
            align-items: stretch;
            gap: 40px;
            margin: 54px 0 48px 0;
          }
          .gn-start-btn {
            width: 320px !important;
            max-width: 100%;
          }
        }
      `}</style>
>>>>>>> 7c6e76a5274a62d799b2494a48f89bafe1915d93
    </div>
  );
}