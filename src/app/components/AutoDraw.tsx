import LastNumber from "./LastNumber";
import SortedGrid from "./SortedGrid";
import StatusTexts from "./StatusTexts";

interface AutoDrawProps {
  min: number;
  max: number;
  inputMin: string;
  inputMax: string;
  onChangeMin: (v: string) => void;
  onChangeMax: (v: string) => void;
  onBlurMin: () => void;
  onBlurMax: () => void;
  onKeyDownMin: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDownMax: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  history: number[];
  error: string;
  autoRunning: boolean;
  autoPaused: boolean;
  onStart: () => void;
  onPauseResume: () => void;
  onStop: () => void;
  allSorted: boolean;
  totalNumbers: number;
  sortedCount: number;
  remainingCount: number;
  inputTotal: string;
  onChangeTotal: (v: string) => void;
}

export default function AutoDraw(props: AutoDrawProps) {
  const {
    min, max, inputMin, inputMax, onChangeMin, onChangeMax, onBlurMin, onBlurMax,
    onKeyDownMin, onKeyDownMax, history, error, autoRunning, autoPaused, onStart, onPauseResume,
    onStop, allSorted, totalNumbers, sortedCount, remainingCount, inputTotal, onChangeTotal
  } = props;

  return (
    <>
      {/* Inputs para range e quantidade desejada */}
      <form
        onSubmit={e => {
          e.preventDefault();
          onStart();
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="min-auto" style={{ fontSize: 13, color: "#244466", fontWeight: 500 }}>
              De
            </label>
            <input
              id="min-auto"
              type="number"
              value={inputMin}
              min={-99999}
              max={max}
              onChange={e => onChangeMin(e.target.value)}
              onBlur={onBlurMin}
              onKeyDown={onKeyDownMin}
              style={{
                marginTop: 4,
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #dde6f1",
                borderRadius: 6,
                fontSize: 16,
                boxShadow: "0 1px 2px #0001",
                outline: "none",
                transition: "border 0.2s",
              }}
              disabled={autoRunning}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="max-auto" style={{ fontSize: 13, color: "#244466", fontWeight: 500 }}>
              Até
            </label>
            <input
              id="max-auto"
              type="number"
              value={inputMax}
              min={min}
              max={99999}
              onChange={e => onChangeMax(e.target.value)}
              onBlur={onBlurMax}
              onKeyDown={onKeyDownMax}
              style={{
                marginTop: 4,
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #dde6f1",
                borderRadius: 6,
                fontSize: 16,
                boxShadow: "0 1px 2px #0001",
                outline: "none",
                transition: "border 0.2s",
              }}
              disabled={autoRunning}
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="total-auto" style={{ fontSize: 13, color: "#244466", fontWeight: 500 }}>
            Quantidade de números a sortear
          </label>
          <input
            id="total-auto"
            type="number"
            value={inputTotal}
            min={1}
            max={max - min + 1}
            onChange={e => onChangeTotal(e.target.value)}
            style={{
              marginTop: 4,
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #dde6f1",
              borderRadius: 6,
              fontSize: 16,
              boxShadow: "0 1px 2px #0001",
              outline: "none",
              transition: "border 0.2s",
            }}
            disabled={autoRunning}
          />
        </div>
        <button
          type="submit"
          disabled={autoRunning || min > max || Number(inputTotal) < 1 || Number(inputTotal) > (max - min + 1)}
          style={{
            marginTop: 10,
            padding: "0.7rem 0",
            background:
              autoRunning || min > max || Number(inputTotal) < 1 || Number(inputTotal) > (max - min + 1)
                ? "#cccccc"
                : "linear-gradient(90deg,#22d3ee 0%, #3b82f6 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 600,
            cursor: autoRunning || min > max || Number(inputTotal) < 1 || Number(inputTotal) > (max - min + 1)
              ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px #0002",
            transition: "background 0.2s",
            letterSpacing: "0.5px",
            width: "100%",
          }}
        >
          Iniciar Sorteio Automático
        </button>
        {error && (
          <span
            style={{
              color: "#ef4444",
              fontSize: 14,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            {error}
          </span>
        )}
      </form>
      {autoRunning && (
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
              background: autoPaused
                ? "linear-gradient(90deg,#22c55e 0%, #3b82f6 100%)"
                : "linear-gradient(90deg,#f59e42 0%, #fb7185 100%)",
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
            {autoPaused ? "Retomar" : "Pausar"}
          </button>
          <button
            type="button"
            onClick={onStop}
            style={{
              padding: "0.5rem 1.2rem",
              background: "linear-gradient(90deg,#ef4444 0%, #f59e42 100%)",
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
      )}
      <LastNumber number={history[0]} />
      <StatusTexts
        sortedCount={sortedCount}
        allSorted={allSorted}
        totalNumbers={totalNumbers}
        remainingCount={remainingCount}
      />
      <SortedGrid history={history} />
    </>
  );
}