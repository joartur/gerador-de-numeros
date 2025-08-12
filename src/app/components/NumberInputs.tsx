interface NumberInputsProps {
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
  autoMode: boolean;
  onGenerate: () => void;
  manualMode: boolean;
  onAutoStart: () => void;
  error?: string;
  disabled: boolean;
  allSorted: boolean;
  totalNumbers: number;
}

export default function NumberInputs(props: NumberInputsProps) {
  const {
    min, max, inputMin, inputMax, onChangeMin, onChangeMax, onBlurMin, onBlurMax,
    onKeyDownMin, onKeyDownMax, autoMode, onGenerate, manualMode, onAutoStart,
    error, disabled, allSorted, totalNumbers,
  } = props;
  return (
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
            disabled={autoMode}
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
            disabled={autoMode}
          />
        </div>
      </div>
      <div className="gn-buttons-row">
        <button
          type="submit"
          disabled={disabled}
          style={{
            marginTop: 10,
            padding: "0.7rem 0",
            background:
              disabled
                ? "#cccccc"
                : "linear-gradient(90deg,#3b82f6 0%, #06b6d4 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 600,
            cursor: disabled ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px #0002",
            transition: "background 0.2s",
            letterSpacing: "0.5px",
            width: "100%",
          }}
        >
          Sortear
        </button>
        {/* Botão Sortear Automaticamente (oculto em modo manual) */}
        {!manualMode && (
          <button
            type="button"
            onClick={onAutoStart}
            disabled={disabled}
            style={{
              marginTop: 10,
              padding: "0.7rem 0",
              background:
                disabled
                  ? "#cccccc"
                  : "linear-gradient(90deg,#22d3ee 0%, #3b82f6 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 600,
              cursor: disabled ? "not-allowed" : "pointer",
              boxShadow: "0 2px 8px #0002",
              transition: "background 0.2s",
              letterSpacing: "0.5px",
              width: "100%",
            }}
          >
            Sortear Automaticamente
          </button>
        )}
      </div>
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
  );
}