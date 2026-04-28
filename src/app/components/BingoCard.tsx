// src/app/components/BingoCard.tsx
import { useState, useEffect } from "react";

interface BingoCardProps {
  numbers: number[];
  cardId: number;
  calledNumbers: number[];
  onBingo?: (cardId: number) => void;
}

export default function BingoCard({ numbers, cardId, calledNumbers, onBingo }: BingoCardProps) {
  const [hasBingo, setHasBingo] = useState(false);

  useEffect(() => {
    // Verifica se todos os números da cartela já foram chamados
    const allNumbersCalled = numbers.every(num => calledNumbers.includes(num));
    if (allNumbersCalled && !hasBingo && onBingo) {
      setHasBingo(true);
      onBingo(cardId);
    }
  }, [calledNumbers, numbers, hasBingo, onBingo, cardId]);

  const isNumberCalled = (num: number) => calledNumbers.includes(num);

  // Formata a cartela em uma grade (5x5 para Bingo tradicional)
  // Mas ajustável baseado na quantidade de números
  const gridSize = Math.ceil(Math.sqrt(numbers.length));
  const grid = [];
  for (let i = 0; i < gridSize; i++) {
    const row = [];
    for (let j = 0; j < gridSize; j++) {
      const index = i * gridSize + j;
      if (index < numbers.length) {
        row.push(numbers[index]);
      } else {
        row.push(null);
      }
    }
    grid.push(row);
  }

  return (
    <div
      style={{
        border: hasBingo ? "3px solid #ffd700" : "2px solid #dde6f1",
        borderRadius: 12,
        padding: "1rem",
        background: hasBingo ? "linear-gradient(135deg, #fff9e6 0%, #fff3cc 100%)" : "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        position: "relative",
      }}
    >
      {hasBingo && (
        <div
          style={{
            position: "absolute",
            top: -12,
            right: -12,
            background: "#ffd700",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transform: "rotate(15deg)",
          }}
        >
          🎉
        </div>
      )}
      <h3
        style={{
          textAlign: "center",
          marginBottom: "0.75rem",
          fontSize: "1.1rem",
          color: "#244466",
          fontWeight: 600,
        }}
      >
        Cartela {cardId + 1}
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: "4px",
          backgroundColor: "#f0f2f5",
          padding: "4px",
          borderRadius: 8,
        }}
      >
        {grid.map((row, i) =>
          row.map((num, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: num && isNumberCalled(num) ? "#22c55e" : "#ffffff",
                color: num && isNumberCalled(num) ? "#ffffff" : "#333333",
                fontWeight: "bold",
                fontSize: "0.875rem",
                borderRadius: 6,
                transition: "all 0.2s ease",
                border: num && isNumberCalled(num) ? "1px solid #16a34a" : "1px solid #dde6f1",
                boxShadow: num && isNumberCalled(num) ? "0 2px 4px rgba(34,197,94,0.3)" : "none",
              }}
            >
              {num || " "}
            </div>
          ))
        )}
      </div>
      <div
        style={{
          marginTop: "0.75rem",
          fontSize: "0.75rem",
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        Progresso: {numbers.filter(n => calledNumbers.includes(n)).length}/{numbers.length}
      </div>
    </div>
  );
}