// src/app/components/BingoCardsPrint.tsx
import PrintableBingoCard from "./PrintableBingoCard";

interface BingoCardsPrintProps {
  cards: number[][];
  onPrint: () => void;
  onRegenerate: () => void;
}

export default function BingoCardsPrint({ cards, onPrint, onRegenerate }: BingoCardsPrintProps) {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#244466",
            margin: 0,
          }}
        >
          Cartelas Geradas ({cards.length})
        </h3>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={onRegenerate}
            style={{
              padding: "0.5rem 1rem",
              background: "#6b7280",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Regenerar Cartelas
          </button>
          <button
            onClick={onPrint}
            style={{
              padding: "0.5rem 1rem",
              background: "#3b82f6",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🖨️ Imprimir / Salvar PDF
          </button>
        </div>
      </div>
      
      <div
        className="print-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "1.5rem",
          maxHeight: "600px",
          overflowY: "auto",
          padding: "0.5rem",
        }}
      >
        {cards.map((cardNumbers, idx) => (
          <PrintableBingoCard
            key={idx}
            numbers={cardNumbers}
            cardId={idx}
          />
        ))}
      </div>
      
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .printable-card {
            break-inside: avoid;
            page-break-inside: avoid;
            box-shadow: none;
            border: 1px solid #ddd;
          }
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}