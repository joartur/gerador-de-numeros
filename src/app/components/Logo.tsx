import Image from "next/image";

export default function Logo() {
  return (
    <div className="gn-logo-container">
      <Image
        src="/logo.png"
        alt="Logo"
        className="gn-logo-img"
        width={150}
        height={100}
        style={{ objectFit: "contain" }}
        priority
      />
      <style>{`
        .gn-logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-bottom: 3px;
        }
        .gn-logo-img {
          width: 100px;
          height: 100px;
          object-fit: contain;
          display: block;
        }
        @media (min-width: 1200px) {
          .gn-logo-container {
            margin-bottom: 3px;
          }
          .gn-logo-img {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
}
