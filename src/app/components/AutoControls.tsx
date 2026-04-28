interface AutoControlsProps {
  autoRunning: boolean;
  onPauseResume: () => void;
  onStop: () => void;
}
export default function AutoControls({ autoRunning, onPauseResume, onStop }: AutoControlsProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 14,
        margin: "16px 0",
      }}
    >
      <button
        type="button"
        onClick={onPauseResume}
        style={{
          padding: "0.5rem 1.2rem",
          background: autoRunning
            ? "linear-gradient(90deg,#f59e42 0%, #fb7185 100%)"
            : "linear-gradient(90deg,#22c55e 0%, #3b82f6 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 2px 8px #0002",
          transition: "background 0.2s",
          letterSpacing: "0.3px",
        }}
      >
        {autoRunning ? "Pausar" : "Retomar"}
      </button>
      <button
        type="button"
        onClick={onStop}
        style={{
          padding: "0.5rem 1.2rem",
          background:
            "linear-gradient(90deg,#ef4444 0%, #f59e42 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 2px 8px #0002",
          transition: "background 0.2s",
          letterSpacing: "0.3px",
        }}
      >
        Parar
      </button>
    </div>
  );
}