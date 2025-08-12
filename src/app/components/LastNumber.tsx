interface LastNumberProps {
  number: number | undefined;
}
export default function LastNumber({ number }: LastNumberProps) {
  if (number === undefined) return null;
  return (
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
        {number}
      </div>
    </div>
  );
}