export default function Logo() {
  return (
    <div className="gn-logo-container">
      <img
        src="/logo.png"
        alt="Logo"
        className="gn-logo-img"
      />
      <style>{`
        .gn-logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-bottom: 18px;
        }
        .gn-logo-img {
          width: 100px;
          height: 100px;
          object-fit: contain;
          display: block;
        }
        @media (min-width: 1200px) {
          .gn-logo-container {
            margin-bottom: 24px;
          }
          .gn-logo-img {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
}
