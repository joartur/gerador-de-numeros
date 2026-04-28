"use client";
import { useState, useRef, useEffect } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Logo from "./components/Logo";
import StartButtons from "./components/StartButtons";
import ManualDraw from "./components/ManualDraw";
import AutoDraw from "./components/AutoDraw";
import BingoGame from "./components/BingoGame";
import BackToStart from "./components/BackToStart";
import "./globals.css";

function HomeContent() {
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState<"start"|"manual"|"auto"|"bingo">("start");

  const isDark = theme === 'dark';

  // Manual states
  const [minManual, setMinManual] = useState<number>(1);
  const [maxManual, setMaxManual] = useState<number>(10);
  const [inputMinManual, setInputMinManual] = useState<string>("1");
  const [inputMaxManual, setInputMaxManual] = useState<string>("10");
  const [historyManual, setHistoryManual] = useState<number[]>([]);
  const [errorManual, setErrorManual] = useState<string>("");

  // Auto states
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

  const backgroundColor = isDark
    ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
    : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";

  const cardBg = isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.95)";
  const textColor = isDark ? "#fff" : "#244466";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
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
          zIndex: 100,
        }}
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      <section
        className="gn-main-section"
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
          background: cardBg,
          borderRadius: "24px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <Logo />
        <h1
          style={{
            marginBottom: 28,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            color: textColor,
            textAlign: "center",
          }}
        >
          Gerador de Números Aleatórios
        </h1>
        {mode === "start" && (
          <StartButtons
            onManual={() => setMode("manual")}
            onAuto={() => setMode("auto")}
            onBingo={() => setMode("bingo")}
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
        {mode === "bingo" && (
          <BingoGame onBack={() => setMode("start")} />
        )}
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
