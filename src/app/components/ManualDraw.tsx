import LastNumber from "./LastNumber";
import SortedGrid from "./SortedGrid";
import StatusTexts from "./StatusTexts";

interface ManualDrawProps {
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
  onGenerate: () => void;
  allSorted: boolean;
  totalNumbers: number;
  sortedCount: number;
  remainingCount: number;
}

export default function ManualDraw(props: ManualDrawProps) {
  const {
    min, max, inputMin, inputMax, onChangeMin, onChangeMax, onBlurMin, onBlurMax,
    onKeyDownMin, onKeyDownMax, history, error, onGenerate, allSorted, totalNumbers, sortedCount, remainingCount,
  } = props;

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          onGenerate();
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
            <label htmlFor="min" style={{ fontSize: 13, color: "#244466", fontWeight: 500 }}>
              De
            </label>
            <input
              id="min"
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
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="max" style={{ fontSize: 13, color: "#244466", fontWeight: 500 }}>
              Até
            </label>
            <input
              id="max"
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
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={min > max || allSorted || totalNumbers <= 0}
          style={{
            marginTop: 10,
            padding: "0.7rem 0",
            background:
              min > max || allSorted || totalNumbers <= 0
                ? "#cccccc"
                : "linear-gradient(90deg,#3b82f6 0%, #06b6d4 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 600,
            cursor: min > max || allSorted || totalNumbers <= 0 ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px #0002",
            transition: "background 0.2s",
            letterSpacing: "0.5px",
            width: "100%",
          }}
        >
          Sortear
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