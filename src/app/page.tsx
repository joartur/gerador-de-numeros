"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(10);
  const [history, setHistory] = useState<number[]>([]);
  const [error, setError] = useState<string>("");
  const [inputMin, setInputMin] = useState<string>("1");
  const [inputMax, setInputMax] = useState<string>("10");

  const [autoMode, setAutoMode] = useState<boolean>(false);
  const [autoRunning, setAutoRunning] = useState<boolean>(false);
  const [autoCancelled, setAutoCancelled] = useState<boolean>(false);
  const autoInterval = useRef<NodeJS.Timeout | null>(null);

  // Atualiza o min/max somente ao clicar fora ou pressionar Enter
  function handleBlurMin() {
    const value = parseInt(inputMin, 10);
    if (!isNaN(value)) {
      setMin(value);
      setHistory([]);
      setError("");
      setAutoMode(false);
      setAutoRunning(false);
      setAutoCancelled(false);
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

  // Gera os possíveis números ainda não sorteados
  const possibleNumbers = Array.from(
    { length: max - min + 1 },
    (_, i) => min + i
  ).filter((n) => !history.includes(n));

  // Sorteia um novo número não repetido
  function handleGenerate() {
    setError("");
    if (min > max) {
      setError("O valor mínimo deve ser menor ou igual ao máximo.");
      return;
    }
    if (possibleNumbers.length === 0) return;
    const randIdx = Math.floor(Math.random() * possibleNumbers.length);
    const num = possibleNumbers[randIdx];
    setHistory([num, ...history]);
  }

  // Sorteio automático: começa já exibindo o primeiro número!
  function handleAutoStart() {
    if (min > max || possibleNumbers.length === 0) return;
    setAutoMode(true);
    setAutoRunning(true);
    setAutoCancelled(false);

    // Sorteia imediatamente o primeiro número se não houver histórico ainda
    setHistory((prevHistory) => {
      if (prevHistory.length === 0) {
        const randIdx = Math.floor(Math.random() * possibleNumbers.length);
        const num = possibleNumbers[randIdx];
        return [num];
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

  // Efeito para controlar o sorteio automático
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
            return [num, ...prevHistory];
          });
        }, 20000); // 20 segundos
      }
    } else {
      clearAutoInterval();
    }
    // Limpa o intervalo ao desmontar
    return () => clearAutoInterval();
    // eslint-disable-next-line
  }, [autoMode, autoRunning, autoCancelled, min, max]);

  // Quando terminar todos os números, encerra o sorteio automático
  useEffect(() => {
    if (autoMode && possibleNumbers.length === 0 && autoRunning) {
      setAutoRunning(false);
      clearAutoInterval();
    }
    // eslint-disable-next-line
  }, [history]);

  // Parar completamente o sorteio automático
  function handleAutoStop() {
    setAutoRunning(false);
    setAutoCancelled(true);
    clearAutoInterval();
  }

  // Pausar/reiniciar
  function handleAutoPauseResume() {
    setAutoRunning((v) => !v);
  }

  // Voltar ao início (reset para tela de escolha)
  function handleBackToStart() {
    setAutoMode(false);
    setAutoRunning(false);
    setAutoCancelled(false);
    setHistory([]);
    setError("");
    clearAutoInterval();
  }

  const totalNumbers = max - min + 1 > 0 ? max - min + 1 : 0;
  const sortedCount = history.length;
  const remainingCount = totalNumbers - sortedCount;
  const allSorted = sortedCount === totalNumbers && sortedCount > 0;

  // Renderização principal
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

        {/* INPUTS E BOTÕES - só exibe se não foi cancelado o sorteio automático */}
        {!autoCancelled ? (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGenerate();
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginBottom: 18,
              }}
            >
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label
                    htmlFor="min"
                    style={{
                      fontSize: 13,
                      color: "#244466",
                      fontWeight: 500,
                    }}
                  >
                    De
                  </label>
                  <input
                    id="min"
                    type="number"
                    value={inputMin}
                    min={-99999}
                    max={max}
                    onChange={e => setInputMin(e.target.value)}
                    onBlur={handleBlurMin}
                    onKeyDown={handleKeyDownMin}
                    style={{
                      marginTop: 4,
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #dde6f1",
                      borderRadius: 6,
                      fontSize: 16,
                      boxShadow: "0 1px 2px #0001",
                      outline: "none",
                      transition: "border 0.2s",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    htmlFor="max"
                    style={{
                      fontSize: 13,
                      color: "#244466",
                      fontWeight: 500,
                    }}
                  >
                    Até
                  </label>
                  <input
                    id="max"
                    type="number"
                    value={inputMax}
                    min={min}
                    max={99999}
                    onChange={e => setInputMax(e.target.value)}
                    onBlur={handleBlurMax}
                    onKeyDown={handleKeyDownMax}
                    style={{
                      marginTop: 4,
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #dde6f1",
                      borderRadius: 6,
                      fontSize: 16,
                      boxShadow: "0 1px 2px #0001",
                      outline: "none",
                      transition: "border 0.2s",
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={min > max || allSorted || totalNumbers <= 0 || autoMode}
                style={{
                  marginTop: 10,
                  padding: "0.7rem 0",
                  background:
                    min > max || allSorted || totalNumbers <= 0 || autoMode
                      ? "#cccccc"
                      : "linear-gradient(90deg,#3b82f6 0%, #06b6d4 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 18,
                  fontWeight: 600,
                  cursor: min > max || allSorted || totalNumbers <= 0 || autoMode ? "not-allowed" : "pointer",
                  boxShadow: "0 2px 8px #0002",
                  transition: "background 0.2s",
                  letterSpacing: "0.5px",
                }}
              >
                Sortear
              </button>

              {/* Botão Sortear Automaticamente */}
              <button
                type="button"
                onClick={handleAutoStart}
                disabled={
                  min > max ||
                  allSorted ||
                  totalNumbers <= 0 ||
                  autoMode
                }
                style={{
                  marginTop: 10,
                  padding: "0.7rem 0",
                  background:
                    min > max ||
                    allSorted ||
                    totalNumbers <= 0 ||
                    autoMode
                      ? "#cccccc"
                      : "linear-gradient(90deg,#22d3ee 0%, #3b82f6 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 18,
                  fontWeight: 600,
                  cursor:
                    min > max ||
                    allSorted ||
                    totalNumbers <= 0 ||
                    autoMode
                      ? "not-allowed"
                      : "pointer",
                  boxShadow: "0 2px 8px #0002",
                  transition: "background 0.2s",
                  letterSpacing: "0.5px",
                }}
              >
                Sortear Automaticamente
              </button>

              {error && (
                <span
                  style={{
                    color: "#ef4444",
                    fontSize: 14,
                    textAlign: "center",
                    marginTop: 4,
                  }}
                >
                  {error}
                </span>
              )}
            </form>
          </>
        ) : null}

        {/* CONTROLES DO SORTEIO AUTOMÁTICO */}
        {autoMode && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 14,
              margin: "16px 0",
            }}
          >
            <button
              type="button"
              onClick={handleAutoPauseResume}
              style={{
                padding: "0.5rem 1.2rem",
                background: autoRunning
                  ? "linear-gradient(90deg,#f59e42 0%, #fb7185 100%)"
                  : "linear-gradient(90deg,#22c55e 0%, #3b82f6 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px #0002",
                transition: "background 0.2s",
                letterSpacing: "0.3px",
              }}
            >
              {autoRunning ? "Pausar" : "Retomar"}
            </button>
            <button
              type="button"
              onClick={handleAutoStop}
              style={{
                padding: "0.5rem 1.2rem",
                background:
                  "linear-gradient(90deg,#ef4444 0%, #f59e42 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px #0002",
                transition: "background 0.2s",
                letterSpacing: "0.3px",
              }}
            >
              Parar
            </button>
          </div>
        )}

        {/* Último número sorteado em destaque */}
        {history.length > 0 && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 10,
            animation: "fadeIn 0.6s"
          }}>
            <span style={{
              fontSize: 15,
              color: "#00aaff",
              fontWeight: 600,
              letterSpacing: "0.2px",
              marginBottom: 4,
            }}>
              Último número sorteado
            </span>
            <div style={{
              background: "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
              color: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 14px #0001",
              padding: "1.4rem 0",
              width: 120,
              fontSize: 42,
              fontWeight: 900,
              textAlign: "center",
              marginBottom: 2,
              marginTop: 2,
              letterSpacing: "2px",
              transition: "all 0.2s",
              animation: "popIn 0.3s",
            }}>
              {history[0]}
            </div>
          </div>
        )}

        {/* Novo título "Foram sorteados (n) números" */}
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

        {/* Grid dos demais números */}
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
          {history.slice(1).map((num, idx) => (
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
        {/* Mensagem se todos foram sorteados */}
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

        {/* Faltam (n) números */}
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

        {/* Sorteio automático cancelado */}
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
      </section>
      {/* CSS Animation Keyframes e responsividade */}
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
