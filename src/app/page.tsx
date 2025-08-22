"use client";
import { useState, useRef, useEffect } from "react";
import Logo from "./components/Logo";
import StartButtons from "./components/StartButtons";
import ManualDraw from "./components/ManualDraw";
import AutoDraw from "./components/AutoDraw";
import BackToStart from "./components/BackToStart";

export default function Home() {
  const [mode, setMode] = useState<"start"|"manual"|"auto">("start");

  // Manual
  const [minManual, setMinManual] = useState<number>(1);
  const [maxManual, setMaxManual] = useState<number>(10);
  const [inputMinManual, setInputMinManual] = useState<string>("1");
  const [inputMaxManual, setInputMaxManual] = useState<string>("10");
  const [historyManual, setHistoryManual] = useState<number[]>([]);
  const [errorManual, setErrorManual] = useState<string>("");

  // Automático
  const [minAuto, setMinAuto] = useState<number>(1);
  const [maxAuto, setMaxAuto] = useState<number>(10);
  const [inputMinAuto, setInputMinAuto] = useState<string>("1");
  const [inputMaxAuto, setInputMaxAuto] = useState<string>("10");
  const [historyAuto, setHistoryAuto] = useState<number[]>([]);
  const [errorAuto, setErrorAuto] = useState<string>("");
  const [autoRunning, setAutoRunning] = useState<boolean>(false);
  const [autoPaused, setAutoPaused] = useState<boolean>(false);
  const autoInterval = useRef<NodeJS.Timeout | null>(null);

  function speakNumberCustom(historyArr: number[]) {
    if (typeof window !== "undefined" && "speechSynthesis" in window && historyArr.length > 0) {
      let text = "";
      if (historyArr.length === 1) {
        text = `Primeiro número ${historyArr[0]}`;
      } else {
        text = `Número sorteado foi ${historyArr[0]}`;
      }
      if (historyArr.length > 0 && historyArr.length % 10 === 0) {
        const dezenas = historyArr.length / 10;
        text += `. Foram sortados ${dezenas} ${dezenas === 1 ? "dezena" : "dezenas"}`;
      }
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      window.speechSynthesis.speak(utterance);
    }
  }

  // --- Lógica do Manual ---
  const possibleNumbersManual = Array.from(
    { length: maxManual - minManual + 1 },
    (_, i) => minManual + i
  ).filter((n) => !historyManual.includes(n));

  function handleManualGenerate() {
    setErrorManual("");
    if (minManual > maxManual) {
      setErrorManual("O valor mínimo deve ser menor ou igual ao máximo.");
      return;
    }
    if (possibleNumbersManual.length === 0) return;
    const randIdx = Math.floor(Math.random() * possibleNumbersManual.length);
    const num = possibleNumbersManual[randIdx];
    const newHistory = [num, ...historyManual];
    setHistoryManual(newHistory);
    speakNumberCustom(newHistory);
  }

  function handleManualBlurMin() {
    const value = parseInt(inputMinManual, 10);
    if (!isNaN(value)) {
      setMinManual(value);
      setHistoryManual([]);
      setErrorManual("");
    }
  }
  function handleManualBlurMax() {
    const value = parseInt(inputMaxManual, 10);
    if (!isNaN(value)) {
      setMaxManual(value);
      setHistoryManual([]);
      setErrorManual("");
    }
  }
  function handleManualKeyDownMin(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
  }
  function handleManualKeyDownMax(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
  }

  // --- Lógica do Automático ---
  const possibleNumbersAuto = Array.from(
    { length: maxAuto - minAuto + 1 },
    (_, i) => minAuto + i
  ).filter((n) => !historyAuto.includes(n));

  function handleAutoStart() {
    setErrorAuto("");
    if (minAuto > maxAuto) {
      setErrorAuto("O valor mínimo deve ser menor ou igual ao máximo.");
      return;
    }
    // Ao iniciar, sorteia imediatamente o primeiro número
    const randIdx = Math.floor(Math.random() * possibleNumbersAuto.length);
    const firstNumber = possibleNumbersAuto[randIdx];
    setHistoryAuto([firstNumber]);
    speakNumberCustom([firstNumber]);
    setAutoRunning(true);
    setAutoPaused(false);
  }

  function handleAutoPauseResume() {
    setAutoPaused((paused) => !paused);
  }
  function handleAutoStop() {
    setAutoRunning(false);
    setAutoPaused(false);
    setHistoryAuto([]);
  }

  useEffect(() => {
    // Sorteio automático: apenas aguarda para sortear do segundo em diante
    if (
      autoRunning &&
      !autoPaused &&
      historyAuto.length > 0 &&
      historyAuto.length < possibleNumbersAuto.length
    ) {
      if (!autoInterval.current) {
        autoInterval.current = setInterval(() => {
          setHistoryAuto((prevHistory) => {
            const remaining = Array.from(
              { length: maxAuto - minAuto + 1 },
              (_, i) => minAuto + i
            ).filter((n) => !prevHistory.includes(n));
            if (remaining.length === 0 || prevHistory.length >= possibleNumbersAuto.length) {
              clearAutoInterval();
              setAutoRunning(false);
              return prevHistory;
            }
            const randIdx = Math.floor(Math.random() * remaining.length);
            const num = remaining[randIdx];
            const newHistory = [num, ...prevHistory];
            speakNumberCustom(newHistory);
            return newHistory;
          });
        }, 20000);
      }
    } else {
      clearAutoInterval();
    }
    return () => clearAutoInterval();
  }, [autoRunning, autoPaused, minAuto, maxAuto, historyAuto]);

  function clearAutoInterval() {
    if (autoInterval.current) {
      clearInterval(autoInterval.current);
      autoInterval.current = null;
    }
  }

  // --- Renderização ---
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <section className="gn-main-section">
        <h1 style={{
          marginBottom: 28,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.5px",
          color: "#244466",
          textAlign: "center",
        }}>
          Gerador de Números Aleatórios
        </h1>
        <Logo />
        {mode === "start" && (
          <StartButtons
            onManual={() => setMode("manual")}
            onAuto={() => setMode("auto")}
          />
        )}
        {mode === "manual" && (
          <>
            <ManualDraw
              min={minManual}
              max={maxManual}
              inputMin={inputMinManual}
              inputMax={inputMaxManual}
              onChangeMin={setInputMinManual}
              onChangeMax={setInputMaxManual}
              onBlurMin={handleManualBlurMin}
              onBlurMax={handleManualBlurMax}
              onKeyDownMin={handleManualKeyDownMin}
              onKeyDownMax={handleManualKeyDownMax}
              history={historyManual}
              error={errorManual}
              onGenerate={handleManualGenerate}
              allSorted={historyManual.length === maxManual - minManual + 1 && historyManual.length > 0}
              sortedCount={historyManual.length}
              totalNumbers={maxManual - minManual + 1 > 0 ? maxManual - minManual + 1 : 0}
              remainingCount={Math.max(0, (maxManual - minManual + 1) - historyManual.length)}
            />
            <BackToStart onBack={() => setMode("start")} />
          </>
        )}
        {mode === "auto" && (
          <>
            <AutoDraw
              min={minAuto}
              max={maxAuto}
              inputMin={inputMinAuto}
              inputMax={inputMaxAuto}
              onChangeMin={setInputMinAuto}
              onChangeMax={setInputMaxAuto}
              onBlurMin={() => {
                const value = parseInt(inputMinAuto, 10);
                if (!isNaN(value)) {
                  setMinAuto(value);
                  setHistoryAuto([]);
                  setErrorAuto("");
                }
              }}
              onBlurMax={() => {
                const value = parseInt(inputMaxAuto, 10);
                if (!isNaN(value)) {
                  setMaxAuto(value);
                  setHistoryAuto([]);
                  setErrorAuto("");
                }
              }}
              onKeyDownMin={e => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
              onKeyDownMax={e => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
              history={historyAuto}
              error={errorAuto}
              autoRunning={autoRunning}
              autoPaused={autoPaused}
              onStart={handleAutoStart}
              onPauseResume={handleAutoPauseResume}
              onStop={handleAutoStop}
              allSorted={historyAuto.length === possibleNumbersAuto.length && historyAuto.length > 0}
              sortedCount={historyAuto.length}
              totalNumbers={maxAuto - minAuto + 1 > 0 ? maxAuto - minAuto + 1 : 0}
              remainingCount={Math.max(0, possibleNumbersAuto.length - historyAuto.length)}
            />
            <BackToStart onBack={() => setMode("start")} />
          </>
        )}
      </section>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes popIn {
          0% { transform: scale(0.6); opacity: 0.6;}
          60% { transform: scale(1.2);}
          100% { transform: scale(1); opacity: 1;}
        }
        .gn-main-section {
          max-width: 420px;
          width: 100%;
          padding: 2.5rem 2rem 2rem 2rem;
          margin: 0 auto;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          transition: max-width 0.3s, padding 0.3s;
        }
        .gn-grid {
          min-height: 56px;
          max-height: 220px;
          overflow-y: auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
          gap: 10px;
          margin: 0 auto;
          width: 100%;
        }
        @media (min-width: 1200px) {
          .gn-main-section {
            max-width: 900px;
            padding: 3.5rem 5rem 3rem 5rem;
            box-shadow: 0 8px 40px rgba(0,0,0,0.13);
          }
          .gn-grid {
            max-height: 400px !important;
            grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)) !important;
            gap: 18px !important;
          }
        }
      `}</style>
    </main>
  );
}
