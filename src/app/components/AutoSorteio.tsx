import { useState, useRef, useEffect } from "react";

interface AutoSorteioProps {
  amount: number;
  inputAmount: string;
  setAmount: (v: number) => void;
  setInputAmount: (v: string) => void;
  autoHistory: number[];
  setAutoHistory: (h: number[]) => void;
  autoRunning: boolean;
  setAutoRunning: (v: boolean) => void;
  // ... outros props
}

export default function AutoSorteio({
  amount, inputAmount, setAmount, setInputAmount,
  autoHistory, setAutoHistory, autoRunning, setAutoRunning
}: AutoSorteioProps) {
  const autoInterval = useRef<NodeJS.Timeout | null>(null);

  function handleStart() {
    const val = parseInt(inputAmount, 10);
    if (isNaN(val) || val < 1) return;
    setAmount(val);
    setAutoHistory([]);
    setAutoRunning(true);
  }

  // Efeito para realizar sorteio automático
  useEffect(() => {
    if (autoRunning && autoHistory.length < amount) {
      if (!autoInterval.current) {
        autoInterval.current = setInterval(() => {
          setAutoHistory(prev => {
            if (prev.length >= amount) {
              setAutoRunning(false);
              clearInterval(autoInterval.current!);
              autoInterval.current = null;
              return prev;
            }
            // Sorteio (simples, sem repetição)
            let num;
            do {
              num = Math.floor(Math.random() * 100000) + 1; // exemplo: sorteio entre 1 e 100000
            } while (prev.includes(num));
            return [...prev, num];
          });
        }, 2000); // exemplo: 2 segundos
      }
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
  }, [autoRunning, autoHistory, amount]);

  return (
    <div>
      <label>Quantidade de números para sortear:</label>
      <input
        type="number"
        value={inputAmount}
        onChange={e => setInputAmount(e.target.value)}
        min={1}
        max={100000}
        disabled={autoRunning}
      />
      <button onClick={handleStart} disabled={autoRunning || !inputAmount}>Sortear</button>
      <div>
        <h2>Números sorteados automaticamente:</h2>
        {autoHistory.map((n, i) => (
          <span key={i}>{n} </span>
        ))}
      </div>
    </div>
  );
}
