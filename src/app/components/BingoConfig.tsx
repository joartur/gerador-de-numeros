// src/app/components/BingoConfig.tsx
interface BingoConfigProps {
  numberOfCards: number;
  setNumberOfCards: (value: number) => void;
  numbersPerCard: number;
  setNumbersPerCard: (value: number) => void;
  minNumber: number;
  setMinNumber: (value: number) => void;
  maxNumber: number;
  setMaxNumber: (value: number) => void;
  onGenerate: () => void;
  error?: string;
}

export default function BingoConfig({
  numberOfCards,
  setNumberOfCards,
  numbersPerCard,
  setNumbersPerCard,
  minNumber,
  setMinNumber,
  maxNumber,
  setMaxNumber,
  onGenerate,
  error,
}: BingoConfigProps) {
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
        Configuração do Bingo
      </h3>
      
      <div style={{ marginBottom: "1rem", padding: "0.75rem", background: "#fef3c7", borderRadius: 8 }}>
        <p style={{ fontSize: "0.875rem", color: "#92400e", margin: 0 }}>
          💡 As cartelas serão geradas para impressão. O sistema controlará apenas os números sorteados 
          para determinar as cartelas vencedoras internamente.
        </p>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ fontSize: 13, color: "#244466", fontWeight: 500 }}>
            Quantidade de Cartelas para Gerar
          </label>
          <input
            type="number"
            value={numberOfCards}
            onChange={(e) => setNumberOfCards(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
            min={1}
            max={50}
            style={{
              marginTop: 4,
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #dde6f1",
              borderRadius: 6,
              fontSize: 16,
            }}
          />
          <span style={{ fontSize: 12, color: "#6b7280" }}>Máximo 50 cartelas</span>
        </div>
        
        <div>
          <label style={{ fontSize: 13, color: "#244466", fontWeight: 500 }}>
            Números por Cartela (1-75)
          </label>
          <input
            type="number"
            value={numbersPerCard}
            onChange={(e) => setNumbersPerCard(Math.max(1, Math.min(75, parseInt(e.target.value) || 1)))}
            min={1}
            max={75}
            style={{
              marginTop: 4,
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #dde6f1",
              borderRadius: 6,
              fontSize: 16,
            }}
          />
          <span style={{ fontSize: 12, color: "#6b7280" }}>
            Padrão: 75 números por cartela | Mínimo: 1 | Máximo: 75
          </span>
        </div>
        
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, color: "#244466", fontWeight: 500 }}>
              Número Mínimo
            </label>
            <input
              type="number"
              value={minNumber}
              onChange={(e) => setMinNumber(parseInt(e.target.value) || 1)}
              style={{
                marginTop: 4,
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #dde6f1",
                borderRadius: 6,
                fontSize: 16,
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, color: "#244466", fontWeight: 500 }}>
              Número Máximo
            </label>
            <input
              type="number"
              value={maxNumber}
              onChange={(e) => setMaxNumber(parseInt(e.target.value) || 75)}
              style={{
                marginTop: 4,
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #dde6f1",
                borderRadius: 6,
                fontSize: 16,
              }}
            />
          </div>
        </div>
        
        {error && (
          <span
            style={{
              color: "#ef4444",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            {error}
          </span>
        )}
        
        <button
          onClick={onGenerate}
          style={{
            padding: "0.7rem 0",
            background: "linear-gradient(90deg,#f59e0b 0%, #ef4444 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px #0002",
            transition: "background 0.2s",
          }}
        >
          Gerar Cartelas para Impressão
        </button>
      </div>
    </div>
  );
}