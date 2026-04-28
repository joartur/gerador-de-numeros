// src/app/components/BingoDrawNumbers.tsx
interface BingoDrawNumbersProps {
  calledNumbers: number[];
}

export default function BingoDrawNumbers({ calledNumbers }: BingoDrawNumbersProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: "1.5rem",
        marginTop: "1.5rem",
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
        Números Sorteados
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
          maxHeight: 200,
          overflowY: "auto",
        }}
      >
        {calledNumbers.map((num, idx) => (
          <div
            key={idx}
            style={{
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: 12,
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}