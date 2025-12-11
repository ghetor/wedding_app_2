import Image from "next/image";

export default function Popup({
  logo,
  name,
  description,
  onClose,
}: {
  logo: string;
  name: string;
  description: string;
  onClose: () => void;
}) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <Image src={logo} width={60} height={60} alt={name} />
        <h2 style={{ marginTop: "12px" }}>{name}</h2>
        <p style={{ opacity: 0.8, marginBottom: "24px" }}>{description}</p>

        <button className="btn-ghet" onClick={onClose}>
          Chiudi
        </button>
      </div>
    </div>
  );
}
