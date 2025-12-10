"use client";

import { useRouter } from "next/navigation";
import { useGiftStore } from "@/store/useGiftStore";
import Image from "next/image";

// Genera un codice univoco di 6 caratteri
function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function RiepilogoPage() {
  const router = useRouter();

  const { amount, selectedCompanies, participants, message } = useGiftStore();

  async function inviaSelezione() {
    try {
      const code = generateCode(); // ⭐ Generiamo il codice qui

      // Dizionario allocazioni → { Apple: 40, Amazon: 60 }
      const allocations = Object.fromEntries(
        selectedCompanies.map((c) => [c.name, c.percentage])
      );

      const payload = {
        timestamp: new Date().toISOString(),
        code,
        amount,
        companies: selectedCompanies.map((c) => c.name),
        allocations,
        participants,
        message,
        user_agent: navigator.userAgent,
      };

      await fetch("/api/sendToSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      router.push("/grazie");
    } catch (err) {
      console.error("❌ Errore invio selezione:", err);
      alert("Errore durante l’invio. Riprova.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 22px",
        backgroundColor: "#11161C",
        display: "flex",
        justifyContent: "center",
        color: "white",
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
        }}
      >
        {/* TITOLO */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "700",
            marginBottom: "30px",
          }}
        >
          Riepilogo del tuo regalo
        </h1>

        {/* IMPORTO */}
        <div
          style={{
            backgroundColor: "#242B2E",
            padding: "22px 24px",
            borderRadius: "20px",
            marginBottom: "35px",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <h2 style={{ fontSize: "22px", marginBottom: "8px" }}>
            Importo totale
          </h2>

          <div
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#1BA7B3",
            }}
          >
            {amount.toFixed(2)} €
          </div>
        </div>

        {/* DISTRIBUZIONE */}
        <h2
          style={{
            fontSize: "26px",
            marginBottom: "15px",
            fontWeight: "600",
          }}
        >
          Distribuzione del regalo
        </h2>

        {selectedCompanies.map((c) => {
          const euro = (amount * c.percentage) / 100;

          return (
            <div
              key={c.name}
              style={{
                backgroundColor: "#242B2E",
                padding: "18px 20px",
                borderRadius: "18px",
                marginBottom: "18px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={42}
                  height={42}
                  style={{ borderRadius: "10px", marginRight: "12px" }}
                />

                <div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    {c.name}
                  </div>

                  <div
                    style={{
                      opacity: 0.75,
                      fontSize: "15px",
                    }}
                  >
                    {c.percentage}% del totale
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#1BA7B3",
                }}
              >
                {euro.toFixed(2)} €
              </div>
            </div>
          );
        })}

        {/* PARTECIPANTI */}
        <h2
          style={{
            fontSize: "26px",
            marginBottom: "12px",
            marginTop: "30px",
            fontWeight: "600",
          }}
        >
          Partecipanti
        </h2>

        <div
          style={{
            backgroundColor: "#242B2E",
            padding: "20px",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.12)",
            marginBottom: "35px",
          }}
        >
          {participants.map((p, i) => (
            <div
              key={i}
              style={{
                fontSize: "18px",
                marginBottom: "8px",
                borderBottom:
                  i < participants.length - 1
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "none",
                paddingBottom: "6px",
              }}
            >
              {p.nome} {p.cognome}
            </div>
          ))}
        </div>

        {/* BOTTONE */}
        <button
          onClick={inviaSelezione}
          style={{
            marginTop: "10px",
            padding: "16px",
            backgroundColor: "#1BA7B3",
            border: "none",
            borderRadius: "16px",
            width: "100%",
            fontSize: "20px",
            cursor: "pointer",
            color: "white",
            transition: "0.25s",
          }}
        >
          Conferma e invia la tua selezione agli sposi
        </button>
      </div>
    </div>
  );
}
