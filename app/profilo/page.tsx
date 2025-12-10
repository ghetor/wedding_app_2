"use client";

import { useRouter } from "next/navigation";
import { useGiftStore } from "@/store/useGiftStore";
import { useState, CSSProperties } from "react";

export default function ProfiloPage() {
  const router = useRouter();

  const {
    amount,
    setAmount,
    setParticipants,
    setMessage,
  } = useGiftStore();

  const [participants, updateParticipants] = useState([
    { nome: "", cognome: "" },
  ]);

  const [message, updateMessage] = useState("");

  // --- CAMBIO IMPORTO ---
  function changeAmount(delta: number) {
    setAmount(Math.max(0, amount + delta));
  }

  // --- UPDATE PARTECIPANTE ---
  function updateParticipant(i: number, field: "nome" | "cognome", val: string) {
    const clone = [...participants];
    clone[i][field] = val;
    updateParticipants(clone);
  }

  // --- AGGIUNGI / RIMUOVI PARTECIPANTE ---
  function addParticipant() {
    updateParticipants([...participants, { nome: "", cognome: "" }]);
  }

  function removeParticipant() {
    if (participants.length > 1) {
      updateParticipants(participants.slice(0, -1));
    }
  }

  // --- CONTINUA ---
  function handleContinue() {
    if (amount <= 0) {
      alert("Inserisci un importo valido.");
      return;
    }

    for (let p of participants) {
      if (!p.nome || !p.cognome) {
        alert("Compila nome e cognome di tutti i partecipanti.");
        return;
      }
    }

    setParticipants(participants);
    setMessage(message);

    router.push("/aziende");
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
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "36px",
            fontWeight: "700",
          }}
        >
          Chi sta facendo il regalo?
        </h1>

        {/* IMPORTO */}
        <p style={{ textAlign: "center", opacity: 0.8 }}>
          Inserisci l'importo da regalare
        </p>

        <div
          style={{
            display: "flex",
            margin: "20px auto",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <button onClick={() => changeAmount(-10)} style={circleButton}>
            –
          </button>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={importoInput}
          />

          <button onClick={() => changeAmount(+10)} style={circleButton}>
            +
          </button>
        </div>

        {/* PARTECIPANTI */}
        <h3
          style={{
            marginBottom: "10px",
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          Partecipanti
        </h3>

        {participants.map((p, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: "10px", marginBottom: "12px" }}
          >
            <input
              placeholder="Nome"
              value={p.nome}
              onChange={(e) => updateParticipant(i, "nome", e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Cognome"
              value={p.cognome}
              onChange={(e) => updateParticipant(i, "cognome", e.target.value)}
              style={inputStyle}
            />
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <button onClick={removeParticipant} style={circleButton}>
            −
          </button>
          <button onClick={addParticipant} style={circleButton}>
            +
          </button>
        </div>

        {/* MESSAGGIO */}
        <textarea
          placeholder="Messaggio (opzionale)"
          value={message}
          onChange={(e) => updateMessage(e.target.value)}
          style={textareaStyle}
        />

        {/* CONTINUA */}
        <button onClick={handleContinue} style={primaryBtn}>
          Continua
        </button>
      </div>
    </div>
  );
}

/* ==============================
   STYLES TIPIZZATI CORRETTAMENTE
   ============================== */

const inputStyle: CSSProperties = {
  flex: 1,
  padding: "12px",
  borderRadius: "14px",
  backgroundColor: "#00000055",
  border: "2px solid rgba(255,255,255,0.18)",
  color: "white",
  fontSize: "16px",
};

const textareaStyle: CSSProperties = {
  width: "100%",
  minHeight: "140px",
  padding: "15px",
  borderRadius: "14px",
  backgroundColor: "#00000055",
  border: "2px solid rgba(255,255,255,0.18)",
  color: "white",
  marginTop: "20px",
  fontSize: "16px",
};

const primaryBtn: CSSProperties = {
  width: "100%",
  padding: "16px",
  backgroundColor: "#1BA7B3",
  borderRadius: "16px",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  color: "white",
  marginTop: "20px",
};

const circleButton: CSSProperties = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: "#144453",
  border: "2px solid rgba(255,255,255,0.20)",
  color: "white",
  fontSize: "26px",
  cursor: "pointer",
};

const importoInput: CSSProperties = {
  width: "160px",
  textAlign: "center",
  fontSize: "26px",
  padding: "10px 12px",
  borderRadius: "14px",
  backgroundColor: "#00000055",
  border: "2px solid rgba(255,255,255,0.18)",
  color: "white",
};
