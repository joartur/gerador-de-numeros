interface SortedGridProps {
  history: number[];
}
export default function SortedGrid({ history }: SortedGridProps) {
  const sortedRestHistory = history.slice(1).sort((a, b) => a - b);
  return (
    <div
      className="gn-grid"
      style={{
        minHeight: 56,
        maxHeight: 220,
        overflowY: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
        gap: 10,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {history.length <= 1 && (
        <span
          style={{
            color: "#8796ac",
            fontSize: 15,
            gridColumn: "1/-1",
            textAlign: "center",
          }}
        >
          Nenhum número anterior sorteado.
        </span>
      )}
      {sortedRestHistory.map((num, idx) => (
        <div
          key={idx}
          style={{
            background: "#f1f7ff",
            color: "#244466",
            borderRadius: 8,
            boxShadow: "0 1px 4px #0001",
            padding: "0.7rem 0",
            fontSize: 20,
            fontWeight: 700,
            textAlign: "center",
            animation: "fadeIn 0.4s",
          }}
        >
          {num}
        </div>
      ))}
    </div>
  );
}
