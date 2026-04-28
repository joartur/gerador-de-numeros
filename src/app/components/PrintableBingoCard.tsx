// src/app/components/PrintableBingoCard.tsx
interface PrintableBingoCardProps {
  numbers: number[];
  cardId: number;
  title?: string;
}

export default function PrintableBingoCard({ numbers, cardId, title = "BINGO" }: PrintableBingoCardProps) {
  // Gera números baseados no padrão BINGO:
  // B: 1-15, I: 16-30, N: 31-45, G: 46-60, O: 61-75
  const generateNumberForColumn = (column: string, availableNumbers: number[]) => {
    let range: [number, number];
    switch(column) {
      case 'B': range = [1, 15]; break;
      case 'I': range = [16, 30]; break;
      case 'N': range = [31, 45]; break;
      case 'G': range = [46, 60]; break;
      case 'O': range = [61, 75]; break;
      default: range = [1, 75];
    }
    
    // Filtra números disponíveis que estão no range
    const numbersInRange = availableNumbers.filter(n => n >= range[0] && n <= range[1]);
    if (numbersInRange.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * numbersInRange.length);
    return numbersInRange[randomIndex];
  };
  
  // Organiza os números na grade 5x5 seguindo o padrão BINGO
  const grid: (number | null)[][] = Array(5).fill(null).map(() => Array(5).fill(null));
  const columns = ['B', 'I', 'N', 'G', 'O'];
  
  // Para cada coluna, seleciona números aleatórios
  for (let col = 0; col < 5; col++) {
    const columnLetter = columns[col];
    const numbersForColumn: number[] = [];
    
    // Seleciona 5 números para cada coluna (exceto coluna N que tem espaço livre no centro)
    const numbersNeeded = (columnLetter === 'N' && cardId === 0) ? 4 : 5;
    
    // Pega os números disponíveis para esta coluna
    const availableForColumn = numbers.filter(n => {
      if (columnLetter === 'B') return n >= 1 && n <= 15;
      if (columnLetter === 'I') return n >= 16 && n <= 30;
      if (columnLetter === 'N') return n >= 31 && n <= 45;
      if (columnLetter === 'G') return n >= 46 && n <= 60;
      if (columnLetter === 'O') return n >= 61 && n <= 75;
      return false;
    });
    
    // Embaralha e seleciona os números
    const shuffled = [...availableForColumn];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    for (let row = 0; row < 5; row++) {
      if (columnLetter === 'N' && row === 2 && cardId === 0) {
        grid[row][col] = null; // Espaço livre
      } else if (row < shuffled.length) {
        grid[row][col] = shuffled[row];
      } else {
        // Se não tiver números suficientes, gera um aleatório no range
        const range = columnLetter === 'B' ? [1,15] : columnLetter === 'I' ? [16,30] : 
                      columnLetter === 'N' ? [31,45] : columnLetter === 'G' ? [46,60] : [61,75];
        const randomNum = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        grid[row][col] = randomNum;
      }
    }
  }

  return (
    <div
      className="printable-card"
      style={{
        border: "2px solid #244466",
        borderRadius: 12,
        padding: "1rem",
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        breakInside: "avoid",
        pageBreakInside: "avoid",
        width: "100%",
        maxWidth: 450,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "0.75rem",
          borderBottom: "2px solid #244466",
          paddingBottom: "0.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#ef4444",
            letterSpacing: "8px",
            margin: 0,
          }}
        >
          {title}
        </h2>
        <div
          style={{
            fontSize: "0.8rem",
            color: "#6b7280",
            marginTop: "4px",
          }}
        >
          Cartela #{cardId + 1}
        </div>
      </div>
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "6px",
          backgroundColor: "#f0f2f5",
          padding: "8px",
          borderRadius: 8,
        }}
      >
        {/* Cabeçalho das letras do Bingo */}
        {columns.map((letter, idx) => (
          <div
            key={`letter-${idx}`}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "#ef4444",
              padding: "8px 4px",
            }}
          >
            {letter}
            <div style={{ fontSize: "0.7rem", color: "#9ca3af", fontWeight: "normal" }}>
              {letter === 'B' && '1-15'}
              {letter === 'I' && '16-30'}
              {letter === 'N' && '31-45'}
              {letter === 'G' && '46-60'}
              {letter === 'O' && '61-75'}
            </div>
          </div>
        ))}
        
        {/* Grade de números */}
        {Array(5).fill(null).map((_, row) => (
          columns.map((_, col) => {
            const num = grid[row][col];
            const isFreeSpace = (col === 2 && row === 2 && cardId === 0);
            return (
              <div
                key={`${row}-${col}`}
                style={{
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isFreeSpace ? "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)" : "#ffffff",
                  border: isFreeSpace ? "2px solid #f59e0b" : "1px solid #dde6f1",
                  borderRadius: 8,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: isFreeSpace ? "#92400e" : "#244466",
                  position: "relative",
                }}
              >
                {isFreeSpace ? "★" : num}
                {!isFreeSpace && Math.random() > 0.7 && (
                  <span style={{
                    position: "absolute",
                    fontSize: "0.6rem",
                    opacity: 0.3,
                    bottom: 2,
                    right: 4,
                  }}>★</span>
                )}
              </div>
            );
          })
        ))}
      </div>
      
      <div
        style={{
          marginTop: "0.75rem",
          fontSize: "0.7rem",
          color: "#9ca3af",
          textAlign: "center",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "0.5rem",
        }}
      >
        ✨ Use para marcar os números sorteados ✨
      </div>
    </div>
  );
}