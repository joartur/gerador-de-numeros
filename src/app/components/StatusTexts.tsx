interface StatusTextsProps {
  sortedCount: number;
  allSorted: boolean;
  totalNumbers: number;
  remainingCount: number;
}
export default function StatusTexts({ sortedCount, allSorted, totalNumbers, remainingCount }: StatusTextsProps) {
  return (
    <>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 500,
          margin: "8px 0 12px 0",
          color: "#244466",
          textAlign: "center",
          letterSpacing: "0.1px",
        }}
      >
        Foram sorteados {sortedCount} {sortedCount === 1 ? "número" : "números"}
      </h2>
      {allSorted && (
        <div style={{
          marginTop: 22,
          color: "#10b981",
          fontWeight: 600,
          textAlign: "center",
          fontSize: 18,
          letterSpacing: "0.3px",
        }}>
          Todos os números já foram sorteados
        </div>
      )}
      {totalNumbers > 0 && !allSorted && (
        <div style={{
          marginTop: 18,
          color: "#244466",
          fontWeight: 500,
          textAlign: "center",
          fontSize: 16,
          letterSpacing: "0.1px",
        }}>
          Faltam {remainingCount} {remainingCount === 1 ? "número" : "números"} serem sorteados
        </div>
      )}
    </>
  );
}
