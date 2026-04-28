// src/app/components/BingoCardsList.tsx
import BingoCard from "./BingoCard";

interface BingoCardsListProps {
  cards: number[][];
  calledNumbers: number[];
  winners: number[];
  onCardBingo: (cardId: number) => void;
}

export default function BingoCardsList({
  cards,
  calledNumbers,
  winners,
  onCardBingo,
}: BingoCardsListProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: "1.5rem",
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
        Cartelas de Bingo ({cards.length})
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {cards.map((cardNumbers, idx) => (
          <BingoCard
            key={idx}
            numbers={cardNumbers}
            cardId={idx}
            calledNumbers={calledNumbers}
            onBingo={onCardBingo}
          />
        ))}
      </div>
    </div>
  );
}