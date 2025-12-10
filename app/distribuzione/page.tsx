"use client";

import { useRouter } from "next/navigation";
import { useGiftStore } from "@/store/useGiftStore";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DistribuzionePage() {
  const router = useRouter();

  const {
    amount,
    selectedCompanies,
    updateCompanyPercentage,
  } = useGiftStore();

  console.log("AMOUNT LETTO:", amount);
  console.log("🔍 selectedCompanies:", selectedCompanies);

  const [localPercentages, setLocalPercentages] = useState<number[]>(
    selectedCompanies.map((c) => c.percentage)
  );

  const [showScrollTop, setShowScrollTop] = useState(false);

  // --- SCROLL LISTENER ---
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 250);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- HANDLE SLIDER ---
  function handleChange(index: number, value: number) {
    const val = Math.max(0, Math.min(100, value));

    const updated = [...localPercentages];
    updated[index] = val;
    setLocalPercentages(updated);

    updateCompanyPercentage(index, val);
  }

  // --- CALCOLI ---
  const totalPercentage = localPercentages.reduce((a, b) => a + b, 0);
  const euroPartial = localPercentages.map((p) => (amount * p) / 100);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 22px",
        backgroundColor: "#11161C",
        color: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "#1C232A",
          borderRadius: "28px",
          padding: "45px 35px",
          boxShadow: "0 10px 28px rgba(0,0,0,0.35)",
          position: "relative",
        }}
      >
        {/* HOME BUTTON */}
        <button
          onClick={() => router.push("/")}
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "2px solid rgba(255,255,255,0.25)",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            zIndex: 999,
          }}
        >
          🏠
        </button>

        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          style={{
            position: "fixed",
            top: "24px",
            left: "24px",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "2px solid rgba(255,255,255,0.25)",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            zIndex: 999,
          }}
        >
          ←
        </button>

        {/* TITLE */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "700",
            marginBottom: "25px",
          }}
        >
          Distribuisci l’importo
        </h1>

        <p
          style={{
            textAlign: "center",
            opacity: 0.8,
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Scegli quanto assegnare a ciascuna azienda
        </p>

        {/* LISTA AZIENDE */}
        {selectedCompanies.map((c, index) => (
          <div
            key={c.name}
            style={{
              backgroundColor: "#242B2E",
              padding: "22px 24px",
              borderRadius: "22px",
              marginBottom: "26px",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {/* TITLE ROW */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "14px",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={48}
                  height={48}
                  style={{ borderRadius: "10px", marginRight: "12px" }}
                />
                <span style={{ fontSize: "20px" }}>{c.name}</span>
              </div>

              <div style={{ fontSize: "20px", color: "#1BA7B3" }}>
                {euroPartial[index].toFixed(2)} €
              </div>
            </div>

            {/* SLIDER */}
            <input
              type="range"
              min={0}
              max={100}
              value={localPercentages[index]}
              onChange={(e) => handleChange(index, Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "#1BA7B3",
                height: "6px",
                cursor: "pointer",
              }}
            />

            <div
              style={{
                textAlign: "right",
                marginTop: "6px",
                fontSize: "18px",
                opacity: 0.85,
              }}
            >
              {localPercentages[index]}%
            </div>
          </div>
        ))}

        {/* TOTALE — CENTRATO */}
        <div
          style={{
            marginTop: "15px",
            padding: "22px",
            backgroundColor: "#242B2E",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.12)",
            textAlign: "center", // ⭐ CENTRA TUTTO
          }}
        >
          <h3
            style={{
              marginBottom: "8px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Totale allocato
          </h3>

          <div
            style={{
              color: totalPercentage === 100 ? "#3BD16F" : "#FF5F5F",
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "4px",
            }}
          >
            {totalPercentage}% {" · "}
            {(amount * totalPercentage / 100).toFixed(2)} €
          </div>

          <p
            style={{
              opacity: 0.7,
              fontSize: "16px",
              margin: 0,
            }}
          >
            Devi arrivare al 100% per continuare.
          </p>
        </div>

        {/* CONTINUA */}
        <button
          disabled={totalPercentage !== 100}
          onClick={() => router.push("/riepilogo")}
          style={{
            marginTop: "35px",
            padding: "16px",
            backgroundColor:
              totalPercentage === 100 ? "#1BA7B3" : "rgba(255,255,255,0.12)",
            border: "none",
            borderRadius: "16px",
            width: "100%",
            fontSize: "20px",
            cursor: totalPercentage === 100 ? "pointer" : "not-allowed",
            color: "white",
            transition: "0.25s",
          }}
        >
          Continua
        </button>
      </div>

      {/* SCROLL TO TOP */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            right: "20px",
            bottom: "30px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(6px)",
            color: "white",
            fontSize: "22px",
            border: "2px solid rgba(255,255,255,0.25)",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}
