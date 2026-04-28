interface BackToStartProps {
  onBack: () => void;
}
export default function BackToStart({ onBack }: BackToStartProps) {
  return (
    <div style={{ marginTop: 36, textAlign: "center" }}>
      <button
        type="button"
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#3b82f6",
          fontWeight: 700,
          fontSize: 16,
          textDecoration: "underline",
          cursor: "pointer",
          padding: 0,
          margin: 0
        }}
      >
        Voltar para o início
      </button>
    </div>
  );
}