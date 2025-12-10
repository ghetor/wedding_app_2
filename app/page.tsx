"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0F141A",
        padding: "20px",
      }}
    >
        {/* CARD */}
        <div
          style={{
            width: "100%",
            maxWidth: "720px",          // più aderente al contenuto
            backgroundColor: "#242b2eff",
            borderRadius: "40px",       // leggermente più elegante
            padding: "45px 40px",       // padding ridotto
            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
            textAlign: "center",
          }}
        >
        
        {/* Titolo */}
        <h1
          style={{
            color: "white",
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "30px",
          }}
        >
          Benvenuti
        </h1>

        {/* Testi */}
        <p
          style={{
            color: "white",
            fontSize: "22px",
            lineHeight: "1.55",
            margin: "8px 0",
          }}
        >
          Un modo moderno e divertente
        </p>

        <p
          style={{
            color: "white",
            fontSize: "22px",
            lineHeight: "1.55",
            margin: "8px 0",
          }}
        >
          per partecipare al nostro regalo.
        </p>

        <p
          style={{
            color: "white",
            fontSize: "22px",
            lineHeight: "1.55",
            maxWidth: "600px",
            margin: "25px auto 45px",
          }}
        >
          Scegli le aziende, distribuisci il tuo importo e invia il tuo regalo
          sotto forma di investimento.
        </p>

        {/* Bottone */}
        <button
          onClick={() => router.push("/profilo")}
          style={{
            padding: "15px 45px",
            backgroundColor: "#144453ff",
            color: "white",
            border: "2px solid rgba(255,255,255,0.25)",
            borderRadius: "999px",
            fontSize: "20px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "0.25s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#164456")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0D2E39")
          }
        >
          INIZIA
        </button>
      </div>
    </div>
  );
}
