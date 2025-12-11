"use client";

import { useRouter } from "next/navigation";
import { useGiftStore } from "@/store/useGiftStore";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DistribuzionePage() {
  const router = useRouter();
  const { amount, selectedCompanies, updateCompanyPercentage } = useGiftStore();

  const [localPercentages, setLocalPercentages] = useState<number[]>(
    selectedCompanies.map((c) => c.percentage)
  );

  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollTopVisible(window.scrollY > 250);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleChange(i: number, value: number) {
    const val = Math.max(0, Math.min(100, value));
    const updated = [...localPercentages];
    updated[i] = val;
    setLocalPercentages(updated);
    updateCompanyPercentage(i, val);
  }

  const totalPercentage = localPercentages.reduce((a, b) => a + b, 0);
  const euroPartial = localPercentages.map((p) => (amount * p) / 100);

  return (
    <div className="container-ghet fade">

      <h1 className="title-ghet">Distribuisci l’importo</h1>
      <p className="subtitle-ghet">Scegli quanto assegnare a ciascuna azienda</p>

      {selectedCompanies.map((c, i) => (
        <div key={c.name} className="card" style={{ marginBottom: "20px" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Image src={c.logo} width={48} height={48} alt={c.name} className="company-logo" />
              <span style={{ fontSize: "20px" }}>{c.name}</span>
            </div>

            <div style={{ color: "var(--accent)", fontSize: "20px", fontWeight: 600 }}>
              {euroPartial[i].toFixed(2)} €
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            className="slider-ghet"
            value={localPercentages[i]}
            onChange={(e) => handleChange(i, Number(e.target.value))}
            style={{ width: "100%", marginTop: "16px" }}
          />

          <div style={{ textAlign: "right", marginTop: "6px", fontSize: "18px" }}>
            {localPercentages[i]}%
          </div>
        </div>
      ))}

      <div className="card" style={{ textAlign: "center", marginTop: "15px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "5px" }}>Totale allocato</h3>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: totalPercentage === 100 ? "#3BD16F" : "#FF5555",
          }}
        >
          {totalPercentage}% · {(amount * totalPercentage / 100).toFixed(2)} €
        </div>
      </div>

      <button
        className="btn-ghet"
        disabled={totalPercentage !== 100}
        onClick={() => router.push("/riepilogo")}
        style={{
          marginTop: "25px",
          opacity: totalPercentage !== 100 ? 0.35 : 1,
        }}
      >
        Continua
      </button>

      {scrollTopVisible && (
        <button
          className="company-pill"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            fontSize: "20px",
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}
