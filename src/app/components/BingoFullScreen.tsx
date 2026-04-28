// src/app/components/BingoFullScreen.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface BingoFullScreenProps {
  min: number;
  max: number;
  cards: number[][];
  onExit: () => void;
}

export default function BingoFullScreen({ min, max, cards, onExit }: BingoFullScreenProps) {
  const { theme, toggleTheme } = useTheme();
  const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  const [autoRunning, setAutoRunning] = useState<boolean>(true);
  const [autoPaused, setAutoPaused] = useState<boolean>(false);
  const [winners, setWinners] = useState<number[]>([]);
  const [nearWinners, setNearWinners] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const autoInterval = useRef<NodeJS.Timeout | null>(null);
  const isDrawing = useRef<boolean>(false);

  const isDark = theme === 'dark';

  // Verifica cartelas próximas de ganhar (faltando apenas 1 número)
  const checkNearWinners = useCallback((newCalledNumbers: number[]) => {
    const near: number[] = [];
    
    cards.forEach((card, cardId) => {
      if (!winners.includes(cardId)) {
        const missingNumbers = card.filter(num => !newCalledNumbers.includes(num));
        if (missingNumbers.length === 1) {
          near.push(cardId);
        }
      }
    });
    
    if (near.length > 0) {
      setNearWinners(near);
      
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const nearText = near.length === 1 
          ? `Atenção! Cartela ${near[0] + 1} está a apenas 1 número de completar o BINGO!`
          : `Atenção! Cartelas ${near.map(n => n + 1).join(", ")} estão a apenas 1 número de completar o BINGO!`;
        const utterance = new window.SpeechSynthesisUtterance(nearText);
        utterance.lang = "pt-BR";
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setNearWinners([]);
    }
  }, [cards, winners]);

  // Verifica se alguma cartela completou o Bingo
  const checkWinners = useCallback((newCalledNumbers: number[]) => {
    const newWinners: number[] = [];
    
    cards.forEach((card, cardId) => {
      if (!winners.includes(cardId)) {
        const allNumbersCalled = card.every(num => newCalledNumbers.includes(num));
        if (allNumbersCalled) {
          newWinners.push(cardId);
        }
      }
    });
    
    if (newWinners.length > 0) {
      setWinners(prev => [...prev, ...newWinners]);
      setAutoRunning(false);
      setAutoPaused(true);
      setGameFinished(true);
      setShowCelebration(true);
      
      if (autoInterval.current) {
        clearInterval(autoInterval.current);
        autoInterval.current = null;
      }
      
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const winnerText = newWinners.length === 1 
          ? `BINGO! BINGO! Cartela ${newWinners[0] + 1} é a grande vencedora! Parabéns!`
          : `BINGO! BINGO! Cartelas ${newWinners.map(w => w + 1).join(", ")} são as vencedoras! Parabéns!`;
        const utterance = new window.SpeechSynthesisUtterance(winnerText);
        utterance.lang = "pt-BR";
        utterance.rate = 1.1;
        window.speechSynthesis.speak(utterance);
      }
      
      setTimeout(() => setShowCelebration(false), 5000);
      return true;
    }
    return false;
  }, [cards, winners]);
  
  const drawNumber = useCallback(() => {
    if (gameFinished || isDrawing.current) return;
    
    isDrawing.current = true;
    
    const availableNumbers = Array.from({ length: max - min + 1 }, (_, i) => min + i)
      .filter(n => !calledNumbers.includes(n));
    
    if (availableNumbers.length === 0) {
      setAutoRunning(false);
      if (autoInterval.current) {
        clearInterval(autoInterval.current);
        autoInterval.current = null;
      }
      isDrawing.current = false;
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];
    const newCalledNumbers = [newNumber, ...calledNumbers];
    
    setCalledNumbers(newCalledNumbers);
    setCurrentNumber(newNumber); // O número fica na tela até o próximo sorteio
    
    // Anuncia o número sorteado
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new window.SpeechSynthesisUtterance(`${newNumber}`);
      utterance.lang = "pt-BR";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    
    // Verifica vencedores
    const hasWinner = checkWinners(newCalledNumbers);
    
    // Verifica near winners se não houve vencedor
    if (!hasWinner) {
      checkNearWinners(newCalledNumbers);
    }
    
    isDrawing.current = false;
    return newNumber;
  }, [calledNumbers, gameFinished, min, max, checkWinners, checkNearWinners]);
  
  const handlePauseResume = () => {
    if (gameFinished) return;
    setAutoPaused(!autoPaused);
  };
  
  const handleContinue = () => {
    setGameFinished(false);
    setAutoRunning(true);
    setAutoPaused(false);
    setShowCelebration(false);
  };
  
  const handleExit = () => {
    if (autoInterval.current) {
      clearInterval(autoInterval.current);
      autoInterval.current = null;
    }
    onExit();
  };
  
  // Efeito para gerenciar o intervalo do sorteio automático
  useEffect(() => {
    if (autoRunning && !autoPaused && !gameFinished && cards.length > 0) {
      if (autoInterval.current) {
        clearInterval(autoInterval.current);
        autoInterval.current = null;
      }
      
      autoInterval.current = setInterval(() => {
        drawNumber();
      }, 10000); // 10 segundos
    } else {
      if (autoInterval.current) {
        clearInterval(autoInterval.current);
        autoInterval.current = null;
      }
    }
    
    return () => {
      if (autoInterval.current) {
        clearInterval(autoInterval.current);
        autoInterval.current = null;
      }
    };
  }, [autoRunning, autoPaused, gameFinished, cards.length, drawNumber]);
  
  // Sorteia o primeiro número automaticamente ao iniciar
  useEffect(() => {
    if (autoRunning && !autoPaused && !gameFinished && cards.length > 0 && calledNumbers.length === 0 && !isDrawing.current) {
      const timer = setTimeout(() => {
        drawNumber();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [autoRunning, autoPaused, gameFinished, cards.length, calledNumbers.length, drawNumber]);
  
  const remainingCount = (max - min + 1) - calledNumbers.length;
  const allNumbersDrawn = remainingCount === 0 && calledNumbers.length > 0;
  
  // Cores baseadas no tema
  const backgroundColor = isDark 
    ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
    : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
  
  const textColor = isDark ? "#fff" : "#1a1a2e";
  const cardBg = isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.95)";
  
  // Obtém o último número sorteado (primeiro da lista)
  const lastNumber = calledNumbers.length > 0 ? calledNumbers[0] : null;
  
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: backgroundColor,
        zIndex: 1000,
        overflowY: "auto",
        padding: "2rem",
      }}
    >
      {/* Botão de tema */}
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          background: isDark ? "#ffd700" : "#244466",
          color: isDark ? "#1a1a2e" : "#ffd700",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "1.2rem",
          cursor: "pointer",
          zIndex: 2000,
        }}
      >
        {isDark ? "☀️" : "🌙"}
      </button>
      
      {/* Efeito de celebração */}
      {showCelebration && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #ffd700 0%, #ffed4a 100%)",
              padding: "3rem",
              borderRadius: "24px",
              textAlign: "center",
              animation: "bounce 0.5s ease-out",
            }}
          >
            <span style={{ fontSize: "4rem", display: "block" }}>🎉🏆🎉</span>
            <h2 style={{ fontSize: "2rem", color: "#1a1a2e", marginTop: "1rem" }}>BINGO!</h2>
            <p style={{ fontSize: "1.5rem", color: "#1a1a2e", marginTop: "0.5rem" }}>
              Cartela(s) {winners.map(w => `#${w + 1}`).join(", ")} venceu(ram)!
            </p>
            <button
              onClick={handleContinue}
              style={{
                marginTop: "2rem",
                padding: "1rem 2rem",
                background: "#1a1a2e",
                color: "#ffd700",
                border: "none",
                borderRadius: "12px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Continuar Sorteio
            </button>
          </div>
        </div>
      )}
      
      {/* Cabeçalho */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: isDark ? "#ffd700" : "#244466",
              margin: 0,
            }}
          >
            🎯 SORTEIO BINGO
          </h1>
          <p style={{ color: textColor, marginTop: "0.5rem" }}>
            Faixa: {min} - {max} | Total: {max - min + 1} números | Cartelas: {cards.length}
          </p>
        </div>
        <button
          onClick={handleExit}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sair do Sorteio
        </button>
      </div>
      
      {/* Número Sorteado Atual - Agora fica fixo na tela */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
            padding: "2rem 4rem",
            borderRadius: "20px",
            boxShadow: "0 0 30px rgba(245,158,11,0.5)",
            minWidth: "200px",
          }}
        >
          <div style={{ fontSize: "1rem", color: "#fff", opacity: 0.9, marginBottom: "0.5rem" }}>
            ÚLTIMO NÚMERO SORTEADO
          </div>
          <span style={{ fontSize: "5rem", fontWeight: "bold", color: "#fff", lineHeight: 1 }}>
            {lastNumber !== null ? lastNumber : "---"}
          </span>
        </div>
        <p style={{ color: textColor, marginTop: "1rem", fontSize: "1rem" }}>
          {autoRunning && !autoPaused && !gameFinished && calledNumbers.length > 0 
            ? "🔜 Próximo número em 10 segundos" 
            : autoRunning && !autoPaused && !gameFinished && calledNumbers.length === 0
            ? "🎲 Iniciando sorteio..."
            : autoPaused 
            ? "⏸ Sorteio automático pausado"
            : ""}
        </p>
      </div>
      
      {/* Controles do Sorteio */}
      <div
        style={{
          background: cardBg,
          borderRadius: "16px",
          padding: "1.5rem",
          marginBottom: "2rem",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {!gameFinished && (
            <button
              onClick={handlePauseResume}
              style={{
                padding: "0.75rem 2rem",
                background: autoPaused ? "#10b981" : "#f59e0b",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {autoPaused ? "▶ Retomar Sorteio" : "⏸ Pausar Sorteio"}
            </button>
          )}
          
          {gameFinished && (
            <button
              onClick={handleContinue}
              style={{
                padding: "0.75rem 2rem",
                background: "#10b981",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🎲 Continuar Sorteio
            </button>
          )}
          
          <button
            onClick={drawNumber}
            disabled={gameFinished || allNumbersDrawn}
            style={{
              padding: "0.75rem 2rem",
              background: (gameFinished || allNumbersDrawn) ? "#6b7280" : "#3b82f6",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: (gameFinished || allNumbersDrawn) ? "not-allowed" : "pointer",
            }}
          >
            🎯 Sortear Manual
          </button>
        </div>
        
        {/* Status do Sorteio */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
            paddingTop: "1rem",
            borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}`,
            color: textColor,
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span>📊 Números sorteados: {calledNumbers.length}</span>
          <span>⏳ Restantes: {remainingCount}</span>
          <span>🎴 Cartelas: {cards.length}</span>
          {winners.length > 0 && <span>🏆 Vencedores: {winners.length}</span>}
        </div>
        
        {/* Indicador de sorteio automático */}
        {autoRunning && !autoPaused && !gameFinished && calledNumbers.length > 0 && (
          <div
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color: "#10b981",
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}
          >
            🔄 Sorteio automático em andamento
          </div>
        )}
        
        {autoPaused && !gameFinished && (
          <div
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color: "#f59e0b",
              fontSize: "0.9rem",
            }}
          >
            ⏸ Sorteio automático pausado
          </div>
        )}
      </div>
      
      {/* Alerta de Cartelas Próximas */}
      {nearWinners.length > 0 && !gameFinished && (
        <div
          style={{
            background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
            borderRadius: "16px",
            padding: "1rem",
            marginBottom: "2rem",
            textAlign: "center",
            animation: "pulse 1s infinite",
          }}
        >
          <span style={{ fontSize: "2rem", display: "block" }}>⚠️</span>
          <h3 style={{ color: "#92400e", marginBottom: "0.5rem" }}>
            ATENÇÃO! Cartela(s) a 1 NÚMERO do BINGO!
          </h3>
          <p style={{ color: "#92400e", fontSize: "1.2rem", fontWeight: "bold" }}>
            {nearWinners.map(w => `Cartela #${w + 1}`).join(" • ")}
          </p>
        </div>
      )}
      
      {/* Lista de Números Sorteados */}
      <div
        style={{
          background: cardBg,
          borderRadius: "16px",
          padding: "1.5rem",
          marginBottom: "2rem",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ color: isDark ? "#ffd700" : "#244466", marginBottom: "1rem" }}>
          📝 Histórico de Números Sorteados ({calledNumbers.length})
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {calledNumbers.map((num, idx) => (
            <div
              key={idx}
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: idx === 0 ? "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)" : (isDark ? "rgba(255,255,255,0.2)" : "#e5e7eb"),
                color: idx === 0 ? "#fff" : textColor,
                fontWeight: "bold",
                fontSize: "1.1rem",
                borderRadius: "8px",
              }}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
      
      {/* Lista de Vencedores */}
      {winners.length > 0 && (
        <div
          style={{
            background: "linear-gradient(135deg, #ffd70020 0%, #ffed4a20 100%)",
            borderRadius: "16px",
            padding: "1.5rem",
            border: "2px solid #ffd700",
          }}
        >
          <h3 style={{ color: "#ffd700", marginBottom: "0.5rem" }}>
            🏆 CARTELA(S) VENCEDORA(S)
          </h3>
          <p style={{ color: textColor, fontSize: "1.3rem", fontWeight: "bold" }}>
            {winners.map(w => `Cartela #${w + 1}`).join(" • ")}
          </p>
          {gameFinished && (
            <p style={{ color: "#ffd700", marginTop: "0.5rem", fontSize: "0.9rem" }}>
              ⏸ Sorteio pausado. Clique em "Continuar Sorteio" para sortear mais números.
            </p>
          )}
        </div>
      )}
      
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(0.9); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}