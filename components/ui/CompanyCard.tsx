"use client";

import Image from "next/image";

export default function CompanyCard({
  name,
  logo,
  selected,
  onClick,
  onInfo,
  className,
}: {
  name: string;
  logo: string;
  selected: boolean;
  onClick: () => void;
  onInfo: () => void;
  className?: string;
}) {
  return (
    <div
      className={`company-card ${selected ? "selected" : ""} ${className || ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onInfo();
        }}
        style={{
          position: "absolute",
          top: "10px",
          right: "14px",
          fontSize: "14px",
          opacity: 0.8,
          cursor: "pointer",
        }}
      >
        ℹ️
      </div>

      <Image src={logo} alt={name} width={60} height={60} className="company-logo" />

      <p style={{ marginTop: "8px" }}>{name}</p>
    </div>
  );
}
