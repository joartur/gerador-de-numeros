"use client";
import { useState, useRef, useEffect } from "react";
import Logo from "./components/Logo";
import StartButtons from "./components/StartButtons";
import NumberInputs from "./components/NumberInputs";
import AutoControls from "./components/AutoControls";
import LastNumber from "./components/LastNumber";
import SortedGrid from "./components/SortedGrid";
import StatusTexts from "./components/StatusTexts";
import BackToStart from "./components/BackToStart";

export default function Home() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(10);
  const [history, setHistory] = useState<number[]>([]);
  const [error, setError] = useState<string>("");
  const [inputMin, setInputMin] = useState<string>("1");
  const [inputMax, setInputMax] = useState<string>("10");

  const [autoMode, setAutoMode] = useState<boolean>(false);
  const [autoRunning, setAutoRunning] = useState<boolean>(false);
  const [autoCancelled, setAutoCancelled] = useState<boolean>(false);
  const [manualMode, setManualMode] = useState<boolean>(false);
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

  function handleBlurMin() {
    const value = parseInt(inputMin, 10);
    if (!isNaN(value)) {
      setMin(value);
      setHistory([]);
      setError("");
      setAutoMode(false);
      setAutoRunning(false);
      setAutoCancelled(false);
      setManualMode(false);
      clearAutoInterval();
    }
  }
  function handleBlurMax() {
    const value = parseInt(inputMax, 10);
    if (!isNaN(value)) {
      setMax(value);
      setHistory([]);
      setError("");
      setAutoMode(false);
      setAutoRunning(false);
      setAutoCancelled(false);
      setManualMode(false);
      clearAutoInterval();
    }
  }
  function handleKeyDownMin(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  }
  function handleKeyDownMax(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  }

  const possibleNumbers = Array.from(
    { length: max - min + 1 },
    (_, i) => min + i
  ).filter((n) => !history.includes(n));

  function handleGenerate() {
    setError("");
    setManualMode(true);
    if (min > max) {
      setError("O valor mínimo deve ser menor ou igual ao máximo.");
      return;
    }
    if (possibleNumbers.length === 0) return;
    const randIdx = Math.floor(Math.random() * possibleNumbers.length);
    const num = possibleNumbers[randIdx];
    const newHistory = [num, ...history];
    setHistory(newHistory);
    speakNumberCustom(newHistory);
  }

  function handleAutoStart() {
    if (min > max || possibleNumbers.length === 0) return;
    setAutoMode(true);
    setManualMode(false);
    setAutoRunning(true);
    setAutoCancelled(false);
    setHistory((prevHistory) => {
      if (prevHistory.length === 0) {
        const randIdx = Math.floor(Math.random() * possibleNumbers.length);
        const num = possibleNumbers[randIdx];
        const newHistory = [num];
        speakNumberCustom(newHistory);
        return newHistory;
      }
      return prevHistory;
    });
  }

  function clearAutoInterval() {
    if (autoInterval.current) {
      clearInterval(autoInterval.current);
      autoInterval.current = null;
    }
  }

  useEffect(() => {
    if (
      autoMode &&
      autoRunning &&
      !autoCancelled &&
      possibleNumbers.length > 0
    ) {
      if (!autoInterval.current) {
        autoInterval.current = setInterval(() => {
          setHistory((prevHistory) => {
            const remaining = Array.from(
              { length: max - min + 1 },
              (_, i) => min + i
            ).filter((n) => !prevHistory.includes(n));
            if (remaining.length === 0) {
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
  }, [autoMode, autoRunning, autoCancelled, min, max]);

  useEffect(() => {
    if (autoMode && possibleNumbers.length === 0 && autoRunning) {
      setAutoRunning(false);
      clearAutoInterval();
    }
  }, [history]);

  function handleAutoStop() {
    setAutoRunning(false);
    setAutoCancelled(true);
    clearAutoInterval();
  }

  function handleAutoPauseResume() {
    setAutoRunning((v) => !v);
  }

  function handleBackToStart() {
    setShowStartScreen(true);
    setAutoMode(false);
    setAutoRunning(false);
    setAutoCancelled(false);
    setManualMode(false);
    setHistory([]);
    setError("");
    clearAutoInterval();
  }

  const totalNumbers = max - min + 1 > 0 ? max - min + 1 : 0;
  const sortedCount = history.length;
  const remainingCount = totalNumbers - sortedCount;
  const allSorted = sortedCount === totalNumbers && sortedCount > 0;

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <section className="gn-main-section">
        <h1
          style={{
            marginBottom: 28,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            color: "#244466",
            textAlign: "center",
          }}
        >
          Gerador de Números Aleatórios
        </h1>
        <Logo />
        {showStartScreen ? (
          <StartButtons
            onManual={() => {
              setManualMode(true);
              setAutoMode(false);
              setAutoCancelled(false);
              setShowStartScreen(false);
              setHistory([]);
              setError("");
            }}
            onAuto={() => {
              setAutoMode(true);
              setManualMode(false);
              setShowStartScreen(false);
              setAutoRunning(true);
              setAutoCancelled(false);
              setHistory([]);
              setError("");
              setHistory((prevHistory) => {
                if (prevHistory.length === 0) {
                  const randIdx = Math.floor(Math.random() * possibleNumbers.length);
                  const num = possibleNumbers[randIdx];
                  const newHistory = [num];
                  speakNumberCustom(newHistory);
                  return newHistory;
                }
                return prevHistory;
              });
            }}
          />
        ) : (
          <>
            {!autoCancelled ? (
              <NumberInputs
                min={min}
                max={max}
                inputMin={inputMin}
                inputMax={inputMax}
                onChangeMin={setInputMin}
                onChangeMax={setInputMax}
                onBlurMin={handleBlurMin}
                onBlurMax={handleBlurMax}
                onKeyDownMin={handleKeyDownMin}
                onKeyDownMax={handleKeyDownMax}
                autoMode={autoMode}
                onGenerate={handleGenerate}
                manualMode={manualMode}
                onAutoStart={handleAutoStart}
                error={error}
                disabled={min > max || allSorted || totalNumbers <= 0 || autoMode}
                allSorted={allSorted}
                totalNumbers={totalNumbers}
              />
            ) : null}
            {autoMode && (
              <AutoControls
                autoRunning={autoRunning}
                onPauseResume={handleAutoPauseResume}
                onStop={handleAutoStop}
              />
            )}
            <LastNumber number={history[0]} />
            <StatusTexts
              sortedCount={sortedCount}
              allSorted={allSorted}
              totalNumbers={totalNumbers}
              remainingCount={remainingCount}
            />
            <SortedGrid history={history} />
            {autoCancelled && (
              <div style={{ marginTop: 30, textAlign: "center" }}>
                <div style={{
                  color: "#ef4444",
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 16,
                }}>
                  Sorteio Automático Cancelado
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBackToStart();
                  }}
                  style={{
                    color: "#2563eb",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Começar novamente
                </a>
              </div>
            )}
            <BackToStart onBack={handleBackToStart} />
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
        .gn-buttons-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
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
          .gn-buttons-row {
            flex-direction: row;
            gap: 18px;
            width: 100%;
          }
          .gn-buttons-row > button {
            width: 100%;
            margin-top: 10px !important;
          }
        }
      `}</style>
    </main>
  );
}
