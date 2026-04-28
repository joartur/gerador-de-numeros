// src/app/components/BingoGame.tsx (
import { useState } from "react";
import BingoConfig from "./BingoConfig";
import BingoCardsPrint from "./BingoCardsPrint";
import BingoFullScreen from "./BingoFullScreen";
import { useTheme } from "../contexts/ThemeContext";

interface BingoGameProps {
  onBack: () => void;
}

export default function BingoGame({ onBack }: BingoGameProps) {
  const { theme } = useTheme();
  const [cards, setCards] = useState<number[][]>([]);
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(75);
  const [numberOfCards, setNumberOfCards] = useState<number>(10);
  const [numbersPerCard, setNumbersPerCard] = useState<number>(15);
  const [error, setError] = useState<string>("");
  const [showSorteio, setShowSorteio] = useState<boolean>(false);

  const isDark = theme === 'dark';
  const textColor = isDark ? "#fff" : "#244466";

  // Gera cartelas baseadas no padrão BINGO
  const generateCards = () => {
    setError("");
    
    if (min >= max) {
      setError("O valor mínimo deve ser menor que o máximo");
      return;
    }
    
    if (numbersPerCard > 75) {
      setError(`O máximo de números por cartela é 75 (padrão BINGO)`);
      return;
    }
    
    if (min < 1 || max > 75) {
      setError("Para o modo BINGO, os números devem estar entre 1 e 75");
      return;
    }
    
    const newCards: number[][] = [];
    
    for (let i = 0; i < numberOfCards; i++) {
      const cardNumbers: number[] = [];
      const numbersPerColumn = Math.ceil(numbersPerCard / 5);
      
      const bNumbers = Array.from({ length: 15 }, (_, i) => i + 1);
      const iNumbers = Array.from({ length: 15 }, (_, i) => i + 16);
      const nNumbers = Array.from({ length: 15 }, (_, i) => i + 31);
      const gNumbers = Array.from({ length: 15 }, (_, i) => i + 46);
      const oNumbers = Array.from({ length: 15 }, (_, i) => i + 61);
      
      const shuffle = (arr: number[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      };
      
      const shuffledB = shuffle([...bNumbers]);
      const shuffledI = shuffle([...iNumbers]);
      const shuffledN = shuffle([...nNumbers]);
      const shuffledG = shuffle([...gNumbers]);
      const shuffledO = shuffle([...oNumbers]);
      
      const selectedB = shuffledB.slice(0, numbersPerColumn);
      const selectedI = shuffledI.slice(0, numbersPerColumn);
      const selectedN = shuffledN.slice(0, numbersPerColumn);
      const selectedG = shuffledG.slice(0, numbersPerColumn);
      const selectedO = shuffledO.slice(0, numbersPerColumn);
      
      cardNumbers.push(...selectedB, ...selectedI, ...selectedN, ...selectedG, ...selectedO);
      
      if (cardNumbers.length > numbersPerCard) {
        cardNumbers.length = numbersPerCard;
      }
      
      while (cardNumbers.length < numbersPerCard) {
        const randomCol = Math.floor(Math.random() * 5);
        let randomNum;
        if (randomCol === 0) randomNum = Math.floor(Math.random() * 15) + 1;
        else if (randomCol === 1) randomNum = Math.floor(Math.random() * 15) + 16;
        else if (randomCol === 2) randomNum = Math.floor(Math.random() * 15) + 31;
        else if (randomCol === 3) randomNum = Math.floor(Math.random() * 15) + 46;
        else randomNum = Math.floor(Math.random() * 15) + 61;
        
        if (!cardNumbers.includes(randomNum)) {
          cardNumbers.push(randomNum);
        }
      }
      
      cardNumbers.sort((a, b) => a - b);
      newCards.push(cardNumbers);
    }
    
    setCards(newCards);
  };
  
  const handleRegenerate = () => {
    generateCards();
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleStartSorteio = () => {
    if (cards.length === 0) {
      setError("Gere as cartelas antes de iniciar o sorteio");
      return;
    }
    setShowSorteio(true);
  };
  
  if (showSorteio) {
    return (
      <BingoFullScreen
        min={min}
        max={max}
        cards={cards}
        onExit={() => setShowSorteio(false)}
      />
    );
  }
  
  return (
    <div>
      <BingoConfig
        numberOfCards={numberOfCards}
        setNumberOfCards={setNumberOfCards}
        numbersPerCard={numbersPerCard}
        setNumbersPerCard={setNumbersPerCard}
        minNumber={min}
        setMinNumber={setMin}
        maxNumber={max}
        setMaxNumber={setMax}
        onGenerate={generateCards}
        error={error}
      />
      
      {cards.length > 0 && (
        <>
          <BingoCardsPrint
            cards={cards}
            onPrint={handlePrint}
            onRegenerate={handleRegenerate}
          />
          
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <button
              onClick={handleStartSorteio}
              style={{
                padding: "1rem 2rem",
                background: "linear-gradient(90deg,#f59e0b 0%, #ef4444 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              🎲 INICIAR SORTEIO BINGO
            </button>
          </div>
        </>
      )}
      
      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <button
          onClick={onBack}
          style={{
            padding: "0.7rem 1.5rem",
            background: "#6b7280",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px #0002",
          }}
        >
          Voltar ao Menu Principal
        </button>
      </div>
    </div>
  );
}