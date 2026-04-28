// src/app/components/BingoDraw.tsx
import LastNumber from "./LastNumber";
import StatusTexts from "./StatusTexts";

interface BingoDrawProps {
  min: number;
  max: number;
  history: number[];
  error: string;
  autoRunning: boolean;
  autoPaused: boolean;
  onStart: () => void;
  onDraw: () => void;
  onPauseResume: () => void;
  onStop: () => void;
  allSorted: boolean;
  totalNumbers: number;
  sortedCount: number;
  remainingCount: number;
  winners: number[];
}

export default function BingoDraw(props: BingoDrawProps) {
  const {
    min,
    max,
    history,
    error,
    autoRunning,
    autoPaused,
    onStart,
    onDraw,
    onPauseResume,
    onStop,
    allSorted,
    totalNumbers,
    sortedCount,
    remainingCount,
    winners,
  } = props;

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: "1.5rem",
        marginBottom: "1.5rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "#244466",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Sorteio Bingo
      </h3>
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontSize: 14, color: "#6b7280" }}>
            Faixa: {min} - {max}
          </span>
          <span style={{ fontSize: 14, color: "#6b7280" }}>
            Total de números: {totalNumbers}
          </span>
        </div>
      </div>
      {!autoRunning && history.length === 0 && (
        <button
          onClick={onStart}
          disabled={min > max}
          style={{
            width: "100%",
            padding: "0.7rem 0",
            background: min > max ? "#cccccc" : "linear-gradient(90deg,#f59e0b 0%, #ef4444 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 600,
            cursor: min > max ? "not-allowed" : "pointer",
            marginBottom: "1rem",
          }}
        >
          Iniciar Sorteio Bingo
        </button>
      )}
      {autoRunning && (
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={onDraw}
            disabled={allSorted}
            style={{
              flex: 2,
              padding: "0.7rem 0",
              background: allSorted ? "#cccccc" : "linear-gradient(90deg,#22c55e 0%, #3b82f6 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: allSorted ? "not-allowed" : "pointer",
            }}
          >
            Sortear Número
          </button>
          <button
            onClick={onPauseResume}
            style={{
              flex: 1,
              padding: "0.7rem 0",
              background: autoPaused
                ? "linear-gradient(90deg,#22c55e 0%, #3b82f6 100%)"
                : "linear-gradient(90deg,#f59e42 0%, #fb7185 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {autoPaused ? "Retomar" : "Pausar"}
          </button>
          <button
            onClick={onStop}
            style={{
              flex: 1,
              padding: "0.7rem 0",
              background: "linear-gradient(90deg,#ef4444 0%, #f59e42 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Parar
          </button>
        </div>
      )}
      {error && (
        <span
          style={{
            color: "#ef4444",
            fontSize: 14,
            textAlign: "center",
            display: "block",
            marginBottom: "1rem",
          }}
        >
          {error}
        </span>
      )}
      <LastNumber number={history[0]} />
      <StatusTexts
        sortedCount={sortedCount}
        allSorted={allSorted}
        totalNumbers={totalNumbers}
        remainingCount={remainingCount}
      />
      {winners.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "linear-gradient(135deg, #ffd70020 0%, #ffedcc20 100%)",
            borderRadius: 8,
            border: "2px solid #ffd700",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: 20, marginRight: 8 }}>🏆</span>
          <strong style={{ color: "#f59e0b", fontSize: "1.1rem" }}>
            Cartela(s) Vencedora(s):
          </strong>
          <span style={{ marginLeft: 8, fontWeight: 600 }}>
            {winners.map(w => `Cartela ${w + 1}`).join(", ")}
          </span>
        </div>
      )}
    </div>
  );
}