"use client";

import { useRouter } from "next/navigation";

export default function GraziePage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#11161C",
        padding: "40px 22px",
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
          textAlign: "center",
          boxShadow: "0 10px 28px rgba(0,0,0,0.35)",
        }}
      >
        <h1 style={{ fontSize: "38px", marginBottom: "20px" }}>
          Hai completato tutti gli step!
        </h1>

        <p
          style={{
            fontSize: "20px",
            opacity: 0.85,
            lineHeight: 1.6,
            marginBottom: "40px",
          }}
        >
          Complimenti! 🎉  
          La tua selezione è stata inviata con successo agli sposi.  
          Sei automaticamente iscritto al prossimo step del gioco…  
          <br />
          <strong>ma dovrai aspettare il giorno del matrimonio per scoprirlo!</strong>
        </p>

        <button
          onClick={() => router.push("/")}
          style={{
            padding: "16px",
            backgroundColor: "#1BA7B3",
            borderRadius: "16px",
            fontSize: "20px",
            cursor: "pointer",
            color: "white",
            width: "100%",
          }}
        >
          Torna alla Home
        </button>
      </div>
    </div>
  );
}
